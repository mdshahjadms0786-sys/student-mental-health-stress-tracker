import React, { useState } from "react";

function MultiCounter() {
  const [counts, setCounts] = useState([0, 0, 0]);

  function increment(index) {
    setCounts((previousCounts) => {
      const updatedCounts = [...previousCounts];
      updatedCounts[index] = updatedCounts[index] + 1;
      return updatedCounts;
    });
  }

  function decrement(index) {
    setCounts((previousCounts) => {
      const updatedCounts = [...previousCounts];
      if (updatedCounts[index] > 0) {
        updatedCounts[index] = updatedCounts[index] - 1;
      }
      return updatedCounts;
    });
  }

  function resetAll() {
    setCounts([0, 0, 0]);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.heading}>Multi Counter</h2>
          <p style={styles.subText}>Simple `useState` array example.</p>
        </div>

        <button type="button" style={styles.resetButton} onClick={resetAll}>
          Reset All
        </button>
      </div>

      <div style={styles.counterGrid}>
        {counts.map((count, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardTitle}>Counter {index + 1}</div>
            <div style={styles.countValue}>{count}</div>

            <div style={styles.buttonRow}>
              <button type="button" style={styles.actionButton} onClick={() => decrement(index)}>
                -1
              </button>
              <button type="button" style={styles.actionButton} onClick={() => increment(index)}>
                +1
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.totalBox}>Total Count: {counts[0] + counts[1] + counts[2]}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "18px",
    padding: "24px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  heading: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "24px",
    fontWeight: "700",
  },
  subText: {
    margin: "8px 0 0",
    color: "#94a3b8",
    fontSize: "14px",
  },
  resetButton: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  counterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "#1a1a29",
    border: "1px solid #2a2a3c",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center",
  },
  cardTitle: {
    color: "#cbd5e1",
    fontSize: "15px",
    marginBottom: "14px",
  },
  countValue: {
    color: "#a78bfa",
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "16px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  actionButton: {
    border: "none",
    borderRadius: "8px",
    padding: "10px 14px",
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    minWidth: "58px",
  },
  totalBox: {
    marginTop: "20px",
    padding: "14px 16px",
    borderRadius: "12px",
    backgroundColor: "#1e1e2e",
    color: "#f8fafc",
    fontSize: "15px",
    fontWeight: "600",
    textAlign: "center",
  },
};

export default MultiCounter;
