import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const popularRoles = [
  { id: "school_student", icon: "🎒", title: "School Student" },
  { id: "college_student", icon: "🎓", title: "College Student" },
  { id: "working_professional", icon: "💼", title: "Working Professional" },
  { id: "homemaker", icon: "🏠", title: "Homemaker" },
  { id: "teacher", icon: "👨‍🏫", title: "Teacher" },
  { id: "doctor", icon: "🏥", title: "Doctor / Healthcare" },
];

const allRoles = [
  ...popularRoles,
  { id: "freelancer", icon: "💻", title: "Freelancer" },
  { id: "business_owner", icon: "🏢", title: "Business Owner" },
  { id: "artist", icon: "🎨", title: "Artist / Creative" },
  { id: "athlete", icon: "⚽", title: "Athlete / Sports" },
  { id: "parent", icon: "👨‍👩‍👧", title: "Parent" },
  { id: "job_seeker", icon: "🔍", title: "Job Seeker" },
  { id: "retired", icon: "👴", title: "Retired / Senior" },
  { id: "defense", icon: "🪖", title: "Defense / Army" },
  { id: "phd_scholar", icon: "📚", title: "PhD / Research" },
  { id: "traveler", icon: "✈️", title: "Frequent Traveler" },
];

function getAutoIcon(roleName) {
  const name = roleName.toLowerCase();
  if (name.includes("pilot") || name.includes("aviation")) return "✈️";
  if (name.includes("driver") || name.includes("taxi")) return "🚗";
  if (name.includes("sailor") || name.includes("navy")) return "⚓";
  if (name.includes("astronaut")) return "🚀";
  if (name.includes("doctor") || name.includes("physician")) return "👨‍⚕️";
  if (name.includes("nurse")) return "👩‍⚕️";
  if (name.includes("dentist")) return "🦷";
  if (name.includes("pharmacist")) return "💊";
  if (name.includes("therapist") || name.includes("psychologist")) return "🧠";
  if (name.includes("student")) return "📚";
  if (name.includes("teacher") || name.includes("professor")) return "👨‍🏫";
  if (name.includes("researcher") || name.includes("scientist")) return "🔬";
  if (name.includes("singer") || name.includes("vocalist")) return "🎤";
  if (name.includes("musician") || name.includes("guitarist")) return "🎸";
  if (name.includes("dancer")) return "💃";
  if (name.includes("actor") || name.includes("actress")) return "🎭";
  if (name.includes("artist") || name.includes("painter")) return "🎨";
  if (name.includes("photographer")) return "📷";
  if (name.includes("writer") || name.includes("author")) return "✍️";
  if (name.includes("director") || name.includes("filmmaker")) return "🎬";
  if (name.includes("engineer") || name.includes("developer")) return "⚙️";
  if (name.includes("programmer") || name.includes("coder")) return "💻";
  if (name.includes("designer")) return "🖌️";
  if (name.includes("data") || name.includes("analyst")) return "📊";
  if (name.includes("manager") || name.includes("ceo")) return "👔";
  if (name.includes("entrepreneur") || name.includes("founder")) return "💡";
  if (name.includes("accountant") || name.includes("finance")) return "💰";
  if (name.includes("lawyer") || name.includes("advocate")) return "⚖️";
  if (name.includes("banker")) return "🏦";
  if (name.includes("sales") || name.includes("marketing")) return "📈";
  if (name.includes("cricketer") || name.includes("cricket")) return "🏏";
  if (name.includes("footballer")) return "⚽";
  if (name.includes("swimmer")) return "🏊";
  if (name.includes("boxer")) return "🥊";
  if (name.includes("athlete") || name.includes("runner")) return "🏃";
  if (name.includes("coach") || name.includes("trainer")) return "🏋️";
  if (name.includes("yoga")) return "🧘";
  if (name.includes("police") || name.includes("officer")) return "👮";
  if (name.includes("army") || name.includes("soldier")) return "🪖";
  if (name.includes("firefighter")) return "🚒";
  if (name.includes("chef") || name.includes("cook")) return "👨‍🍳";
  if (name.includes("farmer")) return "🌾";
  if (name.includes("politician") || name.includes("minister")) return "🏛️";
  if (name.includes("influencer") || name.includes("youtuber")) return "📱";
  if (name.includes("gamer")) return "🎮";
  if (name.includes("parent") || name.includes("mother") || name.includes("father")) return "👨‍👩‍👧";
  if (name.includes("retired")) return "👴";
  return "👤";
}

