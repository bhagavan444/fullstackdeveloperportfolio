import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
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
  FaStar,
  FaBolt,
  FaChartLine,
} from "react-icons/fa";
import { FiX, FiSend, FiDownload, FiEye, FiCode } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import resumePdf from "../assets/bhagavanresume.pdf";

// New UI Theme: Futuristic AI-Inspired Design
// Color Scheme: Neon Cyan, Deep Space Black, Electric Blue, Glowing Purple Accents
// Fonts: 'Orbitron' for titles (futuristic), 'Source Code Pro' for body (code-like)
// Layout: More immersive with floating elements, holographic effects, subtle glows
// Animations: Enhanced with scale pulses, light trails, and AI-like scanning effects
// Unique Talent Showcase: Integrated AI-themed particles, holographic cards, and interactive glow on hover

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(135deg, #020c1b, #0a192f, #112240);
  font-family: "Source Code Pro", monospace;
  color: #e0fbfc;
  transition: all 0.3s ease-out;
  isolation: isolate;

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(2, 12, 27, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  box-shadow: 0 4px 20px rgba(0, 255, 255, 0.1);
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);

  @media (max-width: 1024px) {
    padding: 0.8rem 1.5rem;
    height: 60px;
  }
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    height: 50px;
  }
`;

const NavBrand = styled.a`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.4rem);
  font-weight: 700;
  background: linear-gradient(90deg, #00ffff, #7fffd4, #00bfff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: glow(0 0 20px rgba(0, 255, 255, 0.5));
  }

  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 2.5vw, 1.2rem);
  }
  @media (max-width: 480px) {
    font-size: clamp(1rem, 2vw, 1.1rem);
  }
`;

const NavLinks = styled.div`

  display: flex;
  margin-right:50px;
  gap: clamp(1rem, 2vw, 1.5rem);
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const NavLink = styled.a`
font-family: "Orbitron", sans-serif;
font-size: clamp(1.1rem, 3vw, 1rem);
  font-weight: 800;
  background: linear-gradient(90deg, #00ffff, #7fffd4, #00bfff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  position: relative;
  transition: all 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -6px;
    left: 0;
    background: linear-gradient(90deg, #00ffff, #00bfff);
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover:after {
    width: 100%;
  }

  &:hover {
    color: #00ffff;
    transform: translateY(-2px);
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 5vw, 2rem) 0; /* Reduced top/bottom padding, kept sides */
  position: relative;
  background: linear-gradient(135deg, #020c1b, #0a192f, #112240);
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 30% 70%, rgba(0, 255, 255, 0.2), transparent 50%
    ),
    radial-gradient(circle at 70% 30%, rgba(127, 255, 212, 0.15), transparent 50%);
    z-index: 0;
    animation: aiPulse 10s infinite ease-in-out;
  }

  @keyframes aiPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }

  @media (max-width: 1024px) {
    padding: clamp(1rem, 2vw, 1.5rem) 0;
  }
  @media (max-width: 480px) {
    padding: clamp(0.5rem, 1.5vw, 1rem) 0;
  }
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: clamp(2rem, 4vw, 3rem);
  max-width: 1400px;
  width: 100%;
  padding: clamp(1.5rem, 3vw, 2rem);
  z-index: 1;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  perspective: 1200px;
  filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.3));
`;

const ProfileImage = styled(motion.img)`
  width: clamp(220px, 25vw, 300px);
  height: clamp(220px, 25vw, 300px);
  border-radius: 20px;
  object-fit: cover;
  border: 4px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;

  &:hover {
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.6), inset 0 0 25px rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: clamp(180px, 20vw, 220px);
    height: clamp(180px, 20vw, 220px);
  }
  @media (max-width: 480px) {
    width: clamp(150px, 18vw, 180px);
    height: clamp(150px, 18vw, 180px);
  }
`;

const ProfileRing = styled(motion.div)`
  position: absolute;
  top: -15px;
  left: -15px;
  width: calc(100% + 30px);
  height: calc(100% + 30px);
  border: 2px dotted rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  z-index: 1;
  animation: aiScan 20s linear infinite;

  @keyframes aiScan {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    top: -12px;
    left: -12px;
  }
  @media (max-width: 480px) {
    top: -10px;
    left: -10px;
  }
`;

const HeaderContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 900px;

  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
  }
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const Title = styled(motion.h1)`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(2rem, 6vw,3rem);
  font-weight: 800;
  background: linear-gradient(90deg, #00ffff, #00bfff, #7fffd4, #00ffff);
  background-size: 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  line-height: 1.3;
  animation: neonFlow 6s ease infinite;

  @keyframes neonFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 5vw, 2.8rem);
  }
  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 4.5vw, 2.5rem);
  }
`;

const Subtitle = styled(motion.div)`
  font-size: clamp(1rem, 2.5vw, 1.7rem);
  color: #a8d0e6;
  margin: 1rem 0;
  line-height: 1.6;
  font-weight: 400;
  text-shadow: 0 0 8px rgba(168, 208, 230, 0.3);
  span {
    color: #00ffff;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
  }
  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 1.8vw, 1rem);
  }
`;

const CTAButton = styled(motion.a)`
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem);
  border-radius: 8px;
  font-weight: 800;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  background: linear-gradient(90deg, #00ffff, #00bfff);
  color: #020c1b;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 30px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: clamp(0.85rem, 1.8vw, 1rem);
  }
  @media (max-width: 480px) {
    padding: 0.6rem 1.5rem;
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  }
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 2vw, 1.5rem);
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin-top: 2rem;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 2.5vw, 1.8rem);
    gap: 1rem;
  }
  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    gap: 0.8rem;
  }
`;

const SocialLink = styled.a`
  color: #a8d0e6;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(168, 208, 230, 0.3);

  &:hover {
    color: #00ffff;
    transform: scale(1.15) rotate(360deg);
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
  }
`;

const Section = styled.section`
  padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 3vw, 2rem);
  background: linear-gradient(135deg, #020c1b, #0a192f, #112240);
  margin: clamp(2rem, 4vw, 3rem) 0;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.05);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #00ffff, #00bfff, #7fffd4);
    background-size: 300%;
    animation: neonShift 5s infinite linear;
  }

  @keyframes neonShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 300% 50%; }
  }

  @media (max-width: 768px) {
    padding: clamp(3rem, 6vw, 4rem) 1.5rem;
    margin: 2rem 0;
    border-radius: 12px;
  }
  @media (max-width: 480px) {
    padding: clamp(2rem, 4vw, 3rem) 1rem;
    margin: 1.5rem 0;
    border-radius: 10px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  background: linear-gradient(90deg, #00ffff, #00bfff, #7fffd4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 4px;

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    gap: 0.5rem;
  }
  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 3.5vw, 2.2rem);
    letter-spacing: 2px;
    gap: 0.4rem;
  }
`;

