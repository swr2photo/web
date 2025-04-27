"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Box, 
  Typography, 
  Container, 
  Button,
  alpha,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// สร้าง theme เฉพาะสำหรับหน้านี้
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0070ff',
    },
  },
});

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmall = useMediaQuery('(max-height:700px)');

  useEffect(() => {
    setMounted(true);
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#051628",
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background grid effect */}
        <Box 
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.1,
            backgroundImage: "linear-gradient(#0070ff 1px, transparent 1px), linear-gradient(90deg, #0070ff 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        />
        
        {/* Scan lines effect */}
        <Box 
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "linear-gradient(transparent 0%, rgba(0, 16, 32, 0.1) 50%, transparent 100%)",
            backgroundSize: "100% 4px"
          }}
        />
        
        {/* Content container */}
        <Container 
          maxWidth="sm" 
          sx={{ 
            height: "100%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            px: isMobile ? 2 : 3
          }}
        >
          <Box 
            sx={{
              textAlign: "center",
              position: "relative",
              zIndex: 10,
              border: "2px solid #0070ff",
              bgcolor: alpha("#051628", 0.8),
              backdropFilter: "blur(8px)",
              p: isSmall ? 3 : isMobile ? 4 : 5,
              borderRadius: 3,
              mx: "auto",
              transition: "transform 0.15s ease",
              transform: glitchActive ? "translateX(3px)" : "none",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Error pixel art */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              mb: isSmall ? 1 : 2 
            }}>
              <Box 
                sx={{ 
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: isSmall ? "3rem" : isMobile ? "3.5rem" : "4.5rem",
                  fontWeight: 700,
                  color: "#4dc3ff",
                  position: "relative",
                  lineHeight: 1
                }}
              >
                <Box 
                  sx={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    opacity: glitchActive ? 1 : 0,
                    transform: "translateX(-1px)",
                    color: "#ff2d2d"
                  }}
                >
                  404
                </Box>
                <Box 
                  sx={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    opacity: glitchActive ? 1 : 0,
                    transform: "translateX(1px)",
                    color: "#4dffb4"
                  }}
                >
                  404
                </Box>
                404
              </Box>
            </Box>
            
            <Box 
              sx={{ 
                width: "100%", 
                height: "1px", 
                background: "linear-gradient(to right, transparent, #0070ff, transparent)",
                my: isSmall ? 1 : 2
              }} 
            />
            
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: "'VT323', monospace", 
                mb: isSmall ? 0.5 : 1,
                fontSize: isSmall ? "1.5rem" : "1.75rem"
              }}
            >
              SYSTEM ERROR
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: "'VT323', monospace", 
                mt: isSmall ? 0.5 : 1, 
                color: "#78c6ff",
                fontSize: isSmall ? "1.25rem" : "1.5rem"
              }}
            >
              ขอโทษ! หน้าเว็บที่คุณค้นหาไม่พบ
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: "'VT323', monospace", 
                color: "grey.300", 
                mt: isSmall ? 0.5 : 1.5, 
                mb: isSmall ? 1.5 : 3,
                fontSize: isSmall ? "1rem" : "1.25rem"
              }}
            >
              หน้าเว็บที่คุณกำลังมองหาอาจจะถูกลบ<br />หรือไม่เคยมีมาก่อน
            </Typography>
            
            <Box sx={{ 
              position: "relative", 
              display: "inline-block", 
              mt: isSmall ? 1 : 2,
              alignSelf: "center"
            }}>
              <Box 
                sx={{ 
                  position: "absolute", 
                  inset: 0, 
                  borderRadius: 1,
                  bgcolor: "#0070ff",
                  filter: "blur(8px)",
                  opacity: 0.7,
                  transition: "opacity 0.3s",
                  "&:hover": {
                    opacity: 1
                  }
                }} 
              />
              <Button
                component={Link}
                href="/"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#0a2d52",
                  border: "2px solid #4dc3ff",
                  color: "#4dc3ff",
                  fontFamily: "'VT323', monospace",
                  py: isSmall ? 1 : 1.5,
                  px: isSmall ? 3 : 4,
                  position: "relative",
                  fontSize: isSmall ? "1rem" : "1.25rem",
                  textTransform: "none",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    bgcolor: "#0a2d52",
                    color: "white",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                กลับสู่หน้าหลัก
              </Button>
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                mt: isSmall ? 2 : 3, 
                color: "#4dc3ff", 
                fontFamily: "'VT323', monospace",
                fontSize: "0.875rem"
              }}
            >
              ERROR CODE: 0x00000404
            </Typography>
          </Box>
        </Container>
        
        {/* Decorative elements - ซ่อนบนหน้าจอขนาดเล็ก */}
        {!isSmall && (
          <>
            <Box 
              sx={{ 
                position: "absolute", 
                bottom: 3, 
                left: 3, 
                color: alpha("#0070ff", 0.4), 
                fontFamily: "'VT323', monospace", 
                fontSize: "0.875rem",
                display: { xs: "none", sm: "block" }
              }}
            >
              SYSTEM: PSU_SCICAMP.EXE<br />
              LOADING FAILED...
            </Box>
            
            <Box 
              sx={{ 
                position: "absolute", 
                top: 3, 
                right: 3, 
                color: alpha("#0070ff", 0.4), 
                fontFamily: "'VT323', monospace", 
                fontSize: "0.875rem",
                textAlign: "right",
                display: { xs: "none", sm: "block" }
              }}
            >
              TRY AGAIN<br />
              OR RETURN HOME
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}