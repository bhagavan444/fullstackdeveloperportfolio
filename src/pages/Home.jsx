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

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: visible;

  background: linear-gradient(135deg, #020c1b, #0a192f, #112240);
  font-family: "Source Code Pro", monospace;
  color: #e0fbfc;

  transition: all 0.3s ease-out;
  isolation: isolate;

  /* Prevent accidental horizontal zoom/shift on mobile */
  -webkit-text-size-adjust: 100%;
  touch-action: manipulation;

  /* Improve rendering on mobile */
  -webkit-font-smoothing: antialiased;
  backface-visibility: hidden;
  transform: translateZ(0);

  /* Avoid layout jumps caused by mobile browser bar resizing */
  min-height: 100dvh; /* mobile-safe viewport height */
  
  @media (max-width: 768px) {
    padding: 0 0.75rem;

    /* Prevent horizontal overflow caused by children */
    max-width: 100%;
    overflow-x: hidden;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;

    /* Stabilize container when address bar shows/hides */
    min-height: 100dvh;

    /* Reduce GPU load on small devices */
    transition: none;
  }
`;


/* ===============  NAV  =============== */
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

  isolation: isolate;            /* FIX FLICKER */
  transform: translateZ(0);      /* GPU RENDER */
  will-change: transform;

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

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 3px;

    background: linear-gradient(
      90deg,
      #00f0ff 0%,
      #ff00ff 30%,
      #7928ff 50%,
      #ff00ff 70%,
      #00f0ff 100%
    );
    background-size: 200% 100%;
    animation: neonFlow 8s linear infinite;

    transform: translateZ(0);
    will-change: background-position;
  }

  &::after {
    content: "";
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

    opacity: 0.55;
    pointer-events: none;
  }

  @keyframes neonFlow {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }
`;

/* ===============  NAV BRAND  =============== */
const NavBrand = styled.a`
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  font-weight: 900;
  font-size: clamp(1rem, 4vw, 1.5rem);

  letter-spacing: 3px;
  text-transform: uppercase;

  position: relative;
  z-index: 2;

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

  text-shadow:
    0 0 10px rgba(0, 255, 255, 0.6),
    0 0 30px rgba(0, 255, 255, 0.3);

  transform: translateZ(0);

  &::after {
    content: "★";
    margin-left: 8px;
    color: #00f0ff;
    opacity: 0;
    font-size: 0.8em;
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

/* ===============  NAV LINKS (SIDE MENU)  =============== */
const NavLinks = styled.div`
  display: flex;
  align-items: center;

  gap: clamp(0.6rem, 1.3vw, 1.6rem);
padding-right: clamp(2.2rem, 5vw, 6rem);
margin-left: auto;


  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;

    width: 320px;
    max-width: 90vw;
    height: 100dvh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 5rem;
    padding: 2rem 1.8rem;

    background: rgba(5, 15, 35, 0.98);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);

    transform: translateX(110%);
    transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);

    z-index: 99999;
    box-shadow: -20px 0 90px rgba(0, 240, 255, 0.3);

    &.active {
      transform: translateX(0);
    }
  }
`;

/* ===============  NAV LINK (ITEMS)  =============== */
const NavLink = styled.a`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;

  font-size: clamp(0.92rem, 1.85vw, 1.1rem);
  text-transform: uppercase;

  letter-spacing: 2.8px;
  color: rgba(224, 251, 252, 0.94);
  text-decoration: none;

  padding: 0.7rem 1rem;
  border-radius: 10px;

  position: relative;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  transform: translateZ(0);
  will-change: transform;

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    border-radius: 10px;
    background: linear-gradient(135deg,
      rgba(0,255,255,0.1),
      rgba(255,0,255,0.08)
    );
    border: 1px solid rgba(0,255,255,0.25);

    backdrop-filter: blur(8px);
    opacity: 0;
    transform: scale(0.92);

    transition: all 0.6s ease;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 7px;
    left: 50%;

    width: 0;
    height: 3px;

    background: linear-gradient(90deg,
      #00f0ff,
      #ff00ff,
      #8b5cf6,
      #00f0ff
    );
    background-size: 300% 100%;

    border-radius: 3px;
    transform: translateX(-50%);
    transition: width 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover {
    color: #00ffff;
    transform: translateY(-9px) scale(1.1);
  }

  &:hover::before {
    opacity: 1;
    transform: scale(1.08);
  }

  &:hover::after {
    width: 96%;
    animation: flowLine 3s linear infinite;
  }

  &.active {
    color: #00ffff;
  }

  &.active::after {
    width: 100%;
    height: 4px;
    animation: flowLine 2.5s linear infinite;
  }

  @keyframes flowLine {
    0% { background-position: 0% 0; }
    100% { background-position: 300% 0; }
  }
