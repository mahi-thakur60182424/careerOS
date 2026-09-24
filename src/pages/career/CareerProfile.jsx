import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CareerProfile.css";

const defaultProfile = {
  name: "Mahi Thakur",
  role: "AI Full-Stack Developer",
  education: "B.Tech CSE",
  experience: "Early Career",
  focus: "Generative AI + Agentic AI",
  goal: "Become a production-ready AI Full-Stack Developer",
  skills:
    "HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, SQL, Python, Generative AI, Agentic AI",
};

function CareerProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("careeros-profile");

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile({
          ...defaultProfile,
          ...parsedProfile,
        });
      } catch (error) {
        console.error("Profile loading error:", error);
      }
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  }

  function calculateProfileScore() {
    let score = 0;

    if (profile.name.trim()) {
      score += 5;
    }

    if (profile.role.trim()) {
      score += 10;
    }

    if (profile.education.trim()) {
      score += 10;
    }

    if (profile.experience.trim()) {
      score += 5;
    }

    if (profile.focus.trim()) {
      score += 10;
    }

    if (profile.goal.trim()) {
      score += 10;
    }

    if (profile.skills.trim()) {
      score += 20;
    }

    return score;
  }

  function calculateCareerReadiness() {
    const savedMissions = localStorage.getItem(
      "careeros-completed-missions"
    );

    let completedMissionCount = 0;

    try {
      const missions = savedMissions
        ? JSON.parse(savedMissions)
        : [];

      if (Array.isArray(missions)) {
        completedMissionCount = missions.length;
      }
    } catch (error) {
      completedMissionCount = 0;
    }

    const profileScore = calculateProfileScore();

    const missionScore = completedMissionCount * 5;

    const readiness = Math.min(
      90,
      20 + profileScore + missionScore
    );

    return readiness;
  }

  function handleSave() {
    localStorage.setItem(
      "careeros-profile",
      JSON.stringify(profile)
    );

    const readiness = calculateCareerReadiness();

    localStorage.setItem(
      "career-readiness",
      String(readiness)
    );

    setSaved(true);

    navigate("/career/analysis");
  }
    return (
    <div className="career-profile-page">
      <div className="career-profile-container">
        <header className="profile-header">
          <div className="profile-header-content">
            <p className="profile-eyebrow">
              CAREEROS INTELLIGENCE
            </p>

            <h1>
              Build Your <span>Career DNA</span>
            </h1>

            <p className="profile-subtitle">
              Tell CareerOS about yourself so your AI career agent
              can create a personalized career journey.
            </p>
          </div>

          <div className="profile-ai-status">
            <span className="status-dot"></span>
            AI PROFILE ENGINE
          </div>
        </header>

        <section className="profile-card">
          <div className="profile-card-heading">
            <div>
              <p className="card-label">
                PERSONAL INFORMATION
              </p>

              <h2>Your Career Identity</h2>
            </div>

            <div className="profile-icon">
              ✦
            </div>
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Target Role</label>

              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                placeholder="e.g. AI Full-Stack Developer"
              />
            </div>

            <div className="form-group">
              <label>Education</label>

              <input
                type="text"
                name="education"
                value={profile.education}
                onChange={handleChange}
                placeholder="e.g. B.Tech CSE"
              />
            </div>

            <div className="form-group">
              <label>Experience Level</label>

              <select
                name="experience"
                value={profile.experience}
                onChange={handleChange}
              >
                <option>Student</option>
                <option>Early Career</option>
                <option>Intermediate</option>
                <option>Experienced</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Primary Career Focus</label>

              <input
                type="text"
                name="focus"
                value={profile.focus}
                onChange={handleChange}
                placeholder="e.g. GenAI + Agentic AI"
              />
            </div>
                        <div className="form-group full-width">
              <label>Career Goal</label>

              <textarea
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                placeholder="Describe what you want to achieve..."
                rows="4"
              />
            </div>

            <div className="form-group full-width">
              <label>Your Skills</label>

              <textarea
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, Python, SQL, Generative AI"
                rows="4"
              />
            </div>
          </div>

          <div className="profile-actions">
            {saved && (
              <span className="saved-message">
                ✓ Career DNA saved
              </span>
            )}

            <button
              className="save-profile-button"
              onClick={handleSave}
            >
              Save Career DNA →
            </button>
          </div>
        </section>

        <section className="ai-preview-card">
          <div className="preview-icon">
            ✦
          </div>

          <div className="preview-content">
            <p>CAREEROS AI</p>

            <h3>
              Your AI Career Agent will use this profile
              to personalize your journey.
            </h3>

            <div className="preview-tags">
              <span>Skill Gap Analysis</span>
              <span>AI Roadmap</span>
              <span>Daily Missions</span>
              <span>Mock Interviews</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CareerProfile;