# coding=utf-8
from sqlalchemy import Column, String, Date, Integer, Double
from marshmallow import Schema, fields
from .base import Base

class Order(Base):
    __tablename__ = 'order'
    order_id = Column(Integer, primary_key=True)
    cart_fk = Column(Integer)
    amount = Column(Double)
    status = Column(String(45))
    created_at = Column(Date)
    updated_at = Column(Date())

    def __init__(self, cart_fk, amount):
        self.cart_fk = cart_fk
        self.amount = amount

class OrderSchema(Schema):
    order_id = fields.Integer()
    cart_fk = fields.Integer()
    amount = fields.Decimal()
    status = fields.Str()
    created_at = fields.Date()
    updated_at = fields.Date()
