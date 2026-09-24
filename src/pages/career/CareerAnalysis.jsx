import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CareerAnalysis.css";

function CareerAnalysis() {
  const navigate = useNavigate();

  const [profile] = useState(() => {
    const savedProfile = localStorage.getItem("careeros-profile");

    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (error) {
        console.error("Profile loading error:", error);
      }
    }

    return {
      name: "Mahi Thakur",
      role: "AI Full-Stack Developer",
      education: "B.Tech CSE",
      experience: "Early Career",
      focus: "Generative AI + Agentic AI",
      goal: "Become a production-ready AI Full-Stack Developer",
      skills:
        "HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, SQL, Python, Generative AI, Agentic AI",
    };
  });

  const skills = profile.skills
    ? profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const skillNames = skills.map((skill) => skill.toLowerCase());

  const [completedPhases] = useState(() => {
    const savedProgress = localStorage.getItem(
      "careeros-roadmap-progress"
    );

    if (!savedProgress) {
      return [];
    }

    try {
      const parsedProgress = JSON.parse(savedProgress);
      return Array.isArray(parsedProgress) ? parsedProgress : [];
    } catch (error) {
      console.error("Roadmap progress loading error:", error);
      return [];
    }
  });

  const roadmapTotal = 5;

  const roadmapProgress = Math.round(
    (completedPhases.length / roadmapTotal) * 100
  );

  const skillScore = Math.min(skills.length * 7, 70);

  const careerReadiness = Math.min(
    100,
    Math.round(skillScore * 0.7 + roadmapProgress * 0.3)
  );

  let readinessTitle = "Getting Started";

  if (careerReadiness >= 80) {
    readinessTitle = "Career Ready";
  } else if (careerReadiness >= 65) {
    readinessTitle = "Strong Momentum";
  } else if (careerReadiness >= 50) {
    readinessTitle = "Building Momentum";
  }

  let aiInsight = "";

  if (completedPhases.length === 0) {
    aiInsight = `You have a strong starting foundation for ${profile.role}. Begin with the Full-Stack Foundation phase and strengthen your core development skills before moving deeper into AI systems.`;
  } else if (completedPhases.length < 3) {
    aiInsight = `You are building good momentum toward ${profile.role}. Continue strengthening Full-Stack and Generative AI skills while gradually moving toward Agentic AI development.`;
  } else if (completedPhases.length < 5) {
    aiInsight = `You are progressing toward production-level AI development. Focus on system design, deployment and building practical AI-powered applications.`;
  } else {
    aiInsight = `You have completed your CareerOS roadmap. Your next priority should be real-world projects, portfolio quality and interview preparation.`;
  }

  const gaps = [];

  if (
    !skillNames.some(
      (skill) =>
        skill.includes("llm") ||
        skill.includes("large language")
    )
  ) {
    gaps.push({
      title: "LLM Development",
      text: "Learn how modern LLM applications are built, integrated and deployed.",
    });
  }

  if (
    !skillNames.some(
      (skill) =>
        skill.includes("agentic") ||
        skill.includes("ai agent") ||
        skill.includes("agents")
    )
  ) {
    gaps.push({
      title: "Agentic AI",
      text: "Build AI agents capable of reasoning, tool usage and multi-step workflows.",
    });
  }

  if (
    !skillNames.some(
      (skill) =>
        skill.includes("system design") ||
        skill.includes("ai architecture")
    )
  ) {
    gaps.push({
      title: "AI System Design",
      text: "Understand how AI features connect with real-world full-stack applications.",
    });
  }

  if (
    !skillNames.some(
      (skill) =>
        skill.includes("deployment") ||
        skill.includes("cloud") ||
        skill.includes("aws") ||
        skill.includes("vercel")
    )
  ) {
    gaps.push({
      title: "Cloud & Deployment",
      text: "Learn how to deploy and maintain production-ready full-stack AI applications.",
    });
  }

  return (
    <div className="career-analysis-page">
      <div className="career-analysis-container">
        <header className="analysis-header">
          <div>
            <p className="analysis-eyebrow">
              CAREEROS INTELLIGENCE
            </p>

            <h1>
              Your Career <span>Analysis</span>
            </h1>

            <p className="analysis-subtitle">
              AI-powered analysis for {profile.name}, based on your
              career profile, skills and roadmap progress.
            </p>
          </div>

          <div className="analysis-status">
            <span></span>
            AI ANALYSIS READY
          </div>
        </header>

        <div className="analysis-grid">
          <div className="readiness-card">
            <p>CAREER READINESS</p>

            <div className="readiness-score">
              <strong>{careerReadiness}</strong>
              <span>%</span>
            </div>

            <h3>{readinessTitle}</h3>

            <p className="readiness-text">
              Your current profile has {skills.length} skills
              analyzed and {completedPhases.length} of{" "}
              {roadmapTotal} roadmap phases completed.
            </p>

            <div className="readiness-track">
              <div
                style={{
                  width: `${careerReadiness}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="insight-card">
            <p>AI INSIGHT</p>

            <h2>{aiInsight}</h2>

            <span className="insight-line">
              CareerOS Recommendation
            </span>
          </div>
        </div>

        <section className="skills-section">
          <div className="section-heading">
            <div>
              <p>SKILL INTELLIGENCE</p>
              <h2>Current Skill Profile</h2>
            </div>

            <span>{skills.length} skills analyzed</span>
          </div>

          <div className="skills-list">
            {skills.map((skill, index) => {
              const skillPercentage =
                index < 3 ? 85 : index < 7 ? 70 : 45;

              const skillLevel =
                index < 3
                  ? "Advanced"
                  : index < 7
                  ? "Intermediate"
                  : "Developing";

              return (
                <div className="skill-row" key={skill}>
                  <div className="skill-name">
                    <strong>{skill}</strong>
                    <span>{skillLevel}</span>
                  </div>

                  <div className="skill-bar">
                    <div
                      style={{
                        width: `${skillPercentage}%`,
                      }}
                    ></div>
                  </div>

                  <b>{skillPercentage}%</b>
                </div>
              );
            })}
          </div>
        </section>

        <section className="gap-section">
          <div className="section-heading">
            <div>
              <p>AI GAP DETECTION</p>
              <h2>Skills To Strengthen</h2>
            </div>

            <span>{gaps.length} growth areas</span>
          </div>

          <div className="gap-grid">
            {gaps.map((gap, index) => (
              <div className="gap-card" key={gap.title}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{gap.title}</h3>

                <p>{gap.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="career-goal-section">
          <div>
            <p>YOUR CAREER GOAL</p>
            <h2>{profile.goal}</h2>
          </div>

          <button
            onClick={() => navigate("/career/roadmap")}
          >
            View AI Roadmap →
          </button>
        </section>
      </div>
    </div>
  );
}

export default CareerAnalysis;