`;

/* ===============  MOBILE TOGGLE  =============== */
const MobileToggle = styled.button`
  display: none;

  background: none;
  border: none;
  cursor: pointer;

  color: #00f0ff;
  font-size: 2.3rem;
  padding: 14px;
  border-radius: 16px;

  z-index: 100000;

  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    display: block;
  }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100dvh; /* mobile-safe viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 5vw, 2rem) 0; /* Reduced top/bottom padding, kept sides */
  background: linear-gradient(135deg, #020c1b, #0a192f, #112240);
  overflow: hidden;
  isolation: isolate;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0);

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.2), transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(127, 255, 212, 0.15), transparent 50%);
    z-index: 0;
    animation: aiPulse 10s infinite ease-in-out;
    pointer-events: none;
    will-change: opacity, transform;
  }

  @keyframes aiPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%      { opacity: 0.8; transform: scale(1.05); }
  }

  /* tablet */
  @media (max-width: 1024px) {
    padding: clamp(1rem, 2vw, 1.5rem) 0;

    &:before {
      /* reduce detail to lower paint cost */
      background:
        radial-gradient(circle at 40% 60%, rgba(0,255,255,0.12), transparent 55%),
        radial-gradient(circle at 65% 35%, rgba(127,255,212,0.08), transparent 55%);
      animation-duration: 18s;
      filter: blur(10px);
    }
  }

  /* mobile */
  @media (max-width: 480px) {
    padding: clamp(0.5rem, 1.5vw, 1rem) 0;

    /* stop heavy animation and reduce blur on tiny devices */
    &:before {
      animation-play-state: paused;
      background:
        radial-gradient(circle at 40% 60%, rgba(0,255,255,0.06), transparent 65%),
        radial-gradient(circle at 65% 35%, rgba(127,255,212,0.04), transparent 65%);
      opacity: 0.6;
      filter: blur(8px);
      will-change: opacity;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:before { animation: none !important; }
  }
`;


const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: clamp(2rem, 4vw, 3rem);
  max-width: min(1400px, 100%);
  width: 100%;
  padding: clamp(1.5rem, 3vw, 2rem);
  z-index: 1;
  position: relative;
  overflow: visible;
  background: linear-gradient(135deg, rgba(10, 25, 47, 0.9), rgba(17, 34, 64, 0.7));
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transform: translateZ(0);
  will-change: transform; /* used sparingly */

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
    pointer-events: none;
    will-change: transform;
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

    &:before {
      animation-duration: 40s;
      filter: blur(6px);
    }
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25), 0 0 10px rgba(0, 255, 255, 0.08);

    /* Stop orbit animation on tiny devices to avoid repaint/flicker */
    &:before {
      animation-play-state: paused;
      opacity: 0.55;
      transform: translateZ(0);
    }

    /* ensure children don't cause horizontal overflow */
    min-width: 0;
    & > * { min-width: 0; }
  }

  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    &:before { animation: none !important; }
    transition: none !important;
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
  -webkit-tap-highlight-color: transparent;

  /* Core glass base so the button reads like part of the card */
  background:
    radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.10), transparent 40%),
    radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.07), transparent 40%),
    linear-gradient(135deg,
      rgba(8, 18, 36, 0.88) 0%,
      rgba(12, 26, 52, 0.86) 40%,
      rgba(10, 20, 44, 0.90) 100%
    );

  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);

  border: 1px solid rgba(100, 220, 255, 0.12);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.6),
    0 6px 30px rgba(64, 196, 255, 0.06),
    inset 0 0 40px rgba(0, 255, 255, 0.06);

  color: #e6ffff;
  text-shadow:
    0 0 8px rgba(0, 255, 255, 0.65),
    0 0 18px rgba(0, 200, 255, 0.22);

  transition: transform 260ms cubic-bezier(.2,.9,.3,1), box-shadow 260ms ease, filter 260ms ease;
  will-change: transform, box-shadow, filter;
  z-index: 1;

  /* Conic neon halo */
  &::before {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 20px;
    background: conic-gradient(
      from 0deg at 50% 50%,
      #00ffff, #00d4ff, #7f00ff, #ff00ff, #00ff9d, #00ffff
    );
    background-size: 200% 200%;
    filter: blur(12px);
    opacity: 0.6;
    transform: scale(1);
    transition: opacity 400ms ease, filter 400ms ease;
    z-index: -2;
  }

  /* Inner shimmer / holographic layer */
  &::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 12px;
    background: linear-gradient(45deg,
      rgba(255,255,255,0.00) 20%,
      rgba(255,255,255,0.10) 45%,
      rgba(255,255,255,0.00) 70%
    );
    mix-blend-mode: overlay;
    opacity: 0.9;
    z-index: 0;
    transform: translateX(-120%);
    transition: transform 900ms cubic-bezier(.2,.9,.3,1);
  }

  /* Button label uses gradient clipped text to match site neon */
  > span {
    position: relative;
    z-index: 2;
    display: inline-block;
    background: linear-gradient(90deg, #00ffff 0%, #7f00ff 40%, #ff00ff 60%, #00f0ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
    background-size: 200% 100%;
    transition: background-position 3.6s ease;
  }

  /* subtle hover/press */
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow:
      0 30px 90px rgba(0, 0, 0, 0.7),
      0 0 120px rgba(0, 240, 255, 0.28),
      inset 0 0 60px rgba(0, 255, 255, 0.12);
  }

  &:hover::before {
    filter: blur(16px);
    opacity: 0.95;
  }

  &:hover::after {
    transform: translateX(120%);
    transition-duration: 900ms;
  }

  &:active {
    transform: translateY(-2px) scale(0.995);
    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.6),
      inset 0 0 30px rgba(0, 200, 255, 0.06);
  }

  /* focus-visible for keyboard users */
  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 4px rgba(0, 240, 255, 0.08),
      0 18px 60px rgba(0, 0, 0, 0.6),
      0 0 80px rgba(0, 240, 255, 0.18);
  }

  /* responsive adjustments */
  @media (max-width: 768px) {
    padding: clamp(0.9rem, 2.5vw, 1.2rem) clamp(1.6rem, 4vw, 2.2rem);
    border-radius: 12px;

    &::before { inset: -4px; filter: blur(10px); opacity: 0.55; }
    &::after { inset: 1.5px; }
  }

  @media (max-width: 480px) {
    padding: clamp(0.7rem, 2.2vw, 0.95rem) clamp(1.2rem, 3.5vw, 1.6rem);
    font-size: clamp(0.95rem, 2vw, 1.05rem);
    border-radius: 10px;
  }

  /* reduced-motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &::before { animation: none; transform: none; filter: blur(8px); }
    &::after { transition: none; transform: none; }
    > span { transition: none; background-position: 0% 0%; }
    &:hover { transform: none; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
  }

  /* keyframes (kept lightweight) */
  @keyframes conicFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  @keyframes shimmerScan {
    0% { transform: translateX(-120%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(120%); }
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
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    radial-gradient(circle at 30% 20%, rgba(0,  0, 240, 255, 0.22), transparent 60%),
    radial-gradient(circle at 70% 80%, rgba(255,   0, 255, 0.15), transparent 55%),
    linear-gradient(135deg, rgba(2, 12, 27, 0.97), rgba(10, 25, 47, 0.94));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1rem;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  position: relative;
  width: 92%;
  max-width: 880px;
  max-height: 92vh;
  padding: clamp(2rem, 5vw, 3rem);
  border-radius: 24px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(0, 240, 255, 0.09) 50%,
    rgba(255, 0, 255, 0.07) 100%
  );
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1.8px solid transparent;
  border-image: linear-gradient(45deg, #00f0ff, #ff00ff, #00f0ff) 1;
  box-shadow: 
    0 20px 60px rgba(0, 240, 255, 0.3),
    0 0 40px rgba(255, 0, 255, 0.2),
    inset 0 0 80px rgba(0, 240, 255, 0.08);
  overflow: hidden;
  overflow-y: auto;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 20%,
      rgba(0, 240, 255, 0.25),
      transparent 70%
    );
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: 768px) {
    max-width: 96%;
    max-height: 88vh;
    padding: clamp(1.6rem, 4vw, 2.4rem);
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    max-height: 85vh;
    padding: clamp(1.4rem, 4vw, 2rem);
    border-radius: 18px;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1.4rem;
  right: 1.4rem;
  z-index: 10;
  background: none;
  border: none;
  font-size: clamp(2rem, 4vw, 2.4rem);
  color: #c0e8ff;
  cursor: pointer;
  text-shadow: 0 0 12px rgba(0, 240, 255, 0.6);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 240, 255, 0.3), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: #00f0ff;
    transform: rotate(90deg) scale(1.15);
    text-shadow: 
      0 0 20px rgba(0, 240, 255, 0.9),
      0 0 30px rgba(255, 0, 255, 0.6);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
  }
`;

const ModalButton = styled(motion.button)`
  margin: 1rem;
  padding: clamp(1rem, 3vw, 1.3rem) clamp(2rem, 5vw, 3rem);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  font-weight: 800;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #0a1428;
  background: linear-gradient(
    45deg,
    #00f0ff,
    #ff00ff 30%,
    #7fffd4 60%,
    #00b4ff 85%,
    #00f0ff
  );
  background-size: 300% 300%;
  box-shadow: 
    0 8px 25px rgba(0, 240, 255, 0.5),
    0 0 20px rgba(255, 0, 255, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    background-position: 100% 0;
    box-shadow: 
      0 12px 35px rgba(0, 240, 255, 0.65),
      0 0 30px rgba(255, 0, 255, 0.5);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  @media (max-width: 768px) {
    margin: 0.8rem;
    padding: clamp(0.9rem, 2.5vw, 1.1rem) clamp(1.8rem, 4vw, 2.6rem);
  }

  @media (max-width: 480px) {
    margin: 0.6rem;
    padding: clamp(0.8rem, 2.2vw, 1rem) clamp(1.5rem, 4vw, 2.2rem);
    font-size: clamp(0.95rem, 2vw, 1.1rem);
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
        <NavBrand href="#home">Bhagavan<FaStar style={{ fontSize: '1rem', marginLeft: '0.2rem' }} /></NavBrand>
        <NavLinks>
                    
<NavLink href="#home">Home</NavLink>
          
<NavLink href="#about">About me</NavLink>
<NavLink href="#projects">Projects</NavLink>          
<NavLink href="#internships">Experience</NavLink>
<NavLink href="#skills">Skills</NavLink>
<NavLink href="#certifications">Verified</NavLink>
<NavLink href="#resume">Resume</NavLink>



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
            <TypingSubtitle text="AI/ML & Full-Stack Engineering | Architecting scalable MERN and Python systems | Cloud, DevOps, and data-driven solutions engineered for real-world impact." />

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
  {/* Epic Gradient Title */}
  <SectionTitle
    initial="hidden"
    animate={isAboutInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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

  <p
    style={{
      color: "#a0d8f0",
      fontSize: "1.6rem",
      textAlign: "center",
      margin: "0 auto 4.5rem",
      maxWidth: "900px",
      lineHeight: "1.85",
      fontWeight: "500",
    }}
  >
    Full-Stack × AI Engineer | Building reliable, scalable software and ML systems that solve real problems.
  </p>

  {/* LARGE RECTANGULAR CARD */}
  <motion.div
    style={{
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1.5rem",
      display: "grid",
      placeItems: "center",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -12 }}
      animate={isAboutInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        width: "100%",
        maxWidth: "1100px",
        background: "rgba(8, 20, 48, 0.98)",
        backdropFilter: "blur(36px)",
        WebkitBackdropFilter: "blur(36px)",
        border: "2.6px solid rgba(100,220,255,0.55)",
        borderRadius: "18px",
        padding: "3rem 3.2rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 40px 120px rgba(0,0,0,0.9),
          0 0 140px rgba(100,220,255,0.28),
          inset 0 0 80px rgba(100,220,255,0.06)
        `,
        minHeight: "460px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      whileHover={{
        borderColor: "#64dcff",
        boxShadow: `
          0 50px 140px rgba(0,0,0,0.95),
          0 0 180px #64dcff70,
          inset 0 0 110px #64dcff18
        `,
      }}
    >
      {/* Small top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
        }}
      />

      {/* Left Identity Column */}
      <div
        style={{
          flex: "0 0 260px",
          marginRight: "1.6rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "linear-gradient(180deg, rgba(100,220,255,0.08), rgba(100,220,255,0.04))",
            border: "1.6px solid rgba(100,220,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#c0e8ff",
            fontWeight: 900,
            fontSize: "1.1rem",
            boxShadow: "0 10px 30px rgba(100,220,255,0.06)",
          }}
        >
          S S S B
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "1.15rem",
              color: "#bff8ff",
              fontWeight: 800,
              letterSpacing: "0.6px",
            }}
          >
            B.Tech (AI & DS) • Final Year
          </div>
          <div
            style={{
              fontSize: "1.05rem",
              color: "#9fe6ff",
              marginTop: "0.35rem",
              fontWeight: 700,
            }}
          >
            MERN • AI/ML • Cloud
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "72%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(100,220,255,0.04))",
          marginRight: "1.6rem",
        }}
      />

      {/* Right Content */}
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        <h3
          style={{
            margin: 0,
            fontSize: "2.1rem",
            fontWeight: "900",
            color: "#ffffff",
            lineHeight: 1.05,
          }}
        >
          I'm Bhagavan— Full-Stack & AI Engineer
        </h3>

        <p
          style={{
            marginTop: "0.8rem",
            color: "#c8fbff",
            fontSize: "1.18rem",
            lineHeight: 1.7,
            fontWeight: 500,
          }}
        >
          I build production-ready web apps and end-to-end ML systems — from user-facing React frontends to robust Node/Express backends and cloud-deployed inference services. I focus on reliability, performance and clean architecture.
        </p>

        {/* Highlight Tags */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.6rem",
            marginTop: "1.1rem",
          }}
        >
          <div
            style={{
              padding: "0.7rem 1rem",
              borderRadius: 12,
              background: "rgba(100,220,255,0.06)",
              color: "#bff8ff",
              fontWeight: 800,
              fontSize: "1.05rem",
              border: "1px solid rgba(100,220,255,0.06)",
            }}
          >
            MERN • Next.js
          </div>

          <div
            style={{
              padding: "0.7rem 1rem",
              borderRadius: 12,
              background: "rgba(100,220,255,0.06)",
              color: "#bff8ff",
              fontWeight: 800,
              fontSize: "1.05rem",
              border: "1px solid rgba(100,220,255,0.06)",
            }}
          >
            TensorFlow • Model Deployment
          </div>

          <div
            style={{
              padding: "0.7rem 1rem",
              borderRadius: 12,
              background: "rgba(100,220,255,0.06)",
              color: "#bff8ff",
              fontWeight: 800,
              fontSize: "1.05rem",
              border: "1px solid rgba(100,220,255,0.06)",
            }}
          >
            AWS • Docker • CI/CD
          </div>
        </div>

        <p
          style={{
            marginTop: "1.3rem",
            color: "#9fe6ff",
            fontSize: "1.12rem",
            lineHeight: 1.55,
            fontWeight: 700,
          }}
        >
          Selected highlights: built an ATS Resume Builder (MERN + OAuth + MongoDB), designed an ML-powered disease detection pipeline (Transfer Learning → TF Serving), and shipped an enterprise AI chatbot with streaming memory. Deployed production services on AWS using Docker and CI/CD.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1.6rem",
            flexWrap: "wrap",
          }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            style={{
              padding: "0.8rem 1.6rem",
              background: "linear-gradient(90deg,#64dcff,#40c4ff)",
              color: "#001",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              boxShadow: "0 12px 36px rgba(100,220,255,0.22)",
              fontSize: "1.05rem",
            }}
          >
            View Projects
          </motion.a>

          <motion.a
            href={resumePdf}
            download="Bhagavan_Resume_2026.pdf"
            whileHover={{ scale: 1.04 }}
            style={{
              padding: "0.7rem 1.4rem",
              background: "transparent",
              color: "#64dcff",
              border: "2px solid rgba(100,220,255,0.6)",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(100,220,255,0.08)",
              fontSize: "1.05rem",
            }}
          >
            Download Resume
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            style={{
              padding: "0.6rem 0.95rem",
              background: "rgba(255,255,255,0.02)",
              color: "#bff8ff",
              borderRadius: 12,
              fontWeight: 700,
              textDecoration: "none",
              border: "1px solid rgba(100,220,255,0.04)",
              fontSize: "1.05rem",
            }}
          >
            Let's Talk
          </motion.a>
        </div>
      </div>

      {/* Bottom Glow */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 20,
          right: 20,
          height: "6px",
          background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
          borderRadius: 12,
          opacity: 0.9,
        }}
      />
    </motion.div>
  </motion.div>
</Section>


