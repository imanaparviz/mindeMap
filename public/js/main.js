// Configuration - Nutze APP_CONFIG statt hardcodierte Werte
function getConfig() {
  if (typeof window.APP_CONFIG !== "undefined") {
    return window.APP_CONFIG;
  }

  // Fallback für alte Konfiguration
  return {
    GEMINI_API_KEY: "AIzaSyCk814Ok0MOa_C9_u2FiJx5WX_spaHoeUQ",
    GEMINI_API_URL:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-05-06:generateContent",
    GEMINI_API_URL_FALLBACK:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-05-06:generateContent",
    DEMO_MODE: false,
  };
}

// DOM Elements
const projectForm = document.getElementById("projectForm");
const projectInput = document.getElementById("projectInput");
const loadingModal = document.getElementById("loadingModal");
const errorMessage = document.getElementById("errorMessage");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  const config = getConfig();

  // Add form event listener
  if (projectForm) {
    projectForm.addEventListener("submit", handleFormSubmit);
  }

  // Check if we have project data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const projectIdea = urlParams.get("project");
  if (projectIdea) {
    projectInput.value = decodeURIComponent(projectIdea);
  }

  // Show demo mode warning if no API key
  if (config.DEMO_MODE) {
    console.warn("🔄 Demo-Modus aktiviert - API Key nicht konfiguriert");
  } else {
    console.log("✅ API Key konfiguriert - AI Features verfügbar");
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const config = getConfig();
  const projectIdea = projectInput.value.trim();

  if (!projectIdea) {
    showError("Bitte gib eine Projektbeschreibung ein.");
    return;
  }

  // Check API key configuration
  if (
    !config.GEMINI_API_KEY ||
    config.GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE" ||
    config.DEMO_MODE
  ) {
    console.log("🔄 Verwende Demo-Daten da kein API Key konfiguriert ist");

    // Load demo data and redirect to results
    if (typeof loadDemoData === "function") {
      loadDemoData();
      window.location.href = "results.html";
      return;
    } else {
      showError(
        "Demo-Daten nicht verfügbar. Bitte konfiguriere deinen Gemini API Key in config.js"
      );
      return;
    }
  }

  showLoading(true);
  hideError();

  try {
    const visualizationData = await generateVisualizationsWithGemini(
      projectIdea
    );

    // Store data in sessionStorage for the results page
    sessionStorage.setItem("projectIdea", projectIdea);
    sessionStorage.setItem(
      "visualizationData",
      JSON.stringify(visualizationData)
    );

    // Redirect to results page
    window.location.href = "results.html";
  } catch (error) {
    console.error("Error generating visualizations:", error);

    // Try demo data as fallback
    if (typeof loadDemoData === "function") {
      console.log("🔄 API Fehler - verwende Demo-Daten als Fallback");
      loadDemoData();
      window.location.href = "results.html";
    } else {
      showError(`Fehler bei der Visualisierung: ${error.message}`);
      showLoading(false);
    }
  }
}

async function generateVisualizationsWithGemini(projectIdea) {
  const config = getConfig();
  const prompt = createGeminiPrompt(projectIdea);

  // Try the primary API endpoint first
  try {
    return await makeGeminiRequest(
      config.GEMINI_API_URL,
      prompt,
      config.GEMINI_API_KEY
    );
  } catch (error) {
    console.warn("Primary API failed, trying fallback:", error.message);
    // Try the fallback endpoint
    try {
      return await makeGeminiRequest(
        config.GEMINI_API_URL_FALLBACK,
        prompt,
        config.GEMINI_API_KEY
      );
    } catch (fallbackError) {
      console.error("Both API endpoints failed:", fallbackError.message);
      throw fallbackError;
    }
  }
}

