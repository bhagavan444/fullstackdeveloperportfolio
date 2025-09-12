import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter, FaStar } from "react-icons/fa";
import { FiX, FiSend } from "react-icons/fi";

// Custom Debounce Function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Starfield Component (from Resume.jsx)
const Starfield = ({ starCount = 120 }) => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
      {[...Array(starCount)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 2 + 1;
        return (
          <motion.div
            key={`star-${i}`}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: size,
              height: size,
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 0.5] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 3,
            }}
          />
        );
      })}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`comet-${i}`}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          }}
          initial={{ x: "100%", y: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{
            x: "-100%",
            opacity: [0, 1, 0],
            transition: { duration: 3 + i * 0.5, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}
    </div>
  );
};

// Button Shine Component (from Resume.jsx)
const ButtonShine = ({ isActive }) => (
  <motion.div
    style={{
      position: "absolute",
      top: 0,
      left: "-150%",
      width: "200%",
      height: "100%",
      background: "linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)",
      transform: "skewX(-25deg)",
    }}
    animate={{ left: isActive ? "150%" : "-150%" }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  />
);

// Styles (aligned with Resume.jsx)
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "clamp(2rem, 5vw, 5rem) clamp(1rem, 2vw, 3rem)",
    background: "linear-gradient(135deg, #050214, #1a0033, #2a0055)",
    backgroundSize: "200% 200%",
    animation: "bgShift 10s ease infinite",
    color: "#e0e7ff",
    overflow: "hidden",
    position: "relative",
    perspective: "1200px",
  },
  card: {
    background: "rgba(12, 5, 32, 0.6)",
    backdropFilter: "blur(20px) saturate(180%)",
    width: "clamp(300px, 90vw, 900px)",
    borderRadius: "24px",
    padding: "clamp(2rem, 4vw, 4rem)",
    textAlign: "center",
    position: "relative",
    transformStyle: "preserve-3d",
    border: "1px solid rgba(124, 58, 237, 0.2)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
  },
  cardGlow: {
    position: "absolute",
    inset: 0,
    borderRadius: "24px",
    padding: "2px",
    background: "linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(91, 33, 182, 0.2))",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
    animation: "holographicPulse 2s infinite alternate",
  },
  title: {
    fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
    fontWeight: "900",
    marginBottom: "clamp(1rem, 2vw, 1.5rem)",
    color: "transparent",
    background: "linear-gradient(90deg, #a78bfa, #c4b5fd, #ffffff)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    textShadow: "0 0 30px rgba(167, 139, 250, 0.6)",
  },
  description: {
    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
    color: "#d1d5db",
    maxWidth: "700px",
    margin: "0 auto clamp(2rem, 4vw, 3rem)",
    lineHeight: 1.8,
    textShadow: "0 0 10px rgba(167, 139, 250, 0.3)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(0.8rem, 1.8vw, 1.2rem)",
    width: "100%",
    maxWidth: "clamp(400px, 75vw, 500px)",
    margin: "0 auto",
  },
  input: {
    padding: "clamp(0.8rem, 1.5vw, 1.2rem)",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    border: "1px solid rgba(124, 58, 237, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#e0e7ff",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "inset 0 0 5px rgba(124, 58, 237, 0.2)",
  },
  textarea: {
    padding: "clamp(0.8rem, 1.5vw, 1.2rem)",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    border: "1px solid rgba(124, 58, 237, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#e0e7ff",
    outline: "none",
    minHeight: "clamp(100px, 20vw, 140px)",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "inset 0 0 5px rgba(124, 58, 237, 0.2)",
  },
  button: {
    padding: "clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.5rem, 2.5vw, 2.5rem)",
    border: "none",
    borderRadius: "50px",
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(90deg, #7c3aed, #00c6ff)",
    boxShadow: "0 0 10px rgba(124, 58, 237, 0.4)",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  resetButton: {
    padding: "clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.5rem, 2.5vw, 2.5rem)",
    border: "none",
    borderRadius: "50px",
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    position: "relative",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 0 10px rgba(124, 58, 237, 0.4)",
  },
  buttonGlow: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "200%",
    height: "100%",
    background: "linear-gradient(90deg, rgba(0, 198, 255, 0.3), rgba(124, 58, 237, 0.3), transparent)",
    transform: "skewX(-30deg)",
    animation: "shinePulse 1.5s infinite",
  },
  socialContainer: {
    display: "flex",
    gap: "clamp(1rem, 3vw, 2rem)",
    justifyContent: "center",
    marginTop: "clamp(1rem, 2.5vw, 1.5rem)",
  },
  socialIcon: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    color: "#fff",
    transition: "transform 0.3s ease, color 0.3s ease",
    position: "relative",
  },
  tooltip: {
    position: "absolute",
    top: "-clamp(2rem, 4vw, 2.5rem)",
    background: "rgba(12, 5, 32, 0.95)",
    color: "#e0e7ff",
    padding: "clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.6rem, 1.2vw, 0.8rem)",
    borderRadius: "clamp(6px, 1vw, 8px)",
    fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
    boxShadow: "0 0 10px rgba(124, 58, 237, 0.4)",
    zIndex: 10,
    whiteSpace: "nowrap",
  },
  feedback: {
    marginTop: "clamp(0.8rem, 1.8vw, 1.2rem)",
    padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)",
    background: "rgba(124, 58, 237, 0.2)",
    border: "1px solid rgba(124, 58, 237, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    color: "#e0e7ff",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    textAlign: "center",
  },
  error: {
    marginTop: "clamp(0.8rem, 1.8vw, 1.2rem)",
    padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)",
    background: "rgba(255, 85, 85, 0.2)",
    border: "1px solid rgba(255, 85, 85, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    color: "#ff5555",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    textAlign: "center",
  },
  charCounter: {
    fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
    color: "#e0e7ff",
    textAlign: "right",
    marginTop: "clamp(0.3rem, 0.8vw, 0.5rem)",
    textShadow: "0 0 10px rgba(124, 58, 237, 0.4)",
  },
  spinner: {
    display: "inline-block",
    width: "clamp(1rem, 2vw, 1.2rem)",
    height: "clamp(1rem, 2vw, 1.2rem)",
    border: "2px solid rgba(124, 58, 237, 0.3)",
    borderTop: "2px solid #7c3aed",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    marginRight: "clamp(0.3rem, 0.8vw, 0.5rem)",
  },
  responsive: {
    large: {
      container: { padding: "clamp(2rem, 5vw, 5rem) clamp(1rem, 2vw, 3rem)" },
      card: { padding: "clamp(2rem, 4vw, 4rem)", width: "clamp(300px, 90vw, 900px)" },
      title: { fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" },
      description: { fontSize: "clamp(1.1rem, 2vw, 1.3rem)", maxWidth: "700px" },
      input: { padding: "clamp(0.8rem, 1.5vw, 1.2rem)" },
      button: { padding: "clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.5rem, 2.5vw, 2.5rem)" },
    },
    medium: {
      container: { padding: "clamp(1.5rem, 4vw, 4rem) clamp(0.8rem, 1.8vw, 2rem)" },
      card: { padding: "clamp(1.8rem, 3vw, 3rem)", width: "clamp(280px, 85vw, 700px)" },
      title: { fontSize: "clamp(1.8rem, 4vw, 3rem)" },
      description: { fontSize: "clamp(1rem, 1.8vw, 1.2rem)", maxWidth: "600px" },
      input: { padding: "clamp(0.6rem, 1.2vw, 1rem)" },
      button: { padding: "clamp(0.6rem, 1.2vw, 1rem) clamp(1.2rem, 2vw, 2rem)" },
    },
    small: {
      container: { padding: "clamp(1rem, 3vw, 3rem) clamp(0.6rem, 1.5vw, 1.5rem)" },
      card: { padding: "clamp(1.5rem, 2.5vw, 2.5rem)", width: "clamp(260px, 90vw, 500px)" },
      title: { fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" },
      description: { fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)", maxWidth: "500px" },
      input: { padding: "clamp(0.5rem, 1vw, 0.8rem)" },
      button: { padding: "clamp(0.5rem, 1vw, 0.8rem) clamp(1rem, 1.8vw, 1.5rem)" },
    },
  },
};

// Animation Styles (aligned with Resume.jsx)
const animationStyles = `
  @keyframes bgShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 200% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.9; }
  }
  @keyframes shinePulse {
    0% { left: -150%; }
    100% { left: 150%; }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Animation Variants (aligned with Resume.jsx)
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 100 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 15 } },
  //hover: { rotateX: 5, rotateY: -5, transition: { duration: 0.3, ease: "easeOut" } },
};

const formChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } },
};

const feedbackVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// Social Links Data
const socialLinks = [
  { icon: <FaEnvelope />, link: "mailto:g.sivasatyasaibhagavan@gmail.com", label: "Email", key: "email" },
  { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/", label: "LinkedIn", key: "linkedin" },
  { icon: <FaGithub />, link: "https://github.com/bhagavan444", label: "GitHub", key: "github" },
  { icon: <FaTwitter />, link: "https://twitter.com/", label: "Twitter", key: "twitter" },
];

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maxMessageLength = 500;

  const backgroundGradient = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX + window.innerWidth / 2}px ${
        latestY + window.innerHeight / 2
      }px, rgba(0, 198, 255, 0.25), transparent 40%)`
  );

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  }, [mouseX, mouseY]);

  const handleResize = useCallback(
    debounce(() => setWindowWidth(window.innerWidth), 100),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const isValidGmail = useCallback((email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }, []);

  const handleMessageChange = useCallback((e) => {
    setMessageLength(e.target.value.length);
  }, []);

  const resetForm = useCallback(() => {
    form.current.reset();
    setIsSent(false);
    setEmailError("");
    setFormError("");
    setMessageLength(0);
  }, []);

  const sendEmail = useCallback(
    (e) => {
      e.preventDefault();
      const emailInput = form.current.user_email.value;
      const messageInput = form.current.message.value;

      if (!isValidGmail(emailInput)) {
        setEmailError("Please use a valid Gmail address (e.g., example@gmail.com)");
        return;
      }
      if (messageInput.length > maxMessageLength) {
        setFormError(`Message exceeds ${maxMessageLength} character limit`);
        return;
      }
      setEmailError("");
      setFormError("");
      setIsSubmitting(true);

      emailjs
        .sendForm("service_8pg8cek", "template_1ys1isn", form.current, "GOTwySQukEpQEuRa5")
        .then(() => {
          setIsSent(true);
          setIsSubmitting(false);
          resetForm();
        }, (error) => {
          setFormError(`Failed to send message: ${error.text || "Unknown error"}`);
          setIsSubmitting(false);
        });
    },
    [isValidGmail, resetForm]
  );

  const responsiveStyles = useMemo(
    () =>
      windowWidth <= 480
        ? styles.responsive.small
        : windowWidth <= 768
        ? styles.responsive.medium
        : styles.responsive.large,
    [windowWidth]
  );

  return (
    <motion.section
      style={{ ...styles.container, ...responsiveStyles.container }}
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.0 }}
      role="region"
      aria-label="Contact section"
    >
      <style>{animationStyles}</style>
      <Starfield />
      <motion.div style={{ position: "absolute", inset: 0, background: backgroundGradient }} />
      <motion.article
        style={{ ...styles.card, ...responsiveStyles.card }}
        variants={cardVariants}
        
      >
        <div style={styles.cardGlow} />
        <motion.h2
          style={{ ...styles.title, ...responsiveStyles.title }}
          variants={formChildVariants}
        >
          <FaStar style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)" }} />
          Connect With Me
        </motion.h2>
        <motion.p
          style={{ ...styles.description, ...responsiveStyles.description }}
          variants={formChildVariants}
        >
          I'm thrilled to connect with you! Whether it's a project idea, a question, or just a friendly chat, I'm all ears. Let's create something amazing together.
        </motion.p>
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          style={styles.form}
          variants={formChildVariants}
          role="form"
          aria-label="Contact form"
        >
          {[
            { type: "text", name: "user_name", placeholder: "Full Name", label: "Full Name" },
            { type: "email", name: "user_email", placeholder: "Email Address", label: "Email Address" },
          ].map((input) => (
            <motion.input
              key={input.name}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              required
              style={{
                ...styles.input,
                ...responsiveStyles.input,
                borderColor: emailError && input.name === "user_email" ? "#ff5555" : undefined,
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 15px rgba(124, 58, 237, 0.6)",
                borderColor: "#7c3aed",
              }}
              variants={formChildVariants}
              aria-label={input.label}
            />
          ))}
          {emailError && (
            <motion.p
              style={styles.error}
              variants={formChildVariants}
              role="alert"
            >
              {emailError}
            </motion.p>
          )}
          <motion.textarea
            name="message"
            placeholder="Your Message"
            required
            style={{
              ...styles.textarea,
              borderColor: messageLength > maxMessageLength ? "#ff5555" : undefined,
            }}
            whileFocus={{
              scale: 1.01,
              boxShadow: "0 0 15px rgba(124, 58, 237, 0.6)",
              borderColor: "#7c3aed",
            }}
            variants={formChildVariants}
            onChange={handleMessageChange}
            maxLength={maxMessageLength}
            aria-label="Message"
          />
          <motion.p
            style={{
              ...styles.charCounter,
              color: messageLength > maxMessageLength ? "#ff5555" : "#e0e7ff",
            }}
            variants={formChildVariants}
          >
            {messageLength}/{maxMessageLength} characters
          </motion.p>
          {formError && (
            <motion.p
              style={styles.error}
              variants={formChildVariants}
              role="alert"
            >
              {formError}
            </motion.p>
          )}
          <motion.div
            style={{ display: "flex", gap: "clamp(1rem, 3vw, 2rem)", flexWrap: "wrap", justifyContent: "center" }}
            variants={formChildVariants}
          >
            <motion.button
              type="submit"
              style={{
                ...styles.button,
                ...responsiveStyles.button,
                ...(isSubmitting ? styles.buttonDisabled : {}),
              }}
              whileHover={!isSubmitting ? { scale: 1.05, boxShadow: "0 0 15px #00c6ff" } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              variants={formChildVariants}
              disabled={isSubmitting}
              aria-label="Send message"
            >
              <motion.span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {isSubmitting ? (
                  <>
                    <span style={styles.spinner} />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend style={{ marginRight: "clamp(0.3rem, 0.8vw, 0.5rem)" }} />
                    Send Message
                  </>
                )}
              </motion.span>
              <div style={styles.buttonGlow} />
              <ButtonShine isActive={!isSubmitting} />
            </motion.button>
            <motion.button
              type="button"
              style={{
                ...styles.resetButton,
                ...responsiveStyles.button,
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00c6ff" }}
              whileTap={{ scale: 0.98 }}
              variants={formChildVariants}
              onClick={resetForm}
              aria-label="Reset form"
            >
              <motion.span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <FiX style={{ marginRight: "clamp(0.3rem, 0.8vw, 0.5rem)" }} />
                Reset Form
              </motion.span>
              <div style={styles.buttonGlow} />
              <ButtonShine isActive={true} />
            </motion.button>
          </motion.div>
        </motion.form>
        <motion.div
          style={{ ...styles.socialContainer, ...responsiveStyles.socialContainer }}
          variants={socialVariants}
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.key}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              style={styles.socialIcon}
              whileHover={{ scale: 1.2, boxShadow: "0 0 15px #00c6ff" }}
              whileTap={{ scale: 0.95 }}
              variants={socialVariants}
              aria-label={`Visit my ${social.label} profile`}
            >
              {social.icon}
              <motion.span
                style={styles.tooltip}
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {social.label}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
        <motion.p
          style={{ ...styles.description, ...responsiveStyles.description, marginTop: "clamp(1rem, 2.5vw, 1.5rem)" }}
          variants={formChildVariants}
        >
          Thanks for reaching out! I’m always eager to explore new opportunities and collaborations. Expect a reply soon!
        </motion.p>
        <AnimatePresence>
          {isSent && (
            <motion.div
              style={styles.feedback}
              variants={feedbackVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="alert"
            >
              ✅ Message sent successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </motion.section>
  );
};

export default React.memo(Contact);