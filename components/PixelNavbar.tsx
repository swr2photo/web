"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// MUI Components
import {
  Box,
  Fab,
  Zoom,
  Tooltip,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// MUI Icons
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeIcon from "@mui/icons-material/Home";

export default function VerticalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  
  // Responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Handle mounting and random glitch effect
  useEffect(() => {
    setIsMounted(true);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  const navItems = [
    { name: "หน้าหลัก", path: "/", icon: <HomeIcon /> },
    { name: "เนื้อหาที่เรียน", path: "/curriculum", icon: <SchoolIcon /> },
    { name: "คุณสมบัติ", path: "/qualifications", icon: <PersonIcon /> },
    { name: "ช่วงเวลา", path: "/schedule", icon: <CalendarMonthIcon /> },
    { name: "คำถามที่พบบ่อย", path: "/faq", icon: <QuestionAnswerIcon /> },
    { name: "ติดต่อ", path: "/contact", icon: <ContactMailIcon /> },
  ];

  // Don't render anything during SSR or before hydration
  if (!isMounted) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main container for the vertical navbar */}
      <Box
        sx={{
          position: "fixed",
          right: isMobile ? 12 : 16,
          top: isMobile ? "auto" : "50%",
          bottom: isMobile ? 16 : "auto",
          transform: isMobile 
            ? (isGlitching ? "translateX(2px)" : "none") 
            : `translateY(-50%) ${isGlitching ? "translateX(2px)" : ""}`,
          zIndex: 1300,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          transition: "transform 0.2s",
        }}
      >
        {/* Main menu button with logo */}
        <Fab
          color="primary"
          aria-label="menu"
          onClick={toggleMenu}
          sx={{
            mb: isMenuOpen ? 2 : 0,
            bgcolor: alpha("#051628", 0.9),
            border: "2px solid #0070ff",
            color: "#4dc3ff",
            width: isMobile ? 50 : 56,
            height: isMobile ? 50 : 56,
            position: "relative",
            boxShadow: `0 0 12px ${alpha("#0070ff", 0.3)}`,
            "&:hover": {
              bgcolor: alpha("#051628", 0.95),
              boxShadow: `0 0 16px ${alpha("#0070ff", 0.5)}`,
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              background:
                "linear-gradient(transparent 0%, rgba(0, 16, 32, 0.1) 50%, transparent 100%)",
              backgroundSize: "100% 4px",
              pointerEvents: "none",
              zIndex: 1,
              opacity: 0.3,
            },
          }}
        >
          {isMenuOpen ? (
            <CloseIcon />
          ) : (
            <Box
              sx={{
                position: "relative",
                width: isMobile ? 30 : 34,
                height: isMobile ? 30 : 34,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/PSU-SCC-LOGO 2.svg"
                alt="PSU SciCamp Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          )}
        </Fab>

        {/* Navigation items shown when menu is open */}
        {navItems.map((item, index) => (
          <Zoom
            key={item.path}
            in={isMenuOpen}
            style={{
              transitionDelay: isMenuOpen ? `${100 * (navItems.length - index)}ms` : "0ms",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                opacity: isMenuOpen ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {/* Text label with pixel theme - hide on mobile */}
              {!isMobile && (
                <Tooltip title={item.name} placement="left" arrow>
                  <Box
                    component={Link}
                    href={item.path}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      mr: 2,
                      fontSize: isTablet ? "16px" : "18px",
                      color: pathname === item.path ? "#ffffff" : "#78c6ff",
                      fontFamily: "'VT323', monospace",
                      bgcolor: pathname === item.path ? alpha("#0070ff", 0.2) : "transparent",
                      p: 1,
                      borderRadius: "4px",
                      border: pathname === item.path ? "1px solid #0070ff" : "1px solid transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#ffffff",
                        bgcolor: alpha("#0070ff", 0.3),
                      },
                    }}
                  >
                    {item.name}
                  </Box>
                </Tooltip>
              )}

              {/* Circular button with icon */}
              <Tooltip title={isMobile ? item.name : ""} placement="left">
                <Fab
                  component={Link}
                  href={item.path}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    bgcolor: pathname === item.path ? alpha("#0070ff", 0.3) : alpha("#051628", 0.9),
                    border: "2px solid #0070ff",
                    color: pathname === item.path ? "#ffffff" : "#4dc3ff",
                    width: isMobile ? 40 : 48,
                    height: isMobile ? 40 : 48,
                    boxShadow: pathname === item.path
                      ? `0 0 10px ${alpha("#0070ff", 0.4)}`
                      : `0 0 8px ${alpha("#0070ff", 0.2)}`,
                    "&:hover": {
                      bgcolor: alpha("#051628", 0.95),
                      boxShadow: `0 0 12px ${alpha("#0070ff", 0.5)}`,
                      color: "#ffffff",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(transparent 0%, rgba(0, 16, 32, 0.1) 50%, transparent 100%)",
                      backgroundSize: "100% 4px",
                      pointerEvents: "none",
                      zIndex: 1,
                      opacity: 0.3,
                    },
                  }}
                >
                  {item.icon}
                </Fab>
              </Tooltip>
            </Box>
          </Zoom>
        ))}
      </Box>

      {/* Background overlay when menu is open - to help capture click events to close menu */}
      {isMenuOpen && (
        <Box
          onClick={() => setIsMenuOpen(false)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            backgroundColor: isMobile ? alpha("#000", 0.3) : "transparent",
          }}
        />
      )}
      
      {/* Add space to ensure content isn't hidden on mobile */}
      {isMobile && (
        <Box
          sx={{
            height: "60px",
            width: "100%",
          }}
        />
      )}
    </>
  );
}