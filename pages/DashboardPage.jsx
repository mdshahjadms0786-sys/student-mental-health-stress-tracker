import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { fetchDashboard } from "../services/api";
import { clearSession } from "../utils/session";

ChartJS.register(
  ArcElement,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
);

function DashboardPage() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const response = await fetchDashboard();
        if (active) {
          setDashboard(response);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "Unable to load dashboard.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingTitle}>Loading dashboard...</div>
          <div style={styles.loadingText}>Fetching your demo user progress and charts.</div>
        </div>
      </div>
    );
  }

  const user = dashboard?.user;
  const displayName = user?.profile?.name || user?.name || "Demo User";
  const history = dashboard?.history || [];
  const latest = dashboard?.latest || { level: "Medium", score: 56, color: "#f59e0b" };
  const weeklyAverage = dashboard?.weeklyAverage || { level: "Medium", score: 56 };
  const category = dashboard?.category || { mental: 3, physical: 2, emotional: 4 };
  const tips = dashboard?.tips || [];

  const lineChartData = {
    labels: history.map((entry) => entry.day),
    datasets: [
      {
        label: "Stress Score",
        data: history.map((entry) => entry.score),
        borderColor: "#a78bfa",
        backgroundColor: "rgba(167, 139, 250, 0.15)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const pieChartData = {
    labels: ["Mental", "Physical", "Emotional"],
    datasets: [
      {
        data: [category.mental, category.physical, category.emotional],
        backgroundColor: ["#a78bfa", "#818cf8", "#ef4444"],
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        ticks: {
          color: "#94a3b8",
        },
      },
    },
  };

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <Link to="/" style={styles.sidebarLogo}>
          StressTrack
        </Link>

        <div style={styles.sidebarGroup}>
          <button type="button" style={styles.sidebarItem}>
            Dashboard
          </button>
          <button type="button" style={styles.sidebarItem} onClick={() => navigate("/onboarding/step1")}>
            Profile
          </button>
          <button type="button" style={styles.sidebarItem} onClick={() => navigate("/onboarding/step2")}>
            Recheck Stress
          </button>
          <button type="button" style={styles.sidebarItem} onClick={() => navigate("/onboarding/step3")}>
            Mood Check
          </button>
        </div>

        <button type="button" style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.welcomeText}>Welcome back, {displayName}</h1>
            <p style={styles.welcomeSub}>
              {user?.roleLabel || "User"} • onboarding completed without errors
            </p>
          </div>

          <div style={styles.scoreBadge}>{latest.level} • {latest.score}/100</div>
        </div>

        {error ? <div style={styles.errorBox}>{error}</div> : null}

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Today's Stress</div>
            <div style={{ ...styles.statValue, color: latest.color }}>{latest.level}</div>
            <div style={styles.statSub}>Score: {latest.score}/100</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Weekly Average</div>
            <div style={styles.statValue}>{weeklyAverage.level}</div>
            <div style={styles.statSub}>Score: {weeklyAverage.score}/100</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Current Streak</div>
            <div style={styles.statValue}>{dashboard?.streak || 0} days</div>
            <div style={styles.statSub}>Keep showing up</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Checks</div>
            <div style={styles.statValue}>{dashboard?.totalChecks || 0}</div>
            <div style={styles.statSub}>Saved in backend demo data</div>
          </div>
        </div>

        <div style={styles.chartGrid}>
          <div style={styles.chartCard}>
            <div style={styles.sectionTitle}>Stress Trend</div>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>

          <div style={styles.chartCard}>
            <div style={styles.sectionTitle}>Stress Breakdown</div>
            <div style={styles.pieWrap}>
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>

        <div style={styles.bottomGrid}>
          <div style={styles.listCard}>
            <div style={styles.sectionTitle}>Recent Results</div>
            <div style={styles.resultList}>
              {history.map((entry) => (
                <div key={`${entry.day}-${entry.score}`} style={styles.resultItem}>
                  <div style={styles.resultDay}>{entry.day}</div>
                  <div style={styles.resultBar}>
                    <div
                      style={{
                        ...styles.resultFill,
                        width: `${entry.score}%`,
                        backgroundColor: entry.color,
                      }}
                    />
                  </div>
                  <div style={{ ...styles.resultLevel, color: entry.color }}>
                    {entry.level} {entry.score}/100
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.listCard}>
            <div style={styles.sectionTitle}>Personalized Tips</div>
            <div style={styles.tipList}>
              {tips.map((tip) => (
                <div key={tip.title} style={styles.tipItem}>
                  <div style={styles.tipIcon}>{tip.icon}</div>
                  <div>
                    <div style={styles.tipTitle}>{tip.title}</div>
                    <div style={styles.tipDesc}>{tip.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  loadingPage: {
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingCard: {
    padding: "28px 32px",
    borderRadius: "18px",
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
  page: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#13131f",
    borderRight: "1px solid #1e1e2e",
    padding: "24px 18px",
    display: "flex",
    flexDirection: "column",
  },
  sidebarLogo: {
    color: "#a78bfa",
    textDecoration: "none",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "30px",
  },
  sidebarGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  sidebarItem: {
    textAlign: "left",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #1e1e2e",
    backgroundColor: "#1a1a29",
    color: "#cbd5e1",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  logoutBtn: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #2e2e3e",
    backgroundColor: "transparent",
    color: "#94a3b8",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  main: {
    flex: 1,
    padding: "32px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "28px",
  },
  welcomeText: {
    color: "#f8fafc",
    fontSize: "32px",
    margin: 0,
  },
  welcomeSub: {
    color: "#64748b",
    fontSize: "14px",
    marginTop: "8px",
  },
  scoreBadge: {
    padding: "10px 16px",
    borderRadius: "999px",
    backgroundColor: "#1e1e2e",
    border: "1px solid #a78bfa44",
    color: "#a78bfa",
    fontWeight: "700",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  errorBox: {
    marginBottom: "18px",
    padding: "12px 14px",
    borderRadius: "10px",
    backgroundColor: "#3a1218",
    border: "1px solid #8a2431",
    color: "#fca5a5",
    fontSize: "13px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "20px",
  },
  statLabel: {
    color: "#64748b",
    fontSize: "12px",
    marginBottom: "8px",
  },
  statValue: {
    color: "#f8fafc",
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "6px",
  },
  statSub: {
    color: "#94a3b8",
    fontSize: "12px",
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
    gap: "20px",
    marginBottom: "24px",
  },
  chartCard: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "20px",
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: "17px",
    fontWeight: "700",
    marginBottom: "16px",
  },
  pieWrap: {
    maxWidth: "280px",
    margin: "0 auto",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "20px",
  },
  listCard: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "20px",
  },
  resultList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  resultItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  resultDay: {
    width: "90px",
    flexShrink: 0,
    color: "#64748b",
    fontSize: "13px",
  },
  resultBar: {
    flex: 1,
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#1e1e2e",
    overflow: "hidden",
  },
  resultFill: {
    height: "100%",
    borderRadius: "999px",
  },
  resultLevel: {
    width: "110px",
    flexShrink: 0,
    textAlign: "right",
    fontSize: "12px",
    fontWeight: "600",
  },
  tipList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  tipItem: {
    display: "flex",
    gap: "12px",
    backgroundColor: "#1e1e2e",
    borderRadius: "12px",
    padding: "14px",
  },
  tipIcon: {
    minWidth: "42px",
    height: "42px",
    borderRadius: "12px",
    backgroundColor: "#a78bfa22",
    color: "#a78bfa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
  },
  tipTitle: {
    color: "#f8fafc",
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  tipDesc: {
    color: "#94a3b8",
    fontSize: "13px",
    lineHeight: "1.6",
  },
};

export default DashboardPage;
