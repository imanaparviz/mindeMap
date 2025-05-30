# 🐳 Docker Setup für AI Project Visualizer

## Quick Start

### 1. Mit Docker Compose (Empfohlen)

```bash
# Script ausführbar machen (Linux/Mac)
chmod +x start.sh

# Starten
./start.sh compose

# Oder direkt:
docker-compose up -d
```

### 2. Mit Docker Commands

```bash
# Image bauen
docker build -t ai-project-visualizer .

# Container starten
docker run -d -p 8080:80 --name ai-project-visualizer ai-project-visualizer
```

### 3. Öffnen

```
http://localhost:8080
```

## 📋 Verfügbare Commands

### Mit start.sh Script:

```bash
./start.sh compose   # Mit Docker Compose starten
./start.sh docker    # Mit Docker Commands starten
./start.sh logs      # Logs anzeigen
./start.sh stop      # Container stoppen
./start.sh restart   # Container neustarten
```

### Manuelle Docker Commands:

```bash
# Image bauen
docker build -t ai-project-visualizer .

# Container starten
docker run -d -p 8080:80 --name ai-project-visualizer ai-project-visualizer

# Logs anschauen
docker logs ai-project-visualizer

# Container stoppen
docker stop ai-project-visualizer

# Container löschen
docker rm ai-project-visualizer

# In Container reingehen (debugging)
docker exec -it ai-project-visualizer sh
```

### Docker Compose Commands:

```bash
# Starten
docker-compose up -d

# Logs
docker-compose logs -f

# Stoppen
docker-compose down

# Rebuild
docker-compose build
docker-compose up -d
```

## 🌐 Deployment

### Für Production:

```bash
# Image taggen
docker tag ai-project-visualizer yourusername/ai-project-visualizer:latest

# Zu Docker Hub pushen
docker push yourusername/ai-project-visualizer:latest

# Auf anderem Server pullen und starten
docker pull yourusername/ai-project-visualizer:latest
docker run -d -p 80:80 yourusername/ai-project-visualizer:latest
```

### Multi-Platform Build:

```bash
# Für verschiedene Architekturen
docker buildx build --platform linux/amd64,linux/arm64 -t ai-project-visualizer .
```

## 🔧 Konfiguration

### Environment Variables:

```bash
# In docker-compose.yml oder docker run
-e NODE_ENV=production
-e PORT=80
```

### Volume Mounting (für Development):

```bash
docker run -d \
  -p 8080:80 \
  -v $(pwd):/usr/share/nginx/html \
  ai-project-visualizer
```

## 🚨 Troubleshooting

### Container läuft nicht:

```bash
# Status checken
docker ps -a

# Logs anschauen
docker logs ai-project-visualizer

# In Container schauen
docker exec -it ai-project-visualizer sh
```

### Port bereits belegt:

```bash
# Anderen Port verwenden
docker run -d -p 8081:80 ai-project-visualizer

# Oder bestehenden Container stoppen
docker stop $(docker ps -q --filter "publish=8080")
```

### Image Probleme:

```bash
# Alle stoppen und neu bauen
docker-compose down
docker system prune -f
docker-compose build --no-cache
docker-compose up -d
```

## 📦 Files Übersicht

```
ai-project-visualizer/
├── Dockerfile              # Container Definition
├── docker-compose.yml      # Compose Configuration
├── nginx.conf              # Nginx Configuration
├── .dockerignore           # Files zum ignorieren
├── start.sh                # Start Script
├── index.html              # Main Page
├── results.html            # Results Page
└── js/
    ├── main.js             # Main Logic
    ├── demo-data.js        # Demo Data
    └── results.js          # Results Logic
```

## ✅ Features

- ✅ Nginx-basierter Container
- ✅ CORS-Support für API Calls
- ✅ Health Checks
- ✅ Auto-Restart
- ✅ Optimierte Image-Größe
- ✅ Multi-Platform Support
- ✅ Production-Ready

## 🎯 Next Steps

1. API Key in `js/main.js` eintragen
2. Container starten: `./start.sh compose`
3. Browser öffnen: `http://localhost:8080`
4. Testen mit Demo-Daten
5. Für Production deployen

**Viel Erfolg! 🚀**