<Section id="education" ref={educationRef}>
  {/* Epic Gradient Title */}
  <SectionTitle
    initial="hidden"
    animate={isEducationInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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
    margin: "0 auto 4.5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
  }}>
    Strong academic journey from foundation to Artificial Intelligence & Data Science.
  </p>

  {/* MAIN CONTAINER */}
  <motion.div
    style={{
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1.5rem",
      display: "grid",
      placeItems: "center",
      gap: "3rem",
    }}
  >

    {/* ROW 1: B.TECH CARD (Full Width, rectangular) */}
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      animate={isEducationInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        width: "100%",
        maxWidth: "1100px",                // wider rectangle
        background: "rgba(8, 20, 48, 0.98)",
        backdropFilter: "blur(36px)",
        WebkitBackdropFilter: "blur(36px)",
        border: "3px solid #64dcff70",
        borderRadius: "20px",              // less rounded = more rectangular
        padding: "3.2rem 3.6rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 110px #64dcff50, inset 0 0 70px #64dcff18",
        minHeight: "380px",                // increased height for rectangle feel
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      whileHover={{
        borderColor: "#64dcff",
        boxShadow: "0 40px 100px rgba(0,0,0,0.95), 0 0 150px #64dcff80, inset 0 0 90px #64dcff30",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)" }} />

      <div style={{ position: "absolute", top: "1.6rem", left: "2rem", background: "rgba(100,220,255,0.18)", color: "#64dcff", padding: "0.6rem 1.5rem", borderRadius: "12px", fontSize: "1.05rem", fontWeight: "800", border: "2px solid #64dcff60", backdropFilter: "blur(8px)" }}>
        2022 – 2026
      </div>
      <div style={{ position: "absolute", top: "1.6rem", right: "2rem", background: "#64dcff", color: "#000", padding: "0.6rem 1.8rem", borderRadius: "12px", fontSize: "1.05rem", fontWeight: "900", letterSpacing: "1.5px", boxShadow: "0 0 35px #64dcff", textTransform: "uppercase" }}>
        B.TECH AI&DS
      </div>

      <div style={{ textAlign: "center", width: "100%" }}>
        <h3 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: "900", color: "#fff", margin: "0 0 0.4rem", textShadow: "0 0 30px rgba(255,255,255,0.35)" }}>
          Ramachandra College of Engineering
        </h3>
        <p style={{ fontSize: "1.4rem", color: "#64dcff", fontWeight: "700", marginBottom: "1.2rem" }}>
          Eluru • JNTUK University
        </p>
        <p style={{ fontSize: "1.18rem", color: "#c0e8ff", lineHeight: "1.7", marginBottom: "1.8rem", maxWidth: "920px", margin: "0 auto 1.8rem" }}>
          Pursuing <strong>Bachelor of Technology in AI & Data Science</strong><br />
          <strong>CGPA: 7.8 / 10.0</strong> • Final Year
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", justifyContent: "center", rowGap: "1rem" }}>
          {["MERN Stack","AI & ML","Python • Java • SQL","Deep Learning","Data Science","REST APIs","MongoDB • MySQL","Git & GitHub"].map((skill, i) => (
            <motion.span key={i} whileHover={{ scale: 1.05 }} style={{ padding: "0.65rem 1.6rem", background: "rgba(100,220,255,0.12)", color: "#88d8ff", borderRadius: "12px", fontSize: "0.98rem", fontWeight: "700", border: "1.2px solid rgba(100,220,255,0.28)", backdropFilter: "blur(6px)" }}>
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>

    {/* ROW 2: INTER + 10TH SIDE BY SIDE (rectangular, matched height) */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        gap: "2.5rem",
        width: "100%",
        maxWidth: "1100px",
      }}
    >
      {/* INTERMEDIATE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isEducationInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          background: "rgba(8, 20, 48, 0.92)",
          backdropFilter: "blur(32px)",
          border: "2.5px solid #64dcff50",
          borderRadius: "18px",
          padding: "2.6rem 2.4rem",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 80px #64dcff30",
          minHeight: "300px",            // matched rectangular height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ position: "absolute", top: "1.6rem", left: "1.8rem", background: "rgba(100,220,255,0.15)", color: "#64dcff", padding: "0.5rem 1.1rem", borderRadius: "12px", fontSize: "0.95rem", fontWeight: "700" }}>
          2020 – 2022
        </div>
        <div style={{ position: "absolute", top: "1.6rem", right: "1.8rem", background: "#64dcff", color: "#000", padding: "0.5rem 1.2rem", borderRadius: "12px", fontSize: "0.95rem", fontWeight: "900" }}>
          INTER MPC
        </div>

        <div style={{ width: "100%" }}>
          <h3 style={{ fontSize: "1.9rem", fontWeight: "900", color: "#fff", margin: "0 0 0.6rem" }}>
            Sri Vidya Junior College
          </h3>
          <p style={{ fontSize: "1.18rem", color: "#64dcff", margin: "0 0 1rem" }}>
            Gudivada, Andhra Pradesh
          </p>
          <p style={{ fontSize: "1.12rem", color: "#c0e8ff", lineHeight: "1.7", marginBottom: "1.4rem", fontWeight: "500" }}>
            Completed Intermediate (MPC) with strong foundation in core science and mathematics.
            <br />
            <strong>Marks: 781 / 1000</strong> • <strong>78.1%</strong>
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {["Physics", "Chemistry", "Mathematics", "Applied Maths", "Computer Basics"].map((tag, i) => (
              <motion.span key={i} whileHover={{ scale: 1.04 }} style={{ padding: "0.5rem 1rem", background: "rgba(100,220,255,0.10)", color: "#aee9ff", borderRadius: "12px", fontSize: "0.95rem", fontWeight: "600", border: "1px solid rgba(100,220,255,0.22)" }}>
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 10TH CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isEducationInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.4 }}
        style={{
          background: "rgba(8, 20, 48, 0.88)",
          backdropFilter: "blur(28px)",
          border: "2px solid #64dcff40",
          borderRadius: "18px",
          padding: "2.6rem 2.4rem",
          position: "relative",
          boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
          minHeight: "300px",            // matched rectangular height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ position: "absolute", top: "1.4rem", left: "1.8rem", background: "rgba(100,220,255,0.12)", color: "#64dcff", padding: "0.4rem 1.1rem", borderRadius: "12px", fontSize: "0.92rem", fontWeight: "700" }}>
          2019 – 2020
        </div>
        <div style={{ position: "absolute", top: "1.4rem", right: "1.8rem", background: "#64dcff", color: "#000", padding: "0.4rem 1.1rem", borderRadius: "12px", fontSize: "0.92rem", fontWeight: "900" }}>
          10TH SSC
        </div>

        <div style={{ width: "100%" }}>
          <h3 style={{ fontSize: "1.85rem", fontWeight: "900", color: "#fff", margin: "0 0 0.5rem" }}>
            Montessori English Medium High School
          </h3>
          <p style={{ fontSize: "1.12rem", color: "#64dcff", margin: "0 0 0.8rem" }}>
            Gudivada, Andhra Pradesh
          </p>
          <p style={{ fontSize: "1.08rem", color: "#c0e8ff", lineHeight: "1.65", marginBottom: "1.2rem", fontWeight: "500" }}>
            Strong foundational schooling with focus on core subjects and language proficiency.
            <br />
            <strong>GPA: 9.5 / 10.0</strong>
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", justifyContent: "center" }}>
            {["English", "Mathematics", "Science", "Social Studies", "Computer Fundamentals"].map((tag, i) => (
              <motion.span key={i} whileHover={{ scale: 1.04 }} style={{ padding: "0.45rem 0.95rem", background: "rgba(100,220,255,0.08)", color: "#bfeeff", borderRadius: "12px", fontSize: "0.92rem", fontWeight: "600", border: "1px solid rgba(100,220,255,0.18)" }}>
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
</Section>


<Section id="projects" ref={projectsRef}>
  {/* Epic Title */}
  <SectionTitle
    initial="hidden"
    animate={isProjectsInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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
    FEATURED PROJECTS
  </SectionTitle>

  <p style={{
    color: "#a0d8f0",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0 auto 5.5rem",
    maxWidth: "900px",
    lineHeight: "1.8",
    fontWeight: "500",
  }}>
    High-impact applications built with AI, full-stack, and modern web technologies.
  </p>

  {/* COMPACT & BEAUTIFUL GRID */}
  <motion.div
    style={{
      maxWidth: "1240px",
      margin: "0 auto",
      padding: "0 1.5rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",  // Slightly smaller cards
      gap: "3.2rem",  // Tighter spacing
    }}
  >
    {[
      {
        title: "AI Chatbot Platform",
        desc: "Enterprise-grade intelligent chatbot with real-time streaming, memory retention, analytics dashboard, and secure OAuth backend.",
        tags: ["React", "Node.js", "OpenAI", "Socket.io", "MongoDB", "Tailwind"],
        link: "https://github.com/bhagavan444/chatbotwebapp",
        demo: "https://drive.google.com/file/d/1DZEIiZNFf9WO2ITFdtuOS5SEQATFLJTq/view?usp=sharing",
        impact: "10K+ queries • 95% accuracy • 40% faster",
        badge: "Most Advanced"
      },
      {
        title: "Resume Builder Web App",
        desc: "ATS-optimized resume generator with AI scoring, real-time editing, PDF export, and Google OAuth login.",
        tags: ["MERN", "OAuth", "AI Scoring", "PDF Export", "Redis"],
        link: "https://github.com/bhagavan444/Resumebuilderwebapp",
        demo: "https://drive.google.com/file/d/1gjihVRS_EkRRAe7Y8Q7L1vOq2gjvNnqr/view?usp=sharing",
        impact: "500+ users • 70% faster • 100% ATS pass",
        badge: "Most Used"
      },
      {
        title: "Heart Disease Predictor",
        desc: "Deep learning system using TensorFlow with Flask API and interactive UI for real-time risk assessment.",
        tags: ["TensorFlow", "Flask", "ML", "Healthcare AI", "Python"],
        link: "https://github.com/bhagavan444/Heart-Disease-Web-",
        demo: "https://drive.google.com/file/d/1LR19YiKA90IftyVwWG5z2pC5rs4eHXGv/view?usp=sharing",
        impact: "92% accuracy • Live deployed",
        badge: "Best ML Project"
      },
      {
  title: "Career Path Recommendation System",
  desc: "ML-based system that recommends personalized career and course paths using user skills and preference analysis.",
  tags: ["Python", "Machine Learning", "Recommendation Systems", "Streamlit"],
  link: "https://github.com/bhagavan444/carrer-path-web-",
  demo: "https://drive.google.com/file/d/1C2BLJ6rUq9XmBKp5pi0H9_wWSXtm-zxe/view?usp=sharing",
  impact: "Personalized career predictions with explainable insights",
  badge: "Research"
},
{
  title: "Fake News Detector",
  desc: "NLP-powered classifier that detects fake news using TF–IDF and supervised learning, served via a Flask API with a React UI.",
  tags: ["NLP", "Flask", "React", "Scikit-learn", "TF-IDF"],
  link: "https://github.com/bhagavan444/News-detector",
  demo: "https://drive.google.com/file/d/1hhF6N5mtYlmQpDdgCId69l3pMiFKSHlX/view?usp=sharing",
  impact: "High-accuracy text classification with confidence scoring",
  badge: "NLP"
},

      {
        title: "This Portfolio",
        desc: "Ultra-smooth animated portfolio with glassmorphism, 60fps performance, and responsive design.",
        tags: ["React", "Framer Motion", "Vite", "UI/UX"],
        link: "https://github.com/bhagavan444/portfolio",
        demo: "https://bhagavansportfolio.netlify.app",
        impact: "Zero-lag • Modern design",
        badge: "Personal Brand"
      },
    ].map((project, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 70 }}
        animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: i * 0.15 }}
        style={{
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(38px)",
          border: "2.8px solid #64dcff60",
          borderRadius: "34px",
          padding: "2.6rem 2.8rem",        // Reduced padding → tighter look
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 30px 90px rgba(0,0,0,0.8), 0 0 110px #64dcff40, inset 0 0 70px #64dcff15",
        }}
        whileHover={{
          borderColor: "#64dcff",
          y: -10,
          boxShadow: "0 45px 120px rgba(0,0,0,0.9), 0 0 160px #64dcff85, inset 0 0 100px #64dcff30",
        }}
      >
        {/* Glow Lines */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)" }} />

        {/* Badge */}
        <div style={{
          position: "absolute",
          top: "1.6rem",
          right: "1.8rem",
          background: i === 0 ? "linear-gradient(45deg,#ff2e63,#7209b7)" : "#64dcff",
          color: "#000",
          padding: "0.6rem 1.4rem",
          borderRadius: "50px",
          fontSize: "0.9rem",
          fontWeight: "900",
          boxShadow: "0 0 45px currentColor",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>
          {project.badge}
        </div>

        <h3 style={{
          fontSize: "2.1rem",
          fontWeight: "900",
          color: "#fff",
          margin: "0 0 0.9rem 0",
          lineHeight: "1.2",
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: "1.18rem",
          color: "#c0e8ff",
          lineHeight: "1.78",
          margin: "0 0 2rem 0",
          fontWeight: "500",
        }}>
          {project.desc}
        </p>

        {/* Impact */}
        <div style={{
          padding: "0.9rem 2.2rem",
          background: "linear-gradient(90deg, rgba(100,220,255,0.22), rgba(100,220,255,0.08))",
          border: "2px solid #64dcff",
          borderRadius: "50px",
          color: "#64dcff",
          fontSize: "1.1rem",
          fontWeight: "800",
          margin: "0 0 2.2rem 0",
          display: "inline-block",
          boxShadow: "0 0 50px #64dcff60",
        }}>
          {project.impact}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", marginBottom: "2.4rem" }}>
          {project.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.08 }}
              style={{
                padding: "0.6rem 1.4rem",
                background: "rgba(100, 220, 255, 0.13)",
                color: "#88d8ff",
                borderRadius: "18px",
                fontSize: "0.94rem",
                fontWeight: "600",
                border: "1.3px solid rgba(100,220,255,0.4)",
                backdropFilter: "blur(6px)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "0.9rem 2.2rem",
              background: "transparent",
              color: "#64dcff",
              border: "2px solid #64dcff",
              borderRadius: "50px",
              fontSize: "1.02rem",
              fontWeight: "800",
              textDecoration: "none",
            }}
          >
            View Code
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "0.9rem 2.4rem",
              background: "#64dcff",
              color: "#000",
              borderRadius: "50px",
              fontSize: "1.02rem",
              fontWeight: "900",
              textDecoration: "none",
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
  {/* Epic Title */}
  <SectionTitle
    initial="hidden"
    animate={isSkillsInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(3rem, 8vw, 4.8rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #00ffff, #00d4ff, #0099ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 90px rgba(0, 255, 255, 0.7)",
      letterSpacing: "10px",
      textAlign: "center",
    }}
  >
    SKILLS
  </SectionTitle>

  <p
    style={{
      color: "#a0f8ff",
      fontSize: "1.5rem",
      textAlign: "center",
      margin: "0 auto 6rem",
      maxWidth: "900px",
      lineHeight: "1.8",
      fontWeight: "500",
    }}
  >
    Mastered tools & technologies that power modern AI and full-stack applications —
    focused on practical, production-ready skills with measurable results.
  </p>

  {/* Certifications-style cards for Skills */}
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
  title: "Programming Languages",
  subtitle: "Job-ready coding fundamentals with strong problem-solving",
  skills: [
    "Python 95%",
    "JavaScript 90%",
    "C 88%",
    "Java 82%",
    "SQL 85%",
    "HTML/CSS 92%"
  ],
},

  {
  title: "Frontend Development",
  subtitle: "Modern, scalable & visually rich UI engineering",
  skills: [
    "React.js 92%",
    "Vite/React 90%",
    "Next.js 82%",
    "Tailwind CSS 94%",
    "Responsive UI 90%",
    "Framer Motion 85%"
  ],
},

  {
  title: "Backend & API Engineering",
  subtitle: "Scalable API design with secure and production-ready backend systems",
  skills: [
    "Node.js 90%",
    "Express.js 90%",
    "REST APIs 94%",
    "Authentication/JWT 88%",
    "MongoDB Integration 90%",
    "Flask / Python APIs 84%"
  ],
},
{
  title: "AI, ML & Deep Learning",
  subtitle: "Practical, deployment-focused machine learning expertise",
  skills: [
    "TensorFlow 90%",
    "Keras 88%",
    "Scikit-learn 92%",
    "Computer Vision 88%",
    "NLP / LLMs 86%",
    "Feature Engineering 90%",
    "Model Deployment 86%"
  ],
},

  {
  title: "Data Engineering & Analysis",
  subtitle: "End-to-end data processing for ML pipelines and insights",
  skills: [
    "Pandas 92%",
    "NumPy 90%",
    "Data Preprocessing 94%",
    "Model Evaluation 90%",
    "Exploratory Analysis 88%",
    "Data Visualization 85%"
  ],
},

 {
  title: "Databases & Cloud",
  subtitle: "Cloud-first architecture with scalable data systems",
  skills: [
    "MongoDB / Atlas 92%",
    "MySQL 85%",
    "Azure Basics 78%",
    "Firebase 88%",
    "IBM Cloud 80%",
    "PostgreSQL 80%",
    "AWS (EC2 / S3) 82%",
    "Docker 80%",
    "Cloud Deployments 84%"
  ],
},

  {
  title: "DevOps & Tools",
  subtitle: "Productive engineering workflows & deployment automation",
  skills: [
    "Git & GitHub 96%",
    "Linux 85%",
    "CI/CD Pipelines 82%",
    "Postman / API Testing 92%",
    "Docker Workflow 80%",
    "Agile SDLC 85%"
  ],
},

  {
    title: "Professional Skills",
    subtitle: "Skills companies expect from freshers",
    skills: ["Problem Solving 94%", "Debugging 90%", "Algorithmic Thinking 88%", "Code Optimization 86%", "Team Collaboration 95%"],
  },
    ].map((cat, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 100, rotateX: -25 }}
        animate={isSkillsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.9, delay: i * 0.09, ease: "easeOut" }}
        style={{
          textDecoration: "none",
          borderRadius: "32px",
          background: "rgba(8, 22, 48, 0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "3px solid rgba(0, 255, 255, 0.8)",
          padding: "2.4rem 2rem",
          minHeight: "240px",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 30px 80px rgba(0, 0, 0, 0.8),
            0 0 120px rgba(0, 255, 255, 0.45),
            inset 0 0 60px rgba(0, 255, 255, 0.12)
          `,
          transformStyle: "preserve-3d",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        whileHover={{
          transform: "translateY(-8px)",
          boxShadow: `
            0 40px 110px rgba(0,0,0,0.9),
            0 0 160px rgba(0,255,255,0.55),
            inset 0 0 90px rgba(0,255,255,0.12)
          `,
          borderColor: "rgba(0,255,255,0.95)",
        }}
      >
        {/* Top Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
            filter: "drop-shadow(0 0 40px #00ffff)",
          }}
        />

        {/* Category */}
        <div
          style={{
            color: "#00ffff",
            fontSize: "0.95rem",
            fontWeight: "800",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
            textShadow: "0 0 20px rgba(0,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          → {cat.title}
        </div>

        <h3
          style={{
            color: "#ffffff",
            fontSize: "1.5rem",
            fontWeight: "900",
            margin: "0",
            lineHeight: "1.25",
            textShadow: "0 0 18px rgba(255,255,255,0.06)",
          }}
        >
          {cat.subtitle}
        </h3>

        {/* Short description for the category (keeps certification-style content) */}
        <p
          style={{
            color: "#c8fbff",
            fontSize: "0.98rem",
            lineHeight: "1.5",
            margin: "0.45rem 0 0.6rem 0",
            fontWeight: 500,
          }}
        >
          {`Hands-on experience and project work tailored for entry-level roles — emphasis on deliverables, clean code and interview-ready fundamentals.`}
        </p>

        {/* Skill tags laid out similarly to certification tags but visually matching */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "auto" }}>
          {cat.skills.map((s, idx) => {
            const [name, pct] = s.split(" ");
            return (
              <div
                key={idx}
                style={{
                  padding: "0.55rem 0.9rem",
                  background: "rgba(0,255,255,0.06)",
                  color: "#bff8ff",
                  borderRadius: "18px",
                  fontSize: "0.93rem",
                  fontWeight: 800,
                  border: "1px solid rgba(0,255,255,0.08)",
                  display: "inline-flex",
                  gap: "0.6rem",
                  alignItems: "center",
                }}
                title={`${name} — ${pct}`}
                aria-label={`${name} skill ${pct}`}
              >
                <span style={{ fontWeight: 900 }}>{name}</span>
                <span style={{ fontSize: "0.85rem", color: "#8ef0ff", fontWeight: 700 }}>{pct}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
            filter: "drop-shadow(0 0 35px #00ffff)",
          }}
        />
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
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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
  desc: "Developed ML models for house price prediction — preprocessing, feature engineering and optimization.",
  impact: "Enhanced model accuracy by 18% through tuning and feature refinement.",
  tech: ["Python", "Scikit-learn", "Pandas", "Feature Engineering", "Data Visualization"],
  certLink: "https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view",
  color: "#64dcff",
},
{
  title: "AI/ML Intern – Smart Sorting",
  company: "SmartBridge (Remote)",
  duration: "May 2025 – June 2025",
  desc: "Built a CNN-based classifier for fruit/vegetable disease detection and deployed it with Flask.",
  impact: "Achieved 92% classification accuracy with an efficient deployed workflow.",
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
          /* REDUCED CARD SIZE: smaller padding, tighter radius, lighter shadow */
          background: "rgba(8, 20, 48, 0.98)",
          backdropFilter: "blur(36px)",
          border: `2px solid ${intern.color}50`,
          borderRadius: "20px",
          padding: "1.6rem 1.8rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 18px 40px rgba(0, 0, 0, 0.75),
            0 0 50px ${intern.color}30,
            inset 0 0 40px ${intern.color}12
          `,
        }}
        whileHover={{
          borderColor: intern.color + "99",
          boxShadow: `
            0 24px 60px rgba(0, 0, 0, 0.85),
            0 0 90px ${intern.color}50,
            inset 0 0 60px ${intern.color}20
          `,
        }}
      >
        {/* Top Glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: `linear-gradient(90deg, transparent, ${intern.color}, transparent)`, filter: `drop-shadow(0 0 24px ${intern.color})` }} />

        {/* Company Badge */}
        <div style={{
          position: "absolute",
          top: "1.2rem",
          right: "1.2rem",
          background: intern.color,
          color: "#000",
          padding: "0.5rem 1.1rem",
          borderRadius: "36px",
          fontSize: "0.95rem",
          fontWeight: "800",
          boxShadow: `0 0 30px ${intern.color}`,
        }}>
          {intern.company.split(" ")[0]}
        </div>

        <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff", margin: "0 0 0.4rem 0" }}>
          {intern.title}
        </h3>

        <p style={{ fontSize: "1.05rem", color: intern.color, fontWeight: "700", margin: "0 0 1rem 0" }}>
          {intern.duration}
        </p>

        <p style={{ fontSize: "0.98rem", color: "#c0e8ff", lineHeight: "1.6", marginBottom: "1.2rem" }}>
          {intern.desc}
        </p>

        {/* Impact */}
        <div style={{
          display: "inline-block",
          padding: "0.55rem 1.6rem",
          background: "rgba(100, 220, 255, 0.16)",
          border: `1.6px solid ${intern.color}`,
          borderRadius: "28px",
          color: intern.color,
          fontSize: "0.98rem",
          fontWeight: "700",
          margin: "0 0 1.4rem 0",
          boxShadow: `0 0 30px ${intern.color}40`,
        }}>
          {intern.impact}
        </div>

        {/* Tech Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.2rem" }}>
          {intern.tech.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "0.45rem 0.95rem",
                background: "rgba(100, 220, 255, 0.10)",
                color: "#88d8ff",
                borderRadius: "14px",
                fontSize: "0.88rem",
                fontWeight: "600",
                border: "1px solid rgba(100, 220, 255, 0.32)",
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
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "0.8rem 2rem",
              background: intern.color,
              color: "#000",
              borderRadius: "40px",
              fontSize: "0.95rem",
              fontWeight: "800",
              textDecoration: "none",
              boxShadow: `0 10px 30px ${intern.color}60`,
              display: "inline-block",
            }}
          >
            View Certificate
          </motion.a>
        </div>

        {/* Bottom Glow */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5px", background: `linear-gradient(90deg, transparent, ${intern.color}, transparent)`, filter: `drop-shadow(0 0 24px ${intern.color})` }} />
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
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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
        title: "AWS Certified Cloud Practitioner",
        platform: "SimpliLearn",
        year: "2024",
        type: "Cloud Certification",
        link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
        desc: "Core AWS fundamentals including global infrastructure, billing, security basics, and well-architected principles — ideal for cloud-first engineering."
      },
  {
  title: "Microsoft Azure Fundamentals: Azure RBAC & Azure Policy",
  platform: "Infosys Springboard",
  year: "2025",
  type: "Cloud Fundamentals",
  link: "https://drive.google.com/file/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM/view?usp=sharing",
  desc: "Foundational Azure concepts focusing on Role-Based Access Control (RBAC), governance, resource permissions, and Azure Policy for secure cloud management." // :contentReference[oaicite:1]{index=1}
},
{
  title: "Data Science",
  platform: "Infosys Springboard",
  year: "2025",
  type: "Advanced Data Science Certification",
  link: "https://drive.google.com/file/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv/view?usp=sharing",
  desc: "Comprehensive data science training covering advanced analytical methods, statistical modeling, and practical end-to-end data workflows — strengthening expertise in applied data science." // :contentReference[oaicite:0]{index=0}
}
,
{
  title: "Explore Machine Learning using Python",
  platform: "Infosys Springboard",
  year: "2025",
  type: "Machine Learning Certification",
  link: "https://drive.google.com/file/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6/view?usp=sharing",
  desc: "Hands-on ML foundations using Python—covering model building, feature handling, evaluation techniques, and practical ML workflows." // :contentReference[oaicite:1]{index=1}
},
{
  title: "ServiceNow – Intermediate to Advanced Level",
  platform: "Infosys Springboard",
  year: "2025",
  type: "ServiceNow Platform Certification",
  link: "https://drive.google.com/file/d/198qFgXi1RZUkzcl5mLjdQpaLEi7MBSH-/view?usp=sharing",
  desc: "Intermediate-to-advanced ServiceNow concepts including workflow automation, platform configuration, scripting, and enterprise ITSM tools." // :contentReference[oaicite:2]{index=2}
},
{
  title: "Cloud Computing and MLOps: ML Pipelines",
  platform: "Infosys Springboard",
  year: "2025",
  type: "Cloud & MLOps Certification",
  link: "https://drive.google.com/file/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX/view?usp=sharing",
  desc: "Core cloud computing fundamentals paired with MLOps practices, focusing on ML pipelines, automation, deployment strategies, and scaling workflows." // :contentReference[oaicite:3]{index=3}
},
{
  title: "Mastering R Programming",
  platform: "Infosys Springboard",
  year: "2025",
  type: "Programming Certification",
  link: "https://drive.google.com/file/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-/view?usp=sharing",
  desc: "Comprehensive training in R programming covering data manipulation, statistical computing, visualization, and analytical workflows." // :contentReference[oaicite:4]{index=4}
},
{
  title: "Python for Data Science",
  platform: "Infosys Springboard",
  year: "2025",
  type: "Python Certification",
  link: "https://drive.google.com/file/d/1_Egm0KQfoFq4XQQuDaHGyLmdEJ6azVR_/view?usp=sharing",
  desc: "Essential Python skills for data science, including Pandas, NumPy, data cleaning, exploratory analysis, and scripting best practices." // :contentReference[oaicite:5]{index=5}
},
      {
        title: "Mastering the art of promting",
        platform: "IBM Skills Build",
        year: "2024",
        type: "Certification in Prompt Engineering",
        link: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing",
        desc: "Comprehensive training on effective prompt engineering techniques, including crafting structured prompts, optimizing outputs for AI models, and applying real-world prompting strategies for improved accuracy and productivity."

      },
      {
        title: "Machine Learning with Python",
        platform: "Infosys Springboard",
        year: "2024",
        type: "Machine Learning",
        link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
        desc: "Supervised/unsupervised learning foundations, model evaluation, and practical Python implementations using scikit-learn and Pandas."
      },
      {
        title: "Large Language Models",
        platform: "IBM Skills Build",
        year: "2025",
        type: "AI / LLMs",
        link: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing",
        desc: "Hands-on training with transformer architectures, prompt engineering, fine-tuning, and deployment best practices for production LLMs."
      },
      {
        title: "React.js Professional",
        platform: "Infosys Springboard",
        year: "2024",
        type: "Frontend Development",
        link: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link",
        desc: "Component-driven development, hooks, performance optimization, and building accessible, responsive user interfaces with React."
      },
      {
        title: "Python Programming",
        platform: "Infosys Springboard",
        year: "2024",
        type: "Programming",
        link: "https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link",
        desc: "Advanced Python concepts including OOP, modules, generators, decorators and writing production-ready Python code."
      },
      {
        title: "JavaScript",
        platform: "Infosys Springboard",
        year: "2024",
        type: "Programming",
        link: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link",
        desc: "Modern JavaScript (ES6+) patterns, asynchronous programming, module systems, and best practices for building modern web apps."
      },
      {
        title: "MLOps & Deployment",
        platform: "Infosys Springboard",
        year: "2025",
        type: "MLOps / Deployment",
        link: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link",
        desc: "CI/CD for ML, model versioning, containerization, monitoring and serving models reliably in production environments."
      },
      {
        title: "CI/CD & DevOps",
        platform: "Infosys Springboard",
        year: "2024",
        type: "DevOps",
        link: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing",
        desc: "Practical CI/CD pipelines, automated testing, container orchestration and deployment using modern DevOps tooling."
      },
      {
        title: "Django",
        platform: "Infosys Springboard",
        year: "2024",
        type: "Backend Development",
        link: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
        desc: "Robust backend APIs with Django and Django REST Framework, authentication, serialization and deployment-ready service design."
      },
      {
        title: "Java Programming",
        platform: "Infosys Springboard & Simplilearn",
        year: "2023",
        type: "Programming",
        link: "https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link",
        desc: "Core Java principles, OOP design patterns, and building stable server-side components using Java."
      },
      {
        title: "Mastering Python",
        platform: "Infosys Springboard",
        year: "2024",
        type: "Programming",
        link: "https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link",
        desc: "Deep-dive into advanced libraries, performance tuning, concurrency, and testing for production Python applications."
      },
      {
        title: "HTML5 Mastery",
        platform: "Infosys Springboard",
        year: "2023",
        type: "Frontend Development",
        link: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link",
        desc: "Solid HTML5 semantics, accessibility, and modern layout techniques to build resilient responsive interfaces."
      },
      {
        title: "Advanced CSS & Animations",
        platform: "Infosys Springboard",
        year: "2024",
        type: "Frontend Development",
        link: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link",
        desc: "Complex layouts, CSS animations, transitions, and visual polish to create engaging, high-performance UIs."
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
          margin: "0 0 0.9rem 0",
          lineHeight: "1.3",
          textShadow: "0 0 30px rgba(255, 255, 255, 0.6)",
        }}>
          {cert.title}
        </h3>

        {/* Short descriptive matter added */}
        <p style={{
          color: "#c8fbff",
          fontSize: "0.98rem",
          lineHeight: "1.5",
          margin: "0 0 1.1rem 0",
          fontWeight: 500,
        }}>
          {cert.desc}
        </p>

        {/* Year + Clean Arrow */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
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
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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

  <p
    style={{
      color: "#a0d8f0",
      fontSize: "1.5rem",
      textAlign: "center",
      margin: "0 auto 6rem",
      maxWidth: "900px",
      lineHeight: "1.8",
      fontWeight: "500",
      textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
    }}
  >
    Committed to continuous learning with advanced training in emerging and industry-leading technologies.
  </p>

  {/* 2 CARDS PER ROW */}
  <motion.div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(420px, 1fr))",
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
          backdropFilter: "blur(36px)",
          WebkitBackdropFilter: "blur(36px)",
          border: "2px solid #64dcff50",
          borderRadius: "20px",
          padding: "2rem 2.2rem",          // INCREASED PADDING
          minHeight: "260px",              // ⭐ INCREASED CARD HEIGHT
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 18px 40px rgba(0, 0, 0, 0.75),
            0 0 70px #64dcff30,
            inset 0 0 40px #64dcff12
          `,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: "#64dcff88",
          boxShadow: `
            0 26px 60px rgba(0, 0, 0, 0.85),
            0 0 100px #64dcff60,
            inset 0 0 60px #64dcff20
          `,
        }}
      >
        {/* Top Glow Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
            filter: "drop-shadow(0 0 24px #64dcff)",
          }}
        />

        {/* Year Badge */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(100, 220, 255, 0.14)",
            color: "#64dcff",
            padding: "0.45rem 1rem",
            borderRadius: "36px",
            fontSize: "0.95rem",
            fontWeight: "700",
            border: "1.6px solid #64dcff50",
            backdropFilter: "blur(8px)",
          }}
        >
          {workshop.year}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1.6rem",
            fontWeight: "900",
            color: "#ffffff",
            margin: "0 0 0.5rem 0",
            textShadow: "0 0 18px rgba(255,255,255,0.45)",
          }}
        >
          {workshop.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "1rem",
            color: "#c0e8ff",
            lineHeight: "1.6",
            margin: "0 0 1.2rem 0",
            fontWeight: "500",
          }}
        >
          {workshop.desc}
        </p>

        {/* Impact Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "0.55rem 1.6rem",
            background: "rgba(100, 220, 255, 0.14)",
            border: "1.4px solid #64dcff40",
            borderRadius: "22px",
            color: "#64dcff",
            fontSize: "0.95rem",
            fontWeight: "700",
            margin: "0 0 1rem 0",
            boxShadow: "0 0 30px #64dcff40",
          }}
        >
          {workshop.impact}
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            justifyContent: "center",
          }}
        >
          {workshop.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.06 }}
              style={{
                padding: "0.45rem 1rem",
                background: "rgba(100, 220, 255, 0.10)",
                color: "#88d8ff",
                borderRadius: "14px",
                fontSize: "0.86rem",
                fontWeight: "600",
                border: "1px solid rgba(100, 220, 255, 0.28)",
                backdropFilter: "blur(6px)",
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
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, transparent, #64dcff, transparent)",
            filter: "drop-shadow(0 0 24px #64dcff)",
          }}
        />
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
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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

  <p
    style={{
      color: "#a0f0ff",
      fontSize: "1.5rem",
      textAlign: "center",
      margin: "0 auto 5.5rem",
      maxWidth: "900px",
      lineHeight: "1.8",
      fontWeight: "500",
      textShadow: "0 0 16px rgba(0, 255, 255, 0.3)",
    }}
  >
    Demonstrated proficiency in competitive programming with consistent performance across global coding platforms.
  </p>

  {/* background accent container (diagonal subtle stripes for uniqueness) */}
  <div style={{
    maxWidth: "1480px",
    margin: "0 auto",
    padding: "0 2rem 3.5rem",
    position: "relative",
    overflow: "visible",
  }}>
    <div style={{
      pointerEvents: "none",
      position: "absolute",
      inset: "-120px -40% auto -40%",
      height: "260px",
      transform: "rotate(-6deg)",
      background: "linear-gradient(90deg, rgba(0,136,255,0.03) 0%, rgba(0,255,255,0.02) 50%, rgba(0,136,255,0.03) 100%)",
      filter: "blur(36px)",
      borderRadius: "20px",
    }} />

    {/* PERFECT 3-CARD GRID */}
    <motion.div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
        gap: "3.5rem",
      }}
    >
      {[
        {
  platform: "LeetCode",
  badge: "DSA Practitioner",
  title: "Active Problem Solver",
  stats: "180+ Problems Solved • Regular DSA Practice",
  color: "#FFA116",
  glow: "#ff8c00",
  link: "https://leetcode.com/u/AxZsDhEeto/",
  progress: 82
},
        {
  platform: "HackerRank",
  badge: "Python & Problem Solving",
  title: "Gold Badge Achiever",
  stats: "Skill-based challenges • Consistent learning",
  color: "#00ff9d",
  glow: "#00ff9d",
  link: "https://www.hackerrank.com/profile/g_sivasatyasaib1",
  progress: 76
}
,
       {
  platform: "CodeChef",
  badge: "Competitive Programmer",
  title: "Coding Contests",
  stats: "Practical problem-solving • Steady participation",
  color: "#ff4757",
  glow: "#ff6b6b",
  link: "https://www.codechef.com/users/bhagavan444",
  progress: 70
},
      ].map((profile, i) => (
        <motion.a
          key={i}
          href={profile.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 60, rotateX: -12, scale: 0.98 }}
          animate={isCodingInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
          whileHover={{ rotateX: 0, rotateY: 4, translateY: -6, boxShadow: `0 36px 120px ${profile.glow}50` }}
          style={{
            textDecoration: "none",
            background: "linear-gradient(180deg, rgba(10,18,36,0.95), rgba(8,16,32,0.95))",
            border: `2.6px solid ${profile.color}40`,
            borderRadius: "28px",
            padding: "2.4rem 2.2rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 20px 80px rgba(0,0,0,0.7), 0 0 90px ${profile.glow}30, inset 0 0 36px ${profile.glow}10`,
            transformStyle: "preserve-3d",
            cursor: "pointer",
            display: "block",
          }}
        >
          {/* subtle SVG corner accent */}
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: "absolute", top: -18, right: -18, opacity: 0.06 }}>
            <defs>
              <linearGradient id={`g-${i}`} x1="0" x2="1">
                <stop offset="0" stopColor={profile.color} stopOpacity="0.6"/>
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            <path d="M0 60 C20 10, 100 10, 120 60 L120 120 L0 120 Z" fill={`url(#g-${i})`} />
          </svg>

          {/* Header: Platform + micro-pill */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.6rem" }}>
            <div>
              <div style={{ fontSize: "0.95rem", color: "#cfeffd", fontWeight: 900, letterSpacing: "1px" }}>{profile.platform}</div>
              <div style={{ marginTop: "6px", fontSize: "0.86rem", color: "#98f0ff", fontWeight: 700 }}>{profile.badge}</div>
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.5rem 1rem",
              borderRadius: 999,
              background: `linear-gradient(90deg, ${profile.color}22, ${profile.color}08)`,
              border: `1px solid ${profile.color}30`,
              fontWeight: 900,
              color: profile.color,
              fontSize: "0.98rem",
            }}>
              {/* animated dot */}
              <span style={{
                width: 10, height: 10, borderRadius: 999,
                background: profile.color, display: "inline-block",
                boxShadow: `0 0 10px ${profile.glow}aa`,
                transformOrigin: "center",
                animation: "pulse 1.6s infinite ease-in-out"
              }} />
              Live
            </div>
          </div>

          {/* Main Title & textured underline */}
          <h4 style={{
            fontSize: "1.6rem",
            fontWeight: "900",
            color: profile.color,
            margin: "0 0 0.6rem 0",
            textAlign: "left",
            textShadow: `0 0 18px ${profile.glow}22`
          }}>
            {profile.title}
          </h4>

          {/* Stats + micro progress */}
          <p style={{
            color: "#a8f4ff",
            fontSize: "1.02rem",
            margin: "0 0 1.4rem 0",
            fontWeight: 600,
            lineHeight: 1.5
          }}>{profile.stats}</p>

          {/* micro progress bar row */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.6rem" }}>
            <div style={{ flex: "1 1 auto", height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{
                width: `${profile.progress}%`,
                height: "100%",
                borderRadius: 999,
                background: `linear-gradient(90deg, ${profile.color}, ${profile.glow})`,
                boxShadow: `0 6px 20px ${profile.glow}40`
              }} />
            </div>
            <div style={{ minWidth: 48, textAlign: "right", fontWeight: 800, color: "#bff8ff" }}>{profile.progress}%</div>
          </div>

          {/* call to action (glow pill) */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "0.9rem 2.2rem",
                background: `linear-gradient(90deg, ${profile.color}, ${profile.glow})`,
                color: "#001",
                borderRadius: 999,
                fontWeight: 900,
                fontSize: "1rem",
                boxShadow: `0 14px 46px ${profile.glow}55`,
              }}
            >
              View Profile →
            </motion.div>

            <div style={{ color: "#98f0ff", fontWeight: 700, fontSize: "0.95rem", opacity: 0.95 }}>
              Verified • Active
            </div>
          </div>

          {/* bottom neon glow */}
          <div style={{
            position: "absolute",
            left: 12, right: 12, bottom: 12, height: 6,
            borderRadius: 8,
            background: `linear-gradient(90deg, transparent, ${profile.color}, transparent)`,
            filter: `drop-shadow(0 0 18px ${profile.glow})`,
            opacity: 0.9
          }} />
        </motion.a>
      ))}
    </motion.div>
  </div>
