import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSummary } from "../../services/api";
import { getCurrentUserId, getStoredUser } from "../../utils/session";

function getStressScore(user) {
  if (user?.assessment?.score) {
    return user.assessment.score;
  }

  const mood = user?.emotion?.mood || "cloudy";
  const intensity = user?.emotion?.intensity || "medium";
  const moodScores = {
    stormy: 82,
    rainy: 68,
    dark: 58,
    cloudy: 42,
    sunny: 18,
  };
  const intensityBoost = {
    high: 10,
    medium: 4,
    low: -4,
  };

  return Math.max(10, Math.min(95, (moodScores[mood] || 56) + (intensityBoost[intensity] || 0)));
}

function getStressMeta(score) {
  if (score >= 75) {
    return { label: "High", color: "#ef4444" };
  }
  if (score >= 50) {
    return { label: "Medium", color: "#f59e0b" };
  }
  if (score >= 25) {
    return { label: "Low", color: "#22c55e" };
  }
  return { label: "Minimal", color: "#818cf8" };
}

function Step4SummaryPage() {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const [user, setUser] = useState(getStoredUser());
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadSummary() {
      setLoading(true);
      setError("");

      try {
        const response = await fetchSummary(userId);
        if (!active) {
          return;
        }

        setSummary(response.summary);
        setUser(response.user);
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "Unable to generate summary.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      active = false;
    };
  }, [userId]);

  const score = getStressScore(user);
  const stressMeta = getStressMeta(score);
  const displayName = user?.profile?.name || user?.name || "Demo User";
  const displayRole = user?.roleLabel || "User";

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingTitle}>Preparing your analysis...</div>
          <div style={styles.loadingText}>ARIA is turning your chat into a clear summary.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>Step 4 of 4</div>
          <h1 style={styles.title}>Your Stress Summary</h1>
          <p style={styles.subtitle}>This demo summary is now saved and your dashboard is ready.</p>
        </div>

        {error ? <div style={styles.errorBox}>{error}</div> : null}

        <div style={styles.card}>
          <div style={styles.profileRow}>
            <div style={styles.avatar}>{displayName[0]?.toUpperCase() || "D"}</div>
            <div>
              <div style={styles.name}>{displayName}</div>
              <div style={styles.role}>{displayRole}</div>
            </div>
          </div>

          <div style={styles.scoreWrap}>
            <div style={styles.scoreRow}>
              <span style={styles.scoreLabel}>Stress score</span>
              <span style={{ ...styles.scoreValue, color: stressMeta.color }}>
                {stressMeta.label} - {score}/100
              </span>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${score}%`,
                  backgroundColor: stressMeta.color,
                }}
              />
            </div>
          </div>
        </div>

        {summary ? (
          <>
            <div style={styles.card}>
              <div style={styles.sectionTitle}>Summary</div>
              <p style={styles.bodyText}>{summary.stressSummary}</p>
            </div>

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Main Triggers</div>
              <div style={styles.triggerRow}>
                {(summary.mainTriggers || []).map((trigger) => (
                  <div key={trigger} style={styles.triggerChip}>
                    {trigger}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Psychological Pattern</div>
              <p style={styles.bodyText}>{summary.psychologicalPattern}</p>
            </div>

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Immediate Steps</div>
              <div style={styles.stepsList}>
                {(summary.immediateSteps || []).map((step) => (
                  <div key={step.title} style={styles.stepItem}>
                    <div style={styles.stepIcon}>{step.icon}</div>
                    <div>
                      <div style={styles.stepTitle}>{step.title}</div>
                      <div style={styles.stepDesc}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.highlightCard}>
              <div style={styles.sectionTitle}>Affirmation</div>
              <p style={styles.highlightText}>{summary.affirmation}</p>
            </div>
          </>
        ) : null}

        <div style={styles.buttonRow}>
          <button type="button" style={styles.secondaryBtn} onClick={() => navigate("/onboarding/step3chat")}>
            Talk to ARIA again
          </button>
          <button type="button" style={styles.primaryBtn} onClick={() => navigate("/dashboard")}>
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a14",
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
  },
  container: {
    width: "100%",
    maxWidth: "760px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  header: {
    textAlign: "center",
    marginBottom: "8px",
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "999px",
    backgroundColor: "#1e1e2e",
    color: "#a78bfa",
    border: "1px solid #a78bfa44",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  title: {
    color: "#f8fafc",
    margin: 0,
    fontSize: "32px",
  },
  subtitle: {
    color: "#64748b",
    marginTop: "10px",
    fontSize: "14px",
  },
  loadingCard: {
    margin: "auto",
    padding: "28px 32px",
    borderRadius: "20px",
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    textAlign: "center",
  },
  loadingTitle: {
    color: "#f8fafc",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  errorBox: {
    padding: "12px 14px",
    borderRadius: "10px",
    backgroundColor: "#3a1218",
    border: "1px solid #8a2431",
    color: "#fca5a5",
    fontSize: "13px",
  },
  card: {
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
  },
  highlightCard: {
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#181227",
    border: "1px solid #a78bfa33",
  },
  profileRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  avatar: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    backgroundColor: "#a78bfa22",
    border: "1px solid #a78bfa44",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a78bfa",
    fontSize: "24px",
    fontWeight: "700",
  },
  name: {
    color: "#f8fafc",
    fontSize: "20px",
    fontWeight: "700",
  },
  role: {
    color: "#64748b",
    fontSize: "14px",
    marginTop: "4px",
  },
  scoreWrap: {
    backgroundColor: "#1e1e2e",
    padding: "16px",
    borderRadius: "14px",
  },
  scoreRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "10px",
  },
  scoreLabel: {
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "600",
  },
  scoreValue: {
    fontSize: "13px",
    fontWeight: "700",
  },
  progressBar: {
    width: "100%",
    height: "10px",
    borderRadius: "999px",
    backgroundColor: "#0f0f1a",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  bodyText: {
    color: "#94a3b8",
    fontSize: "14px",
    lineHeight: "1.8",
    margin: 0,
  },
  triggerRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  triggerChip: {
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e3e",
    color: "#cbd5e1",
    fontSize: "13px",
    fontWeight: "600",
  },
  stepsList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  stepItem: {
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
  },
  stepIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    backgroundColor: "#a78bfa22",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a78bfa",
    fontSize: "13px",
    fontWeight: "700",
    flexShrink: 0,
  },
  stepTitle: {
    color: "#f8fafc",
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  stepDesc: {
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "1.7",
  },
  highlightText: {
    color: "#d8c7ff",
    fontSize: "14px",
    lineHeight: "1.8",
    margin: 0,
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  secondaryBtn: {
    flex: 1,
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #2e2e3e",
    backgroundColor: "transparent",
    color: "#cbd5e1",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  primaryBtn: {
    flex: 1,
    padding: "14px 16px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default Step4SummaryPage;
