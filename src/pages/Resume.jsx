import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { FiEye, FiDownload, FiX } from "react-icons/fi";
import resumePDF from "../assets/bhagavanresume.pdf";

// --- COMPONENT: Enhanced Animated Starfield Background ---
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
      {/* Comet Trail Effect */}
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

// Custom styles object for cleaner JSX
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
  buttonGroup: {
    display: "flex",
    gap: "clamp(1rem, 3vw, 2rem)",
    justifyContent: "center",
    flexWrap: "wrap",
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
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(5, 2, 20, 0.85)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5000,
  },
  modalContent: {
    background: "rgba(12, 5, 32, 0.95)",
    border: "1px solid rgba(124, 58, 237, 0.4)",
    borderRadius: "16px",
    padding: "clamp(1rem, 2vw, 2rem)",
    width: "clamp(300px, 95vw, 1000px)",
    height: "90vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.4)",
    animation: "zoomIn 0.6s ease-out",
  },
  closeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#c4b5fd",
    cursor: "pointer",
    zIndex: 10,
    transition: "transform 0.3s ease",
  },
};

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const backgroundGradient = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX + window.innerWidth / 2}px ${
        latestY + window.innerHeight / 2
      }px, rgba(0, 198, 255, 0.25), transparent 40%)`
  );

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1200);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 15 } },
    //hover: { rotateX: 5, rotateY: -5, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalContentVariants = {
    hidden: { scale: 0.8, y: 50, opacity: 0 },
    visible: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.6, type: "spring" } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.4 } },
  };

  const LoadingIndicator = () => (
    <motion.div
      style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", height: "100%" }}
      transition={{ staggerChildren: 0.15 }}
      initial="start"
      animate="end"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          style={{ width: "15px", height: "60px", background: `linear-gradient(to top, #7c3aed, #00c6ff)`, borderRadius: "5px", boxShadow: "0 0 5px #00c6ff" }}
          variants={{ start: { y: "0%" }, end: { y: "100%" } }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );

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

  return (
    <motion.section
      style={styles.container}
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.0 }}
    >
      <Starfield />

      <motion.div style={{ position: "absolute", inset: 0, background: backgroundGradient }} />

      <motion.article
        style={styles.card}
        variants={cardVariants}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div style={styles.cardGlow} />
        <motion.h2 style={styles.title} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2, type: "spring" } } }}>
          My Digital Résumé
        </motion.h2>

        <motion.p style={styles.description} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8 } } }}>
          This is a curated look at my professional journey, showcasing key projects, technical skills, and the collaborative spirit I bring to every challenge.
        </motion.p>

        <motion.div style={styles.buttonGroup} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } } }}>
          <motion.button
            style={{ ...styles.button, background: "linear-gradient(90deg, #7c3aed, #00c6ff)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00c6ff" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            aria-label="Preview Resume"
          >
            <motion.span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <FiEye /> Preview
            </motion.span>
            <div style={styles.buttonGlow} />
            <ButtonShine isActive={true} />
          </motion.button>

          <motion.a
            href={resumePDF}
            download="Bhagavan-Resume.pdf"
            style={{ ...styles.button, background: "rgba(255, 255, 255, 0.1)", textDecoration: "none" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00c6ff" }}
            whileTap={{ scale: 0.98 }}
            aria-label="Download Resume"
          >
            <motion.span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <FiDownload /> Download
            </motion.span>
            <div style={styles.buttonGlow} />
            <ButtonShine isActive={true} />
          </motion.a>
        </motion.div>
      </motion.article>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            style={styles.modalOverlay}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              style={styles.modalContent}
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                style={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
                whileHover={{ scale: 1.1, background: "rgba(0, 198, 255, 0.3)", transform: "rotate(90deg)", color: "#00c6ff" }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={24} />
              </motion.button>

              <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", color: "#9ca3af", fontSize: "0.9rem", zIndex: 5 }}>
                Press 'Esc' to close
              </div>

              <div style={{ flex: 1, marginTop: "3.5rem", borderRadius: "8px", overflow: "hidden" }}>
                {isLoading ? (
                  <LoadingIndicator />
                ) : (
                  <motion.iframe
                    src={`${resumePDF}#toolbar=0&navpanes=0&scrollbar=0`}
                    title="Bhagavan's Resume Viewer"
                    frameBorder="0"
                    style={{ width: "100%", height: "100%", border: "none" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Resume;

