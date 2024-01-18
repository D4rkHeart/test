from flask import jsonify, request, Blueprint

from .authentication import token_required
from ..models.base import Session
from ..models.category import Category, CategorySchema

categories_bp = Blueprint('categories_bp', __name__,
    template_folder='templates',
    static_folder='static')

@categories_bp.route('/categories', methods=['GET'])
def get_categories():
    # fetching from the database
    session = Session()
    categories_objects = session.query(Category).all()

    # transforming into JSON-serializable objects
    schema = CategorySchema(many=True)
    categories = schema.dump(categories_objects)

    # serializing as JSON
    session.close()    
    return jsonify(categories), 200

@categories_bp.route('/categories', methods=['POST'])
@token_required
def add_category(current_user):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    
    # mount exam object
    posted_category = CategorySchema()\
        .load(request.get_json())

    category = Category(**posted_category)

    # persist category
    session = Session()
    session.add(category)
    session.commit()

    # return created category
    new_category = CategorySchema().dump(category)
    session.close()
    return jsonify(new_category), 201

@categories_bp.route('/categories/<id>', methods=['GET'])
def get_category(id):  
    session = Session()

    category_object = session.query(Category).get(id)

    if(category_object==None):
        return jsonify('category not found'), 404
    
    # transforming into JSON-serializable object
    category = CategorySchema().dump(category_object)

    session.close()
    return category

@categories_bp.route('/categories', methods=['PUT'])
@token_required
def set_category(current_user):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    
    session = Session()
    posted_category = CategorySchema().load(request.get_json())
    category = session.query(Category).get(posted_category['category_id'])

    category.name = posted_category['name']

    # return updated category
    updated_category = CategorySchema().dump(category)

    session.commit()
    session.close()
    return updated_category

@categories_bp.route('/categories/<id>', methods=['DELETE'])
@token_required
def delete_category(current_user, id):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    session = Session()

    category_object = session.query(Category).get(id)
    if(category_object==None):
        return jsonify('category not found'), 404
    
    session.delete(category_object)
    session.commit()
    session.close()

    return jsonify("category was successfully deleted"), 200