const Card = styled(motion.div)`
  padding: clamp(1.5rem, 3vw, 2rem);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.4s ease;
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 280px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.05);

  &:hover {
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ffff, #00bfff);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 240px;
  }
  @media (max-width: 480px) {
    padding: 1rem;
    min-height: 200px;
    gap: 0.8rem;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.6rem, 1.5vw, 0.8rem);
  margin: 1rem 0;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }
  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const Tag = styled(motion.span)`
  padding: 0.5rem clamp(0.8rem, 1.5vw, 1.2rem);
  background: rgba(0, 255, 255, 0.1);
  color: #e0fbfc;
  border-radius: 8px;
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: default;
  border: 1px solid rgba(0, 255, 255, 0.2);

  &:hover {
    background: linear-gradient(90deg, #00ffff, #00bfff);
    color: #020c1b;
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
    transform: scale(1.05);
  }

  &.concept {
    background: rgba(127, 255, 212, 0.1);
    color: #e0fbfc;

    &:hover {
      background: linear-gradient(90deg, #7fffd4, #00ffff);
      color: #020c1b;
      box-shadow: 0 0 12px rgba(127, 255, 212, 0.5);
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem clamp(0.6rem, 1.2vw, 1rem);
    font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  }
`;

const Links = styled.div`
  display: flex;
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const Link = styled.a`
  color: #00bfff;
  font-weight: 500;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #00ffff;
    transform: translateX(5px);
    text-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
  }

  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
    gap: 0.4rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);
  margin-top: 1.5rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const FeaturedCard = styled(Card)`
  border: 2px solid #00ffff;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(255, 255, 255, 0.02));

  &:before {
    content: "Featured ⚡";
    position: absolute;
    top: -10px;
    left: 15px;
    background: linear-gradient(90deg, #00ffff, #00bfff);
    color: #020c1b;
    padding: 0.3rem 1rem;
    border-radius: 8px;
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    &:before {
      top: -8px;
      left: 10px;
      padding: 0.2rem 0.8rem;
      font-size: clamp(0.7rem, 1.2vw, 0.8rem);
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
  margin: 0.5rem 0;

  @media (max-width: 480px) {
    height: 5px;
    margin: 0.4rem 0;
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #00ffff, #00bfff);
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
`;

const ContactSection = styled(Section)`
  background: linear-gradient(135deg, #020c1b, #0a192f, #112240);
  padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 3vw, 2rem);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContactIntro = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  max-width: 800px;
  margin: 0 auto 2rem;
  color: #a8d0e6;
  line-height: 1.6;
  text-shadow: 0 0 8px rgba(168, 208, 230, 0.3);
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(1rem, 2vw, 1.2rem);
  }
  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 1.8vw, 1rem);
    max-width: 100%;
  }
`;

const Form = styled(motion.form)`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: clamp(1.5rem, 3vw, 2rem);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.2rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const Input = styled.input`
  padding: clamp(0.8rem, 2vw, 1.2rem);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: #e0fbfc;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    border-color: #00ffff;
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
    transform: scale(1.01);
    outline: none;
  }

  &::placeholder {
    color: #a8d0e6;
  }

  @media (max-width: 480px) {
    padding: clamp(0.6rem, 1.5vw, 1rem);
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  }
`;

const Textarea = styled.textarea`
  min-height: 160px;
  padding: clamp(0.8rem, 2vw, 1.2rem);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: #e0fbfc;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
  resize: vertical;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    border-color: #00ffff;
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
    transform: scale(1.01);
    outline: none;
  }

  &::placeholder {
    color: #a8d0e6;
  }

  @media (max-width: 768px) {
    min-height: 120px;
  }
  @media (max-width: 480px) {
    min-height: 100px;
    padding: clamp(0.6rem, 1.5vw, 1rem);
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  }
`;

const CharCount = styled.p`
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  color: #a8d0e6;
  text-align: right;
  text-shadow: 0 0 6px rgba(168, 208, 230, 0.3);

  @media (max-width: 480px) {
    font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  margin-top: 0.5rem;
  font-weight: 500;
  text-shadow: 0 0 6px rgba(255, 77, 77, 0.3);

  @media (max-width: 480px) {
    font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  }
`;

const SuccessMessage = styled(motion.p)`
  color: #00ff00;
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  margin-top: 0.5rem;
  font-weight: 500;
  text-shadow: 0 0 6px rgba(0, 255, 0, 0.3);

  @media (max-width: 480px) {
    font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem);
  border-radius: 8px;
  font-weight: 600;
  background: linear-gradient(90deg, #00ffff, #00bfff);
  color: #020c1b;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
  transition: all 0.3s ease;
  align-self: center;
  font-size: clamp(0.9rem, 1.8vw, 1rem);

  &:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 30px rgba(0, 255, 255, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    padding: clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 2rem);
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  }
`;

const Footer = styled.footer`
  background: linear-gradient(180deg, #020c1b, #0a192f, #112240);
  color: #a8d0e6;
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1), transparent 60%);
    z-index: 0;
    animation: aiPulse 8s infinite ease-in-out;
  }

  @media (max-width: 480px) {
    padding: clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 1.5rem);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const FooterTitle = styled(motion.h3)`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  background: linear-gradient(90deg, #00ffff, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1.5px;
  text-shadow: 0 0 12px rgba(0, 255, 255, 0.5);

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
  }
`;

const FooterText = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #a8d0e6;
  font-weight: 400;
  text-shadow: 0 0 6px rgba(168, 208, 230, 0.3);

  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 1.8vw, 1rem);
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: clamp(1.5rem, 3vw, 2rem);
  font-size: clamp(0.9rem, 1.8vw, 1rem);

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 480px) {
    gap: 0.8rem;
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  }
`;

const FooterLink = styled(motion.a)`
  color: #a8d0e6;
  text-decoration: none;
  transition: all 0.3s ease;
  text-shadow: 0 0 6px rgba(168, 208, 230, 0.3);

  &:hover {
    color: #00ffff;
    transform: translateY(-2px);
    text-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  }
`;

const FooterSocials = styled(Socials)`
  margin-top: 1rem;

  @media (max-width: 480px) {
    margin-top: 0.8rem;
  }
`;

const ScrollTop = styled(motion.button)`
  position: fixed;
  bottom: clamp(2rem, 4vw, 2.5rem);
  right: clamp(2rem, 4vw, 2.5rem);
  background: linear-gradient(90deg, #00ffff, #00bfff);
  color: #020c1b;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
    bottom: clamp(1.5rem, 3vw, 2rem);
    right: clamp(1.5rem, 3vw, 2rem);
  }
`;

const ResumeModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(6px);
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: clamp(1.5rem, 3vw, 2rem);
  border-radius: 15px;
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  text-align: center;
  box-shadow: 0 15px 50px rgba(0, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 95%;
    max-height: 80vh;
  }
  @media (max-width: 480px) {
    padding: 1rem;
    max-height: 75vh;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: clamp(1.8rem, 3vw, 2rem);
  background: none;
  border: none;
  color: #a8d0e6;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #00ffff;
    transform: rotate(90deg);
    text-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
  }

  @media (max-width: 480px) {
    top: 0.8rem;
    right: 0.8rem;
    font-size: clamp(1.5rem, 2.5vw, 1.8rem);
  }
`;

const ModalButton = styled(motion.button)`
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem);
  border-radius: 8px;
  font-weight: 600;
  background: linear-gradient(90deg, #00ffff, #00bfff);
  color: #020c1b;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.8rem;
  font-size: clamp(0.9rem, 1.8vw, 1rem);

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 30px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    padding: clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 2rem);
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
    margin: 0.6rem;
  }
`;

const AboutText = styled(motion.p)`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  line-height: 1.8;
  color: #a8d0e6;
  text-shadow: 0 0 8px rgba(168, 208, 230, 0.3);
  text-align: justify;

  @media (max-width: 768px) {
    font-size: clamp(1rem, 2vw, 1.1rem);
  }
  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 1.8vw, 1rem);
    line-height: 1.6;
  }
