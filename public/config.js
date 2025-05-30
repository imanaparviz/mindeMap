// AI Project Visualizer - Configuration
// Sichere Konfiguration für API Keys und URLs

window.APP_CONFIG = {
  // Gemini API Configuration - NEUESTE VERSION!
  GEMINI_API_KEY: "AIzaSyCk814Ok0MOa_C9_u2FiJx5WX_spaHoeUQ",
  GEMINI_API_URL:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-05-06:generateContent",
  GEMINI_API_URL_FALLBACK:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-05-06:generateContent",

  // Model Configuration
  MODEL_NAME: "gemini-2.5-pro-preview-05-06", // ✅ NEUESTE VERSION!

  // App Configuration
  NODE_ENV: "production",
  APP_NAME: "AI Project Visualizer",
  VERSION: "1.0.0",

  // API Settings
  MAX_RETRIES: 3,
  TIMEOUT: 30000,

  // Demo Mode - Aktiviere automatisch bei API Problemen
  DEMO_MODE: false,
  AUTO_FALLBACK_TO_DEMO: true,
};

// Validate configuration
if (
  !window.APP_CONFIG.GEMINI_API_KEY ||
  window.APP_CONFIG.GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE"
) {
  console.warn(
    "⚠️ Gemini API Key nicht konfiguriert. Demo-Modus wird aktiviert."
  );
  window.APP_CONFIG.DEMO_MODE = true;
}

console.log(
  "✅ App Configuration geladen:",
  window.APP_CONFIG.APP_NAME,
  "v" + window.APP_CONFIG.VERSION
);
console.log("🔧 Verwende Modell:", window.APP_CONFIG.MODEL_NAME);
