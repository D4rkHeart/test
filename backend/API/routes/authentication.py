from functools import wraps
from flask import request, Blueprint, make_response, jsonify, current_app
from ..models.base import Session
from ..models.user import User
from werkzeug.security import check_password_hash
import datetime, jwt

auth_bp = Blueprint('auth_bp', __name__,
    template_folder='templates',
    static_folder='static')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing'}), 401

        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        session = Session()
        current_user = session.query(User).filter_by(user_id=data['user_id']).first()
        session.close()

        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/login')
def login():

    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})
    
    session = Session()
    user =  session.query(User).filter_by(mail=auth.username).first()
    session.close()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({"user_id": user.user_id, "exp" : datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'token': token, 'role': user.role, 'id' : user.user_id}), 200
    
    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})
