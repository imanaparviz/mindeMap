@echo off
cls
echo.
echo ========================================
echo    🚀 AI Project Visualizer
echo ========================================
echo.
echo Checking Docker...

docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker ist nicht installiert!
    echo.
    echo Bitte installiere Docker Desktop:
    echo https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit /b 1
)

echo ✅ Docker gefunden
echo.
echo Checking Docker Engine...

docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker läuft nicht!
    echo.
    echo Bitte starte Docker Desktop und warte bis es grün ist.
    echo Dann führe dieses Script nochmal aus.
    echo.
    pause
    exit /b 1
)

echo ✅ Docker läuft
echo.
echo 🚀 Starte AI Project Visualizer...
echo.

REM Stoppe alte Container
echo Stoppe alte Container...
docker-compose down >nul 2>&1

REM Baue und starte neu
echo Baue und starte Container...
docker-compose up -d

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    ✅ ERFOLGREICH GESTARTET!
    echo ========================================
    echo.
    echo 🌐 Öffne deinen Browser:
    echo    http://localhost:8080
    echo.
    echo 🎯 Oder klicke hier um direkt zu öffnen:
    start http://localhost:8080
    echo.
    echo 📋 Weitere Commands:
    echo    - Logs anzeigen: docker-compose logs -f
    echo    - Stoppen: docker-compose down
    echo    - Neustarten: QUICK-START.bat
    echo.
) else (
    echo.
    echo ❌ Fehler beim Starten!
    echo.
    echo Versuche folgendes:
    echo 1. Docker Desktop neustarten
    echo 2. Dieses Script nochmal ausführen
    echo 3. Oder manuell: docker-compose up -d
    echo.
)

pause 