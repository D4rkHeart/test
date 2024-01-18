from flask import jsonify, request, Blueprint
from werkzeug.security import generate_password_hash
from ..models.base import Session
from ..models.user import User, UserSchema
from .authentication import token_required

users_bp = Blueprint('users_bp', __name__,
    template_folder='templates',
    static_folder='static')

@users_bp.route('/users', methods=['GET'])
@token_required
def get_users(current_user):
    print(current_user)
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    
    # fetching from the database
    session = Session()
    
    user_objects = session.query(User).all()
    
    # transforming into JSON-serializable objects
    schema = UserSchema(many=True)
    users = schema.dump(user_objects)

    # serializing as JSON
    session.close()    
    return users

@users_bp.route('/users', methods=['POST'])
def add_user():

    body = request.data
    if(body == b''):
        return jsonify('no content in body'), 400

    posted_user = UserSchema(only=("first_name", "last_name", "mail", "password", "birthdate", "role"))\
        .load(request.get_json())

    user = User(**posted_user)

    # hash password
    user.password = generate_password_hash(posted_user['password'], method='sha256')
    
    # persist user
    session = Session()
    user = session.query(User).filter(User.mail==posted_user['mail']).one_or_none()
    
    # check if mail already exists
    if user != None : 
        return jsonify({'message' : 'user with this mail already exists'}), 409
    
    session.add(user)
    session.commit()

    # return created user
    new_user = UserSchema().dump(user)
    session.close()
    return jsonify(new_user), 201

@users_bp.route('/users', methods=['PUT'])
@token_required
def set_user(current_user):

    session = Session()
    posted_user = UserSchema().load(request.get_json())
    user = session.query(User).get(posted_user['user_id'])

    user.first_name = posted_user['first_name']
    user.last_name = posted_user['last_name']
    user.mail = posted_user['mail']
    # hash password
    user.birthdate = posted_user['birthdate']
    user.role = posted_user['role']

    # return updated user
    updated_user = UserSchema().dump(user)

    session.commit()
    session.close()
    return updated_user

@users_bp.route('/users/<id>', methods=['GET'])
@token_required
def get_user(current_user, id):
    session = Session()

    user_object = session.query(User).get(id)

    if(user_object==None):
        return jsonify('user not found'), 404
    
    # transforming into JSON-serializable object
    user = UserSchema().dump(user_object)

    session.close()
    return user

@users_bp.route('/users/<id>', methods=['DELETE'])
@token_required
def delete_user(current_user, id):
    session = Session()
    user_object = session.query(User).get(id)

    if(user_object==None):
        return jsonify('user not found'), 404
    
    session.delete(user_object)
    session.commit()
    session.close()

    return jsonify("User was successfully deleted"), 200


@users_bp.route('/modifyPassword', methods=['PUT'])
def modifyPassword():
    # mount exam object

    session = Session()
    posted_forgottenPassword = request.get_json()

    user = session.query(User).filter(User.mail==posted_forgottenPassword['mail']).one_or_none()

    if user is None:
        return jsonify({'message' : 'no user found'}), 401
     
    # hash password
    user.password = generate_password_hash(posted_forgottenPassword['password'], method='sha256')

    session.commit()
    session.close()

    return jsonify({'message' : 'password updated'}), 201