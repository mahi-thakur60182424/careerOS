import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function MainDashboard() {
  const navigate = useNavigate();

  // ==========================================
  // PROFILE
  // ==========================================

  const [profile] = useState(() => {
    const defaultProfile = {
      name: "Mahi Thakur",
      role: "AI Full-Stack Developer",
      education: "B.Tech CSE",
      experience: "Early Career",
      focus: "Generative AI + Agentic AI",
      goal: "Get an AI Full-Stack Developer role",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "SQL",
        "Python",
        "Generative AI",
        "LLMs",
        "Agentic AI",
      ],
    };

    const savedProfile = localStorage.getItem("careeros-profile");

    if (!savedProfile) {
      return defaultProfile;
    }

    try {
      const parsedProfile = JSON.parse(savedProfile);

      let skills = parsedProfile.skills;

      // Fix skills if stored as a string
      if (typeof skills === "string") {
        skills = skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      }

      // Fix skills if invalid
      if (!Array.isArray(skills)) {
        skills = defaultProfile.skills;
      }

      return {
        ...defaultProfile,
        ...parsedProfile,
        skills,
      };
    } catch (error) {
      console.error("Profile loading error:", error);
      return defaultProfile;
    }
  });

  // ==========================================
  // ROADMAP PROGRESS
  // ==========================================

  const [roadmapProgress] = useState(() => {
    const savedProgress = localStorage.getItem(
      "careeros-roadmap-progress"
    );

    const progress = Number(savedProgress);

    if (Number.isFinite(progress)) {
      return Math.min(100, Math.max(0, progress));
    }

    return 58;
  });

  // ==========================================
  // DAILY MISSIONS
  // ==========================================

  const missions = [
    {
      id: 1,
      title: "Practice JavaScript",
      description:
        "Strengthen JavaScript fundamentals with practical problems.",
      category: "Technical",
    },
    {
      id: 2,
      title: "Build React Feature",
      description:
        "Build or improve one useful feature in your React project.",
      category: "Development",
    },
    {
      id: 3,
      title: "Learn Generative AI",
      description:
        "Learn one important concept related to LLMs or Generative AI.",
      category: "AI",
    },
    {
      id: 4,
      title: "Career Preparation",
      description:
        "Improve your resume, GitHub, LinkedIn or interview skills.",
      category: "Career",
    },
  ];

  const [completedMissions, setCompletedMissions] = useState(() => {
    const savedMissions = localStorage.getItem(
      "careeros-completed-missions"
    );

    if (!savedMissions) {
      return [];
    }

    try {
      const parsed = JSON.parse(savedMissions);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Mission loading error:", error);
      return [];
    }
  });

  // ==========================================
  // AI STATES
  // ==========================================

  const [aiInsight, setAiInsight] = useState(
    "Your career journey is moving forward. Keep building consistently."
  );

  const [aiLoading, setAiLoading] = useState(false);

  const [aiQuestion, setAiQuestion] = useState("");

  const [aiAnswer, setAiAnswer] = useState("");

  const [askAILoading, setAskAILoading] = useState(false);

  // ==========================================
  // SAVE MISSIONS
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "careeros-completed-missions",
      JSON.stringify(completedMissions)
    );
  }, [completedMissions]);

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const missionProgress =
    missions.length > 0
      ? Math.round(
          (completedMissions.length / missions.length) * 100
        )
      : 0;

  const careerReadiness = Math.min(
    100,
    Math.round(
      roadmapProgress * 0.6 +
        missionProgress * 0.2 +
        Math.min(profile.skills.length * 2, 20)
    )
  );

  const remainingReadiness = Math.max(
    0,
    90 - careerReadiness
  );

  // ==========================================
  // AI INSIGHT
  // ==========================================

  useEffect(() => {
    const getAIInsight = async () => {
      setAiLoading(true);

      try {
        const response = await fetch(
        
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `
You are CareerOS AI.

Give one short practical career insight for this student.

Name: ${profile.name}
Role: ${profile.role}
Education: ${profile.education}
Focus: ${profile.focus}
Goal: ${profile.goal}
Skills: ${profile.skills.join(", ")}

Give only one useful actionable insight in 2-3 sentences.
              `,
            }),
          }
        );

        const data = await response.json();

        if (data.success && data.reply) {
          setAiInsight(data.reply);
        }
      } catch (error) {
        console.error("AI insight error:", error);
      } finally {
        setAiLoading(false);
      }
    };

    getAIInsight();
  }, [profile]);

  // ==========================================
  // TOGGLE MISSION
  // ==========================================

  const toggleMission = (missionId) => {
    setCompletedMissions((previous) => {
      if (previous.includes(missionId)) {
        return previous.filter(
          (id) => id !== missionId
        );
      }

      return [...previous, missionId];
    });
  };

  // ==========================================
  // ASK AI
  // ==========================================

  const askAI = async (event) => {
    event.preventDefault();

    if (!aiQuestion.trim() || askAILoading) {
      return;
    }

    const question = aiQuestion.trim();

    setAskAILoading(true);
    setAiAnswer("");

    try {
    const response = await fetch(
 "http://127.0.0.1:5050/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `
You are CareerOS AI, a personal career assistant.

Student Profile:
Name: ${profile.name}
Role: ${profile.role}
Education: ${profile.education}
Experience: ${profile.experience}
Focus: ${profile.focus}
Goal: ${profile.goal}
Skills: ${profile.skills.join(", ")}

Student Question:
${question}

Give practical, clear and personalized career guidance.
            `,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAiAnswer(data.reply);
      } else {
        setAiAnswer(
          "AI response failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Ask AI error:", error);

      setAiAnswer(
        "Unable to connect to CareerOS AI."
      );
    } finally {
      setAskAILoading(false);
    }
  };

  // ==========================================
  // SUGGESTION
  // ==========================================

  const askSuggestion = (question) => {
    setAiQuestion(question);
  };

  // ==========================================
  // JSX START
  // ==========================================

  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <header className="dashboard-header">

        <div
          className="dashboard-logo"
          onClick={() => navigate("/dashboard")}
        >
          <span className="logo-mark">✦</span>
          <span>CareerOS</span>
        </div>

        <nav className="dashboard-nav">

          <button
            className="active"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/career/profile")}
          >
            Career Profile
          </button>

          <button
            onClick={() => navigate("/career/missions")}
          >
            Missions
          </button>

          <button
            onClick={() => navigate("/career/roadmap")}
          >
            Roadmap
          </button>

        </nav>

        <button
          className="dashboard-profile-btn"
          onClick={() => navigate("/career/profile")}
        >
          {profile.name?.charAt(0) || "M"}
        </button>

      </header>

      {/* MAIN */}

      <main className="dashboard-container">

        {/* HERO */}

        <section className="dashboard-greeting">

          <div>

            <div className="dashboard-eyebrow">
              <span>✦</span>
              YOUR AI CAREER COMMAND CENTER
            </div>

            <h1>
              Welcome back,{" "}
              {profile.name?.split(" ")[0] || "Mahi"}.
            </h1>

            <p>
              Build skills, complete missions and move
              closer to your career goal.
            </p>

          </div>

          <button
            className="primary-dashboard-btn"
            onClick={() =>
              navigate("/career/missions")
            }
          >
            Start Today's Mission
            <span>→</span>
          </button>

        </section>

        {/* READINESS */}

        <section className="readiness-card">

          <div className="readiness-main">

            <div>

              <p className="section-label">
                CAREER READINESS
              </p>

              <div className="readiness-number">
                {careerReadiness}
                <span>%</span>
              </div>

              <p className="readiness-description">
                Your current career preparation level
                based on skills, roadmap and completed
                missions.
              </p>

            </div>

            <div
              className="readiness-circle"
              style={{
                "--progress": `${careerReadiness * 3.6}deg`,
              }}
            >
              <div>
                <strong>
                  {careerReadiness}%
                </strong>

                <span>READY</span>
              </div>
            </div>

          </div>

          <div className="readiness-progress">

            <div
              className="readiness-progress-fill"
              style={{
                width: `${careerReadiness}%`,
              }}
            />

          </div>

          <div className="readiness-footer">

            <span>
              {remainingReadiness}% remaining to
              reach target
            </span>

            <span>
              Target 90%
            </span>

          </div>

        </section>

        {/* STATS */}

        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon purple">
              ◈
            </div>

            <div>
              <p>Roadmap Progress</p>
              <h3>{roadmapProgress}%</h3>
            </div>

            <span className="stat-arrow">
              ↗
            </span>

          </div>

          <div className="stat-card">

            <div className="stat-icon orange">
              ◉
            </div>

            <div>
              <p>Mission Progress</p>
              <h3>{missionProgress}%</h3>
            </div>

            <span className="stat-arrow">
              ↗
            </span>

          </div>

          <div className="stat-card">

            <div className="stat-icon blue">
              ✦
            </div>

            <div>
              <p>Skills Tracked</p>
              <h3>{profile.skills.length}</h3>
            </div>

            <span className="stat-arrow">
              ↗
            </span>

          </div>

        </section>
                {/* ==========================================
            CAREER DNA
        ========================================== */}

        <section className="dashboard-grid">

          <div className="dashboard-card career-dna-card">

            <div className="card-heading">
              <div>
                <span className="section-label">
                  CAREER DNA
                </span>

                <h2>
                  Your Professional Identity
                </h2>
              </div>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/career/profile")
                }
              >
                Edit Profile →
              </button>
            </div>

            <div className="career-dna-content">

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  ◉
                </div>

                <div>
                  <span>Name</span>
                  <strong>
                    {profile.name}
                  </strong>
                </div>

              </div>

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  ◈
                </div>

                <div>
                  <span>Current Role</span>
                  <strong>
                    {profile.role}
                  </strong>
                </div>

              </div>

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  ◆
                </div>

                <div>
                  <span>Education</span>
                  <strong>
                    {profile.education}
                  </strong>
                </div>

              </div>

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  ✦
                </div>

                <div>
                  <span>Career Focus</span>
                  <strong>
                    {profile.focus}
                  </strong>
                </div>

              </div>

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  ◎
                </div>

                <div>
                  <span>Career Goal</span>
                  <strong>
                    {profile.goal}
                  </strong>
                </div>

              </div>

            </div>

            {/* SKILLS */}

            <div className="skills-preview">

              <div className="skills-preview-header">
                <span>
                  Skills
                </span>

                <span>
                  {profile.skills.length} tracked
                </span>
              </div>

              <div className="skill-tags">

                {profile.skills
                  .slice(0, 8)
                  .map((skill, index) => (
                    <span
                      className="skill-tag"
                      key={`${skill}-${index}`}
                    >
                      {skill}
                    </span>
                  ))}

                {profile.skills.length > 8 && (
                  <span className="skill-tag more">
                    +{profile.skills.length - 8}
                  </span>
                )}

              </div>

            </div>

          </div>

          {/* ==========================================
              AI INSIGHT
          ========================================== */}

          <div className="dashboard-card ai-insight-card">

            <div className="ai-insight-header">

              <div className="ai-insight-title">

                <div className="ai-insight-icon">
                  ✦
                </div>

                <div>
                  <span className="section-label">
                    CAREER INTELLIGENCE
                  </span>

                  <h2>
                    AI Insight
                  </h2>
                </div>

              </div>

              <span className="ai-online-badge">
                <span></span>
                AI ONLINE
              </span>

            </div>

            <div className="ai-insight-content">

              {aiLoading ? (
                <div className="ai-insight-loading">

                  <span></span>
                  <span></span>
                  <span></span>

                  <p>
                    CareerOS AI is analyzing your
                    career profile...
                  </p>

                </div>
              ) : (
                <p className="ai-insight-text">
                  {aiInsight}
                </p>
              )}

            </div>

            <button
              className="ai-insight-action"
              onClick={() => navigate("/ask-ai")}
            >
              Ask CareerOS AI
              <span>→</span>
            </button>

          </div>

        </section>

        {/* ==========================================
            DAILY MISSIONS
        ========================================== */}

        <section className="dashboard-card daily-missions-card">

          <div className="missions-header">

            <div>

              <span className="section-label">
                TODAY
              </span>

              <h2>
                Daily Missions
              </h2>

              <p>
                Small actions that move your career
                forward every day.
              </p>

            </div>

            <button
              className="card-link"
              onClick={() =>
                navigate("/career/missions")
              }
            >
              View All Missions →
            </button>

          </div>

          <div className="mission-list">

            {missions.map((mission) => {

              const isCompleted =
                completedMissions.includes(
                  mission.id
                );

              return (
                <div
                  className={`mission-item ${
                    isCompleted
                      ? "completed"
                      : ""
                  }`}
                  key={mission.id}
                >

                  <button
                    className="mission-checkbox"
                    onClick={() =>
                      toggleMission(mission.id)
                    }
                    aria-label={
                      isCompleted
                        ? "Mark mission incomplete"
                        : "Mark mission complete"
                    }
                  >
                    {isCompleted ? "✓" : ""}
                  </button>

                  <div className="mission-content">

                    <div className="mission-top">

                      <h3 className="mission-title">
                        {mission.title}
                      </h3>

                      <span className="mission-category">
                        {mission.category}
                      </span>

                    </div>

                    <p className="mission-description">
                      {mission.description}
                    </p>

                  </div>

                  <span className="mission-arrow">
                    →
                  </span>

                </div>
              );

            })}

          </div>

          {/* MISSION PROGRESS */}

          <div className="mission-progress-footer">

            <div className="mission-progress-info">

              <span>
                Today's Progress
              </span>

              <strong>
                {completedMissions.length}/
                {missions.length}
              </strong>

            </div>

            <div className="mission-progress-bar">

              <div
                className="mission-progress-fill"
                style={{
                  width: `${missionProgress}%`,
                }}
              />

            </div>

            <p>
              {missionProgress === 100
                ? "All missions completed. Great work! 🎉"
                : `${missions.length - completedMissions.length} missions remaining today.`}
            </p>

          </div>

        </section>
                {/* ==========================================
            ASK AI
        ========================================== */}

        <section className="ask-ai-section">

          <div className="ask-ai-header">

            <div className="ask-ai-title">

              <div className="ask-ai-icon">
                🤖
              </div>

              <div>
                <span className="section-label">
                  CAREEROS AI
                </span>

                <h2>
                  Ask AI Anything About Your Career
                </h2>

                <p>
                  Get personalized guidance based on
                  your skills, goals and career path.
                </p>
              </div>

            </div>

            <div className="ask-ai-status">
              <span></span>
              Gemini AI Online
            </div>

          </div>


          {/* AI FORM */}

          <form
            className="ask-ai-form"
            onSubmit={askAI}
          >

            <input
              type="text"
              value={aiQuestion}
              onChange={(event) =>
                setAiQuestion(event.target.value)
              }
              placeholder="Ask something like: How should I prepare for an AI internship?"
              disabled={askAILoading}
            />

            <button
              type="submit"
              disabled={
                askAILoading ||
                !aiQuestion.trim()
              }
            >
              {askAILoading ? (
                "Thinking..."
              ) : (
                <>
                  Ask AI
                  <span>→</span>
                </>
              )}
            </button>

          </form>


          {/* SUGGESTIONS */}

          <div className="ask-ai-suggestions">

            <span>
              Try asking:
            </span>

            <button
              type="button"
              onClick={() =>
                askSuggestion(
                  "How can I become a Generative AI developer?"
                )
              }
            >
              🤖 Become a GenAI Developer
            </button>

            <button
              type="button"
              onClick={() =>
                askSuggestion(
                  "Give me strong AI project ideas for my resume."
                )
              }
            >
              💡 AI Project Ideas
            </button>

            <button
              type="button"
              onClick={() =>
                askSuggestion(
                  "How should I prepare for a Full-Stack developer interview?"
                )
              }
            >
              💻 Interview Preparation
            </button>

            <button
              type="button"
              onClick={() =>
                askSuggestion(
                  "How can I get an internship as a B.Tech student?"
                )
              }
            >
              🎯 Internship Guidance
            </button>

          </div>


          {/* AI ANSWER */}

          {aiAnswer && (
            <div className="ask-ai-answer">

              <div className="ask-ai-answer-header">

                <div className="answer-avatar">
                  🤖
                </div>

                <div>
                  <strong>
                    CareerOS AI
                  </strong>

                  <span>
                    Personalized Career Guidance
                  </span>
                </div>

              </div>

              <div className="ask-ai-answer-text">
                {aiAnswer}
              </div>

            </div>
          )}

        </section>


        {/* ==========================================
            BOTTOM GRID
        ========================================== */}

        <section className="dashboard-bottom-grid">


          {/* ==========================================
              QUICK ACTIONS
          ========================================== */}

          <div className="dashboard-card quick-actions-card">

            <div className="card-heading">

              <div>

                <span className="section-label">
                  SHORTCUTS
                </span>

                <h2>
                  Quick Actions
                </h2>

              </div>

            </div>


            <div className="quick-actions-grid">

              <button
                className="quick-action"
                onClick={() =>
                  navigate("/career/profile")
                }
              >

                <div className="quick-action-icon purple">
                  ◉
                </div>

                <div className="quick-action-content">

                  <strong>
                    Career Profile
                  </strong>

                  <span>
                    Update your career identity
                  </span>

                </div>

                <span className="quick-action-arrow">
                  →
                </span>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  navigate("/career/analysis")
                }
              >

                <div className="quick-action-icon blue">
                  ◈
                </div>

                <div className="quick-action-content">

                  <strong>
                    Career Analysis
                  </strong>

                  <span>
                    Understand your strengths
                  </span>

                </div>

                <span className="quick-action-arrow">
                  →
                </span>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  navigate("/career/roadmap")
                }
              >

                <div className="quick-action-icon orange">
                  ◇
                </div>

                <div className="quick-action-content">

                  <strong>
                    Career Roadmap
                  </strong>

                  <span>
                    Follow your learning path
                  </span>

                </div>

                <span className="quick-action-arrow">
                  →
                </span>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  navigate("/interview")
                }
              >

                <div className="quick-action-icon green">
                  ✦
                </div>

                <div className="quick-action-content">

                  <strong>
                    Interview Prep
                  </strong>

                  <span>
                    Practice for your next interview
                  </span>

                </div>

                <span className="quick-action-arrow">
                  →
                </span>

              </button>

            </div>

          </div>


          {/* ==========================================
              PROGRESS SUMMARY
          ========================================== */}

          <div className="dashboard-card progress-summary-card">

            <div className="card-heading">

              <div>

                <span className="section-label">
                  YOUR PROGRESS
                </span>

                <h2>
                  Progress Summary
                </h2>

              </div>

            </div>


            <div className="progress-summary-list">


              {/* ROADMAP */}

              <div className="progress-summary-item">

                <div className="progress-summary-top">

                  <div>
                    <span>
                      Roadmap
                    </span>

                    <strong>
                      {roadmapProgress}%
                    </strong>
                  </div>

                </div>

                <div className="progress-summary-track">

                  <div
                    className="progress-summary-fill purple"
                    style={{
                      width: `${roadmapProgress}%`,
                    }}
                  />

                </div>

              </div>


              {/* MISSIONS */}

              <div className="progress-summary-item">

                <div className="progress-summary-top">

                  <div>
                    <span>
                      Missions
                    </span>

                    <strong>
                      {missionProgress}%
                    </strong>
                  </div>

                </div>

                <div className="progress-summary-track">

                  <div
                    className="progress-summary-fill orange"
                    style={{
                      width: `${missionProgress}%`,
                    }}
                  />

                </div>

              </div>


              {/* SKILLS */}

              <div className="progress-summary-item">

                <div className="progress-summary-top">

                  <div>
                    <span>
                      Skills
                    </span>

                    <strong>
                      {Math.min(
                        100,
                        profile.skills.length * 8
                      )}%
                    </strong>
                  </div>

                </div>

                <div className="progress-summary-track">

                  <div
                    className="progress-summary-fill blue"
                    style={{
                      width: `${Math.min(
                        100,
                        profile.skills.length * 8
                      )}%`,
                    }}
                  />

                </div>

              </div>


              {/* CAREER READINESS */}

              <div className="progress-summary-item">

                <div className="progress-summary-top">

                  <div>
                    <span>
                      Career Readiness
                    </span>

                    <strong>
                      {careerReadiness}%
                    </strong>
                  </div>

                </div>

                <div className="progress-summary-track">

                  <div
                    className="progress-summary-fill green"
                    style={{
                      width: `${careerReadiness}%`,
                    }}
                  />

                </div>

              </div>

            </div>


            <div className="progress-summary-note">

              <span>✦</span>

              <p>
                Keep completing missions and improving
                your skills to increase your career
                readiness.
              </p>

            </div>

          </div>

        </section>
                {/* ==========================================
            FOOTER
        ========================================== */}

        <footer className="dashboard-footer">

          <div className="dashboard-footer-brand">

            <div className="dashboard-footer-logo">
              <span>✦</span>
              CareerOS
            </div>

            <p>
              Your AI-powered career command center.
            </p>

          </div>


          <div className="dashboard-footer-links">

            <button
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/career/profile")
              }
            >
              Career Profile
            </button>

            <button
              onClick={() =>
                navigate("/career/roadmap")
              }
            >
              Roadmap
            </button>

            <button
              onClick={() =>
                navigate("/ask-ai")
              }
            >
              Ask AI
            </button>

          </div>


          <div className="dashboard-footer-bottom">

            <span>
              © {new Date().getFullYear()} CareerOS
            </span>

            <span>
              Built with AI • React • Node.js
            </span>

          </div>

        </footer>

      </main>

    </div>
  );
}

export default MainDashboard;