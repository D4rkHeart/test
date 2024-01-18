# coding=utf-8

from sqlalchemy import Column, String, Integer
from marshmallow import Schema, fields
from .base import Base

class Category(Base):
    __tablename__ = 'category'
    category_id = Column(Integer, primary_key=True)
    name = Column(String(45))

    def __init__(self, name):
        self.name = name

class CategorySchema(Schema):
    category_id = fields.Integer()
    name = fields.Str()