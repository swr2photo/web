"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

// MUI Components
import {
  Box,
  Fab,
  Zoom,
  Tooltip,
  alpha,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Avatar,
} from "@mui/material";

// MUI Icons
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GoogleLoginModal from "./GoogleLoginModal";

export default function PixelNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const theme = useTheme();
  const { data: session, status } = useSession();
  
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

  // ล็อกข้อมูลเซสชันเมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [session, status]);

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

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    handleProfileClose();
  };

  // ใช้สถานะจาก NextAuth แทนการจำลอง
  const isLoggedIn = status === 'authenticated' && !!session;

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
            boxShadow: `0 0 15px ${alpha("#0070ff", 0.4)}`,
            "&:hover": {
              bgcolor: alpha("#051628", 0.95),
              boxShadow: `0 0 20px ${alpha("#0070ff", 0.6)}`,
              transform: "scale(1.05)",
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
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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
                animation: "pulse 2s infinite ease-in-out",
                "@keyframes pulse": {
                  "0%": { filter: "brightness(1)" },
                  "50%": { filter: "brightness(1.2)" },
                  "100%": { filter: "brightness(1)" },
                },
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
                        transform: "translateX(-5px)",
                        textShadow: "0 0 8px rgba(77, 195, 255, 0.8)",
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
                      ? `0 0 12px ${alpha("#0070ff", 0.5)}`
                      : `0 0 8px ${alpha("#0070ff", 0.3)}`,
                    "&:hover": {
                      bgcolor: alpha("#051628", 0.95),
                      boxShadow: `0 0 15px ${alpha("#0070ff", 0.6)}`,
                      color: "#ffffff",
                      transform: "translateX(-2px) scale(1.05)",
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
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  {item.icon}
                </Fab>
              </Tooltip>
            </Box>
          </Zoom>
        ))}

        {/* Login Button - Separated from other navigation items */}
        <Zoom
          in={isMenuOpen}
          style={{
            transitionDelay: isMenuOpen ? `${100 * (navItems.length + 1)}ms` : "0ms",
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
            {/* Text label for Login - hide on mobile */}
            {!isMobile && (
              <Tooltip title={isLoggedIn ? "โปรไฟล์" : "เข้าสู่ระบบ"} placement="left" arrow>
                <Box
                  component="div"
                  onClick={isLoggedIn ? handleProfileClick : openLoginModal}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    mr: 2,
                    fontSize: isTablet ? "16px" : "18px",
                    color: "#78c6ff",
                    fontFamily: "'VT323', monospace",
                    bgcolor: "transparent",
                    p: 1,
                    px: 2,
                    borderRadius: "4px",
                    border: "1px solid #0070ff",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      color: "#ffffff",
                      bgcolor: alpha("#0070ff", 0.3),
                      transform: "translateX(-5px)",
                      textShadow: "0 0 8px rgba(77, 195, 255, 0.8)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: -100,
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(77, 195, 255, 0.2), transparent)",
                      transition: "transform 0.6s ease",
                      zIndex: -1,
                    },
                    "&:hover::before": {
                      transform: "translateX(200%)",
                    },
                    animation: "border-pulse 3s infinite linear",
                    "@keyframes border-pulse": {
                      "0%": { borderColor: "#0070ff" },
                      "50%": { borderColor: "#4dc3ff" },
                      "100%": { borderColor: "#0070ff" },
                    },
                  }}
                >
                  {isLoggedIn ? "โปรไฟล์" : "เข้าสู่ระบบ"}
                </Box>
              </Tooltip>
            )}

            {/* Circular button for Login/Profile */}
            {isLoggedIn ? (
              // โปรไฟล์ผู้ใช้ (หลังจาก login)
              <Tooltip title={isMobile ? "โปรไฟล์" : ""} placement="left">
                <Fab
                  onClick={handleProfileClick}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    bgcolor: alpha("#051628", 0.9),
                    border: "2px solid #0070ff",
                    color: "#4dc3ff",
                    width: isMobile ? 40 : 48,
                    height: isMobile ? 40 : 48,
                    boxShadow: `0 0 12px ${alpha("#0070ff", 0.4)}`,
                    padding: 0,
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: alpha("#051628", 0.95),
                      boxShadow: `0 0 18px ${alpha("#0070ff", 0.6)}`,
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  {session?.user?.image ? (
                    <Avatar 
                      src={session.user.image} 
                      alt={session.user.name || "User"}
                      sx={{ 
                        width: '100%', 
                        height: '100%',
                        border: "2px solid rgba(77, 195, 255, 0.3)",
                      }}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </Fab>
              </Tooltip>
            ) : (
              // ปุ่ม Login (ก่อน login)
              <Tooltip title={isMobile ? "เข้าสู่ระบบ" : ""} placement="left">
                <Fab
                  onClick={openLoginModal}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    bgcolor: alpha("#051628", 0.9),
                    border: "2px solid #0070ff",
                    color: "#4dc3ff",
                    width: isMobile ? 40 : 48,
                    height: isMobile ? 40 : 48,
                    boxShadow: `0 0 12px ${alpha("#0070ff", 0.4)}`,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: alpha("#051628", 0.95),
                      boxShadow: `0 0 18px ${alpha("#0070ff", 0.6)}`,
                      color: "#ffffff",
                      transform: "scale(1.05)",
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
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: -50,
                      left: -50,
                      right: -50,
                      bottom: -50,
                      background: "radial-gradient(circle, rgba(77, 195, 255, 0.2) 0%, transparent 70%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    },
                    "&:hover::after": {
                      opacity: 1,
                    },
                    animation: "subtle-glow 4s infinite ease-in-out",
                    "@keyframes subtle-glow": {
                      "0%": { boxShadow: `0 0 12px ${alpha("#0070ff", 0.4)}` },
                      "50%": { boxShadow: `0 0 18px ${alpha("#0070ff", 0.6)}` },
                      "100%": { boxShadow: `0 0 12px ${alpha("#0070ff", 0.4)}` },
                    },
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  <LoginIcon 
                    sx={{
                      animation: "icon-pulse 2s infinite ease-in-out",
                      "@keyframes icon-pulse": {
                        "0%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.1)" },
                        "100%": { transform: "scale(1)" },
                      },
                    }}
                  />
                </Fab>
              </Tooltip>
            )}
          </Box>
        </Zoom>
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

      {/* Google Login Modal */}
      <GoogleLoginModal
        open={isLoginModalOpen}
        onClose={closeLoginModal}
        redirectUrl={pathname || '/'}
      />

      {/* Profile Menu (แสดงเมื่อคลิกที่ปุ่มโปรไฟล์) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        onClick={handleProfileClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            backgroundColor: alpha("#051628", 0.95),
            border: "1px solid #0070ff",
            boxShadow: `0 0 20px ${alpha("#0070ff", 0.4)}`,
            borderRadius: "8px",
            '& .MuiMenuItem-root': {
              color: "#78c6ff",
              fontFamily: "'VT323', monospace",
              fontSize: "1.1rem",
              transition: "all 0.2s ease",
              '&:hover': {
                backgroundColor: alpha("#0070ff", 0.2),
                color: "#ffffff",
                transform: "translateX(5px)",
              },
            },
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent, #4dc3ff, transparent)",
              opacity: 0.7,
            },
          },
        }}
      >
        {session?.user && (
          <>
            <MenuItem sx={{ py: 1.5, p: 0 }}>
              <Link href="/profile" style={{ 
                display: 'flex', 
                alignItems: 'center',
                width: '100%',
                padding: '8px 16px',
                color: 'inherit',
                textDecoration: 'none'
              }}>
                <ListItemIcon sx={{ color: "#78c6ff", minWidth: 36 }}>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                โปรไฟล์
              </Link>
            </MenuItem>
            <Divider sx={{ borderColor: alpha("#0070ff", 0.3) }} />
            <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ color: "#78c6ff", minWidth: 36 }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              ออกจากระบบ
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}