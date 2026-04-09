import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", flag: "🇮🇳" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
];

function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentLang: currentLangCode, changeLanguage } = useLanguage();
  const currentLang =
    LANGUAGES.find((lang) => lang.code === currentLangCode) || LANGUAGES[0];
  const selectedLanguage = currentLang;
  const setCurrentLang = (lang) => changeLanguage(lang.code);

  React.useEffect(function() {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return function() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav style={{
      ...styles.nav,
      backgroundColor: scrolled ? "rgba(15,15,26,0.97)" : "#0f0f1a",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
    }}>

      {/* Logo */}
      <div style={styles.logo}>🧠 StressTrack</div>

      {/* Desktop Menu */}
      <ul style={styles.menu}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li>
          <button style={styles.navBtn}
            onClick={function() { scrollTo("features"); }}>
            Features
          </button>
        </li>
        <li>
          <button style={styles.navBtn}
            onClick={function() { scrollTo("howitworks"); }}>
            How It Works
          </button>
        </li>
        <li>
          <button style={styles.navBtn}
            onClick={function() { scrollTo("whofor"); }}>
            Who Is It For
          </button>
        </li>
        <li>
          <button style={styles.navBtn}
            onClick={function() { scrollTo("testimonials"); }}>
            Testimonials
          </button>
        </li>
        <li>
          <button style={styles.navBtn}
            onClick={function() { scrollTo("contact"); }}>
            Contact
          </button>
        </li>
      </ul>

      {/* Right Side — Language + Buttons */}
      <div style={styles.rightSide}>

        {/* Language Selector */}
        <div style={{ position: "relative" }}>
          <button style={styles.langBtn}
            onClick={function() { setLangOpen(!langOpen); }}>
            {currentLang.flag} {currentLang.name} ▾
          </button>

          {langOpen && (
            <div style={styles.dropdown}>
              {LANGUAGES.map(function(lang) {
                return (
                  <div key={lang.code}
                    style={{
                      padding: "10px 16px",
                      color: "#cbd5e1",
                      fontSize: "13px",
                      cursor: "pointer",
                      background: currentLang.code === lang.code
                        ? "#1e1e2e" : "transparent",
                    }}
                    onClick={function() {
                      setCurrentLang(lang);
                      setLangOpen(false);
                    }}>
                    {lang.flag} {lang.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Link to="/login" style={styles.loginBtn}>Login</Link>
        <Link to="/signup" style={styles.signupBtn}>Get Started</Link>
      </div>

      {/* Mobile Hamburger */}
      <div style={styles.hamburger}
        onClick={function() { setMenuOpen(!menuOpen); }}>
        ☰
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>

          <Link to="/" style={styles.mobileLink}
            onClick={function() { setMenuOpen(false); }}>
            Home
          </Link>

          <button style={styles.mobileLinkBtn}
            onClick={function() { scrollTo("features"); setMenuOpen(false); }}>
            Features
          </button>

          <button style={styles.mobileLinkBtn}
            onClick={function() { scrollTo("howitworks"); setMenuOpen(false); }}>
            How It Works
          </button>

          <button style={styles.mobileLinkBtn}
            onClick={function() { scrollTo("whofor"); setMenuOpen(false); }}>
            Who Is It For
          </button>

          <button style={styles.mobileLinkBtn}
            onClick={function() { scrollTo("testimonials"); setMenuOpen(false); }}>
            Testimonials
          </button>

          <button style={styles.mobileLinkBtn}
            onClick={function() { scrollTo("contact"); setMenuOpen(false); }}>
            Contact
          </button>

          <Link to="/login" style={styles.mobileLink}
            onClick={function() { setMenuOpen(false); }}>
            Login
          </Link>

          <Link to="/signup" style={styles.mobileLink}
            onClick={function() { setMenuOpen(false); }}>
            Get Started
          </Link>

          {/* Mobile Language Grid */}
          <div style={styles.mobileLangTitle}>🌐 Select Language</div>
          <div style={styles.mobileLangGrid}>
            {LANGUAGES.map(function(lang) {
              return (
                <div key={lang.code}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    color: "#cbd5e1",
                    fontSize: "12px",
                    cursor: "pointer",
                    backgroundColor: "#1e1e2e",
                    border: currentLang.code === lang.code
                      ? "1px solid #a78bfa"
                      : "1px solid #1e1e2e",
                  }}
                  onClick={function() {
                    setCurrentLang(lang);
                    setMenuOpen(false);
                  }}>
                  {lang.flag} {lang.name}
                </div>
              );
            })}
          </div>

        </div>
      )}

    </nav>
  );
}

var styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid #1e1e2e",
    transition: "all 0.3s ease",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#a78bfa",
    cursor: "pointer",
  },
  menu: {
    display: "flex",
    gap: "24px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  navBtn: {
    background: "none",
    border: "none",
    color: "#cbd5e1",
    fontSize: "15px",
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "15px",
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  langBtn: {
    backgroundColor: "#1e1e2e",
    color: "#a78bfa",
    border: "1px solid #a78bfa44",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "inherit",
  },
  dropdown: {
    position: "absolute",
    top: "44px",
    right: 0,
    backgroundColor: "#0f0f1a",
    border: "1px solid #1e1e2e",
    borderRadius: "10px",
    width: "160px",
    maxHeight: "280px",
    overflowY: "auto",
    zIndex: 2000,
  },
  loginBtn: {
    color: "#a78bfa",
    textDecoration: "none",
    fontSize: "15px",
    padding: "8px 20px",
    border: "1px solid #a78bfa",
    borderRadius: "8px",
  },
  signupBtn: {
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    textDecoration: "none",
    fontSize: "15px",
    padding: "8px 20px",
    borderRadius: "8px",
    fontWeight: "600",
  },
  hamburger: {
    display: "none",
    fontSize: "24px",
    color: "#a78bfa",
    cursor: "pointer",
  },
  mobileMenu: {
    position: "absolute",
    top: "65px",
    left: 0,
    right: 0,
    backgroundColor: "#0f0f1a",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "16px",
    borderBottom: "1px solid #1e1e2e",
    zIndex: 999,
  },
  mobileLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "16px",
  },
  mobileLinkBtn: {
    background: "none",
    border: "none",
    color: "#cbd5e1",
    fontSize: "16px",
    cursor: "pointer",
    padding: 0,
    textAlign: "left",
    fontFamily: "inherit",
  },
  mobileLangTitle: {
    color: "#64748b",
    fontSize: "13px",
    marginTop: "8px",
  },
  mobileLangGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
};

export default Navbar;
