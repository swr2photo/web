"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from './ComingSoon.module.css';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simplified loading progress
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

  // Optimized Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01';
    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    
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
    
    const matrixInterval = setInterval(draw, 100); // Reduced animation speed
    
    return () => {
      clearInterval(matrixInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const binaryText = "LOADING ENCRYPTION SEQUENCE";

  return (
    <div className={styles.container}>
      {/* Matrix Rain Canvas */}
      <canvas 
        ref={canvasRef} 
        className={styles.matrixCanvas}
      />

      {/* Simplified background effects */}
      <div className={styles.pixelGrid}></div>
      <div className={styles.scanlineEffect}></div>
      <div className={styles.vignetteEffect}></div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={`${styles.logoWrapper} ${glitchActive ? styles.glitchActive : ''}`}>
            <Image
              src="/images/PSU-SCC-LOGO 2.svg"
              alt="Camp Logo"
              width={150}
              height={150}
              className={styles.logo}
              priority // Add priority for logo loading
            />
          </div>
        </div>

        {/* Countdown Timer */}
        <div className={styles.countdownContainer}>
          <p className={styles.countdownTitle}>LAUNCHING IN</p>
          
          <div className={styles.countdownBoxes}>
            {[
              { value: countdown.days, label: "DAYS" },
              { value: countdown.hours, label: "HOURS" },
              { value: countdown.minutes, label: "MINS" },
              { value: countdown.seconds, label: "SECS" },
            ].map((item, index) => (
              <div key={index} className={styles.countdownBox}>
                <div className={styles.countdownValue}>
                  <p className={styles.countdownNumber}>
                    {String(item.value).padStart(2, '0')}
                  </p>
                </div>
                <p className={styles.countdownLabel}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Text */}
        <div className={`${styles.comingSoonContainer} ${glitchActive ? styles.glitch : ''}`}>
          <h1 className={`${styles.comingSoonText} ${glitchActive ? styles.glitchText : ''}`}>
            COMING SOON
          </h1>
        </div>

        {/* Loading Bar */}
        <div className={`${styles.loadingBarContainer} ${glitchActive ? styles.glitchError : ''}`}>
          <div 
            className={`${styles.loadingBarProgress} ${glitchActive ? styles.errorBar : ''}`}
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>

        {/* Loading Status */}
        <p className={`${styles.loadingStatus} ${glitchActive ? styles.errorText : ''}`}>
          {glitchActive ? "ERR0R: SYSTEM FAILURE - RETRY LATER" : `LOADING DATA... ${loadingProgress}%`}
        </p>

        {/* Simplified footer */}
        <div className={styles.cyberpunkFooter}>
          <div className={styles.statusBoxes}>
            {["SERVER", "DATA", "ACCESS"].map((text, index) => (
              <div key={index} className={styles.statusBox}>
                <p className={styles.statusText}>{text}</p>
                <div className={`${styles.statusLight} ${styles['light' + index]}`}></div>
              </div>
            ))}
          </div>
          
          <p className={styles.copyrightText}>
            © 2025 PSU SCICAMP // SYSTEM VERSION 2.5.7
          </p>
        </div>
      </div>
    </div>
  );
}