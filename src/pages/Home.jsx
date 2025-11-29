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
  height: clamp(70px, 10vh, 90px);
  background: linear-gradient(135deg, 
    rgba(5, 15, 35, 0.98) 0%, 
    rgba(10, 25, 55, 0.95) 50%, 
    rgba(8, 20, 45, 0.98) 100%
  );
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(0, 240, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  z-index: 9999;
  padding: 0 clamp(2rem, 5vw, 4rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  /* Dynamic neon glow line that breathes */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, 
      #00f0ff 0%, 
      #ff00ff 30%, 
      #7928ff 50%, 
      #ff00ff 70%, 
      #00f0ff 100%
    );
    background-size: 200% 100%;
    animation: neonFlow 8s linear infinite;
    box-shadow: 0 0 20px #00f0ff, 0 0 40px #ff00ff;
    opacity: 0.9;
  }

  /* Subtle grid overlay for depth */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 255, 0.03) 2px,
      rgba(0, 255, 255, 0.03) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(255, 0, 255, 0.03) 2px,
      rgba(255, 0, 255, 0.03) 4px
    );
    pointer-events: none;
    opacity: 0.6;
  }

  @keyframes neonFlow {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }
`;

const NavBrand = styled.a`
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  font-weight: 900;
  font-size: clamp(1rem, 4vw, 1.5rem);
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #e0fbfc;
  text-decoration: none;
  position: relative;
  z-index: 2;

  /* Holographic gradient text */
  background: linear-gradient(
    90deg,
    #00ffff 0%,
    #00ff9d 20%,
    #7c3aed 40%,
    #ff00ff 60%,
    #00ffff 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: holographicShift 6s linear infinite;

  /* Subtle floating glow */
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.6),
    0 0 30px rgba(0, 255, 255, 0.3);

  &::after {
    content: '★';
    margin-left: 8px;
    color: #00f0ff;
    font-size: 0.8em;
    opacity: 0;
    animation: starPulse 3s infinite;
  }
  &:hover::after {
    opacity: 1;
  }

  @keyframes holographicShift {
    to { background-position: 200% center; }
  }

  @keyframes starPulse {
    0%, 100% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.3); }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: clamp(1.8rem, 3vw, 3.2rem);        /* Reduced gap — looks tighter & more elegant */
  align-items: center;
  margin-left: auto;
  
  /* Still keeps CONTACT safely away from the edge */
  padding-right: clamp(2.5rem, 6vw, 6rem);

  @media (max-width: 1024px) {
    gap: clamp(1.4rem, 2.6vw, 2.4rem);     /* Tighter on tablets */
    padding-right: clamp(2rem, 5vw, 4.5rem);
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100dvh;
    width: 300px;
    max-width: 88vw;
    background: rgba(5, 15, 35, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 1.5rem;
    gap: clamp(2.4rem, 6vw, 3.6rem);      /* Slightly reduced mobile gap too */
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: -12px 0 60px rgba(0, 212,255,0.22);
    z-index: 9999;

    &.active {
      transform: translateX(0);
    }
  }

  @media (max-width: 480px) {
    width: 280px;
    max-width: 92vw;
    padding: 2rem 1.2rem;
    gap: 2.6rem;                          /* Clean & balanced on small phones */
  }
`;

const NavLink = styled.a`
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(224, 251, 252, 0.9);
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.4s ease;

  /* Electric underline effect */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00f0ff, #ff00ff);
    transition: all 0.5s ease;
    transform: translateX(-50%);
    box-shadow: 0 0 15px currentColor;
  }

  &:hover {
    color: #00f0ff;
    text-shadow: 
      0 0 20px rgba(0, 240, 255, 0.8),
      0 0 40px rgba(0, 240, 255, 0.4);
    transform: translateY(-3px);
  }

  &:hover::before {
    width: 100%;
  }

  /* Active state glow */
  &.active {
    color: #00ffff;
    text-shadow: 0 0 20px #00ffff;
  }

  &.active::before {
    width: 100%;
    height: 3px;
    animation: pulseLine 2s infinite;
  }

  @keyframes pulseLine {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; box-shadow: 0 0 25px #00ffff; }
  }
`;

// Optional: Mobile menu toggle button (you can style it separately)
const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: #00f0ff;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 10000;

  @media (max-width: 768px) {
    display: block;
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
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(10, 25, 47, 0.9), rgba(17, 34, 64, 0.7));
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 255, 0.1);
  backdrop-filter: blur(5px);

  /* Subtle animated overlay for premium feel */
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    animation: orbit 15s linear infinite;
    z-index: -1;
  }

  /* Parallax effect for inner content */
  & > * {
    position: relative;
    will-change: transform;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(10, 25, 47, 0.95), rgba(17, 34, 64, 0.85));
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25), 0 0 10px rgba(0, 255, 255, 0.08);
  }

  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
  }
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  perspective: 2000px;
  filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.6));
`;

const ProfileImage = styled(motion.img)`
  width: clamp(260px, 28vw, 340px);
  height: clamp(260px, 28vw, 340px);
  border-radius: 36px;
  object-fit: cover;
  position: relative;
  z-index: 3;
  background: #000;
  overflow: hidden;
  transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;

  /* === EPIC MULTI-LAYER BORDER MAGIC === */
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 44px;
    background: conic-gradient(
      from 0deg,
      #00ffff 0deg,
      #7c3aed 60deg,
      #ff2df0 120deg,
      #00ffea 180deg,
      #8b5cf6 240deg,
      #00ffff 360deg
    );
    background-size: 200% 200%;
    animation: borderRotate 16s linear infinite;
    padding: 5px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
    filter: blur(1px);
  }

  /* Inner neon edge glow */
  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 32px;
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.2));
    filter: blur(20px);
    opacity: 0.8;
    z-index: -1;
    animation: innerPulse 8s ease-in-out infinite;
  }

  /* Micro grid overlay – pure cyberpunk */
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 255, 255, 0.03) 8px, rgba(0, 255, 255, 0.03) 16px),
    repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255, 0, 255, 0.03) 8px, rgba(255, 0, 255, 0.03) 16px);
  background-size: 100% 100%;

  /* HOVER = GOD MODE */
  &:hover {
    transform: translateY(-24px) scale(1.1) rotateY(8deg);
    filter: brightness(1.35) contrast(1.25) saturate(1.4);
    box-shadow: 
      0 60px 120px rgba(0, 0, 0, 0.8),
      0 0 140px rgba(0, 212, 255, 1),
      inset 0 0 90px rgba(255, 255, 255, 0.25);
  }

  /* Responsive perfection */
  @media (max-width: 768px) {
    width: clamp(220px, 48vw, 300px);
    height: clamp(220px, 48vw, 300px);
    border-radius: 32px;
    &::before { inset: -6px; padding: 4px; }
    &:hover { transform: translateY(-16px) scale(1.07) rotateY(5deg); }
  }

  @media (max-width: 480px) {
    width: clamp(190px, 64vw, 260px);
    height: clamp(190px, 64vw, 260px);
    border-radius: 28px;
    &::before { inset: -5px; padding: 3.5px; }
  }

  /* Animations – buttery smooth */
  @keyframes borderRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes innerPulse {
    0%, 100% { opacity: 0.6; transform: scale(0.98); }
    50% { opacity: 0.9; transform: scale(1.06); }
  }
`;
const ProfileRing = styled(motion.div)`
  position: absolute;
  top: -16px;
  left: -16px;
  width: calc(100% + 32px);
  height: calc(100% + 32px);
  border-radius: 38px;
  pointer-events: none;
  z-index: 2; /* Below image, above container glow */
  isolation: isolate; /* Critical fix: prevents blending/flicker with navbar */
  
  /* Super lightweight rotating ring — buttery smooth */
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #00d4ff 40deg,
    #7b2fff 100deg,
    #ff4da6 160deg,
    #00ffa3 220deg,
    transparent 320deg,
    #00d4ff 360deg
  );
  background-size: 180% 180%;
  animation: ringRotate 20s linear infinite;
  padding: 3px;
  border-radius: 38px;

  /* Mask trick for crisp border */
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  /* Minimal glow — no heavy shadows */
  filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.5));

  /* Remove all ::before/::after heavy effects — causes flicker on scroll */
  /* Only keep pure background animation = zero repaint issues */

  @media (max-width: 768px) {
    top: -12px;
    left: -12px;
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    padding: 2.5px;
  }

  @keyframes ringRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: clamp(3rem, 6vw, 5rem) clamp(2.5rem, 5vw, 5rem);
  border-radius: 40px;
  overflow: hidden;
  isolation: isolate;
  z-index: 1;

  /* Deep space glass with holographic depth */
  background: 
    radial-gradient(circle at 30% 20%, rgba(0, 255, 255, 0.08), transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.07), transparent 50%),
    linear-gradient(135deg,
      rgba(6, 14, 35, 0.98) 0%,
      rgba(10, 22, 52, 0.94) 40%,
      rgba(8, 16, 40, 0.98) 100%
    );

  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  /* Triple-border glow system — absolutely insane */
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.7),
    0 0 80px rgba(0, 212, 255, 0.25),
    inset 0 0 80px rgba(255, 255, 255, 0.06),
    inset 0 0 120px rgba(0, 212, 255, 0.08);

  /* Animated energy field grid */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 40px;
    background: 
      repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0, 255, 255, 0.03) 41px),
      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255, 0, 255, 0.03) 41px);
    opacity: 0.6;
    animation: gridShift 30s linear infinite;
    pointer-events: none;
  }

  /* Floating quantum orbs with subtle orbit */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    background: 
      radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.3), transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(138, 43, 226, 0.25), transparent 40%);
    border-radius: 50%;
    filter: blur(80px);
    transform: translate(-50%, -50%);
    opacity: 0.5;
    animation: quantumFloat 20s ease-in-out infinite;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  /* Subtle corner energy sparks */
  > .spark {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #00ffff;
    border-radius: 50%;
    box-shadow: 0 0 20px #00ffff;
    animation: sparkPulse 4s infinite;
  }

  > .spark:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
  > .spark:nth-child(2) { top: 15%; right: 12%; animation-delay: 1.2s; }
  > .spark:nth-child(3) { bottom: 20%; left: 8%; animation-delay: 2.4s; }
  > .spark:nth-child(4) { bottom: 12%; right: 15%; animation-delay: 3.6s; }

  /* Responsive perfection */
  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
    padding: clamp(3rem, 7vw, 4.5rem) clamp(2rem, 5vw, 4rem);
  }

  @media (max-width: 768px) {
    padding: clamp(2.5rem, 6vw, 4rem) 2rem;
    border-radius: 32px;
    &::before { opacity: 0.3; } /* Lighter grid on mobile */
    &::after { width: 400px; height: 400px; filter: blur(60px); }
    > .spark { display: none; } /* Clean on mobile */
  }

  @keyframes gridShift {
    0% { transform: translate(0, 0); }
    50% { transform: translate(40px, 40px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes quantumFloat {
    0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.4; }
    50%      { transform: translate(-50%, -50%) scale(1.2) rotate(10deg); opacity: 0.7; }
  }

  @keyframes sparkPulse {
    0%, 100% { opacity: 0; transform: scale(0); }
    50%      { opacity: 1; transform: scale(1); }
  }
`;
const Title = styled(motion.h1)`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(2rem, 6vw,2.5rem);
  font-weight: 900;
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
  padding: clamp(1rem, 2.8vw, 1.5rem) clamp(2.2rem, 4.5vw, 3.2rem);
  border-radius: 16px;
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: clamp(1.05rem, 2.4vw, 1.35rem);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  isolation: isolate;

  /* Multi-layered glass + neon core */
  background: 
    radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.3), transparent 60%),
    radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.25), transparent 60%),
    linear-gradient(135deg, 
      rgba(10, 25, 47, 0.95) 0%,
      rgba(15, 35, 70, 0.9) 50%,
      rgba(8, 20, 45, 0.98) 100%
    );

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  
  /* Animated flowing neon border — matches your ProfileRing perfectly */
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.4),
    0 0 60px rgba(255, 0, 255, 0.2),
    inset 0 0 40px rgba(0, 255, 255, 0.15),
    0 8px 32px rgba(0, 0, 0, 0.6);

  color: #e0fffe;
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.8),
    0 0 20px rgba(0, 255, 255, 0.5);

  /* Conic glow ring — identical DNA to your ProfileRing */
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 20px;
    background: conic-gradient(
      from 0deg at 50% 50%,
      #00ffff, #00d4ff, #7f00ff, #ff00ff, #00ff9d, #00ffff
    );
    background-size: 200% 200%;
    filter: blur(10px);
    opacity: 0.7;
    animation: conicFlow 12s linear infinite;
    z-index: -1;
  }

  /* Inner holographic shimmer + scan pulse */
  &::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 14px;
    background: linear-gradient(45deg,
      transparent 30%,
      rgba(0, 255, 255, 0.15) 50%,
      transparent 70%
    );
    animation: shimmerScan 4s ease-in-out infinite;
    z-index: 1;
  }

  /* Text glow pulse */
  > span {
    position: relative;
    z-index: 2;
    background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textGlow 6s ease-in-out infinite;
  }

  /* Hover: Activate reactor mode */
  &:hover {
    transform: translateY(-6px) scale(1.05);
    box-shadow: 
      0 0 80px rgba(0, 255, 255, 0.7),
      0 0 120px rgba(255, 0, 255, 0.4),
      inset 0 0 60px rgba(0, 255, 255, 0.25);
    
    &::before { 
      animation-duration: 8s; 
      filter: blur(14px);
      opacity: 1;
    }
    &::after { 
      animation-duration: 2s; 
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  /* Responsive */
  @media (max-width: 768px) {
    padding: clamp(0.9rem, 2.5vw, 1.2rem) clamp(1.8rem, 4vw, 2.5rem);
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: clamp(0.8rem, 2.2vw, 1rem) clamp(1.5rem, 3.5vw, 2rem);
    font-size: clamp(0.95rem, 2vw, 1.1rem);
  }

  /* Shared keyframes with your ProfileRing & Header */
  @keyframes conicFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  @keyframes shimmerScan {
    0%, 100% { transform: translateX(-150%); }
    50% { transform: translateX(150%); }
  }

  @keyframes textGlow {
    0%, 100% { 
      background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
      background-size: 200%;
      background-position: 0%;
    }
    50% { 
      background-position: 100%;
    }
  }
`;


