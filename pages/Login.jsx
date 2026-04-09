import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { getStoredUser } from "../utils/session";

const storedUser = getStoredUser();

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: storedUser?.email || "demo@stresstrack.local",
    password: "demo123",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(formData);
      setLoading(false);
      navigate(response.nextRoute || "/onboarding/step1");
    } catch (requestError) {
      setLoading(false);
      setError(requestError.message || "Login failed.");
    }
  };

  return (
    <div style={styles.page}>

      {/* Left Side — Branding */}
      <div style={styles.leftSide}>
        <div style={styles.glow}></div>
        <Link to="/" style={styles.logo}>🧠 StressTrack</Link>
        <h2 style={styles.leftTitle}>
          Welcome back!<br />
          <span style={styles.leftHighlight}>
            Your stress-free journey continues.
          </span>
        </h2>
        <p style={styles.leftDesc}>
          Track your stress, understand your triggers and live a healthier life with AI powered insights.
        </p>

        {/* Features List */}
        <div style={styles.featureList}>
          {[
            "🎤 Voice stress analysis",
            "📷 Face emotion detection",
            "🤖 AI chatbot support",
            "📊 Personal dashboard",
          ].map((f, i) => (
            <div key={i} style={styles.featureItem}>
              <span style={styles.featureDot}>✓</span>
              {f}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <div style={styles.statNum}>10K+</div>
            <div style={styles.statLbl}>Users</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNum}>4.9★</div>
            <div style={styles.statLbl}>Rating</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNum}>Free</div>
            <div style={styles.statLbl}>Forever</div>
          </div>
        </div>
      </div>

      {/* Right Side — Form */}
      <div style={styles.rightSide}>
        <div style={styles.formCard}>

          <h2 style={styles.formTitle}>Login to your account</h2>
          <p style={styles.formSub}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.formLink}>
              Sign up free
            </Link>
          </p>

          {/* Social Login */}
          <div style={styles.socialBtns}>
            <button style={styles.socialBtn}>
              🔵 Continue with Google
            </button>
            <button style={styles.socialBtn}>
              ⚫ Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div style={styles.dividerRow}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>or login with email</span>
            <div style={styles.dividerLine}></div>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.errorBox}>⚠️ {error}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rahul@gmail.com"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <div style={styles.passLabelRow}>
                <label style={styles.label}>Password</label>
                <span style={styles.forgotLink}>Forgot password?</span>
              </div>
              <div style={styles.passWrapper}>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  style={{ ...styles.input, paddingRight: "50px" }}
                />
                <button
                  type="button"
                  style={styles.eyeBtn}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>

          </form>

          <p style={styles.terms}>
            By logging in you agree to our{" "}
            <span style={styles.formLink}>Terms of Service</span>
            {" "}and{" "}
            <span style={styles.formLink}>Privacy Policy</span>
          </p>

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
  leftSide: {
    flex: 1,
    backgroundColor: "#13131f",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    borderRight: "1px solid #1e1e2e",
  },
  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    backgroundColor: "#a78bfa11",
    top: "-100px",
    left: "-100px",
    filter: "blur(80px)",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#a78bfa",
    textDecoration: "none",
    marginBottom: "48px",
    display: "block",
  },
  leftTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#f1f5f9",
    lineHeight: "1.3",
    marginBottom: "16px",
  },
  leftHighlight: {
    color: "#a78bfa",
  },
  leftDesc: {
    fontSize: "15px",
    color: "#64748b",
    lineHeight: "1.7",
    marginBottom: "40px",
    maxWidth: "400px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "48px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "15px",
    color: "#cbd5e1",
  },
  featureDot: {
    color: "#a78bfa",
    fontWeight: "700",
    fontSize: "16px",
  },
  statsRow: {
    display: "flex",
    gap: "32px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statNum: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#a78bfa",
  },
  statLbl: {
    fontSize: "12px",
    color: "#64748b",
  },
  rightSide: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  formCard: {
    width: "100%",
    maxWidth: "420px",
  },
  formTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "8px",
  },
  formSub: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "32px",
  },
  formLink: {
    color: "#a78bfa",
    textDecoration: "none",
    cursor: "pointer",
  },
  socialBtns: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
  },
  socialBtn: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e3e",
    color: "#cbd5e1",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  dividerRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#1e1e2e",
  },
  dividerText: {
    fontSize: "12px",
    color: "#64748b",
    whiteSpace: "nowrap",
  },
  errorBox: {
    backgroundColor: "#ff000011",
    border: "1px solid #ff000033",
    color: "#ff6b6b",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  passLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  forgotLink: {
    fontSize: "13px",
    color: "#a78bfa",
    cursor: "pointer",
  },
  passWrapper: {
    position: "relative",
  },
  input: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e3e",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#f1f5f9",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: 0,
  },
  submitBtn: {
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
    marginTop: "8px",
  },
  terms: {
    fontSize: "12px",
    color: "#64748b",
    textAlign: "center",
    marginTop: "20px",
    lineHeight: "1.6",
  },
};

export default Login;
