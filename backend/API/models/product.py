# coding=utf-8

from sqlalchemy import Column, String, Integer, Double
from marshmallow import Schema, fields
from .base import Base

class Product(Base):
    __tablename__ = 'product'
    product_id = Column(Integer, primary_key=True)
    category_fk = Column(Integer)
    name = Column(String(45))
    description = Column(String(200))
    price = Column(Double)
    image_path = Column(String(16000))

    def __init__(self, category_fk, name, description, price,image_path):
        self.category_fk = category_fk
        self.name = name
        self.description = description
        self.price = price
        self.image_path = image_path
        
class ProductSchema(Schema):
    product_id = fields.Integer()
    category_fk = fields.Integer()
    name = fields.Str()
    description = fields.Str()
    price = fields.Decimal()
    image_path = fields.Str()
