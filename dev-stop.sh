#!/bin/bash

echo "🛑 Stopping Random Words Frontend development containers..."

# Stop and remove the named container if running
if docker ps -a --format 'table {{.Names}}' | grep -q "random-words-dev"; then
    echo "🔄 Stopping random-words-dev container..."
    docker stop random-words-dev
    docker rm random-words-dev
    echo "✅ Container stopped and removed"
else
    echo "ℹ️  No random-words-dev container found"
fi

# Also try to stop docker-compose if running
if [ -f "docker-compose.dev.yml" ]; then
    echo "🔄 Stopping docker-compose services..."
    if command -v docker-compose &> /dev/null; then
        docker-compose -f docker-compose.dev.yml down
    elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
        docker compose -f docker-compose.dev.yml down
    fi
    echo "✅ Docker compose services stopped"
fi

echo "🏁 All development containers stopped"