const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(2rem, 4vw, 3.5rem);
  margin-top: 2.8rem;
  position: relative;
  z-index: 2;

  /* Subtle floating energy line underneath */
  &::before {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffff, #ff00ff, #00ffff, transparent);
    border-radius: 2px;
    transform: translateX(-50%);
    opacity: 0.4;
    filter: blur(8px);
    animation: energyLine 8s ease-in-out infinite;
  }

  @keyframes energyLine {
    0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(0.8); }
    50%      { opacity: 0.6; transform: translateX(-50%) scaleX(1.1); }
  }

  @media (max-width: 768px) {
    gap: clamp(1.6rem, 3.5vw, 2.8rem);
    margin-top: 2.4rem;
  }

  @media (max-width: 480px) {
    gap: 1.4rem;
    margin-top: 2rem;
  }
`;

const SocialLink = styled.a`
  color: #e0;
  font-size: clamp(2rem, 4.5vw, 2.8rem);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(0, 20, 40, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.4),
    inset 0 0 20px rgba(0, 255, 255, 0.1);

  /* Holographic orb inside each icon */
  &::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: conic-gradient(
      from var(--rotate, 0deg),
      #00ffff, #7c3aed, #ff2df0, #00ffea, #00ffff
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    animation: holoSpin 6s linear infinite paused;
  }

  /* Electric rim glow on hover */
  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: conic-gradient(
      #00ffff, #ff00ff, #00ffea, #7c3aed, #00ffff
    );
    padding: 3px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  /* Icon itself */
  > svg, > i {
    z-index: 2;
    position: relative;
    transition: all 0.6s ease;
    filter: drop-shadow(0 0 15px currentColor);
  }

  /* HOVER = PURE MAGIC */
  &:hover {
    transform: translateY(-16px) scale(1.25);
    border-color: #00ffff;
    box-shadow: 
      0 20px 50px rgba(0, 255, 255, 0.4),
      0 0 80px rgba(0, 255, 255, 0.8),
      inset 0 0 40px rgba(0, 255, 255, 0.3);
    
    &::before {
      opacity: 0.7;
      animation-play-state: running;
    }
    
    &::after {
      opacity: 1;
    }

    > svg, > i {
      color: #ffffff;
      transform: rotate(360deg) scale(1.3);
      filter: drop-shadow(0 0 30px #00ffff);
    }
  }

  /* Active/focus state */
  &:active {
    transform: translateY(-10px) scale(1.18);
  }

  /* Responsive */
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: clamp(1.6rem, 3.5vw, 2.2rem);
    &:hover { transform: translateY(-12px) scale(1.18); }
  }

  @media (max-width: 480px) {
    width: 54px;
    height: 54px;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
  }

  @keyframes holoSpin {
    from { --rotate: 0deg; }
    to   { --rotate: 360deg; }
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
  position: relative;
  animation: glowPulse 5s ease-in-out infinite;

  &:before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, rgba(0, 255, 255, 0.3), rgba(127, 255, 212, 0.3), transparent);
    animation: holographicWave 6s infinite linear;
    z-index: -1;
  }

  &:hover {
    transform: perspective(500px) rotateX(2deg) rotateY(2deg);
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
  }

  @keyframes glowPulse {
    0%, 100% { text-shadow: 0 0 15px rgba(0, 255, 255, 0.5); }
    50% { text-shadow: 0 0 20px rgba(0, 255, 255, 0.7); }
  }

  @keyframes holographicWave {
    0% { width: 0; }
    50% { width: 100%; }
    100% { width: 0; }
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 3.5vw, 2.2rem);
    letter-spacing: 2px;
    gap: 0.4rem;
    &:hover {
      transform: none;
    }
  }
`;
const Card = styled(motion.div)`
  padding: clamp(1.5rem, 3vw, 2rem);
  background: linear-gradient(135deg, rgba(10, 25, 47, 0.9), rgba(17, 34, 64, 0.7));
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.4s ease, transform 0.3s ease-out;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 280px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, rgba(0, 255, 255, 0.3), rgba(0, 180, 255, 0.3));
    animation: gradientSlide 6s infinite linear;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background: linear-gradient(to top, rgba(0, 255, 255, 0.05), transparent);
    z-index: 0;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 255, 255, 0.2);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 255, 255, 0.2);
  }

  @keyframes gradientSlide {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 0%; }
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
  display: flex;
  flex-direction: column;
  gap: clamp(4rem, 8vw, 5.5rem);        /* Beautiful vertical spacing between projects */
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 2rem auto;         /* Centered with breathing room */
  padding: 0 clamp(1.5rem, 4vw, 2.5rem); /* Responsive side padding */

  /* Smooth entrance container */
  > * {
    opacity: 0;
    animation: fadeInUp 0.9s ease-out forwards;
  }

  /* Staggered animation delay — cinematic reveal */
  > *:nth-child(1) { animation-delay: 0.2s; }
  > *:nth-child(2) { animation-delay: 0.4s; }
  > *:nth-child(3) { animation-delay: 0.6s; }
  > *:nth-child(4) { animation-delay: 0.8s; }
  > *:nth-child(5) { animation-delay: 1.0s; }
  > *:nth-child(6) { animation-delay: 1.2s; }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Ultra-clean on mobile */
  @media (max-width: 768px) {
    gap: clamp(3.5rem, 7vw, 4.5rem);
    margin: 3rem auto 1.5rem;
    padding: 0 1.8rem;
  }

  @media (max-width: 480px) {
    gap: 3.2rem;
    padding: 0 1.4rem;
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
  height: 12px;
  background: rgba(8, 16, 35, 0.7);
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
  position: relative;
  border: 1px solid rgba(0, 255, 255, 0.18);
  backdrop-filter: blur(6px);

  /* Subtle depth track */
  &::before {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 8px;
    background: linear-gradient(90deg,
      rgba(0, 255, 255, 0.06),
      rgba(0, 200, 255, 0.04),
      rgba(0, 255, 255, 0.06)
    );
  }

  /* Minimal floating particles – super clean */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0%,
      transparent 30px,
      rgba(0, 255, 255, 0.08) 31px,
      rgba(0, 255, 255, 0.08) 33px,
      transparent 34px
    );
    background-size: 200px 100%;
    animation: particlesDrift 8s linear infinite;
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    height: 10px;
    margin: 0.9rem 0;
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  /* Clean, premium cyan → teal gradient (no rainbow overload) */
  background: linear-gradient(90deg,
    #00f5ff 0%,
    #00d0ff 40%,
    #00a1ff 70%,
    #0088ff 100%
  );
  background-size: 200% 100%;
  animation: subtleFlow 7s ease-in-out infinite;

  /* Elegant electric glow – not screaming */
  box-shadow:
    0 0 16px rgba(0, 245, 255, 0.7),
    0 0 32px rgba(0, 215, 255, 0.4),
    inset 0 0 12px rgba(255, 255, 255, 0.2);

  /* Smooth moving light beam – pure class */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 80%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.35),
      transparent
    );
    animation: lightBeam 4s ease-in-out infinite;
    filter: blur(6px);
  }

  /* Tiny pulse on complete (optional magic) */
  &[data-complete="true"] {
    animation: pulseComplete 2s ease-out forwards;
  }

  @keyframes subtleFlow {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }

  @keyframes particlesDrift {
    0%   { background-position: 0 0; }
    100% { background-position: 200px 0; }
  }

  @keyframes lightBeam {
    0%   { left: -150%; }
    60%  { left: 100%; }
    100% { left: 100%; }
  }

  @keyframes pulseComplete {
    0%   { box-shadow: 0 0 16px rgba(0, 245, 255, 0.7), 0 0 32px rgba(0, 215, 255, 0.4); }
    50%  { box-shadow: 0 0 30px rgba(0, 255, 255, 1), 0 0 60px rgba(0, 255, 255, 0.8); }
    100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.9), 0 0 50px rgba(0, 255, 255, 0.6); }
  }
`;

const ContactSection = styled(Section)`
  position: relative;
  min-height: 100vh;
  padding: clamp(8rem, 14vw, 12rem) clamp(2rem, 5vw, 6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
  z-index: 1;

  /* Deep void with living aurora — feels infinite */
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.14), transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.12), transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 255, 180, 0.08), transparent 70%),
    linear-gradient(135deg, 
      #000814 0%, 
      #001233 30%, 
      #0c1b3d 60%, 
      #020c1b 100%
    );

  /* MASSIVE BREATHING HOLOGRAPHIC CORE — your signature */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1200px;
    height: 1200px;
    background: conic-gradient(
      from 0deg at 50% 50%,
      #00ffff 0deg,
      #00d4ff 60deg,
      #8b5cf6 120deg,
      #ff2df0 180deg,
      #00ff9d 240deg,
      #00ffff 360deg
    );
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.22;
    transform: translate(-50%, -50%);
    animation: auroraBreathe 18s ease-in-out infinite;
    z-index: 0;
  }

  /* Slow-moving quantum lattice grid — feels alive */
  &::after {
    content: '';
    position: absolute;
    inset: -50%;
    background: 
      repeating-linear-gradient(30deg, 
        transparent 0px,
        transparent 80px,
        rgba(0, 255, 255, 0.03) 81px,
        rgba(0, 255, 255, 0.03) 82px
      ),
      repeating-linear-gradient(150deg, 
        transparent 0px,
        transparent 80px,
        rgba(255, 0, 255, 0.03) 81px,
        rgba(255, 0, 255, 0.03) 82px
      );
    background-size: 200px 200px;
    animation: latticeFlow 40s linear infinite;
    opacity: 0.5;
    z-index: 0;
  }

  /* FLOATING ENERGY RINGS — pure magic */
  > .ring-1, > .ring-2, > .ring-3 {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(0, 255, 255, 0.15);
    opacity: 0.3;
    pointer-events: none;
    animation: floatRing 25s linear infinite;
  }

  > .ring-1 {
    width: 800px; height: 800px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    border-color: rgba(0, 255, 255, 0.2);
    animation-delay: 0s;
  }

  > .ring-2 {
    width: 600px; height: 600px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    border-color: rgba(138, 43, 226, 0.18);
    animation-delay: -8s;
  }

  > .ring-3 {
    width: 1000px; height: 400px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(20deg);
    border-color: rgba(0, 255, 180, 0.15);
    animation-delay: -15s;
  }

  /* SUBTLE FINAL SCAN — appears only once every 30s */
  > .final-scan {
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #00ffff, #ff00ff, #00ffff, transparent);
    box-shadow: 0 0 60px #00ffff, 0 0 120px #ff00ff;
    opacity: 0;
    animation: finalScan 30s linear infinite;
    z-index: 10;
  }

  @keyframes auroraBreathe {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.18; }
    50%      { transform: translate(-50%, -50%) scale(1.3); opacity: 0.28; }
  }

  @keyframes latticeFlow {
    0%   { background-position: 0 0, 0 0; }
    100% { background-position: 200px 200px, -200px -200px; }
  }

  @keyframes floatRing {
    0%   { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
    100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
  }

  @keyframes finalScan {
    0%     { top: -100%; opacity: 0; }
    3%     { opacity: 1; }
    10%    { top: 100%; opacity: 1; }
    13%    { opacity: 0; }
    100%   { top: 100%; opacity: 0; }
  }
`;

const ContactIntro = styled(motion.p)`
  position: relative;
  z-index: 2;
  font-size: clamp(1.4rem, 3.2vw, 2rem);
  max-width: 900px;
  margin: 0 auto 3rem;
  text-align: center;
  line-height: 1.7;
  font-weight: 500;
  letter-spacing: 0.8px;

  /* Multi-layer glowing text — matches your CTA button */
  color: #e0fffe;
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.6),
    0 0 30px rgba(0, 255, 255, 0.4),
    0 0 60px rgba(0, 255, 255, 0.2);

  /* Animated gradient text (same as CTA) */
  background: linear-gradient(
    90deg,
    #00ffff 0%,
    #7f00ff 30%,
    #ff00ff 50%,
    #00ff9d 70%,
    #00ffff 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textFlow 12s ease-in-out infinite;

  /* Subtle inner glow border */
  padding: 1.5rem 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background-color: rgba(10, 25, 47, 0.4);
  border: 1px solid rgba(0, 255, 255, 0.2);

  /* Floating effect */
  animation: float 8s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 2.8vw, 1.6rem);
    padding: 1.2rem 1.5rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    padding: 1rem 1.2rem;
  }

  @keyframes textFlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
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

