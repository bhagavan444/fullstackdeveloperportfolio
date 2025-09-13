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

// Enhanced Styled Components with refined, professional, and innovative UI
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(145deg, #0a1020, #1a2338, #2e374d);
  font-family: "Inter", sans-serif;
  color: #f1f5f9;
  transition: all 0.4s ease;
  isolation: isolate;
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(10, 16, 32, 0.95);
  backdrop-filter: blur(24px);
  padding: 1.2rem 3rem;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 6px 24px rgba(139, 92, 246, 0.3);
  z-index: 1000;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const NavBrand = styled.a`
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(45deg, #8b5cf6, #d8b4fe, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-shadow: 0 0 12px rgba(139, 92, 246, 0.5);
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.7));
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  margin-right: 50px;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #d4d4d8;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 3px;
    bottom: -8px;
    left: 0;
    background: linear-gradient(90deg, #8b5cf6, #d8b4fe);
    transition: width 0.4s ease;
    border-radius: 3px;
  }

  &:hover:after {
    width: 100%;
  }

  &:hover {
    color: #e9d5ff;
    transform: translateY(-2px);
    filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.6));
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
  padding: 4rem 2rem;
  color: #f1f5f9;
  position: relative;
  background: linear-gradient(145deg, #0a1020, #1a2338, #2e374d);
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.25), transparent 60%),
                radial-gradient(circle at 70% 30%, rgba(216, 180, 254, 0.2), transparent 60%);
    z-index: 0;
    animation: pulse 10s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.15); }
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  z-index: 1;
  max-width: 1300px;
  width: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2.5rem;
    padding: 1.5rem;
  }
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  perspective: 1200px;
`;

const ProfileImage = styled(motion.img)`
  width: 320px;
  height: 320px;
  border-radius: 50%;
  object-fit: cover;
  border: 10px solid rgba(139, 92, 246, 0.4);
  box-shadow: 0 0 50px rgba(139, 92, 246, 0.6), inset 0 0 25px rgba(255, 255, 255, 0.15);
  transition: all 0.5s ease;
  position: relative;
  z-index: 2;

  &:hover {
    box-shadow: 0 0 70px rgba(139, 92, 246, 0.8), inset 0 0 35px rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 768px) {
    width: 240px;
    height: 240px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const ProfileRing = styled(motion.div)`
  position: absolute;
  top: -25px;
  left: -25px;
  width: 360px;
  height: 360px;
  border: 3px dashed rgba(139, 92, 246, 0.4);
  border-radius: 50%;
  z-index: 1;
  animation: spin 25s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
    top: -20px;
    left: -20px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 850px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(45deg, #8b5cf6, #d8b4fe, #a78bfa, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 25px rgba(139, 92, 246, 0.7);
  line-height: 1.2;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.4rem, 7vw, 3rem);
  }
`;

const Subtitle = styled(motion.div)`
  font-size: clamp(1.3rem, 2.8vw, 1.7rem);
  color: #e4e7eb;
  margin: 1.5rem 0;
  line-height: 1.7;
  font-weight: 400;
  text-shadow: 0 0 10px rgba(228, 231, 235, 0.4);
  span {
    color: #8b5cf6;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 2.2vw, 1.4rem);
  }
`;

const CTAButton = styled(motion.a)`
  padding: 1.3rem 3rem;
  border-radius: 60px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  font-size: 1.3rem;
  background: linear-gradient(45deg, #8b5cf6, #d8b4fe, #a78bfa);
  color: #0a1020;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.7s ease, height 0.7s ease;
  }

  &:hover:before {
    width: 350px;
    height: 350px;
  }

  &:hover {
    transform: translateY(-5px) scale(1.06);
    box-shadow: 0 15px 50px rgba(139, 92, 246, 0.7);
    border-color: rgba(139, 92, 246, 0.6);
  }

  @media (max-width: 480px) {
    padding: 1.1rem 2.5rem;
    font-size: 1.2rem;
  }
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.8rem;
  font-size: 2.4rem;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    gap: 1.2rem;
  }
`;

const SocialLink = styled.a`
  color: #e4e7eb;
  transition: all 0.4s ease;
  text-shadow: 0 0 12px rgba(228, 231, 235, 0.4);

  &:hover {
    color: #8b5cf6;
    transform: scale(1.3) rotate(8deg);
    text-shadow: 0 0 30px rgba(139, 92, 246, 0.8);
    filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.6));
  }
