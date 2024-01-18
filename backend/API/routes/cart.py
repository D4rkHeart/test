from flask import jsonify, request, Blueprint

from .authentication import token_required
from ..models.base import Session
from ..models.cart import Cart, CartSchema

carts_bp = Blueprint('carts_bp', __name__,
    template_folder='templates',
    static_folder='static')

@carts_bp.route('/carts', methods=['GET'])
@token_required
def get_carts(current_user):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    
    # fetching from the database
    session = Session()
    cart_objects = session.query(Cart).all()
    
    # transforming into JSON-serializable objects
    schema = CartSchema(many=True)
    carts = schema.dump(cart_objects)

    # serializing as JSON
    session.close()    
    return carts

@carts_bp.route('/carts', methods=['POST'])
@token_required
def add_cart(current_user):
    # mount exam object
    posted_cart = CartSchema(only=("user_fk", "product_fk", "quantity"))\
        .load(request.get_json())

    cart = Cart(**posted_cart)

    # persist cart
    session = Session()
    session.add(cart)
    session.commit()

    # return created cart
    new_cart = CartSchema().dump(cart)
    session.close()
    return jsonify(new_cart), 201

@carts_bp.route('/carts/<id>', methods=['GET'])
@token_required
def get_cart(current_user, id):
    session = Session()

    cart_object = session.query(Cart).get(id)

    if(cart_object==None):
        return jsonify('cart not found'), 404
    
    # transforming into JSON-serializable object
    cart = CartSchema().dump(cart_object)

    session.close()
    return cart

@carts_bp.route('/carts', methods=['PUT'])
@token_required
def set_cart(current_user):

    session = Session()
    posted_cart = CartSchema().load(request.get_json())
    cart = session.query(Cart).get(posted_cart['cart_id'])

    cart.user_fk = posted_cart['user_fk']
    cart.product_fk = posted_cart['product_fk']
    cart.quantity = posted_cart['quantity']

    # return updated cart
    updated_cart = CartSchema().dump(cart)

    session.commit()
    session.close()
    return updated_cart


@carts_bp.route('/carts/<id>', methods=['DELETE'])
@token_required
def delete_cart(current_user, id):
    session = Session()
    cart_object = session.query(Cart).get(id)

    if(cart_object==None):
        return jsonify('cart not found'), 404
    
    session.delete(cart_object)
    session.commit()
    session.close()

    return jsonify("cart was successfully deleted"), 200