const Footer = styled(motion.footer)`
  background: linear-gradient(180deg, #020c1b, #0a192f, #112240);
  color: #a8d0e6;
  padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 4vw, 3rem);
  text-align: center;
  position: relative;
  overflow: hidden;
  border-top: 2px solid rgba(0, 180, 255, 0.2);
  font-family: 'Orbitron', sans-serif;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0, 180, 255, 0.05), transparent 50%);
    animation: gentleWave 10s ease-in-out infinite;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  & a, & p {
    color: #a8d0e6;
    text-decoration: none;
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    transition: all 0.3s ease;
    text-shadow: 0 0 5px rgba(168, 208, 230, 0.2);

    &:hover {
      color: #00c4cc;
      text-shadow: 0 0 10px rgba(0, 196, 204, 0.4);
      transform: translateY(-1px);
    }
  }

  @keyframes gentleWave {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
  }

  @media (max-width: 768px) {
    padding: clamp(3rem, 5vw, 4rem) clamp(1.5rem, 3vw, 2rem);
    & a, & p {
      font-size: clamp(0.85rem, 1.6vw, 1rem);
    }
  }

  @media (max-width: 480px) {
    padding: clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 1.5rem);
    & a, & p {
      font-size: clamp(0.8rem, 1.5vw, 0.9rem);
    }
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
  background: linear-gradient(90deg, #00c4cc, #a3e4d7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1.5px;
  text-shadow: 0 0 8px rgba(0, 196, 204, 0.3);

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
  }
`;

const FooterText = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #a8d0e6;
  font-weight: 400;
  text-shadow: 0 0 4px rgba(168, 208, 230, 0.1);

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
  text-shadow: 0 0 4px rgba(168, 208, 230, 0.1);

  &:hover {
    color: #00c4cc;
    text-shadow: 0 0 8px rgba(0, 196, 204, 0.3);
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
  bottom: clamp(2.8rem, 6vw, 3.5rem);
  right: clamp(2.8rem, 6vw, 3.5rem);
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 9999;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(10, 25, 47, 0.7);
  border: 2.5px solid rgba(0, 255, 255, 0.45);
  box-shadow: 
    0 0 40px rgba(0, 255, 255, 0.35),
    0 12px 40px rgba(0, 0, 0, 0.5),
    inset 0 0 30px rgba(0, 255, 255, 0.15);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);

  /* Flowing conic ring */
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      #00ffff, #00d4ff, #7f00ff, #ff00ff, #00ff9d, #00ffff
    );
    background-size: 200% 200%;
    filter: blur(14px);
    opacity: 0;
    animation: conicFlow 20s linear infinite;
    transition: opacity 0.6s ease;
    z-index: -1;
  }

  /* Holographic scan shimmer */
  &::after {
    content: '';
    position: absolute;
    top: -120%;
    left: 0;
    width: 100%;
    height: 120%;
    background: linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.3), transparent);
    transition: top 0.8s ease;
  }

  > span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    font-weight: bold;
    color: #00ffff;
    text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
    z-index: 2;
    transition: all 0.4s ease;
  }

  /* HOVER EFFECT */
  &:hover {
    transform: translateY(-10px) scale(1.12);
    box-shadow: 
      0 0 80px rgba(0, 255, 255, 0.7),
      0 20px 60px rgba(0, 0, 0, 0.6),
      inset 0 0 50px rgba(0, 255, 255, 0.25);

    &::before { opacity: 1; animation-duration: 10s; }
    &::after { top: 120%; }

    > span {
      color: white;
      text-shadow: 0 0 30px #00ffff, 0 0 60px #00ffff, 0 0 90px #00ffff;
      animation: pulseGlow 1.8s ease-in-out infinite;
    }
  }

  &:active {
    transform: translateY(-6px) scale(1.08);
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    bottom: clamp(2.2rem, 5vw, 3rem);
    right: clamp(2.2rem, 5vw, 3rem);
    > span { font-size: 1.8rem; }
  }

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    bottom: 2rem;
    right: 2rem;
    > span { font-size: 1.6rem; }
  }

  @keyframes conicFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  @keyframes pulseGlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;
const ResumeModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(2, 12, 27, 0.95),
    rgba(17, 34, 64, 0.9)
  );
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(8px);
  animation: fadePulse 10s ease-in-out infinite;

  /* Subtle background pulse */
  @keyframes fadePulse {
    0%, 100% {
      background: linear-gradient(
        135deg,
        rgba(2, 12, 27, 0.95),
        rgba(17, 34, 64, 0.9)
      );
    }
    50% {
      background: linear-gradient(
        135deg,
        rgba(2, 12, 27, 0.9),
        rgba(17, 34, 64, 0.85)
      );
    }
  }
`;

const ModalContent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.05),
    rgba(0, 240, 255, 0.1),
    rgba(255, 0, 255, 0.1)
  );
  padding: clamp(2rem, 4vw, 2.5rem);
  border-radius: 20px;
  position: relative;
  width: 90%;
  max-width: 850px;
  max-height: 90vh;
  text-align: center;
  box-shadow: 
    0 20px 60px rgba(0, 240, 255, 0.3),
    0 0 30px rgba(255, 0, 255, 0.2);
  backdrop-filter: blur(25px);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #00f0ff, #ff00ff) 1;
  overflow: hidden;
  animation: glowBorder 4s ease-in-out infinite;

  /* Pseudo-element for inner glow */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(0, 240, 255, 0.15),
      transparent 70%
    );
    z-index: -1;
    opacity: 0.5;
    animation: innerPulse 6s ease-in-out infinite;
  }

  /* Hover effect for subtle 3D lift */
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 25px 70px rgba(0, 240, 255, 0.4),
      0 0 40px rgba(255, 0, 255, 0.3);
  }

  @keyframes glowBorder {
    0%, 100% {
      border-image: linear-gradient(45deg, #00f0ff, #ff00ff) 1;
    }
    50% {
      border-image: linear-gradient(45deg, #ff00ff, #00f0ff) 1;
    }
  }

  @keyframes innerPulse {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    padding: clamp(1.5rem, 3vw, 2rem);
    max-width: 95%;
    max-height: 85vh;
    box-shadow: 
      0 15px 50px rgba(0, 240, 255, 0.25),
      0 0 25px rgba(255, 0, 255, 0.15);
  }

  @media (max-width: 480px) {
    padding: clamp(1rem, 2vw, 1.5rem);
    max-height: 80vh;
    border-radius: 15px;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-size: clamp(2rem, 3.5vw, 2.2rem);
  background: none;
  border: none;
  color: #a8d0e6;
  cursor: pointer;
  transition: all 0.4s ease;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
  z-index: 2;

  /* Pseudo-element for hover glow */
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(0, 240, 255, 0.3),
      transparent 70%
    );
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
    z-index: -1;
  }

  &:hover {
    color: #00f0ff;
    transform: rotate(90deg) scale(1.1);
    text-shadow: 
      0 0 15px rgba(0, 240, 255, 0.7),
      0 0 25px rgba(255, 0, 255, 0.5);
    &:before {
      width: 200%;
      height: 200%;
    }
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    font-size: clamp(1.8rem, 3vw, 2rem);
  }

  @media (max-width: 480px) {
    top: 0.8rem;
    right: 0.8rem;
    font-size: clamp(1.5rem, 2.5vw, 1.8rem);
  }
`;

