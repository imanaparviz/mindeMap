# AI Project Visualizer

Eine AI-gesteuerte Webanwendung zur automatischen Generierung umfassender Projektvisualisierungen basierend auf einfachen Projektideen.

## 🚀 Features

- **AI-gesteuerte Analyse**: Nutzt Google Gemini Pro API für intelligente Projektanalyse
- **Multiple Visualisierungen**:
  - 📋 Roadmap mit Projektphasen
  - 🧠 Interaktive Mindmaps (GoJS)
  - 🗃️ Entity-Relationship Diagramme (Mermaid.js)
  - ✅ Detaillierte Aufgabenlisten
  - 🔄 User Flow Diagramme (Mermaid.js)
- **Modernes UI**: Dunkles Theme mit TailwindCSS
- **Export-Funktionen**: JSON-Export für alle Visualisierungen
- **Responsive Design**: Funktioniert auf Desktop und mobilen Geräten

## 📁 Projektstruktur

```
ai-project-visualizer/
├── index.html              # Startseite mit Projekteingabe
├── index2.html             # Original Design (Referenz)
├── results.html            # Ergebnisseite mit Visualisierungen
├── js/
│   ├── main.js            # Hauptlogik und API-Aufrufe
│   └── results.js         # Visualisierungslogik
└── README.md              # Diese Datei
```

## 🛠️ Setup & Installation

### 1. Google Gemini Pro API Key erhalten

1. Besuche [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Erstelle einen neuen API-Schlüssel
3. Kopiere den API-Schlüssel

### 2. API-Schlüssel konfigurieren

Öffne `js/main.js` und ersetze den Platzhalter:

```javascript
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // Hier deinen API-Schlüssel einfügen
```

### 3. Lokalen Server starten

Da die Anwendung CORS-Anfragen an externe APIs stellt, muss sie über einen lokalen Server laufen:

**Option 1: Python (falls installiert)**

```bash
# Python 3
python -m http.server 8000

# Python 2
python -M SimpleHTTPServer 8000
```

**Option 2: Node.js (falls installiert)**

```bash
npx http-server -p 8000
```

**Option 3: PHP (falls installiert)**

```bash
php -S localhost:8000
```

**Option 4: VS Code Live Server Extension**

- Installiere die "Live Server" Extension
- Rechtsklick auf `index.html` → "Open with Live Server"

### 4. Anwendung öffnen

Öffne deinen Browser und navigiere zu `http://localhost:8000`

## 💡 Verwendung

### 1. Projektidee eingeben

- Öffne die Startseite (`index.html`)
- Gib eine kurze Projektbeschreibung ein, z.B.:
  - "Ich möchte eine Food-Delivery-App entwickeln"
  - "Ich will eine Social Media Plattform für Künstler erstellen"
  - "Ich möchte eine E-Learning-Plattform bauen"

### 2. Visualisierungen generieren

- Klicke auf "Generate"
- Die AI analysiert dein Projekt (dauert 10-30 Sekunden)
- Du wirst automatisch zur Ergebnisseite weitergeleitet

### 3. Visualisierungen erkunden

- **Roadmap**: Projektphasen mit Zeitschätzungen und Deliverables
- **Mindmap**: Interaktive Mindmap der Projektkomponenten
- **ERD**: Datenbankstruktur als Entity-Relationship Diagramm
- **Tasks**: Detaillierte Aufgabenliste nach Kategorien
- **User Flow**: Benutzerfluss-Diagramm

### 4. Daten exportieren

- **Export Current**: Aktuelle Tab-Daten als JSON
- **Export All**: Alle Visualisierungsdaten als JSON
- **Copy**: Daten in die Zwischenablage kopieren

## 🔧 Technische Details

### Verwendete Technologien

- **Frontend**: HTML5, CSS3 (TailwindCSS), Vanilla JavaScript
- **AI API**: Google Gemini Pro
- **Visualisierung**:
  - GoJS für Mindmaps
  - Mermaid.js für ERD und User Flow
- **Fonts**: Space Grotesk, Noto Sans

### API-Integration

Die Anwendung sendet strukturierte Prompts an die Gemini Pro API und erhält JSON-Responses mit folgender Struktur:

```json
{
  "projectTitle": "Projekt Titel",
  "projectDescription": "Detaillierte Beschreibung",
  "roadmap": [...],
  "mindmap": {
    "nodeDataArray": [...],
    "linkDataArray": [...]
  },
  "entityRelationshipDiagram": "erDiagram...",
  "tasks": [...],
  "userFlow": "flowchart TD..."
}
```

### Datenspeicherung

- Nutzt `sessionStorage` für temporäre Datenspeicherung
- Keine Serverside-Datenbank erforderlich
- Daten werden beim Schließen des Browsers gelöscht

## 🎨 Anpassung

### Design anpassen

- Farben können in den TailwindCSS-Klassen geändert werden
- Hauptfarben:
  - Primär: `#0cf2d0` (Türkis)
  - Hintergrund: `#111817` (Dunkelgrau)
  - Cards: `#1b2725` (Dunkelgrün)
  - Borders: `#3b5450` (Graugrün)

### Neue Visualisierungstypen hinzufügen

1. Erweitere den Gemini-Prompt in `js/main.js`
2. Füge neue Tab-Struktur in `results.html` hinzu
3. Implementiere Rendering-Logik in `js/results.js`

## 🚨 Bekannte Limitierungen

- **API-Kosten**: Gemini Pro API ist kostenpflichtig nach dem Gratiskontingent
- **Rate Limits**: API hat Anfragebegrenzungen
- **CORS**: Muss über lokalen Server laufen
- **Browser-Support**: Moderne Browser erforderlich (ES6+)

## 🔐 Sicherheit

- **API-Schlüssel**: Wird client-side gespeichert (nicht für Produktion geeignet)
- **Für Produktion**: API-Schlüssel sollte server-side verwaltet werden
- **Datenschutz**: Projektdaten werden an Google Gemini API gesendet

## 🤝 Entwicklung & Beitrag

### Lokale Entwicklung

```bash
# Repository klonen
git clone <repository-url>

# In Projektverzeichnis wechseln
cd ai-project-visualizer

# Lokalen Server starten
python -m http.server 8000
```

### Verbesserungsideen

- [ ] Server-side API-Schlüssel-Verwaltung
- [ ] Benutzer-Authentifizierung
- [ ] Projekt-Speicherung in Datenbank
- [ ] PDF-Export-Funktionalität
- [ ] Mehr Visualisierungstypen
- [ ] Template-System für verschiedene Projekttypen

## 📄 Lizenz

MIT License - siehe LICENSE-Datei für Details.

## 🆘 Support

Bei Problemen oder Fragen:

1. Überprüfe die Browser-Konsole auf Fehlermeldungen
2. Stelle sicher, dass der API-Schlüssel korrekt konfiguriert ist
3. Verwende einen lokalen Server (nicht file://)
4. Überprüfe deine Internetverbindung

### Häufige Fehler

- **"Please configure your Gemini API key"**: API-Schlüssel in `js/main.js` eintragen
- **CORS-Fehler**: Lokalen Server verwenden statt Datei direkt zu öffnen
- **Leere Visualisierungen**: API-Response prüfen, eventuell Prompt anpassen

---

**Viel Spaß beim Visualisieren deiner Projektideen! 🚀**
