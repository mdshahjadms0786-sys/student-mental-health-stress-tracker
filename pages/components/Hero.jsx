import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const words = ["Students", "Professionals", "Homemakers", "Everyone"];

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const { translate, currentLang } = useLanguage();
  const [texts, setTexts] = useState({
    badge: "AI Powered Stress Detection",
    heading1: "Understand Your Stress,",
    heading2: "Transform Your Life",
    builtFor: "Built for",
    desc: "Detect stress through Voice, Text or Face scan. AI will guide you at every step.",
    btn1: "Start For Free",
    btn2: "How It Works",
    users: "Active Users",
    rating: "Rating",
    awards: "Global Awards",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  async function translateAll() {
    console.log("translateAll called, lang:", currentLang);
    const t = {
      badge: await translate("AI Powered Stress Detection"),
      heading1: await translate("Understand Your Stress,"),
      heading2: await translate("Transform Your Life"),
      builtFor: await translate("Built for"),
      desc: await translate("Detect stress through Voice, Text or Face scan. AI will guide you at every step."),
      btn1: await translate("Start For Free"),
      btn2: await translate("How It Works"),
      users: await translate("Active Users"),
      rating: await translate("Rating"),
      awards: await translate("Global Awards"),
    };
    console.log("Translated texts:", t);
    setTexts(t);
  }
  translateAll();
}, [currentLang, translate]);

  return (
    <section style={styles.hero}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.badge}>{texts.badge}</div>

      <h1 style={styles.heading}>
        {texts.heading1}<br />
        <span style={styles.highlight}>{texts.heading2}</span>
      </h1>

      <div style={styles.typewriter}>
        {texts.builtFor}{" "}
        <span style={styles.changingWord}>
          {words[currentWord]}
        </span>
      </div>

      <p style={styles.description}>{texts.desc}</p>

      <div style={styles.btnGroup}>
        <Link to="/signup" style={styles.primaryBtn}>
          🚀 {texts.btn1}
        </Link>
        <button
          style={styles.secondaryBtn}
          onClick={() => {
            document.getElementById("howitworks")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          ▶ {texts.btn2}
        </button>
      </div>

      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>10K+</span>
          <span style={styles.statLabel}>{texts.users}</span>
        </div>
        <div style={styles.divider}></div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>4.9★</span>
          <span style={styles.statLabel}>{texts.rating}</span>
        </div>
        <div style={styles.divider}></div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>3</span>
          <span style={styles.statLabel}>{texts.awards}</span>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    minHeight: "90vh",
    backgroundColor: "#0f0f1a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "60px 20px",
    position: "relative",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    backgroundColor: "#a78bfa22",
    top: "-100px",
    left: "-100px",
    filter: "blur(80px)",
  },
  glow2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    backgroundColor: "#818cf822",
    bottom: "-100px",
    right: "-100px",
    filter: "blur(80px)",
  },
  badge: {
    backgroundColor: "#1e1e2e",
    color: "#a78bfa",
    padding: "8px 20px",
    borderRadius: "100px",
    fontSize: "13px",
    marginBottom: "24px",
    border: "1px solid #a78bfa44",
    letterSpacing: "1px",
    zIndex: 1,
  },
  heading: {
    fontSize: "52px",
    fontWeight: "800",
    color: "#f1f5f9",
    lineHeight: "1.2",
    marginBottom: "16px",
    zIndex: 1,
  },
  highlight: {
    color: "#a78bfa",
  },
  typewriter: {
    fontSize: "20px",
    color: "#94a3b8",
    marginBottom: "16px",
    zIndex: 1,
  },
  changingWord: {
    color: "#a78bfa",
    fontWeight: "700",
    borderBottom: "2px solid #a78bfa",
    paddingBottom: "2px",
  },
  description: {
    fontSize: "16px",
    color: "#64748b",
    maxWidth: "500px",
    lineHeight: "1.7",
    marginBottom: "36px",
    zIndex: 1,
  },
  btnGroup: {
    display: "flex",
    gap: "16px",
    marginBottom: "60px",
    flexWrap: "wrap",
    justifyContent: "center",
    zIndex: 1,
  },
  primaryBtn: {
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    textDecoration: "none",
    padding: "14px 32px",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    color: "#a78bfa",
    padding: "14px 32px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "16px",
    border: "1px solid #a78bfa",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  stats: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
    zIndex: 1,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#a78bfa",
  },
  statLabel: {
    fontSize: "13px",
    color: "#64748b",
  },
  divider: {
    width: "1px",
    height: "40px",
    backgroundColor: "#1e1e2e",
  },
};

export default Hero;
