"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from './ComingSoon.module.css';

// กำหนด interface สำหรับ particle
interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

// กำหนด interface สำหรับ countdown
interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoon() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [particles, setParticles] = useState<Particle[]>([]); // กำหนดประเภทเป็น Particle[]
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random particles
  useEffect(() => {
    const newParticles: Particle[] = []; // กำหนดประเภทเป็น Particle[]
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    setParticles(newParticles);
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 87) {
          clearInterval(interval);
          setGlitchActive(true);
          return 87;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Set countdown to a future date
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    const binary = '01';
    const nums = '0123456789';
    const chars = binary + nums;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const drops: number[] = [];
    for(let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }
    
    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0fa';
      ctx.font = fontSize + 'px monospace';
      
      for(let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const matrixInterval = setInterval(draw, 65);
    
    return () => {
      clearInterval(matrixInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const binaryText =
    "01001100 01001111 01000001 01000100 01001001 01001110 01000111 00100000 01000101 01001110 01000011 01010010 01011001 01010000 01010100 01001001 01001111 01001110 00100000 01010011 01000101 01010001 01010101 01000101 01001110 01000011 01000101";

  return (
    <div className={styles.container}>
      {/* Matrix Rain Canvas */}
      <canvas 
        ref={canvasRef} 
        className={styles.matrixCanvas}
      />

      {/* Pixel Grid Background */}
      <div className={styles.pixelGrid}></div>

      {/* Scanline effect */}
      <div className={styles.scanlineEffect}></div>

      {/* Vignette effect */}
      <div className={styles.vignetteEffect}></div>

      {/* Floating particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className={styles.particle}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${5 + (particle.speed * 10)}s`,
            animationDelay: `${-Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <div className={`${styles.glowingOrb} ${styles.orb1}`}></div>
      <div className={`${styles.glowingOrb} ${styles.orb2}`}></div>
      <div className={`${styles.glowingOrb} ${styles.orb3}`}></div>

      {/* Animated flicker overlay */}
      <div className={styles.flickerOverlay}></div>

      {/* Rotating hexagonal grid in the background */}
      <div className={styles.hexGrid}></div>

      <div className={styles.content}>
        {/* Logo with enhanced effects */}
        <div className={styles.logoContainer}>
          <div className={`${styles.logoWrapper} ${glitchActive ? styles.glitchActive : ''}`}>
            <Image
              src="/images/PSU-SCC-LOGO 2.svg"
              alt="Camp Logo"
              width={180}
              height={180}
              className={styles.logo}
            />
            
            {/* Overlay rays */}
            <div className={styles.overlayRays}></div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className={styles.countdownContainer}>
          {/* Animated light streak */}
          <div className={styles.lightStreak}></div>
          
          <p className={styles.countdownTitle}>* * LAUNCHING IN * *</p>
          
          <div className={styles.countdownBoxes}>
            {[
              { value: countdown.days, label: "DAYS" },
              { value: countdown.hours, label: "HOURS" },
              { value: countdown.minutes, label: "MINS" },
              { value: countdown.seconds, label: "SECS" },
            ].map((item, index) => (
              <div key={index} className={styles.countdownBox}>
                <div className={styles.countdownValue}>
                  <p className={`${styles.countdownNumber} ${styles['blink' + index]}`}>
                    {String(item.value).padStart(2, '0')}
                  </p>
                </div>
                <p className={styles.countdownLabel}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon - Enhanced with more dramatic effects */}
        <div className={`${styles.comingSoonContainer} ${glitchActive ? styles.glitch : ''}`}>
          <h1 className={`${styles.comingSoonText} ${glitchActive ? styles.glitchText : ''}`}>
            COMING SOON
          </h1>
          
          {/* Additional decorative elements */}
          {!glitchActive && (
            <>
              <div className={styles.horizontalLine}></div>
              <div className={styles.radialGlow}></div>
            </>
          )}
        </div>

        {/* Loading Bar - Enhanced with more dramatic effects */}
        <div className={`${styles.loadingBarContainer} ${glitchActive ? styles.glitchError : ''}`}>
          <div 
            className={`${styles.loadingBarProgress} ${glitchActive ? styles.errorBar : ''}`}
            style={{ width: `${loadingProgress}%` }}
          ></div>
          
          {/* Animated light streak on the progress bar */}
          <div className={styles.loadingBarShine}></div>
        </div>

        {/* Loading Status */}
        <p className={`${styles.loadingStatus} ${glitchActive ? styles.errorText : ''}`}>
          {glitchActive ? "ERR0R: SYSTEM FAILURE - RETRY LATER" : `LOADING DATA... ${loadingProgress}%`}
        </p>

        {/* Encryption Text */}
        <div className={styles.encryptionContainer}>
          {/* Additional decorative elements */}
          <div className={styles.scanlines}></div>
          
          <p className={styles.encryptionText}>
            {binaryText}
          </p>
        </div>

        {/* Additional Cyberpunk Footer */}
        <div className={styles.cyberpunkFooter}>
          <div className={styles.statusBoxes}>
            {["SERVER", "DATA", "ACCESS"].map((text, index) => (
              <div key={index} className={styles.statusBox}>
                <p className={styles.statusText}>{text}</p>
                {/* Blinking indicator light */}
                <div className={`${styles.statusLight} ${styles['light' + index]}`}></div>
              </div>
            ))}
          </div>
          
          {/* Decorative circuit lines */}
          <div className={styles.circuitLines}>
            <div className={styles.horizontalCircuitLine}></div>
            <div className={`${styles.verticalCircuitLine} ${styles.left}`}></div>
            <div className={`${styles.verticalCircuitLine} ${styles.center}`}></div>
            <div className={`${styles.verticalCircuitLine} ${styles.right}`}></div>
            <div className={`${styles.circuitNode} ${styles.leftNode}`}></div>
            <div className={`${styles.circuitNode} ${styles.centerNode}`}></div>
            <div className={`${styles.circuitNode} ${styles.rightNode}`}></div>
          </div>
          
          {/* Copyright info */}
          <p className={styles.copyrightText}>
            © 2025 PSU SCICAMP // SYSTEM VERSION 2.5.7
          </p>
        </div>
      </div>
    </div>
  );
}