</Section>

{/* --- HOBBIES / PROFESSIONAL INTERESTS (matched & enhanced) --- */}
<Section id="hobbies" ref={hobbiesRef}>
  <SectionTitle
    initial="hidden"
    animate={isHobbiesInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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
  stats: "300+ Problems Solved • Regular LeetCode Practitioner",
  color: "#ff00aa",
  glow: "#ff00aa",
  icon: (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 7L16 12L8 17V7Z" fill="#ff00aa"/>
    </svg>
  )
},

      {
  title: "Tech & Research Reading",
  subtitle: "Continuous Learner",
  stats: "AI papers, tech blogs, and industry trends — weekly learning insights",
  color: "#8e44ad",
  glow: "#9b59b6",
  icon: (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6H21V8H3V6Z" fill="#9b59b6"/>
      <path d="M3 10H21V12H3V10Z" fill="#9b59b6" opacity="0.85"/>
      <path d="M3 14H21V16H3V14Z" fill="#9b59b6" opacity="0.65"/>
    </svg>
  )
}
,

      {
  title: "Machine Learning Research",
  subtitle: "ML Explorer",
  stats: "Building ML models, experimenting with datasets, and creating reproducible research notebooks",
  color: "#ffd700",
  glow: "#ffdd00",
  icon: (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" fill="#ffd700"/>
      <path d="M12 8V12L14.5 14" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

    ].map((hobby, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 60, rotateX: -12 }}
        animate={isHobbiesInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.85, delay: i * 0.12 }}
        whileHover={{ translateY: -8, scale: 1.01 }}
        style={{
          background: "linear-gradient(180deg, rgba(10,20,36,0.96), rgba(6,14,28,0.96))",
          border: `2.4px solid ${hobby.color}40`,
          borderRadius: "28px",
          padding: "2.4rem 2rem",
          position: "relative",
          boxShadow: `0 22px 80px rgba(0,0,0,0.7), 0 0 90px ${hobby.glow}30`,
          overflow: "hidden",
        }}
      >
        {/* header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#eafcff" }}>{hobby.title}</div>
            <div style={{ fontSize: "0.92rem", color: "#bfeaff", fontWeight: 700, marginTop: 6 }}>{hobby.subtitle}</div>
          </div>

          {/* icon badge */}
          <div style={{
            width: 64, height: 64, borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `linear-gradient(180deg, ${hobby.color}22, ${hobby.color}08)`,
            border: `1px solid ${hobby.color}30`,
            boxShadow: `0 10px 36px ${hobby.glow}33`
          }}>
            {hobby.icon}
          </div>
        </div>

        {/* highlight */}
        <div style={{ fontSize: "1.6rem", fontWeight: 900, color: hobby.color, marginBottom: 8 }}>{hobby.stats.split(" • ")[0]}</div>
        <p style={{ color: "#a8f4ff", fontSize: "1rem", margin: "0 0 1.6rem 0", fontWeight: 600 }}>
          {hobby.stats.includes("•") ? hobby.stats.split("•").slice(1).join(" • ").trim() : hobby.stats}
        </p>

        {/* micro action row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "0.8rem 1.8rem",
              borderRadius: 999,
              background: `linear-gradient(90deg, ${hobby.color}, ${hobby.glow})`,
              boxShadow: `0 12px 36px ${hobby.glow}55`,
              color: "#001",
              fontWeight: 900,
            }}
          >
            Explore →
          </motion.div>

          <div style={{ color: "#98f0ff", fontWeight: 800, fontSize: "0.95rem" }}>
            Active • Curious
          </div>
        </div>

        {/* neon bottom stroke */}
        <div style={{
          position: "absolute",
          left: 12, right: 12, bottom: 12, height: 6,
          borderRadius: 8,
          background: `linear-gradient(90deg, transparent, ${hobby.color}, transparent)`,
          filter: `drop-shadow(0 0 20px ${hobby.glow})`,
          opacity: 0.95
        }} />
      </motion.div>
    ))}
  </motion.div>
