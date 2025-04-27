"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// MUI Components
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

// MUI Icons
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeIcon from "@mui/icons-material/Home";

export default function PixelNavbar() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();

  // Use state instead of mediaQuery for SSR compatibility
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Handle mounting and media queries safely
  useEffect(() => {
    setIsMounted(true);

    // Set initial values
    setIsMobile(window.innerWidth < theme.breakpoints.values.md);
    setIsTablet(
      window.innerWidth >= theme.breakpoints.values.sm &&
      window.innerWidth < theme.breakpoints.values.md
    );

    // Add resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < theme.breakpoints.values.md);
      setIsTablet(
        window.innerWidth >= theme.breakpoints.values.sm &&
        window.innerWidth < theme.breakpoints.values.md
      );
    };

    window.addEventListener("resize", handleResize);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(glitchInterval);
    };
  }, [theme.breakpoints.values.md, theme.breakpoints.values.sm]);

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

  // Desktop Navigation
  const desktopNavbar = (
    <AppBar
      position="fixed"
      component="div"
      sx={{
        top: 16,
        left: 16,
        right: 16,
        width: "auto",
        background: "transparent",
        boxShadow: "none",
        backdropFilter: "none",
        transition: "transform 0.2s",
        transform: isGlitching ? "translateX(2px)" : "none",
        zIndex: 1200,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: isTablet ? 1 : 3,
          maxWidth: "1920px",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            py: 1,
            px: isTablet ? 1 : 2,
            bgcolor: alpha("#051628", 0.9),
            backdropFilter: "blur(10px)",
            border: "2px solid #0070ff",
            borderRadius: "12px",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(transparent 0%, rgba(0, 16, 32, 0.1) 50%, transparent 100%)",
              backgroundSize: "100% 4px",
              pointerEvents: "none",
              zIndex: 1,
              opacity: 0.3,
            },
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 2,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 40,
                height: 40,
                mr: 1,
                border: "1px solid rgba(0, 128, 255, 0.5)",
                borderRadius: "8px",
                p: 0.5,
              }}
            >
              <Image
                src="/images/PSU-SCC-LOGO 2.svg"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: "flex",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "14px",
                fontWeight: 700,
                color: "#4dc3ff",
                textDecoration: "none",
              }}
            >
              PSU SciCamp
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              overflowX: isTablet ? "auto" : "visible",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {navItems.map((item, index) => {
              // Skip home on desktop nav
              if (index === 0) return null;

              const isActive = pathname === item.path;
              return (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  startIcon={item.icon}
                  sx={{
                    mx: isTablet ? 0.25 : 0.5,
                    px: isTablet ? 1 : 2,
                    py: 1,
                    color: isActive ? "#ffffff" : "#78c6ff",
                    backgroundColor: isActive
                      ? alpha("#0070ff", 0.3)
                      : "transparent",
                    borderBottom: isActive ? "2px solid #4dc3ff" : "none",
                    borderRadius: 0,
                    fontFamily: "'VT323', monospace",
                    fontSize: isTablet ? "16px" : "18px",
                    textTransform: "none",
                    position: "relative",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: alpha("#0070ff", 0.2),
                      color: "#4dc3ff",
                      "&::after": {
                        width: "100%",
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: isActive ? "100%" : "0%",
                      height: "2px",
                      backgroundColor: "#4dc3ff",
                      transition: "width 0.3s ease",
                    },
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </Box>
        </Toolbar>

        {/* Decorative pixel line */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #0070ff, transparent)",
          }}
        />
      </Container>
    </AppBar>
  );

  // Mobile Bottom Navigation
  const mobileNavbar = (
    <Paper
      elevation={3}
      component="div"
      sx={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 1300,
        borderRadius: "12px",
        overflow: "hidden",
        bgcolor: alpha("#051628", 0.95),
        backdropFilter: "blur(10px)",
        border: "2px solid #0070ff",
        boxShadow: `0 -4px 12px ${alpha("#0070ff", 0.2)}`,
      }}
    >
      {/* Scanline effect overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(transparent 0%, rgba(0, 16, 32, 0.1) 50%, transparent 100%)",
          backgroundSize: "100% 4px",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.3,
        }}
      />

      {/* Pixel border top */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "2px",
          background:
            "linear-gradient(to right, transparent, #0070ff, transparent)",
        }}
      />

      <BottomNavigation
        value={pathname}
        sx={{
          bgcolor: "transparent",
          height: 70,
          "& .MuiBottomNavigationAction-root": {
            color: "#78c6ff",
            "&.Mui-selected": {
              color: "#ffffff",
            },
            minWidth: 0,
            padding: "6px 0",
          },
          position: "relative",
          zIndex: 2,
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            component={Link}
            href={item.path}
            value={item.path}
            label={item.name}
            icon={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "transform 0.2s ease-in-out",
                  transform:
                    pathname === item.path ? "translateY(-4px)" : "none",
                }}
              >
                {item.icon}
                {pathname === item.path && (
                  <Box
                    sx={{
                      width: "4px",
                      height: "4px",
                      bgcolor: "#4dc3ff",
                      mt: 0.5,
                      boxShadow: "0 0 6px #4dc3ff",
                    }}
                  />
                )}
              </Box>
            }
            sx={{
              "&.Mui-selected": {
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  transition: "font-size 0.2s, transform 0.2s",
                  fontFamily: "'VT323', monospace",
                },
              },
              "& .MuiBottomNavigationAction-label": {
                fontFamily: "'VT323', monospace",
                fontSize: "0.7rem",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );

  // Add spacing at the top and bottom of content to account for fixed navbars
  const contentSpacing = (
    <Box
      sx={{
        pt: isMobile ? 0 : 12, // Top padding only for desktop
        pb: isMobile ? 11 : 0, // Bottom padding only for mobile
      }}
    />
  );

  return (
    <>
      {isMobile ? mobileNavbar : desktopNavbar}
      {contentSpacing}
    </>
  );
}