import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  const recentResults = [
    { day: "Today", level: "High", score: 78, color: "#ef4444" },
    { day: "Yesterday", level: "Medium", score: 55, color: "#f59e0b" },
    { day: "2 days ago", level: "Low", score: 28, color: "#22c55e" },
    { day: "3 days ago", level: "Medium", score: 61, color: "#f59e0b" },
    { day: "4 days ago", level: "High", score: 82, color: "#ef4444" },
  ];

  const tips = [
    { icon: "🌬️", title: "Breathing Exercise", desc: "4-7-8 technique for instant calm" },
    { icon: "🎵", title: "Music Therapy", desc: "Lo-fi beats to reduce anxiety" },
    { icon: "🧘", title: "Meditation", desc: "5 min guided session" },
    { icon: "💤", title: "Sleep Tips", desc: "Better sleep = less stress" },
  ];

  return (
    <div style={styles.page}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <Link to="/" style={styles.sidebarLogo}>
          🧠 StressTrack
        </Link>

        <nav style={styles.sidebarNav}>
          {[
            { id: "home", icon: "🏠", label: "Dashboard" },
            { id: "check", icon: "🔍", label: "Check Stress" },
            { id: "history", icon: "📊", label: "History" },
            { id: "tips", icon: "💡", label: "Tips" },
            { id: "chat", icon: "🤖", label: "AI Chat" },
            { id: "profile", icon: "👤", label: "Profile" },
          ].map((item) => (
            <button
              key={item.id}
              style={{
                ...styles.sidebarItem,
                backgroundColor: activeTab === item.id
                  ? "#a78bfa22" : "transparent",
                color: activeTab === item.id
                  ? "#a78bfa" : "#64748b",
                borderLeft: activeTab === item.id
                  ? "3px solid #a78bfa"
                  : "3px solid transparent",
              }}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={styles.sidebarIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          style={styles.logoutBtn}
          onClick={() => navigate("/login")}
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>

        {/* Top Bar */}
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.welcomeText}>
              👋 Welcome back, Rahul!
            </h1>
            <p style={styles.welcomeSub}>
              How are you feeling today?
            </p>
          </div>
          <div style={styles.streakBadge}>
            🔥 5 Day Streak
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          {[
            {
              icon: "😰",
              label: "Today's Stress",
              value: "High",
              sub: "Score: 78/100",
              color: "#ef4444",
            },
            {
              icon: "📈",
              label: "Weekly Average",
              value: "Medium",
              sub: "Score: 58/100",
              color: "#f59e0b",
            },
            {
              icon: "🔥",
              label: "Current Streak",
              value: "5 Days",
              sub: "Keep it up!",
              color: "#a78bfa",
            },
            {
              icon: "✅",
              label: "Total Checks",
              value: "28",
              sub: "This month",
              color: "#22c55e",
            },
          ].map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={styles.statInfo}>
                <div style={styles.statLabel}>{stat.label}</div>
                <div style={{
                  ...styles.statValue,
                  color: stat.color,
                }}>
                  {stat.value}
                </div>
                <div style={styles.statSub}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Check Stress Modes */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Check Your Stress Now
          </h2>
          <div style={styles.modesGrid}>
            {[
              {
                icon: "⌨️",
                title: "Text Analysis",
                desc: "Type how you feel",
                color: "#a78bfa",
              },
              {
                icon: "🎤",
                title: "Voice Analysis",
                desc: "Speak your mind",
                color: "#818cf8",
              },
              {
                icon: "📷",
                title: "Face Scanner",
                desc: "Scan your expression",
                color: "#c084fc",
              },
            ].map((mode, i) => (
              <div
                key={i}
                style={{
                  ...styles.modeCard,
                  borderColor: mode.color + "44",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = mode.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = mode.color + "44";
                }}
              >
                <div style={{
                  ...styles.modeIcon,
                  backgroundColor: mode.color + "22",
                }}>
                  {mode.icon}
                </div>
                <div style={{
                  ...styles.modeTitle,
                  color: mode.color,
                }}>
                  {mode.title}
                </div>
                <div style={styles.modeDesc}>{mode.desc}</div>
                <button style={{
                  ...styles.modeBtn,
                  backgroundColor: mode.color,
                }}>
                  Start →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div style={styles.bottomGrid}>

          {/* Recent Results */}
          <div style={styles.recentBox}>
            <h2 style={styles.sectionTitle}>Recent Results</h2>
            <div style={styles.resultsList}>
              {recentResults.map((result, i) => (
                <div key={i} style={styles.resultItem}>
                  <div style={styles.resultDay}>{result.day}</div>
                  <div style={styles.resultBar}>
                    <div style={{
                      ...styles.resultFill,
                      width: result.score + "%",
                      backgroundColor: result.color,
                    }} />
                  </div>
                  <div style={{
                    ...styles.resultLevel,
                    color: result.color,
                  }}>
                    {result.level} {result.score}/100
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div style={styles.tipsBox}>
            <h2 style={styles.sectionTitle}>
              Today's Tips For You
            </h2>
            <div style={styles.tipsList}>
              {tips.map((tip, i) => (
                <div key={i} style={styles.tipItem}>
                  <div style={styles.tipIcon}>{tip.icon}</div>
                  <div>
                    <div style={styles.tipTitle}>{tip.title}</div>
                    <div style={styles.tipDesc}>{tip.desc}</div>
                  </div>
                  <button style={styles.tipBtn}>Try</button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#13131f",
    borderRight: "1px solid #1e1e2e",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    position: "sticky",
    top: 0,
    height: "100vh",
    flexShrink: 0,
  },
  sidebarLogo: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#a78bfa",
    textDecoration: "none",
    padding: "0 24px",
    marginBottom: "32px",
    display: "block",
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 24px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "inherit",
    fontWeight: "500",
    textAlign: "left",
    transition: "all 0.2s ease",
  },
  sidebarIcon: {
    fontSize: "18px",
  },
  logoutBtn: {
    margin: "0 16px",
    padding: "12px",
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e3e",
    borderRadius: "10px",
    color: "#64748b",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  main: {
    flex: 1,
    padding: "32px",
    overflowY: "auto",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
  },
  welcomeText: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "4px",
  },
  welcomeSub: {
    fontSize: "15px",
    color: "#64748b",
  },
  streakBadge: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #a78bfa44",
    color: "#a78bfa",
    padding: "10px 20px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "600",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  statIcon: {
    fontSize: "32px",
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "2px",
  },
  statSub: {
    fontSize: "11px",
    color: "#64748b",
  },
  section: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "16px",
  },
  modesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  modeCard: {
    backgroundColor: "#13131f",
    border: "1px solid",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  modeIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    margin: "0 auto 16px",
  },
  modeTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  modeDesc: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "16px",
  },
  modeBtn: {
    border: "none",
    color: "#0f0f1a",
    padding: "10px 24px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  recentBox: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "24px",
  },
  resultsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  resultItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  resultDay: {
    fontSize: "13px",
    color: "#64748b",
    width: "90px",
    flexShrink: 0,
  },
  resultBar: {
    flex: 1,
    height: "8px",
    backgroundColor: "#1e1e2e",
    borderRadius: "100px",
    overflow: "hidden",
  },
  resultFill: {
    height: "100%",
    borderRadius: "100px",
    transition: "width 1s ease",
  },
  resultLevel: {
    fontSize: "12px",
    fontWeight: "600",
    width: "100px",
    flexShrink: 0,
    textAlign: "right",
  },
  tipsBox: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "24px",
  },
  tipsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  tipItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#1e1e2e",
    padding: "14px 16px",
    borderRadius: "12px",
  },
  tipIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  tipTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#f1f5f9",
    marginBottom: "2px",
  },
  tipDesc: {
    fontSize: "12px",
    color: "#64748b",
  },
  tipBtn: {
    marginLeft: "auto",
    backgroundColor: "#a78bfa22",
    border: "1px solid #a78bfa44",
    color: "#a78bfa",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0,
  },
};

export default Dashboard;
