import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" style={styles.section}>

      {/* Heading */}
      <div style={styles.headingBox}>
        <div style={styles.badge}>✦ Get In Touch</div>
        <h2 style={styles.heading}>Contact Us</h2>
        <p style={styles.sub}>
          Have a question or feedback? We would love to hear from you!
        </p>
      </div>

      <div style={styles.wrapper}>

        {/* Left — Info */}
        <div style={styles.infoBox}>

          <h3 style={styles.infoTitle}>We are here to help</h3>
          <p style={styles.infoDesc}>
            Whether you have a question about features, pricing, need a demo or
            anything else — our team is ready to answer all your questions.
          </p>

          <div style={styles.infoItems}>

            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>📧</div>
              <div>
                <div style={styles.infoLabel}>Email Us</div>
                <div style={styles.infoValue}>support@stresstrack.in</div>
              </div>
            </div>

            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>💬</div>
              <div>
                <div style={styles.infoLabel}>Live Chat</div>
                <div style={styles.infoValue}>Available 9am - 9pm IST</div>
              </div>
            </div>

            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>📱</div>
              <div>
                <div style={styles.infoLabel}>Social Media</div>
                <div style={styles.infoValue}>@StressTrackApp</div>
              </div>
            </div>

            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>⚡</div>
              <div>
                <div style={styles.infoLabel}>Response Time</div>
                <div style={styles.infoValue}>Within 24 hours</div>
              </div>
            </div>

          </div>

          {/* FAQ */}
          <div style={styles.faqBox}>
            <div style={styles.faqTitle}>Quick FAQs</div>
            <div style={styles.faqItem}>
              <span style={styles.faqQ}>Is StressTrack free?</span>
              <span style={styles.faqA}>Yes! Basic features are free forever.</span>
            </div>
            <div style={styles.faqItem}>
              <span style={styles.faqQ}>Is my data private?</span>
              <span style={styles.faqA}>100% private — we never share your data.</span>
            </div>
            <div style={styles.faqItem}>
              <span style={styles.faqQ}>Does face scan store my photos?</span>
              <span style={styles.faqA}>No — analysis happens live, nothing is saved.</span>
            </div>
          </div>

        </div>

        {/* Right — Form */}
        <div style={styles.formBox}>

          {submitted ? (
            <div style={styles.successBox}>
              <div style={styles.successIcon}>✅</div>
              <h3 style={styles.successTitle}>Message Sent!</h3>
              <p style={styles.successDesc}>
                Thank you for reaching out. We will get back to you within 24 hours!
              </p>
              <button
                style={styles.resetBtn}
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>

              <div style={styles.formTitle}>Send us a message</div>

              {/* Name + Email */}
              <div style={styles.row}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Your Name</label>
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
              </div>

              {/* Subject */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                  rows={5}
                  style={{ ...styles.input, resize: "vertical" }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  ...styles.submitBtn,
                  opacity: loading ? 0.7 : 1,
                }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>

            </form>
          )}

        </div>

      </div>

    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#0f0f1a",
    padding: "100px 40px",
  },
  headingBox: {
    textAlign: "center",
    marginBottom: "60px",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#1e1e2e",
    color: "#a78bfa",
    padding: "8px 20px",
    borderRadius: "100px",
    fontSize: "13px",
    marginBottom: "16px",
    border: "1px solid #a78bfa44",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "16px",
  },
  sub: {
    fontSize: "16px",
    color: "#64748b",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: "1.7",
  },
  wrapper: {
    display: "flex",
    gap: "40px",
    maxWidth: "1000px",
    margin: "0 auto",
    alignItems: "flex-start",
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "20px",
    padding: "40px",
  },
  infoTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "12px",
  },
  infoDesc: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.7",
    marginBottom: "32px",
  },
  infoItems: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "32px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  infoIcon: {
    fontSize: "24px",
    width: "44px",
    height: "44px",
    backgroundColor: "#1e1e2e",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "2px",
  },
  infoValue: {
    fontSize: "14px",
    color: "#cbd5e1",
    fontWeight: "600",
  },
  faqBox: {
    backgroundColor: "#1e1e2e",
    borderRadius: "12px",
    padding: "20px",
  },
  faqTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#a78bfa",
    marginBottom: "16px",
  },
  faqItem: {
    marginBottom: "12px",
    fontSize: "13px",
    lineHeight: "1.6",
  },
  faqQ: {
    color: "#cbd5e1",
    fontWeight: "600",
    display: "block",
  },
  faqA: {
    color: "#64748b",
    display: "block",
  },
  formBox: {
    flex: 1,
    backgroundColor: "#13131f",
    border: "1px solid #1e1e2e",
    borderRadius: "20px",
    padding: "40px",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "24px",
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
  submitBtn: {
    backgroundColor: "#a78bfa",
    color: "#0f0f1a",
    border: "none",
    padding: "14px 32px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  successBox: {
    textAlign: "center",
    padding: "40px 20px",
  },
  successIcon: {
    fontSize: "56px",
    marginBottom: "16px",
  },
  successTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "12px",
  },
  successDesc: {
    fontSize: "15px",
    color: "#64748b",
    lineHeight: "1.7",
    marginBottom: "24px",
  },
  resetBtn: {
    backgroundColor: "transparent",
    border: "1px solid #a78bfa",
    color: "#a78bfa",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default ContactForm;