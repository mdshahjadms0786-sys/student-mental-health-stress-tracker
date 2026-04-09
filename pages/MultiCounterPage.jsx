import React from "react";
import { Link } from "react-router-dom";
import MultiCounter from "./components/MultiCounter";

function MultiCounterPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link to="/" style={styles.backLink}>
          Back to Home
        </Link>

        <div style={styles.introBox}>
          <h1 style={styles.title}>Simple Multi Counter Example</h1>
          <p style={styles.text}>
            Ye page aapke project structure ke hisaab se banaya gaya hai. Code simple rakha hai, bas
            `useState` aur array update ka easy example use hua hai.
          </p>
        </div>

        <MultiCounter />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
  },
  backLink: {
    display: "inline-block",
    marginBottom: "18px",
    color: "#a78bfa",
    textDecoration: "none",
    fontWeight: "600",
  },
  introBox: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "18px",
    padding: "24px",
    marginBottom: "20px",
  },
  title: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "30px",
    fontWeight: "800",
  },
  text: {
    margin: "12px 0 0",
    color: "#94a3b8",
    fontSize: "15px",
    lineHeight: "1.6",
  },
};

export default MultiCounterPage;