`;

const Section = styled.section`
  padding: 7rem 2rem;
  background: linear-gradient(145deg, #0a1020, #1a2338, #2e374d);
  margin: 3.5rem 0;
  border-radius: 28px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.15);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, #8b5cf6, #d8b4fe, #a78bfa, #8b5cf6);
    background-size: 400% 100%;
    animation: gradientShift 5s infinite linear;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 400% 50%; }
  }

  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
    margin: 2.5rem 0;
    border-radius: 20px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(3rem, 5.5vw, 4.2rem);
  font-weight: 900;
  background: linear-gradient(45deg, #8b5cf6, #d8b4fe, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 25px rgba(139, 92, 246, 0.7);
  margin-bottom: 2.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 4px;

  @media (max-width: 480px) {
    font-size: clamp(2.4rem, 4.5vw, 3rem);
    gap: 0.6rem;
  }
`;

const Card = styled(motion.div)`
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  border: 1px solid rgba(139, 92, 246, 0.25);
  transition: all 0.5s ease;
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-height: 320px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #8b5cf6, #d8b4fe);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    min-height: 280px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.2rem 0;

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const Tag = styled(motion.span)`
  padding: 0.6rem 1.4rem;
  background: rgba(139, 92, 246, 0.2);
  color: #e4e7eb;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    background: linear-gradient(45deg, #8b5cf6, #d8b4fe);
    color: #0a1020;
    box-shadow: 0 0 18px rgba(139, 92, 246, 0.7);
    transform: scale(1.06);
  }

  &.concept {
    background: rgba(236, 72, 153, 0.2);
    color: #fce7f3;

    &:hover {
      background: linear-gradient(45deg, #ec4899, #f472b6);
      color: #0a1020;
      box-shadow: 0 0 18px rgba(236, 72, 153, 0.7);
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1.2rem;
    font-size: 0.85rem;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 1.8rem;
  margin-top: auto;

  @media (max-width: 480px) {
    gap: 1.2rem;
    flex-direction: column;
  }
`;

const Link = styled.a`
  color: #d8b4fe;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.4s ease;

  &:hover {
    color: #8b5cf6;
    text-decoration: underline;
    transform: translateX(12px) scale(1.06);
    filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.6));
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeaturedCard = styled(Card)`
  border: 2px solid #8b5cf6;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(255, 255, 255, 0.06));

  &:before {
    content: "Featured 🌟";
    position: absolute;
    top: -14px;
    left: 24px;
    background: linear-gradient(45deg, #8b5cf6, #d8b4fe);
    color: #0a1020;
    padding: 0.4rem 1.2rem;
    border-radius: 24px;
    font-size: 0.95rem;
    font-weight: 700;
    box-shadow: 0 5px 20px rgba(139, 92, 246, 0.5);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 5px;
  overflow: hidden;
  margin: 0.6rem 0;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #d8b4fe);
  border-radius: 5px;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.6);
`;

const ContactSection = styled(Section)`
  background: linear-gradient(145deg, #0a1020, #1a2338, #2e374d);
  color: #f1f5f9;
  padding: 7rem 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
    min-height: 70vh;
  }
`;

const ContactIntro = styled(motion.p)`
  font-size: 1.6rem;
  max-width: 950px;
  margin: 0 auto 2.5rem;
  color: #e4e7eb;
  line-height: 1.7;
  text-shadow: 0 0 12px rgba(228, 231, 235, 0.4);
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Form = styled(motion.form)`
  max-width: 750px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  border: 1px solid rgba(139, 92, 246, 0.25);
  backdrop-filter: blur(18px);
  z-index: 10;

  @media (max-width: 480px) {
    padding: 2rem;
    gap: 1.5rem;
  }
`;

const Input = styled.input`
  padding: 1.3rem;
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  color: #e4e7eb;
  font-size: 1.1rem;
  transition: all 0.4s ease;
  backdrop-filter: blur(12px);

  &:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 18px rgba(139, 92, 246, 0.6);
    transform: scale(1.03);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 480px) {
    padding: 1.1rem;
    font-size: 1rem;
  }
`;

const Textarea = styled.textarea`
  min-height: 180px;
  padding: 1.3rem;
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  color: #e4e7eb;
  font-size: 1.1rem;
  resize: vertical;
  transition: all 0.4s ease;
  backdrop-filter: blur(12px);

  &:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 18px rgba(139, 92, 246, 0.6);
    transform: scale(1.03);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 480px) {
    padding: 1.1rem;
    font-size: 1rem;
    min-height: 140px;
  }
`;

const CharCount = styled.p`
  font-size: 0.95rem;
  color: #e4e7eb;
  text-align: right;
  text-shadow: 0 0 10px rgba(228, 231, 235, 0.4);

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.95rem;
  margin-top: 0.6rem;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(239, 68, 68, 0.4);

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SuccessMessage = styled(motion.p)`
  color: #10b981;
  font-size: 0.95rem;
  margin-top: 0.6rem;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.4);

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1.3rem 3rem;
  border-radius: 60px;
  font-weight: 700;
  background: linear-gradient(45deg, #8b5cf6, #d8b4fe, #a78bfa);
  color: #0a1020;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
  transition: all 0.4s ease;
  align-self: center;
  font-size: 1.2rem;

  &:hover:not(:disabled) {
    transform: translateY(-5px) scale(1.06);
    box-shadow: 0 15px 50px rgba(139, 92, 246, 0.7);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    padding: 1.1rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(180deg, #0a1020, #1a2338, #2e374d);
  color: #e4e7eb;
  padding: 6rem 2rem 4rem;
  text-align: center;
  border-top: 2px solid rgba(139, 92, 246, 0.4);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2), transparent 75%);
    z-index: 0;
    animation: pulse 8s infinite ease-in-out;
  }

  @media (max-width: 480px) {
    padding: 4rem 1.5rem 3rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 1;
`;

const FooterTitle = styled(motion.h3)`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(45deg, #8b5cf6, #d8b4fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1.5px;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.7);

  @media (max-width: 480px) {
    font-size: 2.4rem;
  }
`;

const FooterText = styled(motion.p)`
  font-size: 1.4rem;
  color: #e4e7eb;
  font-weight: 400;
  text-shadow: 0 0 10px rgba(228, 231, 235, 0.4);

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  font-size: 1.3rem;

  @media (max-width: 480px) {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
`;

const FooterLink = styled(motion.a)`
  color: #e4e7eb;
  text-decoration: none;
  transition: all 0.4s ease;
  text-shadow: 0 0 10px rgba(228, 231, 235, 0.4);

  &:hover {
    color: #8b5cf6;
    text-decoration: underline;
    transform: translateY(-3px);
    text-shadow: 0 0 25px rgba(139, 92, 246, 0.7);
  }
`;

const FooterSocials = styled(Socials)`
  margin-top: 1.5rem;
  gap: 1.8rem;
`;

const ScrollTop = styled(motion.button)`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  background: linear-gradient(45deg, #8b5cf6, #d8b4fe);
  color: #0a1020;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
  z-index: 1000;

  &:hover {
    transform: scale(1.15) rotate(180deg);
    box-shadow: 0 15px 50px rgba(139, 92, 246, 0.7);
  }

  @media (max-width: 480px) {
    width: 55px;
    height: 55px;
    font-size: 1.8rem;
    bottom: 2.5rem;
    right: 2.5rem;
  }
`;

const ResumeModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(6px);
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.08);
  padding: 3rem;
  border-radius: 28px;
  position: relative;
  width: 90%;
  max-width: 850px;
  max-height: 90vh;
  text-align: center;
  box-shadow: 0 25px 60px rgba(139, 92, 246, 0.4);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(139, 92, 246, 0.4);
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 2.5rem;
    max-width: 95%;
    max-height: 85vh;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 2.4rem;
  background: none;
  border: none;
  color: #e4e7eb;
  cursor: pointer;
  transition: all 0.4s ease;
  z-index: 10;

  &:hover {
    color: #8b5cf6;
    transform: rotate(90deg) scale(1.3);
    text-shadow: 0 0 18px rgba(139, 92, 246, 0.6);
  }

  @media (max-width: 480px) {
    top: 1.2rem;
    right: 1.2rem;
    font-size: 2rem;
  }
`;

const ModalButton = styled(motion.button)`
  padding: 1.3rem 3rem;
  border-radius: 60px;
  font-weight: 700;
  background: linear-gradient(45deg, #8b5cf6, #d8b4fe);
  color: #0a1020;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  margin: 1rem;
  font-size: 1.2rem;

  &:hover {
    transform: translateY(-5px) scale(1.06);
    box-shadow: 0 15px 50px rgba(139, 92, 246, 0.7);
  }

  @media (max-width: 480px) {
    padding: 1.1rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 1.9;
  color: #e4e7eb;
  text-shadow: 0 0 12px rgba(228, 231, 235, 0.4);
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ParticleBackground = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.35;
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
    const particleCount = 200;

    const symbols = ['{', '}', '[', ']', '(', ')', 'React', 'Node', 'Mongo', 'Express', 'JS', 'API', 'DB'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1.2 - 0.6;
        this.speedY = Math.random() * 1.2 - 0.6;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.color = `hsl(${Math.random() * 60 + 260}, 80%, ${Math.random() * 40 + 40}%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.font = `${this.size * 9}px Inter`;
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
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.22, 0.61, 0.36, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const cardHover = {
  hover: {
    scale: 1.1,
    rotateX: 4,
    rotateY: 4,
    boxShadow: "0 25px 60px rgba(139, 92, 246, 0.6)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  tap: {
    scale: 0.95,
  },
};

const skillCard = {
  hidden: { opacity: 0, scale: 0.6, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.7, 
      ease: "easeOut", 
      type: "spring", 
      stiffness: 140,
      damping: 12 
    },
  },
};

const buttonPulse = {
  hover: {
    scale: 1.12,
    boxShadow: "0 0 25px rgba(139, 92, 246, 0.8)",
    transition: { duration: 0.4 },
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
    }, isDeleting ? 40 : 120);

    return () => clearTimeout(handler);
  }, [currentIndex, isDeleting, text]);

  return (
    <Subtitle>
      {displayText}
      <span style={{ color: '#8b5cf6', animation: 'blink 0.8s infinite' }}>|</span>
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
  const rotateX = useTransform(y, [-100, 100], [-25, 25]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

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
        <NavBrand href="#home">Bhagavan <FaStar style={{ fontSize: '1rem', marginLeft: '0.2rem' }} /></NavBrand>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
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
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
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
            <Title variants={fadeInUp}>Siva Satya Sai Bhagavan</Title>
            <TypingSubtitle text="Full-Stack Developer | AI & Data Science Enthusiast | Crafting scalable MERN solutions with Python, Java, and Cloud tech for MNCs." />
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
            <h3 style={{ fontSize: "1.8rem", color: "#e4e7eb", textShadow: "0 0 12px rgba(228, 231, 235, 0.5)" }}>
              Ramachandra College of Engineering, Eluru (JNTUK)
            </h3>
            <p style={{ fontSize: "1.3rem", color: "#d8b4fe" }}>
              B.Tech in Artificial Intelligence and Data Science
            </p>
            <p style={{ fontSize: "1.3rem", color: "#d8b4fe" }}>
              2022 – 2026
            </p>
            <p style={{ fontSize: "1.3rem", color: "#e4e7eb", lineHeight: "1.5" }}>
              Current Aggregate: 70% | Focus: MERN & AI Integration
            </p>
            <Tags>
              <Tag whileHover={{ scale: 1.1 }}>AI & Data Science</Tag>
              <Tag whileHover={{ scale: 1.1 }}>JNTUK</Tag>
              <Tag whileHover={{ scale: 1.1 }} className="concept">MERN Specialization</Tag>
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
              title: "Resume Builder Web App",
              desc: "Full-stack ATS-optimized resume builder with real-time PDF/Word export, AI scoring, and user auth using MERN stack. Deployed on Vercel with MongoDB Atlas.",
              tags: ["MERN", "OAuth2", "MongoDB", "PDF Generation"],
              link: "https://github.com/bhagavan444/resumebuilder",
              demo: "https://drive.google.com/file/d/1Ml9hSjYsHldIIDQQtHvr0gpIn1RTvBhk/view",
              featured: true,
              impact: "Reduced resume creation time by 70% for 500+ users",
            },
            {
              title: "AI Chatbot Dashboard",
              desc: "Interactive MERN-based chatbot with OpenAI integration, conversation history, and analytics dashboard for enterprise use.",
              tags: ["React", "Node.js", "OpenAI API", "Socket.io"],
              link: "https://github.com/bhagavan444/ai-chatbot",
              demo: "https://drive.google.com/file/d/1pOfpAUaFigPo9w-YB7s4MuIEE3-bdTr0/view",
              featured: true,
              impact: "Handled 10k+ queries with 95% accuracy",
            },
            {
              title: "Career Path Recommendation Engine",
              desc: "MERN full-stack app with ML backend for personalized career suggestions based on skills and market trends. Integrated with LinkedIn API.",
              tags: ["MERN", "Python ML", "Streamlit", "Recommendation Systems"],
              link: "https://github.com/bhagavan444/carrerrecomendation",
              demo: "https://drive.google.com/file/d/1cHQUdThz6tm7uvds_g2OfMcg3j9wHuRS/view",
              featured: true,
              impact: "Achieved 85% match rate in beta testing",
            },
            {
              title: "Heart Disease Prediction Platform",
              desc: "Scalable Flask-MERN hybrid app with DL models for predictive healthcare analytics, deployed on AWS with real-time dashboards.",
              tags: ["MERN Hybrid", "TensorFlow", "Flask", "AWS"],
              link: "https://github.com/bhagavan444/heart-disease-predictor",
              demo: "https://drive.google.com/file/d/1UYQasrq1EMuDOcBZiAHF19JyR6F5T7g4/view",
              impact: "Improved prediction accuracy to 92%",
            },
            {
              title: "Fake News Detector",
              desc: "Full-stack NLP app using MERN frontend and Python backend for real-time news classification, with admin panel for model updates.",
              tags: ["MERN", "NLP", "BERT", "Flask"],
              link: "https://github.com/bhagavan444/fake-news-detector",
              demo: "https://drive.google.com/file/d/1sBIB10_UrncsuAhfs3ekjSJbE58LxUQO/view?usp=sharing",
              impact: "Detected 88% of fake articles in live tests",
            },
            {
              title: "Dynamic Portfolio Site",
              desc: "This very site! Built with React, Framer Motion, and Styled Components for seamless animations and responsive design.",
              tags: ["React", "Framer Motion", "Styled Components", "Vite"],
              link: "https://github.com/bhagavan444/portfolio",
              demo: "https://bhagavan.netlify.app",
              impact: "Optimized for 60fps animations and SEO",
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
              >
                <h3 style={{ fontSize: "1.7rem", color: "#e4e7eb", textShadow: "0 0 12px rgba(228, 231, 235, 0.5)" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "1.1rem", color: "#e4e7eb", lineHeight: "1.6" }}>
                  {project.desc}
                </p>
                {project.impact && (
                  <p style={{ fontSize: "1rem", color: "#8b5cf6", fontWeight: "600" }}>
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
                { name: "JavaScript", level: 95 },
                { name: "Python", level: 90 },
                { name: "Java", level: 85 },
                { name: "TypeScript", level: 80 },
                { name: "SQL", level: 85 },
              ] 
            },
            { 
              icon: <FaLaptopCode />, 
              title: "MERN Stack", 
              skills: [
                { name: "React.js", level: 95 },
                { name: "Node.js", level: 90 },
                { name: "Express.js", level: 85 },
                { name: "MongoDB", level: 90 },
                { name: "Next.js", level: 80 },
              ] 
            },
            { 
              icon: <FaBrain />, 
              title: "ML/AI", 
              skills: [
                { name: "TensorFlow", level: 85 },
                { name: "PyTorch", level: 80 },
                { name: "Scikit-learn", level: 85 },
                { name: "Hugging Face", level: 75 },
              ] 
            },
            { 
              icon: <FaCloud />, 
              title: "Cloud & DevOps", 
              skills: [
                { name: "AWS", level: 85 },
                { name: "Docker", level: 80 },
                { name: "Kubernetes", level: 70 },
                { name: "CI/CD", level: 75 },
              ] 
            },
            { 
              icon: <FaDatabase />, 
              title: "Databases & Tools", 
              skills: [
                { name: "MongoDB", level: 90 },
                { name: "PostgreSQL", level: 80 },
                { name: "Git", level: 95 },
                { name: "Postman", level: 90 },
              ] 
            },
            { 
              icon: <FaUsers />, 
              title: "Soft Skills", 
              skills: [
                { name: "Problem-Solving", level: 95 },
                { name: "Team Collaboration", level: 90 },
                { name: "Agile Methodology", level: 85 },
                { name: "Communication", level: 90 },
              ] 
            },
          ].map((category, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isSkillsInView ? "visible" : "hidden"}
              variants={skillCard}
              whileHover="hover"
            >
              <h3 style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.8rem", color: "#e4e7eb", textShadow: "0 0 12px rgba(228, 231, 235, 0.5)" }}>
                {category.icon} {category.title}
              </h3>
              {category.skills.map((skill, j) => (
                <div key={j} style={{ marginBottom: "0.8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.95rem", color: "#d8b4fe" }}>{skill.name}</span>
                    <span style={{ fontSize: "0.85rem", color: "#8b5cf6" }}>{skill.level}%</span>
                  </div>
                  <ProgressBar>
                    <ProgressFill
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.7, delay: j * 0.3 }}
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
              <h3 style={{ fontSize: "1.7rem", color: "#e4e7eb", textShadow: "0 0 12px rgba(228, 231, 235, 0.5)" }}>
                {intern.title} – {intern.company}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#d8b4fe" }}>
                {intern.duration}
              </p>
              <p style={{ fontSize: "1.2rem", color: "#e4e7eb", lineHeight: "1.6" }}>
                {intern.desc}
              </p>
              {intern.impact && (
                <p style={{ fontSize: "1rem", color: "#8b5cf6", fontWeight: "600" }}>
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
          <p style={{ color: "#e4e7eb", fontSize: "1.7rem", marginBottom: "1.5rem", textAlign: "center", lineHeight: "1.6" }}>
            Validated expertise in MERN, cloud, AI/ML, and DevOps—tailored for MNC roles with hands-on project proofs.
          </p>
          <Grid>
            {[
              {
                title: "Java",
                concepts: ["OOP", "Data Structures", "Concurrency", "Java APIs"],
                certLink: "https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link",
              },
              {
                title: "C for Everyone – Coursera",
                concepts: ["C Syntax, Pointers, Memory Management, Data Structures, File I/O"],
                certLink: "https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link",
              },
              {
                title: "Python",
                concepts: ["Scripting", "Data Analysis", "OOP", "File Handling"],
                certLink: "https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link",
              },
              {
                title: "React",
                concepts: ["Component-Based Architecture", "State Management", "Hooks", "React Router"],
                certLink: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link",
              },
              {
                title: "AWS Certified",
                concepts: ["EC2, S3, Lambda, CloudFormation, VPC"],
                certLink: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link",
              },
              {
                title: "R Programming",
                concepts: ["R Syntax, Data Visualization, Statistical Analysis, Data Frames, Packages"],
                certLink: "https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing",
              },
              {
                title: "Django",
                concepts: ["MVC Architecture", "ORM", "Authentication", "API Development"],
                certLink: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
              },
              {
                title: "ServiceNow",
                concepts: ["ITSM", "Workflow Automation", "Service Management", "Scripting"],
                certLink: "https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view",
              },
              {
                title: "ML Using Python",
                concepts: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
                certLink: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
              },
              {
                title: "AWS",
                concepts: ["Cloud Computing", "IaaS", "PaaS", "Serverless Architecture"],
                certLink: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
              },
              {
                title: "Mastering the Art of Programming - IBM Skills",
                concepts: ["Algorithm Design, Problem Solving, Code Optimization, Debugging, Best Practices"],
                certLink: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing",
              },
              {
                title: "Software Engineering",
                concepts: ["SDLC, Agile, Design Patterns, Testing, UML"],
                certLink: "https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing",
              },
              {
                title: "Continuous Integration and Continuous Delivery",
                concepts: ["CI/CD Pipelines, Jenkins, Git, Docker, Automation"],
                certLink: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing",
              },
              {
                title: "Large Language Models",
                concepts: ["LLMs, Transformers, Fine-Tuning, NLP, Prompt Engineering"],
                certLink: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing",
              },
              {
                title: "Chatbot Development",
                concepts: ["NLP", "Dialog Management", "API Integration", "Conversational AI"],
                certLink: "https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing",
              },
              {
                title: "HTML ",
                concepts: ["HTML5, Semantic Tags, Forms, Accessibility, DOM Structure"],
                certLink: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link",
              },
              {
                title: "CSS",
                concepts: ["CSS3, Flexbox, Grid, Animations, Responsive Design"],
                certLink: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link",
              },
              {
                title: "Mastering Python",
                concepts: ["Advanced Python, Decorators, Generators, Modules, Concurrency"],
                certLink: "https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link",
              },
              {
                title: "MLOps",
                concepts: ["Model Deployment, CI/CD for ML, Monitoring, Data Pipelines, Scalability"],
                certLink: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link",
              },
              {
                title: "JavaScript",
                concepts: ["JavaScript ES6, DOM Manipulation, Async Programming, Events, APIs"],
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
                    color: "#e4e7eb",
                    textShadow: "0 0 12px rgba(228, 231, 235, 0.5)",
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
              tags: ["Python", "Machine Learning", "Data Science", "MERN Integration"],
              year: "2024",
              impact: "Applied concepts to build 3+ production-ready models",
            },
            {
              title: "Deep Learning with TensorFlow",
              desc: "In-depth exploration of deep learning concepts, neural network architectures, and practical implementations using TensorFlow and Keras, with MERN frontend demos.",
              tags: ["TensorFlow", "Keras", "Deep Learning", "MERN"],
              year: "2025",
              impact: "Developed CNN models with 95% accuracy",
            },
            {
              title: "Mobile App Development",
              desc: "Workshop on building responsive and feature-rich mobile applications using modern frameworks like React Native, bridged with MERN backend.",
              tags: ["Mobile Development", "React Native", "Frontend", "MERN Bridge"],
              year: "2023",
              impact: "Prototyped 2 cross-platform apps",
            },
            {
              title: "Full-Stack Web Development",
              desc: "End-to-end web development training covering frontend (React), backend (Node.js, Express), and database integration (MongoDB) using the MERN stack.",
              tags: ["Full Stack", "MERN", "Web Development", "Deployment"],
              year: "2022",
              impact: "Deployed 5+ full-stack projects to production",
            },
            {
              title: "Artificial Intelligence & Data Science Workshop",
              desc: "Hands-on workshop covering fundamentals of AI, Machine Learning, and Data Science, including practical applications and projects with MERN UIs.",
              tags: ["AI", "Data Science", "Workshop", "MERN UI"],
              year: "2022",
              impact: "Collaborated on AI-driven MERN app",
            },
            
            {
              title: "Web Development Workshop",
              desc: "Hands-on workshop covering frontend development with HTML, CSS, and JavaScript, including practical projects and real-world applications leading to MERN.",
              tags: ["Web Development", "Frontend", "JavaScript", "MERN Foundation"],
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
              <h3 style={{ fontSize: "1.6rem", color: "#e2e8f0", textShadow: "0 0 10px rgba(226, 232, 240, 0.4)" }}>
                {workshop.title}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "#d8b4fe" }}>
                {workshop.year}
              </p>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.6" }}>
                {workshop.desc}
              </p>
              {workshop.impact && (
                <p style={{ fontSize: "1rem", color: "#a855f7", fontWeight: "600" }}>
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
                color: "#e2e8f0",
                textShadow: "0 0 10px rgba(226, 232, 240, 0.4)",
              }}
            >
              24-Hour Hackathon – Brainovision, RCE Eluru
            </h3>
            <p style={{ fontSize: "1.3rem", color: "#d8b4fe" }}>2025</p>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#e2e8f0",
                lineHeight: "1.6",
              }}
            >
              Developed a full-stack web platform for buying and selling second-hand electronics using MERN stack, implementing user authentication, product listing, and real-time transactions within 24 hours.
            </p>
            <p style={{ fontSize: "1rem", color: "#a855f7", fontWeight: "600" }}>
              <FaChartLine /> Impact: Won 2nd place; deployed live app with 100+ users
            </p>
            <Tags>
              <Tag whileHover={{ scale: 1.1 }}>Hackathon</Tag>
              <Tag whileHover={{ scale: 1.1 }}>Full Stack</Tag>
              <Tag whileHover={{ scale: 1.1 }}>E-Commerce</Tag>
              <Tag whileHover={{ scale: 1.1 }}>React</Tag>
              <Tag whileHover={{ scale: 1.1 }}>Node.js</Tag>
              <Tag whileHover={{ scale: 1.1 }}>MongoDB</Tag>
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
              desc: "Consistent practice on data structures and algorithms through daily coding challenges, focusing on MERN-related problem-solving.",
              tags: ["LeetCode", "DSA", "Problem-Solving", "MERN Optimization"],
              link: "https://leetcode.com/u/AxZsDhEeto/",
              impact: "Solved 300+ problems, improved time complexity in MERN apps",
            },
            {
              title: "HackerRank Challenges",
              desc: "Solving algorithmic problems to improve coding skills and prepare for interviews, applied to full-stack scenarios.",
              tags: ["HackerRank", "Algorithms", "Coding", "Full-Stack Prep"],
              link: "https://www.hackerrank.com/profile/g_sivasatyasaib1",
              impact: "Top 20% ranking; optimized 5+ MERN algorithms",
            },
            {
              title: "CodeChef Contests",
              desc: "Participating in competitive programming contests to enhance problem-solving abilities, with MERN deployment focus.",
              tags: ["CodeChef", "Competitive Programming", "Contests", "MERN Deployment"],
              link: "https://www.codechef.com/users/bhagavan444",
              impact: "Participated in 20+ contests; built contest MERN tools",
            },
          ].map((platform, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isCodingInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 style={{ fontSize: "1.5rem", color: "#e2e8f0", textShadow: "0 0 10px rgba(226, 232, 240, 0.4)" }}>
                {platform.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.6" }}>
                {platform.desc}
              </p>
              {platform.impact && (
                <p style={{ fontSize: "1rem", color: "#a855f7", fontWeight: "600" }}>
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
              desc: "Tackling daily problems on platforms like LeetCode to sharpen MERN development skills.",
              tags: ["Coding", "Challenges", "MERN Practice"],
              impact: "Daily commits to MERN repos",
            },
            {
              title: "Technical Blogging",
              desc: "Writing about AI, development, and tech trends on Medium, focusing on MERN tutorials.",
              tags: ["Blogging", "Technical Writing", "MERN Tutorials"],
              impact: "Published 10+ articles with 1k+ views",
            },
            {
              title: "Exploring AI-Driven Apps",
              desc: "Experimenting with new AI tools and integrating them into MERN stacks.",
              tags: ["AI", "Exploration", "MERN AI"],
              impact: "Prototyped 5+ AI-MERN hybrids",
            },
          ].map((hobby, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isHobbiesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 style={{ fontSize: "1.5rem", color: "#e2e8f0", textShadow: "0 0 10px rgba(226, 232, 240, 0.4)" }}>
                {hobby.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.6" }}>
                {hobby.desc}
              </p>
              {hobby.impact && (
                <p style={{ fontSize: "1rem", color: "#a855f7", fontWeight: "600" }}>
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
              title: "Hackathons & Tech Events",
              desc: "Participating in competitive coding events and team collaborations, leading MERN teams to victory.",
              tags: ["Hackathons", "Teamwork", "MERN Leadership"],
              impact: "Led 3 teams to top 3 placements",
            },
            {
              title: "Project Leadership",
              desc: "Leading development teams in building innovative MERN projects for college and community.",
              tags: ["Leadership", "Projects", "MERN Teams"],
              impact: "Mentored 20+ developers on MERN stacks",
            },
          ].map((activity, i) => (
            <Card
              key={i}
              initial="hidden"
              animate={isExtracurricularInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 style={{ fontSize: "1.5rem", color: "#e2e8f0", textShadow: "0 0 10px rgba(226, 232, 240, 0.4)" }}>
                {activity.title}
              </h3>
              <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.6" }}>
                {activity.desc}
              </p>
              {activity.impact && (
                <p style={{ fontSize: "1rem", color: "#a855f7", fontWeight: "600" }}>
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
            <h3 style={{ fontSize: "1.6rem", color: "#e2e8f0", textShadow: "0 0 10px rgba(226, 232, 240, 0.4)" }}>
              My Professional Resume
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: "1.6" }}>
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