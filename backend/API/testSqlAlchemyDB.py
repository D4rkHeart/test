# coding=utf-8

from .models.base import Session, engine, Base
from .models.user import User

# generate database schema
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data
users = session.query(User).all()

# create and persist mock user
python_user = User("jean", "valjean", "test@bla.com", "456789", '1800-5-03', 1)
session.add(python_user)
session.commit()
session.close()

# reload products
users = session.query(User).all()

# show existing exams
print('### User:')
for user in users:
    print(f'({user.user_id}) {user.first_name} - {user.last_name}')