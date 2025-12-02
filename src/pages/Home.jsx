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
  gap: clamp(0.6rem, 1.3vw, 1.6rem);        /* Super tight – exactly what you asked for */
  align-items: center;
  margin-left: auto;
  padding-right: clamp(2.2rem, 5vw, 6rem);

  @media (max-width: 1024px) {
    gap: clamp(0.5rem, 1.1vw, 1.4rem);
    padding-right: clamp(1.6rem, 4vw, 4.8rem);
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100dvh;
    width: 320px;
    max-width: 90vw;
    background: rgba(5, 15, 35, 0.98);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 1.8rem;
    gap: 5rem;
    transform: translateX(110%);
    transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: -20px 0 90px rgba(0, 240, 255, 0.3);
    z-index: 9999;

    &.active {
      transform: translateX(0);
    }
  }

  @media (max-width: 480px) {
    width: 300px;
    max-width: 94vw;
    padding: 2rem 1.4rem;
    gap: 4.4rem;
  }
`;

const NavLink = styled.a`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: clamp(0.92rem, 1.85vw, 1.1rem);
  text-transform: uppercase;
  letter-spacing: 2.8px;
  color: rgba(224, 251, 252, 0.94);
  text-decoration: none;
  position: relative;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateZ(0);
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.08));
    border: 1px solid rgba(0,255,255,0.25);
    backdrop-filter: blur(8px);
    opacity: 0;
    transform: scale(0.92);
    transition: all 0.6s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 7px;
    left: 50%;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #00f0ff, #ff00ff, #8b5cf6, #00f0ff);
    background-size: 300% 100%;
    border-radius: 3px;
    transform: translateX(-50%);
    transition: width 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 0 22px #00f0ff;
  }

  &:hover {
    color: #00ffff;
    transform: translateY(-9px) scale(1.1);
    text-shadow: 
      0 0 25px #00ffff,
      0 0 50px #00ffff,
      0 0 80px rgba(0,255,255,0.7);
  }

  &:hover::before {
    opacity: 1;
    transform: scale(1.08);
    box-shadow: 0 0 30px rgba(0,255,255,0.4);
  }

  &:hover::after {
    width: 96%;
    animation: flowLine 3s linear infinite;
  }

  &.active {
    color: #00ffff;
    text-shadow: 0 0 35px #00ffff;
  }

  &.active::before {
    opacity: 0.35;
    animation: pulseCard 4s ease-in-out infinite;
  }

  &.active::after {
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #00ffff, #8b5cf6, #ff2aff);
    animation: flowLine 2.5s linear infinite;
  }

  @keyframes flowLine {
    0%   { background-position: 0% 0; }
    100% { background-position: 300% 0; }
  }

  @keyframes pulseCard {
     0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.4); }
    50%      { box-shadow: 0 0 45px rgba(0,255,255,0.8); }
  }
`;
const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: #00f0ff;
  font-size: 2.3rem;
  cursor: pointer;
  padding: 14px;
  border-radius: 16px;
  position: relative;
  z-index: 10000;
  transition: all 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 20px;
    background: conic-gradient(from 90deg, #00f0ff, #ff00ff, #8b5cf6, #00f0ff);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.7;
    animation: rotateRing 2.5s linear infinite;
  }

  &:active {
    transform: scale(0.92);
  }

  @media (max-width: 768px) {
    display: block;
  }

  @keyframes rotateRing {
    100% { transform: rotate(360deg); }
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
  border-radius: 50%;                    /* Only change: fully round */
  object-fit: cover;
  position: relative;
  z-index: 3;
  background: #000;
  overflow: hidden;
  transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;

  /* === EPIC MULTI-LAYER BORDER MAGIC (now perfectly round) === */
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;                  /* Round border */
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

  /* Inner neon edge glow – also round */
  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;                  /* Round inner glow */
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
    border-radius: 50%;                 /* Still round on tablet */
    &::before { inset: -6px; padding: 4px; border-radius: 50%; }
    &::after  { border-radius: 50%; }
    &:hover { transform: translateY(-16px) scale(1.07) rotateY(5deg); }
  }

  @media (max-width: 480px) {
    width: clamp(190px, 64vw, 260px);
    height: clamp(190px, 64vw, 260px);
    border-radius: 50%;                 /* Still round on mobile */
    &::before { inset: -5px; padding: 3.5px; border-radius: 50%; }
  }

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
  border-radius: 50%;                    /* Round ring to match */
  pointer-events: none;
  z-index: 2;
  isolation: isolate;
  
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

  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.5));

  @media (max-width: 768px) {
    top: -12px;
    left: -12px;
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    padding: 2.5px;
    border-radius: 50%;
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

  /* Sky-blue dominant cosmic background */
  background: 
    radial-gradient(circle at 20% 80%, rgba(100, 200, 255, 0.22), transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(135, 206, 250, 0.18), transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(135, 206, 255, 0.14), transparent 70%),
    linear-gradient(135deg, 
      #0a1628 0%, 
      #0f1e3a 35%, 
      #112240 70%, 
      #081222 100%
    );

  /* BREATHING SKY-BLUE HOLOGRAPHIC CORE */
  &::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 1300px; height: 1300px;
    background: conic-gradient(
      from 0deg at 50% 50%,
      #64c8ff 0deg,
      #87CEFA 70deg,
      #87CEEB 140deg,
      #00d4ff 200deg,
      #40c4ff 270deg,
      #64c8ff 360deg
    );
    border-radius: 50%;
    filter: blur(130px);
    opacity: 0.28;
    transform: translate(-50%, -50%);
    animation: auroraBreathe 20s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  /* Subtle sky-blue quantum grid */
  &::after {
    content: '';
    position: absolute;
    inset: -50%;
    background: 
      repeating-linear-gradient(30deg, transparent 0px, transparent 80px, rgba(100, 200, 255, 0.05) 81px, rgba(100, 200, 255, 0.05) 82px),
      repeating-linear-gradient(150deg, transparent 0px, transparent 80px, rgba(135, 206, 250, 0.04) 81px, rgba(135, 206, 250, 0.04) 82px);
    background-size: 200px 200px;
    animation: latticeFlow 45s linear infinite;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  /* Floating sky-blue rings */
  > .ring-1, > .ring-2, > .ring-3 {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(135, 206, 250, 0.25);
    opacity: 0.35;
    pointer-events: none;
    animation: floatRing 28s linear infinite;
  }

  > .ring-1 { width: 850px; height: 850px; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(0deg); border-color: rgba(100, 200, 255, 0.3); }
  > .ring-2 { width: 650px; height: 650px; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); border-color: rgba(135, 206, 250, 0.28); animation-delay: -9s; }
  > .ring-3 { width: 1050px; height: 450px; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(20deg); border-color: rgba(100, 200, 255, 0.22); animation-delay: -16s; }

  @keyframes auroraBreathe {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.24; }
    50%      { transform: translate(-50%, -50%) scale(1.35); opacity: 0.34; }
  }

  @keyframes latticeFlow {
    0%   { background-position: 0 0, 0 0; }
    100% { background-position: 200px 200px, -200px -200px; }
  }

  @keyframes floatRing {
    0%   { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
    100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
  }
`;

// GORGEOUS SKY-BLUE TEXT
const ContactIntro = styled(motion.p)`
  z-index: 2;
  font-size: clamp(1.5rem, 3.5vw, 2.1rem);
  max-width: 920px;
  margin: 0 auto 3.5rem;
  text-align: center;
  line-height: 1.75;
  font-weight: 600;
  letter-spacing: 1px;

  background: linear-gradient(90deg, #64c8ff, #87CEFA, #87CEEB, #40c4ff, #64c8ff);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(135, 206, 250, 0.6);
  animation: textFlow 14s ease-in-out infinite;

  padding: 1.8rem 2.5rem;
  border-radius: 24px;
  backdrop-filter: blur(12px);
  background-color: rgba(10, 25, 47, 0.5);
  border: 1.5px solid rgba(135, 206, 250, 0.4);

  @keyframes textFlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

// FORM – CLEAN & SKY-BLUE ACCENTS
const Form = styled(motion.form)`
  max-width: 760px;
  margin: 0 auto;
  padding: 3.2rem 3rem;
  background: rgba(10, 25, 50, 0.96);
  border: 2.5px solid rgba(135, 206, 250, 0.7);
  border-radius: 38px;
  backdrop-filter: blur(32px);
  box-shadow: 
    0 0 90px rgba(135, 206, 250, 0.4),
    inset 0 0 70px rgba(135, 206, 250, 0.15),
    0 35px 90px rgba(0, 0, 0, 0.8);
  z-index: 10;
  position: relative;
  overflow: hidden;
`;

// INPUTS – SKY BLUE FOCUS
const Input = styled(motion.input)`
  padding: 1.4rem 2rem;
  background: rgba(135, 206, 250, 0.08);
  border: 2px solid rgba(135, 206, 250, 0.4);
  border-radius: 24px;
  color: #e6f3ff;
  font-size: 1.15rem;
  transition: all 0.4s ease;

  &::placeholder {
    color: rgba(135, 206, 250, 0.8);
    font-weight: 500;
  }

  &:focus {
    outline: none;
    border-color: #87CEEB;
    background: rgba(135, 206, 250, 0.18);
    box-shadow: 0 0 30px rgba(135, 206, 250, 0.6);
  }
`;

const Textarea = styled(motion.textarea)`
  min-height: 180px;
  padding: 1.6rem 2rem;
  background: rgba(135, 206, 250, 0.08);
  border: 2px solid rgba(135, 206, 250, 0.4);
  border-radius: 28px;
  color: #e6f3ff;
  font-size: 1.2rem;
  resize: none;
  transition: all 0.4s ease;

  &::placeholder {
    color: rgba(135, 206, 250, 0.8);
  }

  &:focus {
    outline: none;
    border-color: #87CEEB;
    background: rgba(135, 206, 250, 0.18);
    box-shadow: 0 0 35px rgba(135, 206, 250, 0.6);
  }
