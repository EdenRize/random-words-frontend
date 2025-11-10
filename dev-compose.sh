#!/bin/bash

echo "🚀 Starting Random Words Frontend with Docker Compose..."

# Check if docker-compose is available
if command -v docker-compose &> /dev/null; then
    echo "📦 Using docker-compose..."
    docker-compose -f docker-compose.dev.yml up --build
elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
    echo "📦 Using docker compose..."
    docker compose -f docker-compose.dev.yml up --build
else
    echo "❌ Neither docker-compose nor docker compose found!"
    echo "Please install Docker Compose or use dev-start.sh instead"
    exit 1
fi