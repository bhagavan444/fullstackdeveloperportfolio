import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import "./Home.css";
import profile from "../assets/profile.jpg"; // one level up from pages
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

// Enhanced Styled Components (unchanged)
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
  isolation: isolate;
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  padding: 1rem 2rem;
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const NavBrand = styled.a`
  font-size: 2rem;
  font-weight: 700;
  color: #a855f7;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);

  &:hover {
    color: #e9d5ff;
    text-shadow: 0 0 15px rgba(168, 85, 247, 0.7);
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  margin-right: 40px;
  gap: 1.2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #d8b4fe;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  transition: all 0.3s ease;
  text-shadow: 0 0 8px rgba(216, 180, 254, 0.3);

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 3px;
    bottom: -6px;
    left: 0;
    background: linear-gradient(90deg, #a855f7, #e9d5ff);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }

  &:hover {
    color: #e9d5ff;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  color: #f1f5f9;
  position: relative;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 60% 60%, rgba(168, 85, 247, 0.15), transparent 70%);
    z-index: 0;
    animation: pulse 6s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.6; }
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
  }
`;

const ProfileImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  border: 8px solid rgba(168, 85, 247, 0.2);
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
  transition: all 0.4s ease;
  transform: perspective(1000px) rotateY(0deg);
  position: relative;
  z-index: 2;

  &:hover {
    transform: perspective(1000px) rotateY(10deg) scale(1.1);
    box-shadow: 0 0 60px rgba(168, 85, 247, 0.6);
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 160px;
    height: 160px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 800px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.8rem;
  font-weight: 800;
  color: transparent;
  background: linear-gradient(45deg, #a855f7, #e9d5ff);
  -webkit-background-clip: text;
  text-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: clamp(2.2rem, 5.5vw, 3.2rem);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  color: #e2e8f0;
  margin: 1.2rem 0;
  line-height: 1.6;
  font-weight: 400;
  text-shadow: 0 0 8px rgba(226, 232, 240, 0.3);

  @media (max-width: 768px) {
    font-size: clamp(1rem, 2vw, 1.3rem);
  }
`;

const CTAButton = styled(motion.a)`
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  background: linear-gradient(45deg, #a855f7, #d8b4fe);
  color: #0f172a;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease;
  }

  &:hover:before {
    width: 250px;
    height: 250px;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(168, 85, 247, 0.6);
  }

  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
  }
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  font-size: 2.2rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    gap: 0.8rem;
  }
`;

const SocialLink = styled.a`
  color: #e2e8f0;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(226, 232, 240, 0.3);

  &:hover {
    color: #a855f7;
    transform: scale(1.3);
    text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
  }
`;

const Section = styled.section`
  padding: 5rem 1.5rem;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  margin: 2rem 0;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #a855f7, #e9d5ff);
    animation: gradientShift 5s infinite linear;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    margin: 1.5rem 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: transparent;
  background: linear-gradient(45deg, #a855f7, #e9d5ff);
  -webkit-background-clip: text;
  text-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  margin-bottom: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 480px) {
    font-size: clamp(2rem, 3.5vw, 2.5rem);
  }
