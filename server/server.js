// ================================
// LOAD ENVIRONMENT VARIABLES
// ================================

const dotenv = require("dotenv");

dotenv.config({ override: true });

// ================================
// IMPORTS
// ================================

const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");

// ================================
// GEMINI CLIENT
// ================================

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ================================
// CREATE EXPRESS APP
// ================================

const app = express();

// ================================
// MIDDLEWARE
// ================================

const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// ================================
// BASIC HEALTH CHECK
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareerOS AI Server is running 🚀",
    status: "online",
  });
});

// ================================
// AI AGENT HEALTH CHECK
// ================================

app.get("/api/ai/status", (req, res) => {
  res.json({
    success: true,
    agent: "CareerOS AI Career Agent",
    provider: "Google Gemini",
    status: "online",
    message: "AI Career Agent is ready 🤖",
  });
});

// ================================
// AI CHAT - GEMINI
// ================================

app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const model = genAI.getGenerativeModel({
model: "gemini-3.6-flash",
      systemInstruction:
        "You are CareerOS AI, a career assistant for an early-career AI Full-Stack Developer. Give practical, concise and personalized career guidance. Focus on Full-Stack Development, Generative AI, LLMs, Agentic AI, projects, internships, interviews and career growth.",
    });

    const result = await model.generateContent(message);

    const reply = result.response.text();

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("================================");
    console.error("GEMINI AI ERROR");
    console.error("================================");
    console.error("Message:", error.message);
    console.error("================================");

    res.status(500).json({
      success: false,
      message: error.message || "Gemini AI request failed.",
    });
  }
});

// ================================
// PROFILE ANALYSIS
// ================================

app.post("/api/ai/analyze", (req, res) => {
  const {
    name,
    role,
    education,
    experience,
    focus,
    goal,
    skills,
  } = req.body;

  if (!name || !role || !skills) {
    return res.status(400).json({
      success: false,
      message: "Name, role and skills are required.",
    });
  }

  res.json({
    success: true,
    profile: {
      name,
      role,
      education,
      experience,
      focus,
      goal,
      skills,
    },
    analysis: {
      message:
        "Career profile received successfully. AI analysis layer is ready.",
      recommendedFocus: [
        "Strengthen Full-Stack Development",
        "Build Generative AI applications",
        "Learn LLM application development",
        "Progress toward Agentic AI",
        "Build production-ready projects",
      ],
    },
  });
});

// ================================
// AI CAREER RECOMMENDATION
// ================================

app.post("/api/ai/recommendation", (req, res) => {
  const {
    skills,
    roadmapProgress,
    completedMissions,
  } = req.body;

  res.json({
    success: true,
    recommendation: {
      nextStep:
        "Continue strengthening Full-Stack and Generative AI skills.",
      reason:
        "Your current CareerOS progress shows that practical development and AI application building should remain a major focus.",
      suggestedSkills: [
        "LLMs",
        "RAG",
        "AI APIs",
        "Agentic AI",
        "Tool Calling",
        "System Design",
      ],
      suggestedProject:
        "Build an AI-powered Full-Stack application with an AI agent.",
      roadmapProgress: roadmapProgress || 0,
      completedMissions: completedMissions || 0,
      currentSkills: skills || [],
    },
  });
});

// ================================
// DAILY AI MISSION
// ================================

app.post("/api/ai/mission", (req, res) => {
  const {
    role,
    focus,
    skills,
  } = req.body;

  res.json({
    success: true,
    mission: {
      title: "Build a Small AI-Powered React Feature",
      type: "AI + FULL-STACK",
      duration: "45 MIN",
      description:
        "Create a React component that sends user input to a backend API and displays an AI response.",
      skills: [
        "React",
        "JavaScript",
        "REST API",
        "AI Integration",
      ],
      careerRole:
        role || "AI Full-Stack Developer",
      focus:
        focus || "Generative AI + Agentic AI",
      currentSkills:
        skills || [],
    },
  });
});

// ================================
// 404 HANDLER
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ================================
// ERROR HANDLER
// ================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 5050;

app.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("======================================");
  console.log("       CareerOS AI SERVER");
  console.log("======================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log(
    `AI Status: http://localhost:${PORT}/api/ai/status`
  );
  console.log("Provider: Google Gemini");
  console.log("Status: ONLINE 🚀");
  console.log("======================================");
  console.log("");
});

// ================================
// KEEP SERVER RUNNING
// ================================

setInterval(() => {}, 1000);