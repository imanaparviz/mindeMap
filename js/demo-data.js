// Demo data for testing the application without API calls
// This can be used to test the visualization components

const DEMO_VISUALIZATION_DATA = {
  projectTitle: "Food Delivery App",
  projectDescription:
    "A comprehensive mobile application for food delivery that connects customers with local restaurants, providing seamless ordering, real-time tracking, and efficient delivery management.",
  roadmap: [
    {
      phase: "Planning & Research",
      description:
        "Market research, competitor analysis, and requirement gathering",
      duration: "2-3 weeks",
      deliverables: [
        "Market research report",
        "Competitor analysis",
        "Technical requirements document",
        "User personas and journey maps",
      ],
    },
    {
      phase: "Design & Prototyping",
      description: "UI/UX design, wireframing, and interactive prototypes",
      duration: "3-4 weeks",
      deliverables: [
        "Wireframes and mockups",
        "Interactive prototypes",
        "Design system and style guide",
        "User flow diagrams",
      ],
    },
    {
      phase: "Backend Development",
      description: "Server setup, database design, and API development",
      duration: "6-8 weeks",
      deliverables: [
        "Database schema",
        "REST API endpoints",
        "Authentication system",
        "Payment gateway integration",
      ],
    },
    {
      phase: "Mobile App Development",
      description: "Frontend development for iOS and Android platforms",
      duration: "8-10 weeks",
      deliverables: [
        "Customer mobile app",
        "Restaurant dashboard app",
        "Delivery driver app",
        "Admin panel",
      ],
    },
    {
      phase: "Testing & QA",
      description: "Comprehensive testing across all platforms and devices",
      duration: "2-3 weeks",
      deliverables: [
        "Test cases and scenarios",
        "Bug reports and fixes",
        "Performance optimization",
        "Security testing report",
      ],
    },
    {
      phase: "Launch & Deployment",
      description: "Production deployment and go-to-market strategy",
      duration: "2 weeks",
      deliverables: [
        "Production deployment",
        "App store submissions",
        "Marketing materials",
        "Launch strategy execution",
      ],
    },
  ],
  mindmap: {
    nodeDataArray: [
      { key: 1, text: "Food Delivery App", category: "root" },
      { key: 2, text: "Customer App", category: "branch", parent: 1 },
      { key: 3, text: "Restaurant Dashboard", category: "branch", parent: 1 },
      { key: 4, text: "Delivery System", category: "branch", parent: 1 },
      { key: 5, text: "Backend Services", category: "branch", parent: 1 },
      { key: 6, text: "Browse Restaurants", category: "leaf", parent: 2 },
      { key: 7, text: "Order Management", category: "leaf", parent: 2 },
      { key: 8, text: "Payment Processing", category: "leaf", parent: 2 },
      { key: 9, text: "Order Tracking", category: "leaf", parent: 2 },
      { key: 10, text: "Menu Management", category: "leaf", parent: 3 },
      { key: 11, text: "Order Processing", category: "leaf", parent: 3 },
      { key: 12, text: "Analytics Dashboard", category: "leaf", parent: 3 },
      { key: 13, text: "Driver App", category: "leaf", parent: 4 },
      { key: 14, text: "Route Optimization", category: "leaf", parent: 4 },
      { key: 15, text: "Real-time Tracking", category: "leaf", parent: 4 },
      { key: 16, text: "User Authentication", category: "leaf", parent: 5 },
      { key: 17, text: "Database Management", category: "leaf", parent: 5 },
      { key: 18, text: "API Gateway", category: "leaf", parent: 5 },
    ],
    linkDataArray: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
      { from: 2, to: 6 },
      { from: 2, to: 7 },
      { from: 2, to: 8 },
      { from: 2, to: 9 },
      { from: 3, to: 10 },
      { from: 3, to: 11 },
      { from: 3, to: 12 },
      { from: 4, to: 13 },
      { from: 4, to: 14 },
      { from: 4, to: 15 },
      { from: 5, to: 16 },
      { from: 5, to: 17 },
      { from: 5, to: 18 },
    ],
  },
  entityRelationshipDiagram:
    "erDiagram\n    USER ||--o{ ORDER : places\n    USER {\n        int user_id PK\n        string email\n        string phone\n        string address\n        datetime created_at\n    }\n    RESTAURANT ||--o{ MENU_ITEM : has\n    RESTAURANT ||--o{ ORDER : receives\n    RESTAURANT {\n        int restaurant_id PK\n        string name\n        string address\n        string phone\n        float rating\n        boolean is_active\n    }\n    ORDER ||--|{ ORDER_ITEM : contains\n    ORDER {\n        int order_id PK\n        int user_id FK\n        int restaurant_id FK\n        int driver_id FK\n        float total_amount\n        string status\n        datetime created_at\n        datetime delivered_at\n    }\n    MENU_ITEM ||--o{ ORDER_ITEM : included_in\n    MENU_ITEM {\n        int item_id PK\n        int restaurant_id FK\n        string name\n        string description\n        float price\n        boolean is_available\n    }\n    ORDER_ITEM {\n        int order_item_id PK\n        int order_id FK\n        int item_id FK\n        int quantity\n        float price\n    }\n    DRIVER ||--o{ ORDER : delivers\n    DRIVER {\n        int driver_id PK\n        string name\n        string phone\n        string vehicle_type\n        boolean is_available\n        float rating\n    }\n    PAYMENT ||--|| ORDER : for\n    PAYMENT {\n        int payment_id PK\n        int order_id FK\n        float amount\n        string method\n        string status\n        datetime processed_at\n    }",
  tasks: [
    {
      category: "Planning",
      items: [
        {
          task: "Conduct market research and competitor analysis",
          priority: "High",
          estimatedHours: "40",
        },
        {
          task: "Define project scope and requirements",
          priority: "High",
          estimatedHours: "24",
        },
        {
          task: "Create user personas and journey maps",
          priority: "Medium",
          estimatedHours: "16",
        },
        {
          task: "Establish project timeline and milestones",
          priority: "High",
          estimatedHours: "8",
        },
      ],
    },
    {
      category: "Design",
      items: [
        {
          task: "Create wireframes for all app screens",
          priority: "High",
          estimatedHours: "32",
        },
        {
          task: "Design UI mockups and prototypes",
          priority: "High",
          estimatedHours: "48",
        },
        {
          task: "Develop design system and component library",
          priority: "Medium",
          estimatedHours: "24",
        },
        {
          task: "Create app icons and branding materials",
          priority: "Medium",
          estimatedHours: "16",
        },
      ],
    },
    {
      category: "Backend Development",
      items: [
        {
          task: "Set up development environment and CI/CD",
          priority: "High",
          estimatedHours: "16",
        },
        {
          task: "Design and implement database schema",
          priority: "High",
          estimatedHours: "32",
        },
        {
          task: "Develop RESTful API endpoints",
          priority: "High",
          estimatedHours: "80",
        },
        {
          task: "Implement authentication and authorization",
          priority: "High",
          estimatedHours: "24",
        },
        {
          task: "Integrate payment gateway (Stripe/PayPal)",
          priority: "High",
          estimatedHours: "32",
        },
        {
          task: "Implement real-time order tracking",
          priority: "Medium",
          estimatedHours: "40",
        },
      ],
    },
    {
      category: "Frontend Development",
      items: [
        {
          task: "Set up React Native development environment",
          priority: "High",
          estimatedHours: "8",
        },
        {
          task: "Implement customer app screens and navigation",
          priority: "High",
          estimatedHours: "120",
        },
        {
          task: "Develop restaurant dashboard interface",
          priority: "High",
          estimatedHours: "80",
        },
        {
          task: "Create delivery driver mobile app",
          priority: "High",
          estimatedHours: "64",
        },
        {
          task: "Implement push notifications",
          priority: "Medium",
          estimatedHours: "16",
        },
        {
          task: "Add maps integration and geolocation",
          priority: "High",
          estimatedHours: "32",
        },
      ],
    },
    {
      category: "Testing & QA",
      items: [
        {
          task: "Write unit tests for backend services",
          priority: "High",
          estimatedHours: "40",
        },
        {
          task: "Implement integration testing",
          priority: "High",
          estimatedHours: "32",
        },
        {
          task: "Conduct user acceptance testing",
          priority: "Medium",
          estimatedHours: "24",
        },
        {
          task: "Perform security and penetration testing",
          priority: "High",
          estimatedHours: "16",
        },
        {
          task: "Optimize app performance and loading times",
          priority: "Medium",
          estimatedHours: "24",
        },
      ],
    },
    {
      category: "Deployment",
      items: [
        {
          task: "Set up production server infrastructure",
          priority: "High",
          estimatedHours: "24",
        },
        {
          task: "Configure monitoring and logging systems",
          priority: "Medium",
          estimatedHours: "16",
        },
        {
          task: "Submit apps to App Store and Google Play",
          priority: "High",
          estimatedHours: "8",
        },
        {
          task: "Create deployment and rollback procedures",
          priority: "Medium",
          estimatedHours: "8",
        },
        {
          task: "Prepare launch marketing materials",
          priority: "Low",
          estimatedHours: "16",
        },
      ],
    },
  ],
  userFlow:
    "flowchart TD\n    A[User Opens App] --> B{User Logged In?}\n    B -->|No| C[Login/Register Screen]\n    B -->|Yes| D[Home Screen - Restaurant List]\n    C --> C1[Enter Credentials]\n    C1 --> C2{Valid Credentials?}\n    C2 -->|No| C3[Show Error Message]\n    C3 --> C1\n    C2 -->|Yes| D\n    D --> E[Browse Restaurants]\n    E --> F[Select Restaurant]\n    F --> G[View Menu]\n    G --> H[Add Items to Cart]\n    H --> I{Continue Shopping?}\n    I -->|Yes| G\n    I -->|No| J[Review Cart]\n    J --> K[Enter Delivery Address]\n    K --> L[Select Payment Method]\n    L --> M[Place Order]\n    M --> N[Order Confirmation]\n    N --> O[Real-time Order Tracking]\n    O --> P{Order Status}\n    P -->|Preparing| P1[Restaurant Preparing Food]\n    P -->|Ready for Pickup| P2[Driver Assigned]\n    P -->|Out for Delivery| P3[Driver En Route]\n    P -->|Delivered| Q[Order Complete]\n    P1 --> P2\n    P2 --> P3\n    P3 --> Q\n    Q --> R[Rate Order & Driver]\n    R --> S[Return to Home Screen]",
};

// Function to load demo data for testing
function loadDemoData() {
  sessionStorage.setItem("projectIdea", "I want to build a food delivery app");
  sessionStorage.setItem(
    "visualizationData",
    JSON.stringify(DEMO_VISUALIZATION_DATA)
  );
  console.log("Demo data loaded into sessionStorage");
}

// Function to check if demo mode should be enabled
function isDemoMode() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("demo") === "true";
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEMO_VISUALIZATION_DATA, loadDemoData, isDemoMode };
}
