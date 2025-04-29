'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Box, 
  Container, 
  Typography, 
  Link,
  IconButton,
  ThemeProvider,
  createTheme
} from '@mui/material';

// สร้างธีมโทนสีน้ำเงินเข้มและฟ้า
const blueTheme = createTheme({
  typography: {
    fontFamily: '"Noto Sans Thai Looped", "Roboto", sans-serif',
    fontWeightRegular: 600,
    fontWeightBold: 800,
  },
});

// ไอคอนพิกเซลละเอียด Facebook
const PixelFacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="1" width="6" height="1" fill="white" />
    <rect x="6" y="2" width="8" height="1" fill="white" />
    <rect x="6" y="3" width="1" height="16" fill="white" />
    <rect x="7" y="3" width="1" height="1" fill="white" />
    <rect x="7" y="9" width="6" height="1" fill="white" />
    <rect x="7" y="10" width="6" height="1" fill="white" />
    <rect x="13" y="3" width="1" height="16" fill="white" />
    <rect x="7" y="4" width="6" height="1" fill="white" />
  </svg>
);

// ไอคอนพิกเซลละเอียด Instagram
const PixelInstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="12" height="1" fill="white" />
    <rect x="4" y="5" width="1" height="10" fill="white" />
    <rect x="5" y="15" width="10" height="1" fill="white" />
    <rect x="15" y="5" width="1" height="10" fill="white" />
    <rect x="8" y="8" width="4" height="1" fill="white" />
    <rect x="8" y="9" width="1" height="2" fill="white" />
    <rect x="9" y="11" width="2" height="1" fill="white" />
    <rect x="11" y="9" width="1" height="2" fill="white" />
    <rect x="14" y="6" width="1" height="1" fill="white" />
  </svg>
);

// ไอคอนพิกเซลละเอียด Email
const PixelEmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="16" height="1" fill="white" />
    <rect x="2" y="6" width="1" height="8" fill="white" />
    <rect x="3" y="14" width="14" height="1" fill="white" />
    <rect x="17" y="6" width="1" height="8" fill="white" />
    <rect x="3" y="6" width="1" height="1" fill="white" />
    <rect x="4" y="7" width="1" height="1" fill="white" />
    <rect x="5" y="8" width="1" height="1" fill="white" />
    <rect x="6" y="9" width="1" height="1" fill="white" />
    <rect x="7" y="10" width="1" height="1" fill="white" />
    <rect x="8" y="11" width="1" height="1" fill="white" />
    <rect x="9" y="10" width="1" height="1" fill="white" />
    <rect x="10" y="9" width="1" height="1" fill="white" />
    <rect x="11" y="8" width="1" height="1" fill="white" />
    <rect x="12" y="7" width="1" height="1" fill="white" />
    <rect x="13" y="6" width="1" height="1" fill="white" />
    <rect x="14" y="7" width="1" height="1" fill="white" />
    <rect x="15" y="8" width="1" height="1" fill="white" />
    <rect x="16" y="6" width="1" height="1" fill="white" />
  </svg>
);

// Footer component
const Footer = () => {
  return (
    <ThemeProvider theme={blueTheme}>
      <Box
        component="footer"
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #0f172a, #1e3a8a, #0369a1, #0ea5e9)',
          backgroundSize: '300% 300%',
          animation: 'gradientAnimation 15s ease infinite',
          borderTop: '1px solid rgba(56, 189, 248, 0.4)',
          padding: { xs: '1.25rem 1rem', sm: '1.5rem' },
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box', // Ensure padding is included in width calculation
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #38bdf8, #7dd3fc, #38bdf8)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite linear',
          },
        }}
      >
        {/* Global styles defined once */}
        <style jsx global>{`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }

          html, body {
            overflow-x: hidden; /* Prevent horizontal scrolling */
          }
        `}</style>
        
        <Container 
          maxWidth="lg" 
          sx={{ 
            px: { xs: 1, sm: 2 },  // Reduce padding on small screens
            mx: 'auto'             // Center the container
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'center' },
              gap: { xs: '1.25rem', sm: '0' },
              width: '100%'
            }}
          >
            {/* Left side: Social icons */}
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.5rem',
                alignItems: { xs: 'center', sm: 'flex-start' }
              }}
            >
              {/* Social icons */}
              <Box 
                sx={{
                  display: 'flex',
                  gap: '0.75rem',
                  mb: '0.5rem'
                }}
              >
                {/* Facebook */}
                <IconButton 
                  aria-label="Facebook" 
                  href="https://facebook.com/yourpage"
                  target="_blank"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '6px',
                    boxShadow: '0 0 8px rgba(0, 127, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(56, 189, 248, 0.3)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 5px 15px rgba(0, 127, 255, 0.3)',
                    }
                  }}
                >
                  <PixelFacebookIcon />
                </IconButton>
                
                {/* Instagram */}
                <IconButton 
                  aria-label="Instagram"
                  href="https://instagram.com/yourpage"
                  target="_blank"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '6px',
                    boxShadow: '0 0 8px rgba(0, 127, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(56, 189, 248, 0.3)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 5px 15px rgba(0, 127, 255, 0.3)',
                    }
                  }}
                >
                  <PixelInstagramIcon />
                </IconButton>
                
                {/* Email */}
                <IconButton 
                  aria-label="Email"
                  href="mailto:contact@techcamp.com"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '6px',
                    boxShadow: '0 0 8px rgba(0, 127, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(56, 189, 248, 0.3)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 5px 15px rgba(0, 127, 255, 0.3)',
                    }
                  }}
                >
                  <PixelEmailIcon />
                </IconButton>
              </Box>
              
              {/* Privacy Policy */}
              <Link 
                href="/privacy" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  position: 'relative',
                  fontFamily: '"Noto Sans Thai Looped", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    color: '#ffffff',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: '-3px',
                    left: '0',
                    backgroundColor: '#7dd3fc',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '100%',
                  }
                }}
              >
                นโยบายความเป็นส่วนตัว
              </Link>
            </Box>
            
            {/* Right side: Logo and copyright */}
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              {/* Copyright text */}
              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', sm: 'flex-end' },
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '0.75rem',
                  textShadow: '0 0 10px rgba(0, 127, 255, 0.3)'
                }}
              >
                <Typography 
                  variant="body2" 
                  component="div" 
                  sx={{ 
                    fontFamily: '"Noto Sans Thai Looped", sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.02em'
                  }}
                >
                  ©{new Date().getFullYear()} Tech Camp. สงวนลิขสิทธิ์.
                </Typography>
                <Typography 
                  variant="body2" 
                  component="div"
                  sx={{ 
                    fontFamily: '"Noto Sans Thai Looped", sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.02em'
                  }}
                >
                  สร้างขึ้นด้วยความรักและความทุ่มเท ❤️
                </Typography>
              </Box>
              
              {/* Logo with improved styling */}
              <Box 
                sx={{ 
                  width: { xs: '3rem', sm: '3.5rem' },
                  height: { xs: '3rem', sm: '3.5rem' },
                  position: 'relative',
                  animation: 'float 4s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image 
                  src="/images/PSU-SCC-LOGO.svg" 
                  alt="โลโก้ Tech Camp"
                  fill
                  style={{ 
                    objectFit: 'contain',
                    maxWidth: '100%'
                  }}
                  priority
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;