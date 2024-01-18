import smtplib, ssl
from flask import jsonify, request, Blueprint
import random

from ..models.base import Session
from ..models.user import User

smtp_server = "smtp-relay.sendinblue.com"
port = 587  # For starttls
sender_email = "florian.schaufelberger3@gmail.com"
password = "W5BPRpIzrCjmkdaH"

mail_bp = Blueprint('mail_bp', __name__,
    template_folder='templates',
    static_folder='static')

@mail_bp.route('/retrievePassword/<mail>', methods=['GET'])
def get_orders(mail):

    session = Session()
    user = session.query(User).filter(User.mail==mail).one_or_none()

    if user is None:
        return jsonify({'message' : 'no user found'}), 401
     
    receiver_email = mail
    random_number = random.randint(10000, 99999)
    message = """\
    Subject: Mot de passe oublie

    Voici votre code a rentrer : """

    message+=str(random_number)

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        server = smtplib.SMTP(smtp_server,port)
        server.ehlo() # Can be omitted
        server.starttls(context=context) # Secure the connection
        server.ehlo() # Can be omitted
        server.login(sender_email, password)

        server.sendmail(sender_email, receiver_email, message.encode(encoding = 'UTF-8'))
    except Exception as e:
        # Print any error messages to stdout
        print(e)
    finally:
        server.quit()
        
    return jsonify({'message' : 'code sent', 'code' : str(random_number)})