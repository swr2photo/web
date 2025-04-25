"use client";

import Image from "next/image";
import Link from "next/link";
import Timeline from "@/components/Timeline";
import FAQAccordion from '@/components/FAQAccordion';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  useTheme, 
  alpha, 
  Fade, 
  Divider,
  Chip,
  Stack
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import { useEffect, useState } from "react";

export default function Home() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 36 }} />,
      title: "เรียนรู้การเขียนโค้ด",
      description: "พัฒนาทักษะการเขียนโปรแกรมจากผู้เชี่ยวชาญ"
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 36 }} />,
      title: "เตรียมความพร้อม",
      description: "เตรียมตัวสู่การเรียนในมหาวิทยาลัย"
    },
    {
      icon: <CalendarTodayIcon sx={{ fontSize: 36 }} />,
      title: "กิจกรรมสร้างสรรค์",
      description: "ร่วมกิจกรรมสนุกๆ สร้างมิตรภาพใหม่"
    }
  ];

  // Animation timings for staggered effect
  const getAnimationDelay = (index: number) => ({
    transitionDelay: `${index * 150}ms`,
  });
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
        pt: { xs: 4, md: 6 },
        pb: { xs: 12, md: 8 }, // Extra padding on mobile for navbar
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section - Using Stack instead of Grid */}
        <Stack 
          spacing={4} 
          direction="column" 
          alignItems="center" 
          textAlign="center" 
          sx={{ mb: 8 }}
        >
          <Fade in={loaded} timeout={800}>
            <Box sx={{ position: "relative", mb: 2 }}>
              <Box
                sx={{
                  position: "absolute",
                  inset: -2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: "50%",
                  opacity: 0.2,
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.2, transform: "scale(1)" },
                    "50%": { opacity: 0.3, transform: "scale(1.05)" },
                    "100%": { opacity: 0.2, transform: "scale(1)" }
                  }
                }}
              />
              <Paper
                elevation={6}
                sx={{
                  p: 1,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`
                }}
              >
                <Image
                  src="/camp-logo.svg"
                  alt="Camp Logo"
                  width={140}
                  height={140}
                  style={{ borderRadius: "50%" }}
                />
              </Paper>
              <Chip
                label="ปี 25"
                color="primary"
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: -5,
                  fontWeight: "bold",
                  boxShadow: 2
                }}
              />
            </Box>
          </Fade>

          <Fade in={loaded} timeout={1000} style={getAnimationDelay(1)}>
            <Box>
              <Typography
                variant="h2"
                component="h1" 
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
                  background: `linear-gradient(135deg, ${theme.palette.common.white}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1
                }}
              >
                ค่ายคอม PSU SciCamp
              </Typography>
              <Typography 
                variant="h6" 
                color="primary.light" 
                sx={{ 
                  fontWeight: 300,
                  mb: 3,
                  opacity: 0.9
                }}
              >
                สร้างนักพัฒนารุ่นใหม่ หัวใจเทคโนโลยี
              </Typography>
            </Box>
          </Fade>

          <Fade in={loaded} timeout={1200} style={getAnimationDelay(2)}>
            <Box sx={{ width: { xs: '100%', sm: '83.33%', md: '66.67%' } }}>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  lineHeight: 1.7,
                  fontSize: { xs: "1rem", md: "1.1rem" }
                }}
              >
                ยินดีต้อนรับสู่ค่ายคอมพิวเตอร์ คณะวิทยาศาสตร์ มหาวิทยาลัยสงขลานครินทร์
                <br />
                เรียนรู้การเขียนโปรแกรม พัฒนาทักษะดิจิทัล สร้างแรงบันดาลใจ และเติบโตไปด้วยกัน
              </Typography>
            </Box>
          </Fade>

          <Fade in={loaded} timeout={1400} style={getAnimationDelay(3)}>
            <Box sx={{ width: { xs: '100%', sm: '83.33%', md: '66.67%' } }}>
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={2} 
                sx={{ mt: 2, width: "100%", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  component={Link}
                  href="/register"
                  sx={{
                    borderRadius: "28px",
                    px: 4,
                    py: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    transition: "all 0.3s",
                    fontWeight: 600,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 20px -6px ${alpha(theme.palette.primary.main, 0.6)}`
                    }
                  }}
                >
                  สมัครเข้าค่าย
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/about"
                  sx={{
                    borderRadius: "28px",
                    px: 4,
                    py: 1.5,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      background: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                >
                  รายละเอียดค่าย
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Stack>

        {/* Features Section */}
        <Fade in={loaded} timeout={1600} style={getAnimationDelay(4)}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              mb: 8
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
              {features.map((feature, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    width: { xs: '100%', md: '33.33%' }, 
                    px: 2,
                    mb: { xs: 4, md: 0 },
                    '&:last-child': { mb: 0 }
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 2,
                      height: "100%",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)"
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                        color: theme.palette.primary.main,
                        mb: 2
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Fade>

        {/* Timeline Section */}
        <Fade in={loaded} timeout={1800} style={getAnimationDelay(5)}>
          <Box>
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Chip 
                label="กำหนดการ" 
                color="primary" 
                variant="outlined" 
                sx={{ mb: 2 }} 
              />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  mb: 1
                }}
              >
                ไทม์ไลน์กิจกรรม
              </Typography>
              <Divider 
                sx={{ 
                  width: "60px", 
                  mx: "auto", 
                  borderColor: theme.palette.primary.main,
                  borderWidth: 2,
                  mb: 6
                }} 
              />
            </Box>
            
            <Timeline />
            <FAQAccordion />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}