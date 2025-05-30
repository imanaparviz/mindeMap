// Global variables
let visualizationData = null;
let currentTab = "roadmap";
let myDiagram = null;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeMermaid();
  loadProjectData();
  initializeTabs();
});

function initializeMermaid() {
  // Configure Mermaid for dark theme
  mermaid.initialize({
    theme: "dark",
    themeVariables: {
      primaryColor: "#0cf2d0",
      primaryTextColor: "#ffffff",
      primaryBorderColor: "#3b5450",
      lineColor: "#9cbab5",
      sectionBkgColor: "#1b2725",
      altSectionBkgColor: "#283937",
      gridColor: "#3b5450",
      secondaryColor: "#283937",
      tertiaryColor: "#1b2725",
    },
    flowchart: {
      htmlLabels: true,
    },
    er: {
      fill: "#1b2725",
      fontSize: 12,
    },
  });
}

function loadProjectData() {
  // Get project data from sessionStorage
  const projectIdea = sessionStorage.getItem("projectIdea");
  const storedData = sessionStorage.getItem("visualizationData");

  if (!projectIdea || !storedData) {
    // Redirect back to home if no data
    window.location.href = "index.html";
    return;
  }

  try {
    visualizationData = JSON.parse(storedData);

    // Update project description
    const projectDescription = document.getElementById("projectDescription");
    projectDescription.textContent = `Based on your project idea: "${projectIdea}"`;

    // Load initial visualizations
    renderAllVisualizations();
  } catch (error) {
    console.error("Error loading project data:", error);
    window.location.href = "index.html";
  }
}

function initializeTabs() {
  const tabLinks = document.querySelectorAll(".tab-link");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const tabId = this.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  // Hide all tab panes
  const tabPanes = document.querySelectorAll(".tab-pane");
  tabPanes.forEach((pane) => {
    pane.classList.add("hidden");
    pane.classList.remove("active");
  });

  // Show selected tab pane
  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.remove("hidden");
    targetPane.classList.add("active");
  }

  // Update tab links
  const tabLinks = document.querySelectorAll(".tab-link");
  tabLinks.forEach((link) => {
    const linkTabId = link.getAttribute("data-tab");
    if (linkTabId === tabId) {
      link.classList.remove("border-b-transparent", "text-[#9cbab5]");
      link.classList.add("border-b-white", "text-white");
      link.querySelector("p").classList.remove("text-[#9cbab5]");
      link.querySelector("p").classList.add("text-white");
    } else {
      link.classList.add("border-b-transparent", "text-[#9cbab5]");
      link.classList.remove("border-b-white", "text-white");
      link.querySelector("p").classList.add("text-[#9cbab5]");
      link.querySelector("p").classList.remove("text-white");
    }
  });

  currentTab = tabId;

  // Special handling for mindmap (needs to be reinitialized when visible)
  if (tabId === "mindmap") {
    setTimeout(() => renderMindmap(), 100);
  }
}

function renderAllVisualizations() {
  if (!visualizationData) return;

  renderRoadmap();
  renderMindmap();
  renderERD();
  renderTasks();
  renderUserFlow();
}

function renderRoadmap() {
  const roadmapContent = document.getElementById("roadmapContent");
  if (!visualizationData.roadmap) {
    roadmapContent.innerHTML =
      '<p class="text-[#9cbab5] text-center p-8">No roadmap data available</p>';
    return;
  }

  let html = "";
  visualizationData.roadmap.forEach((phase, index) => {
    html += `
            <div class="bg-[#1b2725] border border-[#3b5450] rounded-xl p-6 mb-4">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-8 h-8 bg-[#0cf2d0] text-[#111817] rounded-full flex items-center justify-center text-sm font-bold">
                        ${index + 1}
                    </div>
                    <div class="flex-1">
                        <h3 class="text-white text-lg font-bold mb-2">${
                          phase.phase
                        }</h3>
                        <p class="text-[#9cbab5] text-sm mb-3">${
                          phase.description
                        }</p>
                        <div class="flex flex-wrap gap-2 mb-3">
                            <span class="px-2 py-1 bg-[#283937] text-[#0cf2d0] text-xs rounded-full">
                                📅 ${phase.duration}
                            </span>
                        </div>
                        ${
                          phase.deliverables && phase.deliverables.length > 0
                            ? `
                            <div>
                                <p class="text-white text-sm font-medium mb-2">Deliverables:</p>
                                <ul class="list-disc list-inside text-[#9cbab5] text-sm space-y-1">
                                    ${phase.deliverables
                                      .map(
                                        (deliverable) =>
                                          `<li>${deliverable}</li>`
                                      )
                                      .join("")}
                                </ul>
                            </div>
                        `
                            : ""
                        }
                    </div>
                </div>
            </div>
        `;
  });

  roadmapContent.innerHTML = html;
}