`;

// BUTTON – SKY BLUE GRADIENT
const SubmitButton = styled(motion.button)`
  padding: 1.3rem 4rem;
  background: linear-gradient(90deg, #64c8ff, #87CEEB, #40c4ff);
  color: #000;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 15px 50px rgba(135, 206, 250, 0.6);
  transition: all 0.4s ease;

  &:hover:not(:disabled) {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 25px 70px rgba(135, 206, 250, 0.8);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// OTHER COMPONENTS – UPDATED COLORS
const CharCount = styled.p`
  color: #87CEEB;
  font-weight: 600;
  text-shadow: 0 0 15px rgba(135, 206, 250, 0.5);
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
`;

const SuccessMessage = styled(motion.p)`
  color: #00ff9d;
  background: rgba(0, 255, 157, 0.15);
  padding: 1.2rem 2.5rem;
  border-radius: 24px;
  border: 1.5px solid #00ff9d;
  text-shadow: 0 0 20px #00ff9d;
  font-weight: 700;
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
        <NavBrand href="#home">Bhagavan | Full-Stack & AI&ML<FaStar style={{ fontSize: '1rem', marginLeft: '0.2rem' }} /></NavBrand>
        <NavLinks>
          
          <NavLink href="#internships">Experience</NavLink>
<NavLink href="#projects">Projects</NavLink>
<NavLink href="#skills">Skills</NavLink>
<NavLink href="#certifications">Certifications</NavLink>
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
            <Title variants={fadeInUp}> GopalaJosyula Siva Satya Sai Bhagavan </Title>
            <TypingSubtitle text="AI/ML & Full-Stack Engineering | Building scalable MERN and Python systems | Cloud, DevOps, and data-powered architectures for modern product innovation." />

            <motion.div
              variants={fadeInUp}
              style={{ display: "flex", gap: "1.8rem", justifyContent: "center", flexWrap: 'wrap' }}
            >
              <CTAButton
                href="#projects"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <FaProjectDiagram /> Project Showcase
              </CTAButton>
              <CTAButton
                href="#contact"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <FiSend /> Get in Touch
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
  {/* Epic Gradient Title – Matches all other sections */}
  <SectionTitle
    initial="hidden"
    animate={isAboutInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #64dcff, #40c4ff, #87CEEB)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(100, 220, 255, 0.6)",
      letterSpacing: "8px",
      textAlign: "center",
    }}
  >
    ABOUT ME
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 6rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
  }}>
    Full-Stack × AI Engineer | Building the future, one line of code at a time.
  </p>

  {/* MEDIUM RECTANGULAR HERO CARD – SAME AS PROJECTS & EDUCATION */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      placeItems: "center",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -20 }}
      animate={isAboutInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1.1, ease: "easeOut" }}
      style={{
        width: "100%",
        maxWidth: "1000px",
        background: "rgba(8, 20, 48, 0.98)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "3.5px solid #64dcff60",
        borderRadius: "44px",
        padding: "4rem 4.5rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 40px 110px rgba(0, 0, 0, 0.9),
          0 0 140px #64dcff55,
          inset 0 0 100px #64dcff18
        `,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        borderColor: "#64dcff",
        boxShadow: `
          0 50px 130px rgba(0, 0, 0, 0.95),
          0 0 180px #64dcff88,
          inset 0 0 120px #64dcff30
        `,
      }}
    >
      {/* Top & Bottom Glow Lines */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "7px",
        background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
        filter: "drop-shadow(0 0 45px #64dcff)",
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "7px",
        background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
        filter: "drop-shadow(0 0 45px #64dcff)",
      }} />

      {/* Floating Badge – Iconic */}
      <div style={{
        position: "absolute",
        top: "-22px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#64dcff",
        color: "#000",
        padding: "1rem 3rem",
        borderRadius: "60px",
        fontSize: "1.6rem",
        fontWeight: "900",
        letterSpacing: "3px",
        boxShadow: "0 0 80px #64dcff",
        textTransform: "uppercase",
        zIndex: 10,
      }}>
        Full-Stack × AI Engineer
      </div>

      {/* About Text */}
      <div style={{ textAlign: "center" }}>
        <motion.p
          style={{
            fontSize: "1.68rem",
            color: "#e0f8ff",
            lineHeight: "2",
            maxWidth: "840px",
            margin: "2.5rem auto 0",
            fontWeight: "500",
          }}
          initial={{ opacity: 0 }}
          animate={isAboutInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          Passionate <strong>B.Tech Artificial Intelligence & Data Science</strong> student skilled in building intelligent, scalable applications using the <strong>MERN Stack</strong> and <strong>AI/ML</strong>. Experienced in developing full-stack web apps, deploying ML models, and creating real-world solutions through data-driven problem solving.

          <br /><br />
          I create high-performance web applications and AI solutions that don’t just work — they <strong>deliver results</strong>.

          <br /><br />
          <em>Open Source Contributor • Tech Innovator • Always Building What’s Next</em>

        </motion.p>

        {/* Signature Line */}
        <motion.div
          style={{
            height: "4px",
            width: "200px",
            background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
            margin: "3.5rem auto 0",
            borderRadius: "2px",
            boxShadow: "0 0 55px #64dcff",
          }}
          initial={{ scaleX: 0 }}
          animate={isAboutInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
      </div>
    </motion.div>
  </motion.div>
</Section>
      <Section id="education" ref={educationRef}>
  {/* Epic Title */}
  <SectionTitle
    initial="hidden"
    animate={isEducationInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #64dcff, #40c4ff, #87CEEB)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(100, 220, 255, 0.6)",
      letterSpacing: "8px",
      textAlign: "center",
    }}
  >
     EDUCATION
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
  }}>
    Strong academic foundation in Artificial Intelligence & Data Science.
  </p>

  {/* COMPACT HERO CARD — REDUCED SIZE, PERFECT BALANCE */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      placeItems: "center",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 90, rotateX: -18 }}
      animate={isEducationInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1.1, ease: "easeOut" }}
      style={{
        width: "100%",
        maxWidth: "1000px",                    // Reduced from 1200px → perfect compact size
        background: "rgba(8, 20, 48, 0.98)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "3.5px solid #64dcff60",
        borderRadius: "44px",
        padding: "3.8rem 4.2rem",              // Reduced padding for tighter look
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 40px 110px rgba(0, 0, 0, 0.9),
          0 0 140px #64dcff55,
          inset 0 0 100px #64dcff18
        `,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        borderColor: "#64dcff",
        boxShadow: `
          0 50px 130px rgba(0, 0, 0, 0.95),
          0 0 180px #64dcff88,
          inset 0 0 120px #64dcff30
        `,
      }}
    >
      {/* Top & Bottom Glow Lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "7px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)", filter: "drop-shadow(0 0 45px #64dcff)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "7px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)", filter: "drop-shadow(0 0 45px #64dcff)" }} />

      {/* Degree Badge */}
      <div style={{
        position: "absolute",
        top: "2rem",
        right: "2.5rem",
        background: "#64dcff",
        color: "#000",
        padding: "0.9rem 2.2 RQrem",
        borderRadius: "50px",
        fontSize: "1.35rem",
        fontWeight: "900",
        letterSpacing: "1.8px",
        boxShadow: "0 0 60px #64dcff",
        textTransform: "uppercase",
      }}>
        B Tech AI&DS
      </div>

      {/* Year Badge */}
      <div style={{
        position: "absolute",
        top: "2rem",
        left: "2.5rem",
        background: "rgba(100, 220, 255, 0.15)",
        color: "#64dcff",
        padding: "0.8rem 1.8rem",
        borderRadius: "50px",
        fontSize: "1.2rem",
        fontWeight: "800",
        border: "2px solid #64dcff60",
        backdropFilter: "blur(10px)",
      }}>
        2022 – 2026
      </div>

      {/* Main Content */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{
          fontSize: "clamp(2.8rem, 6.5vw, 4.6rem)",
          fontWeight: "900",
          color: "#ffffff",
          margin: "0 0 0.8rem 0",
          textShadow: "0 0 35px rgba(255,255,255,0.6)",
        }}>
          Ramachandra College of Engineering
        </h3>

        <p style={{
          fontSize: "1.7rem",
          color: "#64dcff",
          fontWeight: "700",
          margin: "0 0 2.2rem 0",
          textShadow: "0 0 28px #64dcff",
        }}>
          Eluru • JNTUK University
        </p>

        <p style={{
          fontSize: "1.48rem",
          color: "#c0e8ff",
          lineHeight: "1.85",
          margin: "0 auto 3rem",
          maxWidth: "780px",
          fontWeight: "500",
        }}>
          Pursuing <strong>Bachelor of Technology in Artificial Intelligence & Data Science</strong><br />
          <strong>Current CGPA:</strong> 7.8 / 10.0 • Final Year Student
        </p>

        {/* Compact Skills Tags */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.2rem",
          justifyContent: "center",
        }}>
          {[
            "MERN Stack",
"Artificial Intelligence & Machine Learning",
"Python • Java • SQL",
"Deep Learning (TensorFlow, Keras)",
"Data Science & Analytics",
"REST APIs & Backend Development",
"Database Management (MongoDB, MySQL)",
"Version Control (Git & GitHub)"

          ].map((skill, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.08 }}
              style={{
                padding: "0.8rem 1.9rem",
                background: "rgba(100, 220, 255, 0.12)",
                color: "#88d8ff",
                borderRadius: "22px",
                fontSize: "1.08rem",
                fontWeight: "600",
                border: "1.6px solid rgba(100, 220, 255, 0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
</Section>
      <Section id="projects" ref={projectsRef}>
  {/* Epic Title */}
  <SectionTitle
    initial="hidden"
    animate={isProjectsInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #64dcff, #40c4ff, #87CEEB)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(100, 220, 255, 0.6)",
      letterSpacing: "8px",
      textAlign: "center",
    }}
  >
      My PROJECTS
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 6rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
  }}>
    Designed for reliability, optimized for scale, and deployed with purpose.
  </p>

  {/* 2 PROJECTS PER ROW — EXACT SAME CARD STYLE AS HACKATHONS */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(560px, 1fr))",
      gap: "4rem",
    }}
  >
    {[
      {
  title: "AI Chatbot Platform",
  desc: "Intelligent chatbot platform powered by OpenAI, featuring real-time conversation handling, secure backend APIs, and an analytics dashboard for monitoring user interactions.",
  tags: ["React", "Node.js", "OpenAI API", "Socket.io", "MERN Stack", "Tailwind CSS"],
  link: "https://github.com/bhagavan444/chatbotwebapp",
  demo: "https://drive.google.com/file/d/1pOfpAUaFigPo9w-YB7s4MuIEE3-bdTr0/view",
  impact: "Handles 10,000+ queries with 95% response accuracy and 40% faster processing.",
},

      {
  title: "Resume Builder Web App",
  desc: "Full-stack resume builder with ATS-friendly templates, AI-powered scoring, real-time PDF/Word export, and secure OAuth authentication for seamless user access.",
  tags: ["MERN Stack", "OAuth", "PDF/Word Export", "AI Scoring", "MongoDB", "Node.js"],
  link: "https://github.com/bhagavan444/Resumebuilderwebapp",
  demo: "https://drive.google.com/file/d/1Ml9hSjYsHldIIDQQtHvr0gpIn1RTvBhk/view",
  impact: "Reduced resume creation time by 70% and served 500+ active users.",
},

      {
  title: "Heart Disease Prediction",
  desc: "Machine learning–based prediction system using TensorFlow models with a Flask backend and an interactive web interface for real-time risk assessment.",
  tags: ["TensorFlow", "Flask", "Machine Learning", "Healthcare AI", "Python"],
  link: "https://github.com/bhagavan444/Heartdiseasewebapp",
  demo: "https://drive.google.com/file/d/1UYQasrq1EMuDOcBZiAHF19JyR6F5T7g4/view",
  impact: "Achieved 92% prediction accuracy with a fully deployable end-to-end workflow.",
},

      {
  title: "Career Path Recommender",
  desc: "Machine learning–based recommendation system that suggests personalized career paths based on user skills, interests, and dataset-driven analysis.",
  tags: ["Python", "Machine Learning", "Streamlit", "Recommendation Engine"],
  link: "https://github.com/bhagavan444/carrerrecomendation",
  demo: "https://drive.google.com/file/d/1cHQUdThz6tm7uvds_g2OfMcg3j9wHuRS/view",
  impact: "Achieved 85% recommendation accuracy with an intuitive, interactive interface.",
},

      {
  title: "Fake News Detector",
  desc: "NLP-based fake news classification system using TF-IDF and machine learning models, deployed with a Flask API and React frontend for real-time text analysis.",
  tags: ["NLP", "Machine Learning", "TF-IDF", "Flask", "React"],
  link: "https://github.com/bhagavan444/fakenewsdetectorwebapp",
  demo: "https://drive.google.com/file/d/1sBIB10_UrncsuAhfs3ekjSJbE58LxUQO/view?usp=sharing",
  impact: "Achieved 94% classification accuracy with a fully deployed end-to-end system.",
},

      {
  title: "Dynamic Portfolio (This Site)",
  desc: "Interactive, high-performance developer portfolio built with React and Framer Motion, featuring smooth animations, responsive design, and a modern glassmorphic UI.",
  tags: ["React", "Framer Motion", "Vite", "UI/UX", "Animations"],
  link: "https://github.com/bhagavan444/portfolio",
  demo: "https://bhagavansportfolio.netlify.app",
  impact: "Fully custom-built portfolio delivering a smooth 60fps experience with polished UI/UX.",
},

    ].map((project, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80, rotateX: -18 }}
        animate={isProjectsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.95, delay: i * 0.15, ease: "easeOut" }}
        style={{
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "3px solid #64dcff60",
          borderRadius: "40px",
          padding: "3.2rem 3rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 35px 100px rgba(0, 0, 0, 0.85),
            0 0 130px #64dcff50,
            inset 0 0 90px #64dcff18
          `,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: "#64dcff99",
          boxShadow: `
            0 40px 120px rgba(0, 0, 0, 0.9),
            0 0 160px #64dcff80,
            inset 0 0 110px #64dcff28
          `,
        }}
      >
        {/* Top & Bottom Glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)", filter: "drop-shadow(0 0 40px #64dcff)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)", filter: "drop-shadow(0 0 40px #64dcff)" }} />

        {/* Project Badge */}
        <div style={{
          position: "absolute",
          top: "1.8rem",
          right: "2rem",
          background: "#64dcff",
          color: "#000",
          padding: "0.8rem 1.8rem",
          borderRadius: "50px",
          fontSize: "1.1rem",
          fontWeight: "900",
          boxShadow: "0 0 50px #64dcff",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>
          Live
        </div>

        <h3 style={{
          fontSize: "2.3rem",
          fontWeight: "900",
          color: "#ffffff",
          margin: "0 0 0.8rem 0",
          textShadow: "0 0 30px rgba(255,255,255,0.5)",
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: "1.22rem",
          color: "#c0e8ff",
          lineHeight: "1.8",
          margin: "0 0 2rem 0",
          fontWeight: "500",
        }}>
          {project.desc}
        </p>

        {/* Impact */}
        <div style={{
          display: "inline-block",
          padding: "0.9rem 2.4rem",
          background: "rgba(100, 220, 255, 0.2)",
          border: "2px solid #64dcff",
          borderRadius: "50px",
          color: "#64dcff",
          fontSize: "1.15rem",
          fontWeight: "800",
          margin: "0 0 2.5rem 0",
          boxShadow: "0 0 50px #64dcff66",
        }}>
          {project.impact}
        </div>

        {/* Tags */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}>
          {project.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1 }}
              style={{
                padding: "0.7rem 1.6rem",
                background: "rgba(100, 220, 255, 0.12)",
                color: "#88d8ff",
                borderRadius: "20px",
                fontSize: "0.98rem",
                fontWeight: "600",
                border: "1.5px solid rgba(100, 220, 255, 0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1.8rem" }}>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1rem 2.6rem",
              background: "transparent",
              color: "#64dcff",
              border: "2.5px solid #64dcff",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "800",
              textDecoration: "none",
              boxShadow: "0 12px 40px #64dcff40",
            }}
          >
            View Code
          </motion.a>

          <motion.a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1rem 2.8rem",
              background: "#64dcff",
              color: "#000",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "900",
              textDecoration: "none",
              boxShadow: "0 15px 50px #64dcff80",
            }}
          >
            Live Demo
          </motion.a>
        </div>
      </motion.div>
    ))}
  </motion.div>
