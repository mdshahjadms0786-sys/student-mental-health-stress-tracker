import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Step3Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(3);
  const [isListening, setIsListening] = useState(false);
  const [chatDone, setChatDone] = useState(false);
  const [chatLanguage, setChatLanguage] = useState("english");
  const messagesEndRef = useRef(null);
  const conversationRef = useRef([]);

  const userName = localStorage.getItem("userName") || "there";
  const userRole = localStorage.getItem("userRoleLabel") || "User";
  const userMood = localStorage.getItem("userMood") || "cloudy";
  const userIntensity = localStorage.getItem("userIntensity") || "medium";
  const userTimeSince = localStorage.getItem("userTimeSince") || "now";
  const savedCount = parseInt(
    localStorage.getItem("questionCount") || "3"
  );
  const apiKey = process.env.REACT_APP_GEMINI_KEY;

  const getMoodText = (mood) => {
    const map = {
      stormy: "Overwhelmed",
      rainy: "Sad",
      dark: "Numb",
      cloudy: "Okay",
      sunny: "Good",
    };
    return map[mood] || mood;
  };

  const getTimeText = (time) => {
    const map = {
      now: "just now",
      hours: "few hours",
      days: "several days",
    };
    return map[time] || time;
  };

  const getMoodColor = () => {
    const colors = {
      stormy: "#ef4444",
      rainy: "#818cf8",
      dark: "#64748b",
      cloudy: "#f59e0b",
      sunny: "#22c55e",
    };
    return colors[userMood] || "#a78bfa";
  };

  const addMessage = (role, text) => {
    setMessages((prev) => [
      ...prev,
      { role, text, time: new Date() },
    ]);
    conversationRef.current.push({
      role: role === "aria" ? "assistant" : "user",
      content: text,
    });
  };

  const callGemini = async (prompt) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 600,
          },
        }),
      }
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text.trim();
  };

  const getLangInstruction = () => {
    if (chatLanguage === "hinglish") {
      return `IMPORTANT: Respond in Hinglish (Hindi + English mix).
Example: "Yeh sun ke samajh aa raha hai 💙 Kya aap mujhe aur bata sakte ho?"
Use natural Hinglish — not pure Hindi, not pure English.`;
    }
    return "Respond in warm, clear English.";
  };

  // eslint-disable-next-line
  useEffect(() => {
    setTotalQuestions(savedCount);
    startConversation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startConversation = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    addMessage(
      "aria",
      `Hey ${userName}! 👋 I'm ARIA — your AI stress companion.\n\nI'm here to listen — no judgment, just support 💙\n\nYou're feeling ${getMoodText(userMood).toLowerCase()} since ${getTimeText(userTimeSince)}.\n\nLet's talk — I'll ask you ${savedCount} psychological questions. Take your time! 🌿`
    );

    await new Promise((r) => setTimeout(r, 1000));

    try {
      const prompt = `You are ARIA, a professional psychologist and empathetic AI stress companion.

User Details:
- Name: ${userName}
- Role: ${userRole}
- Current mood: ${getMoodText(userMood)}
- Intensity: ${userIntensity}
- Since: ${getTimeText(userTimeSince)}

Generate the FIRST psychological question to assess their stress.

Rules:
1. Use psychological assessment techniques (CBT, mindfulness)
2. Be specific to their role "${userRole}" and mood
3. Focus on finding ROOT CAUSE of stress
4. Be warm like a professional therapist
5. Explore: triggers, thought patterns, behavioral responses
6. Natural conversational length

${getLangInstruction()}

Return ONLY the question.`;

      const question = await callGemini(prompt);
      addMessage("aria", question);
      setQuestionCount(1);
    } catch (e) {
      console.log("Start Error:", e.message);
      addMessage(
        "aria",
        chatLanguage === "hinglish"
          ? `${userRole} hone ke naate, aap apne daily life mein sabse zyada stress kab feel karte ho? 💙`
          : `As a ${userRole}, when during your day do you feel most overwhelmed? 💙`
      );
      setQuestionCount(1);
    }
    setLoading(false);
  };

  const generateResponse = async (userAnswer) => {
    setLoading(true);
    const isLast = questionCount >= totalQuestions;

    const history = conversationRef.current
      .map((m) => `${m.role === "user" ? "User" : "ARIA"}: ${m.content}`)
      .join("\n");

    try {
      let prompt;

      if (isLast) {
        prompt = `You are ARIA, a professional psychologist and AI stress companion.

User: ${userName}
Role: ${userRole}
Mood: ${getMoodText(userMood)}

Full Conversation:
${history}

Last answer: "${userAnswer}"

Provide a complete psychological response:
1. Genuinely acknowledge their final answer (2-3 sentences)
2. Give psychological insight about their stress pattern
3. Give 3 specific actionable psychological techniques
4. End with warm encouragement

Format:
[Acknowledgment]

🧠 Based on our conversation:
[Psychological insight]

💡 What can help you:
- [Technique 1]
- [Technique 2]
- [Technique 3]

[Warm closing]

${getLangInstruction()}`;
      } else {
        prompt = `You are ARIA, a professional psychologist and AI stress companion.

User: ${userName}
Role: ${userRole}
Mood: ${getMoodText(userMood)}

Conversation so far:
${history}

User just said: "${userAnswer}"

Do TWO things:
1. RESPOND to their answer:
   - Acknowledge what they shared genuinely
   - Show deep psychological understanding
   - Give ONE specific psychological tip related to their answer
   - Be warm like a caring therapist
   - Match response length to their answer length

2. Ask NEXT psychological question:
   - Based SPECIFICALLY on their last answer
   - Dig deeper into their psychological state
   - Use CBT or mindfulness techniques
   - Explore new aspect — dont repeat themes
   - Specific to role "${userRole}"

${getLangInstruction()}

Return response naturally — no labels.`;
      }

      const response = await callGemini(prompt);
      addMessage("aria", response);

      if (isLast) {
        setChatDone(true);
        localStorage.setItem(
          "ariaConversation",
          JSON.stringify(conversationRef.current)
        );
      } else {
        setQuestionCount((prev) => prev + 1);
      }
    } catch (e) {
      console.log("Response Error:", e.message);
      const fallbacks = chatLanguage === "hinglish"
        ? [
            "Yeh sun ke samajh aa raha hai 💙 Jab aap stress mein hote ho, aapke thoughts kaisi hoti hain?",
            "Main samajhta hun 💙 Yeh feeling aapke relationships ko kaise affect karti hai?",
            "Bahut important share kiya 💙 Is situation mein aap khud ko kaise cope karte ho?",
            "Main yahan hun 💙 Yeh stress aapki neend ko affect kar raha hai?",
            "Aapne brave hokar share kiya 💙 Kya pehle bhi aisa feel hua hai?",
          ]
        : [
            "I hear you 💙 When you're stressed like this, what thoughts go through your mind?",
            "That makes sense 💙 How has this been affecting your relationships?",
            "Thank you for sharing 💙 What coping mechanisms have you tried so far?",
            "I'm here with you 💙 How has this been affecting your sleep?",
            "That sounds tough 💙 Have you experienced similar feelings before?",
          ];

      addMessage("aria", fallbacks[questionCount % fallbacks.length]);

      if (isLast) {
        setChatDone(true);
      } else {
        setQuestionCount((prev) => prev + 1);
      }
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading || chatDone) return;
    const msg = input.trim();
    setInput("");
    addMessage("user", msg);
    await generateResponse(msg);
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Please use Chrome for voice input!");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = chatLanguage === "hinglish" ? "hi-IN" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };
    recognition.start();
  };

  const color = getMoodColor();

  return (
    <div style={styles.page}>
      <div style={{ ...styles.glow, top: "-150px", left: "-150px", backgroundColor: color + "11" }} />
      <div style={{ ...styles.glow, bottom: "-150px", right: "-150px", backgroundColor: "#818cf811" }} />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>

      <div style={styles.chatBox}>

        {/* Header */}
        <div style={{ ...styles.header, borderBottom: `1px solid ${color}22` }}>
          <div style={styles.headerLeft}>
            <div style={{ ...styles.avatar, backgroundColor: color + "22", border: `2px solid ${color}44` }}>
              🤖
            </div>
            <div>
              <div style={styles.ariaName}>ARIA</div>
              <div style={styles.ariaStatus}>
                <span style={{ ...styles.dot, backgroundColor: "#22c55e" }} />
                Online · AI Psychologist
              </div>
            </div>
          </div>

          <div style={styles.headerRight}>
            {/* Language */}
            <div style={styles.langBox}>
              <button
                style={{
                  ...styles.langBtn,
                  backgroundColor: chatLanguage === "english" ? color : "transparent",
                  color: chatLanguage === "english" ? "#0f0f1a" : "#94a3b8",
                }}
                onClick={() => setChatLanguage("english")}
              >
                EN
              </button>
              <button
                style={{
                  ...styles.langBtn,
                  backgroundColor: chatLanguage === "hinglish" ? color : "transparent",
                  color: chatLanguage === "hinglish" ? "#0f0f1a" : "#94a3b8",
                }}
                onClick={() => setChatLanguage("hinglish")}
              >
                HI
              </button>
            </div>

            {/* Progress */}
            <div style={styles.progress}>
              {[...Array(totalQuestions)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.pill,
                    backgroundColor: i < questionCount ? color : "#1e1e2e",
                    width: i < questionCount ? "24px" : "8px",
                  }}
                />
              ))}
              <span style={styles.progressText}>
                {Math.min(questionCount, totalQuestions)}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.row,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                animation: "fadeUp 0.3s ease",
              }}
            >
              {msg.role === "aria" && (
                <div style={{ ...styles.smallAvatar, backgroundColor: color + "22" }}>
                  🤖
                </div>
              )}

              <div style={{
                ...styles.bubble,
                backgroundColor: msg.role === "user" ? color : "#1e1e2e",
                color: msg.role === "user" ? "#0f0f1a" : "#f1f5f9",
                borderBottomLeftRadius: msg.role === "aria" ? "4px" : "16px",
                borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                border: msg.role === "aria" ? `1px solid ${color}22` : "none",
              }}>
                {msg.text.split("\n").map((line, j) => (
                  <p key={j} style={{ margin: "0 0 4px 0", lineHeight: "1.7" }}>
                    {line}
                  </p>
                ))}
              </div>

              {msg.role === "user" && (
                <div style={styles.userAvatar}>
                  {userName[0].toUpperCase()}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ ...styles.row, justifyContent: "flex-start" }}>
              <div style={{ ...styles.smallAvatar, backgroundColor: color + "22" }}>🤖</div>
              <div style={{ ...styles.bubble, backgroundColor: "#1e1e2e", border: `1px solid ${color}22` }}>
                <div style={styles.dots}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      ...styles.dotAnim,
                      backgroundColor: color,
                      animation: `bounce 1s ease infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Done */}
        {chatDone && (
          <div style={styles.doneBox}>
            <p style={styles.doneText}>
              💙 Psychological assessment complete!
            </p>
            <button
              style={{ ...styles.doneBtn, backgroundColor: color }}
              onClick={() => navigate("/onboarding/step4")}
            >
              See My Full Analysis 🧠 →
            </button>
          </div>
        )}

        {/* Input */}
        {!chatDone && (
          <div style={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                chatLanguage === "hinglish"
                  ? "Apna jawab yahan likho..."
                  : "Type your answer..."
              }
              style={styles.input}
              disabled={loading}
            />
            <button
              style={{
                ...styles.iconBtn,
                backgroundColor: isListening ? "#ef444422" : "#1e1e2e",
                border: isListening ? "1px solid #ef4444" : "1px solid #2e2e3e",
              }}
              onClick={handleVoice}
            >
              {isListening ? "🔴" : "🎤"}
            </button>
            <button
              style={{
                ...styles.iconBtn,
                backgroundColor: input.trim() ? color : "#1e1e2e",
                color: input.trim() ? "#0f0f1a" : "#64748b",
                border: "none",
              }}
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a14",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    filter: "blur(100px)",
  },
  chatBox: {
    width: "100%",
    maxWidth: "600px",
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
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#13131f",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  ariaName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#f1f5f9",
  },
  ariaStatus: {
    fontSize: "12px",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    display: "inline-block",
  },
  langBox: {
    display: "flex",
    gap: "2px",
    backgroundColor: "#1e1e2e",
    padding: "4px",
    borderRadius: "8px",
  },
  langBtn: {
    padding: "4px 10px",
    borderRadius: "6px",
    border: "none",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  progress: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  pill: {
    height: "6px",
    borderRadius: "100px",
    transition: "all 0.3s ease",
  },
  progressText: {
    fontSize: "12px",
    color: "#64748b",
    marginLeft: "4px",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
  },
  smallAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },
  userAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#a78bfa22",
    border: "1px solid #a78bfa44",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "700",
    color: "#a78bfa",
    flexShrink: 0,
  },
  bubble: {
    maxWidth: "75%",
    padding: "12px 16px",
    borderRadius: "16px",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  dots: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    padding: "2px 4px",
  },
  dotAnim: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    display: "inline-block",
  },
  doneBox: {
    padding: "16px 20px",
    borderTop: "1px solid #1e1e2e",
    textAlign: "center",
  },
  doneText: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "12px",
  },
  doneBtn: {
    border: "none",
    padding: "12px 32px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    color: "#0f0f1a",
  },
  inputRow: {
    padding: "12px 16px",
    borderTop: "1px solid #1e1e2e",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    backgroundColor: "#13131f",
  },
  input: {
    flex: 1,
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e3e",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#f1f5f9",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
  },
  iconBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
};

export default Step3Chat;
