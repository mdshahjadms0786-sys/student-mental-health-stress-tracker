import React from "react";

const featuresData = [
  {
    icon: "⌨️",
    title: "Text Analysis",
    desc: "Type how you feel and our AI will instantly analyze your stress level using deep NLP processing. Supports all languages.",
    color: "#a78bfa",
  },
  {
    icon: "🎤",
    title: "Voice Analysis",
    desc: "Speak your mind — our AI detects stress from your voice tone, pitch and speech patterns in real time.",
    color: "#818cf8",
  },
  {
    icon: "📷",
    title: "Face Scanner",
    desc: "Your face reveals your emotions. AI scans your facial expressions through your camera to detect stress instantly.",
    color: "#c084fc",
  },
  {
    icon: "🤖",
    title: "AI Chatbot",
    desc: "Talk to our AI therapist anytime. Get personalized advice, breathing exercises and emotional support 24/7.",
    color: "#a78bfa",
  },
  {
    icon: "📊",
    title: "Dashboard & Reports",
    desc: "Track your stress journey with beautiful charts, heatmaps, weekly reports and downloadable PDF summaries.",
    color: "#818cf8",
  },
  {
    icon: "💡",
    title: "Personalized Tips",
    desc: "Get custom suggestions based on your stress patterns — music therapy, meditation, exercises and much more.",
    color: "#c084fc",
  },
];

const Features = () => {
  return (
    <section id="features" style={styles.section}>

      {/* Heading */}
      <div style={styles.headingBox}>
        <div style={styles.badge}>✦ What We Offer</div>
        <h2 style={styles.heading}>Everything You Need</h2>
        <p style={styles.sub}>
          Multiple powerful ways to detect, track and manage your stress
        </p>
      </div>

      {/* Cards Grid */}
      <div style={styles.grid}>
        {featuresData.map((feature, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = feature.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#1e1e2e";
            }}
          >
            <div
              style={{
                ...styles.iconBox,
                backgroundColor: feature.color + "22",
              }}
            >
              <span style={styles.icon}>{feature.icon}</span>
            </div>
            <h3 style={{ ...styles.cardTitle, color: feature.color }}>
              {feature.title}
            </h3>
            <p style={styles.cardDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#0f0f1a",
    padding: "100px 40px",
  },
  headingBox: {
    textAlign: "center",
    marginBottom: "60px",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#1e1e2e",
    color: "#a78bfa",
    padding: "8px 20px",
    borderRadius: "100px",
    fontSize: "13px",
    marginBottom: "16px",
    border: "1px solid #a78bfa44",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "16px",
  },
  sub: {
    fontSize: "16px",
    color: "#64748b",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: "1.7",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "32px 24px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  iconBox: {
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "26px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  cardDesc: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.7",
  },
};

export default Features;