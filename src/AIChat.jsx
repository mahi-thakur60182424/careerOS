
import { useState } from "react";
import "./AIChat.css";

function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5050/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: data.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: data.message || "AI response failed. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("CareerOS AI error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Unable to connect to CareerOS AI. Please make sure the AI server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-page">
      <div className="ai-container">

        <div className="ai-header">
          <div className="ai-icon">🤖</div>

          <div>
            <h1>CareerOS AI</h1>
            <p>Your personal AI career assistant</p>
          </div>

          <div className="ai-status">
            <span></span>
            Online
          </div>
        </div>

        <div className="ai-chat-box">

          {messages.length === 0 && (
            <div className="ai-welcome">
              <div className="welcome-icon">✨</div>

              <h2>How can I help you today?</h2>

              <p>
                Ask me about coding, projects, internships,
                interviews, Generative AI or your career roadmap.
              </p>

              <div className="suggestions">

                <button
                  onClick={() =>
                    setMessage(
                      "How can I become a Generative AI developer?"
                    )
                  }
                >
                  🤖 Learn Generative AI
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "Give me some strong AI project ideas."
                    )
                  }
                >
                  💡 AI Project Ideas
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "How should I prepare for a Full-Stack interview?"
                    )
                  }
                >
                  💻 Interview Preparation
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "How can I get an internship as a student?"
                    )
                  }
                >
                  🎯 Internship Guidance
                </button>

              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.role === "user"
                  ? "user-message"
                  : "ai-message"
              }`}
            >
              <div className="message-avatar">
                {msg.role === "user" ? "👤" : "🤖"}
              </div>

              <div className="message-content">
                <div className="message-name">
                  {msg.role === "user"
                    ? "You"
                    : "CareerOS AI"}
                </div>

                <div className="message-text">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-message ai-message">

              <div className="message-avatar">
                🤖
              </div>

              <div className="message-content">

                <div className="message-name">
                  CareerOS AI
                </div>

                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            </div>
          )}

        </div>

        <div className="ai-input-area">

          <input
            type="text"
            placeholder="Ask CareerOS AI anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            className="send-button"
            onClick={sendMessage}
            disabled={loading || !message.trim()}
          >
            {loading ? "..." : "➤"}
          </button>

        </div>

        <p className="ai-disclaimer">
          CareerOS AI can make mistakes. Always verify important information.
        </p>

      </div>
    </div>
  );
}

export default AIChat;

