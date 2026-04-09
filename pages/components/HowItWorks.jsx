import React, { useState } from "react";

const steps = [
  {
    number: "01",
    icon: "🎯",
    title: "Choose Your Mode",
    desc: "Select how you want to check your stress — Type your feelings, Speak your mind, or let your Face do the talking. All three modes are powered by advanced AI.",
    points: [
      "⌨️ Type how you feel",
      "🎤 Speak out loud",
      "📷 Face scan via camera",
    ],
    color: "#a78bfa",
  },
  {
    number: "02",
    icon: "🧠",
    title: "AI Analyzes Your Stress",
    desc: "Our powerful AI engine processes your input using NLP, voice pattern recognition and facial expression analysis to calculate your exact stress level.",
    points: [
      "🔍 Deep NLP processing",
      "📊 Voice tone analysis",
      "😐 Facial expression detection",
    ],
    color: "#818cf8",
  },
  {
    number: "03",
    icon: "💡",
    title: "Get Your Results & Tips",
    desc: "Instantly see your stress score, understand what's causing it, and get personalized tips — breathing exercises, music therapy, meditation and more.",
    points: [
      "📈 Stress score 0-100",
      "🌬️ Breathing exercises",
      "🎵 Music therapy suggestions",
    ],
    color: "#c084fc",
  },
  {
    number: "04",
    icon: "📊",
    title: "Track Your Progress",
    desc: "Save your results, view your stress history on a beautiful dashboard, get weekly reports and see how you improve over time.",
    points: [
      "📅 Daily stress calendar",
      "📉 Weekly trend charts",
      "📄 Downloadable PDF reports",
    ],
    color: "#a78bfa",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="howitworks" style={styles.section}>

      {/* Heading */}
      <div style={styles.headingBox}>
        <div style={styles.badge}>✦ Simple Process</div>
        <h2 style={styles.heading}>How It Works</h2>
        <p style={styles.sub}>
          Four simple steps to understand and manage your stress better
        </p>
      </div>

      {/* Steps */}
      <div style={styles.stepsWrapper}>

        {/* Left — Step List */}
        <div style={styles.stepList}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                ...styles.stepItem,
                borderColor: activeStep === index
                  ? step.color : "#1e1e2e",
                backgroundColor: activeStep === index
                  ? "#13131f" : "transparent",
              }}
              onClick={() => setActiveStep(index)}
            >
              <div style={{
                ...styles.stepNumber,
                color: step.color,
                borderColor: step.color + "44",
                backgroundColor: step.color + "11",
              }}>
                {step.number}
              </div>
              <div>
                <div style={styles.stepIcon}>{step.icon}</div>
                <div style={{
                  ...styles.stepTitle,
                  color: activeStep === index ? step.color : "#cbd5e1",
                }}>
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — Step Detail */}
        <div style={{
          ...styles.stepDetail,
          borderColor: steps[activeStep].color + "44",
        }}>
          <div style={styles.detailIcon}>
            {steps[activeStep].icon}
          </div>
          <div style={{
            ...styles.detailNumber,
            color: steps[activeStep].color,
          }}>
            Step {steps[activeStep].number}
          </div>
          <h3 style={{
            ...styles.detailTitle,
            color: steps[activeStep].color,
          }}>
            {steps[activeStep].title}
          </h3>
          <p style={styles.detailDesc}>
            {steps[activeStep].desc}
          </p>
          <div style={styles.pointsList}>
            {steps[activeStep].points.map((point, i) => (
              <div key={i} style={styles.pointItem}>
                {point}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Progress Bar */}
      <div style={styles.progressBar}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              ...styles.progressDot,
              backgroundColor: activeStep === index
                ? step.color : "#1e1e2e",
              width: activeStep === index ? "40px" : "10px",
            }}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </div>

    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#0a0a14",
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
  stepsWrapper: {
    display: "flex",
    gap: "40px",
    maxWidth: "1000px",
    margin: "0 auto 40px",
    alignItems: "flex-start",
  },
  stepList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "340px",
    flexShrink: 0,
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    borderRadius: "12px",
    border: "1px solid #1e1e2e",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  stepNumber: {
    fontSize: "18px",
    fontWeight: "800",
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepIcon: {
    fontSize: "14px",
    marginBottom: "2px",
  },
  stepTitle: {
    fontSize: "15px",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
  stepDetail: {
    flex: 1,
    backgroundColor: "#13131f",
    border: "1px solid",
    borderRadius: "20px",
    padding: "40px",
    transition: "all 0.3s ease",
  },
  detailIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  detailNumber: {
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  detailTitle: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "16px",
  },
  detailDesc: {
    fontSize: "15px",
    color: "#94a3b8",
    lineHeight: "1.8",
    marginBottom: "24px",
  },
  pointsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  pointItem: {
    fontSize: "14px",
    color: "#cbd5e1",
    backgroundColor: "#1e1e2e",
    padding: "10px 16px",
    borderRadius: "8px",
  },
  progressBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
  progressDot: {
    height: "10px",
    borderRadius: "100px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default HowItWorks;