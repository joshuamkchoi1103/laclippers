#!/bin/bash
cd backend
pip install -r requirements.txt

# Start FastAPI
uvicorn main:app --reload &

echo ""

# Start React app
cd ..
npm start
