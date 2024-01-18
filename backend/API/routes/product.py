from flask import jsonify, request, Blueprint

from digitHubAPI.routes.media import get_media

from .authentication import token_required
from ..models.base import Session
from ..models.product import Product, ProductSchema

products_bp = Blueprint('products_bp', __name__,
    template_folder='templates',
    static_folder='static')

@products_bp.route('/products', methods=['GET'])
def get_products():
    # fetching from the database
    session = Session()
    product_objects = session.query(Product).all()
    
    # transforming into JSON-serializable objects
    schema = ProductSchema(many=True)
    products = schema.dump(product_objects)

    # serializing as JSON
    session.close()

    for product in products:
        if(product['image_path'] != '' and product['image_path'] != None):
            try:
                product['image']=get_media(product['image_path'])
            except FileNotFoundError:
                print('can\'t retrieve all images')
    return products

@products_bp.route('/products', methods=['POST'])
@token_required
def add_product(current_user):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    # mount exam object
    posted_product = ProductSchema(only=("category_fk", "name", "description", "price", "image_path"))\
        .load(request.get_json())

    product = Product(**posted_product)

    # persist product
    session = Session()
    session.add(product)
    session.commit()

    # return created product
    new_product = ProductSchema().dump(product)
    session.close()
    return jsonify(new_product), 201

@products_bp.route('/products/<id>', methods=['GET'])
def get_product(id):
    session = Session()

    product_object = session.query(Product).get(id)

    if(product_object==None):
        return jsonify('product not found'), 404
    

    # transforming into JSON-serializable object
    product = ProductSchema().dump(product_object)
    session.close()

    if(product['image_path'] != '' and product['image_path'] != None):
        try:
            product['image']=get_media(product['image_path'])
        except FileNotFoundError:
            print('can\'t retrieve all images')
    return product

@products_bp.route('/products', methods=['PUT'])
@token_required
def set_product(current_user):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    
    session = Session()
    posted_product = ProductSchema().load(request.get_json())
    product = session.query(Product).get(posted_product['product_id'])

    product.category_fk = posted_product['category_fk']
    product.name = posted_product['name']
    product.description = posted_product['description']
    product.price = posted_product['price']
    product.image_path = posted_product['image_path']

    # return updated product
    updated_product = ProductSchema().dump(product)

    session.commit()
    session.close()
    return updated_product

@products_bp.route('/products/<id>', methods=['DELETE'])
@token_required
def delete_product(current_user, id):
    if current_user.role !=  3:
        return jsonify({'message' : 'Cannot perform that function!'})
    session = Session()
    product_object = session.query(Product).get(id)

    if(product_object==None):
        return jsonify('product not found'), 404
    
    session.delete(product_object)
    session.commit()
    session.close()

    return jsonify("product was successfully deleted"), 200