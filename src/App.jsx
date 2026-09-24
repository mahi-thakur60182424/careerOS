import AIChat from "./AIChat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/Dashboard/MainDashboard.jsx";
import CareerProfile from "./pages/career/CareerProfile.jsx";
import CareerAnalysis from "./pages/career/CareerAnalysis.jsx";
import CareerRoadmap from "./pages/career/CareerRoadmap.jsx";
import DailyMissions from "./pages/career/DailyMissions.jsx";
import InterviewCoach from "./interview/InterviewCoach.jsx";
import "./App.css";

function Home() {
  return (
    <div className="app">
      <Navbar />

      <main className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            ✦ AI-POWERED CAREER INTELLIGENCE
          </span>

          <h1>
            Your Career.
            <br />
            <span>Powered by AI.</span>
          </h1>

          <p>
            CareerOS analyzes your skills, resume, goals and progress to build
            a personalized career journey designed specifically for you.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Build My Career →
            </button>

            <button className="secondary-button">
              Explore CareerOS
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <div>
              <span>CAREER INTELLIGENCE</span>
              <h3>Your Career DNA</h3>
            </div>

            <div className="ai-status">
              ● AI Active
            </div>
          </div>

          <div className="career-score">
            <div className="score-circle">
              <strong>72</strong>
              <span>%</span>
            </div>

            <div>
              <span className="muted-text">
                Career Readiness
              </span>

              <h4>Building Momentum</h4>
              <p>12 skills analyzed</p>
            </div>
          </div>

          <div className="skill-preview">
            <div>
              <span>React</span>
              <strong>85%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill react"></div>
            </div>

            <div>
              <span>Node.js</span>
              <strong>70%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill node"></div>
            </div>

            <div>
              <span>Generative AI</span>
              <strong>45%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill ai"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/career/profile"
          element={<CareerProfile />}
        />

        <Route
          path="/career/analysis"
          element={<CareerAnalysis />}
        />

        <Route
          path="/career/roadmap"
          element={<CareerRoadmap />}
        />

        <Route
          path="/career/missions"
          element={<DailyMissions />}
        />

        <Route
          path="/interview"
          element={<InterviewCoach />}
        />

        <Route
          path="/ask-ai"
          element={<AIChat />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;