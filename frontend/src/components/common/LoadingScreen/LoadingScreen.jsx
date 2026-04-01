import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const BOOT_MESSAGES = [
  "Initializing Neural Subsystems...",
  "Calibrating Visual Processing Hub...",
  "Syncing Aura Interface...",
  "Optimizing Gradient Manifolds...",
  "Authenticating Tensor Cores...",
  "Hydrating Component Architecture...",
  "Readying Cinematic Engine...",
  "Forging Digital Assets..."
];

const LoadingScreen = ({ message }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % BOOT_MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = Math.random() * (prev > 80 ? 2 : 10);
        return Math.min(100, prev + increment);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const displayMessage = message || BOOT_MESSAGES[currentMessageIndex];

  return (
    <div className="loading-screen-aura">
      {/* Background Cinematic Orbs */}
      <div className="aura-bg-container">
        <div className="aura-orb orb-1"></div>
        <div className="aura-orb orb-2"></div>
        <div className="aura-orb orb-3"></div>
      </div>

      {/* Cybernetic Grid Overlay */}
      <div className="aura-grid-overlay"></div>

      {/* Scanning Line Effect */}
      <motion.div 
        className="aura-scanner"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="loading-content">
        <div className="aura-spinner-wrapper">
          {/* SVG Neural Spinner */}
          <div className="aura-svg-spinner">
            <svg viewBox="0 0 100 100" className="spinner-svg">
              <defs>
                <linearGradient id="aura-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--accent-secondary)', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <motion.circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="url(#aura-grad)" 
                strokeWidth="3"
                strokeDasharray="283"
                animate={{ strokeDashoffset: [283, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle 
                cx="50" cy="50" r="35" 
                fill="none" 
                stroke="var(--accent-secondary)" 
                strokeWidth="1" 
                strokeDasharray="20 10"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <div className="aura-percentage-display">
              {Math.round(progress)}<span>%</span>
            </div>
          </div>
        </div>

        <div className="loading-text-container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="brand-badge-loading"
          >
            AURA V2.4
          </motion.div>
          
          <h2 className="loading-title">CORE INTERFACE</h2>
          
          <div className="message-wrapper-aura">
            <AnimatePresence mode="wait">
              <motion.p 
                key={displayMessage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="loading-subtitle-enhanced"
              >
                {displayMessage}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="loading-bar-enhanced-outer">
            <motion.div 
               className="loading-bar-enhanced-inner"
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ type: "spring", stiffness: 50 }}
            />
            <div className="loading-bar-shimmer"></div>
          </div>

          <div className="system-status-indicator">
            <span className="dot pulse"></span>
            ALL SYSTEMS NOMINAL
          </div>
        </div>
      </div>

      <div className="aura-loading-bottom-bar">
        <span>ENCRYPTED_LINK_ACTIVE</span>
        <span className="version-id">BUILD_ID: 8BC-091</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
