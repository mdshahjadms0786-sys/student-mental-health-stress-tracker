import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveEmotion } from "../../services/api";
import { getCurrentUserId } from "../../utils/session";

const moods = [
  { id: "stormy", emoji: "🌪️", label: "Overwhelmed", color: "#ef4444" },
  { id: "rainy", emoji: "🌧️", label: "Sad", color: "#818cf8" },
  { id: "dark", emoji: "🌑", label: "Numb", color: "#64748b" },
  { id: "cloudy", emoji: "🌤️", label: "Okay", color: "#f59e0b" },
  { id: "sunny", emoji: "☀️", label: "Good", color: "#22c55e" },
];

const intensities = [
  { id: "low", emoji: "🔵", label: "A Little", color: "#818cf8" },
  { id: "medium", emoji: "🟡", label: "Medium", color: "#f59e0b" },
  { id: "high", emoji: "🔴", label: "A Lot", color: "#ef4444" },
];

const timings = [
  { id: "now", emoji: "⚡", label: "Just Now" },
  { id: "hours", emoji: "🕐", label: "Few Hours" },
  { id: "days", emoji: "📅", label: "Several Days" },
];

const Step3Emotion = () => {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const [greeting, setGreeting] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");

  const userName = localStorage.getItem("userName") || "there";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setGreeting(`Good Morning, ${userName}! ☀️`);
    } else if (hour >= 12 && hour < 17) {
      setGreeting(`Good Afternoon, ${userName}! 🌤️`);
    } else if (hour >= 17 && hour < 21) {
      setGreeting(`Good Evening, ${userName}! 🌆`);
    } else if (hour >= 21 && hour < 24) {
      setGreeting(`Hey ${userName}, still up? 🌙`);
    } else {
      setGreeting(`Hey ${userName}... 💙 Couldn't sleep?`);
    }
  }, [userName]);

  const handleContinue = async () => {
    if (!selectedMood) {
      setError("Please select your mood!");
      return;
    }
    if (!selectedIntensity) {
      setError("Please select intensity!");
      return;
    }
    if (!selectedTime) {
      setError("Please select since when!");
      return;
    }

    try {
      const selectedMoodInfo = moods.find((mood) => mood.id === selectedMood);
      const response = await saveEmotion(userId, {
        mood: selectedMood,
        moodLabel: selectedMoodInfo?.label || selectedMood,
        intensity: selectedIntensity,
        timeSince: selectedTime,
      });
      navigate(response.nextRoute || "/onboarding/step3chat");
    } catch (requestError) {
      setError(requestError.message || "Unable to save emotion details.");
    }
  };

  const selectedMoodData = moods.find((m) => m.id === selectedMood);

  return (
    <div style={styles.page}>

      {/* Stress Tracker Background */}
      <div style={styles.bgBrainwave}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.wave,
              top: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.03 + i * 0.01,
            }}
          />
        ))}
      </div>

      {/* Floating Stress Icons */}
      {["🧠", "💙", "🌿", "✨", "🫁", "💆"].map((icon, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            fontSize: "20px",
            opacity: 0.08,
            top: `${10 + i * 14}%`,
            left: i % 2 === 0 ? `${3 + i * 2}%` : "auto",
            right: i % 2 !== 0 ? `${3 + i * 2}%` : "auto",
            animation: `float ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {icon}
        </div>
      ))}

      {/* Glow Effects */}
      <div style={{
        ...styles.glow,
        backgroundColor: selectedMoodData
          ? selectedMoodData.color + "15"
          : "#a78bfa15",
        top: "-150px",
        left: "-150px",
      }} />
      <div style={{
        ...styles.glow,
        backgroundColor: "#818cf815",
        bottom: "-150px",
        right: "-150px",
      }} />

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Card */}
      <div style={styles.card}>

        {/* Progress */}
        <div style={styles.progressBox}>
          <div style={styles.progressTop}>
            <span style={styles.stepText}>Step 3 of 4</span>
            <span style={styles.stepPercent}>75%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressFill,
              width: "75%",
              backgroundColor: selectedMoodData
                ? selectedMoodData.color
                : "#a78bfa",
            }} />
          </div>
        </div>

        {/* Stress Meter */}
        <div style={styles.stressMeter}>
          <div style={styles.meterLabel}>
            🧠 Real-time Stress Indicator
          </div>
          <div style={styles.meterBar}>
            <div style={{
              ...styles.meterFill,
              width: selectedMood === "stormy" ? "90%"
                : selectedMood === "rainy" ? "70%"
                : selectedMood === "dark" ? "50%"
                : selectedMood === "cloudy" ? "30%"
                : selectedMood === "sunny" ? "10%"
                : "0%",
              backgroundColor: selectedMoodData
                ? selectedMoodData.color
                : "#a78bfa",
            }} />
          </div>
          <div style={styles.meterLabels}>
            <span style={{ color: "#22c55e" }}>Low</span>
            <span style={{ color: "#f59e0b" }}>Medium</span>
            <span style={{ color: "#ef4444" }}>High</span>
          </div>
        </div>

        {/* Greeting */}
        <h1 style={styles.title}>{greeting}</h1>
        <p style={styles.desc}>
          Tell ARIA how you feel right now 💙
        </p>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>⚠️ {error}</div>
        )}

        {/* Mood */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>
            How are you feeling?
            <span style={styles.required}> *</span>
          </div>
          <div style={styles.moodGrid}>
            {moods.map((mood) => (
              <div
                key={mood.id}
                style={{
                  ...styles.moodCard,
                  borderColor: selectedMood === mood.id
                    ? mood.color : "#1e1e2e",
                  backgroundColor: selectedMood === mood.id
                    ? mood.color + "22" : "#13131f",
                  transform: selectedMood === mood.id
                    ? "scale(1.08)" : "scale(1)",
                  boxShadow: selectedMood === mood.id
                    ? `0 0 20px ${mood.color}33` : "none",
                }}
                onClick={() => {
                  setSelectedMood(mood.id);
                  setError("");
                }}
              >
                <div style={styles.moodEmoji}>{mood.emoji}</div>
                <div style={{
                  ...styles.moodLabel,
                  color: selectedMood === mood.id
                    ? mood.color : "#94a3b8",
                }}>
                  {mood.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>
            How intense?
            <span style={styles.required}> *</span>
          </div>
          <div style={styles.rowCards}>
            {intensities.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.rowCard,
                  borderColor: selectedIntensity === item.id
                    ? item.color : "#1e1e2e",
                  backgroundColor: selectedIntensity === item.id
                    ? item.color + "22" : "#13131f",
                  boxShadow: selectedIntensity === item.id
                    ? `0 0 15px ${item.color}22` : "none",
                }}
                onClick={() => {
                  setSelectedIntensity(item.id);
                  setError("");
                }}
              >
                <span style={styles.rowEmoji}>{item.emoji}</span>
                <span style={{
                  ...styles.rowLabel,
                  color: selectedIntensity === item.id
                    ? item.color : "#94a3b8",
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>
            Since when?
            <span style={styles.required}> *</span>
          </div>
          <div style={styles.rowCards}>
            {timings.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.rowCard,
                  borderColor: selectedTime === item.id
                    ? "#a78bfa" : "#1e1e2e",
                  backgroundColor: selectedTime === item.id
                    ? "#a78bfa22" : "#13131f",
                  color: selectedTime === item.id
                    ? "#a78bfa" : "#94a3b8",
                  boxShadow: selectedTime === item.id
                    ? "0 0 15px #a78bfa22" : "none",
                }}
                onClick={() => {
                  setSelectedTime(item.id);
                  setError("");
                }}
              >
                <span style={styles.rowEmoji}>{item.emoji}</span>
                <span style={styles.rowLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ARIA Preview */}
        {selectedMood && selectedIntensity && selectedTime && (
          <div style={styles.ariaPreview}>
            <div style={styles.ariaIcon}>🤖</div>
            <div style={styles.ariaText}>
              <span style={styles.ariaName}>ARIA</span>
              {" "}is ready to help you...
              <span style={styles.ariaDots}>
                <span style={{ animation: "pulse 1s infinite" }}>●</span>
                <span style={{ animation: "pulse 1s infinite 0.3s" }}>●</span>
                <span style={{ animation: "pulse 1s infinite 0.6s" }}>●</span>
              </span>
            </div>
          </div>
        )}

        {/* Button */}
        <button
          style={{
            ...styles.continueBtn,
            backgroundColor: selectedMoodData
              ? selectedMoodData.color
              : "#a78bfa",
            opacity: !selectedMood || !selectedIntensity || !selectedTime
              ? 0.5 : 1,
            boxShadow: selectedMood
              ? `0 8px 24px ${selectedMoodData?.color}44`
              : "none",
          }}
          onClick={handleContinue}
          disabled={!selectedMood || !selectedIntensity || !selectedTime}
        >
          Start Chatting with ARIA 🤖
        </button>

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
  bgBrainwave: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: 0,
  },
  wave: {
    position: "absolute",
    left: 0,
    width: "200px",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #a78bfa, transparent)",
    animation: "wave 4s linear infinite",
    borderRadius: "100px",
  },
  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    filter: "blur(100px)",
    transition: "background-color 0.5s ease",
  },
  card: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "24px",
    padding: "40px",
    width: "100%",
    maxWidth: "520px",
    position: "relative",
    zIndex: 1,
  },
  progressBox: {
    marginBottom: "20px",
  },
  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  stepText: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600",
  },
  stepPercent: {
    fontSize: "13px",
    color: "#a78bfa",
    fontWeight: "700",
  },
  progressBar: {
    height: "6px",
    backgroundColor: "#1e1e2e",
    borderRadius: "100px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "100px",
    transition: "all 0.5s ease",
  },
  stressMeter: {
    backgroundColor: "#1e1e2e",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "24px",
  },
  meterLabel: {
    fontSize: "11px",
    color: "#64748b",
    marginBottom: "8px",
    fontWeight: "600",
  },
  meterBar: {
    height: "8px",
    backgroundColor: "#0f0f1a",
    borderRadius: "100px",
    overflow: "hidden",
    marginBottom: "6px",
  },
  meterFill: {
    height: "100%",
    borderRadius: "100px",
    transition: "all 0.6s ease",
  },
  meterLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "10px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "6px",
  },
  desc: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "24px",
    lineHeight: "1.6",
  },
  errorBox: {
    backgroundColor: "#ff000011",
    border: "1px solid #ff000033",
    color: "#ff6b6b",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  section: {
    marginBottom: "20px",
  },
  sectionLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#94a3b8",
    marginBottom: "10px",
  },
  required: {
    color: "#ef4444",
  },
  moodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
  },
  moodCard: {
    border: "1px solid",
    borderRadius: "12px",
    padding: "12px 6px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  moodEmoji: {
    fontSize: "22px",
    marginBottom: "6px",
  },
  moodLabel: {
    fontSize: "10px",
    fontWeight: "700",
  },
  rowCards: {
    display: "flex",
    gap: "8px",
  },
  rowCard: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "10px",
    border: "1px solid",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  rowEmoji: {
    fontSize: "16px",
  },
  rowLabel: {
    fontSize: "12px",
    fontWeight: "600",
  },
  ariaPreview: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#a78bfa11",
    border: "1px solid #a78bfa33",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "16px",
  },
  ariaIcon: {
    fontSize: "24px",
  },
  ariaText: {
    fontSize: "14px",
    color: "#a78bfa",
    fontWeight: "500",
  },
  ariaName: {
    fontWeight: "700",
  },
  ariaDots: {
    display: "inline-flex",
    gap: "3px",
    marginLeft: "6px",
    fontSize: "8px",
  },
  continueBtn: {
    width: "100%",
    color: "#0f0f1a",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
  },
};

export default Step3Emotion;
