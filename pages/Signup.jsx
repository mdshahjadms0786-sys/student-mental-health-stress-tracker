import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/api";

const roles = [
  { id: "student", icon: "🎒", label: "School Student" },
  { id: "college", icon: "🎓", label: "College Student" },
  { id: "professional", icon: "💼", label: "Professional" },
  { id: "homemaker", icon: "🏠", label: "Homemaker" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleStep1 = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }
    setStep(2);
  };

  const handleStep2 = async () => {
    if (!formData.role) {
      setError("Please select your role!");
      return;
    }
    setLoading(true);

    try {
      const response = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      setLoading(false);
      navigate(response.nextRoute || "/onboarding/step1");
    } catch (requestError) {
      setLoading(false);
      setError(requestError.message || "Signup failed.");
    }
  };

  return (
    <div style={styles.page}>

      {/* Left Side — Branding */}
      <div style={styles.leftSide}>
        <div style={styles.glow}></div>
        <Link to="/" style={styles.logo}>🧠 StressTrack</Link>

        <h2 style={styles.leftTitle}>
          Start your<br />
          <span style={styles.leftHighlight}>
            stress-free journey today!
          </span>
        </h2>

        <p style={styles.leftDesc}>
          Join 10,000+ people who are using StressTrack to understand and manage their stress with AI.
        </p>

        {/* Steps indicator */}
        <div style={styles.stepsBox}>
          <div style={styles.stepsTitle}>Quick Setup — 2 Steps</div>
          <div style={styles.stepRow}>
            <div style={{
              ...styles.stepCircle,
              backgroundColor: step >= 1 ? "#a78bfa" : "#1e1e2e",
              color: step >= 1 ? "#0f0f1a" : "#64748b",
            }}>1</div>
            <div style={styles.stepLine}></div>
            <div style={{
              ...styles.stepCircle,
              backgroundColor: step >= 2 ? "#a78bfa" : "#1e1e2e",
              color: step >= 2 ? "#0f0f1a" : "#64748b",
            }}>2</div>
          </div>
          <div style={styles.stepLabels}>
            <span style={{
              fontSize: "12px",
              color: step >= 1 ? "#a78bfa" : "#64748b",
            }}>
              Your Details
            </span>
            <span style={{
              fontSize: "12px",
              color: step >= 2 ? "#a78bfa" : "#64748b",
            }}>
              Your Role
            </span>
          </div>
        </div>

        {/* Features */}
        <div style={styles.featureList}>
          {[
            "🆓 Free forever — no credit card",
            "🔒 100% private & secure",
            "🌐 Available in 18 languages",
            "📱 Works on all devices",
          ].map((f, i) => (
            <div key={i} style={styles.featureItem}>
              <span style={styles.featureDot}>✓</span>
              {f}
            </div>
          ))}
        </div>

      </div>

      {/* Right Side — Form */}
      <div style={styles.rightSide}>
        <div style={styles.formCard}>

          {/* Step 1 — Details */}
          {step === 1 && (
            <>
              <h2 style={styles.formTitle}>Create your account</h2>
              <p style={styles.formSub}>
                Already have an account?{" "}
                <Link to="/login" style={styles.formLink}>
                  Login here
                </Link>
              </p>

              {/* Social Signup */}
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
                <span style={styles.dividerText}>or signup with email</span>
                <div style={styles.dividerLine}></div>
              </div>

              {error && (
                <div style={styles.errorBox}>⚠️ {error}</div>
              )}

              <form onSubmit={handleStep1} style={styles.form}>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rahul Sharma"
                    required
                    style={styles.input}
                  />
                </div>

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
                  <label style={styles.label}>Password</label>
                  <div style={styles.passWrapper}>
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 6 characters"
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

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required
                    style={styles.input}
                  />
                </div>

                <button
                  type="submit"
                  style={styles.submitBtn}
                >
                  Continue →
                </button>

              </form>
            </>
          )}

          {/* Step 2 — Role Selection */}
          {step === 2 && (
            <>
              <h2 style={styles.formTitle}>Who are you?</h2>
              <p style={styles.formSub}>
                This helps us personalize your stress tracking experience
              </p>

              {error && (
                <div style={styles.errorBox}>⚠️ {error}</div>
              )}

              <div style={styles.rolesGrid}>
                {roles.map((role) => (
                  <div
                    key={role.id}
                    style={{
                      ...styles.roleCard,
                      borderColor: formData.role === role.id
                        ? "#a78bfa" : "#1e1e2e",
                      backgroundColor: formData.role === role.id
                        ? "#a78bfa11" : "#1e1e2e",
                    }}
                    onClick={() => {
                      setFormData({ ...formData, role: role.id });
                      setError("");
                    }}
                  >
                    <div style={styles.roleIcon}>{role.icon}</div>
                    <div style={{
                      ...styles.roleLabel,
                      color: formData.role === role.id
                        ? "#a78bfa" : "#cbd5e1",
                    }}>
                      {role.label}
                    </div>
                  </div>
                ))}
              </div>

              <button
                style={{
                  ...styles.submitBtn,
                  opacity: loading ? 0.7 : 1,
                  marginTop: "24px",
                }}
                onClick={handleStep2}
                disabled={loading}
              >
                {loading
                  ? "Creating account..."
                  : "Create My Account 🚀"}
              </button>

              <button
                style={styles.backBtn}
                onClick={() => setStep(1)}
              >
                ← Go back
              </button>
            </>
          )}

          <p style={styles.terms}>
            By signing up you agree to our{" "}
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
    marginBottom: "32px",
    maxWidth: "400px",
  },
  stepsBox: {
    backgroundColor: "#1e1e2e",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "32px",
  },
  stepsTitle: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "16px",
    fontWeight: "600",
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  stepCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    transition: "all 0.3s ease",
  },
  stepLine: {
    flex: 1,
    height: "2px",
    backgroundColor: "#2e2e3e",
  },
  stepLabels: {
    display: "flex",
    justifyContent: "space-between",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
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
  label: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "600",
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
  rolesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "8px",
  },
  roleCard: {
    border: "1px solid",
    borderRadius: "16px",
    padding: "24px 16px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  roleIcon: {
    fontSize: "36px",
    marginBottom: "12px",
  },
  roleLabel: {
    fontSize: "14px",
    fontWeight: "600",
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
    width: "100%",
    marginTop: "8px",
  },
  backBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#64748b",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: "12px",
    width: "100%",
    padding: "8px",
  },
  terms: {
    fontSize: "12px",
    color: "#64748b",
    textAlign: "center",
    marginTop: "20px",
    lineHeight: "1.6",
  },
};

export default Signup;
