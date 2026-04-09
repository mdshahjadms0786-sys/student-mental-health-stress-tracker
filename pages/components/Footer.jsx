import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={styles.footer}>

      {/* Top CTA Banner */}
      <div style={styles.ctaBanner}>
        <div style={styles.ctaContent}>
          <h3 style={styles.ctaTitle}>
            Ready to Take Control of Your Stress?
          </h3>
          <p style={styles.ctaDesc}>
            Join 10,000+ people who are living stress-free with StressTrack
          </p>
        </div>
        <Link to="/signup" style={styles.ctaBtn}>
          Start For Free — No Credit Card Needed →
        </Link>
      </div>

      {/* Main Footer */}
      <div style={styles.mainFooter}>

        {/* Brand Column */}
        <div style={styles.brandCol}>
          <div style={styles.logo}>🧠 StressTrack</div>
          <p style={styles.brandDesc}>
            AI powered stress detection for everyone. Understand your stress,
            transform your life.
          </p>
          {/* Social Links */}
          <div style={styles.socialRow}>
            <a href="https://twitter.com" target="_blank"
              rel="noreferrer" style={styles.socialBtn}>𝕏</a>
            <a href="https://instagram.com" target="_blank"
              rel="noreferrer" style={styles.socialBtn}>📸</a>
            <a href="https://linkedin.com" target="_blank"
              rel="noreferrer" style={styles.socialBtn}>in</a>
            <a href="https://youtube.com" target="_blank"
              rel="noreferrer" style={styles.socialBtn}>▶</a>
          </div>
        </div>

        {/* Product Links */}
        <div style={styles.linkCol}>
          <div style={styles.colTitle}>Product</div>
          <button style={styles.footerLink}
            onClick={() => scrollTo("features")}>
            Features
          </button>
          <button style={styles.footerLink}
            onClick={() => scrollTo("howitworks")}>
            How It Works
          </button>
          <button style={styles.footerLink}
            onClick={() => scrollTo("whofor")}>
            Who Is It For
          </button>
          <button style={styles.footerLink}
            onClick={() => scrollTo("testimonials")}>
            Testimonials
          </button>
          <Link to="/signup" style={styles.footerLinkA}>
            Get Started Free
          </Link>
        </div>

        {/* Features Links */}
        <div style={styles.linkCol}>
          <div style={styles.colTitle}>Features</div>
          <span style={styles.footerLink}>Text Analysis</span>
          <span style={styles.footerLink}>Voice Analysis</span>
          <span style={styles.footerLink}>Face Scanner</span>
          <span style={styles.footerLink}>AI Chatbot</span>
          <span style={styles.footerLink}>Dashboard</span>
          <span style={styles.footerLink}>PDF Reports</span>
        </div>

        {/* Company Links */}
        <div style={styles.linkCol}>
          <div style={styles.colTitle}>Company</div>
          <span style={styles.footerLink}>About Us</span>
          <span style={styles.footerLink}>Blog</span>
          <span style={styles.footerLink}>Careers</span>
          <button style={styles.footerLink}
            onClick={() => scrollTo("contact")}>
            Contact
          </button>
          <span style={styles.footerLink}>Press Kit</span>
        </div>

        {/* Support Links */}
        <div style={styles.linkCol}>
          <div style={styles.colTitle}>Support</div>
          <span style={styles.footerLink}>Help Center</span>
          <span style={styles.footerLink}>Privacy Policy</span>
          <span style={styles.footerLink}>Terms of Service</span>
          <span style={styles.footerLink}>Cookie Policy</span>
          <span style={styles.footerLink}>Sitemap</span>
        </div>

      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.copyright}>
          © 2026 StressTrack. All rights reserved. Made with ❤️ in India
        </div>
        <div style={styles.bottomLinks}>
          <span style={styles.bottomLink}>Privacy Policy</span>
          <span style={styles.dot}>·</span>
          <span style={styles.bottomLink}>Terms of Service</span>
          <span style={styles.dot}>·</span>
          <span style={styles.bottomLink}>Cookies</span>
        </div>
        <div style={styles.langBadge}>
          🌐 18 Languages Supported
        </div>
      </div>

    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#0a0a14",
    borderTop: "1px solid #1e1e2e",
  },
  ctaBanner: {
    background: "linear-gradient(135deg, #1e1e2e 0%, #13131f 100%)",
    borderBottom: "1px solid #a78bfa22",
    padding: "60px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "40px",
    flexWrap: "wrap",
  },
  ctaContent: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "8px",
  },
  ctaDesc: {
    fontSize: "15px",
    color: "#64748b",
  },
  ctaBtn: {
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    textDecoration: "none",
    padding: "16px 32px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "15px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  mainFooter: {
    display: "flex",
    gap: "40px",
    padding: "60px 40px",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  brandCol: {
    flex: "0 0 240px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#a78bfa",
    marginBottom: "16px",
  },
  brandDesc: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.7",
    marginBottom: "24px",
  },
  socialRow: {
    display: "flex",
    gap: "10px",
  },
  socialBtn: {
    width: "36px",
    height: "36px",
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e3e",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a78bfa",
    fontSize: "14px",
    fontWeight: "700",
    textDecoration: "none",
    cursor: "pointer",
  },
  linkCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: "120px",
  },
  colTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#f1f5f9",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  footerLink: {
    fontSize: "14px",
    color: "#64748b",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    transition: "color 0.2s",
  },
  footerLinkA: {
    fontSize: "14px",
    color: "#a78bfa",
    textDecoration: "none",
    fontWeight: "600",
  },
  divider: {
    height: "1px",
    backgroundColor: "#1e1e2e",
    margin: "0 40px",
  },
  bottomBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 40px",
    flexWrap: "wrap",
    gap: "16px",
  },
  copyright: {
    fontSize: "13px",
    color: "#64748b",
  },
  bottomLinks: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  bottomLink: {
    fontSize: "13px",
    color: "#64748b",
    cursor: "pointer",
  },
  dot: {
    color: "#64748b",
    fontSize: "13px",
  },
  langBadge: {
    fontSize: "13px",
    color: "#a78bfa",
    backgroundColor: "#1e1e2e",
    padding: "6px 14px",
    borderRadius: "100px",
    border: "1px solid #a78bfa44",
  },
};

export default Footer;