#!/bin/bash

echo "Starting SmartQuiz build..."

echo "Building React frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Installing Python dependencies..."
cd backend
pip install -r requirements.txt

echo "Collecting Django static files..."
python manage.py collectstatic --noinput

echo "Build complete!"