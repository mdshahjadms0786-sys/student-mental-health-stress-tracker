import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "College Student, Delhi",
    avatar: "PS",
    color: "#a78bfa",
    rating: 5,
    text: "StressTrack literally changed my life during exam season. The face scanner detected my stress before I even realized I was stressed. The breathing exercises helped me calm down instantly before my finals.",
  },
  {
    name: "Rahul Verma",
    role: "Software Engineer, Bangalore",
    avatar: "RV",
    color: "#818cf8",
    rating: 5,
    text: "As a developer, I work under constant deadline pressure. StressTrack's voice analysis is spot on — it detects stress in my voice even when I think I am fine. The weekly reports helped me identify my burnout patterns.",
  },
  {
    name: "Sunita Patel",
    role: "Homemaker, Mumbai",
    avatar: "SP",
    color: "#c084fc",
    rating: 5,
    text: "I never thought an app would understand my stress as a homemaker. The AI chatbot feels like talking to a real therapist. It helped me realize that my mental health matters just as much as my family's.",
  },
  {
    name: "Arjun Mehta",
    role: "School Student, Pune",
    avatar: "AM",
    color: "#a78bfa",
    rating: 5,
    text: "I used to get panic attacks before exams. StressTrack's text analysis helped me understand what was triggering my anxiety. Now I use the meditation timer every night and sleep so much better.",
  },
  {
    name: "Kavya Reddy",
    role: "Marketing Manager, Hyderabad",
    avatar: "KR",
    color: "#818cf8",
    rating: 5,
    text: "The dashboard is beautiful and the stress heatmap is eye opening. I can clearly see that my stress spikes every Monday. StressTrack helped me restructure my week and now I actually enjoy Mondays!",
  },
  {
    name: "Mohammed Iqbal",
    role: "Teacher, Chennai",
    avatar: "MI",
    color: "#c084fc",
    rating: 5,
    text: "Teaching 40 students every day is exhausting. StressTrack's personalized tips are amazing — the music therapy suggestions are so accurate. I recommended it to all my colleagues and students.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => {
    setAutoPlay(false);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setAutoPlay(false);
    setCurrent((p) => (p + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" style={styles.section}>

      {/* Heading */}
      <div style={styles.headingBox}>
        <div style={styles.badge}>✦ Real Stories</div>
        <h2 style={styles.heading}>What Our Users Say</h2>
        <p style={styles.sub}>
          Real people, real results — see how StressTrack changed their lives
        </p>
      </div>

      {/* Stars Row */}
      <div style={styles.starsRow}>
        <div style={styles.starsBadge}>
          ⭐⭐⭐⭐⭐ &nbsp; Rated 4.9/5 by 10,000+ users
        </div>
      </div>

      {/* Main Carousel */}
      <div style={styles.carouselWrapper}>

        {/* Prev Button */}
        <button style={styles.arrowBtn} onClick={prev}>‹</button>

        {/* Cards */}
        <div style={styles.cardsRow}>
          {[-1, 0, 1].map((offset) => {
            const index =
              (current + offset + testimonials.length) % testimonials.length;
            const isCenter = offset === 0;
            const t = testimonials[index];

            return (
              <div
                key={index}
                style={{
                  ...styles.card,
                  transform: isCenter ? "scale(1.05)" : "scale(0.92)",
                  opacity: isCenter ? 1 : 0.5,
                  borderColor: isCenter ? t.color + "66" : "#1e1e2e",
                  backgroundColor: isCenter ? "#13131f" : "#0f0f1a",
                  zIndex: isCenter ? 2 : 1,
                }}
              >
                {/* Quote */}
                <div style={styles.quote}>"</div>

                {/* Rating */}
                <div style={styles.rating}>
                  {"⭐".repeat(t.rating)}
                </div>

                {/* Text */}
                <p style={styles.text}>{t.text}</p>

                {/* Author */}
                <div style={styles.author}>
                  <div style={{
                    ...styles.avatar,
                    backgroundColor: t.color + "22",
                    color: t.color,
                    border: `1px solid ${t.color}44`,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={styles.name}>{t.name}</div>
                    <div style={styles.role}>{t.role}</div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button style={styles.arrowBtn} onClick={next}>›</button>

      </div>

      {/* Dots */}
      <div style={styles.dotsRow}>
        {testimonials.map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.dot,
              backgroundColor: current === i ? "#a78bfa" : "#1e1e2e",
              width: current === i ? "32px" : "10px",
            }}
            onClick={() => { setAutoPlay(false); setCurrent(i); }}
          />
        ))}
      </div>

    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#0a0a14",
    padding: "100px 40px",
  },
  headingBox: {
    textAlign: "center",
    marginBottom: "24px",
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
  starsRow: {
    textAlign: "center",
    marginBottom: "48px",
  },
  starsBadge: {
    display: "inline-block",
    backgroundColor: "#1e1e2e",
    color: "#f1f5f9",
    padding: "10px 24px",
    borderRadius: "100px",
    fontSize: "14px",
    border: "1px solid #a78bfa44",
  },
  carouselWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  arrowBtn: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #a78bfa44",
    color: "#a78bfa",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    fontSize: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: "inherit",
  },
  cardsRow: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    maxWidth: "900px",
    overflow: "hidden",
  },
  card: {
    flex: "0 0 320px",
    backgroundColor: "#13131f",
    border: "1px solid",
    borderRadius: "20px",
    padding: "32px",
    transition: "all 0.4s ease",
    position: "relative",
  },
  quote: {
    fontSize: "60px",
    color: "#a78bfa",
    lineHeight: "0.8",
    marginBottom: "12px",
    fontFamily: "Georgia, serif",
  },
  rating: {
    fontSize: "14px",
    marginBottom: "16px",
  },
  text: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: "1.8",
    marginBottom: "24px",
  },
  author: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    flexShrink: 0,
  },
  name: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#f1f5f9",
  },
  role: {
    fontSize: "12px",
    color: "#64748b",
  },
  dotsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
  dot: {
    height: "10px",
    borderRadius: "100px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default Testimonials;