import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import "./Home.css";
import profile from "../assets/profile.jpg";  // one level up from pages
import {
  FaGithub,
  FaDatabase,
  FaCloud,
  FaMobileAlt,
  FaRobot,
  FaLinkedin,
  FaEnvelope,
  FaGraduationCap,
  FaProjectDiagram,
  FaCertificate,
  FaTools,
  FaArrowUp,
  FaUsers,
  FaBrain,
  FaCode,
  FaLaptopCode,
  FaTrophy,
  FaAward,
  FaEnvelopeOpenText,
  FaLightbulb,
  FaBook,
  FaCodeBranch,
  FaRunning,
  FaUsersCog,
} from "react-icons/fa";
import { FiX, FiSend, FiDownload, FiEye } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import resumePdf from "../assets/bhagavanresume.pdf";

// Enhanced Styled Components
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: radial-gradient(circle at 20% 30%, #1e3a8a, #0a0f2a);
  font-family: "Inter", sans-serif;
  transition: all 0.3s ease;
  isolation: isolate;
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(15px);
  padding: 1.5rem 3rem;
  display: flex;
  height:60px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const NavBrand = styled.a`
  font-size: 2.2rem;
  font-weight: 1000;
  color: #00ffcc;
  text-decoration: none;
  letter-spacing: 2px;
  transform: rotate(-3deg);
  transition: all 0.3s ease;
  text-shadow: 0 0 15px #00ffcc, 0 0 30px rgba(0, 255, 204, 0.5);

  &:hover {
    color: #ff00ff;
    text-shadow: 0 0 20px #ff00ff, 0 0 40px rgba(255, 0, 255, 0.5);
    transform: rotate(0deg) scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  margin-right:60px;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color:#00ffcc;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.3rem;
  position: relative;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(224, 231, 255, 0.4);

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 4px;
    bottom: -8px;
    left: 0;
    background: linear-gradient(90deg, #00ffcc, #ff00ff);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }

  &:hover {
    color: #00ffcc;
    transform: translateY(-4px);
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #f3f4f6;
  position: relative;
  background: radial-gradient(circle at 20% 30%, #1e3a8a, #0a0f2a);
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 70% 70%, rgba(0, 255, 204, 0.2), transparent 60%);
    z-index: 0;
    animation: pulse 8s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  z-index: 1;
  max-width: 1300px;
  width: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 12px solid rgba(0, 255, 204, 0.2);
  box-shadow: 0 0 50px #00ffcc;
  transition: all 0.5s ease;
  transform: perspective(1200px) rotateY(0deg);
  position: relative;
  z-index: 2;

  &:hover {
    transform: perspective(1200px) rotateY(15deg) scale(1.15);
    box-shadow: 0 0 70px #ff00ff;
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 900px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Title = styled(motion.h1)`
  font-size:3rem;
  font-weight: 1000;
  color: transparent;
  background: linear-gradient(45deg, #00ffcc, #ff00ff);
  -webkit-background-clip: text;
  text-shadow: 0 0 20px #00ffcc, 0 0 40px rgba(0, 255, 204, 0.5);
  line-height: 1.1;

  @media (max-width: 480px) {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  color:lightblue;
  margin: 1.5rem 0;
  line-height: 1.7;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(224, 231, 255, 0.4);

  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  }
`;

const CTAButton = styled(motion.a)`
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-weight: 800;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  background: linear-gradient(45deg, #00ffcc, #ff00ff);
  color: #0a0f2a;
  box-shadow: 0 6px 25px rgba(0, 255, 204, 0.5);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  &:hover:before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 35px rgba(255, 0, 255, 0.7);
  }

  @media (max-width: 480px) {
    padding: 1rem 2rem;
    font-size: 1.2rem;
  }
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 2.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    gap: 1rem;
  }
`;

const SocialLink = styled.a`
  color: #e0e7ff;
  transition: all 0.3s ease;
  text-shadow: 0 0 15px rgba(224, 231, 255, 0.4);

  &:hover {
    color: #00ffcc;
    transform: scale(1.4);
    text-shadow: 0 0 25px #00ffcc, 0 0 50px rgba(0, 255, 204, 0.5);
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #1e3a8a, #0a0f2a);
  margin: 3rem 0;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #00ffcc, #ff00ff);
    animation: gradientShift 6s infinite linear;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    margin: 2rem 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.8rem, 5vw, 4rem);
  font-weight: 900;
  color: transparent;
  background: linear-gradient(45deg, #00ffcc, #ff00ff);
  -webkit-background-clip: text;
  text-shadow: 0 0 20px #00ffcc, 0 0 40px rgba(0, 255, 204, 0.5);
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;

  @media (max-width: 480px) {
    font-size: clamp(2.2rem, 4vw, 2.8rem);
  }
`;

const Card = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  border: 1px solid rgba(0, 255, 204, 0.2);
  transition: all 0.5s ease;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 300px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(0, 255, 204, 0.3);
    border-color: #ff00ff;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 250px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1rem 0;

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const Tag = styled.span`
  padding: 0.5rem 1.2rem;
  background: rgba(0, 255, 204, 0.15);
  color: #e0e7ff;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #00ffcc;
    color: #0a0f2a;
    box-shadow: 0 0 15px #00ffcc;
  }

  &.concept {
    background: rgba(255, 0, 255, 0.15);
    color: #fce7f3;

    &:hover {
      background: #ff00ff;
      color: #ffffff;
      box-shadow: 0 0 15px #ff00ff;
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: auto;

  @media (max-width: 480px) {
    gap: 1rem;
    flex-direction: column;
  }
`;

const Link = styled.a`
  color: #00ffcc;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff00ff;
    text-decoration: underline;
    transform: translateX(10px);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeaturedCard = styled(Card)`
  border: 2px solid #ff00ff;
  background: linear-gradient(135deg, rgba(255, 0, 255, 0.1), rgba(255, 255, 255, 0.05));

  &:before {
    content: "Featured";
    position: absolute;
    top: -12px;
    left: 20px;
    background: #ff00ff;
    color: #ffffff;
    padding: 0.3rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 700;
    text-shadow: 0 0 10px #ff00ff;
  }
`;

const ContactSection = styled(Section)`
  background: linear-gradient(135deg, #1e3a8a, #0a0f2a);
  color: #f3f4f6;
  padding: 6rem 2rem;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:before {
    background: linear-gradient(90deg, #00ffcc, #ff00ff);
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    min-height: 60vh;
  }
`;

const ContactIntro = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 900px;
  margin: 0 auto 2rem;
  color: #e0e7ff;
  line-height: 1.6;
  text-shadow: 0 0 12px rgba(224, 231, 255, 0.4);
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Form = styled(motion.form)`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(0, 255, 204, 0.2);
  backdrop-filter: blur(10px);
  z-index: 10;

  @media (max-width: 480px) {
    padding: 1.5rem;
    gap: 1.2rem;
  }
`;

const Input = styled.input`
  padding: 1.2rem;
  border: 2px solid rgba(0, 255, 204, 0.3);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  color: #e0e7ff;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:focus {
    border-color: #ff00ff;
    box-shadow: 0 0 15px #ff00ff;
  }

  &::placeholder {
    color: #93c5fd;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const Textarea = styled.textarea`
  min-height: 150px;
  padding: 1.2rem;
  border: 2px solid rgba(0, 255, 204, 0.3);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  color: #e0e7ff;
  font-size: 1.1rem;
  resize: vertical;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:focus {
    border-color: #ff00ff;
    box-shadow: 0 0 15px #ff00ff;
  }

  &::placeholder {
    color: #93c5fd;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 1rem;
    min-height: 120px;
  }
`;

const CharCount = styled.p`
  font-size: 1rem;
  color: #e0e7ff;
  text-align: right;
  text-shadow: 0 0 10px rgba(224, 231, 255, 0.4);

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ff5555;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255, 85, 85, 0.4);

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SuccessMessage = styled.p`
  color: #00ff99;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 255, 153, 0.4);

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-weight: 700;
  background: linear-gradient(45deg, #00ffcc, #ff00ff);
  color: #0a0f2a;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 25px rgba(0, 255, 204, 0.5);
  transition: all 0.4s ease;
  align-self: center;

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 35px rgba(255, 0, 255, 0.7);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(180deg, #0a0f2a, #1a2a44);
  color: #e0e7ff;
  padding: 5rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(0, 255, 204, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 20%, rgba(0, 255, 204, 0.1), transparent 70%);
    z-index: 0;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

const FooterTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 900;
  color: #00ffcc;
  letter-spacing: 2px;
  text-shadow: 0 0 15px #00ffcc, 0 0 30px rgba(0, 255, 204, 0.5);

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const FooterText = styled.p`
  font-size: 1.3rem;
  color: #e0e7ff;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(224, 231, 255, 0.4);

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
`;

const FooterLink = styled.a`
  color: #e0e7ff;
  text-decoration: none;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(224, 231, 255, 0.4);

  &:hover {
    color: #ff00ff;
    text-decoration: underline;
    text-shadow: 0 0 20px #ff00ff;
  }
`;

const ScrollTop = styled.button`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  background: linear-gradient(45deg, #00ffcc, #ff00ff);
  color: #0a0f2a;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 6px 25px rgba(0, 255, 204, 0.5);
  z-index: 1000;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 10px 35px rgba(255, 0, 255, 0.7);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
`;

const ResumeModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 25px;
  position: relative;
  width: 90%;
  max-width: 650px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 255, 204, 0.3);
  backdrop-filter: blur(15px);
  border: 1px solid #00ffcc;

  @media (max-width: 480px) {
    padding: 2rem;
    max-width: 90%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-size: 2.2rem;
  background: none;
  border: none;
  color: #e0e7ff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ff00ff;
    transform: rotate(90deg);
    text-shadow: 0 0 20px #ff00ff;
  }

  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
    font-size: 1.8rem;
  }
`;

const ModalButton = styled.button`
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-weight: 700;
  background: linear-gradient(45deg, #00ffcc, #ff00ff);
  color: #0a0f2a;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  margin: 0.8rem;

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 35px rgba(255, 0, 255, 0.7);
  }

  @media (max-width: 480px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.4rem;
  line-height: 1.8;
  color: skyblue;
  text-shadow: 0 0 12px rgba(224, 231, 255, 0.4);
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ParticleBackground = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.5;
`;

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

   

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <ParticleBackground ref={canvasRef} />;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const Home = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const maxMessageLength = 500;
  const form = useRef();

  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const internshipsRef = useRef(null);
  const certificationsRef = useRef(null);
  const workshopsRef = useRef(null);
  const hackathonsRef = useRef(null);
  const codingRef = useRef(null);
  const hobbiesRef = useRef(null);
  const extracurricularRef = useRef(null);
  const contactRef = useRef(null);
  const resumeRef = useRef(null);

  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isEducationInView = useInView(educationRef, { once: true, margin: "-100px" });
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const isSkillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const isInternshipsInView = useInView(internshipsRef, { once: true, margin: "-100px" });
  const isCertificationsInView = useInView(certificationsRef, { once: true, margin: "-100px" });
  const isWorkshopsInView = useInView(workshopsRef, { once: true, margin: "-100px" });
  const isHackathonsInView = useInView(hackathonsRef, { once: true, margin: "-100px" });
  const isCodingInView = useInView(codingRef, { once: true, margin: "-100px" });
  const isHobbiesInView = useInView(hobbiesRef, { once: true, margin: "-100px" });
  const isExtracurricularInView = useInView(extracurricularRef, { once: true, margin: "-100px" });
  const isContactInView = useInView(contactRef, { once: true, margin: "-100px" });
  const isResumeInView = useInView(resumeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const emailInput = form.current.user_email.value;
    const messageInput = form.current.message.value;

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailInput)) {
      setEmailError("Please use a valid Gmail address");
      return;
    }
    if (messageInput.length > maxMessageLength) {
      setFormError(`Message exceeds ${maxMessageLength} characters`);
      return;
    }
    setEmailError("");
    setFormError("");
    setIsSubmitting(true);

    emailjs
      .sendForm("service_8pg8cek", "template_1ys1isn", form.current, "GOTwySQukEpQEuRa5")
      .then(
        () => {
          setIsSent(true);
          setIsSubmitting(false);
          form.current.reset();
          setMessageLength(0);
        },
        (error) => {
          setFormError(`Failed to send: ${error.text}`);
          setIsSubmitting(false);
        }
      );
  };

  return (
    <Container>
      <BackgroundAnimation />

      {/* Navigation */}
      <Nav>
        <NavBrand href="#home">Bhagavan</NavBrand>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#resume">Resume</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
      </Nav>

      {/* Hero Section */}
      <HeroSection id="home">
        <HeroContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <ProfileImage src={profile} alt="Siva Satya Sai Bhagavan Gopalajosyula" />
          <HeaderContainer>
            <Title
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Siva Satya Sai Bhagavan
            </Title>
            <Subtitle
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Full-Stack Developer | AI & Data Science Enthusiast | Crafting scalable solutions with MERN, Python, Java, and Cloud technologies.
            </Subtitle>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <CTAButton whileHover={{ scale: 1.1 }} href="#projects">
                <FaProjectDiagram /> Projects
              </CTAButton>
              <CTAButton whileHover={{ scale: 1.1 }} href="#contact">
                <FiSend /> Contact
              </CTAButton>
            </motion.div>
          </HeaderContainer>
          <Socials>
            <SocialLink href="mailto:g.sivasatyasaibhagavan@gmail.com">
              <FaEnvelope />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="https://github.com/bhagavan444" target="_blank" rel="noreferrer">
              <FaGithub />
            </SocialLink>
          </Socials>
        </HeroContent>
      </HeroSection>

      {/* About Section */}
      <Section id="about" ref={aboutRef}>
        <SectionTitle
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaBrain /> About Me
        </SectionTitle>
        <AboutText
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Aspiring Software Engineer with a B.Tech in AI & Data Science (JNTUK), skilled in MERN stack, Python, SQL, and Cloud technologies. Experienced in developing scalable web applications, Machine Learning models, and contributing to open-source projects, with 19+ certifications validating technical expertise.
        </AboutText>
      </Section>

      {/* Education Section */}
      <Section id="education" ref={educationRef}>
        <SectionTitle
          initial="hidden"
          animate={isEducationInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaGraduationCap /> Education
        </SectionTitle>
        <Grid>
          <Card
            initial="hidden"
            animate={isEducationInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h3 style={{ fontSize: "1.8rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 0.4)" }}>
              Ramachandra College of Engineering, Eluru (JNTUK)
            </h3>
            <p style={{ fontSize: "1.3rem", color: "#00ffcc" }}>
              B.Tech in Artificial Intelligence and Data Science
            </p>
            <p style={{ fontSize: "1.3rem", color: "#00ffcc" }}>
              2022 – 2026
            </p>
            <p style={{ fontSize: "1.3rem", color: "skyblue", lineHeight: "1.6" }}>
              Current Aggregate: 70%
            </p>
            <Tags>
              <Tag>AI & Data Science</Tag>
              <Tag>JNTUK</Tag>
            </Tags>
          </Card>
        </Grid>
      </Section>

      {/* Projects Section */}
      <Section id="projects" ref={projectsRef}>
        <SectionTitle
          initial="hidden"
          animate={isProjectsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaProjectDiagram /> Projects
        </SectionTitle>
        <Grid>
          {[
            {
              title: "Resume Builder Web App",
              desc: "ATS-friendly resume builder with PDF/Word export and scoring integration.",
              tags: ["MERN", "OAuth", "MongoDB"],
              link: "https://github.com/bhagavan444/resumebuilder",
              demo: "https://drive.google.com/file/d/1Ml9hSjYsHldIIDQQtHvr0gpIn1RTvBhk/view",
              featured: true,
            },
            {
              title: "AI Chatbot",
              desc: "Interactive chatbot powered by OpenAI API with Tailwind-based frontend.",
              tags: ["React.js", "OpenAI API", "Vite"],
              link: "https://github.com/bhagavan444/ai-chatbot",
              demo: "https://drive.google.com/file/d/1pOfpAUaFigPo9w-YB7s4MuIEE3-bdTr0/view",
               featured: true,
            },
            {
              title: "Career Path Recommendation System",
              desc: "ML-based recommendation system suggesting career paths from skills/interests.",
              tags: ["Python", "ML", "Streamlit"],
              link: "https://github.com/bhagavan444/carrerrecomendation",
              demo: "https://drive.google.com/file/d/1cHQUdThz6tm7uvds_g2OfMcg3j9wHuRS/view",
               featured: true,
            },
            {
  title: "Heart Disease Prediction System",
  desc: "A Flask-based web application leveraging ML/DL models to predict the likelihood of heart disease from medical data.",
  tags: ["Python", "ML/DL", "Flask", "HTML/CSS"],
  link: "https://github.com/bhagavan444/heart-disease-predictor",
  demo: "https://drive.google.com/file/d/1UYQasrq1EMuDOcBZiAHF19JyR6F5T7g4/view",
},
{
  title: "Fake News Detection System",
  desc: "ML/DL-powered web application for detecting and classifying news articles as real or fake.",
  tags: ["Python", "ML/DL", "Flask", "NLP"],
  link: "https://github.com/bhagavan444/fake-news-detector",
  demo: "https://drive.google.com/file/d/1sBIB10_UrncsuAhfs3ekjSJbE58LxUQO/view?usp=sharing",
},
{
  title: "Personal Portfolio Website",
  desc: "A responsive portfolio website showcasing projects, skills, and certifications with modern UI/UX design.",
  tags: ["React", "JavaScript", "CSS", "Framer Motion"],
  link: "https://github.com/bhagavan444/portfolio",
  demo: "https://bhagavan.netlify.app",
},



            
          ].map((project, i) => {
            const ProjectCard = project.featured ? FeaturedCard : Card;
            return (
              <ProjectCard
                key={i}
                initial="hidden"
                animate={isProjectsInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <h3 style={{ fontSize: "1.7rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 0.4)" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "1.3rem", color: "#e0e7ff", lineHeight: "1.6" }}>
                  {project.desc}
                </p>
                <Tags>
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
                <Links>
                  <Link href={project.link} target="_blank" rel="noreferrer">
                    <FaGithub /> Code
                  </Link>
                  <Link href={project.demo} target="_blank" rel="noreferrer">
                    <FiEye /> Demo
                  </Link>
                </Links>
              </ProjectCard>
            );
          })}
        </Grid>
      </Section>

      {/* Skills Section */}
      <Section id="skills" ref={skillsRef}>
        <SectionTitle
          initial="hidden"
          animate={isSkillsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaTools /> Skills
        </SectionTitle>
        <Grid>
          {[
            { icon: <FaCode />, title: "Languages", skills: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL", "R", "HTML", "CSS", "PHP", "MATLAB"] },
            { icon: <FaLaptopCode />, title: "Web Dev", skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Redux", "Next.js", "Bootstrap", "Tailwind CSS", "Django", "Flask"] },
            { icon: <FaBrain />, title: "ML/DL", skills: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Matplotlib", "Seaborn", "NLTK", "spaCy", "Hugging Face Transformers"] },
            { icon: <FaCloud />, title: "Cloud & DevOps", skills: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Git", "GitHub Actions", "Jenkins", "Heroku", "Netlify", "Vercel"] },
            { icon: <FaDatabase />, title: "Data", skills: ["Pandas", "NumPy", "SQL", "MySQL", "MongoDB", "PostgreSQL", "Tableau", "Power BI", "Excel"] },
            //{ icon: <FaMobileAlt />, title: "Mobile Dev", skills: ["React Native", "Flutter"] },
            { icon: <FaTools />, title: "Tools", skills: ["Git & GitHub", "GitHub Actions", "Postman", "VS Code", "Jupyter Notebook", "Anaconda", "Google Colab", "Netlify", "Vercel", "Render", "Heroku", "MongoDB Atlas", "Docker Desktop"] },

            { icon: <FaRobot />, title: "AI & NLP", skills: ["Hugging Face", "NLTK", "spaCy", "Transformers", "BERT", "GPT Models", "OpenAI API", "LSTM", "RNN", "Word2Vec"] },

            { icon: <FaUsers />, title: "Soft Skills", skills: ["Problem-Solving", "Analytical Thinking", "Communication", "Collaboration", "Leadership", "Teamwork", "Time Management", "Adaptability", "Creativity", "Critical Thinking"] },
          ].map((category, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isSkillsInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h3 style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.8rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 1)" }}>
                {category.icon} {category.title}
              </h3>
              <Tags>
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </Tags>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Internships Section */}
      <Section id="internships" ref={internshipsRef}>
        <SectionTitle
          initial="hidden"
          animate={isInternshipsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaUsers /> Internships
        </SectionTitle>
        <Grid>
          {[
            {
  title: "AI/ML Intern – Smart Sorting Project",
  company: "SmartBridge (Remote)",
  duration: "May 2025 – June 2025",
  desc: "Developed and deployed a CNN-based deep learning model for detecting fruit and vegetable diseases in real time using Flask.",
  tech: ["Python", "CNN", "Flask", "TensorFlow/Keras"],
  concepts: ["Deep Learning", "Computer Vision", "Model Deployment", "Real-time Inference"],
  gitLink: "https://github.com/bhagavan444/smartbridge-internship",
  certLink: "https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view",
},

            {
  title: "Machine Learning & Data Science Intern",
  company: "Blackbucks (Remote)",
  duration: "May 2024 – June 2024",
  desc: "Built and optimized regression models for house price prediction using Scikit-learn. Applied feature engineering, data preprocessing, and hyperparameter tuning to improve model accuracy.",
  tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  concepts: ["Regression Analysis", "Feature Engineering", "Data Preprocessing", "Model Optimization"],
  gitLink: "https://github.com/bhagavan444/blackbucks-internship",
  certLink: "https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view",
},

          ].map((intern, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isInternshipsInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h3 style={{ fontSize: "1.7rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 0.4)" }}>
                {intern.title} – {intern.company}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#00ffcc" }}>
                {intern.duration}
              </p>
              <p style={{ fontSize: "1.3rem", color: "#e0e7ff", lineHeight: "1.6" }}>
                {intern.desc}
              </p>
              <Tags>
                {intern.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
                {intern.concepts.map((concept) => (
                  <Tag key={concept} className="concept">
                    {concept}
                  </Tag>
                ))}
              </Tags>
              <Links>
                <Link href={intern.gitLink} target="_blank" rel="noreferrer">
                  <FaGithub /> GitHub
                </Link>
                <Link href={intern.certLink} target="_blank" rel="noreferrer">
                  <FaCertificate /> Cert
                </Link>
              </Links>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Certifications Section */}
      <Section id="certifications" ref={certificationsRef}>
        <SectionTitle
          initial="hidden"
          animate={isCertificationsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaAward /> Certifications
        </SectionTitle>
        <div>
  <p style={{ color: "#cbd5e1", fontSize: "1.7rem", marginBottom: "1.5rem", textAlign: "center" }}>
    These certifications showcase my expertise in programming, full-stack development, cloud technologies, machine learning, AI, and modern development tools. Each credential demonstrates hands-on experience and practical knowledge gained through projects and training.
  </p>

  <Grid>
    {[
      "Java",
      "Python",
      "React",
      "MERN Stack",
      "Flask",
      "Django",
      "ServiceNow",
      "ML",
      "Cloud",
      "MySQL",
      "DSA",
      "C Programming",
      "Large Language Models",
      "Chatbot Development",
      "Generative AI: Beyond the Chatbot",
    ].map((cert, i) => (
      <Card
        key={i}
        initial="hidden"
        animate={isCertificationsInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <h3
          style={{
            fontSize: "1.4rem",
            color: "#e0e7ff",
            textShadow: "0 0 10px rgba(224, 231, 255, 0.4)",
          }}
        >
          {cert}
        </h3>
        <ModalButton
          as="a"
          href={`https://drive.google.com/drive/folders/1QhkuBUMKwIXQPSsh-9z98ra80BtUc_WS`}
          target="_blank"
          rel="noreferrer"
        >
          <FiEye /> View
        </ModalButton>
      </Card>
    ))}
  </Grid>
</div>

      </Section>

      {/* Workshops Section */}
      <Section id="workshops" ref={workshopsRef}>
        <SectionTitle
          initial="hidden"
          animate={isWorkshopsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaBook /> Workshops
        </SectionTitle>
        <Grid>
          {[
            {
    title: "Machine Learning with Python",
    desc: "Comprehensive hands-on workshop on machine learning fundamentals, including data preprocessing, model building, and evaluation using Python.",
    tags: ["Python", "Machine Learning", "Data Science"],
    year: "2024",
  },
  {
    title: "Deep Learning with TensorFlow",
    desc: "In-depth exploration of deep learning concepts, neural network architectures, and practical implementations using TensorFlow and Keras.",
    tags: ["TensorFlow", "Keras", "Deep Learning"],
    year: "2025",
  },
  {
    title: "Mobile App Development",
    desc: "Workshop on building responsive and feature-rich mobile applications using modern frameworks like React Native.",
    tags: ["Mobile Development", "React Native", "Frontend"],
    year: "2023",
  },
  {
    title: "Full-Stack Web Development",
    desc: "End-to-end web development training covering frontend (React), backend (Node.js, Express), and database integration (MongoDB) using the MERN stack.",
    tags: ["Full Stack", "MERN", "Web Development"],
    year: "2022",
  },
  {
    title: "Artificial Intelligence & Data Science Workshop",
    desc: "Hands-on workshop covering fundamentals of AI, Machine Learning, and Data Science, including practical applications and projects.",
    tags: ["AI", "Data Science", "Workshop"],
    year: "2022",
},
{
    title: "Web Development Workshop",
    desc: "Hands-on workshop covering frontend development with HTML, CSS, and JavaScript, including practical projects and real-world applications.",
    tags: ["Web Development", "Frontend", "JavaScript"],
    year: "2022",
},


          ].map((workshop, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isWorkshopsInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h3 style={{ fontSize: "1.7rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 0.4)" }}>
                {workshop.title}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#00ffcc" }}>
                {workshop.year}
              </p>
              <p style={{ fontSize: "1.3rem", color: "#e0e7ff", lineHeight: "1.6" }}>
                {workshop.desc}
              </p>
              <Tags>
                {workshop.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Hackathons Section */}
      <Section id="hackathons" ref={hackathonsRef}>
        <SectionTitle
          initial="hidden"
          animate={isHackathonsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaTrophy /> Hackathons
        </SectionTitle>
        <Grid>
  <Card
    initial="hidden"
    animate={isHackathonsInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    <h3
      style={{
        fontSize: "1.7rem",
        color: "#e0e7ff",
        textShadow: "0 0 10px rgba(224, 231, 255, 0.4)",
      }}
    >
      24-Hour Hackathon – Brainovision, RCE Eluru
    </h3>
    <p style={{ fontSize: "1.4rem", color: "#00ffcc" }}>2025</p>
    <p
      style={{
        fontSize: "1.2rem",
        color: "#e0e7ff",
        lineHeight: "1.6",
      }}
    >
      Developed a full-stack web platform for buying and selling second-hand electronics, implementing user authentication, product listing, and real-time transactions within 24 hours.
    </p>
    <Tags>
      <Tag>Hackathon</Tag>
      <Tag>Full Stack</Tag>
      <Tag>E-Commerce</Tag>
      <Tag>React</Tag>
      <Tag>Node.js</Tag>
      <Tag>MongoDB</Tag>
    </Tags>
    <Links>
      <Link
        href="https://github.com/bhagavan444/hacakthon-project"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub /> Code
      </Link>
       <Link
        href="https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub /> Certificate
      </Link>
    </Links>
  </Card>
</Grid>

      </Section>

      {/* Coding Platforms Section */}
      <Section id="coding" ref={codingRef}>
        <SectionTitle
          initial="hidden"
          animate={isCodingInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaCodeBranch /> Coding Platforms
        </SectionTitle>
        <Grid>
          {[
            {
              title: "LeetCode – 100 Days Challenge",
              desc: "Consistent practice on data structures and algorithms through daily coding challenges.",
              tags: ["LeetCode", "DSA", "Problem-Solving"],
              link: "https://leetcode.com/u/AxZsDhEeto/",
            },
            {
              title: "HackerRank Challenges",
              desc: "Solving algorithmic problems to improve coding skills and prepare for interviews.",
              tags: ["HackerRank", "Algorithms", "Coding"],
              link: "https://www.hackerrank.com/profile/g_sivasatyasaib1",
            },
            {
              title: "CodeChef Contests",
              desc: "Participating in competitive programming contests to enhance problem-solving abilities.",
              tags: ["CodeChef", "Competitive Programming", "Contests"],
              link: "https://www.codechef.com/users/bhagavan444",
            },
          ].map((platform, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isCodingInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h3 style={{ fontSize: "1.6rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 0.4)" }}>
                {platform.title}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#e0e7ff", lineHeight: "1.6" }}>
                {platform.desc}
              </p>
              <Tags>
                {platform.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
              <Links>
                <Link href={platform.link} target="_blank" rel="noreferrer">
                  <FaCode /> Profile
                </Link>
              </Links>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Hobbies Section */}
      <Section id="hobbies" ref={hobbiesRef}>
        <SectionTitle
          initial="hidden"
          animate={isHobbiesInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaLightbulb /> Hobbies
        </SectionTitle>
        <Grid>
          {[
            {
              title: "Coding Challenges",
              desc: "Tackling daily problems on platforms like LeetCode.",
              tags: ["Coding", "Challenges"],
            },
            {
              title: "Technical Blogging",
              desc: "Writing about AI, development, and tech trends.",
              tags: ["Blogging", "Technical Writing"],
            },
            {
              title: "Exploring AI-Driven Apps",
              desc: "Experimenting with new AI tools and applications.",
              tags: ["AI", "Exploration"],
            },
          ].map((hobby, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isHobbiesInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h3 style={{ fontSize: "1.6rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 0.4)" }}>
                {hobby.title}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#e0e7ff", lineHeight: "1.6" }}>
                {hobby.desc}
              </p>
              <Tags>
                {hobby.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Extracurricular Activities Section */}
      <Section id="extracurricular" ref={extracurricularRef}>
        <SectionTitle
          initial="hidden"
          animate={isExtracurricularInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaUsersCog /> Extracurricular Activities
        </SectionTitle>
        <Grid>
          {[
            {
              title: "Hackathons",
              desc: "Participating in competitive coding events and team collaborations.",
              tags: ["Hackathons", "Teamwork"],
            },
            {
              title: "Project Leadership",
              desc: "Leading development teams in building innovative projects.",
              tags: ["Leadership", "Projects"],
            },
          ].map((activity, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isExtracurricularInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h3 style={{ fontSize: "1.6rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 0.4)" }}>
                {activity.title}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#e0e7ff", lineHeight: "1.6" }}>
                {activity.desc}
              </p>
              <Tags>
                {activity.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Contact Section */}
      <ContactSection id="contact" ref={contactRef}>
        <SectionTitle
          initial="hidden"
          animate={isContactInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaEnvelopeOpenText /> Contact
        </SectionTitle>
        <ContactIntro
          initial="hidden"
          animate={isContactInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Let’s build something amazing together!
        </ContactIntro>
        <Form
          initial="hidden"
          animate={isContactInView ? "visible" : "hidden"}
          variants={fadeInUp}
          ref={form}
          onSubmit={sendEmail}
        >
          <Input type="text" name="user_name" placeholder="Name" required />
          <Input type="email" name="user_email" placeholder="Email" required />
          <Textarea name="message" placeholder="Message" required onChange={(e) => setMessageLength(e.target.value.length)} />
          <CharCount>{messageLength}/{maxMessageLength}</CharCount>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
          </SubmitButton>
          {isSent && <SuccessMessage>Message sent!</SuccessMessage>}
        </Form>
      </ContactSection>

      {/* Resume Section */}
      <Section id="resume" ref={resumeRef}>
        <SectionTitle
          initial="hidden"
          animate={isResumeInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaAward /> Resume
        </SectionTitle>
        <Grid>
          <Card
            initial="hidden"
            animate={isResumeInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h3 style={{ fontSize: "1.6rem", color: "#e0e7ff", textShadow: "0 0 10px rgba(224, 231, 255, 0.4)" }}>
              My Professional Resume
            </h3>
            <p style={{ fontSize: "1.3rem", color: "#e0e7ff", lineHeight: "1.6" }}>
              Explore my detailed resume showcasing my journey as a Full-Stack Developer and AI & Data Science enthusiast. It includes my education, projects, skills, internships, certifications, and more, highlighting my expertise in MERN stack, Python, machine learning, and cloud technologies.
            </p>
            <Links>
              <Link href={resumePdf} target="_blank" rel="noopener noreferrer">
                <FiEye /> View
              </Link>
              <Link href={resumePdf} download="Siva_Bhagavan_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <FiDownload /> Download
              </Link>
            </Links>
          </Card>
        </Grid>
      </Section>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterTitle>Siva Satya Sai Bhagavan</FooterTitle>
          <FooterText>© 2025 All rights reserved.</FooterText>
          <FooterLinks>
            <FooterLink href="#home">Home</FooterLink>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#projects">Projects</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </FooterLinks>
          <Socials>
            <SocialLink href="mailto:g.sivasatyasaibhagavan@gmail.com">
              <FaEnvelope />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/bhagavan" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="https://github.com/bhagavan444" target="_blank" rel="noreferrer">
              <FaGithub />
            </SocialLink>
          </Socials>
        </FooterContent>
      </Footer>

      {showTopBtn && (
        <ScrollTop onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FaArrowUp />
        </ScrollTop>
      )}

      {showResumeModal && (
        <ResumeModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalContent>
            <CloseButton onClick={() => setShowResumeModal(false)}>
              <FiX />
            </CloseButton>
            <iframe
              src={resumePdf}
              title="Resume"
              style={{ width: "100%", height: "80vh", border: "none", borderRadius: "15px" }}
            />
            <ModalButton as="a" href={resumePdf} download="Siva_Bhagavan_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <FiDownload /> Download
            </ModalButton>
          </ModalContent>
        </ResumeModal>
      )}
    </Container>
  );
};

export default Home;