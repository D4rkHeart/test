. "venv\Scripts\activate.ps1"
pip install -r requirements.txt
$env:FLASK_APP="digitHubAPI/main.py"
flask run -h 0.0.0.0