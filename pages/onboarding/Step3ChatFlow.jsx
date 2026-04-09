import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendChatMessage, startChatSession } from "../../services/api";
import { getCurrentUserId, getStoredUser } from "../../utils/session";

function normalizeMessage(message) {
  return {
    role: message.role,
    text: message.text,
    recordedAt: message.recordedAt || new Date().toISOString(),
  };
}

function Step3ChatFlow() {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const storedUser = getStoredUser();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatDone, setChatDone] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [chatLanguage, setChatLanguage] = useState("english");
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(3);

  const userName = storedUser?.profile?.name || storedUser?.name || "there";
  const roleLabel = storedUser?.roleLabel || "User";

  useEffect(() => {
    let active = true;

    async function loadChat() {
      setLoading(true);
      setError("");

      try {
        const response = await startChatSession(userId, chatLanguage);
        if (!active) {
          return;
        }

        setMessages((response.messages || []).map(normalizeMessage));
        setQuestionCount(response.askedCount || 0);
        setTotalQuestions(response.totalQuestions || 3);
        setChatDone(false);
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "Chat unavailable.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadChat();

    return () => {
      active = false;
    };
  }, [chatLanguage, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    if (!input.trim() || loading || chatDone) {
      return;
    }

    const message = input.trim();
    setInput("");
    setError("");
    setMessages((current) => [...current, normalizeMessage({ role: "user", text: message })]);
    setLoading(true);

    try {
      const response = await sendChatMessage(userId, {
        message,
        language: chatLanguage,
      });

      setMessages((current) => [
        ...current,
        normalizeMessage({ role: "aria", text: response.message }),
      ]);
      setQuestionCount(response.askedCount || questionCount);
      setTotalQuestions(response.totalQuestions || totalQuestions);
      setChatDone(Boolean(response.complete));
    } catch (requestError) {
      setError(requestError.message || "Unable to continue chat.");
    } finally {
      setLoading(false);
    }
  }

  function handleVoice() {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Voice input ke liye Chrome use karo.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = chatLanguage === "hinglish" ? "hi-IN" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  }

  return (
    <div style={styles.page}>
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.chatBox}>
        <div style={styles.header}>
          <div>
            <div style={styles.ariaName}>ARIA</div>
            <div style={styles.ariaMeta}>
              {userName} • {roleLabel}
            </div>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.langBox}>
              <button
                type="button"
                style={{
                  ...styles.langBtn,
                  backgroundColor: chatLanguage === "english" ? "#a78bfa" : "transparent",
                  color: chatLanguage === "english" ? "#0f0f1a" : "#94a3b8",
                }}
                onClick={() => setChatLanguage("english")}
              >
                EN
              </button>
              <button
                type="button"
                style={{
                  ...styles.langBtn,
                  backgroundColor: chatLanguage === "hinglish" ? "#a78bfa" : "transparent",
                  color: chatLanguage === "hinglish" ? "#0f0f1a" : "#94a3b8",
                }}
                onClick={() => setChatLanguage("hinglish")}
              >
                HI
              </button>
            </div>

            <div style={styles.progressText}>
              {Math.min(questionCount, totalQuestions)}/{totalQuestions}
            </div>
          </div>
        </div>

        <div style={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              style={{
                ...styles.messageRow,
                justifyContent: message.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.bubble,
                  backgroundColor: message.role === "user" ? "#a78bfa" : "#1e1e2e",
                  color: message.role === "user" ? "#0f0f1a" : "#f8fafc",
                  border: message.role === "user" ? "none" : "1px solid #2e2e3e",
                }}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading ? <div style={styles.loadingText}>ARIA is thinking...</div> : null}
          {error ? <div style={styles.errorBox}>{error}</div> : null}
          <div ref={messagesEndRef} />
        </div>

        {chatDone ? (
          <div style={styles.doneBox}>
            <div style={styles.doneText}>Psychological check-in complete.</div>
            <button type="button" style={styles.doneBtn} onClick={() => navigate("/onboarding/step4")}>
              See full analysis
            </button>
          </div>
        ) : (
          <div style={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Type your answer..."
              style={styles.input}
              disabled={loading}
            />
            <button type="button" style={styles.secondaryBtn} onClick={handleVoice}>
              {isListening ? "Stop" : "Voice"}
            </button>
            <button type="button" style={styles.primaryBtn} onClick={handleSend} disabled={loading}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a14",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  },
  glowLeft: {
    position: "absolute",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    top: "-120px",
    left: "-120px",
    backgroundColor: "#a78bfa16",
    filter: "blur(100px)",
  },
  glowRight: {
    position: "absolute",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    bottom: "-120px",
    right: "-120px",
    backgroundColor: "#818cf816",
    filter: "blur(100px)",
  },
  chatBox: {
    width: "100%",
    maxWidth: "680px",
    height: "85vh",
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },
  header: {
    padding: "18px 22px",
    borderBottom: "1px solid #1e1e2e",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ariaName: {
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: "18px",
  },
  ariaMeta: {
    color: "#64748b",
    fontSize: "13px",
    marginTop: "4px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  langBox: {
    display: "flex",
    gap: "4px",
    backgroundColor: "#1e1e2e",
    borderRadius: "8px",
    padding: "4px",
  },
  langBtn: {
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    fontFamily: "inherit",
  },
  progressText: {
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "600",
  },
  messages: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  messageRow: {
    display: "flex",
  },
  bubble: {
    maxWidth: "80%",
    padding: "12px 16px",
    borderRadius: "16px",
    lineHeight: "1.7",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
  },
  loadingText: {
    color: "#a78bfa",
    fontSize: "13px",
  },
  errorBox: {
    padding: "10px 12px",
    borderRadius: "10px",
    backgroundColor: "#3a1218",
    border: "1px solid #8a2431",
    color: "#fca5a5",
    fontSize: "13px",
  },
  doneBox: {
    padding: "18px 22px",
    borderTop: "1px solid #1e1e2e",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
  },
  doneText: {
    color: "#cbd5e1",
    fontSize: "14px",
  },
  doneBtn: {
    border: "none",
    borderRadius: "10px",
    padding: "12px 18px",
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  inputRow: {
    padding: "14px 18px",
    borderTop: "1px solid #1e1e2e",
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    borderRadius: "10px",
    border: "1px solid #2e2e3e",
    backgroundColor: "#1e1e2e",
    color: "#f8fafc",
    padding: "12px 14px",
    outline: "none",
    fontSize: "14px",
  },
  secondaryBtn: {
    borderRadius: "10px",
    border: "1px solid #2e2e3e",
    backgroundColor: "#1e1e2e",
    color: "#cbd5e1",
    padding: "12px 14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  primaryBtn: {
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    padding: "12px 18px",
    cursor: "pointer",
    fontWeight: "700",
    fontFamily: "inherit",
  },
};

export default Step3ChatFlow;
