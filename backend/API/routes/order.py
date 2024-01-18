from flask import jsonify, request, Blueprint

from .authentication import token_required
from ..models.base import Session
from ..models.order import Order, OrderSchema
import datetime;

orders_bp = Blueprint('orders_bp', __name__,
    template_folder='templates',
    static_folder='static')

@orders_bp.route('/orders', methods=['GET'])
@token_required
def get_orders(current_user):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    # fetching from the database
    session = Session()
    order_objects = session.query(Order).all()
    
    # transforming into JSON-serializable objects
    schema = OrderSchema(many=True)
    orders = schema.dump(order_objects)

    # serializing as JSON
    session.close()    
    return orders

@orders_bp.route('/orders', methods=['POST'])
@token_required
def add_order(current_user):
    # mount exam object
    posted_order = OrderSchema(only=("cart_fk", "amount"))\
        .load(request.get_json())

    order = Order(**posted_order)
    
    # set created_at and updated_at in SQL directly
    ct = datetime.datetime.now()
    order.created_at = ct
    order.updated_at = ct
    
    order.status = 'unpaid'
    
    # persist order
    session = Session()
    session.add(order)
    session.commit()

    # return created order
    new_order = OrderSchema().dump(order)
    session.close()
    return jsonify(new_order), 201

@orders_bp.route('/orders/<id>', methods=['GET'])
@token_required
def get_order(current_user, id):
    session = Session()

    order_object = session.query(Order).get(id)

    if(order_object==None):
        return jsonify('order not found'), 404
    
    # transforming into JSON-serializable object
    order = OrderSchema().dump(order_object)

    session.close()
    return order

@orders_bp.route('/orders', methods=['PUT'])
@token_required
def set_order(current_user):

    session = Session()
    posted_order = OrderSchema().load(request.get_json())
    order = session.query(Order).get(posted_order['order_id'])

    order.cart_fk = posted_order['cart_fk']
    order.amount = posted_order['amount']
    order.status = posted_order['status']
    
    ct = datetime.datetime.now()
    order.updated_at = ct

    # return updated order
    updated_order = OrderSchema().dump(order)

    session.commit()
    session.close()
    return updated_order

@orders_bp.route('/orders/<id>', methods=['DELETE'])
@token_required
def delete_order(current_user, id):
    session = Session()
    order_object = session.query(Order).get(id)

    if(order_object==None):
        return jsonify('order not found'), 404
    
    session.delete(order_object)
    session.commit()
    session.close()

    return jsonify("order was successfully deleted"), 200