`;

const ParticleBackground = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.25;
`;

// Remaining components (BackgroundAnimation, TypingSubtitle, Home) with AI-themed particles
const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 250;

    const symbols = ['AI', 'MERN', 'Node', 'React', 'Mongo', 'Express', 'ML', 'Neural', 'Data', 'Cloud'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, ${Math.random() * 30 + 50}%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.font = `${this.size * 8}px Orbitron`;
        ctx.textAlign = 'center';
        ctx.fillText(this.symbol, this.x, this.y);
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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <ParticleBackground ref={canvasRef} />;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const cardHover = {
  hover: {
    scale: 1.05,
    rotateX: 3,
    rotateY: 3,
    boxShadow: "0 20px 50px rgba(0, 255, 255, 0.4)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
  },
};

const skillCard = {
  hidden: { opacity: 0, scale: 0.7, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut", 
      type: "spring", 
      stiffness: 120,
      damping: 10 
    },
  },
};

const buttonPulse = {
  hover: {
    scale: 1.08,
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)",
    transition: { duration: 0.3 },
  },
};

const TypingSubtitle = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCurrentIndex(currentIndex - 1);
      } else {
        setIsDeleting(!isDeleting);
        setCurrentIndex(isDeleting ? 0 : text.length);
      }
    }, isDeleting ? 30 : 100);

    return () => clearTimeout(handler);
  }, [currentIndex, isDeleting, text]);

  return (
    <Subtitle>
      {displayText}
      <span style={{ color: '#00ffff', animation: 'blink 0.7s infinite' }}>|</span>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Subtitle>
  );
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [-20, 20]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left - width / 2) / 2);
    y.set((e.clientY - rect.top - height / 2) / 2);
  };

  const openResumeModal = () => setShowResumeModal(true);

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

      <Nav>
        <NavBrand href="#home">Bhagavan | MERN & AIMl <FaStar style={{ fontSize: '1rem', marginLeft: '0.2rem' }} /></NavBrand>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#resume">Resume</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
      </Nav>

      <HeroSection id="home">
        <HeroContent
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} style={{ position: 'relative' }}>
            <ProfileImageContainer
              onMouseMove={handleMouseMove}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
              <ProfileRing
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <ProfileImage 
                src={profile} 
                alt="Siva Satya Sai Bhagavan Gopalajosyula" 
                drag={false}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              />
            </ProfileImageContainer>
          </motion.div>
          <HeaderContainer>
            <Title variants={fadeInUp}>Siva Satya Sai Bhagavan GopalaJosyula</Title>
            <TypingSubtitle text="Full-Stack Developer & AI/ML Enthusiast | Building scalable MERN & Python solutions | Skilled in Java, Cloud, DevOps & Data-Driven Applications for Enterprise and Product Innovation." />

            <motion.div
              variants={fadeInUp}
              style={{ display: "flex", gap: "1.8rem", justifyContent: "center", flexWrap: 'wrap' }}
            >
              <CTAButton
                href="#projects"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <FaProjectDiagram /> Explore Projects
              </CTAButton>
              <CTAButton
                href="#contact"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <FiSend /> Let's Connect
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
          Aspiring Software Engineer with a B.Tech in AI & Data Science (JNTUK), specializing in <span>MERN stack</span> for building high-performance, scalable web applications. Proven track record in deploying full-stack solutions, ML models, and cloud-native apps. With 19+ certifications and hands-on experience in MNC-level projects, I deliver clean, efficient code that drives innovation and business impact.
        </AboutText>
      </Section>

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
            whileHover="hover"
          >
            <h3 style={{ fontSize: "1.8rem", color: "#e0fbfc", textShadow: "0 0 10px rgba(224, 251, 252, 0.4)" }}>
              Ramachandra College of Engineering, Eluru (JNTUK)
            </h3>
            <p style={{ fontSize: "1.3rem", color: "#00bfff" }}>
              B.Tech in Artificial Intelligence and Data Science
            </p>
            <p style={{ fontSize: "1.3rem", color: "#00bfff" }}>
              2022 – 2026
            </p>
            <p style={{ fontSize: "1.3rem", color: "#e0fbfc", lineHeight: "1.5" }}>
              Current Aggregate: 70% | Focus: MERN & AI Integration
            </p>
            <Tags>
              <Tag whileHover={{ scale: 1.1 }}>B.Tech – AIDS (Artificial Intelligence & Data Science)</Tag>
              <Tag whileHover={{ scale: 1.1 }}>JNTUK – R20 Curriculum</Tag>
              <Tag whileHover={{ scale: 1.1 }} className="concept">MERN Stack & Full-Stack Development</Tag>
              <Tag whileHover={{ scale: 1.1 }}>Machine Learning & AI</Tag>
              <Tag whileHover={{ scale: 1.1 }}>Python, Java & JavaScript</Tag>
              <Tag whileHover={{ scale: 1.1 }}>Cloud & DevOps Basics (AWS, Docker)</Tag>
            </Tags>
          </Card>
        </Grid>
      </Section>

      <Section id="projects" ref={projectsRef}>
        <SectionTitle
          initial="hidden"
          animate={isProjectsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaProjectDiagram /> Featured Projects
        </SectionTitle>
        <Grid>
          {[
            {
              title: "AI Chatbot Dashboard",
              desc: "Enterprise-grade chatbot dashboard integrating OpenAI API with real-time messaging, analytics, and conversation history. Developed using MERN stack with Socket.io for seamless interaction.",
              tags: ["React", "Node.js", "OpenAI API", "Socket.io", "MERN"],
              link: "https://github.com/bhagavan444/ai-chatbot",
              demo: "https://drive.google.com/file/d/1pOfpAUaFigPo9w-YB7s4MuIEE3-bdTr0/view",
              impact: "Handled 10,000+ queries with 95% accuracy and reduced response latency by 40%."
            },
            {
              title: "Resume Builder Web App",
              desc: "Full-stack, ATS-optimized resume builder enabling real-time PDF/Word export, AI scoring, and secure user authentication. Built with MERN stack and deployed on Vercel using MongoDB Atlas.",
              tags: ["MERN", "OAuth2", "MongoDB", "PDF Generation", "AI Scoring"],
              link: "https://github.com/bhagavan444/resumebuilder",
              demo: "https://drive.google.com/file/d/1Ml9hSjYsHldIIDQQtHvr0gpIn1RTvBhk/view",
              impact: "Reduced resume creation time by 70% for 500+ users; improved resume quality with AI-based scoring."
            },
            {
              title: "Heart Disease Prediction Platform",
              desc: "Scalable predictive healthcare platform combining Flask and MERN stack with deep learning models. Provides real-time dashboards and analytics, deployed on AWS for enterprise use.",
              tags: ["MERN Hybrid", "TensorFlow", "Flask", "AWS", "Predictive Analytics"],
              link: "https://github.com/bhagavan444/heart-disease-predictor",
              demo: "https://drive.google.com/file/d/1UYQasrq1EMuDOcBZiAHF19JyR6F5T7g4/view",
              impact: "Enhanced prediction accuracy to 92%, aiding faster clinical decisions."
            },
            {
              title: "Career Path Recommendation Engine",
              desc: "Personalized career recommendation system using MERN stack frontend and Python ML backend. Analyzes skills and market trends, integrated with LinkedIn API for real-time suggestions.",
              tags: ["MERN", "Python ML", "Streamlit", "Recommendation Systems", "LinkedIn API"],
              link: "https://github.com/bhagavan444/carrerrecomendation",
              demo: "https://drive.google.com/file/d/1cHQUdThz6tm7uvds_g2OfMcg3j9wHuRS/view",
              impact: "Achieved 85% match rate during beta testing; improved career planning efficiency for users."
            },
            {
              title: "Fake News Detector",
              desc: "Real-time NLP-powered news classification system using MERN frontend and Python backend. Includes admin panel for model updates and continuous monitoring for misinformation.",
              tags: ["MERN", "NLP", "BERT", "Flask", "Admin Panel"],
              link: "https://github.com/bhagavan444/fake-news-detector",
              demo: "https://drive.google.com/file/d/1sBIB10_UrncsuAhfs3ekjSJbE58LxUQO/view?usp=sharing",
              impact: "Successfully detected 88% of fake news articles in live tests; reduced misinformation spread."
            },
            {
              title: "Dynamic Portfolio Site",
              desc: "Responsive and interactive personal portfolio built with React, Framer Motion, and Styled Components. Implements smooth animations, optimized performance, and SEO-friendly structure.",
              tags: ["React", "Framer Motion", "Styled Components", "Vite", "Responsive Design"],
              link: "https://github.com/bhagavan444/portfolio",
              demo: "https://bhagavan.netlify.app",
              impact: "Optimized for 60fps animations; improved user engagement and showcased projects effectively."
            }
          ].map((project, i) => {
            const ProjectCard = project.featured ? FeaturedCard : Card;
            return (
              <ProjectCard
                key={i}
                initial="hidden"
                animate={isProjectsInView ? "visible" : "hidden"}
                variants={fadeInUp}
                whileHover="hover"
              >
                <h3 style={{ fontSize: "1.7rem", color: "#e0fbfc", textShadow: "0 0 10px rgba(224, 251, 252, 0.4)" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "1.1rem", color: "#e0fbfc", lineHeight: "1.6" }}>
                  {project.desc}
                </p>
                {project.impact && (
                  <p style={{ fontSize: "1rem", color: "#00ffff", fontWeight: "600" }}>
                    <FaChartLine /> Impact: {project.impact}
                  </p>
                )}
                <Tags>
                  {project.tags.map((tag) => (
                    <Tag key={tag} whileHover={{ scale: 1.1 }}>{tag}</Tag>
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

      <Section id="skills" ref={skillsRef}>
        <SectionTitle
          initial="hidden"
          animate={isSkillsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaTools /> Core Skills
        </SectionTitle>
        <Grid>
          {[
            { 
              icon: <FaCode />, 
              title: "Programming Languages", 
              skills: [
                { name: "Python", level: 95 },
                { name: "Java", level: 90 },
                { name: "JavaScript (ES6+)", level: 90 },
                { name: "TypeScript", level: 80 },
                { name: "SQL", level: 85 },
                { name: "C/C++", level: 80 },
                { name: "Go (Golang)", level: 70 },
                { name: "Rust", level: 65 },
              ] 
            },
            { 
              icon: <FaLaptopCode />, 
              title: "Full-Stack Development", 
              skills: [
                { name: "React.js", level: 95 },
                { name: "Node.js", level: 90 },
                { name: "Express.js", level: 85 },
                { name: "Next.js", level: 80 },
                { name: "Spring Boot", level: 75 },
                { name: "Angular", level: 75 },
                { name: "Django / Flask", level: 80 },
                { name: "MongoDB", level: 90 },
                { name: "GraphQL", level: 70 },
                { name: "REST API Development", level: 90 },
              ] 
            },
            { 
              icon: <FaBrain />, 
              title: "Machine Learning & Artificial Intelligence", 
              skills: [
                { name: "TensorFlow / Keras", level: 90 },
                { name: "PyTorch", level: 85 },
                { name: "Scikit-learn", level: 85 },
                { name: "Hugging Face Transformers", level: 80 },
                { name: "OpenAI API / LangChain", level: 75 },
                { name: "NLP (SpaCy, NLTK)", level: 80 },
                { name: "Computer Vision (OpenCV, CNNs)", level: 85 },
                { name: "Generative AI (GANs, Diffusion)", level: 75 },
                { name: "Reinforcement Learning (Gym, RLlib)", level: 70 },
                { name: "MLflow / MLOps", level: 70 },
                { name: "Data Preprocessing (Pandas, NumPy)", level: 95 },
                { name: "Data Visualization (Matplotlib, Seaborn, Plotly)", level: 90 },
                { name: "Big Data (Hadoop, Spark MLlib)", level: 70 },
                { name: "AutoML (H2O.ai, AutoKeras)", level: 65 },
              ] 
            },
            { 
              icon: <FaCloud />, 
              title: "Cloud & DevOps", 
              skills: [
                { name: "AWS", level: 85 },
                { name: "Azure", level: 80 },
                { name: "Google Cloud (GCP)", level: 75 },
                { name: "Docker", level: 80 },
                { name: "Kubernetes", level: 70 },
                { name: "CI/CD (Jenkins, GitHub Actions)", level: 75 },
                { name: "Terraform", level: 65 },
                { name: "Linux & Shell Scripting", level: 80 },
              ] 
            },
            { 
              icon: <FaDatabase />, 
              title: "Databases & Tools", 
              skills: [
                { name: "MySQL", level: 85 },
                { name: "PostgreSQL", level: 85 },
                { name: "MongoDB", level: 90 },
                { name: "Redis", level: 70 },
                { name: "Oracle DB", level: 70 },
                { name: "Firebase", level: 70 },
                { name: "Git & GitHub/GitLab", level: 95 },
                { name: "Postman", level: 90 },
                { name: "JIRA", level: 75 },
              ] 
            },
            { 
              icon: <FaUsers />, 
              title: "Soft Skills", 
              skills: [
                { name: "Problem-Solving & DSA", level: 95 },
                { name: "System Design (LLD & HLD)", level: 80 },
                { name: "Team Collaboration", level: 90 },
                { name: "Agile / Scrum", level: 85 },
                { name: "Communication", level: 90 },
                { name: "Leadership & Mentoring", level: 80 },
                { name: "Time Management", level: 85 },
              ] 
            }
          ].map((category, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isSkillsInView ? "visible" : "hidden"}
              variants={skillCard}
              whileHover="hover"
            >
              <h3 style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.8rem", color: "#e0fbfc", textShadow: "0 0 10px rgba(224, 251, 252, 0.4)" }}>
                {category.icon} {category.title}
              </h3>
              {category.skills.map((skill, j) => (
                <div key={j} style={{ marginBottom: "0.8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.95rem", color: "#00bfff" }}>{skill.name}</span>
                    <span style={{ fontSize: "0.85rem", color: "#00ffff" }}>{skill.level}%</span>
                  </div>
                  <ProgressBar>
                    <ProgressFill
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: j * 0.2 }}
                    />
                  </ProgressBar>
                </div>
              ))}
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id="internships" ref={internshipsRef}>
        <SectionTitle
          initial="hidden"
          animate={isInternshipsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaUsers /> Professional Experience
        </SectionTitle>
        <Grid>
          {[
            {
              title: "AI/ML Intern – Smart Sorting Project",
              company: "SmartBridge (Remote)",
              duration: "May 2025 – June 2025",
              desc: "Led development of CNN model for real-time disease detection in agriculture, integrated with MERN dashboard for MNC-scale deployment.",
              tech: ["Python", "CNN", "Flask", "TensorFlow/Keras", "MERN Integration"],
              concepts: ["Deep Learning", "Computer Vision", "Scalable Deployment"],
              gitLink: "https://github.com/bhagavan444/smartbridge-internship",
              certLink: "https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view",
              impact: "Achieved 94% accuracy in production",
            },
            {
              title: "Machine Learning & Data Science Intern",
              company: "Blackbucks (Remote)",
              duration: "May 2024 – June 2024",
              desc: "Optimized regression models for real estate prediction, built MERN API for data visualization, contributing to MNC analytics pipeline.",
              tech: ["Python", "Scikit-learn", "Pandas", "MERN API"],
              concepts: ["Regression", "Feature Engineering", "API Design"],
              gitLink: "https://github.com/bhagavan444/blackbucks-internship",
              certLink: "https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view",
              impact: "Boosted model precision by 15%",
            },
          ].map((intern, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isInternshipsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 style={{ fontSize: "1.7rem", color: "#e0fbfc", textShadow: "0 0 10px rgba(224, 251, 252, 0.4)" }}>
                {intern.title} – {intern.company}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#00bfff" }}>
                {intern.duration}
              </p>
              <p style={{ fontSize: "1.2rem", color: "#e0fbfc", lineHeight: "1.6" }}>
                {intern.desc}
              </p>
              {intern.impact && (
                <p style={{ fontSize: "1rem", color: "#00ffff", fontWeight: "600" }}>
                  <FaChartLine /> Impact: {intern.impact}
                </p>
              )}
              <Tags>
                {intern.tech.map((tech) => (
                  <Tag key={tech} whileHover={{ scale: 1.1 }}>{tech}</Tag>
                ))}
                {intern.concepts.map((concept) => (
                  <Tag key={concept} className="concept" whileHover={{ scale: 1.1 }}>
                    {concept}
                  </Tag>
                ))}
              </Tags>
              <Links>
                <Link href={intern.gitLink} target="_blank" rel="noreferrer">
                  <FaGithub /> GitHub
                </Link>
                <Link href={intern.certLink} target="_blank" rel="noreferrer">
                  <FaCertificate /> Certificate
                </Link>
              </Links>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id="certifications" ref={certificationsRef}>
        <SectionTitle
          initial="hidden"
          animate={isCertificationsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaAward /> Certifications (19+)
        </SectionTitle>
        <div>
          <p style={{ color: "#e0fbfc", fontSize: "1.7rem", marginBottom: "1.5rem", textAlign: "center", lineHeight: "1.6" }}>
            Validated expertise in MERN, cloud, AI/ML, and DevOps—tailored for MNC roles with hands-on project proofs.
          </p>
          <Grid>
            {[
              {
                title: "Java",
                concepts: [
                  "Core OOP Principles (Abstraction, Encapsulation, Inheritance, Polymorphism)",
                  "Collections Framework (List, Set, Map, Queue)",
                  "Exception Handling & Custom Exceptions",
                  "Multithreading & Concurrency (synchronized, volatile, Executors)",
                  "Java 8+ Features (Streams, Lambdas, Optional, Functional Interfaces)",
                  "JVM Architecture & Memory Management (Heap, Stack, GC)",
                  "Design Patterns in Java (Singleton, Factory, Observer)",
                  "Serialization & Deserialization"
                ],
                certLink: "https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link",
              },
              {
                title: "C for Everyone – Coursera",
                concepts: [
                  "Pointers & Memory Management",
                  "Arrays & Strings",
                  "Structures, Unions & Enums",
                  "Dynamic Memory (malloc, calloc, realloc, free)",
                  "File I/O",
                  "Bitwise Operations",
                  "Function Pointers & Callbacks",
                  "Preprocessor Directives & Macros"
                ],
                certLink: "https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link",
              },
              {
                title: "Python",
                concepts: [
                  "OOP & Classes",
                  "File Handling (CSV, JSON, TXT)",
                  "Modules & Packages (import, __init__)",
                  "List/Dict/Set Comprehensions",
                  "Exception Handling (try-except-finally)",
                  "Standard Libraries (os, sys, math, datetime)",
                  "NumPy & Pandas Basics",
                  "Decorators & Generators",
                  "Virtual Environments & Package Management"
                ],
                certLink: "https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link",
              },
              {
                title: "React",
                concepts: [
                  "JSX & Components",
                  "Props & State",
                  "Hooks (useState, useEffect, useRef, useContext)",
                  "React Router (Navigation, Params)",
                  "Conditional Rendering & Lists",
                  "Performance Optimization (memo, lazy, Suspense)",
                  "Redux / Context API for State Management",
                  "Error Boundaries",
                  "Testing (Jest, React Testing Library)"
                ],
                certLink: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link",
              },
              {
                title: "AWS Certified",
                concepts: [
                  "EC2, S3, EBS Basics",
                  "IAM Roles, Policies & Security Best Practices",
                  "VPC, Subnets, Gateways",
                  "Lambda Functions (Serverless)",
                  "CloudFormation Basics",
                  "Auto Scaling & Load Balancing",
                  "Monitoring (CloudWatch, CloudTrail)",
                  "Databases (RDS, DynamoDB)"
                ],
                certLink: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link",
              },
              {
                title: "R Programming",
                concepts: [
                  "R Syntax & Data Types",
                  "Data Frames, Lists, Matrices",
                  "dplyr & ggplot2 for Data Analysis",
                  "Statistical Models (Regression, ANOVA)",
                  "Data Cleaning & Transformation",
                  "Hypothesis Testing",
                  "Packages & Libraries",
                  "Visualization Techniques"
                ],
                certLink: "https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing",
              },
              {
                title: "Django",
                concepts: [
                  "MTV (Model-Template-View) Architecture",
                  "Django ORM Queries",
                  "Authentication & Authorization",
                  "Forms & Templates",
                  "REST API with Django REST Framework (DRF)",
                  "Middleware",
                  "Deployment Basics (Gunicorn, Nginx, Heroku/AWS)"
                ],
                certLink: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
              },
              {
                title: "ServiceNow",
                concepts: [
                  "ITSM Fundamentals",
                  "Scripting in ServiceNow (Client & Server Scripts)",
                  "Workflows & Business Rules",
                  "CMDB Management",
                  "Integration with APIs",
                  "Incident, Problem & Change Management"
                ],
                certLink: "https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view",
              },
              {
                title: "ML Using Python",
                concepts: [
                  "Supervised vs Unsupervised Learning",
                  "Regression (Linear, Logistic)",
                  "Classification (SVM, Decision Tree, Random Forest)",
                  "Feature Engineering & Scaling",
                  "Model Evaluation (Accuracy, Precision, Recall, F1, ROC)",
                  "Overfitting vs Underfitting",
                  "Cross Validation",
                  "Clustering (K-Means, Hierarchical)"
                ],
                certLink: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
              },
              {
                title: "AWS",
                concepts: [
                  "Cloud Computing Basics",
                  "Elastic Load Balancer",
                  "Auto Scaling",
                  "Serverless (Lambda)",
                  "Storage (S3, Glacier)",
                  "Databases (RDS, DynamoDB)",
                  "Networking (VPC, Route 53)"
                ],
                certLink: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
              },
              
{
  title: "R Programming",
  concepts: [
    "R Syntax & Data Types",
    "Data Frames, Lists, Matrices",
    "dplyr & ggplot2 for Data Analysis",
    "Statistical Models (Regression, ANOVA)",
    "Data Cleaning & Transformation",
    "Hypothesis Testing",
    "Packages & Libraries",
    "Visualization Techniques"
  ],
  certLink: "https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing",
},
{
  title: "Django",
  concepts: [
    "MTV (Model-Template-View) Architecture",
    "Django ORM Queries",
    "Authentication & Authorization",
    "Forms & Templates",
    "REST API with Django REST Framework (DRF)",
    "Middleware",
    "Deployment Basics (Gunicorn, Nginx, Heroku/AWS)"
  ],
  certLink: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
},
{
  title: "ServiceNow",
  concepts: [
    "ITSM Fundamentals",
    "Scripting in ServiceNow (Client & Server Scripts)",
    "Workflows & Business Rules",
    "CMDB Management",
    "Integration with APIs",
    "Incident, Problem & Change Management"
  ],
  certLink: "https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view",
},
{
  title: "ML Using Python",
  concepts: [
    "Supervised vs Unsupervised Learning",
    "Regression (Linear, Logistic)",
    "Classification (SVM, Decision Tree, Random Forest)",
    "Feature Engineering & Scaling",
    "Model Evaluation (Accuracy, Precision, Recall, F1, ROC)",
    "Overfitting vs Underfitting",
    "Cross Validation",
    "Clustering (K-Means, Hierarchical)"
  ],
  certLink: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
},
{
  title: "AWS",
  concepts: [
    "Cloud Computing Basics",
    "Elastic Load Balancer",
    "Auto Scaling",
    "Serverless (Lambda)",
    "Storage (S3, Glacier)",
    "Databases (RDS, DynamoDB)",
    "Networking (VPC, Route 53)"
  ],
  certLink: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
},
{
  title: "Mastering the Art of Programming - IBM Skills",
  concepts: [
    "Algorithm Design",
    "Problem Solving Strategies",
    "Time & Space Complexity",
    "Recursion & Dynamic Programming",
    "Code Debugging & Testing",
    "Clean Code Practices",
    "Optimization Techniques"
  ],
  certLink: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing",
},
{
  title: "Software Engineering",
  concepts: [
    "SDLC Models (Waterfall, Agile, Spiral)",
    "Agile & Scrum Practices",
    "UML Diagrams (Use Case, Class, Sequence)",
    "Design Patterns (Factory, Singleton, MVC)",
    "Testing (Unit, Integration, System, UAT)",
    "Version Control (Git, GitHub/GitLab)",
    "Code Reviews & Best Practices"
  ],
  certLink: "https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing",
},
{
  title: "Continuous Integration and Continuous Delivery",
  concepts: [
    "CI/CD Pipelines",
    "Jenkins & GitHub Actions",
    "Git Integration",
    "Dockerization",
    "Automated Testing",
    "Kubernetes Basics",
    "Monitoring & Rollbacks"
  ],
  certLink: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing",
},
{
  title: "Large Language Models",
  concepts: [
    "Transformers & Attention Mechanism",
    "Tokenization (BPE, WordPiece)",
    "Fine-Tuning & Transfer Learning",
    "Prompt Engineering",
    "NLP Tasks (Text Classification, Summarization, QA)",
    "Applications of LLMs (Chatbots, Code Assistants)"
  ],
  certLink: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing",
},
{
  title: "Chatbot Development",
  concepts: [
    "NLP & Intent Recognition",
    "Dialog Management",
    "Entity Extraction",
    "API Integration",
    "Context Management",
    "Voice vs Text Bots",
    "Evaluation Metrics (Confusion Matrix, Accuracy)"
  ],
  certLink: "https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing",
},
{
  title: "HTML",
  concepts: [
    "HTML5 Semantic Tags",
    "Forms & Validation",
    "Canvas & Media Elements",
    "Accessibility (ARIA, a11y)",
    "SEO Basics",
    "DOM Structure & Manipulation"
  ],
  certLink: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link",
},
{
  title: "CSS",
  concepts: [
    "Flexbox & Grid Layout",
    "Responsive Design (Media Queries)",
    "Animations & Transitions",
    "Pseudo Classes & Pseudo Elements",
    "CSS Variables & Custom Properties",
    "SCSS/SASS Basics"
  ],
  certLink: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link",
},
{
  title: "Mastering Python",
  concepts: [
    "Advanced OOP (Inheritance, MRO, Metaclasses)",
    "Iterators & Generators",
    "Decorators",
    "Threading & Multiprocessing",
    "Asyncio (Async/Await)",
    "Error Handling & Logging",
    "Modules & Virtual Environments",
    "Testing (unittest, pytest)"
  ],
  certLink: "https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link",
},
{
  title: "MLOps",
  concepts: [
    "Model Deployment (Flask, FastAPI, Streamlit)",
    "CI/CD for ML Pipelines",
    "Monitoring & Logging (MLFlow, Prometheus)",
    "Docker & Kubernetes Basics",
    "Data Pipelines (Airflow, Prefect)",
    "Scalability & Automation",
    "Model Registry & Versioning"
  ],
  certLink: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link",
},
{
  title: "JavaScript",
  concepts: [
    "ES6+ Features (let/const, arrow functions, spread/rest)",
    "DOM Manipulation",
    "Event Handling & Event Bubbling",
    "Promises & Async/Await",
    "Closures & Scope",
    "Prototypes & Inheritance",
    "Modules (import/export)",
    "Fetch API & AJAX"
  ],
  certLink: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link",
},

            ].map((cert, i) => (
              <Card
                key={i}
                initial="hidden"
                animate={isCertificationsInView ? "visible" : "hidden"}
                variants={fadeInUp}
                whileHover="hover"
              >
                <h3
                  style={{
                    fontSize: "1.4rem",
                    color: "#e0fbfc",
                    textShadow: "0 0 10px rgba(224, 251, 252, 0.4)",
                  }}
                >
                  {cert.title}
                </h3>
                <Tags>
                  {cert.concepts.map((concept, j) => (
                    <Tag key={j} className="concept" whileHover={{ scale: 1.1 }}>
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
                  >
                    <FiEye /> View Cert
                  </ModalButton>
                </Links>
              </Card>
            ))}
          </Grid>
        </div>
      </Section>

      <Section id="workshops" ref={workshopsRef}>
        <SectionTitle
          initial="hidden"
          animate={isWorkshopsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaBook /> Workshops & Training
        </SectionTitle>
        <Grid>
          {[
            {
  title: "Machine Learning with Python",
  desc: "Comprehensive hands-on workshop on machine learning fundamentals, including data preprocessing, model building, and evaluation using Python. Integrated MERN for dashboard visualization.",
  tags: ["Python", "Machine Learning", "Data Preprocessing", "Model Evaluation", "MERN Dashboard"],
  year: "2024",
  impact: "Applied concepts to build 3+ production-ready models",
},
{
  title: "Deep Learning with TensorFlow",
  desc: "In-depth exploration of deep learning concepts, neural network architectures, and practical implementations using TensorFlow and Keras, with MERN frontend demos.",
  tags: ["TensorFlow", "Keras", "Neural Networks", "CNN", "MERN Frontend"],
  year: "2025",
  impact: "Developed CNN models with 95% accuracy",
},
{
  title: "Mobile App Development",
  desc: "Workshop on building responsive and feature-rich mobile applications using modern frameworks like React Native, bridged with MERN backend.",
  tags: ["React Native", "Mobile App Development", "Cross-Platform", "MERN Backend", "UI/UX"],
  year: "2023",
  impact: "Prototyped 2 cross-platform apps",
},
{
  title: "Full-Stack Web Development",
  desc: "End-to-end web development training covering frontend (React), backend (Node.js, Express), and database integration (MongoDB) using the MERN stack.",
  tags: ["Full-Stack Development", "React.js", "Node.js", "Express.js", "MongoDB", "Deployment"],
  year: "2022",
  impact: "Deployed 5+ full-stack projects to production",
},
{
  title: "Artificial Intelligence & Data Science Workshop",
  desc: "Hands-on workshop covering fundamentals of AI, Machine Learning, and Data Science, including practical applications and projects with MERN UIs.",
  tags: ["Artificial Intelligence", "Data Science", "Machine Learning", "MERN UI", "Applied AI"],
  year: "2022",
  impact: "Collaborated on AI-driven MERN app",
},
{
  title: "Web Development Workshop",
  desc: "Hands-on workshop covering frontend development with HTML, CSS, and JavaScript, including practical projects and real-world applications leading to MERN.",
  tags: ["HTML", "CSS", "JavaScript", "Frontend Development", "MERN Foundation"],
  year: "2022",
  impact: "Built foundational skills for 10+ MERN projects",
},

          ].map((workshop, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isWorkshopsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 style={{ fontSize: "1.6rem", color: "#e0fbfc", textShadow: "0 0 8px rgba(224, 251, 252, 0.3)" }}>
                {workshop.title}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#00bfff" }}>
                {workshop.year}
              </p>
              <p style={{ fontSize: "1.2rem", color: "#e0fbfc", lineHeight: "1.6" }}>
                {workshop.desc}
              </p>
              {workshop.impact && (
                <p style={{ fontSize: "1rem", color: "#00ffff", fontWeight: "600" }}>
                  <FaChartLine /> Impact: {workshop.impact}
                </p>
              )}
              <Tags>
                {workshop.tags.map((tag) => (
                  <Tag key={tag} whileHover={{ scale: 1.1 }}>{tag}</Tag>
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
          <FaTrophy /> Hackathons & Competitions
        </SectionTitle>
        <Grid>
          <Card
            initial="hidden"
            animate={isHackathonsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            whileHover="hover"
          >
            <h3
              style={{
                fontSize: "1.6rem",
                color: "#e0fbfc",
                textShadow: "0 0 8px rgba(224, 251, 252, 0.3)",
              }}
            >
              24-Hour Hackathon – Brainovision, RCE Eluru
            </h3>
            <p style={{ fontSize: "1.3rem", color: "#00bfff" }}>2025</p>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#e0fbfc",
                lineHeight: "1.6",
              }}
            >
              Developed a full-stack web platform for buying and selling second-hand electronics using MERN stack, implementing user authentication, product listing, and real-time transactions within 24 hours.
            </p>
            <p style={{ fontSize: "1rem", color: "#00ffff", fontWeight: "600" }}>
              <FaChartLine /> Impact: Won 2nd place; deployed live app with 100+ users
            </p>
            <Tags>
             <Tag whileHover={{ scale: 1.1 }}>MERN Stack</Tag>
<Tag whileHover={{ scale: 1.1 }}>E-Commerce</Tag>
<Tag whileHover={{ scale: 1.1 }}>Online Marketplace</Tag>
<Tag whileHover={{ scale: 1.1 }}>React.js</Tag>
<Tag whileHover={{ scale: 1.1 }}>Node.js</Tag>
<Tag whileHover={{ scale: 1.1 }}>MongoDB</Tag>
<Tag whileHover={{ scale: 1.1 }}>Express.js</Tag>
<Tag whileHover={{ scale: 1.1 }}>Authentication</Tag>
<Tag whileHover={{ scale: 1.1 }}>REST API</Tag>
<Tag whileHover={{ scale: 1.1 }}>Payment Integration</Tag>
<Tag whileHover={{ scale: 1.1 }}>Deployment</Tag>

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
  desc: "Completed a 100-day streak of solving data structures and algorithms problems, reinforcing core logic essential for AI model optimization and scalable data-driven applications.",
  tags: ["LeetCode", "DSA", "Problem-Solving", "AI Optimization"],
  link: "https://leetcode.com/u/AxZsDhEeto/",
  impact: "Solved 300+ problems, improved algorithm efficiency and applied concepts to AI/DS case studies.",
},
{
  title: "HackerRank Challenges",
  desc: "Practicing algorithms and coding challenges to strengthen problem-solving skills, applied in data preprocessing, model training, and interview preparation.",
  tags: ["HackerRank", "Algorithms", "Coding", "Data Science Prep"],
  link: "https://www.hackerrank.com/profile/g_sivasatyasaib1",
  impact: "Achieved top 20% ranking; earned badges in problem-solving and Python for AI/DS.",
},
{
  title: "CodeChef Contests",
  desc: "Competed in timed contests to enhance coding speed, logical reasoning, and efficiency—skills directly useful in optimizing AI workflows and handling big datasets.",
  tags: ["CodeChef", "Competitive Programming", "Efficiency", "Data Structures"],
  link: "https://www.codechef.com/users/bhagavan444",
  impact: "Participated in 20+ contests; built a habit of writing optimized, production-ready code for AI/DS projects.",
},

          ].map((platform, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isCodingInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 style={{ fontSize: "1.5rem", color: "#e0fbfc", textShadow: "0 0 8px rgba(224, 251, 252, 0.3)" }}>
                {platform.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e0fbfc", lineHeight: "1.6" }}>
                {platform.desc}
              </p>
              {platform.impact && (
                <p style={{ fontSize: "1rem", color: "#00ffff", fontWeight: "600" }}>
                  <FaChartLine /> Impact: {platform.impact}
                </p>
              )}
              <Tags>
                {platform.tags.map((tag) => (
                  <Tag key={tag} whileHover={{ scale: 1.1 }}>{tag}</Tag>
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
          <FaLightbulb /> Hobbies & Interests
        </SectionTitle>
        <Grid>
          {[
           {
  title: "Coding Challenges",
  desc: "Solving algorithmic and system design problems on platforms like LeetCode, HackerRank, and Codeforces to strengthen problem-solving and full-stack development skills.",
  tags: ["Problem-Solving", "DSA", "Full-Stack Practice"],
  impact: "Solved 500+ problems and maintained daily GitHub contributions.",
},
{
  title: "Technical Blogging",
  desc: "Authoring blogs on Medium about MERN stack, AI, and emerging technologies to share knowledge and simplify complex concepts for developers.",
  tags: ["Content Creation", "Technical Writing", "Knowledge Sharing"],
  impact: "Published 10+ articles reaching 1,000+ readers globally.",
},
{
  title: "AI & Emerging Tech Exploration",
  desc: "Experimenting with AI-driven applications, integrating LLMs and machine learning models into MERN projects to build innovative prototypes.",
  tags: ["AI", "Innovation", "MERN Integration"],
  impact: "Developed 5+ AI-powered MERN prototypes demonstrating real-world use cases.",
},

          ].map((hobby, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isHobbiesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 style={{ fontSize: "1.5rem", color: "#e0fbfc", textShadow: "0 0 8px rgba(224, 251, 252, 0.3)" }}>
                {hobby.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e0fbfc", lineHeight: "1.6" }}>
                {hobby.desc}
              </p>
              {hobby.impact && (
                <p style={{ fontSize: "1rem", color: "#00ffff", fontWeight: "600" }}>
                  <FaChartLine /> Impact: {hobby.impact}
                </p>
              )}
              <Tags>
                {hobby.tags.map((tag) => (
                  <Tag key={tag} whileHover={{ scale: 1.1 }}>{tag}</Tag>
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
  title: "Technical Workshops & Seminars",
  desc: "Organized and delivered workshops on MERN stack, Python, and AI/ML topics to help peers upskill in modern technologies.",
  tags: ["Public Speaking", "Mentorship", "Knowledge Sharing"],
  impact: "Trained 100+ students across 5 workshops, enhancing community technical literacy.",
},

{
  title: "Certifications & Online Learning",
  desc: "Earned certifications in Full-Stack Development, Machine Learning, and Cloud Technologies to stay updated with industry trends.",
  tags: ["Continuous Learning", "Skill Development", "Certifications"],
  impact: "Completed 8+ certifications from platforms like Coursera, Udemy, and Google Cloud.",
},

          ].map((activity, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isExtracurricularInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 style={{ fontSize: "1.5rem", color: "#e0fbfc", textShadow: "0 0 8px rgba(224, 251, 252, 0.3)" }}>
                {activity.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e0fbfc", lineHeight: "1.6" }}>
                {activity.desc}
              </p>
              {activity.impact && (
                <p style={{ fontSize: "1rem", color: "#00ffff", fontWeight: "600" }}>
                  <FaChartLine /> Impact: {activity.impact}
                </p>
              )}
              <Tags>
                {activity.tags.map((tag) => (
                  <Tag key={tag} whileHover={{ scale: 1.1 }}>{tag}</Tag>
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
          <FaEnvelopeOpenText /> Get In Touch
        </SectionTitle>
        <ContactIntro
          initial="hidden"
          animate={isContactInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Ready to build scalable MERN solutions for your MNC? Let's collaborate on innovative projects.
        </ContactIntro>
        <AnimatePresence>
          {isSent && (
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              Message sent successfully! 🚀
            </SuccessMessage>
          )}
        </AnimatePresence>
        <Form
          initial="hidden"
          animate={isContactInView ? "visible" : "hidden"}
          variants={fadeInUp}
          ref={form}
          onSubmit={sendEmail}
        >
          <Input type="text" name="user_name" placeholder="Your Name" required />
          <Input type="email" name="user_email" placeholder="Your Gmail" required />
          <Textarea
            name="message"
            placeholder="Tell me about your project—let's make it MERN-powered!"
            required
            onChange={(e) => setMessageLength(e.target.value.length)}
          />
          <CharCount>{messageLength}/{maxMessageLength}</CharCount>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          <SubmitButton 
            type="submit" 
            disabled={isSubmitting}
            whileHover={isSubmitting ? {} : "hover"}
          >
            {isSubmitting ? "Sending..." : <><FiSend style={{ marginRight: '0.5rem' }} /> Submit</>}
          </SubmitButton>
        </Form>
      </ContactSection>

      {/* Resume Section */}
      <Section id="resume" ref={resumeRef}>
        <SectionTitle
          initial="hidden"
          animate={isResumeInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <FaAward /> Resume & Portfolio
        </SectionTitle>
        <Grid>
          <Card
            initial="hidden"
            animate={isResumeInView ? "visible" : "hidden"}
            variants={fadeInUp}
            whileHover="hover"
          >
            <h3 style={{ fontSize: "1.6rem", color: "#e0fbfc", textShadow: "0 0 8px rgba(224, 251, 252, 0.3)" }}>
              My Professional Resume
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#e0fbfc", lineHeight: "1.6" }}>
              Comprehensive overview of my MERN expertise, AI projects, and MNC-ready skills. Tailored for full-stack roles. View in-app for seamless experience.
            </p>
            <Links style={{ justifyContent: 'center', gap: '2rem' }}>
              <ModalButton
                onClick={openResumeModal}
                whileHover="hover"
              >
                <FiEye /> View Resume
              </ModalButton>
              <Link href={resumePdf} download="Siva_Bhagavan_MERN_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <FiDownload /> Download PDF
              </Link>
            </Links>
          </Card>
        </Grid>
      </Section>

      {/* Footer */}
      <Footer>
        <FooterContent
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
        >
          <FooterTitle variants={fadeInUp}>Siva Satya Sai Bhagavan <FaBolt style={{ fontSize: '1.2rem', marginLeft: '0.3rem' }} /></FooterTitle>
          <FooterText variants={fadeInUp}>© 2025 | Crafting the Future of MERN Development | Full-Stack Innovator</FooterText>
          <FooterLinks>
            <FooterLink href="#home" variants={fadeInUp}>Home</FooterLink>
            <FooterLink href="#about" variants={fadeInUp}>About</FooterLink>
            <FooterLink href="#projects" variants={fadeInUp}>Projects</FooterLink>
            <FooterLink href="#skills" variants={fadeInUp}>Skills</FooterLink>
            <FooterLink href="#resume" variants={fadeInUp}>Resume</FooterLink>
            <FooterLink href="#contact" variants={fadeInUp}>Contact</FooterLink>
          </FooterLinks>
          <FooterSocials>
            <SocialLink href="mailto:g.sivasatyasaibhagavan@gmail.com">
              <FaEnvelope />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="https://github.com/bhagavan444" target="_blank" rel="noreferrer">
              <FaGithub />
            </SocialLink>
          </FooterSocials>
        </FooterContent>
      </Footer>

      {showTopBtn && (
        <ScrollTop 
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </ScrollTop>
      )}

      <AnimatePresence>
        {showResumeModal && (
          <ResumeModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ModalContent>
              <CloseButton 
                whileHover={{ scale: 1.2, rotate: 90 }}
                onClick={() => setShowResumeModal(false)}
              >
                <FiX />
              </CloseButton>
              <iframe
                src={resumePdf}
                title="Resume"
                style={{ width: "100%", height: "70vh", border: "none", borderRadius: "15px" }}
              />
              <ModalButton as="a" href={resumePdf} download="Siva_Bhagavan_MERN_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <FiDownload /> Download
              </ModalButton>
            </ModalContent>
          </ResumeModal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Home;