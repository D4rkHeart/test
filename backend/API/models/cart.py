# coding=utf-8

from sqlalchemy import Column, String, Date, Integer
from marshmallow import Schema, fields
from .base import Base

class Cart(Base):
    __tablename__ = 'cart'
    cart_id = Column(Integer, primary_key=True)
    user_fk = Column(Integer)
    product_fk = Column(Integer)
    quantity = Column(Integer)

    def __init__(self, user_fk, product_fk, quantity):
        self.user_fk = user_fk
        self.product_fk = product_fk
        self.quantity = quantity

class CartSchema(Schema):
    cart_id = fields.Integer()
    user_fk = fields.Integer()
    product_fk = fields.Integer()
    quantity = fields.Integer()