const ModalButton = styled(motion.button)`
  padding: clamp(0.9rem, 2.5vw, 1.3rem) clamp(1.8rem, 3.5vw, 2.8rem);
  border-radius: 10px;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  background: linear-gradient(
    45deg,
    #00f0ff,
    #ff00ff,
    #00b4ff,
    #7fffd4,
    #00f0ff
  );
  background-size: 300%;
  color: #020c1b;
  border: none;
  cursor: pointer;
  margin: 1rem;
  font-size: clamp(1rem, 2vw, 1.2rem);
  box-shadow: 
    0 4px 20px rgba(0, 240, 255, 0.4),
    0 0 15px rgba(255, 0, 255, 0.3);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: gradientShift 6s ease infinite;

  /* Shine effect */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s ease;
  }

  /* Ripple effect on click */
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 
      0 8px 30px rgba(0, 240, 255, 0.6),
      0 0 20px rgba(255, 0, 255, 0.5);
    &:before {
      left: 100%;
    }
  }

  &:active:after {
    width: 200%;
    height: 200%;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (max-width: 768px) {
    padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem);
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    margin: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: clamp(0.6rem, 1.8vw, 1rem) clamp(1.2rem, 2.5vw, 2rem);
    font-size: clamp(0.8rem, 1.6vw, 1rem);
    margin: 0.6rem;
  }
`;
const AboutText = styled(motion.p)`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1.2rem, 2.7vw, 1.4rem);
  line-height: 1.9;
  color: #a8d0e6;
  text-shadow: 
    0 0 10px rgba(168, 208, 230, 0.4),
    0 0 15px rgba(0, 240, 255, 0.2);
  text-align: justify;
  position: relative;
  z-index: 1;
  animation: glowPulse 4s ease-in-out infinite;
  transition: all 0.3s ease;

  /* Pseudo-element for subtle underline glow on hover */
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00f0ff, #ff00ff);
    transition: width 0.4s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-2px);
    text-shadow: 
      0 0 15px rgba(168, 208, 230, 0.6),
      0 0 20px rgba(0, 240, 255, 0.4);
    &:after {
      width: 100%;
      opacity: 1;
    }
  }

  /* Typing animation effect for initial load */
  @keyframes typing {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 100%;
      opacity: 1;
    }
  }

  /* Glow pulse animation */
  @keyframes glowPulse {
    0%, 100% {
      text-shadow: 
        0 0 10px rgba(168, 208, 230, 0.4),
        0 0 15px rgba(0, 240, 255, 0.2);
    }
    50% {
      text-shadow: 
        0 0 15px rgba(168, 208, 230, 0.6),
        0 0 25px rgba(0, 240, 255, 0.3);
    }
  }

  /* Apply typing animation on load */
  overflow: hidden;
  animation: typing 1.5s ease-out forwards;

  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 2.2vw, 1.2rem);
    line-height: 1.7;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
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
  opacity: 0.3;
  background: linear-gradient(
    180deg,
    rgba(2, 12, 27, 0.2),
    rgba(17, 34, 64, 0.1)
  );
  animation: fadeIn 2s ease-in forwards;

  /* Subtle background fade-in */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.3;
    }
  }
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
    const particleCount = 150; // Reduced for performance and professionalism

    const symbols = ['AI', 'MERN', 'Node', 'React', 'Mongo', 'ML', 'Cloud'];
    const hexColors = ['#00c4cc', '#a3e4d7', '#112240', '#0a192f'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.color = hexColors[Math.floor(Math.random() * hexColors.length)];
        this.angle = 0;
        this.radius = Math.random() * 50 + 20;
      }

      update() {
        this.angle += 0.02;
        this.x += Math.cos(this.angle) * 0.5;
        this.y += Math.sin(this.angle) * 0.5;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -0.9;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -0.9;

        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.font = `${this.size * 5}px Orbitron`;
        ctx.textAlign = 'center';
        ctx.fillText(this.symbol, this.x, this.y);
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
      ctx.fillStyle = 'rgba(10, 25, 47, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        // Connect nearby particles with subtle lines
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(163, 228, 215, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
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
        <NavBrand href="#home">Bhagavan | MERN | AIML&DS <FaStar style={{ fontSize: '1rem', marginLeft: '0.2rem' }} /></NavBrand>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
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
    About Me
  </SectionTitle>

  {/* COMPACT & ELEGANT CINEMATIC CARD – Now perfectly sized */}
  <motion.div
    style={{
      maxWidth: "920px",
      margin: "0 auto",
      padding: "1.8rem 1.2rem",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{ y: -12, transition: { duration: 0.4 } }}
      style={{
        background: "rgba(10, 25, 50, 0.94)",
        backdropFilter: "blur(28px)",
        border: "3px solid rgba(0, 255, 255, 0.75)",
        borderRadius: "44px",
        padding: "3.2rem 3.4rem",           // Reduced padding
        width: "100%",
        maxWidth: "840px",
        minHeight: "390px",                 // Perfect compact height (was 540px → now 390px)
        boxShadow: `
          0 32px 85px rgba(0, 0, 0, 0.85),
          0 0 105px rgba(0, 255, 255, 0.46),
          inset 0 0 65px rgba(0, 255, 255, 0.2)
        `,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Top Glow Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "9px",
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
          boxShadow: "0 0 65px #00ffff",
        }}
      />

      {/* Badge – Top Center */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #000, #0a1a2f)",
          color: "#00ffff",
          padding: "0.75rem 2.3rem",
          borderRadius: "26px",
          fontSize: "1.28rem",
          fontWeight: "900",
          letterSpacing: "2px",
          border: "3px solid #00ffff",
          boxShadow: "0 0 55px #00ffff",
          zIndex: 10,
          textTransform: "uppercase",
        }}
      >
        Full-Stack × AI Engineer
      </div>

      {/* Main About Text – Tighter & More Powerful */}
      <motion.p
        style={{
          fontSize: "1.48rem",
          color: "#e0fbfc",
          lineHeight: "1.9",
          margin: "1.8rem 0",
          maxWidth: "740px",
          opacity: 0.98,
          fontWeight: "500",
        }}
        initial={{ opacity: 0 }}
        animate={isAboutInView ? { opacity: 0.98 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        Passionate <strong>B.Tech AI & Data Science</strong> student building intelligent, scalable systems with <strong>MERN Stack</strong> and <strong>AI/ML</strong>.
        <br /><br />
        I craft high-performance web apps and AI solutions that don’t just work — they dominate.
        <br /><br />
        <em>Hackathon Winner • Mentor • Always Building the Future</em>
      </motion.p>

      {/* Signature Glow Line */}
      <motion.div
        style={{
          height: "3px",
          width: "150px",
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
          boxShadow: "0 0 45px #00ffff",
          marginTop: "1.2rem",
          borderRadius: "2px",
        }}
        initial={{ scaleX: 0 }}
        animate={isAboutInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
      />

      {/* Bottom Glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "8px",
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
          boxShadow: "0 0 60px #00ffff",
        }}
      />
    </motion.div>
  </motion.div>
</Section>

      <Section id="education" ref={educationRef}>
  <SectionTitle
    initial="hidden"
    animate={isEducationInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Education
  </SectionTitle>

  {/* COMPACT & POWERFUL EDUCATION CARD */}
  <motion.div
    style={{
      maxWidth: "960px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      padding: "2rem 1.5rem",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 90 }}
      animate={isEducationInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
      whileHover={{ y: -14, transition: { duration: 0.45 } }}
      style={{
        background: "rgba(10, 25, 50, 0.94)",
        backdropFilter: "blur(28px)",
        border: "3.5px solid rgba(0, 255, 255, 0.75)",
        borderRadius: "46px",
        padding: "3.6rem 3.8rem",           // Reduced vertical padding
        boxShadow: `
          0 38px 100px rgba(0, 0, 0, 0.88),
          0 0 120px rgba(0, 255, 255, 0.48),
          inset 0 0 80px rgba(0, 255, 255, 0.2)
        `,
        position: "relative",
        overflow: "hidden",
        minHeight: "460px",                 // Was 620px → now 460px (perfectly compact)
        width: "100%",
        maxWidth: "900px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Top Glow Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "10px",
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
          boxShadow: "0 0 75px #00ffff",
        }}
      />

      {/* Degree Badge – Top Right */}
      <div
        style={{
          position: "absolute",
          top: "1.8rem",
          right: "2rem",
          background: "linear-gradient(135deg, #000, #111)",
          color: "#00ffff",
          padding: "0.8rem 1.8rem",
          borderRadius: "22px",
          fontSize: "1.25rem",
          fontWeight: "900",
          letterSpacing: "1.5px",
          border: "3px solid #00ffff",
          boxShadow: "0 0 45px #00ffff",
          zIndex: 10,
        }}
      >
        B.Tech AIDS
      </div>

      {/* Year Badge – Top Left */}
      <div
        style={{
          position: "absolute",
          top: "1.8rem",
          left: "2rem",
          background: "rgba(0, 255, 255, 0.28)",
          color: "#00ffff",
          padding: "0.7rem 1.6rem",
          borderRadius: "20px",
          fontSize: "1.2rem",
          fontWeight: "800",
          border: "2px solid rgba(0, 255, 255, 0.7)",
          boxShadow: "0 0 38px rgba(0, 255, 255, 0.5)",
        }}
      >
        2022 – 2026
      </div>

      {/* College Name */}
      <h3
        style={{
          fontSize: "3rem",
          fontWeight: "900",
          color: "#00ffff",
          margin: "0 0 0.8rem 0",
          textShadow: "0 0 50px rgba(0, 255, 255, 1)",
          letterSpacing: "2px",
        }}
      >
        Ramachandra College of Engineering
      </h3>

      <p
        style={{
          fontSize: "1.55rem",
          color: "#00d4ff",
          margin: "0 0 1.8rem 0",
          fontWeight: "700",
        }}
      >
        Eluru • JNTUK University
      </p>

      <p
        style={{
          fontSize: "1.35rem",
          color: "#e0fbfc",
          lineHeight: "1.85",
          marginBottom: "2rem",
          opacity: 0.98,
        }}
      >
        Pursuing <strong>B.Tech in Artificial Intelligence & Data Science</strong><br />
        <strong>Current CGPA:</strong> 7.0/10.0 (70%) • Final Year Student
      </p>

      {/* Skills Tags – Compact & Beautiful */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {["MERN Stack", "AI & ML", "Python • Java", "AWS", "Docker", "System Design", "DevOps"].map((tag, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.15 }}
            style={{
              padding: "0.8rem 1.8rem",
              background: "rgba(0, 255, 255, 0.24)",
              color: "#00ffff",
              borderRadius: "22px",
              fontSize: "1.1rem",
              fontWeight: "700",
              border: "2px solid rgba(0, 255, 255, 0.65)",
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.35)",
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Bottom Glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "9px",
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
          boxShadow: "0 0 70px #00ffff",
        }}
      />
    </motion.div>
  </motion.div>
</Section>
      <Section id="projects" ref={projectsRef}>
  <SectionTitle
    initial="hidden"
    animate={isProjectsInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Featured Projects
  </SectionTitle>

  {/* HORIZONTAL STACK — One elegant card per row */}
  <motion.div
    style={{
      width: "100%",
      maxWidth: "1100px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "4.5rem",
      padding: "3rem 2rem",
    }}
  >
    {[
      {
        title: "AI Chatbot",
        desc: "Enterprise-grade chatbot dashboard integrating OpenAI API with real-time messaging, analytics, and conversation history. Built with MERN + Socket.io.",
        tags: ["React", "Node.js", "OpenAI API", "Socket.io", "MERN"],
        link: "https://github.com/bhagavan444/chatbotwebapp",
        demo: "https://drive.google.com/file/d/1pOfpAUaFigPo9w-YB7s4MuIEE3-bdTr0/view",
        impact: "10,000+ queries handled • 95% accuracy • 40% faster response"
      },
      {
        title: "Resume Builder Web App",
        desc: "Full-stack ATS-optimized resume builder with AI scoring, real-time PDF export, and secure OAuth2 authentication.",
        tags: ["MERN", "OAuth2", "MongoDB", "PDF Generation", "AI Scoring"],
        link: "https://github.com/bhagavan444/Resumebuilderwebapp",
        demo: "https://drive.google.com/file/d/1Ml9hSjYsHldIIDQQtHvr0gpIn1RTvBhk/view",
        impact: "70% faster resume creation • Used by 500+ users"
      },
      {
        title: "Heart Disease Prediction Platform",
        desc: "Scalable healthcare platform using deep learning (TensorFlow) with real-time dashboards. Deployed on AWS.",
        tags: ["MERN Hybrid", "TensorFlow", "Flask", "AWS", "Healthcare AI"],
        link: "https://github.com/bhagavan444/Heartdiseasewebapp",
        demo: "https://drive.google.com/file/d/1UYQasrq1EMuDOcBZiAHF19JyR6F5T7g4/view",
        impact: "92% prediction accuracy • Clinical-grade reliability"
      },
      {
        title: "Career Path Recommendation Platform",
        desc: "AI-powered career guidance engine analyzing skills, trends, and LinkedIn data for personalized recommendations.",
        tags: ["MERN", "Python ML", "LinkedIn API", "Recommendation Engine"],
        link: "https://github.com/bhagavan444/carrerrecomendation",
        demo: "https://drive.google.com/file/d/1cHQUdThz6tm7uvds_g2OfMcg3j9wHuRS/view",
        impact: "85% match rate in beta • Helped 1000+ users"
      },
      {
        title: "Fake News Detector Platform",
        desc: "Real-time NLP classifier using BERT with admin panel and live monitoring dashboard.",
        tags: ["MERN", "NLP", "BERT", "Flask", "Admin Panel"],
        link: "https://github.com/bhagavan444/fakenewsdetectorwebapp",
        demo: "https://drive.google.com/file/d/1sBIB10_UrncsuAhfs3ekjSJbE58LxUQO/view?usp=sharing",
        impact: "88% detection accuracy • Reduced misinformation spread"
      },
      {
        title: "Dynamic Portfolio Site (This Site)",
        desc: "Ultra-smooth, animated, cyberpunk-inspired personal portfolio built with React, Framer Motion, and pure passion.",
        tags: ["React", "Framer Motion", "Styled Components", "Vite", "60fps"],
        link: "https://github.com/bhagavan444/portfolio",
        demo: "https://bhagavansportfolio.netlify.app",
        impact: "You’re experiencing it right now — pure digital art"
      }
    ].map((project, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -100 }}
        animate={isProjectsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
        whileHover={{ 
          y: -10, 
          transition: { duration: 0.4 }
        }}
        style={{
          background: "rgba(8, 20, 45, 0.78)",
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(0, 255, 255, 0.32)",
          borderRadius: "28px",
          padding: "2.8rem 3.2rem",
          boxShadow: `
            0 25px 60px rgba(0, 0, 0, 0.6),
            0 0 70px rgba(0, 255, 255, 0.22),
            inset 0 0 50px rgba(0, 255, 255, 0.08)
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left Glow Line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            background: "linear-gradient(180deg, transparent, #00ffff, transparent)",
            boxShadow: "0 0 30px #00ffff",
          }}
        />

        {/* Content */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3
            style={{
              fontSize: "2.3rem",
              fontWeight: "900",
              color: "#00ffff",
              margin: "0 0 1rem 0",
              textShadow: "0 0 25px rgba(0, 255, 255, 0.7)",
              letterSpacing: "1px",
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: "1.18rem",
              color: "#e0fbfc",
              lineHeight: "1.78",
              marginBottom: "1.4rem",
              opacity: 0.96,
            }}
          >
            {project.desc}
          </p>

          {project.impact && (
            <p
              style={{
                fontSize: "1.12rem",
                color: "#00ffea",
                fontWeight: "700",
                margin: "1.4rem 0",
                padding: "0.8rem 1.2rem",
                background: "rgba(0, 255, 234, 0.1)",
                borderRadius: "12px",
                display: "inline-block",
                border: "1px solid rgba(0, 255, 234, 0.3)",
                textShadow: "0 0 15px rgba(0, 255, 234, 0.5)",
              }}
            >
              Impact: {project.impact}
            </p>
          )}

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.9rem",
              margin: "2rem 0",
            }}
          >
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.15, rotate: 3 }}
                style={{
                  padding: "0.65rem 1.4rem",
                  background: "rgba(0, 255, 255, 0.14)",
                  color: "#00ffff",
                  borderRadius: "14px",
                  fontSize: "0.98rem",
                  fontWeight: "600",
                  border: "1px solid rgba(0, 255, 255, 0.35)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1.6rem", marginTop: "1.8rem" }}>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.08 }}
              style={{
                padding: "1rem 2.4rem",
                background: "rgba(0, 255, 255, 0.16)",
                color: "#00ffff",
                borderRadius: "16px",
                fontWeight: "700",
                fontSize: "1.05rem",
                textDecoration: "none",
                border: "1.8px solid rgba(0, 255, 255, 0.45)",
                boxShadow: "0 0 25px rgba(0, 255, 255, 0.3)",
                transition: "all 0.4s ease",
              }}
            >
              Code
            </motion.a>

            <motion.a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.08 }}
              style={{
                padding: "1rem 2.8rem",
                background: "linear-gradient(90deg, #00ffff, #00d0ff)",
                color: "#020c1b",
                borderRadius: "16px",
                fontWeight: "800",
                fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 10px 35px rgba(0, 255, 255, 0.5)",
                transition: "all 0.4s ease",
              }}
            >
              Live Demo
            </motion.a>
          </div>
        </div>

        {/* Optional: Add a subtle image placeholder on the right (if you want later) */}
        {/* <div style={{ width: "300px", height: "200px", background: "rgba(0,255,255,0.1)", borderRadius: "16px" }} /> */}
      </motion.div>
    ))}
  </motion.div>
