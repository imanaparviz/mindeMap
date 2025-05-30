# AI Project Visualizer - Docker PowerShell Script
param(
    [Parameter(Position=0)]
    [ValidateSet("compose", "docker", "logs", "stop", "restart", "menu")]
    [string]$Action = "menu"
)

Write-Host "🚀 Starting AI Project Visualizer..." -ForegroundColor Green

# Function to check if Docker is running
function Test-DockerRunning {
    try {
        $null = docker info 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
            Read-Host "Press Enter to continue"
            exit 1
        }
        Write-Host "✅ Docker is running" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Docker is not installed or not running." -ForegroundColor Red
        return $false
    }
}

# Function to start with Docker Compose
function Start-WithCompose {
    Write-Host "📦 Building and starting with Docker Compose..." -ForegroundColor Yellow
    docker-compose down
    docker-compose build
    docker-compose up -d
    Write-Host "🌐 Application is running at: http://localhost:8080" -ForegroundColor Green
}

# Function to start with Docker commands
function Start-WithDocker {
    Write-Host "📦 Building Docker image..." -ForegroundColor Yellow
    docker build -t ai-project-visualizer .
    
    Write-Host "🛑 Stopping existing container if running..." -ForegroundColor Yellow
    docker stop ai-project-visualizer 2>$null
    docker rm ai-project-visualizer 2>$null
    
    Write-Host "🚀 Starting container..." -ForegroundColor Yellow
    docker run -d --name ai-project-visualizer -p 8080:80 --restart unless-stopped ai-project-visualizer
    
    Write-Host "🌐 Application is running at: http://localhost:8080" -ForegroundColor Green
}

# Function to show logs
function Show-Logs {
    Write-Host "📄 Showing container logs..." -ForegroundColor Yellow
    if (Test-Path "docker-compose.yml") {
        docker-compose logs -f
    } else {
        docker logs -f ai-project-visualizer
    }
}

# Function to stop containers
function Stop-Containers {
    Write-Host "🛑 Stopping containers..." -ForegroundColor Yellow
    if (Test-Path "docker-compose.yml") {
        docker-compose down
    } else {
        docker stop ai-project-visualizer
        docker rm ai-project-visualizer
    }
    Write-Host "✅ Containers stopped" -ForegroundColor Green
}

# Function to restart containers
function Restart-Containers {
    Write-Host "🔄 Restarting containers..." -ForegroundColor Yellow
    Stop-Containers
    Start-WithCompose
}

# Function to show menu
function Show-Menu {
    Write-Host ""
    Write-Host "🐳 AI Project Visualizer - Docker Manager" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\start.ps1 [option]" -ForegroundColor White
    Write-Host ""
    Write-Host "Options:" -ForegroundColor White
    Write-Host "  compose  - Start with Docker Compose (recommended)" -ForegroundColor Gray
    Write-Host "  docker   - Start with Docker commands" -ForegroundColor Gray
    Write-Host "  logs     - Show container logs" -ForegroundColor Gray
    Write-Host "  stop     - Stop all containers" -ForegroundColor Gray
    Write-Host "  restart  - Restart containers" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Quick start: .\start.ps1 compose" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue"
}

# Main execution
switch ($Action) {
    "compose" {
        Test-DockerRunning
        Start-WithCompose
    }
    "docker" {
        Test-DockerRunning
        Start-WithDocker
    }
    "logs" {
        Show-Logs
    }
    "stop" {
        Stop-Containers
    }
    "restart" {
        Test-DockerRunning
        Restart-Containers
    }
    default {
        Show-Menu
    }
} 