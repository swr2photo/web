"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
  alpha,
  useMediaQuery,
  useTheme
} from "@mui/material";

// Icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [scrolled, setScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setMounted(true);
    
    // Get current path
    setActivePath(window.location.pathname);
    
    // Add scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMobileFinal = mounted ? isMobile : false;

  const navItems = [
    { label: "Home", href: "/", icon: <HomeRoundedIcon /> },
    { label: "About", href: "/about", icon: <InfoRoundedIcon /> },
    { label: "Docs", href: "/docs", icon: <ArticleRoundedIcon /> },
    { label: "FAQ", href: "/faq", icon: <QuestionAnswerRoundedIcon /> },
  ];

  const handleNavClick = (href: string) => {
    setActivePath(href);
    setMenuOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1200,
        width: "100%",
        transition: "all 0.3s ease",
        padding: isMobileFinal ? "0 0.75rem 0.75rem" : "0.75rem 1.5rem",
        bottom: isMobileFinal ? 0 : "auto",
        top: isMobileFinal ? "auto" : 0,
      }}
    >
      <Paper
        elevation={scrolled ? 8 : 4}
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.primary.dark, 0.85)})`,
          backdropFilter: "blur(10px)",
          borderRadius: isMobileFinal ? "1.5rem" : "1rem",
          border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
          overflow: "hidden",
          boxShadow: scrolled 
            ? `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.5)}` 
            : `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.4)}`,
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: isMobileFinal ? "0.75rem 1rem" : "0.5rem 1.5rem",
          }}
          disableGutters
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                <RocketLaunchRoundedIcon color="primary" sx={{ fontSize: 20 }} />
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: "white",
                  letterSpacing: "-0.02em" 
                }}
              >
                MyApp
                <Box 
                  component="span" 
                  sx={{ 
                    color: theme.palette.secondary.light,
                    ml: 0.5
                  }}
                >
                  Pro
                </Box>
              </Typography>
            </Box>
          </Link>

          {isMobileFinal ? (
            <IconButton
              onClick={() => setMenuOpen(!menuOpen)}
              sx={{
                color: "white",
                bgcolor: alpha(theme.palette.common.white, 0.15),
                "&:hover": {
                  bgcolor: alpha(theme.palette.common.white, 0.25),
                },
                transition: "all 0.2s ease",
              }}
            >
              {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {navItems.map((item) => {
                const isActive = activePath === item.href;
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                    <Button
                      onClick={() => handleNavClick(item.href)}
                      startIcon={item.icon}
                      sx={{
                        px: 2,
                        py: 0.75,
                        borderRadius: "1rem",
                        color: isActive ? "primary.main" : "white",
                        bgcolor: isActive ? "white" : "transparent",
                        boxShadow: isActive ? 2 : "none",
                        "&:hover": {
                          bgcolor: isActive 
                            ? "white" 
                            : alpha(theme.palette.common.white, 0.15),
                        },
                        transition: "all 0.2s ease",
                        textTransform: "none",
                        fontWeight: isActive ? 600 : 500
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                );
              })}

              <Tooltip title="Get started now" arrow TransitionComponent={Zoom}>
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  sx={{
                    ml: 1,
                    px: 2.5,
                    py: 0.75,
                    borderRadius: "1rem",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.5)}`,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      boxShadow: `0 6px 16px ${alpha(theme.palette.secondary.main, 0.65)}`,
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Get Started
                </Button>
              </Tooltip>
            </Box>
          )}
        </Toolbar>

        {isMobileFinal && (
          <Slide direction="up" in={menuOpen} mountOnEnter unmountOnExit>
            <Box 
              sx={{ 
                p: 2,
                bgcolor: alpha(theme.palette.common.white, 0.08),
                borderRadius: "1rem",
                mx: 2,
                mb: 2
              }}
            >
              <Box 
                sx={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${navItems.length <= 3 ? '3' : '2'}, 1fr)`,
                  gap: 1.5,
                }}
              >
                {navItems.map((item, i) => {
                  const isActive = activePath === item.href;
                  return (
                    <Box 
                      key={item.href}
                      sx={{
                        animation: "fadeIn 0.3s ease forwards",
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0,
                        "@keyframes fadeIn": {
                          "0%": {
                            opacity: 0,
                            transform: "translateY(10px)"
                          },
                          "100%": {
                            opacity: 1,
                            transform: "translateY(0)"
                          }
                        }
                      }}
                    >
                      <Link href={item.href} style={{ textDecoration: "none" }}>
                        <Box
                          onClick={() => handleNavClick(item.href)}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5,
                            p: 1.5,
                            borderRadius: "1rem",
                            color: isActive ? "primary.main" : "white",
                            bgcolor: isActive ? "white" : "transparent",
                            "&:hover": {
                              bgcolor: isActive 
                                ? "white" 
                                : alpha(theme.palette.common.white, 0.15),
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          {item.icon}
                          <Typography variant="caption" fontWeight={isActive ? 600 : 500}>
                            {item.label}
                          </Typography>
                        </Box>
                      </Link>
                    </Box>
                  );
                })}
              </Box>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disableElevation
                sx={{
                  mt: 2.5,
                  py: 1.25,
                  borderRadius: "1rem",
                  boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.5)}`,
                  fontWeight: 600,
                  textTransform: "none",
                  animation: "fadeIn 0.3s ease forwards",
                  animationDelay: "0.3s",
                  opacity: 0,
                  "@keyframes fadeIn": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(10px)"
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0)"
                    }
                  }
                }}
              >
                Get Started
              </Button>
            </Box>
          </Slide>
        )}
      </Paper>
    </Box>
  );
}