import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";
import { saveAssessment } from "../../services/api";
import { getCurrentUserId } from "../../utils/session";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const questions = [
  { q: "Do you feel mentally exhausted even after rest?", type: "mental" },
  { q: "Do you overthink situations frequently?", type: "mental" },
  { q: "Do you feel physical fatigue due to stress?", type: "physical" },
  { q: "Do you feel emotionally overwhelmed?", type: "emotional" },
  { q: "Do you feel productive and satisfied?", type: "positive" },
  { q: "Do you feel relaxed during free time?", type: "positive" },
  { q: "Do you feel pressure from expectations?", type: "emotional" },
];

function Step2Assessment() {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [category, setCategory] = useState({
    mental: 0,
    physical: 0,
    emotional: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [stressLevel, setStressLevel] = useState("");
  const [stressDesc, setStressDesc] = useState("");
  const [stressColor, setStressColor] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAnswer = (val) => {
    const q = questions[currentQ];
    const finalVal = q.type === "positive" ? 4 - val : val;

    setScore(score + finalVal);
    setAnswers([...answers, finalVal]);

    if (q.type !== "positive") {
      setCategory({
        ...category,
        [q.type]: category[q.type] + finalVal,
      });
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      showFinalResult(score + finalVal, {
        ...category,
        [q.type !== "positive" ? q.type : ""]:
          q.type !== "positive" ? category[q.type] + finalVal : category[q.type],
      });
    }
  };

  const showFinalResult = (finalScore, finalCategory) => {
    if (finalScore <= 9) {
      setStressLevel("Low Stress");
      setStressColor("#4ade80");
      setStressDesc("Balanced state.");
    } else if (finalScore <= 18) {
      setStressLevel("Moderate Stress");
      setStressColor("#facc15");
      setStressDesc("Manage stress carefully.");
    } else {
      setStressLevel("High Stress");
      setStressColor("#f87171");
      setStressDesc("High stress detected.");
    }
    setShowResult(true);
  };

  const lineChartData = {
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
    datasets: [
      {
        label: "Stress Trend",
        data: answers,
        tension: 0.4,
        fill: true,
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.1)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Mental", "Physical", "Emotional"],
    datasets: [
      {
        data: [category.mental, category.physical, category.emotional],
        backgroundColor: ["#4ade80", "#facc15", "#f87171"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { beginAtZero: true, max: 4, ticks: { color: "white" } },
    },
  };

  const handleNextStep = async () => {
    setSaving(true);

    try {
      await saveAssessment(userId, {
        score,
        answers,
        category,
        stressLevel,
        stressColor,
        stressDesc,
      });
      navigate("/onboarding/step3");
    } catch (error) {
      alert(error.message || "Unable to save assessment right now.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        background: "#050a18",
        color: "white",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          background: "rgba(255,255,255,0.06)",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        {!showResult ? (
          <div>
            <div
              style={{
                width: "100%",
                height: "8px",
                background: "#222",
                borderRadius: "5px",
                marginBottom: "15px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#4ade80",
                  width: `${((currentQ + 1) / questions.length) * 100}%`,
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
            <p style={{ marginBottom: "20px" }}>
              Question {currentQ + 1}/{questions.length}
            </p>
            <div style={{ fontSize: "1.3rem", marginBottom: "20px" }}>
              {questions[currentQ].q}
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
              {["Never", "Rarely", "Sometimes", "Often", "Always"].map(
                (label, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "none",
                      background: "#222",
                      color: "white",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#4ade80";
                      e.target.style.color = "black";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#222";
                      e.target.style.color = "white";
                    }}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ color: stressColor }}>{stressLevel}</h2>
            <p>{stressDesc}</p>

            {answers.length === questions.length && (
              <>
                <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                  <Line data={lineChartData} options={chartOptions} />
                </div>

                <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                  <Pie data={pieChartData} />
                </div>
              </>
            )}

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#222",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#4ade80";
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#222";
                  e.target.style.color = "white";
                }}
              >
                Restart
              </button>
              <button
                onClick={handleNextStep}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#4ade80",
                  color: "black",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {saving ? "Saving..." : "Next Step"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step2Assessment;
