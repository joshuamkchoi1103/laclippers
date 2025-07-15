#!/bin/bash
cd backend

# Activate venv (adjust path if needed)
source venv/bin/activate

# Start FastAPI
uvicorn main:app --reload &

# Start React app
cd ..
npm start
