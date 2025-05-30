# 🚀 Docker Quick Start

## Schritt 1: Docker starten

```
Starte Docker Desktop auf deinem Computer
```

## Schritt 2: Projekt starten (Windows)

### Option A: PowerShell (Empfohlen)

```powershell
.\start.ps1 compose
```

### Option B: Batch Script

```cmd
start.bat compose
```

### Option C: Manuell

```bash
docker-compose up -d
```

## Schritt 3: Öffnen

```
http://localhost:8080
```

## 🔧 Commands

| Command | Windows PS            | Windows Batch       | Manual                   |
| ------- | --------------------- | ------------------- | ------------------------ |
| Starten | `.\start.ps1 compose` | `start.bat compose` | `docker-compose up -d`   |
| Logs    | `.\start.ps1 logs`    | `start.bat logs`    | `docker-compose logs -f` |
| Stoppen | `.\start.ps1 stop`    | `start.bat stop`    | `docker-compose down`    |

## 🚨 Problemlösung

### Docker läuft nicht:

1. Docker Desktop starten
2. Warten bis Docker vollständig geladen ist
3. Script erneut ausführen

### Port 8080 belegt:

```bash
# Anderen Port verwenden
docker run -d -p 8081:80 ai-project-visualizer
```

### Container Probleme:

```bash
# Alles neu bauen
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## ✅ Das war's!

Dein AI Project Visualizer läuft jetzt in Docker! 🎉
