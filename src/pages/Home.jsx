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
  gap: clamp(3rem, 4vw, 3rem);
  align-items: center;

  @media (max-width: 1024px) {
    gap: clamp(1.2rem, 3vw, 2.5rem);
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    background: rgba(5, 15, 35, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    transform: translateX(100%);
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: -10px 0 50px rgba(0, 240, 255, 0.2);

    &.active {
      transform: translateX(0);
    }
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
  perspective: 1600px;
  filter: drop-shadow(0 0 40px rgba(0, 255, 255, 0.35));
`;

const ProfileImage = styled(motion.img)`
  width: clamp(240px, 26vw, 320px);
  height: clamp(240px, 26vw, 320px);
  border-radius: 28px;
  object-fit: cover;
  position: relative;
  overflow: hidden;
  border: 5px solid transparent;
  background: linear-gradient(145deg, #0a0022, #1a0033);
  box-shadow: 
    0 0 70px rgba(0, 255, 255, 0.7),
    inset 0 0 50px rgba(255, 255, 255, 0.12),
    0 12px 40px rgba(0, 0, 0, 0.9);
  will-change: transform, filter, box-shadow;
  animation: plasmaBreathe 5s infinite ease-in-out;

  /* Liquid Chrome Flowing Border */
  &::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 34px;
    background: linear-gradient(
      45deg,
      #00ffff, #00eaff, #ff00ff, #ff0099, #00ff9d, #00ffff
    );
    background-size: 400% 400%;
    animation: liquidChrome 11s linear infinite;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 5px;
    z-index: 3;
    pointer-events: none;
  }

  /* Vertical Scanner Beam + Glitch Scanlines */
  &::after {
    content: '';
    position: absolute;
    top: -150%;
    left: -10%;
    width: 120%;
    height: 200%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 255, 255, 0.25) 20%,
      rgba(0, 255, 255, 0.6) 50%,
      rgba(255, 0, 255, 0.4) 80%,
      transparent 100%
    );
    animation: scannerSweep 8s infinite linear;
    filter: blur(8px);
    opacity: 0.7;
    z-index: 2;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  /* Micro Glitch Grid + Data Veins */
  background-image: 
    repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,0,255,0.04) 4px, rgba(255,0,255,0.04) 8px),
    repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,255,255,0.04) 4px, rgba(0,255,255,0.04) 8px),
    radial-gradient(circle at 30% 70%, rgba(0,255,255,0.3) 1px, transparent 2px),
    radial-gradient(circle at 70% 30%, rgba(255,0,255,0.3) 1px, transparent 2px);
  background-size: 100% 100%, 100% 100%, 80px 80px, 80px 80px;
  animation: dataVeins 18s linear infinite;

  &:hover {
    transform: translateY(-16px) scale(1.1) rotateY(12deg);
    filter: brightness(1.4) contrast(1.3) saturate(1.6);
    box-shadow: 
      0 0 140px rgba(0, 255, 255, 1),
      inset 0 0 80px rgba(255, 255, 255, 0.35),
      0 30px 80px rgba(0, 0, 0, 0.9);
    animation: plasmaBreatheHover 1.8s infinite ease-in-out;
  }

  /* Responsive */
  @media (max-width: 768px) {
    width: clamp(200px, 42vw, 280px);
    height: clamp(200px, 42vw, 280px);
    border-radius: 24px;
    &:hover { transform: translateY(-10px) scale(1.07) rotateY(6deg); }
  }

  @media (max-width: 480px) {
    width: clamp(180px, 22vw, 220px);
    height: clamp(180px, 22vw, 220px);
    border-radius: 20px;
  }

  @keyframes plasmaBreathe {
    0%, 100% { box-shadow: 0 0 70px rgba(0,255,255,.7), inset 0 0 50px rgba(255,255,255,.12); }
    50% { box-shadow: 0 0 90px rgba(0,255,255,.9), inset 0 0 70px rgba(255,255,255,.18); }
  }

  @keyframes plasmaBreatheHover {
    0%, 100% { box-shadow: 0 0 140px rgba(0,255,255,1), inset 0 0 80px rgba(255,255,255,.35); }
    50% { box-shadow: 0 0 170px rgba(0,255,255,1.2), inset 0 0 100px rgba(255,255,255,.45); }
  }

  @keyframes liquidChrome { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  @keyframes scannerSweep { 0% { transform: translateY(-150%) rotate(8deg); } 100% { transform: translateY(150%) rotate(8deg); } }
  @keyframes dataVeins { 0% { background-position: 0 0, 0 0, 0 0, 0 0; } 100% { background-position: 80px 80px, 80px 80px, 160px 160px, 160px; } }
`;

const ProfileRing = styled(motion.div)`
  position: absolute;
  top: -22px;
  left: -22px;
  width: calc(100% + 44px);
  height: calc(100% + 44px);
  border-radius: 34px;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;

  /* Fractal Plasma Ring + Infinite Flow */
  background: 
    conic-gradient(
      from 0deg at 50% 50%,
      #00ffff 0deg,
      #ff00ff 60deg,
      #8a2be2 120deg,
      #ff1493 180deg,
      #00ffea 240deg,
      #00ffff 360deg
    ),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%);

  background-size: 300% 300%;
  animation: fractalPlasmaFlow 16s linear infinite, slowOrbit 40s linear infinite;

  /* Triple glowing border using mask */
  padding: 7px;
  border: 3px solid transparent;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  box-shadow: 
    0 0 100px rgba(0, 255, 255, 0.9),
    inset 0 0 60px rgba(0, 255,255, 0.25),
    0 0 140px rgba(255, 0, 255, 0.6);

  /* Breathing Fractal Core */
  &::before {
    content: '';
    position: absolute;
    inset: 12px;
    border-radius: 28px;
    background: conic-gradient(
      from var(--rot, 0deg),
      transparent 0%,
      #00ffff 12%,
      #ff00ff 25%,
      transparent 40%,
      #00ffea 60%,
      transparent 80%
    );
    filter: blur(22px);
    animation: coreFractalPulse 7s ease-in-out infinite;
    opacity: 0.85;
  }

  /* Orbital Micro-Rings + Data Stream */
  &::after {
    content: '';
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 2px solid rgba(0, 255, 255, 0.35);
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.6);
    animation: microOrbit 20s linear infinite reverse;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    top: -16px;
    left: -16px;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
  }

  @media (max-width: 480px) {
    top: -14px;
    left: -14px;
    width: calc(100% + 28px);
    height: calc(100% + 28px);
  }

  @keyframes fractalPlasmaFlow {
    0% { background-position: 0% 0%; transform: rotate(0deg); }
    100% { background-position: 100% 100%; transform: rotate(360deg); }
  }

  @keyframes slowOrbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes coreFractalPulse {
    0%, 100% { opacity: 0.6; transform: scale(0.92); --rot: 0deg; }
    50% { opacity: 1; transform: scale(1.12); --rot: 180deg; }
  }

  @keyframes microOrbit {
    0% { transform: rotate(0deg) scale(1); }
    50% { opacity: 0.4; }
    100% { transform: rotate(-360deg) scale(1.08); opacity: 0.7; }
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 900px;
  position: relative;
  padding: clamp(2rem, 4vw, 3.5rem) clamp(2rem, 4vw, 3rem);
  border-radius: 24px;
  overflow: hidden;

  /* Glassmorphism + Deep Space Background */
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.12), transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1), transparent 50%),
    linear-gradient(135deg, 
      rgba(10, 25, 47, 0.95) 0%,
      rgba(17, 34, 64, 0.85) 50%,
      rgba(8, 20, 40, 0.95) 100%
    );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 255, 255, 0.18);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(0, 255, 255, 0.15),
    inset 0 0 40px rgba(255, 255, 255, 0.05);

  /* Floating Data Grid Overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 40px,
        rgba(0, 255, 255, 0.04) 40px,
        rgba(0, 255, 255, 0.04) 41px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(0, 255, 255, 0.04) 40px,
        rgba(0, 255, 255, 0.04) 41px
      );
    opacity: 0.6;
    animation: gridPulse 20s linear infinite;
    pointer-events: none;
  }

  /* Animated Energy Orb + Orbiting Particles */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, 
      rgba(0, 255, 255, 0.25) 0%,
      rgba(138, 43, 226, 0.15) 40%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    filter: blur(40px);
    animation: 
      energyOrb 18s ease-in-out infinite,
      slowRotate 40s linear infinite;
    z-index: -1;
    opacity: 0.5;
  }

  /* Subtle Scan Line (the recruiter magnet) */
  > .scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #00ffff, transparent);
    box-shadow: 0 0 20px #00ffff;
    animation: scan 9s linear infinite;
    pointer-events: none;
    z-index: 10;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
    padding: clamp(2rem, 5vw, 3rem);
  }

  @media (max-width: 480px) {
    padding: clamp(1.5rem, 4vw, 2.5rem);
    border-radius: 20px;
  }

  /* Keyframes – pure magic */
  @keyframes gridPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
  }

  @keyframes energyOrb {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
    50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.7; }
  }

  @keyframes slowRotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
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
  position: relative;
  min-height: 90vh;
  padding: clamp(6rem, 10vw, 8rem) clamp(2rem, 4vw, 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;

  /* Deep space + holographic field */
  background: 
    radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.12), transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 0, 255, 0.1), transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 255, 153, 0.06), transparent 60%),
    linear-gradient(135deg, #020c1b 0%, #0a192f 40%, #112240 80%, #020c1b 100%);

  /* Matching flowing conic energy field (same DNA as ProfileRing & Header) */
  &::before {
    content: '';
    position: absolute;
    inset: -10%;
    background: conic-gradient(
      from 0deg at 50% 50%,
      #00ffff, #00d4ff, #7f00ff, #ff00ff, #00ff9d, #00ffff
    );
    background-size: 200% 200%;
    filter: blur(80px);
    opacity: 0.25;
    animation: conicFlow 20s linear infinite;
    z-index: 0;
  }

  /* Floating holographic grid */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(45deg, 
        transparent, 
        transparent 50px, 
        rgba(0, 255, 255, 0.04) 50px, 
        rgba(0, 255, 255, 0.04) 51px
      );
    animation: gridDrift 30s linear infinite;
    opacity: 0.6;
    z-index: 0;
  }

  /* Signature scan line — now with rainbow pulse */
  > .contact-scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, 
      transparent, 
      #00ffff 20%, 
      #ff00ff 50%, 
      #00ffff 80%, 
      transparent
    );
    box-shadow: 
      0 0 40px #00ffff,
      0 0 80px #ff00ff;
    animation: contactScan 10s ease-in-out infinite;
    z-index: 10;
  }

  @keyframes conicFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  @keyframes gridDrift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  @keyframes contactScan {
    0%, 100% { transform: translateY(-100%); opacity: 0; }
    15%, 85% { opacity: 1; }
    50% { transform: translateY(0); }
    100% { transform:  translateY(100%); opacity: 0; }
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

  /* Flowing conic ring — exact DNA match with ProfileRing & ResumeModal */
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

  /* Holographic scan shimmer (same as ResumeModal) */
  &::after {
    content: '';
    position: absolute;
    top: -120%;
    left: 0;
    width: 100%;
    height: 120%;
    background: linear-gradient(
      0deg,
      transparent,
      rgba(0, 255, 255, 0.3),
      transparent
    );
    transition: top 0.8s ease;
  }

  /* Icon with reactor glow */
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
    text-shadow: 
      0 0 20px #00ffff,
      0 0 40px #00ffff;
    z-index: 2;
    transition: all 0.4s ease;
  }

  /* Hover: Full activation sequence */
  &:hover {
    transform: translateY(-10px) scale(1.12);
    box-shadow: 
      0 0 80px rgba(0, 255, 255, 0.7),
      0 20px 60px rgba(0, 0, 0, 0.6),
      inset 0 0 50px rgba(0, 255, 255, 0.25);

    &::before {
      opacity: 1;
      animation-duration: 10s;
    }

    &::after {
      top: 120%;
    }

    > span {
      color: white;
      text-shadow: 
        0 0 30px #00ffff,
        0 0 60px #00ffff,
        0 0 90px #00ffff;
      animation: pulseGlow 1.8s ease-in-out infinite;
    }
  }

  &:active {
    transform: translateY(-6px) scale(1.08);
  }

  /* Mobile perfection */
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

  /* Shared keyframes */
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
        <NavBrand href="#home">Bhagavan | MERN | AIMl&DS <FaStar style={{ fontSize: '1rem', marginLeft: '0.2rem' }} /></NavBrand>
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
          <FaBrain /> About Me
        </SectionTitle>
        <AboutText
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Enthusiastic and dedicated B Tech student in Artificial Intelligence and Data Science, seeking a challenging position in AI/ML or
Software Development where I can apply my technical knowledge, programming skills, and problem-solving abilities to contribute to
organizational goals. Eager to learn new technologies, work in a collaborative environment, and grow both personally and professionally.
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
              title: "AI Chatbot",
              desc: "Enterprise-grade chatbot dashboard integrating OpenAI API with real-time messaging, analytics, and conversation history. Developed using MERN stack with Socket.io for seamless interaction.",
              tags: ["React", "Node.js", "OpenAI API", "Socket.io", "MERN"],
              link: "https://github.com/bhagavan444/chatbotwebapp",
              demo: "https://drive.google.com/file/d/1pOfpAUaFigPo9w-YB7s4MuIEE3-bdTr0/view",
              impact: "Handled 10,000+ queries with 95% accuracy and reduced response latency by 40%."
            },
            {
              title: "Resume Builder Web App",
              desc: "Full-stack, ATS-optimized resume builder enabling real-time PDF/Word export, AI scoring, and secure user authentication. Built with MERN stack and deployed on Vercel using MongoDB Atlas.",
              tags: ["MERN", "OAuth2", "MongoDB", "PDF Generation", "AI Scoring"],
              link: "https://github.com/bhagavan444/Resumebuilderwebapp",
              demo: "https://drive.google.com/file/d/1Ml9hSjYsHldIIDQQtHvr0gpIn1RTvBhk/view",
              impact: "Reduced resume creation time by 70% for 500+ users; improved resume quality with AI-based scoring."
            },
            {
              title: "Heart Disease Prediction Platform",
              desc: "Scalable predictive healthcare platform combining Flask and MERN stack with deep learning models. Provides real-time dashboards and analytics, deployed on AWS for enterprise use.",
              tags: ["MERN Hybrid", "TensorFlow", "Flask", "AWS", "Predictive Analytics"],
              link: "https://github.com/bhagavan444/Heartdiseasewebapp",
              demo: "https://drive.google.com/file/d/1UYQasrq1EMuDOcBZiAHF19JyR6F5T7g4/view",
              impact: "Enhanced prediction accuracy to 92%, aiding faster clinical decisions."
            },
            {
              title: "Career Path Recommendation Platform",
              desc: "Personalized career recommendation system using MERN stack frontend and Python ML backend. Analyzes skills and market trends, integrated with LinkedIn API for real-time suggestions.",
              tags: ["MERN", "Python ML", "Streamlit", "Recommendation Systems", "LinkedIn API"],
              link: "https://github.com/bhagavan444/carrerrecomendation",
              demo: "https://drive.google.com/file/d/1cHQUdThz6tm7uvds_g2OfMcg3j9wHuRS/view",
              impact: "Achieved 85% match rate during beta testing; improved career planning efficiency for users."
            },
            {
              title: "Fake News Detector Platform",
              desc: "Real-time NLP-powered news classification system using MERN frontend and Python backend. Includes admin panel for model updates and continuous monitoring for misinformation.",
              tags: ["MERN", "NLP", "BERT", "Flask", "Admin Panel"],
              link: "https://github.com/bhagavan444/fakenewsdetectorwebapp",
              demo: "https://drive.google.com/file/d/1sBIB10_UrncsuAhfs3ekjSJbE58LxUQO/view?usp=sharing",
              impact: "Successfully detected 88% of fake news articles in live tests; reduced misinformation spread."
            },
            {
              title: "Dynamic Portfolio Site",
              desc: "Responsive and interactive personal portfolio built with React, Framer Motion, and Styled Components. Implements smooth animations, optimized performance, and SEO-friendly structure.",
              tags: ["React", "Framer Motion", "Styled Components", "Vite", "Responsive Design"],
              link: "https://github.com/bhagavan444/portfolio",
              demo: "https://bhagavansportfolio.netlify.app",
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
    { name: "Python", level: 95 },         // Primary language for AI & DS
    { name: "Java", level: 85 },           // For placements + OOP + coding rounds
    { name: "JavaScript", level: 70 },     // Useful for web development (MERN)
    { name: "SQL", level: 90 },            // Must-have for data-related jobs
    { name: "C Programming", level: 75 }   // Good for fundamentals & aptitude rounds
  ]
},

            { 
              icon: <FaLaptopCode />, 
              title: "Full-Stack Development", 
              skills: [
                { name: "React.js", level: 85 },
                { name: "Node.js", level: 80 },
                { name: "Express.js", level: 85 },
                { name: "Next.js", level: 80 },
                { name: "Angular", level: 75 },
                { name: "Django / Flask", level: 80 },
                { name: "MongoDB", level: 90 },
        
                { name: "REST API Development", level: 90 },
              ] 
            },
            {
  icon: <FaBrain />,
  title: "Machine Learning & Data Science",
  skills: [
    { name: "Machine Learning (Regression, Classification, Clustering)", level: 90 },
    { name: "Deep Learning (ANN, CNN, RNN)", level: 85 },
    { name: "TensorFlow / Keras", level: 85 },
    { name: "Scikit-learn", level: 90 },

    { name: "NLP (Text Processing, TF-IDF)", level: 80 },
    { name: "Statistics & Probability", level: 88 },
    { name: "Data Preprocessing (Pandas, NumPy)", level: 95 },

    { name: "Computer Vision (OpenCV, CNNs)", level: 80 },
    { name: "Data Visualization (Matplotlib, Seaborn, Plotly)", level: 90 },

    { name: "SQL for Data Analysis", level: 85 },
    { name: "Big Data Basics (Hadoop, Spark)", level: 65 }
  ]
},

           {
  icon: <FaCloud />,
  title: "Cloud & DevOps",
  skills: [
    { name: "AWS (EC2, S3, Lambda Basics)", level: 75 },
    { name: "Docker (Containers Basics)", level: 70 },
    { name: "CI/CD (GitHub Actions)", level: 70 },
    { name: "Linux & Shell Scripting", level: 80 },
    { name: "Version Control (Git & GitHub)", level: 90 }
  ]
}
,
          {
  icon: <FaDatabase />,
  title: "Databases & Tools",
  skills: [
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 85 },
    { name: "PostgreSQL (Basics)", level: 70 },

    { name: "Git & GitHub", level: 90 },
    { name: "Postman (API Testing)", level: 85 },

    { name: "Firebase (Basics)", level: 65 },
    { name: "VS Code", level: 95 }
  ]
}
,
            {
  icon: <FaUsers />,
  title: "Soft Skills",
  skills: [
    { name: "Problem-Solving", level: 90 },
    { name: "Analytical Thinking", level: 85 },
    { name: "Team Collaboration", level: 90 },
    { name: "Agile / Scrum (Basics)", level: 75 },
    { name: "Communication Skills", level: 90 },
    { name: "Adaptability & Quick Learning", level: 88 },
    { name: "Time Management", level: 85 }
  ]
}
,
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
              title: "Machine Learning & Data Science Intern",
              company: "Blackbucks (Remote)",
              duration: "May 2024 – June 2024",
              desc: "Optimized regression models for real estate prediction, built MERN API for data visualization, contributing to MNC analytics pipeline.",
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
              desc: "Led development of CNN model for real-time disease detection in agriculture, integrated with MERN dashboard for MNC-scale deployment.",
              tech: ["Python", "CNN", "Flask", "TensorFlow/Keras", "MERN Integration"],
              concepts: ["Deep Learning", "Computer Vision", "Scalable Deployment"],
              gitLink: "https://github.com/bhagavan444",
              certLink: "https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view",
              impact: "Achieved 94% accuracy in production",
            },
            {
  title: "MERN Stack Internship Program",
  company: "StudyOwl Education Private Limited (Online)",
  duration: "15 May 2025 – 16 July 2025",
  desc: "Successfully completed an 8-week MERN Stack Internship focused on full-stack development and practical implementation of web applications.",
  tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
  concepts: ["Full-Stack Development", "API Development", "Frontend Design"],
  gitLink: "https://github.com/bhagavan444", // add if you have any related GitHub repos
  certLink: "https://drive.google.com/file/d/1bwbNlc9mdPYQOIyUpoiBIOhpyxaMBvbC/view?usp=sharing",
  impact: "Completed an AICTE-recognized MERN internship enhancing full-stack development skills.",
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
                    <FiEye /> View Certificate
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
               Full-Stack Developer proficient in MERN stack, AI, and Data Science, with a knack for building scalable, user-friendly web apps and intelligent AI/ML models. Experienced in cloud deployments, system optimization, and cross-domain innovation through hackathons and research projects. Strong problem-solver and collaborator, ready to drive impact in dynamic tech environments.
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