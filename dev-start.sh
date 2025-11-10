#!/bin/bash

echo "🚀 Starting Random Words Frontend in Development Mode..."

# Build the development image
echo "📦 Building development Docker image..."
docker build -f Dockerfile.dev -t random-words-frontend-dev .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Run the container with volume mounting for live reload
    echo "🔄 Starting development server with live reload..."
    docker run -it --rm \
        -p 5173:5173 \
        -v "$(pwd)/src:/app/src" \
        -v "$(pwd)/public:/app/public" \
        -v "$(pwd)/index.html:/app/index.html" \
        -v "$(pwd)/package.json:/app/package.json" \
        -v "$(pwd)/vite.config.ts:/app/vite.config.ts" \
        -v "$(pwd)/tsconfig.json:/app/tsconfig.json" \
        -v "$(pwd)/tsconfig.app.json:/app/tsconfig.app.json" \
        --name random-words-dev \
        random-words-frontend-dev
else
    echo "❌ Build failed!"
    exit 1
fi