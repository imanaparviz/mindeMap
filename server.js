// AI Project Visualizer - Express Server
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.static("."));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/results", (req, res) => {
  res.sendFile(path.join(__dirname, "results.html"));
});

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Catch all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log("🚀 AI Project Visualizer gestartet!");
  console.log("📡 Server läuft auf: http://localhost:" + PORT);
  console.log("🔧 Gemini Model:", "gemini-2.5-pro-preview-05-06");
  console.log("✅ Bereit für Projekte!");
  console.log("");
  console.log("👉 Öffne: http://localhost:" + PORT);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Server wird heruntergefahren...");
  process.exit(0);
});
