# coding=utf-8

from sqlalchemy import Column, String, Date, Integer
from marshmallow import Schema, fields
from .base import Base

class User(Base):
    __tablename__ = 'user'
    user_id = Column(Integer, primary_key=True)
    first_name = Column(String(45))
    last_name = Column(String(45))
    mail = Column(String(45))
    password = Column(String(45))
    birthdate = Column(Date())
    role = Column(Integer)

    def __init__(self, first_name, last_name, mail, password, birthdate, role):
        self.first_name = first_name
        self.last_name = last_name
        self.mail = mail
        self.password = password
        self.birthdate = birthdate
        self.role = role

class UserSchema(Schema):
    user_id = fields.Integer()
    first_name = fields.Str()
    last_name = fields.Str()
    mail = fields.Str()
    password = fields.Str()
    birthdate = fields.Date()
    role = fields.Integer()