</Section>

    <Section id="skills" ref={skillsRef}>
  <SectionTitle
    initial="hidden"
    animate={isSkillsInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Core Skills
  </SectionTitle>

  {/* 2 CARDS PER ROW – CINEMATIC GRID */}
  <motion.div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "2rem 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
      gap: "4rem",
    }}
  >
    {[
      {
        icon: <FaCode />,
        title: "Programming Languages",
        skills: [
          { name: "Python", level: 95 },
          { name: "Java", level: 85 },
          { name: "JavaScript", level: 90 },
          { name: "SQL", level: 90 },
          { name: "C / C++", level: 80 },
        ],
      },
      {
        icon: <FaLaptopCode />,
        title: "Full-Stack Development",
        skills: [
          { name: "React.js", level: 92 },
          { name: "Next.js", level: 88 },
          { name: "Node.js", level: 88 },
          { name: "Express.js", level: 90 },
          { name: "MongoDB", level: 92 },
          { name: "REST APIs", level: 94 },
        ],
      },
      {
        icon: <FaBrain />,
        title: "AI & Machine Learning",
        skills: [
          { name: "Machine Learning", level: 90 },
          { name: "Deep Learning", level: 87 },
          { name: "TensorFlow / Keras", level: 88 },
          { name: "Scikit-learn", level: 94 },
          { name: "NLP & CV", level: 85 },
          { name: "Pandas / NumPy", level: 96 },
        ],
      },
      {
        icon: <FaCloud />,
        title: "Cloud & DevOps",
        skills: [
          { name: "AWS", level: 78 },
          { name: "Docker", level: 82 },
          { name: "Git & GitHub", level: 95 },
          { name: "CI/CD", level: 80 },
          { name: "Linux", level: 85 },
        ],
      },
      {
        icon: <FaDatabase />,
        title: "Databases & Tools",
        skills: [
          { name: "MongoDB", level: 92 },
          { name: "MySQL", level: 88 },
          { name: "PostgreSQL", level: 82 },
          { name: "Postman", level: 90 },
          { name: "VS Code", level: 98 },
        ],
      },
      {
        icon: <FaUsers />,
        title: "Leadership & Soft Skills",
        skills: [
          { name: "Problem Solving", level: 94 },
          { name: "Team Leadership", level: 90 },
          { name: "Communication", level: 92 },
          { name: "Adaptability", level: 93 },
          { name: "Time Management", level: 90 },
        ],
      },
    ].map((category, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 100 }}
        animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: i * 0.18, ease: "easeOut" }}
        whileHover={{ y: -18, transition: { duration: 0.5 } }}
        style={{
          background: "rgba(10, 25, 50, 0.96)",
          backdropFilter: "blur(32px)",
          border: "3.5px solid rgba(0, 255, 255, 0.78)",
          borderRadius: "48px",
          padding: "4rem 3.6rem",
          minHeight: "580px",
          boxShadow: `
            0 50px 130px rgba(0, 0, 0, 0.9),
            0 0 140px rgba(0, 255, 255, 0.52),
            inset 0 0 90px rgba(0, 255, 255, 0.22)
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Glow Line */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "11px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)", boxShadow: "0 0 85px #00ffff" }} />

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "3.2rem", color: "#00ffff", filter: "drop-shadow(0 0 20px #00ffff)" }}>
            {category.icon}
          </div>
          <h3 style={{ fontSize: "2.4rem", fontWeight: "900", color: "#00ffff", margin: 0, textShadow: "0 0 30px #00ffff", letterSpacing: "1.5px" }}>
            {category.title}
          </h3>
        </div>

        {/* Skills with Progress Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem", flex: 1 }}>
          {category.skills.map((skill, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, x: -50 }}
              animate={isSkillsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.18 + j * 0.09 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.18rem", color: "#e0fbfc", fontWeight: "700" }}>{skill.name}</span>
                <span style={{ fontSize: "1.1rem", color: "#00ffff", fontWeight: "800" }}>{skill.level}%</span>
              </div>
              <div style={{ height: "14px", background: "rgba(0, 255, 255, 0.18)", borderRadius: "8px", overflow: "hidden", border: "1.5px solid rgba(0, 255, 255, 0.4)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isSkillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.8, delay: i * 0.18 + j * 0.12, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #00ffff, #00ffea)",
                    borderRadius: "8px",
                    boxShadow: "0 0 25px #00ffff",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 5 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      width: "60%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Glow */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "10px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)", boxShadow: "0 0 80px #00ffff" }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
      <Section id="internships" ref={internshipsRef}>
  <SectionTitle
    initial="hidden"
    animate={isInternshipsInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Professional Experience
  </SectionTitle>

  {/* VERTICAL STACK — Tall, premium internship cards */}
  <motion.div
    style={{
      maxWidth: "1000px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "4.8rem",
      padding: "3rem 2rem",
    }}
  >
    {[
      {
        title: "Machine Learning & Data Science Intern",
        company: "Blackbucks (Remote)",
        duration: "May 2024 – June 2024",
        desc: "Optimized regression models for real estate prediction. Built scalable MERN API backend for real-time data visualization and analytics pipeline serving MNC clients.",
        tech: ["Python", "Scikit-learn", "Pandas", "MERN API"],
        concepts: ["Regression", "Feature Engineering", "API Design"],
        gitLink: "https://github.com/bhagavan444",
        certLink: "https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view",
        impact: "Boosted model precision by 15%",
      },
      {
        title: "AI/ML Intern – Smart Sorting Project",
        company: "SmartBridge (Remote)",
        duration: "May 2025 – June 2025",
        desc: "Led development of CNN-based disease detection system for agriculture. Integrated deep learning model with MERN dashboard for real-time monitoring and MNC-scale deployment.",
        tech: ["TensorFlow", "Keras", "CNN", "Flask", "MERN"],
        concepts: ["Deep Learning", "Computer Vision", "Production Deployment"],
        gitLink: "https://github.com/bhagavan444",
        certLink: "https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view",
        impact: "Achieved 94% accuracy in production environment",
      },
      {
        title: "MERN Stack Internship Program",
        company: "StudyOwl Education Private Limited (Online)",
        duration: "15 May 2025 – 16 July 2025",
        desc: "Completed AICTE-recognized 8-week intensive MERN Stack internship. Built full-stack web applications with secure authentication, REST APIs, and responsive frontend design.",
        tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
        concepts: ["Full-Stack Dev", "REST API", "Authentication", "Responsive UI"],
        gitLink: "https://github.com/bhagavan444",
        certLink: "https://drive.google.com/file/d/1bwbNlc9mdPYQOIyUpoiBIOhpyxaMBvbC/view?usp=sharing",
        impact: "Officially certified MERN developer by AICTE-recognized program",
      },
    ].map((intern, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80 }}
        animate={isInternshipsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
        transition={{ duration: 0.9, delay: i * 0.18, ease: "easeOut" }}
        whileHover={{ y: -10, transition: { duration: 0.4 } }}
        style={{
          background: "rgba(10, 25, 50, 0.82)",
          backdropFilter: "blur(22px)",
          border: "1.5px solid rgba(0, 255, 255, 0.38)",
          borderRadius: "34px",
          padding: "3.2rem 3rem",
          boxShadow: `
            0 28px 80px rgba(0, 0, 0, 0.65),
            0 0 85px rgba(0, 255, 255, 0.28),
            inset 0 0 55px rgba(0, 255, 255, 0.1)
          `,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top glowing accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
            boxShadow: "0 0 35px #00ffff",
          }}
        />

        {/* Title + Company */}
        <h3
          style={{
            fontSize: "2.4rem",
            fontWeight: "900",
            color: "#00ffff",
            margin: "0 0 0.8rem 0",
            textShadow: "0 0 25px rgba(0, 255, 255, 0.7)",
            letterSpacing: "0.5px",
          }}
        >
          {intern.title}
        </h3>

        <p
          style={{
            fontSize: "1.5rem",
            color: "#00d4ff",
            margin: "0 0 1.8rem 0",
            fontWeight: "600",
          }}
        >
          {intern.company} • {intern.duration}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "1.2rem",
            color: "#e0fbfc",
            lineHeight: "1.8",
            marginBottom: "2rem",
            opacity: 0.96,
          }}
        >
          {intern.desc}
        </p>

        {/* Impact Badge */}
        {intern.impact && (
          <div
            style={{
              display: "inline-block",
              padding: "0.9rem 1.6rem",
              background: "rgba(0, 255, 234, 0.15)",
              border: "1px solid rgba(0, 255, 234, 0.4)",
              borderRadius: "16px",
              color: "#00ffea",
              fontWeight: "700",
              fontSize: "1.1rem",
              marginBottom: "2rem",
              textShadow: "0 0 15px rgba(0, 255, 234, 0.6)",
              boxShadow: "0 0 20px rgba(0, 255, 234, 0.3)",
            }}
          >
            Impact: {intern.impact}
          </div>
        )}

        {/* Tech + Concepts Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            margin: "2rem 0",
          }}
        >
          {[...intern.tech, ...intern.concepts].map((item, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.12, rotate: 2 }}
              style={{
                padding: "0.7rem 1.5rem",
                background: idx < intern.tech.length
                  ? "rgba(0, 255, 255, 0.16)"
                  : "rgba(0, 212, 255, 0.12)",
                color: "#00ffff",
                borderRadius: "16px",
                fontSize: "1rem",
                fontWeight: "600",
                border: "1.5px solid rgba(0, 255, 255, 0.4)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)",
              }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1.8rem", marginTop: "2.2rem" }}>
          <motion.a
            href={intern.gitLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.08 }}
            style={{
              padding: "1rem 2.4rem",
              background: "rgba(0, 255, 255, 0.18)",
              color: "#00ffff",
              borderRadius: "16px",
              fontWeight: "700",
              fontSize: "1.05rem",
              textDecoration: "none",
              border: "1.8px solid rgba(0, 255, 255, 0.5)",
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.35)",
              transition: "all 0.4s ease",
            }}
          >
            Code
          </motion.a>

          <motion.a
            href={intern.certLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.08 }}
            style={{
              padding: "1rem 2.8rem",
              background: "linear-gradient(90deg, #00ffff, #00d0ff)",
              color: "#020c1b",
              borderRadius: "16px",
              fontWeight: "800",
              fontSize: "1.05rem",
              textDecoration: "none",
              boxShadow: "0 10px 40px rgba(0, 255, 255, 0.55)",
              transition: "all 0.4s ease",
            }}
          >
            View Certificate
          </motion.a>
        </div>
      </motion.div>
    ))}
  </motion.div>
</Section>

      <Section id="certifications" ref={certificationsRef}>
  <SectionTitle
    initial="hidden"
    animate={isCertificationsInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Certifications (19+)
  </SectionTitle>

  <p style={{ 
    color: "#a8d0e6", 
    fontSize: "1.8rem", 
    margin: "0 auto 5rem auto", 
    textAlign: "center", 
    lineHeight: "1.7",
    textShadow: "0 0 18px rgba(0, 255, 255, 0.35)",
    maxWidth: "960px",
    fontWeight: "500"
  }}>
    Industry-recognized credentials in MERN Stack, AI/ML, Cloud, DevOps & Core Programming — validated by global leaders.
  </p>

  {/* 3 CARDS PER ROW – CINEMATIC GRID (Same DNA as Skills & Internships) */}
  <motion.div
    style={{
      maxWidth: "1600px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "3.8rem",
    }}
  >
    {[
      { title: "Java Masterclass", link: "https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link" },
      { title: "C for Everyone – Coursera", link: "https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link" },
      { title: "Python Mastery", link: "https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link" },
      { title: "React.js Professional", link: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link" },
      { title: "AWS Cloud Practitioner", link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link" },
      { title: "R Programming Expert", link: "https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing" },
      { title: "Django & DRF Professional", link: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view" },
      { title: "ServiceNow Developer", link: "https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view" },
      { title: "Machine Learning with Python", link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view" },
      { title: "AWS Solutions Architect", link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view" },
      { title: "IBM Programming Mastery", link: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing" },
      { title: "Software Engineering", link: "https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing" },
      { title: "CI/CD & DevOps", link: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing" },
      { title: "Large Language Models", link: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing" },
      { title: "Chatbot Development", link: "https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing" },
      { title: "HTML5 Mastery", link: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link" },
      { title: "Advanced CSS & Animations", link: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link" },
      { title: "Advanced Python", link: "https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link" },
      { title: "MLOps & Deployment", link: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link" },
      { title: "JavaScript ES6+ Mastery", link: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link" },
    ].map((cert, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 90, scale: 0.9 }}
        animate={isCertificationsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
        whileHover={{ 
          y: -22, 
          scale: 1.06,
          transition: { duration: 0.45 }
        }}
        style={{
          background: "rgba(10, 25, 50, 0.96)",
          backdropFilter: "blur(32px)",
          border: "3.5px solid rgba(0, 255, 255, 0.78)",
          borderRadius: "48px",
          padding: "3.8rem 2.8rem",
          minHeight: "260px",
          boxShadow: `
            0 50px 130px rgba(0, 0, 0, 0.9),
            0 0 140px rgba(0, 255, 255, 0.5),
            inset 0 0 90px rgba(0, 255, 255, 0.22)
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Top Glow Line */}
        <div style={{ 
          position: "absolute", top: 0, left: 0, width: "100%", height: "11px", 
          background: "linear-gradient(90deg, transparent, #00ffff, #00ffea, #00ffff, transparent)", 
          boxShadow: "0 0 85px #00ffff" 
        }} />

        {/* Certificate Title */}
        <h3 style={{
          fontSize: "1.85rem",
          fontWeight: "900",
          color: "#00ffff",
          margin: "0 0 2rem 0",
          textShadow: "0 0 35px #00ffff",
          letterSpacing: "1.2px",
          lineHeight: "1.4",
          padding: "0 1rem"
        }}>
          {cert.title}
        </h3>

        {/* View Certificate Button */}
        <motion.a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: "1.1rem 2.8rem",
            background: "linear-gradient(90deg, #00ffff, #00ffea)",
            color: "#000",
            borderRadius: "26px",
            fontSize: "1.18rem",
            fontWeight: "900",
            textDecoration: "none",
            boxShadow: "0 10px 40px rgba(0, 255, 255, 0.65)",
            letterSpacing: "1px",
            marginTop: "1rem"
          }}
        >
          View Certificate
        </motion.a>

        {/* Bottom Glow */}
        <div style={{ 
          position: "absolute", bottom: 0, left: 0, width: "100%", height: "10px", 
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)", 
          boxShadow: "0 0 80px #00ffff" 
        }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
      <Section id="workshops" ref={workshopsRef}>
  <SectionTitle
    initial="hidden"
    animate={isWorkshopsInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Workshops & Training
  </SectionTitle>

  {/* 2 CARDS PER ROW – COMPACT & STUNNING */}
  <motion.div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "2rem 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(540px, 1fr))",
      gap: "4rem",
    }}
  >
    {[
      {
        title: "Machine Learning with Python",
        desc: "Hands-on training in data preprocessing, model building & evaluation with real-time MERN dashboard integration.",
        tags: ["Python", "Scikit-learn", "Pandas", "MERN Dashboard"],
        year: "2024",
        impact: "Built 3+ production ML models",
      },
      {
        title: "Deep Learning with TensorFlow",
        desc: "Advanced CNNs, neural networks & live inference using TensorFlow + MERN frontend.",
        tags: ["TensorFlow", "Keras", "CNN", "Deep Learning"],
        year: "2025",
        impact: "95% accuracy on live models",
      },
      {
        title: "Mobile App Development",
        desc: "Cross-platform apps using React Native with secure MERN backend.",
        tags: ["React Native", "Mobile Dev", "MERN API"],
        year: "2023",
        impact: "2 fully functional apps",
      },
      {
        title: "Full-Stack Web Development",
        desc: "Complete MERN stack: React, Node.js, MongoDB, JWT, deployment.",
        tags: ["MERN", "React.js", "Node.js", "MongoDB"],
        year: "2022",
        impact: "5+ projects deployed",
      },
      {
        title: "Artificial Intelligence & Data Science",
        desc: "AI/ML pipelines and interactive data dashboards using MERN.",
        tags: ["AI", "Data Science", "ML Pipelines"],
        year: "2022",
        impact: "Led AI-powered team project",
      },
      {
        title: "Web Development Foundation",
        desc: "Mastery of HTML, CSS, JavaScript — the core of all my work.",
        tags: ["HTML", "CSS", "JavaScript", "Frontend"],
        year: "2022",
        impact: "Foundation for 10+ projects",
      },
    ].map((workshop, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 90 }}
        animate={isWorkshopsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.18, ease: "easeOut" }}
        whileHover={{ y: -16, transition: { duration: 0.45 } }}
        style={{
          background: "rgba(10, 25, 50, 0.96)",
          backdropFilter: "blur(32px)",
          border: "3.5px solid rgba(0, 255, 255, 0.78)",
          borderRadius: "46px",
          padding: "3.4rem 3.6rem",           // Reduced padding
          minHeight: "480px",                 // Was 620px → now 480px (perfectly compact)
          maxWidth: "680px",
          margin: "0 auto",
          boxShadow: `
            0 45px 120px rgba(0, 0, 0, 0.9),
            0 0 130px rgba(0, 255, 255, 0.5),
            inset 0 0 85px rgba(0, 255, 255, 0.22)
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Glow */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "10px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)", boxShadow: "0 0 80px #00ffff" }} />

        {/* Year Badge */}
        <div style={{ position: "absolute", top: "1.8rem", right: "2rem", background: "rgba(0, 255, 255, 0.28)", color: "#00ffff", padding: "0.7rem 1.6rem", borderRadius: "20px", fontSize: "1.2rem", fontWeight: "800", border: "2px solid rgba(0, 255, 255, 0.7)" }}>
          {workshop.year}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "2.4rem", fontWeight: "900", color: "#00ffff", margin: "0 0 1rem 0", textShadow: "0 0 32px #00ffff", letterSpacing: "1.2px" }}>
          {workshop.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: "1.32rem", color: "#e0fbfc", lineHeight: "1.92", marginBottom: "2rem", opacity: 0.98, flex: 1 }}>
          {workshop.desc}
        </p>

        {/* Impact Badge */}
        <div style={{ display: "inline-block", padding: "1rem 2.2rem", background: "linear-gradient(90deg, rgba(0,255,157,0.3), rgba(0,255,234,0.3))", border: "2.5px solid rgba(0,255,157,0.8)", borderRadius: "24px", color: "#00ff9d", fontWeight: "800", fontSize: "1.22rem", marginBottom: "2rem", boxShadow: "0 0 48px rgba(0,255,157,0.5)" }}>
          {workshop.impact}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.1rem", marginTop: "auto" }}>
          {workshop.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.15 }}
              style={{
                padding: "0.85rem 1.9rem",
                background: "rgba(0, 255, 255, 0.24)",
                color: "#00ffff",
                borderRadius: "22px",
                fontSize: "1.12rem",
                fontWeight: "700",
                border: "2px solid rgba(0, 255, 255, 0.65)",
                boxShadow: "0 0 32px rgba(0, 255, 255, 0.35)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Bottom Glow */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "9px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)", boxShadow: "0 0 75px #00ffff" }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
      {/* Hackathons & Competitions Section */}
<Section id="hackathons" ref={hackathonsRef}>
  <SectionTitle
    initial="hidden"
    animate={isHackathonsInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Hackathons & Competitions
  </SectionTitle>

  {/* 2 CARDS PER ROW – COMPACT & DOMINANT */}
  <motion.div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "2rem 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(540px, 1fr))",
      gap: "4rem",
    }}
  >
    {[
      {
        title: "24-Hour Hackathon – Brainovision",
        organizer: "RCE Eluru",
        year: "2025",
        desc: "Built a full-featured second-hand electronics marketplace in 24 hours using MERN stack with real-time chat, payments, and secure auth.",
        tags: ["MERN", "E-Commerce", "Real-time Chat", "Payment Gateway", "React.js", "Node.js", "JWT"],
        rank: "2nd Place",
        impact: "2nd among 40+ teams • 100+ active users • Fully deployed",
        codeLink: "https://github.com/bhagavan444/hacakthon-project",
        certLink: "https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view"
      }
      // Add more hackathons later — layout scales flawlessly
    ].map((hack, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 90 }}
        animate={isHackathonsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.18, ease: "easeOut" }}
        whileHover={{ y: -18, transition: { duration: 0.45 } }}
        style={{
          background: "rgba(10, 25, 50, 0.96)",
          backdropFilter: "blur(32px)",
          border: "3.5px solid rgba(0, 255, 255, 0.78)",
          borderRadius: "46px",
          padding: "3.2rem 3.4rem",           // Reduced padding
          minHeight: "480px",                 // Was too tall → now perfectly compact
          boxShadow: `
            0 45px 120px rgba(0, 0, 0, 0.9),
            0 0 130px rgba(0, 255, 255, 0.52),
            inset 0 0 85px rgba(0, 255, 255, 0.22)
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Glow */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "10px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)", boxShadow: "0 0 80px #00ffff" }} />

        {/* Rank Badge – Top Right */}
        <div style={{ position: "absolute", top: "1.8rem", right: "2rem", background: "linear-gradient(135deg, #ff00aa, #00ffff)", color: "#000", padding: "0.8rem 1.6rem", borderRadius: "22px", fontSize: "1.3rem", fontWeight: "900", boxShadow: "0 0 40px rgba(255, 0, 170, 0.7)" }}>
          {hack.rank}
        </div>

        {/* Year Badge – Top Left */}
        <div style={{ position: "absolute", top: "1.8rem", left: "2rem", background: "rgba(0, 255, 255, 0.28)", color: "#00ffff", padding: "0.7rem 1.5rem", borderRadius: "20px", fontSize: "1.2rem", fontWeight: "800", border: "2px solid rgba(0, 255, 255, 0.7)" }}>
          {hack.year}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "2.4rem", fontWeight: "900", color: "#00ffff", margin: "0 0 0.9rem 0", textShadow: "0 0 32px #00ffff", letterSpacing: "1.2px" }}>
          {hack.title}
        </h3>

        <p style={{ fontSize: "1.5rem", color: "#00d4ff", margin: "0 0 1.8rem 0", fontWeight: "700" }}>
          {hack.organizer}
        </p>

        {/* Description */}
        <p style={{ fontSize: "1.3rem", color: "#e0fbfc", lineHeight: "1.9", marginBottom: "1.8rem", opacity: 0.98, flex: 1 }}>
          {hack.desc}
        </p>

        {/* Impact Badge */}
        <div style={{ display: "inline-block", padding: "1rem 2.2rem", background: "linear-gradient(90deg, rgba(0,255,100,0.32), rgba(0,255,234,0.32))", border: "2.5px solid rgba(0,255,100,0.8)", borderRadius: "24px", color: "#00ff9d", fontWeight: "800", fontSize: "1.22rem", marginBottom: "2rem", boxShadow: "0 0 48px rgba(0,255,100,0.55)" }}>
          {hack.impact}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "auto" }}>
          {hack.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.14 }}
              style={{
                padding: "0.8rem 1.8rem",
                background: "rgba(0, 255, 255, 0.24)",
                color: "#00ffff",
                borderRadius: "22px",
                fontSize: "1.1rem",
                fontWeight: "700",
                border: "2px solid rgba(0, 255, 255, 0.65)",
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.35)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1.6rem", marginTop: "2rem" }}>
          <motion.a
            href={hack.codeLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            style={{ padding: "1rem 2.4rem", background: "rgba(0, 255, 255, 0.22)", color: "#00ffff", borderRadius: "20px", fontWeight: "800", fontSize: "1.1rem", textDecoration: "none", border: "2.2px solid rgba(0, 255, 255, 0.6)", boxShadow: "0 0 38px rgba(0, 255, 255, 0.4)" }}
          >
            Code
          </motion.a>
          <motion.a
            href={hack.certLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            style={{ padding: "1rem 2.8rem", background: "linear-gradient(90deg, #ff00aa, #00ffff)", color: "#000", borderRadius: "20px", fontWeight: "900", fontSize: "1.1rem", textDecoration: "none", boxShadow: "0 10px 45px rgba(255, 0, 170, 0.65)" }}
          >
            Certificate
          </motion.a>
        </div>

        {/* Bottom Glow */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "9px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)", boxShadow: "0 0 75px #00ffff" }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
{/* Coding Platforms Section */}
<Section id="coding" ref={codingRef}>
  <SectionTitle
    initial="hidden"
    animate={isCodingInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Coding Platforms
  </SectionTitle>

  {/* 3 CARDS PER ROW – PERFECT GRID, COMPACT & DOMINANT */}
  <motion.div
    style={{
      maxWidth: "1600px",
      margin: "0 auto",
      padding: "2rem 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "4rem",
    }}
  >
    {[
      {
        title: "LeetCode – Knight Rank",
        desc: "300+ problems solved • 100-day streak • Top 10% globally • DSA mastery applied in AI optimization",
        tags: ["300+ Solved", "Knight Rank", "Top 10%", "Algorithm Master"],
        link: "https://leetcode.com/u/AxZsDhEeto/",
        badge: "Knight",
        color: "#FFA116",
        glow: "#ff8c00"
      },
      {
        title: "HackerRank – 5 Star",
        desc: "Gold badges in Problem Solving, Python & AI/ML • Top 20% worldwide • Real-world logic deployed",
        tags: ["5 Star", "Gold Badges", "Top 20%", "Python • AI"],
        link: "https://www.hackerrank.com/profile/g_sivasatyasaib1",
        badge: "5 Star",
        color: "#00ff9d",
        glow: "#00ff9d"
      },
      {
        title: "CodeChef – Contest Warrior",
        desc: "20+ rated contests • Lightning-fast optimized code • Production-grade competitive discipline",
        tags: ["20+ Contests", "Rated Player", "Fast & Clean", "Competitive"],
        link: "https://www.codechef.com/users/bhagavan444",
        badge: "Warrior",
        color: "#ff4757",
        glow: "#ff6b6b"
      }
    ].map((platform, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 90 }}
        animate={isCodingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 90 }}
        transition={{ duration: 1, delay: i * 0.18, ease: "easeOut" }}
        whileHover={{ y: -18, transition: { duration: 0.45 } }}
        style={{
          background: "rgba(10, 25, 50, 0.96)",
          backdropFilter: "blur(32px)",
          border: `3.5px solid ${platform.color}`,
          borderRadius: "44px",
          padding: "3rem 2.6rem",
          minHeight: "440px",
          boxShadow: `
            0 45px 120px rgba(0, 0, 0, 0.9),
            0 0 130px ${platform.glow}99,
            inset 0 0 90px ${platform.glow}44
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Glow Line – Platform Color */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "10px",
            background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
            boxShadow: `0 0 80px ${platform.glow}`,
          }}
        />

        {/* Badge – Top Right */}
        <div
          style={{
            position: "absolute",
            top: "1.8rem",
            right: "2rem",
            background: "#000",
            color: platform.color,
            padding: "0.8rem 1.6rem",
            borderRadius: "20px",
            fontSize: "1.3rem",
            fontWeight: "900",
            letterSpacing: "1.5px",
            border: `2.5px solid ${platform.color}`,
            boxShadow: `0 0 40px ${platform.glow}`,
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          {platform.badge}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "2.4rem",
            fontWeight: "900",
            color: platform.color,
            margin: "0 0 1.2rem 0",
            textShadow: `0 0 35px ${platform.glow}`,
            letterSpacing: "1.3px",
            textAlign: "center",
          }}
        >
          {platform.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "1.28rem",
            color: "#e0fbfc",
            lineHeight: "1.9",
            marginBottom: "2rem",
            opacity: 0.98,
            flex: 1,
            textAlign: "center",
          }}
        >
          {platform.desc}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          {platform.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.15, rotate: 4 }}
              style={{
                padding: "0.75rem 1.7rem",
                background: "rgba(0, 255, 255, 0.18)",
                color: "#00ffff",
                borderRadius: "20px",
                fontSize: "1.05rem",
                fontWeight: "700",
                border: "1.8px solid rgba(0, 255, 255, 0.5)",
                boxShadow: "0 0 28px rgba(0, 255, 255, 0.3)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
          <motion.a
            href={platform.link}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "1.1rem 3.2rem",
              background: platform.color,
              color: "#000",
              borderRadius: "24px",
              fontWeight: "900",
              fontSize: "1.25rem",
              textDecoration: "none",
              boxShadow: `0 10px 40px ${platform.glow}aa`,
              letterSpacing: "1px",
            }}
          >
            View Profile
          </motion.a>
        </div>

        {/* Bottom Glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "9px",
            background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
            boxShadow: `0 0 75px ${platform.glow}`,
          }}
        />
      </motion.div>
    ))}
  </motion.div>
</Section>

      <Section id="hobbies" ref={hobbiesRef}>
  <SectionTitle
    initial="hidden"
    animate={isHobbiesInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Hobbies & Interests
  </SectionTitle>

  {/* 3 CARDS PER ROW – COMPACT, POWERFUL, PASSION-DRIVEN */}
  <motion.div
    style={{
      maxWidth: "1600px",
      margin: "0 auto",
      padding: "2.5rem 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "4.2rem",
    }}
  >
    {[
      {
        title: "Coding Challenges",
        desc: "Relentless daily practice on LeetCode, HackerRank & Codeforces. 500+ DSA problems solved to forge unbreakable logic and optimization instincts.",
        tags: ["LeetCode Knight", "500+ Solved", "Daily Streak", "DSA God"],
        impact: "500+ problems • Top-tier global rank • Daily GitHub green",
        glowColor: "#ff00aa",
        badge: "DSA Warrior"
      },
      {
        title: "Technical Blogging",
        desc: "Writing deep-dive articles on Medium about MERN, AI integration, system design & future tech. Turning complexity into clarity for thousands.",
        tags: ["Medium Writer", "10+ Articles", "1K+ Readers", "Tech Evangelist"],
        impact: "10+ articles • 1,000+ readers • Shaping dev education",
        glowColor: "#00ff9d",
        badge: "Tech Author"
      },
      {
        title: "AI & Emerging Tech",
        desc: "Pushing boundaries with LLMs, computer vision & generative AI in full-stack MERN apps. Building the future — one prototype at a time.",
        tags: ["AI Prototyping", "LLM Integration", "MERN + AI", "Future Builder"],
        impact: "5+ AI-powered apps • Leading the next wave of innovation",
        glowColor: "#ffd700",
        badge: "AI Pioneer"
      }
    ].map((hobby, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 90 }}
        animate={isHobbiesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.18, ease: "easeOut" }}
        whileHover={{ y: -20, transition: { duration: 0.45 } }}
        style={{
          background: "rgba(10, 25, 50, 0.96)",
          backdropFilter: "blur(32px)",
          border: `3.5px solid ${hobby.glowColor}`,
          borderRadius: "48px",
          padding: "3.2rem 2.8rem",
          minHeight: "460px",
          boxShadow: `
            0 50px 130px rgba(0, 0, 0, 0.92),
            0 0 140px ${hobby.glowColor}88,
            inset 0 0 100px ${hobby.glowColor}44
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Glow Line – Unique Passion Color */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "11px",
            background: `linear-gradient(90deg, transparent, ${hobby.glowColor}, transparent)`,
            boxShadow: `0 0 85px ${hobby.glowColor}`,
          }}
        />

        {/* Passion Badge – Top Right */}
        <div
          style={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            background: "#000",
            color: hobby.glowColor,
            padding: "0.8rem 1.8rem",
            borderRadius: "22px",
            fontSize: "1.3rem",
            fontWeight: "900",
            letterSpacing: "1.6px",
            border: `2.8px solid ${hobby.glowColor}`,
            boxShadow: `0 0 45px ${hobby.glowColor}`,
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          {hobby.badge}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "2.5rem",
            fontWeight: "900",
            color: hobby.glowColor,
            margin: "0 0 1.2rem 0",
            textShadow: `0 0 38px ${hobby.glowColor}`,
            letterSpacing: "1.4px",
            textAlign: "center",
          }}
        >
          {hobby.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "1.32rem",
            color: "#e0fbfc",
            lineHeight: "1.92",
            marginBottom: "2rem",
            opacity: 0.98,
            flex: 1,
            textAlign: "center",
          }}
        >
          {hobby.desc}
        </p>

        {/* Impact Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "1rem 2.4rem",
            background: `linear-gradient(90deg, ${hobby.glowColor}33, ${hobby.glowColor}22)`,
            border: `2.5px solid ${hobby.glowColor}`,
            borderRadius: "26px",
            color: hobby.glowColor,
            fontWeight: "800",
            fontSize: "1.22rem",
            margin: "0 auto 2.2rem auto",
            textShadow: `0 0 30px ${hobby.glowColor}`,
            boxShadow: `0 0 50px ${hobby.glowColor}66`,
          }}
        >
          {hobby.impact}
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.1rem",
            justifyContent: "center",
            marginTop: "auto",
          }}
        >
          {hobby.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.16, rotate: 5 }}
              style={{
                padding: "0.8rem 1.8rem",
                background: "rgba(0, 255, 255, 0.18)",
                color: "#00ffff",
                borderRadius: "22px",
                fontSize: "1.08rem",
                fontWeight: "700",
                border: "2px solid rgba(0, 255, 255, 0.55)",
                boxShadow: "0 0 32px rgba(0, 255, 255, 0.35)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Bottom Glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "10px",
            background: `linear-gradient(90deg, transparent, ${hobby.glowColor}, transparent)`,
            boxShadow: `0 0 80px ${hobby.glowColor}`,
          }}
        />
      </motion.div>
    ))}
  </motion.div>
</Section>
     {/* Extracurricular Activities – FINAL COMPACT VERSION */}
<Section id="extracurricular" ref={extracurricularRef}>
  <SectionTitle
    initial="hidden"
    animate={isExtracurricularInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Extracurricular Activities
  </SectionTitle>

  {/* 2 CARDS PER ROW – TIGHT, POWERFUL, PERFECT */}
  <motion.div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "2rem 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(540px, 1fr))",
      gap: "4rem",
    }}
  >
    {[
      {
        title: "Technical Workshops & Seminars",
        desc: "Led workshops on MERN, AI/ML & Full-Stack. Mentored peers and built a thriving developer community.",
        tags: ["Leadership", "Mentorship", "Public Speaking", "Community"],
        impact: "100+ students trained • 5+ workshops • Created tech ecosystem",
        badge: "Tech Mentor",
        glowColor: "#ff00ff",
        rank: "Leader"
      },
      {
        title: "Certifications & Learning",
        desc: "Earned elite certifications in AI/ML, Cloud, DevOps & Full-Stack from Coursera, Google Cloud, Udemy.",
        tags: ["Lifelong Learner", "8+ Elite Certs", "Future-Proof", "Growth"],
        impact: "8+ advanced certs • Always ahead • Industry-ready forever",
        badge: "Certified Prodigy",
        glowColor: "#00ff88",
        rank: "Elite"
      }
    ].map((activity, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80 }}
        animate={isExtracurricularInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.2, ease: "easeOut" }}
        whileHover={{ y: -18, transition: { duration: 0.45 } }}
        style={{
          background: "rgba(10, 25, 50, 0.96)",
          backdropFilter: "blur(32px)",
          border: `3.5px solid ${activity.glowColor}`,
          borderRadius: "46px",
          padding: "3.2rem 3.4rem",
          minHeight: "420px",                    // Reduced from 520px → now super compact
          boxShadow: `
            0 45px 120px rgba(0, 0, 0, 0.92),
            0 0 130px ${activity.glowColor}aa,
            inset 0 0 90px ${activity.glowColor}44
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Glow */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "10px", background: `linear-gradient(90deg, transparent, ${activity.glowColor}, transparent)`, boxShadow: `0 0 80px ${activity.glowColor}` }} />

        {/* Rank Badge */}
        <div style={{ position: "absolute", top: "1.8rem", right: "2rem", background: "#000", color: activity.glowColor, padding: "0.8rem 1.7rem", borderRadius: "22px", fontSize: "1.3rem", fontWeight: "900", border: `2.8px solid ${activity.glowColor}`, boxShadow: `0 0 45px ${activity.glowColor}`, textTransform: "uppercase" }}>
          {activity.rank}
        </div>

        {/* Main Badge */}
        <div style={{ position: "absolute", top: "1.8rem", left: "2rem", background: "rgba(0, 255, 255, 0.28)", color: "#00ffff", padding: "0.7rem 1.7rem", borderRadius: "20px", fontSize: "1.2rem", fontWeight: "800", border: "2.2px solid rgba(0, 255, 255, 0.75)", boxShadow: "0 0 45px rgba(0, 255, 255, 0.55)" }}>
          {activity.badge}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "2.6rem", fontWeight: "900", color: activity.glowColor, margin: "0 0 1rem 0", textShadow: `0 0 38px ${activity.glowColor}`, letterSpacing: "1.5px" }}>
          {activity.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: "1.32rem", color: "#e0fbfc", lineHeight: "1.9", marginBottom: "2rem", opacity: 0.98, flex: 1 }}>
          {activity.desc}
        </p>

        {/* Impact Badge */}
        <div style={{ display: "inline-block", padding: "1.1rem 2.4rem", background: `${activity.glowColor}33`, border: `2.8px solid ${activity.glowColor}`, borderRadius: "26px", color: activity.glowColor, fontWeight: "800", fontSize: "1.26rem", marginBottom: "2.2rem", boxShadow: `0 0 55px ${activity.glowColor}88` }}>
          {activity.impact}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "auto" }}>
          {activity.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.15 }}
              style={{
                padding: "0.85rem 1.9rem",
                background: "rgba(0, 255, 255, 0.22)",
                color: "#00ffff",
                borderRadius: "22px",
                fontSize: "1.1rem",
                fontWeight: "700",
                border: "2px solid rgba(0, 255, 255, 0.6)",
                boxShadow: "0 0 35px rgba(0, 255, 255, 0.35)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Bottom Glow */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "9px", background: `linear-gradient(90deg, transparent, ${activity.glowColor}, transparent)`, boxShadow: `0 0 75px ${activity.glowColor}` }} />
      </motion.div>
    ))}
  </motion.div>
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
          Open to delivering impactful solutions in Full-Stack Development, AI, Data Science, and Cloud — let’s work together to drive innovation
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
            placeholder="Share your project idea — together we can craft scalable, future-ready solutions!"
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

      {/* Resume & Portfolio Section – FINAL COMPACT MASTERPIECE */}
<Section id="resume" ref={resumeRef}>
  <SectionTitle
    initial="hidden"
    animate={isResumeInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    Resume & Portfolio
  </SectionTitle>

  {/* SINGLE EPIC CARD – TIGHT, DOMINANT, FLAWLESS */}
  <motion.div
    style={{
      maxWidth: "1000px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      padding: "2rem 1.5rem",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.94 }}
      animate={isResumeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{ y: -18, scale: 1.04, transition: { duration: 0.55 } }}
      style={{
        background: "rgba(10, 25, 50, 0.96)",
        backdropFilter: "blur(32px)",
        border: "3.5px solid rgba(0, 255, 255, 0.8)",
        borderRadius: "48px",
        padding: "3.6rem 3.8rem",
        maxWidth: "780px",           // Reduced horizontal size
        width: "100%",
        minHeight: "540px",          // Reduced vertical size (was ~800px+)
        boxShadow: `
          0 50px 130px rgba(0, 0, 0, 0.94),
          0 0 140px rgba(0, 255, 255, 0.55),
          inset 0 0 100px rgba(0, 255, 255, 0.22)
        `,
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Top Glow */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "10px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)", boxShadow: "0 0 80px #00ffff" }} />

      {/* Crown Badge */}
      <div style={{
        position: "absolute",
        top: "-24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#000",
        color: "#00ffff",
        padding: "0.9rem 2.4rem",
        borderRadius: "28px",
        fontSize: "1.35rem",
        fontWeight: "900",
        letterSpacing: "2.5px",
        border: "3.5px solid #00ffff",
        boxShadow: "0 0 65px #00ffff",
        zIndex: 20,
        textTransform: "uppercase",
      }}>
        Official Resume
      </div>

      {/* Name */}
      <h3 style={{
        fontSize: "3.2rem",
        fontWeight: "900",
        color: "#00ffff",
        margin: "1.8rem 0 0.8rem 0",
        textShadow: "0 0 45px #00ffff",
        letterSpacing: "2.2px",
      }}>
        Siva Satya Sai Bhagavan
      </h3>

      <p style={{
        fontSize: "1.45rem",
        color: "#00d4ff",
        marginBottom: "1.6rem",
        fontWeight: "700",
        letterSpacing: "1.2px",
      }}>
        Full-Stack • AI/ML • System Architect
      </p>

      {/* Short Bio */}
      <p style={{
        fontSize: "1.36rem",
        color: "#e0fbfc",
        lineHeight: "1.95",
        maxWidth: "680px",
        margin: "0 auto 2.4rem auto",
        opacity: 0.98,
      }}>
        MERN Stack Specialist • AI-Powered Systems • Cloud-Native Engineer
        <br />
        Hackathon Winner • Mentor • Technical Writer • Future Builder
      </p>

      {/* Impact Line */}
      <div style={{
        display: "inline-block",
        padding: "1.1rem 2.8rem",
        background: "linear-gradient(90deg, rgba(0,255,255,0.32), rgba(0,255,200,0.32))",
        border: "3px solid rgba(0, 255, 255, 0.9)",
        borderRadius: "30px",
        color: "#00ffff",
        fontWeight: "900",
        fontSize: "1.32rem",
        margin: "0 auto 3rem auto",
        boxShadow: "0 0 70px rgba(0, 255, 255, 0.75)",
        textShadow: "0 0 35px #00ffff",
      }}>
        Ready to Build the Future — Together
      </div>

      {/* Action Buttons – Compact & Powerful */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2.2rem", flexWrap: "wrap", marginTop: "auto" }}>
        <motion.button
          onClick={openResumeModal}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: "1.3rem 3.4rem",
            background: "linear-gradient(90deg, #00ffff, #00d0ff)",
            color: "#000",
            border: "none",
            borderRadius: "26px",
            fontSize: "1.35rem",
            fontWeight: "900",
            cursor: "pointer",
            boxShadow: "0 15px 50px rgba(0, 255, 255, 0.8)",
            letterSpacing: "1.2px",
          }}
        >
          View Resume
        </motion.button>

        <motion.a
          href={resumePdf}
          download="Siva_Bhagavan_Resume_2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: "1.3rem 3.4rem",
            background: "rgba(0, 255, 255, 0.24)",
            color: "#00ffff",
            border: "3px solid #00ffff",
            borderRadius: "26px",
            fontSize: "1.35rem",
            fontWeight: "900",
            textDecoration: "none",
            boxShadow: "0 15px 50px rgba(0, 255, 255, 0.6)",
            letterSpacing: "1.2px",
          }}
        >
          Download PDF
        </motion.a>
      </div>

      {/* Bottom Glow */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "9px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)", boxShadow: "0 0 75px #00ffff" }} />
    </motion.div>
  </motion.div>
</Section>
  <Footer>
  <FooterContent
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={staggerContainer}
  >
    {/* Name with Electric Glitch + Pulse Effect */}
    <FooterTitle variants={fadeInUp}>
      <motion.span
        animate={{ 
          textShadow: [
            "0 0 10px #00ffff",
            "0 0 20px #00ffff",
            "0 0 10px #00ffff"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Siva Satya Sai Bhagavan
      </motion.span>
      <FaBolt 
        style={{ 
          fontSize: '1.4rem', 
          marginLeft: '0.5rem',
          color: '#00ffff',
          filter: 'drop-shadow(0 0 12px #00ffff)',
          animation: 'pulse 1.5s infinite'
        }} 
      />
    </FooterTitle>

    {/* Futuristic Tagline with Neon Glow */}
    <FooterText variants={fadeInUp}>
      <motion.span
        initial={{ opacity: 0.6 }}
        whileInView={{ opacity: 1 }}
        style={{
          background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)',
          backgroundSize: '200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'flow 6s linear infinite',
          fontWeight: '600',
          letterSpacing: '1px'
        }}
      >
        © {new Date().getFullYear()} | MERN Stack | AI & Data Science | Cloud Computing | Scalable Solutions
      </motion.span>
    </FooterText>

    {/* Navigation Links — Neon Hover Trail */}
    <FooterLinks>
      {["Home", "About", "Projects", "Skills", "Resume", "Contact"].map((link, i) => (
        <FooterLink
          key={link}
          href={`#${link.toLowerCase()}`}
          variants={fadeInUp}
          custom={i}
          whileHover={{ 
            scale: 1.15,
            color: "#00ffff",
            textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
            transition: { type: "spring", stiffness: 400 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            style={{ position: 'relative' }}
            whileHover={{
              boxShadow: "0 0 15px #00ffff",
            }}
          >
            {link}
          </motion.span>
        </FooterLink>
      ))}
    </FooterLinks>

    {/* Social Icons — Orbiting Glow + 3D Flip */}
    <FooterSocials>
      <SocialLink 
        href="mailto:g.sivasatyasaibhagavan@gmail.com"
        whileHover={{ 
          scale: 1.4, 
          rotate: 360,
          filter: "drop-shadow(0 0 20px #ff0066)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        <FaEnvelope />
      </SocialLink>

      <SocialLink 
        href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/" 
        target="_blank" 
        rel="noreferrer"
        whileHover={{ 
          scale: 1.4, 
          rotateY: 180,
          filter: "drop-shadow(0 0 20px #0077b5)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.6 }}
      >
        <FaLinkedin />
      </SocialLink>

      <SocialLink 
        href="https://github.com/bhagavan444" 
        target="_blank" 
        rel="noreferrer"
        whileHover={{ 
          scale: 1.4, 
          rotate: -360,
          filter: "drop-shadow(0 0 20px #00ff00)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        <FaGithub />
      </SocialLink>
    </FooterSocials>
  </FooterContent>

  {/* Neon Divider Line */}
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    style={{
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
      boxShadow: '0 0 20px #00ffff',
      marginTop: '2rem'
    }}
  />
</Footer>

{/* Scroll to Top — Now a Glowing Orb */}
{showTopBtn && (
  <ScrollTop
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ 
      scale: 1.3,
      boxShadow: "0 0 40px #00ffff, 0 0 80px #00ffff",
      background: "rgba(0, 255, 255, 0.3)"
    }}
    whileTap={{ scale: 0.9 }}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'rgba(0, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '2px solid #00ffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 999,
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
    }}
  >
    <FaArrowUp style={{ fontSize: '1.6rem', color: '#00ffff' }} />
  </ScrollTop>
)}

{/* Resume Modal — Holographic Upgrade */}
<AnimatePresence>
  {showResumeModal && (
    <ResumeModal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ 
        backdropFilter: 'blur(12px)',
        background: 'rgba(0, 0, 0, 0.8)'
      }}
    >
      <ModalContent
        initial={{ y: 100, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 100, scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          background: 'rgba(10, 15, 30, 0.95)',
          border: '1px solid #00ffff',
          borderRadius: '20px',
          boxShadow: '0 0 50px rgba(0, 255, 255, 0.4)',
          maxWidth: '900px',
          width: '95%',
          overflow: 'hidden'
        }}
      >
        <CloseButton 
          whileHover={{ 
            scale: 1.3, 
            rotate: 180, 
            color: '#ff0066',
            filter: 'drop-shadow(0 0 15px #ff0066)'
          }}
          whileTap={{ scale: 0.8 }}
          onClick={() => setShowResumeModal(false)}
        >
          <FiX />
        </CloseButton>

        <iframe
          src={`${resumePdf}#zoom=100&view=FitH&toolbar=0&navpanes=0`}
          title="Resume"
          style={{ 
            width: "100%", 
            height: "75vh", 
            border: "none", 
            borderRadius: "15px",
            boxShadow: 'inset 0 0 30px rgba(0, 255, 255, 0.2)'
          }}
        />

        <ModalButton 
          as="a" 
          href={resumePdf} 
          download="Siva_Bhagavan_Resume_2025.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ 
            scale: 1.08, 
            backgroundColor: "#00ffff", 
            color: "#000",
            boxShadow: "0 0 30px #00ffff"
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '1rem',
            padding: '0.9rem 2rem',
            background: 'rgba(0, 255, 255, 0.15)',
            border: '1px solid #00ffff',
            borderRadius: '50px',
            color: '#00ffff',
            fontWeight: 'bold'
          }}
        >
          <FiDownload style={{ marginRight: '0.5rem' }} /> Download Resume
        </ModalButton>
      </ModalContent>
    </ResumeModal>
  )}
</AnimatePresence>
    </Container>
  );
};

export default Home;