function renderMindmap() {
  if (!visualizationData.mindmap) return;

  const mindmapDiv = document.getElementById("mindmapDiv");

  // Initialize GoJS diagram
  const $ = go.GraphObject.make;

  myDiagram = $(go.Diagram, mindmapDiv, {
    "undoManager.isEnabled": true,
    layout: $(go.TreeLayout, {
      angle: 0,
      layerSpacing: 35,
      alternateAngle: 0,
      alternateLayerSpacing: 35,
      alternateAlignment: go.TreeLayout.AlignmentStart,
      alternateNodeIndent: 20,
    }),
    "animationManager.isEnabled": false,
  });

  // Define node template
  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(
      go.Shape,
      "RoundedRectangle",
      { strokeWidth: 2, stroke: "#3b5450", fill: "#1b2725" },
      new go.Binding("fill", "category", function (cat) {
        if (cat === "root") return "#0cf2d0";
        return "#1b2725";
      }),
      new go.Binding("stroke", "category", function (cat) {
        if (cat === "root") return "#0cf2d0";
        return "#3b5450";
      })
    ),
    $(
      go.TextBlock,
      { margin: 8, stroke: "#ffffff", font: "12px Space Grotesk" },
      new go.Binding("text", "text"),
      new go.Binding("stroke", "category", function (cat) {
        if (cat === "root") return "#111817";
        return "#ffffff";
      })
    )
  );

  // Define link template
  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape, { strokeWidth: 2, stroke: "#9cbab5" })
  );

  // Set model data
  myDiagram.model = new go.TreeModel(visualizationData.mindmap.nodeDataArray);
}

function renderERD() {
  const erdContent = document.getElementById("erdContent");
  if (!visualizationData.entityRelationshipDiagram) {
    erdContent.innerHTML =
      '<p class="text-[#9cbab5] text-center p-8">No ERD data available</p>';
    return;
  }

  const erdId = "erdDiagram_" + Date.now();
  erdContent.innerHTML = `<div id="${erdId}" class="mermaid-diagram"></div>`;

  try {
    mermaid
      .render(erdId, visualizationData.entityRelationshipDiagram)
      .then(({ svg }) => {
        document.getElementById(erdId).innerHTML = svg;
      });
  } catch (error) {
    console.error("Error rendering ERD:", error);
    erdContent.innerHTML =
      '<p class="text-red-400 text-center p-8">Error rendering ERD diagram</p>';
  }
}

function renderTasks() {
  const tasksContent = document.getElementById("tasksContent");
  if (!visualizationData.tasks) {
    tasksContent.innerHTML =
      '<p class="text-[#9cbab5] text-center p-8">No tasks data available</p>';
    return;
  }

  let html = "";
  visualizationData.tasks.forEach((category) => {
    html += `
            <div class="bg-[#1b2725] border border-[#3b5450] rounded-xl p-6 mb-4">
                <h3 class="text-white text-lg font-bold mb-4">${
                  category.category
                }</h3>
                <div class="space-y-3">
                    ${category.items
                      .map(
                        (task) => `
                        <div class="flex items-start gap-3 p-3 bg-[#283937] rounded-lg">
                            <div class="flex-1">
                                <p class="text-white text-sm font-medium">${
                                  task.task
                                }</p>
                                <div class="flex gap-2 mt-2">
                                    <span class="px-2 py-1 text-xs rounded-full ${getPriorityColor(
                                      task.priority
                                    )}">
                                        ${task.priority}
                                    </span>
                                    <span class="px-2 py-1 bg-[#1b2725] text-[#9cbab5] text-xs rounded-full">
                                        ⏱️ ${task.estimatedHours}h
                                    </span>
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;
  });

  tasksContent.innerHTML = html;
}

function renderUserFlow() {
  const userflowContent = document.getElementById("userflowContent");
  if (!visualizationData.userFlow) {
    userflowContent.innerHTML =
      '<p class="text-[#9cbab5] text-center p-8">No user flow data available</p>';
    return;
  }

  const flowId = "userFlow_" + Date.now();
  userflowContent.innerHTML = `<div id="${flowId}" class="mermaid-diagram"></div>`;

  try {
    mermaid.render(flowId, visualizationData.userFlow).then(({ svg }) => {
      document.getElementById(flowId).innerHTML = svg;
    });
  } catch (error) {
    console.error("Error rendering User Flow:", error);
    userflowContent.innerHTML =
      '<p class="text-red-400 text-center p-8">Error rendering user flow diagram</p>';
  }
}

function getPriorityColor(priority) {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-500 text-white";
    case "medium":
      return "bg-yellow-500 text-black";
    case "low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

// Action functions
function generateNewProject() {
  window.location.href = "index.html";
}

function exportCurrentTab() {
  const tabData = getCurrentTabData();
  if (tabData) {
    downloadData(tabData, `${currentTab}_export.json`);
  }
}

function exportAll() {
  if (visualizationData) {
    downloadData(visualizationData, "project_visualization_export.json");
  }
}

function copyToClipboard() {
  const tabData = getCurrentTabData();
  if (tabData) {
    navigator.clipboard.writeText(JSON.stringify(tabData, null, 2)).then(() => {
      alert("Data copied to clipboard!");
    });
  }
}

function regenerateCurrentTab() {
  // This would require calling the API again for just this tab
  alert("Regeneration feature would require additional API implementation");
}

function getCurrentTabData() {
  switch (currentTab) {
    case "roadmap":
      return visualizationData.roadmap;
    case "mindmap":
      return visualizationData.mindmap;
    case "erd":
      return visualizationData.entityRelationshipDiagram;
    case "tasks":
      return visualizationData.tasks;
    case "userflow":
      return visualizationData.userFlow;
    default:
      return null;
  }
}

function downloadData(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
