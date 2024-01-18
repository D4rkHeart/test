import os
import io
from io import BytesIO
from base64 import encodebytes
from PIL import Image

from flask import abort, jsonify, request, Blueprint
from werkzeug.utils import secure_filename
from .authentication import token_required

media_bp = Blueprint('media_bp', __name__,
    template_folder='templates',
    static_folder='static')

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static')
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'png', 'jpeg'])
MAX_IMAGE_SIZE = (512, 512)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Serving static files
@media_bp.route('/media/<path:filename>')
def get_media(filename):
    if not filename:
        print('filename is not provided')
        raise FileNotFoundError('filename is not provided')
    
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(file_path):
        print('filename is not provided')
        raise FileNotFoundError('filename is not provided')
    
    try:
        pil_img = Image.open(file_path, mode='r') # reads the PIL image
        byte_arr = io.BytesIO()
        pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
        encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
        return encoded_img
    
    except FileNotFoundError:
        print('file doesn\'t exit on server')
        raise FileNotFoundError('file doesn\'t exit on server')

    
# Function to resize an image
def resize_image(image, max_size):
    # Resize image while maintaining aspect ratio
    image.thumbnail(max_size, Image.LANCZOS)
    return image

# Function to save an image
def save_image(img_file, file_path):
    img_file.save(file_path)

@media_bp.route('/media/upload', methods=['POST'])
@token_required
def upload_media(current_user):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    
    if 'file' not in request.files:
        return jsonify({'message' : 'media not provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message' : 'no file selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        # Create a path for the resized image
        resized_filepath = os.path.join(UPLOAD_FOLDER, filename)

        # Read the image data into memory
        image_data = file.read()

        # Open the image using Pillow from the in-memory image data
        original_image = Image.open(BytesIO(image_data))

        # Resize the image
        resized_image = resize_image(original_image, max_size=MAX_IMAGE_SIZE)

        # Save the resized image to the disk
        save_image(resized_image, resized_filepath)

    return jsonify({'message' : 'media uploaded successfully'}), 200




@media_bp.route('/media/delete', methods=['DELETE'])
@token_required
def delete_media(current_user):
    if current_user.role != 3:
        return jsonify({'message' : 'Cannot perform that function!'})
    
    return 