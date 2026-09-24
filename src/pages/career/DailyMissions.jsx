import { useState } from "react";
import "./DailyMissions.css";

function DailyMissions() {

  // --------------------------------
  // CAREER PROFILE
  // --------------------------------

  const [profile] = useState(() => {
    const savedProfile =
      localStorage.getItem("careeros-profile");

    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );
      }
    }

    return {
      name: "Mahi Thakur",
      role: "AI Full-Stack Developer",
      education: "B.Tech CSE",
      experience: "Early Career",
      focus: "Generative AI + Agentic AI",
      goal:
        "Become a production-ready AI Full-Stack Developer",
      skills:
        "HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, SQL, Python, Generative AI, Agentic AI",
    };
  });

  // --------------------------------
  // ROADMAP PROGRESS
  // --------------------------------

  const [completedPhases] = useState(() => {
    const savedProgress =
      localStorage.getItem(
        "careeros-roadmap-progress"
      );

    if (!savedProgress) {
      return [];
    }

    try {
      const parsedProgress =
        JSON.parse(savedProgress);

      return Array.isArray(parsedProgress)
        ? parsedProgress
        : [];
    } catch (error) {
      console.error(
        "Roadmap progress loading error:",
        error
      );

      return [];
    }
  });

  const roadmapTotal = 5;

  // --------------------------------
  // PROFILE SKILLS
  // --------------------------------

  const skills = profile.skills
    ? profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill)
    : [];

  const skillNames = skills.map((skill) =>
    skill.toLowerCase()
  );

  // --------------------------------
  // SKILL GAP DETECTION
  // --------------------------------

  const hasLLM = skillNames.some(
    (skill) =>
      skill.includes("llm") ||
      skill.includes("large language")
  );

  const hasAgenticAI = skillNames.some(
    (skill) =>
      skill.includes("agentic") ||
      skill.includes("ai agent") ||
      skill.includes("agents")
  );

  const hasSystemDesign = skillNames.some(
    (skill) =>
      skill.includes("system design") ||
      skill.includes("ai architecture")
  );

  const hasDeployment = skillNames.some(
    (skill) =>
      skill.includes("deployment") ||
      skill.includes("cloud") ||
      skill.includes("aws") ||
      skill.includes("vercel")
  );

  // --------------------------------
  // COMPLETED MISSIONS
  // --------------------------------

  const [completed, setCompleted] = useState(() => {
    const savedMissions = localStorage.getItem(
      "careeros-completed-missions"
    );

    if (!savedMissions) {
      return [];
    }

    try {
      const parsedMissions =
        JSON.parse(savedMissions);

      return Array.isArray(parsedMissions)
        ? parsedMissions
        : [];
    } catch (error) {
      console.error(
        "Mission loading error:",
        error
      );

      return [];
    }
  });

  // --------------------------------
  // SMART MISSION GENERATION
  // --------------------------------

  const missions = [];

  // Mission 1
  missions.push({
    id: "fullstack-core",
    type: "CODING",
    title: "Build a React Feature",
    description:
      "Create a small React feature using components, props and state.",
    time: "45 MIN",
  });

  // Mission 2
  if (!hasLLM) {
    missions.push({
      id: "llm-learning",
      type: "AI",
      title: "Learn LLM Fundamentals",
      description:
        "Understand tokens, context windows, embeddings and how LLM applications work.",
      time: "30 MIN",
    });
  } else {
    missions.push({
      id: "llm-practice",
      type: "AI",
      title: "Build an LLM Feature",
      description:
        "Create a small AI feature using an LLM API and connect it to a full-stack application.",
      time: "45 MIN",
    });
  }

  // Mission 3
  missions.push({
    id: "backend-api",
    type: "BACKEND",
    title: "Build an API Endpoint",
    description:
      "Create and test one REST API endpoint using Node.js and Express.",
    time: "40 MIN",
  });

  // Mission 4
  if (!hasAgenticAI) {
    missions.push({
      id: "agentic-foundation",
      type: "AGENTIC AI",
      title: "Understand AI Agents",
      description:
        "Learn how AI agents use reasoning, tools, memory and workflows to complete tasks.",
      time: "30 MIN",
    });
  } else {
    missions.push({
      id: "agentic-practice",
      type: "AGENTIC AI",
      title: "Design an AI Agent",
      description:
        "Design an AI agent that can reason, select tools and complete a multi-step task.",
      time: "35 MIN",
    });
  }

  // Mission 5
  if (
    completedPhases.length >= 3 &&
    !hasSystemDesign
  ) {
    missions.push({
      id: "system-design",
      type: "SYSTEM DESIGN",
      title: "Study AI System Design",
      description:
        "Design the architecture of a full-stack AI application including frontend, backend, database and AI layer.",
      time: "35 MIN",
    });
  }

  // Mission 6
  if (
    completedPhases.length >= 4 &&
    !hasDeployment
  ) {
    missions.push({
      id: "deployment",
      type: "PRODUCTION",
      title: "Deploy an AI Application",
      description:
        "Practice deploying a full-stack application and understand production environment configuration.",
      time: "40 MIN",
    });
  }
    // --------------------------------
  // MISSION COMPLETION
  // --------------------------------

  function toggleMission(id) {
    setCompleted((prev) => {
      const updatedMissions = prev.includes(id)
        ? prev.filter((missionId) => missionId !== id)
        : [...prev, id];

      localStorage.setItem(
        "careeros-completed-missions",
        JSON.stringify(updatedMissions)
      );

      return updatedMissions;
    });
  }

  // --------------------------------
  // DAILY PROGRESS
  // --------------------------------

  const completedToday = missions.filter(
    (mission) => completed.includes(mission.id)
  ).length;

  const progress =
    missions.length > 0
      ? Math.round(
          (completedToday / missions.length) * 100
        )
      : 0;

  // --------------------------------
  // SMART STATUS
  // --------------------------------

  let missionStatus = "START YOUR DAY";

  if (progress === 100) {
    missionStatus = "DAY COMPLETED";
  } else if (progress >= 50) {
    missionStatus = "STRONG PROGRESS";
  } else if (progress > 0) {
    missionStatus = "KEEP GOING";
  }

  return (
    <div className="daily-missions-page">
      <div className="daily-missions-container">

        {/* HEADER */}

        <header className="missions-header">

          <div>

            <p className="missions-eyebrow">
              CAREEROS DAILY INTELLIGENCE
            </p>

            <h1>
              Today's <span>Missions</span>
            </h1>

            <p className="missions-subtitle">
              Personalized tasks generated from your career
              profile, skill gaps and roadmap progress.
            </p>

          </div>

          <div className="missions-date">

            <span>TODAY</span>

            <strong>
              {missionStatus}
            </strong>

          </div>

        </header>

        {/* PROFILE INFO */}

        <section className="missions-progress">

          <div>

            <p>AI CAREER PLAN</p>

            <h2>
              {profile.role}
            </h2>

            <span>
              Focus: {profile.focus}
            </span>

          </div>

          <div className="progress-percentage">
            {progress}%
          </div>

        </section>

        {/* DAILY PROGRESS */}

        <section
          style={{
            marginBottom: "30px",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #222",
          }}
        >

          <p
            style={{
              margin: "0 0 8px",
              fontSize: "12px",
              letterSpacing: "1.5px",
              opacity: "0.6",
            }}
          >
            DAILY PROGRESS
          </p>

          <h2
            style={{
              margin: 0,
            }}
          >
            {completedToday} / {missions.length} Missions
            Completed
          </h2>

          <div
            style={{
              width: "100%",
              height: "8px",
              marginTop: "16px",
              borderRadius: "20px",
              background: "#222",
              overflow: "hidden",
            }}
          >

            <div
              style={{
                width: progress + "%",
                height: "100%",
                background: "#fff",
                borderRadius: "20px",
                transition: "width 0.3s ease",
              }}
            ></div>

          </div>

        </section>

        {/* MISSION LIST */}

        <section className="missions-list">

          {missions.map((mission) => {

            const isCompleted =
              completed.includes(mission.id);

            return (
              <div
                className={`mission-card ${
                  isCompleted
                    ? "completed"
                    : ""
                }`}
                key={mission.id}
              >

                <div className="mission-number">
                  {String(
                    missions.indexOf(mission) + 1
                  ).padStart(2, "0")}
                </div>

                <div className="mission-content">

                  <span className="mission-type">
                    {mission.type}
                  </span>

                  <h3>
                    {mission.title}
                  </h3>

                  <p>
                    {mission.description}
                  </p>

                  <span className="mission-time">
                    ⏱ {mission.time}
                  </span>

                </div>

                <button
                  type="button"
                  className="mission-button"
                  onClick={() =>
                    toggleMission(mission.id)
                  }
                >
                  {isCompleted
                    ? "✓ Completed"
                    : "Complete Mission"}
                </button>

              </div>
            );
          })}

        </section>
                {/* AI MISSION SUMMARY */}

        <section
          style={{
            marginTop: "40px",
            padding: "28px",
            borderRadius: "16px",
            border: "1px solid #222",
          }}
        >

          <p
            style={{
              margin: "0 0 10px",
              fontSize: "12px",
              letterSpacing: "2px",
              opacity: "0.6",
            }}
          >
            CAREEROS AI
          </p>

          <h2
            style={{
              margin: "0 0 12px",
            }}
          >
            Your missions are personalized for your career.
          </h2>

          <p
            style={{
              margin: 0,
              lineHeight: "1.7",
              opacity: "0.7",
            }}
          >
            CareerOS is using your current skills, detected skill
            gaps and roadmap progress to decide which learning
            tasks should appear in your daily mission plan.
          </p>

        </section>

        {/* ROADMAP CONNECTION */}

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
          }}
        >

          <button
            type="button"
            className="mission-button"
            onClick={() =>
              window.location.href =
                "/career/roadmap"
            }
          >
            View Career Roadmap →
          </button>

        </div>

      </div>
    </div>
  );
}

export default DailyMissions;