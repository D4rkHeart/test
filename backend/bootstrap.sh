#!/bin/bash
echo test

export FLASK_APP=src/main.py
source venv/Scripts/activate
python3 -m flask run