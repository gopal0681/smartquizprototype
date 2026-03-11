#!/bin/bash

# Stop script on any error
set -e

echo "Starting SmartQuiz build..."

# --- 1. Build React frontend ---
echo "Building React frontend..."
cd frontend || { echo "Frontend folder not found"; exit 1; }
npm install
npm run build
cd ..

# --- 2. Collect Django static files ---
echo "Collecting Django static files..."
cd backend || { echo "Backend folder not found"; exit 1; }
python manage.py collectstatic --noinput

echo "Build completed successfully! 🎉"