const Step2Role = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(
    localStorage.getItem("userRole") || ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    localStorage.getItem("userRoleLabel") || ""
  );
  const [customRole, setCustomRole] = useState("");
  const [error, setError] = useState("");

  const filteredRoles = allRoles.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const noResults = search.length > 1 && filteredRoles.length === 0;

  const handleSelect = (role) => {
    setSelectedRole(role.id);
    setSelectedLabel(`${role.icon} ${role.title}`);
    setCustomRole("");
    setError("");
  };

  const handleUseCustom = () => {
    if (!customRole.trim()) {
      setError("Please type your role!");
      return;
    }
    const autoIcon = getAutoIcon(customRole);
    setSelectedRole("custom");
    setSelectedLabel(`${autoIcon} ${customRole}`);
    localStorage.setItem("userRoleCustom", customRole);
    localStorage.setItem("userRoleIcon", autoIcon);
    setError("");
  };

  const handleContinue = () => {
    if (!selectedRole) {
      setError("Please select your role!");
      return;
    }
    localStorage.setItem("userRole", selectedRole);
    localStorage.setItem("userRoleLabel", selectedLabel);
    navigate("/onboarding/step3");
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.card}>

        {/* Progress */}
        <div style={styles.progressBox}>
          <div style={styles.progressTop}>
            <span style={styles.stepText}>Step 2 of 4</span>
            <span style={styles.stepPercent}>50%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressFill,
              width: "50%",
            }} />
          </div>
        </div>

        {/* Heading */}
        <h1 style={styles.title}>What do you do? 🎯</h1>
        <p style={styles.desc}>
          Select your role — AI will personalize
          your stress tracking experience
        </p>

        {/* Selected Badge */}
        {selectedRole && (
          <div style={styles.selectedBadge}>
            <span>✅ {selectedLabel}</span>
            <button
              style={styles.changeBtn}
              onClick={() => {
                setSelectedRole("");
                setSelectedLabel("");
                setSearch("");
                setCustomRole("");
              }}
            >
              ✕ Change
            </button>
          </div>
        )}

        {/* Search */}
        <div style={styles.searchBox}>
          <span>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setError("");
            }}
            placeholder="Search role... (Pilot, Singer, Chef...)"
            style={styles.searchInput}
          />
          {search && (
            <button
              style={styles.clearBtn}
              onClick={() => setSearch("")}
            >✕</button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>⚠️ {error}</div>
        )}

        {/* No Results */}
        {noResults && (
          <div style={styles.customBox}>
            <p style={styles.customTitle}>
              😕 "{search}" not found in our list
            </p>
            <p style={styles.customDesc}>
              No worries! Type your role below —
              AI will auto assign icon and
              personalize for you!
            </p>
            <div style={styles.customRow}>
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder={`e.g. ${search}`}
                style={styles.customInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUseCustom();
                }}
              />
              <button
                style={styles.useBtn}
                onClick={handleUseCustom}
              >
                Use This →
              </button>
            </div>
            {customRole && (
              <div style={styles.iconPreview}>
                Auto icon: {getAutoIcon(customRole)} {customRole}
              </div>
            )}
          </div>
        )}

        {/* Popular Roles */}
        {!search && (
          <>
            <div style={styles.sectionLabel}>
              ⭐ Popular Roles
            </div>
            <div style={styles.rolesGrid}>
              {popularRoles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  selected={selectedRole === role.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </>
        )}

        {/* Search Results */}
        {search && filteredRoles.length > 0 && (
          <>
            <div style={styles.sectionLabel}>
              🔍 Search Results
            </div>
            <div style={styles.rolesGrid}>
              {filteredRoles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  selected={selectedRole === role.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </>
        )}

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button
            style={styles.backBtn}
            onClick={() => navigate("/onboarding/step1")}
          >
            ← Back
          </button>
          <button
            style={{
              ...styles.continueBtn,
              opacity: !selectedRole ? 0.5 : 1,
            }}
            onClick={handleContinue}
            disabled={!selectedRole}
          >
            Continue → Step 3
          </button>
        </div>

      </div>
    </div>
  );
};

const RoleCard = ({ role, selected, onSelect }) => (
  <div
    style={{
      ...cardStyles.card,
      borderColor: selected ? "#a78bfa" : "#1e1e2e",
      backgroundColor: selected ? "#a78bfa11" : "#1e1e2e",
      transform: selected ? "scale(1.04)" : "scale(1)",
    }}
    onClick={() => onSelect(role)}
  >
    {selected && (
      <div style={cardStyles.check}>✓</div>
    )}
    <div style={cardStyles.icon}>{role.icon}</div>
    <div style={{
      ...cardStyles.title,
      color: selected ? "#a78bfa" : "#f1f5f9",
    }}>
      {role.title}
    </div>
  </div>
);

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
    maxWidth: "600px",
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
    marginBottom: "24px",
    lineHeight: "1.6",
  },
  selectedBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#a78bfa22",
    border: "1px solid #a78bfa44",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "14px",
    color: "#a78bfa",
    fontWeight: "600",
    marginBottom: "16px",
  },
  changeBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e3e",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "16px",
  },
  searchInput: {
    flex: 1,
    background: "none",
    border: "none",
    color: "#f1f5f9",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "14px",
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
  customBox: {
    backgroundColor: "#1e1e2e",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "16px",
  },
  customTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "6px",
  },
  customDesc: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "14px",
    lineHeight: "1.5",
  },
  customRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  customInput: {
    flex: 1,
    backgroundColor: "#0f0f1a",
    border: "1px solid #a78bfa44",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#f1f5f9",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
  },
  useBtn: {
    backgroundColor: "#a78bfa",
    border: "none",
    borderRadius: "10px",
    padding: "12px 20px",
    color: "#0f0f1a",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  iconPreview: {
    fontSize: "13px",
    color: "#a78bfa",
    backgroundColor: "#a78bfa11",
    padding: "8px 14px",
    borderRadius: "8px",
    display: "inline-block",
  },
  sectionLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "12px",
  },
  rolesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "24px",
  },
  btnRow: {
    display: "flex",
    gap: "16px",
  },
  backBtn: {
    flex: 1,
    backgroundColor: "transparent",
    border: "1px solid #1e1e2e",
    color: "#64748b",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  continueBtn: {
    flex: 2,
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

const cardStyles = {
  card: {
    border: "1px solid",
    borderRadius: "12px",
    padding: "16px 12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
    textAlign: "center",
  },
  check: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#a78bfa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    color: "#0f0f1a",
    fontWeight: "700",
  },
  icon: {
    fontSize: "28px",
    marginBottom: "8px",
  },
  title: {
    fontSize: "12px",
    fontWeight: "600",
    lineHeight: "1.4",
  },
};

export default Step2Role;