</Section>
    <Section id="skills" ref={skillsRef}>
  {/* Clean Futuristic Title */}
  <SectionTitle
    initial="hidden"
    animate={isSkillsInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #00ffff, #00d0ff, #0088ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(0, 255, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
    SKILLS
  </SectionTitle>

  <p style={{
    color: "#a0f0ff",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5.5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(0, 255, 255, 0.3)",
  }}>
    Production-grade expertise across the full stack — validated by real projects & global certifications.
  </p>

  {/* MODERN MINIMAL GRID – Fresh Look */}
  <motion.div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
      gap: "2.8rem",
    }}
  >
    {[
      {
  title: "Languages",
  skills: ["Python 90%", "JavaScript (ES6) 85%", "Java 80%", "SQL 85%", "C 75%"]
},
{
  title: "Frontend",
  skills: ["React.js 88%", "HTML5 90%", "CSS3 88%", "Tailwind CSS 92%", "Vite 85%"]
},
{
  title: "Backend & APIs",
  skills: ["Node.js 85%", "Express.js 88%", "REST APIs 90%", "Flask 82%", "Streamlit 80%"]
},
{
  title: "AI & ML",
  skills: ["Machine Learning 88%", "Deep Learning 85%", "TensorFlow 85%", "Scikit-learn 90%", "NLP 82%"]
},
{
  title: "Cloud & DevOps",
  skills: ["AWS (Certified) 80%", "Git & GitHub 95%", "Linux 80%", "CI/CD (GitHub Actions) 75%", "Deployment (Flask/Streamlit) 85%"]
},
{
  title: "Databases",
  skills: ["MongoDB 90%", "MySQL 85%", "Firebase 78%", "Database Design 82%"]
}

    ].map((category, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 60 }}
        animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
        style={{
          background: "rgba(15, 30, 60, 0.92)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid rgba(0, 255, 255, 0.4)",
          borderRadius: "28px",
          padding: "2.6rem 2.2rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.7),
            0 0 80px rgba(0, 255, 255, 0.25),
            inset 0 0 60px rgba(0, 255, 255, 0.08)
          `,
          transform: "translateZ(0)",
        }}
      >
        {/* Top Accent Line */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #00ffff, #0088ff)",
          borderRadius: "28px 28px 0 0",
        }} />

        {/* Category Title */}
        <h3 style={{
          fontSize: "1.8rem",
          fontWeight: "900",
          color: "#00ffff",
          margin: "0 0 2rem 0",
          textAlign: "center",
          textShadow: "0 0 20px #00ffff",
          letterSpacing: "1.2px",
        }}>
          {category.title}
        </h3>

        {/* Skills List – Clean & Fast */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.1rem 1.6rem",
        }}>
          {category.skills.map((skill, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isSkillsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 + j * 0.08 }}
              style={{
                background: "rgba(0, 255, 255, 0.08)",
                border: "1px solid rgba(0, 255, 255, 0.3)",
                borderRadius: "16px",
                padding: "1rem 1.4rem",
                textAlign: "center",
                fontWeight: "700",
                color: "#e0fbfc",
                fontSize: "1.05rem",
                backdropFilter: "blur(10px)",
                boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.1)",
                transition: "all 0.3s ease",
              }}
              whileHover={{
                background: "rgba(0, 255, 255, 0.15)",
                borderColor: "rgba(0, 255, 255, 0.6)",
                boxShadow: "0 0 25px rgba(0, 255, 255, 0.3)",
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>

        {/* Subtle Corner Glows */}
        <div style={{
          position: "absolute",
          top: "-2px", left: "-2px",
          width: "60px", height: "60px",
          background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
          borderRadius: "28px",
          opacity: 0.4,
        }} />
        <div style={{
          position: "absolute",
          bottom: "-2px", right: "-2px",
          width: "60px", height: "60px",
          background: "radial-gradient(circle, #0088ff 0%, transparent 70%)",
          borderRadius: "28px",
          opacity: 0.4,
        }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
      <Section id="internships" ref={internshipsRef}>
  {/* Epic Title */}
  <SectionTitle
    initial="hidden"
    animate={isInternshipsInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #64dcff, #40c4ff, #87CEEB)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(100, 220, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
     INDUSTRY INTERNSHIPS
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 6rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
  }}>
    Real-world impact. Built production systems for MNCs.
  </p>

  {/* GRID: 2 Cards per Row + 1 Full-Width Hero Card */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(560px, 1fr))",
      gap: "4rem",
    }}
  >
    {/* === FIRST TWO INTERNSHIPS — 2 PER ROW === */}
    {[
      {
  title: "Machine Learning & Data Science Intern",
  company: "Blackbucks (Remote)",
  duration: "May 2024 – June 2024",
  desc: "Developed machine learning models for house price prediction using regression techniques. Focused on data preprocessing, feature engineering, and model optimization to improve prediction performance.",
  impact: "Enhanced model accuracy by 18% through systematic tuning and feature refinement.",
  tech: ["Python", "Scikit-learn", "Pandas", "Feature Engineering", "Data Visualization"],
  certLink: "https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view",
  color: "#64dcff",
},
{
  title: "AI/ML Intern – Smart Sorting",
  company: "SmartBridge (Remote)",
  duration: "May 2025 – June 2025",
  desc: "Built a deep learning model using CNNs for fruit and vegetable disease classification. Deployed the model using Flask to enable real-time inference and integrated it into a simple web interface for user interaction.",
  impact: "Achieved 92% classification accuracy with an efficient, deployed end-to-end workflow.",
  tech: ["TensorFlow", "Keras", "CNN", "Flask", "Computer Vision", "Python"],
  certLink: "https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view",
  color: "#64dcff",
}

    ].map((intern, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80, rotateX: -18 }}
        animate={isInternshipsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.95, delay: i * 0.18, ease: "easeOut" }}
        style={{
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(40px)",
          border: `3px solid ${intern.color}60`,
          borderRadius: "40px",
          padding: "3.2rem 3rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 35px 100px rgba(0, 0, 0, 0.85),
            0 0 130px ${intern.color}50,
            inset 0 0 90px ${intern.color}18
          `,
        }}
        whileHover={{
          borderColor: intern.color + "99",
          boxShadow: `
            0 40px 120px rgba(0, 0, 0, 0.9),
            0 0 160px ${intern.color}80,
            inset 0 0 110px ${intern.color}28
          `,
        }}
      >
        {/* Top Glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: `linear-gradient(90deg, transparent, ${intern.color}, transparent)`, filter: `drop-shadow(0 0 40px ${intern.color})` }} />

        {/* Company Badge */}
        <div style={{
          position: "absolute",
          top: "1.8rem",
          right: "2rem",
          background: intern.color,
          color: "#000",
          padding: "0.8rem 1.8rem",
          borderRadius: "50px",
          fontSize: "1.1rem",
          fontWeight: "900",
          boxShadow: `0 0 45px ${intern.color}`,
        }}>
          {intern.company.split(" ")[0]}
        </div>

        <h3 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#ffffff", margin: "0 0 0.6rem 0" }}>
          {intern.title}
        </h3>

        <p style={{ fontSize: "1.4rem", color: intern.color, fontWeight: "700", margin: "0 0 1.8rem 0" }}>
          {intern.duration}
        </p>

        <p style={{ fontSize: "1.22rem", color: "#c0e8ff", lineHeight: "1.8", marginBottom: "2rem" }}>
          {intern.desc}
        </p>

        {/* Impact */}
        <div style={{
          display: "inline-block",
          padding: "0.9rem 2.4rem",
          background: "rgba(100, 220, 255, 0.2)",
          border: `2px solid ${intern.color}`,
          borderRadius: "50px",
          color: intern.color,
          fontSize: "1.15rem",
          fontWeight: "800",
          margin: "0 0 2.5rem 0",
          boxShadow: `0 0 50px ${intern.color}60`,
        }}>
          {intern.impact}
        </div>

        {/* Tech Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          {intern.tech.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1 }}
              style={{
                padding: "0.7rem 1.5rem",
                background: "rgba(100, 220, 255, 0.12)",
                color: "#88d8ff",
                borderRadius: "20px",
                fontSize: "0.98rem",
                fontWeight: "600",
                border: "1.5px solid rgba(100, 220, 255, 0.4)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Certificate Button */}
        <div style={{ textAlign: "center" }}>
          <motion.a
            href={intern.certLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1rem 3rem",
              background: intern.color,
              color: "#000",
              borderRadius: "50px",
              fontSize: "1.15rem",
              fontWeight: "900",
              textDecoration: "none",
              boxShadow: `0 15px 50px ${intern.color}80`,
            }}
          >
            View Certificate
          </motion.a>
        </div>

        {/* Bottom Glow */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", background: `linear-gradient(90deg, transparent, ${intern.color}, transparent)`, filter: `drop-shadow(0 0 40px ${intern.color})` }} />
      </motion.div>
    ))}

    {/* === HERO INTERNSHIP — FULL WIDTH (MERN AICTE) === */}
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -20 }}
      animate={isInternshipsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1.1, delay: 0.4 }}
      style={{
        gridColumn: "1 / -1",
        background: "rgba(8, 20, 48, 0.98)",
        backdropFilter: "blur(40px)",
        border: "4px solid #64dcff",
        borderRadius: "48px",
        padding: "4.5rem 4rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 50px 140px rgba(0, 0, 0, 0.9),
          0 0 180px #64dcff70,
          inset 0 0 120px #64dcff25
        `,
      }}
      whileHover={{
        borderColor: "#64dcff",
        boxShadow: `
          0 60px 160px rgba(0, 0, 0, 0.95),
          0 0 220px #64dcff99,
          inset 0 0 140px #64dcff35
        `,
      }}
    >
      {/* Top & Bottom Glow */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)", filter: "drop-shadow(0 0 50px #64dcff)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)", filter: "drop-shadow(0 0 50px #64dcff)" }} />

      {/* AICTE Badge */}
      <div style={{
        position: "absolute",
        top: "2rem",
        right: "2.5rem",
        background: "#64dcff",
        color: "#000",
        padding: "1rem 2.5rem",
        borderRadius: "50px",
        fontSize: "1.4rem",
        fontWeight: "900",
        letterSpacing: "2px",
        boxShadow: "0 0 60px #64dcff",
        textTransform: "uppercase",
      }}>
        Study Owl (AICTE Approved) 
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: "3rem", fontWeight: "900", color: "#ffffff", margin: "0 0 1rem 0" }}>
          MERN Stack Internship
        </h3>
        <p style={{ fontSize: "1.8rem", color: "#64dcff", fontWeight: "700", margin: "0 0 2rem 0" }}>
          StudyOwl Education • May 15 – July 16, 2025
        </p>

        <p style={{ fontSize: "1.5rem", color: "#c0e8ff", lineHeight: "1.9", maxWidth: "900px", margin: "0 auto 3rem" }}>
          Successfully completed an AICTE-recognized 8-week MERN Stack internship, building production-ready applications with JWT/OAuth authentication, Express.js APIs, and responsive React frontends optimized for performance.
        </p>

        <motion.a
          href="https://drive.google.com/file/d/1bwbNlc9mdPYQOIyUpoiBIOhpyxaMBvbC/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "1.4rem 4rem",
            background: "#64dcff",
            color: "#000",
            borderRadius: "60px",
            fontSize: "1.5rem",
            fontWeight: "900",
            textDecoration: "none",
            boxShadow: "0 20px 60px #64dcff90",
            letterSpacing: "1.5px",
            display: "inline-block",
          }}
        >
          View Official Certificate
        </motion.a>
      </div>
    </motion.div>
  </motion.div>
</Section>
      <Section id="certifications" ref={certificationsRef}>
  {/* Futuristic Title */}
  <SectionTitle
    initial="hidden"
    animate={isCertificationsInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4rem, 10vw, 7rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #00ffff, #00d0ff, #0088ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(0, 255, 255, 0.7)",
      letterSpacing: "6px",
    }}
  >
    CERTIFICATIONS
  </SectionTitle>

  <p style={{
    color: "#a0f0ff",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 20px rgba(0, 255, 255, 0.4)",
  }}>
    Credentials across cloud, AI/ML, and full-stack development from AWS, IBM, Coursera, DeepLearning.AI, Meta, and more.
  </p>

  <motion.div
    style={{
      maxWidth: "1600px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "3rem",
      perspective: "1400px",
    }}
  >
    {[
      {
  title: "AWS Certified Solutions Architect – Associate",
  platform: "Amazon Web Services",
  year: "2024",
  type: "Cloud Certification",
  link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view"
},
{
  title: "AWS Certified Cloud Practitioner",
  platform: "Amazon Web Services",
  year: "2024",
  type: "Cloud Certification",
  link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view"
},
{
  title: "IBM Full Stack Software Developer",
  platform: "IBM",
  year: "2024",
  type: "Full Stack Development",
  link: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing"
},
{
  title: "Machine Learning with Python",
  platform: "Stanford Online • Coursera",
  year: "2024",
  type: "Machine Learning",
  link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view"
},
{
  title: "Large Language Models",
  platform: "DeepLearning.AI",
  year: "2025",
  type: "AI / LLMs",
  link: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing"
},
{
  title: "React.js Professional",
  platform: "Meta • Coursera",
  year: "2024",
  type: "Frontend Development",
  link: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link"
},
{
  title: "Python Mastery",
  platform: "Udemy",
  year: "2024",
  type: "Programming",
  link: "https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link"
},
{
  title: "JavaScript ES6+ Mastery",
  platform: "Udemy",
  year: "2024",
  type: "Programming",
  link: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link"
},
{
  title: "MLOps & Deployment",
  platform: "DeepLearning.AI • Coursera",
  year: "2025",
  type: "MLOps / Deployment",
  link: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link"
},
{
  title: "CI/CD & DevOps",
  platform: "Udemy",
  year: "2024",
  type: "DevOps",
  link: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing"
},
{
  title: "ServiceNow Certified Application Developer",
  platform: "ServiceNow",
  year: "2024",
  type: "Enterprise Software",
  link: "https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view"
},
{
  title: "Django & DRF Professional",
  platform: "Udemy",
  year: "2024",
  type: "Backend Development",
  link: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view"
},
{
  title: "Java Masterclass",
  platform: "Udemy",
  year: "2023",
  type: "Programming",
  link: "https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link"
},
{
  title: "Advanced Python",
  platform: "Udemy",
  year: "2024",
  type: "Programming",
  link: "https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link"
},
{
  title: "HTML5 Mastery",
  platform: "Udemy",
  year: "2023",
  type: "Frontend Development",
  link: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link"
},
{
  title: "Advanced CSS & Animations",
  platform: "Udemy",
  year: "2024",
  type: "Frontend Development",
  link: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link"
}

    ].map((cert, i) => (
      <motion.a
        key={i}
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 100, rotateX: -25 }}
        animate={isCertificationsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.09, ease: "easeOut" }}
        style={{
          textDecoration: "none",
          borderRadius: "32px",
          background: "rgba(8, 22, 48, 0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "3px solid rgba(0, 255, 255, 0.8)",
          padding: "2.8rem 2.4rem",
          minHeight: "240px",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 30px 80px rgba(0, 0, 0, 0.8),
            0 0 120px rgba(0, 255, 255, 0.5),
            inset 0 0 80px rgba(0, 255, 255, 0.15)
          `,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top Glow */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "6px",
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
          filter: "drop-shadow(0 0 40px #00ffff)",
        }} />

        {/* Platform Tag */}
        <div style={{
          color: "#00ffff",
          fontSize: "0.95rem",
          fontWeight: "800",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          marginBottom: "1rem",
          textShadow: "0 0 25px #00ffff",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          → {cert.platform}
        </div>

        {/* Certificate Title */}
        <h3 style={{
          color: "#ffffff",
          fontSize: "1.7rem",
          fontWeight: "900",
          margin: "0 0 1.5rem 0",
          lineHeight: "1.3",
          textShadow: "0 0 30px rgba(255, 255, 255, 0.6)",
        }}>
          {cert.title}
        </h3>

        {/* Year + Clean Arrow */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{
            color: "#66ffff",
            fontSize: "1.1rem",
            fontWeight: "700",
          }}>
            {cert.year}
          </span>

          <span style={{
            color: "#00ffff",
            fontSize: "2.4rem",
            fontWeight: "200",
          }}>
            →
          </span>
        </div>

        {/* Bottom Glow */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "5px",
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
          filter: "drop-shadow(0 0 35px #00ffff)",
        }} />
      </motion.a>
    ))}
  </motion.div>
