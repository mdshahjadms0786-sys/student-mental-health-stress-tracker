import React, { useState } from "react";

const users = [
  {
    icon: "🎒",
    title: "School Students",
    color: "#a78bfa",
    tagline: "Ace your studies stress-free",
    desc: "School life comes with exam pressure, homework deadlines and peer stress. StressTrack helps students identify stress triggers early and manage them effectively.",
    points: [
      "📚 Exam & homework stress detection",
      "👥 Peer pressure analysis",
      "😴 Sleep pattern tips",
      "🎯 Focus improvement techniques",
      "🧘 Quick 2-min stress relief exercises",
    ],
    stat1: { value: "78%", label: "Students feel less anxious" },
    stat2: { value: "2x", label: "Better focus reported" },
  },
  {
    icon: "🎓",
    title: "College Students",
    color: "#818cf8",
    tagline: "Balance academics & life",
    desc: "College brings assignments, career anxiety, relationships and independence all at once. Our AI understands college-specific stressors and guides you through them.",
    points: [
      "📝 Assignment deadline stress",
      "💼 Career anxiety management",
      "❤️ Relationship stress detection",
      "🏠 Homesickness support",
      "🎵 Music therapy for study breaks",
    ],
    stat1: { value: "85%", label: "Feel more in control" },
    stat2: { value: "3x", label: "Productivity increase" },
  },
  {
    icon: "💼",
    title: "Working Professionals",
    color: "#c084fc",
    tagline: "Thrive at work without burnout",
    desc: "Workplace stress, tight deadlines, office politics and work-life balance — StressTrack monitors your professional stress and helps you stay at your best.",
    points: [
      "⏰ Deadline pressure management",
      "🏢 Workplace conflict detection",
      "⚖️ Work-life balance tips",
      "😤 Burnout prevention alerts",
      "📊 Weekly stress reports for HR",
    ],
    stat1: { value: "91%", label: "Reduced burnout risk" },
    stat2: { value: "40%", label: "Less sick days taken" },
  },
  {
    icon: "🏠",
    title: "Homemakers",
    color: "#a78bfa",
    tagline: "Your mental health matters too",
    desc: "Homemakers often face invisible stress — family management, isolation and financial pressure. StressTrack gives homemakers the support and recognition they deserve.",
    points: [
      "👨‍👩‍👧 Family pressure management",
      "🤝 Isolation & loneliness detection",
      "💰 Financial stress analysis",
      "🌸 Self-care reminder system",
      "💬 AI companion for daily venting",
    ],
    stat1: { value: "88%", label: "Feel heard & understood" },
    stat2: { value: "5x", label: "Better self-care habits" },
  },
];

const WhoIsItFor = () => {
  const [activeUser, setActiveUser] = useState(0);

  return (
    <section id="whofor" style={styles.section}>

      {/* Heading */}
      <div style={styles.headingBox}>
        <div style={styles.badge}>✦ For Everyone</div>
        <h2 style={styles.heading}>Built For Everyone</h2>
        <p style={styles.sub}>
          No matter who you are or what you do — StressTrack understands your unique stress
        </p>
      </div>

      {/* Tab Selector */}
      <div style={styles.tabRow}>
        {users.map((user, index) => (
          <button
            key={index}
            style={{
              ...styles.tab,
              backgroundColor: activeUser === index
                ? user.color : "#13131f",
              color: activeUser === index ? "#0f0f1a" : "#94a3b8",
              border: activeUser === index
                ? "none"
                : "1px solid #1e1e2e",
            }}
            onClick={() => setActiveUser(index)}
          >
            {user.icon} {user.title}
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div style={{
        ...styles.detailCard,
        borderColor: users[activeUser].color + "44",
      }}>

        {/* Left */}
        <div style={styles.detailLeft}>
          <div style={styles.bigIcon}>{users[activeUser].icon}</div>
          <div style={{
            ...styles.tagline,
            color: users[activeUser].color,
          }}>
            {users[activeUser].tagline}
          </div>
          <h3 style={styles.detailTitle}>
            {users[activeUser].title}
          </h3>
          <p style={styles.detailDesc}>
            {users[activeUser].desc}
          </p>

          {/* Stats */}
          <div style={styles.statsRow}>
            <div style={{
              ...styles.statBox,
              borderColor: users[activeUser].color + "44",
            }}>
              <div style={{
                ...styles.statValue,
                color: users[activeUser].color,
              }}>
                {users[activeUser].stat1.value}
              </div>
              <div style={styles.statLabel}>
                {users[activeUser].stat1.label}
              </div>
            </div>
            <div style={{
              ...styles.statBox,
              borderColor: users[activeUser].color + "44",
            }}>
              <div style={{
                ...styles.statValue,
                color: users[activeUser].color,
              }}>
                {users[activeUser].stat2.value}
              </div>
              <div style={styles.statLabel}>
                {users[activeUser].stat2.label}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Points */}
        <div style={styles.detailRight}>
          <div style={styles.pointsTitle}>
            What StressTrack does for you:
          </div>
          {users[activeUser].points.map((point, i) => (
            <div key={i} style={{
              ...styles.pointItem,
              borderLeft: `3px solid ${users[activeUser].color}`,
            }}>
              {point}
            </div>
          ))}

          <button style={{
            ...styles.tryBtn,
            backgroundColor: users[activeUser].color,
          }}>
            Start Free — For {users[activeUser].title} →
          </button>
        </div>

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
    marginBottom: "50px",
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
  tabRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  tab: {
    padding: "12px 24px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  },
  detailCard: {
    display: "flex",
    gap: "40px",
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#13131f",
    border: "1px solid",
    borderRadius: "24px",
    padding: "48px",
    transition: "all 0.3s ease",
  },
  detailLeft: {
    flex: 1,
  },
  bigIcon: {
    fontSize: "56px",
    marginBottom: "16px",
  },
  tagline: {
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  detailTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "16px",
  },
  detailDesc: {
    fontSize: "15px",
    color: "#94a3b8",
    lineHeight: "1.8",
    marginBottom: "24px",
  },
  statsRow: {
    display: "flex",
    gap: "16px",
  },
  statBox: {
    flex: 1,
    backgroundColor: "#1e1e2e",
    border: "1px solid",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "12px",
    color: "#64748b",
    lineHeight: "1.4",
  },
  detailRight: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  pointsTitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "4px",
    fontWeight: "600",
  },
  pointItem: {
    fontSize: "14px",
    color: "#cbd5e1",
    backgroundColor: "#1e1e2e",
    padding: "12px 16px",
    borderRadius: "8px",
    lineHeight: "1.5",
  },
  tryBtn: {
    marginTop: "8px",
    padding: "14px 24px",
    borderRadius: "10px",
    border: "none",
    color: "#0f0f1a",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default WhoIsItFor;