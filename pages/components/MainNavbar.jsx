import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ko", name: "Korean" },
  { code: "ur", name: "Urdu" },
];

function scrollTo(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function MainNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentLang, changeLanguage } = useLanguage();
  const selectedLanguage =
    LANGUAGES.find((language) => language.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        ...styles.nav,
        backgroundColor: scrolled ? "rgba(15,15,26,0.97)" : "#0f0f1a",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div style={styles.logo}>StressTrack</div>

      <ul style={styles.menu}>
        <li>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <button style={styles.navBtn} onClick={() => scrollTo("features")}>
            Features
          </button>
        </li>
        <li>
          <button style={styles.navBtn} onClick={() => scrollTo("howitworks")}>
            How It Works
          </button>
        </li>
        <li>
          <button style={styles.navBtn} onClick={() => scrollTo("whofor")}>
            Who Is It For
          </button>
        </li>
        <li>
          <button style={styles.navBtn} onClick={() => scrollTo("testimonials")}>
            Testimonials
          </button>
        </li>
        <li>
          <button style={styles.navBtn} onClick={() => scrollTo("contact")}>
            Contact
          </button>
        </li>
      </ul>

      <div style={styles.rightSide}>
        <div style={styles.languageWrap}>
          <button type="button" style={styles.langBtn} onClick={() => setLangOpen((open) => !open)}>
            {selectedLanguage.name}
          </button>

          {langOpen && (
            <div style={styles.dropdown}>
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  style={{
                    ...styles.dropdownItem,
                    backgroundColor:
                      selectedLanguage.code === language.code ? "#1e1e2e" : "transparent",
                    color: selectedLanguage.code === language.code ? "#a78bfa" : "#cbd5e1",
                  }}
                  onClick={() => {
                    changeLanguage(language.code);
                    setLangOpen(false);
                  }}
                >
                  {language.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link to="/login" style={styles.loginBtn}>
          Login
        </Link>
        <Link to="/signup" style={styles.signupBtn}>
          Get Started
        </Link>
      </div>

      <button type="button" style={styles.hamburger} onClick={() => setMenuOpen((open) => !open)}>
        Menu
      </button>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <button
            type="button"
            style={styles.mobileLinkBtn}
            onClick={() => {
              scrollTo("features");
              setMenuOpen(false);
            }}
          >
            Features
          </button>
          <button
            type="button"
            style={styles.mobileLinkBtn}
            onClick={() => {
              scrollTo("howitworks");
              setMenuOpen(false);
            }}
          >
            How It Works
          </button>
          <button
            type="button"
            style={styles.mobileLinkBtn}
            onClick={() => {
              scrollTo("whofor");
              setMenuOpen(false);
            }}
          >
            Who Is It For
          </button>
          <button
            type="button"
            style={styles.mobileLinkBtn}
            onClick={() => {
              scrollTo("testimonials");
              setMenuOpen(false);
            }}
          >
            Testimonials
          </button>
          <button
            type="button"
            style={styles.mobileLinkBtn}
            onClick={() => {
              scrollTo("contact");
              setMenuOpen(false);
            }}
          >
            Contact
          </button>
          <Link to="/login" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link to="/signup" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>

          <div style={styles.mobileLangTitle}>Select Language</div>
          <div style={styles.mobileLangGrid}>
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                style={{
                  ...styles.mobileLangBtn,
                  borderColor:
                    selectedLanguage.code === language.code ? "#a78bfa" : "#1e1e2e",
                  color: selectedLanguage.code === language.code ? "#a78bfa" : "#cbd5e1",
                }}
                onClick={() => {
                  changeLanguage(language.code);
                  setMenuOpen(false);
                }}
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

const styles = {
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
  languageWrap: {
    position: "relative",
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
    width: "180px",
    maxHeight: "280px",
    overflowY: "auto",
    zIndex: 2000,
    padding: "6px",
  },
  dropdownItem: {
    width: "100%",
    padding: "10px 12px",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: "inherit",
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
    fontSize: "14px",
    color: "#a78bfa",
    background: "none",
    border: "1px solid #a78bfa44",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    fontFamily: "inherit",
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
  mobileLangBtn: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #1e1e2e",
    borderRadius: "8px",
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "inherit",
  },
};

export default MainNavbar;
