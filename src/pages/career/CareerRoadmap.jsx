
import { useState } from "react";
import "./CareerRoadmap.css";

function CareerRoadmap() {
  const [profile] = useState(() => {
    const savedProfile = localStorage.getItem("careeros-profile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "Mahi Thakur",
          role: "AI Full-Stack Developer",
          focus: "Generative AI + Agentic AI",
          goal: "Become a production-ready AI Full-Stack Developer",
          skills:
            "HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, SQL, Python, Generative AI, Agentic AI",
        };
  });

  const roadmap = [
    {
      number: "01",
      phase: "FOUNDATION",
      title: "Strengthen Full-Stack Core",
      duration: "4–6 Weeks",
      description:
        "Build a strong foundation in modern frontend, backend, databases and API development.",
      skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
    },
    {
      number: "02",
      phase: "AI CORE",
      title: "Master Generative AI",
      duration: "4–6 Weeks",
      description:
        "Learn how LLM-powered applications work and build practical AI features into full-stack applications.",
      skills: ["Python", "LLMs", "Prompt Engineering", "RAG", "AI APIs"],
    },
    {
      number: "03",
      phase: "AGENTIC AI",
      title: "Build AI Agents",
      duration: "5–7 Weeks",
      description:
        "Move from simple AI features to intelligent agents capable of reasoning, tool usage and multi-step workflows.",
      skills: [
        "AI Agents",
        "Tool Calling",
        "Memory",
        "Workflows",
        "Agent Frameworks",
      ],
    },
    {
      number: "04",
      phase: "PRODUCTION",
      title: "Build Real AI Systems",
      duration: "6–8 Weeks",
      description:
        "Combine full-stack engineering and AI into production-ready applications with authentication, databases and deployment.",
      skills: [
        "System Design",
        "Authentication",
        "Deployment",
        "Cloud",
        "Security",
      ],
    },
    {
      number: "05",
      phase: "CAREER READY",
      title: "Build Your AI Portfolio",
      duration: "4–6 Weeks",
      description:
        "Create strong projects, prepare for interviews and present your technical work professionally.",
      skills: [
        "Projects",
        "GitHub",
        "Resume",
        "Mock Interviews",
        "Interview Preparation",
      ],
    },
  ];

  // Load completed roadmap phases from localStorage
  const [completedPhases, setCompletedPhases] = useState(() => {
    const saved = localStorage.getItem("careeros-roadmap-progress");

    try {
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  });

  function togglePhase(number) {
    let updatedProgress;

    if (completedPhases.includes(number)) {
      updatedProgress = completedPhases.filter(
        (phase) => phase !== number
      );
    } else {
      updatedProgress = [...completedPhases, number];
    }

    setCompletedPhases(updatedProgress);

    localStorage.setItem(
      "careeros-roadmap-progress",
      JSON.stringify(updatedProgress)
    );

    // Update overall CareerOS readiness
    const roadmapProgress =
      (updatedProgress.length / roadmap.length) * 20;

    const existingReadiness =
      Number(localStorage.getItem("career-readiness")) || 20;

    const newReadiness = Math.min(
      100,
      Math.max(existingReadiness, Math.round(70 + roadmapProgress))
    );

    localStorage.setItem(
      "career-readiness",
      String(newReadiness)
    );
  }

  const completedCount = completedPhases.length;

  const progressPercentage = Math.round(
    (completedCount / roadmap.length) * 100
  );

  return (
    <div className="career-roadmap-page">
      <div className="career-roadmap-container">

        {/* HEADER */}
        <header className="roadmap-header">
          <div>
            <p className="roadmap-eyebrow">
              CAREEROS INTELLIGENCE
            </p>

            <h1>
              Your AI Career <span>Roadmap</span>
            </h1>

            <p className="roadmap-subtitle">
              A personalized learning journey designed for{" "}
              <strong>{profile.role}</strong>, based on your current
              skills, career focus and long-term goal.
            </p>
          </div>

          <div className="roadmap-status">
            <span></span>
            AI ROADMAP GENERATED
          </div>
        </header>

        {/* SUMMARY */}
        <section className="roadmap-summary">

          <div className="summary-card">
            <span>TARGET ROLE</span>
            <strong>{profile.role}</strong>
          </div>

          <div className="summary-card">
            <span>CAREER FOCUS</span>
            <strong>{profile.focus}</strong>
          </div>

          <div className="summary-card">
            <span>ROADMAP PROGRESS</span>
            <strong>
              {completedCount}/{roadmap.length} Phases
            </strong>
          </div>

        </section>

        {/* PROGRESS */}
        <section className="roadmap-progress-card">

          <div className="progress-heading">
            <div>
              <span>CAREEROS PROGRESS</span>
              <h3>Career Roadmap Progress</h3>
            </div>

            <strong>{progressPercentage}%</strong>
          </div>

          <div className="roadmap-progress-bar">
            <div
              className="roadmap-progress-fill"
              style={{
                width: `${progressPercentage}%`,
              }}
            ></div>
          </div>

          <p>
            {completedCount === 0
              ? "Start with Phase 01 and build your foundation."
              : completedCount === roadmap.length
              ? "All roadmap phases completed. CareerOS journey complete!"
              : `${completedCount} phase${
                  completedCount > 1 ? "s" : ""
                } completed. Keep building your career.`}
          </p>

        </section>

        {/* ROADMAP */}
        <section className="roadmap-section">

          <div className="section-heading">
            <div>
              <p>PERSONALIZED JOURNEY</p>
              <h2>From Skills to AI Career</h2>
            </div>

            <span>AI Generated Plan</span>
          </div>

          <div className="roadmap-list">

            {roadmap.map((item) => {
              const isCompleted = completedPhases.includes(
                item.number
              );

              return (
                <div
                  className={`roadmap-item ${
                    isCompleted ? "completed" : ""
                  }`}
                  key={item.number}
                >

                  <div className="roadmap-number">
                    {isCompleted ? "✓" : item.number}
                  </div>

                  <div className="roadmap-line"></div>

                  <div className="roadmap-content">

                    <div className="roadmap-top">

                      <div>
                        <span className="roadmap-phase">
                          {item.phase}
                        </span>

                        <h3>{item.title}</h3>
                      </div>

                      <span className="roadmap-duration">
                        {item.duration}
                      </span>

                    </div>

                    <p>{item.description}</p>

                    <div className="roadmap-skills">

                      {item.skills.map((skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      ))}

                    </div>

                    <button
                      className="phase-complete-button"
                      onClick={() =>
                        togglePhase(item.number)
                      }
                    >
                      {isCompleted
                        ? "✓ Phase Completed"
                        : "Mark Phase Complete →"}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* CAREER GOAL */}
        <section className="roadmap-goal">

          <div>
            <p>YOUR CAREER GOAL</p>

            <h2>{profile.goal}</h2>
          </div>

          <div className="goal-mark">
            ✦
          </div>

        </section>

      </div>
    </div>
  );
}

export default CareerRoadmap;

