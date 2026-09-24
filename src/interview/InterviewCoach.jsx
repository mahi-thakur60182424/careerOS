import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Interview.css";

function InterviewCoach() {
  const navigate = useNavigate();

  const [role, setRole] = useState("AI Full-Stack Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);

  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);

  const roles = [
    "AI Full-Stack Developer",
    "Generative AI Developer",
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ];

  const difficulties = [
    "Easy",
    "Medium",
    "Hard",
  ];

  const questions = {
    Easy: [
      "What is the difference between frontend and backend development?",
      "What is React and why is it used?",
      "What is an API?",
      "What is JavaScript?",
      "What is MongoDB?",
    ],

    Medium: [
      "Explain how authentication works in a full-stack application.",
      "What is the difference between SQL and MongoDB?",
      "How would you design an AI-powered career recommendation system?",
      "Explain the role of middleware in Express.js.",
      "How does state management work in React?",
    ],

    Hard: [
      "How would you design a scalable AI agent architecture for a production application?",
      "How would you handle authentication, authorization, rate limiting and security in an AI application?",
      "How would you reduce hallucinations in a production Generative AI system?",
      "How would you design a production-ready RAG system?",
      "How would you optimize an AI-powered full-stack application for scalability?",
    ],
  };

  const generateQuestion = () => {
    const questionList = questions[difficulty];

    const randomQuestion =
      questionList[
        Math.floor(Math.random() * questionList.length)
      ];

    setQuestion(randomQuestion);
    setAnswer("");
    setFeedback("");
    setScore(null);
  };

  const startInterview = () => {
    setStarted(true);
    setQuestionNumber(1);
    setAnswer("");
    setFeedback("");
    setScore(null);

    const questionList = questions[difficulty];

    const randomQuestion =
      questionList[
        Math.floor(Math.random() * questionList.length)
      ];

    setQuestion(randomQuestion);
  };
    const evaluateAnswer = async () => {
    if (!answer.trim()) {
      setFeedback("Please write your answer before submitting.");
      setScore(null);
      return;
    }

    setLoading(true);
    setFeedback("");
    setScore(null);

    try {
      const response = await fetch(
        "http://localhost:5050/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `
You are CareerOS AI Interview Coach.

Candidate Role: ${role}
Difficulty: ${difficulty}

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate this interview answer.

Give a professional and practical analysis for a college student preparing for placements.

Include:
- Score out of 100
- Strengths
- Technical mistakes or missing points
- How to improve
- Better interview answer

Keep the response clear and concise.
`,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "AI request failed");
      }

      const aiReply = data.reply || "AI evaluation completed.";

      setFeedback(aiReply);

      const scoreMatch = aiReply.match(
        /(?:score|rating)[^\d]*(\d{1,3})\s*(?:\/\s*100|out of 100)?/i
      );

      if (scoreMatch) {
        const extractedScore = Number(scoreMatch[1]);

        if (extractedScore >= 0 && extractedScore <= 100) {
          setScore(extractedScore);
        }
      }
    } catch (error) {
      setFeedback(
        "AI evaluation could not be completed. Please make sure the CareerOS AI server is running on port 5050."
      );
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setQuestionNumber((previous) => previous + 1);
    generateQuestion();
  };

  const restartInterview = () => {
    setStarted(false);
    setQuestion("");
    setAnswer("");
    setFeedback("");
    setScore(null);
    setQuestionNumber(1);
    setLoading(false);
  };

  return (
    <div className="interview-page">
      <div className="interview-container">

        <button
          className="interview-back"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="interview-header-main">
          <div>
            <span className="interview-eyebrow">
              AI INTERVIEW COACH
            </span>

            <h1>Practice Like a Real Interview</h1>

            <p className="interview-subtitle">
              Improve your technical communication, problem solving
              and interview confidence with CareerOS AI.
            </p>
          </div>

          <div className="interview-profile">
            <div className="interview-avatar">
              AI
            </div>
          </div>
        </div>
                <div className="interview-setup">

          <div className="setup-heading">
            <span>INTERVIEW SETUP</span>
            <h2>Customize Your Interview</h2>
          </div>

          <div className="setup-options">

            <div className="setup-group">
              <label>Target Role</label>

              <div className="option-buttons">
                {roles.map((item) => (
                  <button
                    key={item}
                    className={role === item ? "active" : ""}
                    onClick={() => setRole(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="setup-group">
              <label>Difficulty</label>

              <div className="option-buttons">
                {difficulties.map((item) => (
                  <button
                    key={item}
                    className={difficulty === item ? "active" : ""}
                    onClick={() => setDifficulty(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="setup-details">

            <div>
              <span>ROLE</span>
              <strong>{role}</strong>
            </div>

            <div>
              <span>LEVEL</span>
              <strong>{difficulty}</strong>
            </div>

            <div>
              <span>QUESTION</span>
              <strong>
                {started ? `0${questionNumber}` : "Ready"}
              </strong>
            </div>

            <button
              className="start-interview-btn"
              onClick={started ? restartInterview : startInterview}
            >
              {started ? "Restart Interview" : "Start Interview"}
            </button>

          </div>

        </div>

        <div className="question-section">

          <div className="question-section-header">

            <div>
              <span>
                QUESTION {started ? `0${questionNumber}` : "01"}
              </span>

              <h2>Your Interview Question</h2>
            </div>

            {started && (
              <div className="question-meta">
                <span>{difficulty}</span>
                <span>{role}</span>
              </div>
            )}

          </div>

          {!started ? (
            <div className="interview-empty">

              <div className="interview-avatar">
                AI
              </div>

              <h3>Your interview starts here</h3>

              <p>
                Select your target role and difficulty, then click
                Start Interview to begin your AI-powered interview.
              </p>

              <button
                className="start-interview-btn"
                onClick={startInterview}
              >
                Start Interview
              </button>

            </div>
          ) : (

            <div className="question-card-content">

              <div className="question-card">

                <div className="question-number">
                  0{questionNumber}
                </div>

                <div>
                  <span>INTERVIEW QUESTION</span>

                  <h2>{question}</h2>
                </div>

              </div>

              <div className="answer-section">

                <div className="answer-heading">

                  <div>
                    <span>YOUR ANSWER</span>
                    <h3>Explain your answer clearly</h3>
                  </div>

                  <span>
                    {answer.trim()
                      ? answer.trim().split(/\s+/).length
                      : 0}{" "}
                    words
                  </span>

                </div>

                <textarea
                  value={answer}
                  onChange={(event) =>
                    setAnswer(event.target.value)
                  }
                  placeholder="Type your interview answer here..."
                  disabled={loading}
                />

                <div className="answer-footer">

                  <p>
                    Explain the concept, implementation and a
                    practical example.
                  </p>

                  <button
                    className="evaluate-btn"
                    onClick={evaluateAnswer}
                    disabled={loading}
                  >
                    {loading
                      ? "AI Analyzing..."
                      : "Evaluate Answer →"}
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>
                {feedback && (
          <div className="feedback-section">

            <div className="feedback-card-top">

              <div>
                <span className="feedback-badge">
                  AI FEEDBACK
                </span>

                <h2>Interview Analysis</h2>
              </div>

              <div className="feedback-ai-icon">
                AI
              </div>

            </div>

            <div className="feedback-content">
              <p>{feedback}</p>
            </div>

            {score !== null && (
              <div className="feedback-score">
                <strong>{score}</strong>
                <span>/ 100</span>
              </div>
            )}

            <div className="feedback-actions">

              <button
                className="next-question-btn"
                onClick={nextQuestion}
              >
                Next Question →
              </button>

              <button
                className="restart-btn"
                onClick={restartInterview}
              >
                Restart Interview
              </button>

            </div>

          </div>
        )}

        <div className="interview-features">

          <div className="feature-card">

            <div className="feature-icon">
              01
            </div>

            <h3>Explain Clearly</h3>

            <p>
              Start with the concept, explain how it works and
              describe why it matters.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              02
            </div>

            <h3>Use Examples</h3>

            <p>
              Connect technical concepts with your projects and
              real-world situations.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              03
            </div>

            <h3>Think Step-by-Step</h3>

            <p>
              Break complex problems into smaller parts before
              explaining your solution.
            </p>

          </div>

        </div>

        <div className="interview-footer">
          <p>
            CareerOS AI Interview Coach • Practice. Improve. Get Ready.
          </p>
        </div>

      </div>
    </div>
  );
}

export default InterviewCoach;