</Section>
      <Section id="workshops" ref={workshopsRef}>
  {/* Epic Title */}
  <SectionTitle
    initial="hidden"
    animate={isWorkshopsInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #64dcff, #40c4ff, #87CEEB)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(100, 220, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
   Workshops, Bootcamps & Professional Training
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 6rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
  }}>
    Committed to continuous learning with advanced training in emerging and industry-leading technologies.
  </p>

  {/* 2–3 CARDS PER ROW — EXACT SAME STYLE AS HACKATHONS */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
      gap: "4rem",
    }}
  >
    {[
      {
  title: "Machine Learning with Python – 7-Day Intensive Workshop",
  desc: "Hands-on training focused on data preprocessing, model development, evaluation techniques, and integration with MERN-based dashboards.",
  tags: ["Python", "Scikit-learn", "Pandas", "MERN Dashboard", "Feature Engineering"],
  year: "2024",
  impact: "Built multiple end-to-end ML models during the program",
},
{
  title: "Deep Learning with TensorFlow – 7-Day Advanced Workshop",
  desc: "Practical exposure to neural networks, CNN architectures, and real-time inference using TensorFlow with interactive frontend integration.",
  tags: ["TensorFlow", "Keras", "CNN", "Deep Learning", "Computer Vision"],
  year: "2025",
  impact: "Achieved high-accuracy live inference models as part of training",
},
{
  title: "Full-Stack Web Development – 7-Day Bootcamp",
  desc: "Comprehensive MERN stack training covering React, Node.js, Express, MongoDB, authentication systems, and cloud deployment workflows.",
  tags: ["MERN", "React.js", "Node.js", "MongoDB", "JWT Auth"],
  year: "2022",
  impact: "Deployed multiple full-stack applications",
},
{
  title: "Artificial Intelligence & Data Science – 7-Day Workshop",
  desc: "Focused on building end-to-end AI/ML pipelines with data analysis, applied machine learning, and visualization dashboards.",
  tags: ["AI", "Data Science", "ML Pipelines", "Visualization"],
  year: "2022",
  impact: "Led team-based AI project as part of the workshop",
},
{
  title: "Mobile App Development – 7-Day Workshop",
  desc: "Developed cross-platform mobile applications using React Native with secure MERN backend connectivity.",
  tags: ["React Native", "Mobile Dev", "MERN API", "Expo"],
  year: "2023",
  impact: "Built and shipped functional mobile app prototypes",
},
{
  title: "Web Development Foundation – 7-Day Workshop",
  desc: "Structured training in core web technologies including HTML, CSS, and JavaScript, forming the basis for advanced frontend development.",
  tags: ["HTML", "CSS", "JavaScript", "Frontend Architecture"],
  year: "2022",
  impact: "Established strong fundamentals for future full-stack projects",
},

    ].map((workshop, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80, rotateX: -18 }}
        animate={isWorkshopsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.95, delay: i * 0.14, ease: "easeOut" }}
        style={{
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "3px solid #64dcff60",
          borderRadius: "40px",
          padding: "3.2rem 2.8rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 35px 100px rgba(0, 0, 0, 0.85),
            0 0 130px #64dcff50,
            inset 0 0 90px #64dcff18
          `,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: "#64dcff99",
          boxShadow: `
            0 40px 120px rgba(0, 0, 0, 0.9),
            0 0 160px #64dcff80,
            inset 0 0 110px #64dcff28
          `,
        }}
      >
        {/* Top Glow Line */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "6px",
          background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
          filter: "drop-shadow(0 0 40px #64dcff)",
        }} />

        {/* Year Badge */}
        <div style={{
          position: "absolute",
          top: "1.8rem",
          right: "2rem",
          background: "rgba(100, 220, 255, 0.15)",
          color: "#64dcff",
          padding: "0.7rem 1.6rem",
          borderRadius: "50px",
          fontSize: "1.1rem",
          fontWeight: "800",
          border: "2px solid #64dcff60",
          backdropFilter: "blur(10px)",
        }}>
          {workshop.year}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "2.3rem",
          fontWeight: "900",
          color: "#ffffff",
          margin: "0 0 0.8rem 0",
          textShadow: "0 0 30px rgba(255,255,255,0.5)",
        }}>
          {workshop.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "1.22rem",
          color: "#c0e8ff",
          lineHeight: "1.8",
          margin: "0 0 2.5rem 0",
          fontWeight: "500",
        }}>
          {workshop.desc}
        </p>

        {/* Impact Badge */}
        <div style={{
          display: "inline-block",
          padding: "1rem 2.6rem",
          background: "rgba(100, 220, 255, 0.2)",
          border: "2px solid #64dcff",
          borderRadius: "50px",
          color: "#64dcff",
          fontSize: "1.18rem",
          fontWeight: "800",
          margin: "0 0 2.5rem 0",
          boxShadow: "0 0 50px #64dcff66",
        }}>
          {workshop.impact}
        </div>

        {/* Tags */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}>
          {workshop.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1 }}
              style={{
                padding: "0.7rem 1.6rem",
                background: "rgba(100, 220, 255, 0.12)",
                color: "#88d8ff",
                borderRadius: "20px",
                fontSize: "0.98rem",
                fontWeight: "600",
                border: "1.5px solid rgba(100, 220, 255, 0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Bottom Glow */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "6px",
          background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
          filter: "drop-shadow(0 0 40px #64dcff)",
        }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
      {/* Hackathons & Competitions Section */}
<Section id="hackathons" ref={hackathonsRef}>
  {/* Epic Title */}
  <SectionTitle
    initial="hidden"
    animate={isHackathonsInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #64dcff, #40c4ff, #87CEEB)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(100, 220, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
    Hackathon Developer & Rapid Prototyping Enthusiast
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 6rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
  }}>
   onsistently delivering reliable, production-focused applications even in time-critical environments.
  </p>

  {/* 2-CARD GRID — SAME DESIGN LANGUAGE AS CODING PROFILES */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(560px, 1fr))",
      gap: "4rem",
    }}
  >
    {[
      {
  title: "24-Hour National Hackathon",
  event: "Brainovision 2025",
  organizer: "RCE Eluru",
  rank: "participant",
  role: "Lead Developer",
  year: "2025",
  desc: "Participated in a 24-hour national hackathon and built a MERN-based platform for second-hand electronics, featuring real-time chat, secure authentication, and a responsive UI.",
  tags: ["MERN Stack", "Real-time Chat", "JWT Authentication", "Responsive UI"],
  impact: "Delivered a fully functional prototype within 24 hours and recognized as a top-performing participant.",
  codeLink: "https://github.com/bhagavan444/hackathon-electromart",
  certLink: "https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view",
  color: "#64dcff",
  glow: "#64dcff",
}

      // Add more later — scales perfectly
    ].map((hack, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80, rotateX: -18 }}
        animate={isHackathonsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.95, delay: i * 0.18, ease: "easeOut" }}
        style={{
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: `3px solid ${hack.color}60`,
          borderRadius: "40px",
          padding: "3.5rem 3rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 35px 100px rgba(0, 0, 0, 0.85),
            0 0 130px ${hack.glow}50,
            inset 0 0 90px ${hack.glow}18
          `,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: hack.color + "99",
          boxShadow: `
            0 40px 120px rgba(0, 0, 0, 0.9),
            0 0 160px ${hack.glow}80,
            inset 0 0 110px ${hack.glow}28
          `,
        }}
      >
        {/* Top Glow Line */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${hack.color}, transparent)`,
          filter: `drop-shadow(0 0 40px ${hack.glow})`,
        }} />

        {/* Rank Badge */}
        <div style={{
          position: "absolute",
          top: "1.8rem",
          right: "2rem",
          background: hack.color,
          color: "#000",
          padding: "0.9rem 2rem",
          borderRadius: "50px",
          fontSize: "1.25rem",
          fontWeight: "900",
          letterSpacing: "1.5px",
          boxShadow: `0 0 50px ${hack.glow}`,
          textTransform: "uppercase",
        }}>
          {hack.rank}
        </div>

        {/* Year Badge */}
        <div style={{
          position: "absolute",
          top: "1.8rem",
          left: "2rem",
          background: "rgba(100, 220, 255, 0.15)",
          color: hack.color,
          padding: "0.7rem 1.6rem",
          borderRadius: "50px",
          fontSize: "1.1rem",
          fontWeight: "800",
          border: `2px solid ${hack.color}60`,
          backdropFilter: "blur(10px)",
        }}>
          {hack.year}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "2.4rem",
          fontWeight: "900",
          color: "#ffffff",
          margin: "0 0 0.6rem 0",
          textShadow: "0 0 30px rgba(255,255,255,0.5)",
        }}>
          {hack.title}
        </h3>

        {/* Event + Organizer */}
        <p style={{
          fontSize: "1.5rem",
          color: hack.color,
          fontWeight: "700",
          margin: "0 0 2rem 0",
          textShadow: `0 0 25px ${hack.glow}`,
        }}>
          {hack.event} • {hack.organizer}
        </p>

        {/* Description */}
        <p style={{
          fontSize: "1.25rem",
          color: "#c0e8ff",
          lineHeight: "1.8",
          margin: "0 0 2.5rem 0",
          fontWeight: "500",
        }}>
          {hack.desc}
        </p>

        {/* Impact Highlight */}
        <div style={{
          display: "inline-block",
          padding: "1rem 2.8rem",
          background: `rgba(100, 220, 255, 0.2)`,
          border: `2px solid ${hack.color}`,
          borderRadius: "50px",
          color: hack.color,
          fontSize: "1.2rem",
          fontWeight: "800",
          margin: "0 auto 2.8rem",
          boxShadow: `0 0 50px ${hack.glow}66`,
          textAlign: "center",
        }}>
          {hack.impact}
        </div>

        {/* Tags */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "2.5rem",
        }}>
          {hack.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1 }}
              style={{
                padding: "0.7rem 1.6rem",
                background: "rgba(100, 220, 255, 0.12)",
                color: "#88d8ff",
                borderRadius: "20px",
                fontSize: "1rem",
                fontWeight: "600",
                border: "1.5px solid rgba(100, 220, 255, 0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <motion.a
            href={hack.codeLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1rem 2.8rem",
              background: "transparent",
              color: hack.color,
              border: `2.5px solid ${hack.color}`,
              borderRadius: "50px",
              fontSize: "1.15rem",
              fontWeight: "800",
              textDecoration: "none",
              boxShadow: `0 12px 40px ${hack.glow}40`,
            }}
          >
            View Code
          </motion.a>

          <motion.a
            href={hack.certLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1rem 3rem",
              background: hack.color,
              color: "#000",
              borderRadius: "50px",
              fontSize: "1.15rem",
              fontWeight: "900",
              textDecoration: "none",
              boxShadow: `0 15px 50px ${hack.glow}80`,
              letterSpacing: "1px",
            }}
          >
            Certificate
          </motion.a>
        </div>

        {/* Bottom Glow */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${hack.color}, transparent)`,
          filter: `drop-shadow(0 0 40px ${hack.glow})`,
        }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
{/* Coding Platforms Section */}
<Section id="coding" ref={codingRef}>
  {/* Premium Title */}
  <SectionTitle
    initial="hidden"
    animate={isCodingInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #00ffff, #00d0ff, #0088ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(0, 255, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
    Competitive Programming Profiles
  </SectionTitle>

  <p style={{
    color: "#a0f0ff",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5.5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(0, 255, 255, 0.3)",
  }}>
    Demonstrated proficiency in competitive programming with consistent performance across global coding platforms.
  </p>

  {/* PERFECT 3-CARD GRID */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "3.5rem",
    }}
  >
    {[
      {
  platform: "LeetCode",
  badge: " Good LeetCode Rank",
  title: "Global Ranking",
  stats: "200+ Problems Solved • 100-Day Coding Streak",
  color: "#FFA116",
  glow: "#ff8c00",
  link: "https://leetcode.com/u/AxZsDhEeto/"
},
{
  platform: "HackerRank",
  badge: "Python & Problem Solving",
  title: "Gold Badges in Python & Problem Solving",
  stats: " Global Performance",
  color: "#00ff9d",
  glow: "#00ff9d",
  link: "https://www.hackerrank.com/profile/g_sivasatyasaib1"
},
{
  platform: "CodeChef",
  badge: "Competitive Programmer",
  title: "20+ Official Coding Contests",
  stats: "Consistent • Structured • Optimized Solutions",
  color: "#ff4757",
  glow: "#ff6b6b",
  link: "https://www.codechef.com/users/bhagavan444"
}

    ].map((profile, i) => (
      <motion.a
        key={i}
        href={profile.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 80, rotateX: -20 }}
        animate={isCodingInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
        style={{
          textDecoration: "none",
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: `3px solid ${profile.color}60`,
          borderRadius: "36px",
          padding: "3rem 2.4rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 30px 90px rgba(0, 0, 0, 0.85),
            0 0 120px ${profile.glow}50,
            inset 0 0 80px ${profile.glow}20
          `,
          transformStyle: "preserve-3d",
          cursor: "pointer",
          display: "block",
        }}
        whileHover={{
          borderColor: profile.color + "99",
          boxShadow: `
            0 35px 100px rgba(0, 0, 0, 0.9),
            0 0 140px ${profile.glow}80,
            inset 0 0 100px ${profile.glow}30
          `,
        }}
      >
        {/* Top Glow Line */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${profile.color}, transparent)`,
          filter: `drop-shadow(0 0 40px ${profile.glow})`,
        }} />

        {/* Header: Platform + Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "2rem",
            fontWeight: "900",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 0 30px rgba(255,255,255,0.6)",
          }}>
            {profile.platform}
          </h3>
          <div style={{
            background: profile.color,
            color: "#000",
            padding: "0.7rem 1.6rem",
            borderRadius: "50px",
            fontSize: "1.05rem",
            fontWeight: "900",
            boxShadow: `0 0 40px ${profile.glow}`,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
            {profile.badge}
          </div>
        </div>

        {/* Main Title */}
        <h4 style={{
          fontSize: "1.9rem",
          fontWeight: "900",
          color: profile.color,
          margin: "0 0 1rem 0",
          textAlign: "center",
          textShadow: `0 0 35px ${profile.glow}`,
        }}>
          {profile.title}
        </h4>

        {/* Stats */}
        <p style={{
          color: "#a0f0ff",
          fontSize: "1.2rem",
          textAlign: "center",
          margin: "0 0 3.5rem 0",
          fontWeight: "600",
          lineHeight: "1.6",
        }}>
          {profile.stats}
        </p>

        {/* Clean "View Profile" Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1rem 2.8rem",
              background: profile.color,
              color: "#000",
              borderRadius: "50px",
              fontWeight: "900",
              fontSize: "1.15rem",
              boxShadow: `0 12px 40px ${profile.glow}aa`,
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            View Profile →
          </motion.div>
        </div>

        {/* Bottom Glow */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${profile.color}, transparent)`,
          filter: `drop-shadow(0 0 40px ${profile.glow})`,
        }} />
      </motion.a>
    ))}
  </motion.div>
</Section>
      <Section id="hobbies" ref={hobbiesRef}>
  {/* Premium Title */}
  <SectionTitle
    initial="hidden"
    animate={isHobbiesInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #00ffff, #00d0ff, #0088ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(0, 255, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
    Professional Interests
  </SectionTitle>

  <p style={{
    color: "#a0f0ff",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5.5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(0, 255, 255, 0.3)",
  }}>
    Beyond coding—guided by curiosity, innovation, and lifelong learning.
  </p>

  {/* SAME UI AS CODING PROFILES — PERFECT MATCH */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "3.5rem",
    }}
  >
    {[
      {
  title: "Coding Challenges",
  subtitle: "DSA Enthusiast",
  stats: "500+ Problems Solved • LeetCode Rank Holder • Consistent Daily Practice",
  color: "#ff00aa",
  glow: "#ff00aa",
  icon: "Code"
},
{
  title: "Tech & Research Reading",
  subtitle: "Continuous Learner",
  stats: "AI Papers • Tech Blogs • Industry Trends",
  color: "#8e44ad",
  glow: "#9b59b6",
  icon: "BookOpen"
}
,
{
  title: "Machine Learning Research",
  subtitle: "ML Explorer",
  stats: "Hands-on with ML models • Experimenting with datasets • Applying research insights",
  color: "#ffd700",
  glow: "#ffdd00",
  icon: "BarChart"
}


    ].map((hobby, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80, rotateX: -20 }}
        animate={isHobbiesInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
        style={{
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: `3px solid ${hobby.color}60`,
          borderRadius: "36px",
          padding: "3rem 2.4rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 30px 90px rgba(0, 0, 0, 0.85),
            0 0 120px ${hobby.glow}50,
            inset 0 0 80px ${hobby.glow}20
          `,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: hobby.color + "99",
          boxShadow: `
            0 35px 100px rgba(0, 0, 0, 0.9),
            0 0 140px ${hobby.glow}80,
            inset 0 0 100px ${hobby.glow}30
          `,
        }}
      >
        {/* Top Glow Line */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${hobby.color}, transparent)`,
          filter: `drop-shadow(0 0 40px ${hobby.glow})`,
        }} />

        {/* Header: Title + Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "2rem",
            fontWeight: "900",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 0 30px rgba(255,255,255,0.6)",
          }}>
            {hobby.title}
          </h3>
          <div style={{
            background: hobby.color,
            color: "#000",
            padding: "0.7rem 1.6rem",
            borderRadius: "50px",
            fontSize: "1.05rem",
            fontWeight: "900",
            boxShadow: `0 0 40px ${hobby.glow}`,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
            {hobby.subtitle}
          </div>
        </div>

        {/* Main Highlight */}
        <h4 style={{
          fontSize: "1.9rem",
          fontWeight: "900",
          color: hobby.color,
          margin: "0 0 1rem 0",
          textAlign: "center",
          textShadow: `0 0 35px ${hobby.glow}`,
        }}>
          {hobby.stats.split(" • ")[0]}
        </h4>

        {/* Supporting Stats */}
        <p style={{
          color: "#a0f0ff",
          fontSize: "1.2rem",
          textAlign: "center",
          margin: "0 0 3.5rem 0",
          fontWeight: "600",
          lineHeight: "1.6",
        }}>
          {hobby.stats.includes("•") ? hobby.stats.split(" • ").slice(1).join(" • ") : hobby.stats}
        </p>

        {/* Icon */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            fontSize: "3.4rem",
            color: hobby.color,
            filter: `drop-shadow(0 0 30px ${hobby.glow})`,
          }}>
            {hobby.icon}
          </div>
        </div>

        {/* Bottom Glow */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${hobby.color}, transparent)`,
          filter: `drop-shadow(0 0 40px ${hobby.glow})`,
        }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
     <Section id="extracurricular" ref={extracurricularRef}>
  {/* Premium Title */}
  <SectionTitle
    initial="hidden"
    animate={isExtracurricularInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #00ffff, #00d0ff, #0088ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(0, 255, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
   Outside of Coding Activities
  </SectionTitle>

  <p style={{
    color: "#a0f0ff",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5.5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(0, 255, 255, 0.3)",
  }}>
    Leadership, mentorship, and continuous growth — the core of my work philosophy.
  </p>

  {/* EXACT SAME UI AS CODING PROFILES — PERFECT CONSISTENCY */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
      gap: "3.5rem",
    }}
  >
    {[
      {
  title: "Technical Workshops",
  subtitle: "Tech Facilitator",
  stats: "Trained 100+ Students • Led 5+ Hands-On Workshops",
  color: "#ff00ff",
  glow: "#ff00ff",
  icon: "Users"
},
{
  title: "Elite Certifications",
  subtitle: "Certified Specialist",
  stats: "8+ Advanced Certifications • AI • Cloud • DevOps • Full-Stack",
  color: "#00ff88",
  glow: "#00ff88",
  icon: "Award"
}

    ].map((activity, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80, rotateX: -20 }}
        animate={isExtracurricularInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
        style={{
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: `3px solid ${activity.color}60`,
          borderRadius: "36px",
          padding: "3rem 2.8rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 30px 90px rgba(0, 0, 0, 0.85),
            0 0 120px ${activity.glow}50,
            inset 0 0 80px ${activity.glow}20
          `,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: activity.color + "99",
          boxShadow: `
            0 35px 100px rgba(0, 0, 0, 0.9),
            0 0 140px ${activity.glow}80,
            inset 0 0 100px ${activity.glow}30
          `,
        }}
      >
        {/* Top Glow Line */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${activity.color}, transparent)`,
          filter: `drop-shadow(0 0 40px ${activity.glow})`,
        }} />

        {/* Header: Title + Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "2.1rem",
            fontWeight: "900",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 0 30px rgba(255,255,255,0.6)",
          }}>
            {activity.title}
          </h3>
          <div style={{
            background: activity.color,
            color: "#000",
            padding: "0.8rem 1.8rem",
            borderRadius: "50px",
            fontSize: "1.1rem",
            fontWeight: "900",
            boxShadow: `0 0 45px ${activity.glow}`,
            textTransform: "uppercase",
            letterSpacing: "1.2px",
          }}>
            {activity.subtitle}
          </div>
        </div>

        {/* Main Highlight */}
        <h4 style={{
          fontSize: "1.9rem",
          fontWeight: "900",
          color: activity.color,
          margin: "0 0 1rem 0",
          textAlign: "center",
          textShadow: `0 0 35px ${activity.glow}`,
        }}>
          {activity.stats.split(" • ")[0]}
        </h4>

        {/* Supporting Stats */}
        <p style={{
          color: "#a0f0ff",
          fontSize: "1.25rem",
          textAlign: "center",
          margin: "0 0 3.5rem 0",
          fontWeight: "600",
          lineHeight: "1.6",
        }}>
          {activity.stats.split(" • ").slice(1).join(" • ")}
        </p>

        {/* Icon */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            fontSize: "3.6rem",
            color: activity.color,
            filter: `drop-shadow(0 0 32px ${activity.glow})`,
          }}>
            {activity.icon}
          </div>
        </div>

        {/* Bottom Glow */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${activity.color}, transparent)`,
          filter: `drop-shadow(0 0 40px ${activity.glow})`,
        }} />
      </motion.div>
    ))}
  </motion.div>
</Section>
      <Section id="contact" ref={contactRef}>
  {/* Premium Title */}
  <SectionTitle
    initial="hidden"
    animate={isContactInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #64c8ff, #87CEEB, #40c4ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(100, 200, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
   Get in Touch
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5.5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(100, 200, 255, 0.3)",
  }}>
   Available for full-time opportunities, freelance work, and professional tech conversations. Let's collaborate to build something valuable.
  </p>

  {/* ULTRA-CLEAN, PROFESSIONAL CONTACT CARD */}
  <motion.div
    initial={{ opacity: 0, y: 80, rotateX: -15 }}
    animate={isContactInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    style={{
      maxWidth: "920px",
      margin: "0 auto",
      padding: "4rem 4.5rem",
      background: "rgba(10, 28, 60, 0.98)",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
      border: "2px solid rgba(100, 200, 255, 0.6)",
      borderRadius: "40px",
      position: "relative",
      overflow: "hidden",
      boxShadow: `
        0 30px 100px rgba(0, 0, 0, 0.8),
        0 0 120px rgba(100, 200, 255, 0.4),
        inset 0 0 80px rgba(100, 200, 255, 0.12)
      `,
      transformStyle: "preserve-3d",
    }}
  >
    {/* Top Sky-Blue Glow */}
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0,
      height: "6px",
      background: "linear-gradient(90deg, #64c8ff, #87CEEB, #40c4ff)",
      filter: "drop-shadow(0 0 40px #64c8ff)",
    }} />

    {/* Success Message */}
    <AnimatePresence>
      {isSent && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            textAlign: "center",
            padding: "1rem 2rem",
            background: "rgba(0, 255, 150, 0.15)",
            border: "1px solid rgba(0, 255, 150, 0.4)",
            borderRadius: "16px",
            color: "#00ff96",
            fontWeight: "700",
            fontSize: "1.1rem",
            marginBottom: "2rem",
            boxShadow: "0 0 30px rgba(0, 255, 150, 0.3)",
          }}
        >
          Message sent successfully — I’ll reply within 24 hours
        </motion.div>
      )}
    </AnimatePresence>

    <Form ref={form} onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Name & Email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <Input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          style={{
            padding: "1.2rem 1.6rem",
            fontSize: "1.1rem",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1.5px solid rgba(100, 200, 255, 0.5)",
            borderRadius: "16px",
            color: "#ffffff",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          whileFocus={{ borderColor: "#64c8ff", boxShadow: "0 0 20px rgba(100, 200, 255, 0.4)" }}
        />
        <Input
          type="email"
          name="user_email"
          placeholder="your.email@gmail.com"
          required
          style={{
            padding: "1.2rem 1.6rem",
            fontSize: "1.1rem",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1.5px solid rgba(100, 200, 255, 0.5)",
            borderRadius: "16px",
            color: "#ffffff",
            outline: "none",
          }}
          whileFocus={{ borderColor: "#64c8ff", boxShadow: "0 0 20px rgba(100, 200, 255, 0.4)" }}
        />
      </div>

      {/* Message */}
      <Textarea
        name="message"
        placeholder="Hello! I'm reaching out regarding a full-time role, freelance work, or a collaboration opportunity…"

        rows={6}
        required
        onChange={(e) => setMessageLength(e.target.value.length)}
        style={{
          padding: "1.4rem 1.6rem",
          fontSize: "1.1rem",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1.5px solid rgba(100, 200, 255, 0.5)",
          borderRadius: "18px",
          color: "#ffffff",
          resize: "none",
          outline: "none",
          fontFamily: "inherit",
        }}
        whileFocus={{ borderColor: "#64c8ff", boxShadow: "0 0 25px rgba(100, 200, 255, 0.5)" }}
      />

      {/* Character Counter */}
      <div style={{ textAlign: "right", color: messageLength > maxMessageLength * 0.9 ? "#ff6b6b" : "#88d0f0", fontSize: "0.95rem", fontWeight: "600" }}>
        {messageLength} / {maxMessageLength}
      </div>

      {/* Error Message */}
      {(emailError || formError) && (
        <div style={{ textAlign: "center", color: "#ff6b6b", fontWeight: "600", fontSize: "1rem" }}>
          {emailError || formError}
        </div>
      )}

      {/* Submit Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={isSubmitting ? {} : { scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "1.2rem 3.5rem",
            background: "linear-gradient(90deg, #64c8ff, #40c4ff)",
            color: "#000",
            fontSize: "1.2rem",
            fontWeight: "900",
            border: "none",
            borderRadius: "50px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            boxShadow: "0 12px 40px rgba(100, 200, 255, 0.5)",
            letterSpacing: "1px",
            opacity: isSubmitting ? 0.8 : 1,
          }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </div>
    </Form>

    {/* Bottom Glow */}
    <div style={{
      position: "absolute",
      bottom: 0, left: 0, right: 0,
      height: "6px",
      background: "linear-gradient(90deg, #64c8ff, #87CEEB, #40c4ff)",
      filter: "drop-shadow(0 0 40px #64c8ff)",
    }} />
  </motion.div>

  {/* Footer Note */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={isContactInView ? { opacity: 1 } : {}}
    transition={{ delay: 0.8 }}
    style={{
      textAlign: "center",
      marginTop: "4rem",
      color: "#88c8f0",
      fontSize: "1.1rem",
      fontWeight: "500",
    }}
  >
    Or contact me directly at: g.sivasatyasaibhagavan@gmail.com
 • +91 75692 05626
  </motion.p>
</Section>
      <Section id="resume" ref={resumeRef}>
  {/* Premium Title */}
  <SectionTitle
    initial="hidden"
    animate={isResumeInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(4.5rem, 11vw, 8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #64dcff, #87CEEB, #40c4ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(100, 220, 255, 0.6)",
      letterSpacing: "8px",
    }}
  >
   My Resume
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5.5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
    textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
  }}>
    Full-Stack Developer • AI/ML Engineer • Cloud Engineer
Designing and delivering scalable, high-performance software solutions.
  </p>

  {/* SINGLE DOMINANT, ULTRA-CLEAN CARD — SAME DESIGN LANGUAGE AS CODING PROFILES */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      placeItems: "center",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -20 }}
      animate={isResumeInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{
        background: "rgba(8, 20, 48, 0.98)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "3px solid rgba(100, 220, 255, 0.6)",
        borderRadius: "40px",
        padding: "4rem 3.5rem",
        width: "100%",
        maxWidth: "780px",
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 35px 100px rgba(0, 0, 0, 0.85),
          0 0 130px rgba(100, 220, 255, 0.45),
          inset 0 0 90px rgba(100, 220, 255, 0.15)
        `,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      whileHover={{
        borderColor: "rgba(100, 220, 255, 0.9)",
        boxShadow: `
          0 40px 110px rgba(0, 0, 0, 0.9),
          0 0 160px rgba(100, 220, 255, 0.7),
          inset 0 0 110px rgba(100, 220, 255, 0.25)
        `,
      }}
    >
      {/* Top Glow Line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "6px",
        background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
        filter: "drop-shadow(0 0 40px #64dcff)",
      }} />

      {/* Floating Badge */}
      <div style={{
        position: "absolute",
        top: "-22px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#64dcff",
        color: "#000",
        padding: "0.8rem 2.2rem",
        borderRadius: "50px",
        fontSize: "1.1rem",
        fontWeight: "900",
        letterSpacing: "2px",
        boxShadow: "0 0 50px #64dcff",
        textTransform: "uppercase",
        zIndex: 10,
      }}>
        Resume 2025
      </div>

      {/* Name */}
      <h3 style={{
        fontSize: "3.2rem",
        fontWeight: "900",
        background: "linear-gradient(90deg, #64dcff, #87CEEB, #40c4ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        margin: "2rem 0 0.5rem",
        textAlign: "center",
        letterSpacing: "1.5px",
      }}>
        Siva Satya Sai Bhagavan
      </h3>

      {/* Title */}
      <p style={{
        fontSize: "1.6rem",
        color: "#87CEEB",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "1.8rem",
        letterSpacing: "1px",
      }}>
       Full-Stack Development • AI/ML Engineering • Cloud Engineering
      </p>

      {/* Core Stack */}
      <p style={{
        fontSize: "1.25rem",
        color: "#c0e8ff",
        textAlign: "center",
        lineHeight: "1.8",
        margin: "0 auto 2.5rem",
        maxWidth: "600px",
        fontWeight: "600",
      }}>
       MERN Stack · Next.js · React Native · AI/ML with Python · AWS · Docker · System Architecture
      </p>

      {/* Impact Badge */}
      <div style={{
        display: "inline-block",
        padding: "1rem 3rem",
        background: "rgba(100, 220, 255, 0.2)",
        border: "2px solid #64dcff",
        borderRadius: "50px",
        color: "#64dcff",
        fontSize: "1.2rem",
        fontWeight: "800",
        margin: "0 auto 3rem",
        boxShadow: "0 0 50px rgba(100, 220, 255, 0.6)",
        textAlign: "center",
      }}>
       Production-Grade • Performance-Optimized • Future-Ready Architecture
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap",
      }}>
        <motion.button
          onClick={openResumeModal}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: "1.2rem 3.2rem",
            background: "linear-gradient(90deg, #64dcff, #40c4ff)",
            color: "#000",
            border: "none",
            borderRadius: "50px",
            fontSize: "1.25rem",
            fontWeight: "900",
            cursor: "pointer",
            boxShadow: "0 15px 45px rgba(100, 220, 255, 0.6)",
            letterSpacing: "1px",
          }}
        >
        Open Resume
        </motion.button>

        <motion.a
          href={resumePdf}
          download="Siva_Satya_Sai_Bhagavan_Resume_2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: "1.2rem 3.2rem",
            background: "transparent",
            color: "#64dcff",
            border: "2.8px solid #64dcff",
            borderRadius: "50px",
            fontSize: "1.25rem",
            fontWeight: "900",
            textDecoration: "none",
            boxShadow: "0 15px 45px rgba(100, 220, 255, 0.4)",
            letterSpacing: "1px",
          }}
        >
          Get PDF Version
        </motion.a>
      </div>

      {/* Bottom Glow */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "6px",
        background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
        filter: "drop-shadow(0 0 40px #64dcff)",
      }} />
    </motion.div>
  </motion.div>
