from sqlalchemy import create_engine
from sqlalchemy import text

import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

db_url = os.environ.get("DB_HOST")
db_name = os.environ.get("DB_NAME")
db_user = os.environ.get("DB_USER")
db_password = os.environ.get("DB_PASSWORD")

print(f"DB_URL: {db_url}")
print(f"DB_NAME: {db_name}")
print(f"DB_USER: {db_user}")
print(f"DB_PASSWORD: {db_password}")

print("test nodemon  into the container 2")

# Connect to the database
# engine = create_engine("mysql+mysqlconnector://root:123456@127.0.0.1:3306/vendorsite", echo=True)

engine = create_engine(f'mysql+mysqlconnector://{db_user}:{db_password}@{db_url}/{db_name}', echo=True)

# Test the connection
with engine.connect() as connection :

    result = connection.execute(text("SELECT * FROM user"))

    for row in result:
        print(row)