</Section>

{/* small keyframe for pulse (put this in your global CSS or style tag) */}
<style>
{`
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.18); opacity: 0.75; }
  100% { transform: scale(1); opacity: 1; }
}
`}
</style>

     <Section id="extracurricular" ref={extracurricularRef}>
  {/* Premium Title */}
  <Section id="extracurricular" ref={extracurricularRef}>
  {/* Title */}
  <SectionTitle
    initial="hidden"
    animate={isExtracurricularInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
      fontWeight: "900",
      background: "linear-gradient(90deg, #00ffff, #00d0ff, #0088ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 80px rgba(0,255,255,0.6)",
      letterSpacing: "8px",
      textAlign: "center",
    }}
  >
    Outside of Coding Activities
  </SectionTitle>

  <p
    style={{
      color: "#a0f0ff",
      fontSize: "1.5rem",
      textAlign: "center",
      margin: "0 auto 5.5rem",
      maxWidth: "900px",
      lineHeight: "1.8",
      fontWeight: "500",
      textShadow: "0 0 16px rgba(0,255,255,0.3)",
    }}
  >
    Leadership, mentorship, and continuous growth — the core of my work philosophy.
  </p>

  {/* DIAGONAL ACCENT + PREMIUM GRID */}
  <div
    style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: "0 2rem 3rem",
      position: "relative",
    }}
  >
    {/* Diagonal Glow Background */}
    <div
      style={{
        position: "absolute",
        inset: "-120px -40% auto -40%",
        height: "260px",
        background:
          "linear-gradient(90deg, rgba(0,255,255,0.06), rgba(0,136,255,0.04))",
        transform: "rotate(-6deg)",
        filter: "blur(36px)",
        borderRadius: "20px",
        pointerEvents: "none",
      }}
    />

    {/* PREMIUM TILE GRID */}
    <motion.div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        gap: "3.5rem",
      }}
    >
      {[
        {
  title: "Technical Workshops",
  subtitle: "Tech Facilitator",
  stats: "Facilitated hands-on sessions and guided students through practical tech concepts",
  color: "#ff00ff",
  glow: "#ff00ff",
  icon: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="3" fill="#ff00ff" />
      <path
        d="M16 11C16 12.7 14.7 14 13 14H11C9.3 14 8 12.7 8 11"
        stroke="#ff00ff"
        strokeWidth="1.8"
      />
      <path
        d="M4 20C4.5 16 7 14 12 14C17 14 19.5 16 20 20"
        stroke="#ff00ff"
        strokeWidth="1.8"
      />
    </svg>
  ),
}
,
{
  title: "Open-Source Contributions",
  subtitle: "Community Developer",
  stats: "Contributing to GitHub projects • Issue fixing • Feature enhancements",
  color: "#1abc9c",
  glow: "#16e0b1",
  icon: (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.5 2 2 6.5 2 12C2 16.4 4.9 20.1 8.9 21.4C9.4 21.5 9.6 21.2 9.6 20.9V18.8C7 19.4 6.4 17.8 6.4 17.8C5.9 16.7 5.2 16.4 5.2 16.4C4.2 15.8 5.3 15.8 5.3 15.8C6.4 15.9 7 16.9 7 16.9C8 18.6 9.6 18.1 10.2 17.8C10.3 17.1 10.6 16.6 10.9 16.3C8.5 16 6 15.1 6 11.4C6 10.4 6.4 9.6 7 9C7 8.7 6.7 7.7 7.1 6.4C7.1 6.4 8 6.1 9.6 7.3C10.5 7 11.5 6.9 12.5 6.9C13.5 6.9 14.5 7 15.4 7.3C17 6.1 17.9 6.4 17.9 6.4C18.3 7.7 18 8.7 18 9C18.6 9.6 19 10.4 19 11.4C19 15.2 16.5 16 14.1 16.3C14.5 16.7 14.9 17.4 14.9 18.5V20.9C14.9 21.2 15.1 21.5 15.6 21.4C19.6 20.1 22.5 16.4 22.5 12C22.5 6.5 18 2 12 2Z" fill="#1abc9c"/>
    </svg>
  )
}
,{
  title: "Open-Source Exploration",
  subtitle: "Code Reader",
  stats: "Studying popular GitHub repositories to understand real-world designs",
  color: "#e67e22",
  glow: "#f39c12",
  icon: (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L4 7V17L12 21L20 17V7L12 3Z" fill="#e67e22"/>
    </svg>
  )
},
        {
  title: "Elite Certifications",
  subtitle: "Certified Specialist",
  stats: "Certified across AI, Cloud, DevOps, and Full-Stack technologies",
  color: "#00ff88",
  glow: "#00ff88",
  icon: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z"
        fill="#00ff88"
      />
    </svg>
  ),
}
,
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 80, rotateX: -16 }}
          animate={
            isExtracurricularInView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : {}
          }
          transition={{ duration: 0.95, delay: i * 0.15 }}
          whileHover={{ translateY: -10, rotateY: 4 }}
          style={{
            background:
              "linear-gradient(180deg, rgba(10,20,36,0.96), rgba(6,14,28,0.96))",
            border: `2.6px solid ${item.color}50`,
            borderRadius: "28px",
            padding: "3.2rem 2.6rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: `
              0 25px 90px rgba(0,0,0,0.85),
              0 0 120px ${item.glow}40,
              inset 0 0 70px ${item.glow}18
            `,
          }}
        >
          {/* CORNER SVG GLOW */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 120 120"
            style={{
              position: "absolute",
              top: -22,
              right: -22,
              opacity: 0.1,
            }}
          >
            <defs>
              <linearGradient id={`grad-${i}`} x1="0" x2="1">
                <stop offset="0" stopColor={item.color} stopOpacity="0.7" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <path
              d="M0 60 C20 10, 100 10, 120 60 L120 120 L0 120 Z"
              fill={`url(#grad-${i})`}
            />
          </svg>

          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2.2rem",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                fontSize: "2rem",
                color: "#fff",
                fontWeight: "900",
                margin: 0,
                textShadow: "0 0 30px rgba(255,255,255,0.6)",
              }}
            >
              {item.title}
            </h3>

            <div
              style={{
                background: item.color,
                color: "#000",
                padding: "0.7rem 1.7rem",
                fontWeight: "900",
                fontSize: "1rem",
                borderRadius: "999px",
                boxShadow: `0 0 45px ${item.glow}`,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {item.subtitle}
            </div>
          </div>

          {/* MAIN HIGHLIGHT */}
          <h4
            style={{
              textAlign: "center",
              color: item.color,
              fontSize: "1.85rem",
              fontWeight: "900",
              marginBottom: "1rem",
              textShadow: `0 0 35px ${item.glow}`,
            }}
          >
            {item.stats.split(" • ")[0]}
          </h4>

          {/* SUPPORTING INFO */}
          <p
            style={{
              color: "#a0f8ff",
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "600",
              lineHeight: "1.6",
              marginBottom: "3rem",
            }}
          >
            {item.stats.split(" • ").slice(1).join(" • ")}
          </p>

          {/* ICON BOX */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                padding: "1.1rem",
                borderRadius: "18px",
                background: `${item.color}20`,
                border: `1.4px solid ${item.color}60`,
                boxShadow: `0 0 40px ${item.glow}60`,
              }}
            >
              {item.icon}
            </div>
          </div>

          {/* NEON BOTTOM LINE */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 14,
              right: 14,
              height: "6px",
              background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
              filter: `drop-shadow(0 0 35px ${item.glow})`,
              borderRadius: "6px",
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
</Section>
</Section>
      <Section id="contact" ref={contactRef}>
  {/* Premium Title */}
  <SectionTitle
    initial="hidden"
    animate={isContactInView ? "visible" : "hidden"}
    variants={fadeInUp}
    style={{
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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
      fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
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

  <p
    style={{
      color: "#a0d8f0",
      fontSize: "1.5rem",
      textAlign: "center",
      margin: "0 auto 5.5rem",
      maxWidth: "900px",
      lineHeight: "1.8",
      fontWeight: "500",
      textShadow: "0 0 16px rgba(100, 220, 255, 0.3)",
    }}
  >
    Full-Stack Developer • AI/ML Engineer • Cloud Engineer
    <br />
    Designing and delivering scalable, high-performance software solutions.
  </p>

  {/* LARGER LANDSCAPE CARD WITH MORE HEIGHT */}
  <motion.div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "grid",
      placeItems: "center",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -12 }}
      animate={isResumeInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{
        background: "linear-gradient(180deg, rgba(8,20,48,0.98), rgba(6,14,30,0.98))",
        backdropFilter: "blur(36px)",
        WebkitBackdropFilter: "blur(36px)",
        border: "2.8px solid rgba(100, 220, 255, 0.45)",
        borderRadius: "32px",
        padding: "3rem 2.4rem",
        minHeight: "380px",
        width: "100%",
        maxWidth: "1100px",
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 36px 110px rgba(0, 0, 0, 0.88),
          0 0 140px rgba(100, 220, 255, 0.32),
          inset 0 0 70px rgba(100, 220, 255, 0.06)
        `,
        display: "flex",
        gap: "1.8rem",
        alignItems: "center",
      }}
      whileHover={{
        borderColor: "rgba(100, 220, 255, 0.95)",
        boxShadow: `
          0 44px 130px rgba(0, 0, 0, 0.92),
          0 0 200px rgba(100, 220, 255, 0.5),
          inset 0 0 110px rgba(100, 220, 255, 0.18)
        `,
      }}
    >
      {/* Left column: identity */}
      <div style={{ flex: "0 0 360px", padding: "0 0.8rem" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            color: "#c0e8ff",
            padding: "0.45rem 0.95rem",
            borderRadius: 999,
            fontSize: "0.92rem",
            fontWeight: 700,
            letterSpacing: "1px",
            display: "inline-block",
            marginBottom: "0.9rem",
            border: "1px solid rgba(100,220,255,0.06)",
          }}
        >
          Resume 2025
        </div>

        <h3
          style={{
            fontSize: "2.1rem",
            fontWeight: "900",
            margin: "0.6rem 0 0.35rem 0",
            color: "#ffffff",
            lineHeight: 1.02,
            letterSpacing: "0.6px",
          }}
        >
          Siva Satya Sai Bhagavan
        </h3>

        <p style={{ margin: "0.5rem 0 0", color: "#87CEEB", fontWeight: 800, fontSize: "1rem" }}>
          Full-Stack • AI/ML • Cloud
        </p>

        <p style={{ marginTop: "1rem", color: "#c0e8ff", fontSize: "0.98rem", lineHeight: 1.55 }}>
          B.Tech (AI&DS) • MERN Stack enthusiast • Hands-on with production deployments and ML pipelines.
        </p>

        <div style={{ marginTop: "1.1rem", display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
          {["MERN", "Next.js", "React Native", "TensorFlow", "AWS", "Docker"].map((t, idx) => (
            <span
              key={idx}
              style={{
                padding: "0.38rem 0.8rem",
                background: "rgba(100,220,255,0.06)",
                borderRadius: 14,
                color: "#bff6ff",
                fontSize: "0.86rem",
                fontWeight: 800,
                border: "1px solid rgba(100,220,255,0.06)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* UNIQUE: Animated skill bars + counters (clean, HR-friendly) */}
        <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
          {[
            { name: "React / Frontend", pct: 92 },
            { name: "Node / Backend", pct: 88 },
            { name: "ML Deployment", pct: 82 },
          ].map((s) => (
            <div key={s.name} style={{ marginTop: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ color: "#bff6ff", fontWeight: 800, fontSize: "0.95rem" }}>{s.name}</div>
                {/* Animated numeric counter (simple, readable) */}
                <motion.div
                  initial={{ count: 0 }}
                  animate={{ count: s.pct }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{ color: "#7fe7ff", fontWeight: 900, fontSize: "0.95rem" }}
                >
                  {/* framer-motion won't render the number automatically — render via children using a little trick */}
                  {/** Using a function child to show animated number */}
                  {({ count }) => Math.round(count) + "%"}
                </motion.div>
              </div>

              <div
                style={{
                  height: 12,
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 999,
                  overflow: "hidden",
                  border: "1px solid rgba(100,220,255,0.03)",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    borderRadius: 999,
                    background: "linear-gradient(90deg,#00f0ff,#7fffd4,#40c4ff)",
                    boxShadow: "0 8px 24px rgba(64,196,255,0.12)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle moving gloss line to make it look premium */}
                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={{ x: "120%" }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: "linear" }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "30%",
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.18), rgba(255,255,255,0.0))",
                      mixBlendMode: "overlay",
                      opacity: 0.9,
                    }}
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div style={{ width: "1px", height: "80%", background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(100,220,255,0.06))" }} />

      {/* Right side */}
      <div style={{ flex: "1 1 auto", padding: "0 0.8rem", minWidth: 0 }}>
        <p
          style={{
            color: "#c0e8ff",
            fontSize: "1.08rem",
            lineHeight: 1.7,
            margin: "0 0 1.2rem 0",
            fontWeight: 500,
          }}
        >
          Full-stack developer skilled in building scalable React frontends, secure Node/Express APIs, and deploying machine learning models as REST services. Focused on performance, clean architecture, and writing maintainable, production-ready code.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.6rem" }}>
          <div style={{ padding: "0.6rem 1rem", borderRadius: 20, background: "rgba(100,220,255,0.08)", color: "#bff8ff", fontWeight: 800, fontSize: "0.94rem", border: "1px solid rgba(100,220,255,0.06)" }}>
            Production-Grade Apps
          </div>
          <div style={{ padding: "0.6rem 1rem", borderRadius: 20, background: "rgba(100,220,255,0.06)", color: "#bff8ff", fontWeight: 800, fontSize: "0.94rem", border: "1px solid rgba(100,220,255,0.06)" }}>
            AI/ML Pipelines
          </div>
          <div style={{ padding: "0.6rem 1rem", borderRadius: 20, background: "rgba(100,220,255,0.06)", color: "#bff8ff", fontWeight: 800, fontSize: "0.94rem", border: "1px solid rgba(100,220,255,0.06)" }}>
            Cloud & CI/CD
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* Primary action: download (no modal) */}
          <motion.a
            href={resumePdf}
            download="Siva_Satya_Sai_Bhagavan_Resume_2025.pdf"
            whileHover={{ scale: 1.04, translateY: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.95rem 1.9rem",
              background: "linear-gradient(90deg,#64dcff,#40c4ff)",
              color: "#001",
              border: "none",
              borderRadius: 999,
              fontSize: "0.98rem",
              fontWeight: "900",
              cursor: "pointer",
              boxShadow: "0 14px 36px rgba(100,220,255,0.28)",
              textDecoration: "none",
            }}
          >
            Download Resume
          </motion.a>

          {/* Secondary: view in new tab */}
          <motion.a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "0.9rem 1.6rem",
              background: "transparent",
              color: "#64dcff",
              border: "2px solid rgba(100,220,255,0.6)",
              borderRadius: 999,
              fontSize: "0.98rem",
              fontWeight: "900",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(100,220,255,0.12)",
            }}
          >
            View in Browser
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            style={{
              padding: "0.6rem 0.95rem",
              background: "rgba(255,255,255,0.02)",
              color: "#bff8ff",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              border: "1px solid rgba(100,220,255,0.04)",
            }}
          >
            Let's Talk
          </motion.a>
        </div>

        <div style={{ marginTop: "1.1rem", color: "#9fe6ff", fontSize: "0.88rem", fontWeight: 700 }}>
          Production-Grade • Performance-Optimized • Future-Ready Architecture
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 10, left: 16, right: 16, height: "6px", background: "linear-gradient(90deg, transparent, #64dcff, transparent)", borderRadius: 12, opacity: 0.95 }} />
    </motion.div>
  </motion.div>
</Section>


  <Footer>
  {/* Cyberpunk Neon Grid Background */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: `
      linear-gradient(to right, rgba(100,220,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(100,220,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    opacity: 0.4,
  }} />

  <FooterContent
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    style={{
      padding: "7rem 2rem 5rem",
      textAlign: "center",
      position: "relative",
      zIndex: 10,
    }}
  >
    {/* NAME CARD – NO HOVER, LESS BOTTOM SPACE */}
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        display: "inline-block",
        marginBottom: "2.5rem",  // Reduced from 4rem
      }}
    >
      <div style={{
        padding: "2.8rem 5rem",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        border: "2px solid #64dcff",
        borderRadius: "32px",
        boxShadow: `
          0 0 60px rgba(100,220,255,0.6),
          inset 0 0 40px rgba(100,220,255,0.1)
        `,
      }}>
        <h1 style={{
          fontSize: "clamp(3.5rem, 10vw, 6.5rem)",
          fontWeight: "900",
          background: "linear-gradient(90deg, #64dcff, #00ffea, #64dcff)",
          backgroundSize: "200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "8px",
          animation: "flow 6s linear infinite",
          textShadow: "0 0 60px #64dcff",
          margin: 0,
        }}>
          BHAGAVAN
        </h1>
        <p style={{
          fontSize: "1.6rem",
          color: "#64dcff",
          fontWeight: "700",
          marginTop: "1rem",
          letterSpacing: "4px",
        }}>
          FULL-STACK × AI ENGINEER
        </p>
      </div>
    </motion.div>

    {/* Electric Tagline */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      style={{
        margin: "4rem 0",  // Slightly reduced
        padding: "2rem",
        borderTop: "1px solid rgba(100,220,255,0.3)",
        borderBottom: "1px solid rgba(100,220,255,0.3)",
        position: "relative",
      }}
    >
      <motion.p
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          fontSize: "1.8rem",
          fontWeight: "800",
          background: "linear-gradient(90deg, #64dcff, #ff3366, #00ffea, #64dcff)",
          backgroundSize: "300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "3px",
        }}
      >
        I BUILD WHAT'S NEXT.
      </motion.p>
    </motion.div>

    {/* Navigation */}
    <motion.div style={{ margin: "4rem 0", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.8rem" }}>
      {["HOME", "PROJECTS", "SKILLS", "INTERNSHIPS", "CONTACT"].map((item, i) => (
        <motion.a
          key={item}
          href={`#${item.toLowerCase()}`}
          variants={fadeInUp}
          custom={i}
          whileHover={{
            scale: 1.15,
            background: "#64dcff",
            color: "#000",
            boxShadow: "0 0 40px #64dcff",
          }}
          style={{
            padding: "1rem 2.4rem",
            border: "2px solid #64dcff",
            borderRadius: "50px",
            color: "#64dcff",
            fontSize: "1.1rem",
            fontWeight: "800",
            letterSpacing: "2px",
            textDecoration: "none",
            transition: "all 0.4s ease",
          }}
        >
          {item}
        </motion.a>
      ))}
    </motion.div>

    {/* Social Icons – Orbit Ring */}
    <motion.div style={{ margin: "5rem 0" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          width: "280px",
          height: "280px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              border: `2px solid rgba(100,220,255,${0.3 - i * 0.1})`,
              borderRadius: "50%",
            }}
          />
        ))}

        {[
          { icon: "Email", href: "mailto:g.sivasatyasaibhagavan@gmail.com" },
          { icon: "LinkedIn", href: "https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/" },
          { icon: "GitHub", href: "https://github.com/bhagavan444" },
        ].map((social, i) => {
          const angle = (i * 120) - 90;
          const x = 140 + 100 * Math.cos(angle * Math.PI / 180);
          const y = 140 + 100 * Math.sin(angle * Math.PI / 180);
          return (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                width: "70px",
                height: "70px",
                background: "rgba(100,220,255,0.1)",
                border: "2px solid #64dcff",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontSize: "2rem",
                color: "#64dcff",
                boxShadow: "0 0 40px rgba(100,220,255,0.5)",
              }}
              whileHover={{
                scale: 1.3,
                background: "#64dcff",
                color: "#000",
                boxShadow: "0 0 80px #64dcff",
              }}
            >
              {social.icon}
            </motion.a>
          )
        })}
      </motion.div>
    </motion.div>

    {/* Final Line */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 1 }}
      style={{
        fontSize: "1.3rem",
        color: "#64dcff",
        fontWeight: "700",
        letterSpacing: "3px",
        textShadow: "0 0 30px #64dcff",
      }}
    >
      © {new Date().getFullYear()} • CRAFTED WITH PRECISION • ALWAYS BUILDING
    </motion.p>
  </FooterContent>

  {/* Final Neon Line */}
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    transition={{ duration: 2, ease: "easeInOut" }}
    style={{
      height: "4px",
      background: "linear-gradient(90deg, #64dcff, #ff3366, #00ffea, #64dcff)",
      backgroundSize: "300%",
      animation: "flow 6s linear infinite",
      filter: "blur(8px)",
    }}
  />

  <style jsx global>{`
    @keyframes flow {
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
    }
  `}</style>
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