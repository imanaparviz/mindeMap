@echo off
REM AI Project Visualizer - Docker Startup Script for Windows
echo 🚀 Starting AI Project Visualizer...

REM Function to check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)
echo ✅ Docker is running

REM Check command line argument
if "%1"=="compose" goto :start_compose
if "%1"=="docker" goto :start_docker  
if "%1"=="logs" goto :show_logs
if "%1"=="stop" goto :stop_containers
if "%1"=="restart" goto :restart_containers
goto :show_menu

:start_compose
echo 📦 Building and starting with Docker Compose...
docker-compose down
docker-compose build
docker-compose up -d
echo 🌐 Application is running at: http://localhost:8080
goto :end

:start_docker
echo 📦 Building Docker image...
docker build -t ai-project-visualizer .

echo 🛑 Stopping existing container if running...
docker stop ai-project-visualizer >nul 2>&1
docker rm ai-project-visualizer >nul 2>&1

echo 🚀 Starting container...
docker run -d --name ai-project-visualizer -p 8080:80 --restart unless-stopped ai-project-visualizer

echo 🌐 Application is running at: http://localhost:8080
goto :end

:show_logs
echo 📄 Showing container logs...
if exist "docker-compose.yml" (
    docker-compose logs -f
) else (
    docker logs -f ai-project-visualizer
)
goto :end

:stop_containers
echo 🛑 Stopping containers...
if exist "docker-compose.yml" (
    docker-compose down
) else (
    docker stop ai-project-visualizer
    docker rm ai-project-visualizer
)
echo ✅ Containers stopped
goto :end

:restart_containers
echo 🔄 Restarting containers...
call :stop_containers
call :start_compose
goto :end

:show_menu
echo 🐳 AI Project Visualizer - Docker Manager
echo.
echo Usage: start.bat [option]
echo.
echo Options:
echo   compose  - Start with Docker Compose (recommended)
echo   docker   - Start with Docker commands
echo   logs     - Show container logs
echo   stop     - Stop all containers
echo   restart  - Restart containers
echo.
echo Quick start: start.bat compose
echo.
pause

:end 