</Section>
  <Footer>
  <FooterContent
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={staggerContainer}
    style={{
      padding: "5rem 2rem 4rem",
      textAlign: "center",
      background: "rgba(8, 20, 48, 0.98)",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
      borderTop: "2px solid rgba(100, 200, 255, 0.4)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Floating Holographic Name Card */}
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        display: "inline-block",
        padding: "2rem 3.5rem",
        background: "rgba(100, 220, 255, 0.08)",
        border: "2px solid rgba(100, 220, 255, 0.6)",
        borderRadius: "32px",
        backdropFilter: "blur(20px)",
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.6),
          0 0 80px rgba(100, 220, 255, 0.4),
          inset 0 0 60px rgba(100, 220, 255, 0.1)
        `,
        marginBottom: "3rem",
      }}
    >
      <motion.h2
        style={{
          fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
          fontWeight: "900",
          background: "linear-gradient(90deg, #64dcff, #40c4ff, #87CEEB)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "3px",
          margin: "0 0 0.4rem 0",
          textShadow: "0 0 30px rgba(100, 220, 255, 0.6)",
        }}
        animate={{
          textShadow: [
            "0 0 30px rgba(100, 220, 255, 0.6)",
            "0 0 50px rgba(100, 220, 255, 0.8)",
            "0 0 30px rgba(100, 220, 255, 0.6)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        SIVA SATYA SAI BHAGAVAN
      </motion.h2>
      <p style={{
        fontSize: "1.4rem",
        color: "#a0f0ff",
        fontWeight: "700",
        margin: 0,
        letterSpacing: "2px",
      }}>
       Full-Stack Engineering • AI/ML Development • Cloud Architecture
      </p>
    </motion.div>

    {/* Unique Tagline – Orbiting Glow */}
    <motion.p
      variants={fadeInUp}
      style={{
        fontSize: "1.25rem",
        color: "#88d8ff",
        fontWeight: "600",
        letterSpacing: "1.5px",
        margin: "2.5rem 0 3.5rem",
        background: "linear-gradient(90deg, #64dcff, #40c4ff, #64dcff)",
        backgroundSize: "200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "flow 8s linear infinite",
      }}
    >
      © {new Date().getFullYear()} • Built with Next.js, Framer Motion & Vision
    </motion.p>

    {/* Navigation – Premium Glass Pills */}
    <FooterLinks style={{ gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
      {["Home", "About", "Projects", "Skills", "Resume", "Contact"].map((link, i) => (
        <FooterLink
          key={link}
          href={`#${link.toLowerCase()}`}
          variants={fadeInUp}
          custom={i}
          whileHover={{
            background: "rgba(100, 220, 255, 0.2)",
            borderColor: "#64dcff",
            boxShadow: "0 0 30px rgba(100, 220, 255, 0.5)",
          }}
          style={{
            padding: "0.8rem 1.8rem",
            background: "rgba(100, 220, 255, 0.08)",
            border: "1.5px solid rgba(100, 220, 255, 0.3)",
            borderRadius: "50px",
            color: "#c0e8ff",
            fontSize: "1.05rem",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.4s ease",
          }}
        >
          {link}
        </FooterLink>
      ))}
    </FooterLinks>

    {/* Socials – Floating Orbit Ring */}
    <motion.div
      style={{
        margin: "4rem 0",
        position: "relative",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <div style={{
        position: "absolute",
        width: "220px",
        height: "220px",
        border: "2px dashed rgba(100, 220, 255, 0.3)",
        borderRadius: "50%",
        filter: "drop-shadow(0 0 20px rgba(100, 220, 255, 0.4))",
      }} />

      {[
        { icon: <FaEnvelope />, href: "mailto:g.sivasatyasaibhagavan@gmail.com", color: "#64dcff" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/", color: "#0077b5" },
        { icon: <FaGithub />, href: "https://github.com/bhagavan444", color: "#64dcff" },
      ].map((social, i) => (
        <SocialLink
          key={i}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          style={{
            position: "absolute",
            top: `${50 + 40 * Math.sin(i * 2.094)}%`,
            left: `${50 + 40 * Math.cos(i * 2.094)}%`,
            transform: "translate(-50%, -50%)",
            fontSize: "2rem",
            color: "#a0f0ff",
          }}
          whileHover={{
            scale: 1.4,
            color: social.color,
            filter: `drop-shadow(0 0 30px ${social.color})`,
            zIndex: 10,
          }}
          whileTap={{ scale: 0.9 }}
        >
          {social.icon}
        </SocialLink>
      ))}
    </motion.div>

    {/* Final Legendary Line */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      style={{
        fontSize: "1.15rem",
        color: "#64dcff",
        fontWeight: "700",
        letterSpacing: "2px",
        textShadow: "0 0 20px rgba(100, 220, 255, 0.6)",
      }}
    >
     Focused on building reliable, scalable products. Open to conversations.
    </motion.p>
  </FooterContent>

  {/* Epic Closing Glow Line */}
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ duration: 1.8, ease: "easeOut" }}
    style={{
      height: "5px",
      background: "linear-gradient(90deg, transparent, #64dcff, #40c4ff, #64dcff, transparent)",
      filter: "drop-shadow(0 0 30px #64dcff)",
      transformOrigin: "center",
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