import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step4Summary = () => {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const userName = localStorage.getItem("userName") || "there";
  const userRole = localStorage.getItem("userRoleLabel") || "User";
  const userMood = localStorage.getItem("userMood") || "cloudy";
  const userIntensity = localStorage.getItem("userIntensity") || "medium";
  const userTimeSince = localStorage.getItem("userTimeSince") || "now";
  const userPhoto = localStorage.getItem("userPhoto") || null;
  const conversation = JSON.parse(
    localStorage.getItem("ariaConversation") || "[]"
  );
  const apiKey = process.env.REACT_APP_GEMINI_KEY;

  const getMoodEmoji = () => {
    const map = {
      stormy: "🌪️",
      rainy: "🌧️",
      dark: "🌑",
      cloudy: "🌤️",
      sunny: "☀️",
    };
    return map[userMood] || "😐";
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

  const getStressScore = () => {
    const scores = {
      stormy: { high: 85, medium: 75, low: 65 },
      rainy: { high: 72, medium: 60, low: 50 },
      dark: { high: 65, medium: 55, low: 45 },
      cloudy: { high: 45, medium: 35, low: 25 },
      sunny: { high: 20, medium: 15, low: 10 },
    };
    return scores[userMood]?.[userIntensity] || 50;
  };

  const getStressLevel = (score) => {
    if (score >= 75) return { label: "High", color: "#ef4444" };
    if (score >= 50) return { label: "Medium", color: "#f59e0b" };
    if (score >= 25) return { label: "Low", color: "#22c55e" };
    return { label: "Minimal", color: "#818cf8" };
  };

  // eslint-disable-next-line
  useEffect(() => {
    generateAnalysis();
  }, []);

  const generateAnalysis = async () => {
    setLoading(true);

    const conversationText = conversation
      .map((m) => `${m.role === "user" ? "User" : "ARIA"}: ${m.content}`)
      .join("\n");

    try {
      const prompt = `You are ARIA, a professional psychologist.

User Details:
- Name: ${userName}
- Role: ${userRole}
- Mood: ${userMood}
- Intensity: ${userIntensity}
- Since: ${userTimeSince}

Conversation:
${conversationText}

Based on this psychological assessment, provide a JSON response with:
{
  "stressSummary": "2-3 sentence summary of their stress situation",
  "mainTriggers": ["trigger1", "trigger2", "trigger3"],
  "psychologicalPattern": "1-2 sentence insight about their stress pattern",
  "immediateSteps": [
    {"icon": "🌬️", "title": "Action Title", "desc": "Specific action description"},
    {"icon": "🧘", "title": "Action Title", "desc": "Specific action description"},
    {"icon": "💭", "title": "Action Title", "desc": "Specific action description"}
  ],
  "affirmation": "A personalized encouraging message for them"
}

Return ONLY valid JSON — no extra text.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
          }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      const text = data.candidates[0].content.parts[0].text.trim();
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setAnalysis(parsed);
    } catch (e) {
      console.log("Analysis Error:", e.message);
      setAnalysis({
        stressSummary: `Based on our conversation, ${userName} is experiencing significant stress as a ${userRole}. The intensity has been building over time and is affecting their daily functioning.`,
        mainTriggers: ["Work pressure", "Mental exhaustion", "Emotional overload"],
        psychologicalPattern: "Your responses indicate a pattern of internalized stress with limited healthy outlets for emotional expression.",
        immediateSteps: [
          { icon: "🌬️", title: "4-7-8 Breathing", desc: "Inhale 4 sec, hold 7 sec, exhale 8 sec. Repeat 4 times." },
          { icon: "📝", title: "Journal Your Thoughts", desc: "Write 3 things stressing you and 3 things you're grateful for." },
          { icon: "🚶", title: "5-Minute Walk", desc: "Step outside for fresh air. Physical movement reduces cortisol." },
        ],
        affirmation: `${userName}, you took a brave step by sharing your feelings today. Remember — seeking help is a sign of strength, not weakness. You've got this! 💙`,
      });
    }

    setLoading(false);
  };

  const score = getStressScore();
  const stressLevel = getStressLevel(score);
  const color = getMoodColor();

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingBox}>
          <div style={styles.loadingIcon}>🧠</div>
          <div style={styles.loadingTitle}>
            Analyzing your responses...
          </div>
          <p style={styles.loadingDesc}>
            ARIA is preparing your personalized analysis
          </p>
          <div style={styles.loadingDots}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...styles.loadingDot,
                  backgroundColor: color,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.glow, top: "-150px", left: "-150px", backgroundColor: color + "11" }} />
      <div style={{ ...styles.glow, bottom: "-150px", right: "-150px", backgroundColor: "#818cf811" }} />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes fillBar {
          from { width: 0%; }
          to { width: ${score}%; }
        }
      `}</style>

      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.stepBadge}>Step 4 of 4 ✅</div>
          <h1 style={styles.title}>Your Stress Analysis 🧠</h1>
          <p style={styles.subtitle}>
            Based on your conversation with ARIA
          </p>
        </div>

        {/* Profile + Score Card */}
        <div style={{ ...styles.card, animation: "fadeUp 0.4s ease" }}>
          <div style={styles.profileRow}>
            {userPhoto ? (
              <img src={userPhoto} alt="Profile" style={styles.photo} />
            ) : (
              <div style={{ ...styles.photoPlaceholder, backgroundColor: color + "22", color }}>
                {userName[0].toUpperCase()}
              </div>
            )}
            <div>
              <div style={styles.profileName}>{userName}</div>
              <div style={styles.profileRole}>{userRole}</div>
              <div style={styles.profileMood}>
                {getMoodEmoji()} Feeling {userMood} · since {userTimeSince}
              </div>
            </div>
          </div>

          {/* Stress Score */}
          <div style={styles.scoreBox}>
            <div style={styles.scoreHeader}>
              <span style={styles.scoreLabel}>Stress Level</span>
              <span style={{ ...styles.scoreValue, color: stressLevel.color }}>
                {stressLevel.label} — {score}/100
              </span>
            </div>
            <div style={styles.scoreBar}>
              <div style={{
                ...styles.scoreFill,
                width: `${score}%`,
                backgroundColor: stressLevel.color,
                animation: "fillBar 1.5s ease forwards",
              }} />
            </div>
            <div style={styles.scoreLabels}>
              <span style={{ color: "#22c55e" }}>Minimal</span>
              <span style={{ color: "#f59e0b" }}>Medium</span>
              <span style={{ color: "#ef4444" }}>High</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        {analysis && (
          <>
            <div style={{ ...styles.card, animation: "fadeUp 0.5s ease" }}>
              <div style={styles.cardTitle}>📋 Summary</div>
              <p style={styles.cardText}>{analysis.stressSummary}</p>
            </div>

            {/* Triggers */}
            <div style={{ ...styles.card, animation: "fadeUp 0.6s ease" }}>
              <div style={styles.cardTitle}>⚡ Main Triggers</div>
              <div style={styles.triggerRow}>
                {analysis.mainTriggers.map((trigger, i) => (
                  <div key={i} style={{
                    ...styles.triggerChip,
                    borderColor: color + "44",
                    backgroundColor: color + "11",
                    color,
                  }}>
                    {trigger}
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern */}
            <div style={{ ...styles.card, animation: "fadeUp 0.7s ease" }}>
              <div style={styles.cardTitle}>🧩 Psychological Pattern</div>
              <p style={styles.cardText}>{analysis.psychologicalPattern}</p>
            </div>

            {/* Immediate Steps */}
            <div style={{ ...styles.card, animation: "fadeUp 0.8s ease" }}>
              <div style={styles.cardTitle}>💡 What To Do Now</div>
              <div style={styles.stepsList}>
                {analysis.immediateSteps.map((step, i) => (
                  <div key={i} style={styles.stepItem}>
                    <div style={{
                      ...styles.stepIcon,
                      backgroundColor: color + "22",
                    }}>
                      {step.icon}
                    </div>
                    <div>
                      <div style={styles.stepTitle}>{step.title}</div>
                      <div style={styles.stepDesc}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Affirmation */}
            <div style={{
              ...styles.card,
              backgroundColor: color + "11",
              border: `1px solid ${color}33`,
              animation: "fadeUp 0.9s ease",
              textAlign: "center",
            }}>
              <div style={styles.affirmIcon}>💙</div>
              <p style={{ ...styles.cardText, color, fontWeight: "600" }}>
                {analysis.affirmation}
              </p>
            </div>
          </>
        )}

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button
            style={{ ...styles.secondaryBtn }}
            onClick={() => navigate("/onboarding/step3chat")}
          >
            ← Talk to ARIA Again
          </button>
          <button
            style={{ ...styles.primaryBtn, backgroundColor: color }}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard →
          </button>
        </div>

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
    padding: "40px 20px",
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
  loadingBox: {
    textAlign: "center",
    zIndex: 1,
  },
  loadingIcon: {
    fontSize: "56px",
    marginBottom: "16px",
    animation: "pulse 2s ease infinite",
  },
  loadingTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "8px",
  },
  loadingDesc: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "24px",
  },
  loadingDots: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  loadingDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    animation: "pulse 1s ease infinite",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    marginBottom: "8px",
  },
  stepBadge: {
    display: "inline-block",
    backgroundColor: "#22c55e22",
    border: "1px solid #22c55e44",
    color: "#22c55e",
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
  },
  card: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "24px",
  },
  profileRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  photo: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #a78bfa",
  },
  photoPlaceholder: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700",
    border: "3px solid #a78bfa44",
    flexShrink: 0,
  },
  profileName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "4px",
  },
  profileRole: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "4px",
  },
  profileMood: {
    fontSize: "13px",
    color: "#94a3b8",
  },
  scoreBox: {
    backgroundColor: "#1e1e2e",
    borderRadius: "12px",
    padding: "16px",
  },
  scoreHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  scoreLabel: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600",
  },
  scoreValue: {
    fontSize: "13px",
    fontWeight: "700",
  },
  scoreBar: {
    height: "10px",
    backgroundColor: "#0f0f1a",
    borderRadius: "100px",
    overflow: "hidden",
    marginBottom: "8px",
  },
  scoreFill: {
    height: "100%",
    borderRadius: "100px",
    transition: "width 1.5s ease",
  },
  scoreLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "12px",
  },
  cardText: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: "1.7",
  },
  triggerRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  triggerChip: {
    padding: "8px 16px",
    borderRadius: "100px",
    border: "1px solid",
    fontSize: "13px",
    fontWeight: "600",
  },
  stepsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  stepItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
  },
  stepIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "4px",
  },
  stepDesc: {
    fontSize: "13px",
    color: "#64748b",
    lineHeight: "1.6",
  },
  affirmIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "transparent",
    border: "1px solid #1e1e2e",
    color: "#64748b",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  primaryBtn: {
    flex: 2,
    border: "none",
    color: "#0f0f1a",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default Step4Summary;