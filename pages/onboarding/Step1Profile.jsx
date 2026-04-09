import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfile } from "../../services/api";
import { getCurrentUserId, getStoredUser } from "../../utils/session";

const Step1Profile = () => {
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const userId = getCurrentUserId();
  const [formData, setFormData] = useState({
    name: storedUser?.profile?.name || localStorage.getItem("userName") || "",
    age: storedUser?.profile?.age || "",
    city: storedUser?.profile?.city || "",
    gender: storedUser?.profile?.gender || "",
    phone: storedUser?.profile?.phone || "",
  });
  const [preview, setPreview] = useState(
    storedUser?.profile?.photo || localStorage.getItem("userPhoto") || null
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        localStorage.setItem("userPhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = async () => {
    if (!formData.name) {
      setError("Please enter your name!");
      return;
    }
    if (!formData.age) {
      setError("Please enter your age!");
      return;
    }
    if (!formData.gender) {
      setError("Please select your gender!");
      return;
    }

    try {
      const response = await saveProfile(userId, {
        ...formData,
        photo: preview,
      });
      navigate(response.nextRoute || "/onboarding/step2");
    } catch (requestError) {
      setError(requestError.message || "Unable to save profile.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.card}>

        {/* Progress */}
        <div style={styles.progressBox}>
          <div style={styles.progressTop}>
            <span style={styles.stepText}>Step 1 of 4</span>
            <span style={styles.stepPercent}>25%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressFill,
              width: "25%",
            }} />
          </div>
        </div>

        {/* Heading */}
        <h1 style={styles.title}>
          Set Up Your Profile! 👤
        </h1>
        <p style={styles.desc}>
          This information is only used to
          personalize your experience 🔒
        </p>

        {/* Photo Upload */}
        <div style={styles.photoSection}>
          <label style={styles.photoWrapper}>
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                style={styles.photoPreview}
              />
            ) : (
              <div style={styles.photoPlaceholder}>
                <span style={styles.photoIcon}>👤</span>
                <span style={styles.photoText}>
                  Add Photo
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              style={{ display: "none" }}
            />
          </label>
          <p style={styles.photoHint}>
            Optional — tap to upload
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>⚠️ {error}</div>
        )}

        {/* Form */}
        <div style={styles.form}>

          {/* Name */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              Full Name{" "}
              <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Rahul Sharma"
              style={styles.input}
            />
          </div>

          {/* Age + City */}
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Age{" "}
                <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="21"
                min="10"
                max="100"
                style={styles.input}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                City{" "}
                <span style={styles.optional}>
                  (Optional)
                </span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Delhi"
                style={styles.input}
              />
            </div>
          </div>

          {/* Gender */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              Gender{" "}
              <span style={styles.required}>*</span>
            </label>
            <div style={styles.genderRow}>
              {[
                { value: "male", label: "👦 Male" },
                { value: "female", label: "👧 Female" },
                { value: "other", label: "🌈 Other" },
                {
                  value: "prefer_not",
                  label: "🤐 Prefer Not to Say",
                },
              ].map((g) => (
                <div
                  key={g.value}
                  style={{
                    ...styles.genderChip,
                    backgroundColor:
                      formData.gender === g.value
                        ? "#a78bfa22" : "#1e1e2e",
                    borderColor:
                      formData.gender === g.value
                        ? "#a78bfa" : "#2e2e3e",
                    color:
                      formData.gender === g.value
                        ? "#a78bfa" : "#94a3b8",
                  }}
                  onClick={() => {
                    setFormData({
                      ...formData,
                      gender: g.value,
                    });
                    setError("");
                  }}
                >
                  {g.label}
                </div>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              Phone Number{" "}
              <span style={styles.optional}>
                (Optional)
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              style={styles.input}
            />
            <span style={styles.hint}>
              💙 Only used for emergency stress alerts
            </span>
          </div>

          {/* Button */}
          <button
            style={styles.continueBtn}
            onClick={handleContinue}
          >
            Continue → Step 2
          </button>

        </div>

      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    backgroundColor: "#a78bfa11",
    top: "-150px",
    left: "-150px",
    filter: "blur(100px)",
  },
  glow2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    backgroundColor: "#818cf811",
    bottom: "-150px",
    right: "-150px",
    filter: "blur(100px)",
  },
  card: {
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "24px",
    padding: "48px",
    width: "100%",
    maxWidth: "520px",
    position: "relative",
    zIndex: 1,
  },
  progressBox: {
    marginBottom: "32px",
  },
  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  stepText: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600",
  },
  stepPercent: {
    fontSize: "13px",
    color: "#a78bfa",
    fontWeight: "700",
  },
  progressBar: {
    height: "6px",
    backgroundColor: "#1e1e2e",
    borderRadius: "100px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#a78bfa",
    borderRadius: "100px",
    transition: "width 0.5s ease",
  },
  title: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "8px",
  },
  desc: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "28px",
    lineHeight: "1.6",
  },
  photoSection: {
    textAlign: "center",
    marginBottom: "28px",
  },
  photoWrapper: {
    display: "inline-block",
    cursor: "pointer",
    marginBottom: "8px",
  },
  photoPreview: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #a78bfa",
    display: "block",
  },
  photoPlaceholder: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#1e1e2e",
    border: "2px dashed #a78bfa44",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  },
  photoIcon: {
    fontSize: "28px",
  },
  photoText: {
    fontSize: "10px",
    color: "#a78bfa",
    fontWeight: "600",
  },
  photoHint: {
    fontSize: "12px",
    color: "#64748b",
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
  row: {
    display: "flex",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  label: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  required: {
    color: "#ef4444",
  },
  optional: {
    color: "#64748b",
    fontWeight: "400",
    fontSize: "12px",
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
  genderRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  genderChip: {
    padding: "10px 16px",
    borderRadius: "100px",
    border: "1px solid",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
  },
  hint: {
    fontSize: "11px",
    color: "#64748b",
  },
  continueBtn: {
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: "8px",
    width: "100%",
  },
};

export default Step1Profile;
