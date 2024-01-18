# Use Python 3.11-slim
FROM python:3.11-slim

# Install Node.js and npm for nodemon
# RUN apt-get update && apt-get install -y nodejs npm

# Set the working directory
WORKDIR /app

# Copy the contents of the backend folder into the container
COPY . /app

RUN pip install -r requirements.txt 
# && npm install -g nodemon 

# Expose the port on which your Flask app will run (assuming it's port 5000)
EXPOSE 5000

# Specify the command to run your Flask app
CMD ["python", "src/main.py"]