async function makeGeminiRequest(apiUrl, prompt, apiKey) {
  console.log(
    "Making API request to:",
    `${apiUrl}?key=${apiKey.substring(0, 8)}...`
  );

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      getConfig().TIMEOUT || 30000
    );

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const data = await response.json();
    console.log("API Response received successfully");

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content
    ) {
      throw new Error("Invalid response format from Gemini API");
    }

    const responseText = data.candidates[0].content.parts[0].text;

    try {
      // Clean the response text by removing markdown code blocks if present
      let cleanedText = responseText.trim();

      // Remove markdown code blocks
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\s*/, "");
      }
      if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```\s*/, "");
      }
      if (cleanedText.endsWith("```")) {
        cleanedText = cleanedText.replace(/\s*```$/, "");
      }

      console.log(
        "Cleaned response text:",
        cleanedText.substring(0, 200) + "..."
      );

      // Parse the JSON response
      const visualizationData = JSON.parse(cleanedText);
      return visualizationData;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", responseText);
      console.error("Parse error details:", parseError.message);
      throw new Error("Failed to parse AI response. Please try again.");
    }
  } catch (networkError) {
    console.error("Network error:", networkError);
    if (networkError.name === "AbortError") {
      throw new Error("Request timeout - please try again.");
    }
    if (networkError.message.includes("Failed to fetch")) {
      throw new Error(
        "Network error: Please check your internet connection and ensure CORS is properly configured."
      );
    }
    throw networkError;
  }
}

function createGeminiPrompt(projectIdea) {
  return `
You are an expert project analyzer and visualization generator. Based on the following project idea: "${projectIdea}"

IMPORTANT: Return ONLY valid JSON data without any markdown formatting, code blocks, or additional text.

Please generate a comprehensive project analysis in the following JSON format:

{
  "projectTitle": "Brief title for the project",
  "projectDescription": "Detailed description of what this project is about",
  "roadmap": [
    {
      "phase": "Phase name",
      "description": "What happens in this phase",
      "duration": "Estimated timeframe",
      "deliverables": ["List of deliverables"]
    }
  ],
  "mindmap": {
    "nodeDataArray": [
      {"key": 1, "text": "Central Topic", "category": "root"},
      {"key": 2, "text": "Subtopic 1", "category": "branch", "parent": 1},
      {"key": 3, "text": "Subtopic 2", "category": "branch", "parent": 1}
    ],
    "linkDataArray": [
      {"from": 1, "to": 2},
      {"from": 1, "to": 3}
    ]
  },
  "entityRelationshipDiagram": "erDiagram\\n    CUSTOMER ||--o{ ORDER : places\\n    ORDER ||--|{ LINE-ITEM : contains\\n    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses",
  "tasks": [
    {
      "category": "Planning",
      "items": [
        {
          "task": "Task description",
          "priority": "High|Medium|Low",
          "estimatedHours": "Number of hours"
        }
      ]
    }
  ],
  "userFlow": "flowchart TD\\n    A[User starts] --> B{Login?}\\n    B -->|Yes| C[Dashboard]\\n    B -->|No| D[Login Page]"
}

Requirements:
- Make sure all JSON is valid and properly escaped
- The mindmap should have a hierarchical structure suitable for GoJS
- The ERD and userFlow should be in valid Mermaid.js syntax
- Generate realistic and detailed content based on the project idea
- Be creative but practical
- Return ONLY the JSON object, no markdown formatting, no explanations, no code blocks
`;
}

function fillExample(exampleText) {
  projectInput.value = exampleText;
  projectInput.focus();
}

function startDemo() {
  // Load demo data and redirect to results
  loadDemoData();
  window.location.href = "results.html";
}

function showLoading(show) {
  if (show) {
    loadingModal.classList.remove("hidden");
  } else {
    loadingModal.classList.add("hidden");
  }
}

function showError(message) {
  const errorP = errorMessage.querySelector("p");
  errorP.textContent = message;
  errorMessage.classList.remove("hidden");
}

function hideError() {
  errorMessage.classList.add("hidden");
}

// Utility function to test API connection
async function testGeminiConnection() {
  try {
    const testResponse = await generateVisualizationsWithGemini(
      "Test project: a simple to-do app"
    );
    console.log("Gemini API test successful:", testResponse);
    return true;
  } catch (error) {
    console.error("Gemini API test failed:", error);
    return false;
  }
}

// Add a simple API connectivity test
async function simpleApiTest() {
  console.log("Testing basic API connectivity...");
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Hello, respond with just 'Hello back!'",
              },
            ],
          },
        ],
      }),
    });

    console.log("Simple API test - Status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("Simple API test - Success:", data);
      return true;
    } else {
      const errorText = await response.text();
      console.error("Simple API test - Error:", errorText);
      return false;
    }
  } catch (error) {
    console.error("Simple API test - Network error:", error);
    return false;
  }
}

// Auto-run simple test when page loads (only in development)
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  setTimeout(() => {
    console.log("Running automatic API connectivity test...");
    simpleApiTest();
  }, 2000);
}
