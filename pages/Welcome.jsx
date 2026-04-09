import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const roleData = {
  student: {
    icon: "🎒",
    label: "School Student",
    color: "#a78bfa",
    problems: [
      "📚 Exam pressure",
      "📝 Homework load",
      "👥 Friend problems",
      "👨‍👩‍👧 Family pressure",
      "😴 Not sleeping well",
      "🎯 Career confusion",
    ],
  },
  college: {
    icon: "🎓",
    label: "College Student",
    color: "#818cf8",
    problems: [
      "📋 Assignment deadlines",
      "💼 Career anxiety",
      "❤️ Relationship stress",
      "🏠 Homesickness",
      "💰 Financial pressure",
      "😴 Poor sleep schedule",
    ],
  },
  professional: {
    icon: "💼",
    label: "Working Professional",
    color: "#c084fc",
    problems: [
      "⏰ Work deadlines",
      "🏢 Office politics",
      "⚖️ Work life balance",
      "😤 Boss pressure",
      "💰 Financial stress",
      "😴 Burnout feeling",
    ],
  },
  homemaker: {
    icon: "🏠",
    label: "Homemaker",
    color: "#a78bfa",
    problems: [
      "👨‍👩‍👧 Family pressure",
      "🤝 Feeling lonely",
      "💰 Financial stress",
      "🏥 Health concern",
      "😴 Exhaustion",
      "💭 Not feeling valued",
    ],
  },
};

const moods = [
  { emoji: "😊", label: "Good", value: "good", color: "#22c55e" },
  { emoji: "😐", label: "Okay", value: "okay", color: "#f59e0b" },
  { emoji: "😰", label: "Stressed", value: "stressed", color: "#ef4444" },
  { emoji: "😤", label: "Anxious", value: "anxious", color: "#f97316" },
];

const Welcome = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedProblems, setSelectedProblems] = useState([]);
  const role = localStorage.getItem("userRole") || "student";
  const name = localStorage.getItem("userName") || "User";
  const currentRole = roleData[role] || roleData.student;

  const toggleProblem = (problem) => {
    setSelectedProblems((prev) =>
      prev.includes(problem)
        ? prev.filter((p) => p !== problem)
        : [...prev, problem]
    );
  };

  const handleContinue = () => {
    if (!selectedMood) {
      alert("Please select your mood first!");
      return;
    }
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>

      {/* Background Glow */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Card */}
      <div style={styles.card}>

        {/* Top — Role Badge */}
        <div style={styles.topRow}>
          <div style={{
            ...styles.roleBadge,
            backgroundColor: currentRole.color + "22",
            border: `1px solid ${currentRole.color}44`,
            color: currentRole.color,
          }}>
            {currentRole.icon} {currentRole.label}
          </div>
          <button style={styles.skipBtn} onClick={handleSkip}>
            Skip →
          </button>
        </div>

        {/* Welcome Text */}
        <div style={styles.welcomeBox}>
          <h1 style={styles.welcomeTitle}>
            👋 Welcome, <span style={{
              color: currentRole.color,
            }}>{name}!</span>
          </h1>
          <p style={styles.welcomeDesc}>
            Let's do a quick check-in before we start.
            This helps us personalize your experience!
          </p>
        </div>

        {/* Mood Selection */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            How are you feeling right now?
          </h2>
          <div style={styles.moodsRow}>
            {moods.map((mood) => (
              <div
                key={mood.value}
                style={{
                  ...styles.moodCard,
                  borderColor: selectedMood === mood.value
                    ? mood.color : "#1e1e2e",
                  backgroundColor: selectedMood === mood.value
                    ? mood.color + "22" : "#13131f",
                  transform: selectedMood === mood.value
                    ? "scale(1.08)" : "scale(1)",
                }}
                onClick={() => setSelectedMood(mood.value)}
              >
                <div style={styles.moodEmoji}>{mood.emoji}</div>
                <div style={{
                  ...styles.moodLabel,
                  color: selectedMood === mood.value
                    ? mood.color : "#64748b",
                }}>
                  {mood.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problems Selection */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            What's bothering you today?
            <span style={styles.optional}> (Optional)</span>
          </h2>
          <div style={styles.problemsGrid}>
            {currentRole.problems.map((problem, i) => (
              <div
                key={i}
                style={{
                  ...styles.problemChip,
                  borderColor: selectedProblems.includes(problem)
                    ? currentRole.color : "#1e1e2e",
                  backgroundColor: selectedProblems.includes(problem)
                    ? currentRole.color + "22" : "#13131f",
                  color: selectedProblems.includes(problem)
                    ? currentRole.color : "#94a3b8",
                }}
                onClick={() => toggleProblem(problem)}
              >
                {selectedProblems.includes(problem) ? "✓ " : ""}{problem}
              </div>
            ))}
          </div>
        </div>

        {/* Stress Check Modes */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            How would you like to check your stress?
          </h2>
          <div style={styles.modesRow}>
            {[
              { icon: "⌨️", label: "Type it", color: "#a78bfa" },
              { icon: "🎤", label: "Speak it", color: "#818cf8" },
              { icon: "📷", label: "Face scan", color: "#c084fc" },
            ].map((mode, i) => (
              <div
                key={i}
                style={{
                  ...styles.modeCard,
                  borderColor: mode.color + "44",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = mode.color;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = mode.color + "44";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={handleContinue}
              >
                <div style={styles.modeIcon}>{mode.icon}</div>
                <div style={{
                  ...styles.modeLabel,
                  color: mode.color,
                }}>
                  {mode.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <button
          style={{
            ...styles.continueBtn,
            backgroundColor: currentRole.color,
            opacity: !selectedMood ? 0.5 : 1,
          }}
          onClick={handleContinue}
          disabled={!selectedMood}
        >
          Go to My Dashboard →
        </button>

      </div>

    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    backgroundColor: "#a78bfa11",
    top: "-200px",
    left: "-200px",
    filter: "blur(100px)",
  },
  glow2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    backgroundColor: "#818cf811",
    bottom: "-200px",
    right: "-200px",
    filter: "blur(100px)",
  },
  card: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "24px",
    padding: "48px",
    width: "100%",
    maxWidth: "700px",
    position: "relative",
    zIndex: 1,
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  roleBadge: {
    padding: "8px 20px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "600",
  },
  skipBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  welcomeBox: {
    marginBottom: "40px",
  },
  welcomeTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "12px",
  },
  welcomeDesc: {
    fontSize: "15px",
    color: "#64748b",
    lineHeight: "1.7",
  },
  section: {
    marginBottom: "36px",
  },
  sectionTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "16px",
  },
  optional: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "400",
  },
  moodsRow: {
    display: "flex",
    gap: "16px",
  },
  moodCard: {
    flex: 1,
    backgroundColor: "#13131f",
    border: "2px solid",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  moodEmoji: {
    fontSize: "36px",
    marginBottom: "8px",
  },
  moodLabel: {
    fontSize: "13px",
    fontWeight: "600",
  },
  problemsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  problemChip: {
    padding: "10px 16px",
    borderRadius: "100px",
    border: "1px solid",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
  },
  modesRow: {
    display: "flex",
    gap: "16px",
  },
  modeCard: {
    flex: 1,
    backgroundColor: "#1e1e2e",
    border: "1px solid",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  modeIcon: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  modeLabel: {
    fontSize: "14px",
    fontWeight: "600",
  },
  continueBtn: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    color: "#0f0f1a",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
};

export default Welcome;