`;

const Card = styled(motion.div)`
  padding: 1.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(168, 85, 247, 0.15);
  transition: all 0.4s ease;
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-height: 280px;
  box-sizing: border-box;

 

  @media (max-width: 768px) {
    padding: 1.3rem;
    min-height: 240px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0.8rem 0;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Tag = styled.span`
  padding: 0.4rem 1rem;
  background: rgba(168, 85, 247, 0.1);
  color: #e2e8f0;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #a855f7;
    color: #0f172a;
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.5);
  }

  &.concept {
    background: rgba(236, 72, 153, 0.1);
    color: #fce7f3;

    &:hover {
      background: #ec4899;
      color: #0f172a;
      box-shadow: 0 0 12px rgba(236, 72, 153, 0.5);
    }
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: auto;

  @media (max-width: 480px) {
    gap: 0.8rem;
    flex-direction: column;
  }
`;

const Link = styled.a`
  color: #d8b4fe;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;

  &:hover {
    color: #a855f7;
    text-decoration: underline;
    transform: translateX(8px);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 0.8rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const FeaturedCard = styled(Card)`
  border: 2px solid #a855f7;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(255, 255, 255, 0.03));

  &:before {
    content: "Featured";
    position: absolute;
    top: -10px;
    left: 15px;
    background: #a855f7;
    color: #0f172a;
    padding: 0.2rem 0.8rem;
    border-radius: 16px;
    font-size: 0.8rem;
    font-weight: 600;
    text-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
  }
`;

const ContactSection = styled(Section)`
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #f1f5f9;
  padding: 5rem 1.5rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:before {
    background: linear-gradient(90deg, #a855f7, #e9d5ff);
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    min-height: 50vh;
  }
`;

const ContactIntro = styled(motion.p)`
  font-size: 1.4rem;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  color: #e2e8f0;
  line-height: 1.5;
  text-shadow: 0 0 10px rgba(226, 232, 240, 0.3);
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Form = styled(motion.form)`
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 1.8rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(168, 85, 247, 0.15);
  backdrop-filter: blur(12px);
  z-index: 10;

  @media (max-width: 480px) {
    padding: 1.3rem;
    gap: 1rem;
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid rgba(168, 85, 247, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  color: #e2e8f0;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    border-color: #a855f7;
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const Textarea = styled.textarea`
  min-height: 140px;
  padding: 1rem;
  border: 2px solid rgba(168, 85, 247, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  color: #e2e8f0;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    border-color: #a855f7;
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
    min-height: 100px;
  }
`;

const CharCount = styled.p`
  font-size: 0.9rem;
  color: #e2e8f0;
  text-align: right;
  text-shadow: 0 0 8px rgba(226, 232, 240, 0.3);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ErrorMessage = styled.p`
  color: #f87171;
  font-size: 0.9rem;
  margin-top: 0.4rem;
  font-weight: 500;
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.3);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SuccessMessage = styled.p`
  color: #34d399;
  font-size: 0.9rem;
  margin-top: 0.4rem;
  font-weight: 500;
  text-shadow: 0 0 8px rgba(52, 211, 153, 0.3);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  background: linear-gradient(45deg, #a855f7, #d8b4fe);
  color: #0f172a;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
  transition: all 0.3s ease;
  align-self: center;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(168, 85, 247, 0.6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(180deg, #0f172a, #1e293b);
  color: #e2e8f0;
  padding: 4rem 1.5rem;
  text-align: center;
  border-top: 1px solid rgba(168, 85, 247, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.1), transparent 70%);
    z-index: 0;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`;

const FooterTitle = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  color: #a855f7;
  letter-spacing: 1px;
  text-shadow: 0 0 12px rgba(168, 85, 247, 0.5);

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const FooterText = styled.p`
  font-size: 1.2rem;
  color: #e2e8f0;
  font-weight: 400;
  text-shadow: 0 0 8px rgba(226, 232, 240, 0.3);

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1.1rem;

  @media (max-width: 480px) {
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const FooterLink = styled.a`
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.3s ease;
  text-shadow: 0 0 8px rgba(226, 232, 240, 0.3);

  &:hover {
    color: #a855f7;
    text-decoration: underline;
    text-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  }
`;

const ScrollTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(45deg, #a855f7, #d8b4fe);
  color: #0f172a;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
  z-index: 1000;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 8px 30px rgba(168, 85, 247, 0.6);
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 1.4rem;
  }
`;

const ResumeModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  position: relative;
  width: 90%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 12px 35px rgba(168, 85, 247, 0.25);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(168, 85, 247, 0.2);

  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;

 

  @media (max-width: 480px) {
    top: 0.8rem;
    right: 0.8rem;
    font-size: 1.6rem;
  }
`;

const ModalButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  background: linear-gradient(45deg, #a855f7, #d8b4fe);
  color: #0f172a;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.6rem;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(168, 85, 247, 0.6);
  }

  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.7;
  color: #e2e8f0;
  text-shadow: 0 0 10px rgba(226, 232, 240, 0.3);
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ParticleBackground = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.4;
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
    const particleCount = 120;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <ParticleBackground ref={canvasRef} />;
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardHover = {
  hover: {
    scale: 1.05,
    //rotate: 2,
    boxShadow: "0 15px 35px rgba(168, 85, 247, 0.4)",
    transition: { duration: 0.3 },
  },
};

const skillCard = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", type: "spring", stiffness: 100 },
  },
};

const buttonPulse = {
  hover: {
    scale: 1.1,
    boxShadow: "0 0 15px rgba(168, 85, 247, 0.6)",
    transition: { duration: 0.3, yoyo: Infinity },
  },
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

  const isAboutInView = useInView(aboutRef, { once: true, margin: "-80px" });
  const isEducationInView = useInView(educationRef, { once: true, margin: "-80px" });
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-80px" });
  const isSkillsInView = useInView(skillsRef, { once: true, margin: "-80px" });
  const isInternshipsInView = useInView(internshipsRef, { once: true, margin: "-80px" });
  const isCertificationsInView = useInView(certificationsRef, { once: true, margin: "-80px" });
  const isWorkshopsInView = useInView(workshopsRef, { once: true, margin: "-80px" });
  const isHackathonsInView = useInView(hackathonsRef, { once: true, margin: "-80px" });
  const isCodingInView = useInView(codingRef, { once: true, margin: "-80px" });
  const isHobbiesInView = useInView(hobbiesRef, { once: true, margin: "-80px" });
  const isExtracurricularInView = useInView(extracurricularRef, { once: true, margin: "-80px" });
  const isContactInView = useInView(contactRef, { once: true, margin: "-80px" });
  const isResumeInView = useInView(resumeRef, { once: true, margin: "-80px" });

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

      {/* Navigation (unchanged) */}
      <Nav>
        <NavBrand href="#home">Bhagavan</NavBrand>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#resume">Resume</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
      </Nav>

      {/* Hero Section with Staggered Animations */}
      <HeroSection id="home">
        <HeroContent
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <ProfileImage src={profile} alt="Siva Satya Sai Bhagavan Gopalajosyula" />
          </motion.div>
          <HeaderContainer>
            <Title variants={fadeInUp}>Siva Satya Sai Bhagavan</Title>
            <Subtitle variants={fadeInUp}>
              Full-Stack Developer | AI & Data Science Enthusiast | Crafting scalable solutions with MERN, Python, Java, and Cloud technologies.
            </Subtitle>
            <motion.div
              variants={fadeInUp}
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <CTAButton
                href="#projects"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaProjectDiagram /> Projects
              </CTAButton>
              <CTAButton
                href="#contact"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend /> Contact
              </CTAButton>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Socials>
                <SocialLink href="mailto:g.sivasatyasaibhagavan@gmail.com">
                  <FaEnvelope />
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </SocialLink>
                <SocialLink
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub />
                </SocialLink>
              </Socials>
            </motion.div>
          </HeaderContainer>
        </HeroContent>
      </HeroSection>

      {/* About Section (unchanged animation) */}
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

      {/* Education Section (unchanged animation) */}
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
            <h3 style={{ fontSize: "1.7rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
              Ramachandra College of Engineering, Eluru (JNTUK)
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#d8b4fe" }}>
              B.Tech in Artificial Intelligence and Data Science
            </p>
            <p style={{ fontSize: "1.2rem", color: "#d8b4fe" }}>
              2022 – 2026
            </p>
            <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.5" }}>
              Current Aggregate: 70%
            </p>
            <Tags>
              <Tag>AI & Data Science</Tag>
              <Tag>JNTUK</Tag>
            </Tags>
          </Card>
        </Grid>
      </Section>

      {/* Projects Section with Hover Animations */}
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
                whileHover="hover"
                variants={cardHover}
              >
                <h3 style={{ fontSize: "1.6rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.5" }}>
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

      {/* Skills Section with Bounce Animation */}
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
            { icon: <FaTools />, title: "Tools", skills: ["Git & GitHub", "GitHub Actions", "Postman", "VS Code", "Jupyter Notebook", "Anaconda", "Google Colab", "Netlify", "Vercel", "Render", "Heroku", "MongoDB Atlas", "Docker Desktop"] },
            { icon: <FaRobot />, title: "AI & NLP", skills: ["Hugging Face", "NLTK", "spaCy", "Transformers", "BERT", "GPT Models", "OpenAI API", "LSTM", "RNN", "Word2Vec"] },
            { icon: <FaUsers />, title: "Soft Skills", skills: ["Problem-Solving", "Analytical Thinking", "Communication", "Collaboration", "Leadership", "Teamwork", "Time Management", "Adaptability", "Creativity", "Critical Thinking"] },
          ].map((category, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isSkillsInView ? "visible" : "hidden"}
              variants={skillCard}
              whileHover="hover"
              variants={cardHover}
            >
              <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.7rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
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

      {/* Internships Section (unchanged animation) */}
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
              <h3 style={{ fontSize: "1.6rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
                {intern.title} – {intern.company}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#d8b4fe" }}>
                {intern.duration}
              </p>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.5" }}>
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

      {/* Certifications Section with Concepts and View Certificate Button */}
      <Section id="certifications" ref={certificationsRef}>
        <SectionTitle
          initial="hidden"
          animate={isCertificationsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaAward /> Certifications
        </SectionTitle>
        <div>
          <p style={{ color: "#e2e8f0", fontSize: "1.6rem", marginBottom: "1.2rem", textAlign: "center" }}>
            These certifications showcase my expertise in programming, full-stack development, cloud technologies, machine learning, AI, and modern development tools. Each credential demonstrates hands-on experience and practical knowledge gained through projects and training.
          </p>
          <Grid>
            {[
              {
                title: "Java",
                concepts: ["OOP", "Data Structures", "Concurrency", "Java APIs"],
                certLink: "https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link", // Replace with actual link
              },
              {
                title: "C for Everyone – Coursera",
                concepts: ["C Syntax, Pointers, Memory Management, Data Structures, File I/O"],
                certLink: "https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link", // Replace with actual link
              },
              {
                title: "Python",
                concepts: ["Scripting", "Data Analysis", "OOP", "File Handling"],
                certLink: "https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link", // Replace with actual link
              },
              {
                title: "React",
                concepts: ["Component-Based Architecture", "State Management", "Hooks", "React Router"],
                certLink: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link", // Replace with actual link
              },
              {
                title: "AWS Certified",
                concepts: ["EC2, S3, Lambda, CloudFormation, VPC"],
                certLink: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link", // Replace with actual link
              },
              {
                title: "R Programming",
                concepts: ["R Syntax, Data Visualization, Statistical Analysis, Data Frames, Packages"],
                certLink: "https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing", // Replace with actual link
              },
              {
                title: "Django",
                concepts: ["MVC Architecture", "ORM", "Authentication", "API Development"],
                certLink: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view", // Replace with actual link
              },
              {
                title: "ServiceNow",
                concepts: ["ITSM", "Workflow Automation", "Service Management", "Scripting"],
                certLink: "https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view", // Replace with actual link
              },
              {
                title: "ML Using Python",
                concepts: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
                certLink: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view", // Replace with actual link
              },
              {
                title: "AWS",
                concepts: ["Cloud Computing", "IaaS", "PaaS", "Serverless Architecture"],
                certLink: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view", // Replace with actual link
              },
              {
                title: "Mastering the Art of Programming - IBM Skills",
                concepts: ["Algorithm Design, Problem Solving, Code Optimization, Debugging, Best Practices"],
                certLink: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing", // Replace with actual link
              },
              {
                title: "Software Engineering",
                concepts: ["SDLC, Agile, Design Patterns, Testing, UML"],
                certLink: "https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing", // Replace with actual link
              },
              {
                title: "Continuous Integration and Continuous Delivery",
                concepts: ["CI/CD Pipelines, Jenkins, Git, Docker, Automation"],
                certLink: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing", // Replace with actual link
              },
              {
                title: "Large Language Models",
                concepts: ["LLMs, Transformers, Fine-Tuning, NLP, Prompt Engineering"],
                certLink: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing", // Replace with actual link
              },
              {
                title: "Chatbot Development",
                concepts: ["NLP", "Dialog Management", "API Integration", "Conversational AI"],
                certLink: "https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing", // Replace with actual link
              },
              {
                title: "HTML ",
                concepts: ["HTML5, Semantic Tags, Forms, Accessibility, DOM Structure"],
                certLink: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link", // Replace with actual link
              },
               {
                title: "CSS",
                concepts: ["CSS3, Flexbox, Grid, Animations, Responsive Design"],
                certLink: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link", // Replace with actual link
              },
               {
                title: "Mastering Python",
                concepts: ["Advanced Python, Decorators, Generators, Modules, Concurrency"],
                certLink: "https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link", // Replace with actual link
              },
              {
                title: "MLOps",
                concepts: ["Model Deployment, CI/CD for ML, Monitoring, Data Pipelines, Scalability"],
                certLink: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link", // Replace with actual link
              },
              {
                title: "JavaScript",
                concepts: ["JavaScript ES6, DOM Manipulation, Async Programming, Events, APIs"],
                certLink: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link", // Replace with actual link
              },
            ].map((cert, i) => (
              <Card
                key={i}
                initial="hidden"
                animate={isCertificationsInView ? "visible" : "hidden"}
                variants={fadeInUp}
                whileHover="hover"
                variants={cardHover}
              >
                <h3
                  style={{
                    fontSize: "1.3rem",
                    color: "#e2e8f0",
                    textShadow: "0 0 8px rgba(226, 232, 240, 0.3)",
                  }}
                >
                  {cert.title}
                </h3>
                <Tags>
                  {cert.concepts.map((concept) => (
                    <Tag key={concept} className="concept">
                      {concept}
                    </Tag>
                  ))}
                </Tags>
                <Links>
                  <ModalButton
                    as="a"
                    href={cert.certLink}
                    target="_blank"
                    rel="noreferrer"
                    whileHover="hover"
                    variants={buttonPulse}
                  >
                    <FiEye /> View Certificate
                  </ModalButton>
                </Links>
              </Card>
            ))}
          </Grid>
        </div>
      </Section>

      {/* Workshops Section (unchanged animation) */}
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
              <h3 style={{ fontSize: "1.6rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
                {workshop.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#d8b4fe" }}>
                {workshop.year}
              </p>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.5" }}>
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

      {/* Hackathons Section (unchanged animation) */}
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
                fontSize: "1.6rem",
                color: "#e2e8f0",
                textShadow: "0 0 8px rgba(226, 232, 240, 0.3)",
              }}
            >
              24-Hour Hackathon – Brainovision, RCE Eluru
            </h3>
            <p style={{ fontSize: "1.3rem", color: "#d8b4fe" }}>2025</p>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#e2e8f0",
                lineHeight: "1.5",
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
                <FaCertificate /> Certificate
              </Link>
            </Links>
          </Card>
        </Grid>
      </Section>

      {/* Coding Platforms Section (unchanged animation) */}
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
              <h3 style={{ fontSize: "1.5rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
                {platform.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.5" }}>
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

      {/* Hobbies Section (unchanged animation) */}
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
              <h3 style={{ fontSize: "1.5rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
                {hobby.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.5" }}>
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

      {/* Extracurricular Activities Section (unchanged animation) */}
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
              <h3 style={{ fontSize: "1.5rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
                {activity.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.5" }}>
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

      {/* Contact Section (unchanged animation) */}
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
          <Textarea
            name="message"
            placeholder="Message"
            required
            onChange={(e) => setMessageLength(e.target.value.length)}
          />
          <CharCount>{messageLength}/{maxMessageLength}</CharCount>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
          </SubmitButton>
          {isSent && <SuccessMessage>Message sent!</SuccessMessage>}
        </Form>
      </ContactSection>

      {/* Resume Section (unchanged animation) */}
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
            <h3 style={{ fontSize: "1.5rem", color: "#e2e8f0", textShadow: "0 0 8px rgba(226, 232, 240, 0.3)" }}>
              My Professional Resume
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.5" }}>
              Explore my detailed resume showcasing my journey as a Full-Stack Developer and AI & Data Science enthusiast. It includes my education, projects, skills, internships, certifications, and more, highlighting my expertise in MERN stack, Python, machine learning, and cloud technologies.</p>
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
              style={{ width: "100%", height: "80vh", border: "none", borderRadius: "12px" }}
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