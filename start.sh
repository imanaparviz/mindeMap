#!/bin/bash

# AI Project Visualizer - Docker Startup Script
echo "🚀 Starting AI Project Visualizer..."

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker first."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Function to build and start with docker-compose
start_with_compose() {
    echo "📦 Building and starting with Docker Compose..."
    docker-compose down
    docker-compose build
    docker-compose up -d
    echo "🌐 Application is running at: http://localhost:8080"
}

# Function to build and start with docker commands
start_with_docker() {
    echo "📦 Building Docker image..."
    docker build -t ai-project-visualizer .
    
    echo "🛑 Stopping existing container if running..."
    docker stop ai-project-visualizer 2>/dev/null || true
    docker rm ai-project-visualizer 2>/dev/null || true
    
    echo "🚀 Starting container..."
    docker run -d \
        --name ai-project-visualizer \
        -p 8080:80 \
        --restart unless-stopped \
        ai-project-visualizer
    
    echo "🌐 Application is running at: http://localhost:8080"
}

# Function to show logs
show_logs() {
    echo "📄 Showing container logs..."
    if command -v docker-compose &> /dev/null && [ -f "docker-compose.yml" ]; then
        docker-compose logs -f
    else
        docker logs -f ai-project-visualizer
    fi
}

# Function to stop containers
stop_containers() {
    echo "🛑 Stopping containers..."
    if command -v docker-compose &> /dev/null && [ -f "docker-compose.yml" ]; then
        docker-compose down
    else
        docker stop ai-project-visualizer
        docker rm ai-project-visualizer
    fi
    echo "✅ Containers stopped"
}

# Main menu
case "${1:-menu}" in
    "compose")
        check_docker
        start_with_compose
        ;;
    "docker")
        check_docker
        start_with_docker
        ;;
    "logs")
        show_logs
        ;;
    "stop")
        stop_containers
        ;;
    "restart")
        check_docker
        stop_containers
        start_with_compose
        ;;
    "menu"|*)
        echo "🐳 AI Project Visualizer - Docker Manager"
        echo ""
        echo "Usage: ./start.sh [option]"
        echo ""
        echo "Options:"
        echo "  compose  - Start with Docker Compose (recommended)"
        echo "  docker   - Start with Docker commands"
        echo "  logs     - Show container logs"
        echo "  stop     - Stop all containers"
        echo "  restart  - Restart containers"
        echo ""
        echo "Quick start: ./start.sh compose"
        ;;
esac 