import sys, os
from flask import Flask
from flask_cors import CORS
from .models.base import engine, Base
from .routes.users import users_bp
from .routes.category import categories_bp
from .routes.cart import carts_bp
from .routes.order import orders_bp
from .routes.product import products_bp
from .routes.authentication import auth_bp
from .routes.media import media_bp
from .routes.mail import mail_bp

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def create_app():
    # creating the Flask application
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY']='c3ae7b2e12534ae7863a626775455bfd'
    app.register_blueprint(users_bp,url_prefix='/api')
    app.register_blueprint(categories_bp, url_prefix='/api')
    app.register_blueprint(carts_bp, url_prefix='/api')
    app.register_blueprint(orders_bp, url_prefix='/api')
    app.register_blueprint(products_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(media_bp, url_prefix='/api')
    app.register_blueprint(mail_bp, url_prefix='/api')

    # if needed, generate database schema
    Base.metadata.create_all(engine)
    return app