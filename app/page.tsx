"use client";

import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

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

  const binaryText =
    "01001100 01001111 01000001 01000100 01001001 01001110 01000111 00100000 01000101 01001110 01000011 01010010 01011001 01010000 01010100 01001001 01001111 01001110 00100000 01010011 01000101 01010001 01010101 01000101 01001110 01000011 01000101";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#051628",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Press Start 2P', cursive",
      }}
    >
      {/* Pixel Grid Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(rgba(0, 128, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 128, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          zIndex: 1,
        }}
      />

      {/* Glowing Orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(0, 96, 214, 0.15)",
          filter: "blur(40px)",
          animation: "float 8s infinite ease-in-out",
          zIndex: 0,
          willChange: "transform",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "15%",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(0, 186, 255, 0.1)",
          filter: "blur(50px)",
          animation: "float 10s infinite ease-in-out reverse",
          zIndex: 0,
          willChange: "transform",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
          <Box
            sx={{
              border: "4px solid #0080ff",
              borderStyle: "dashed",
              borderRadius: "12px",
              p: 2,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -8,
                left: -8,
                right: -8,
                bottom: -8,
                borderRadius: "16px",
                background: "rgba(0, 128, 255, 0.1)",
                zIndex: -1,
              },
            }}
          >
            <Image
              src="/images/PSU-SCC-LOGO 2.svg"
              alt="Camp Logo"
              width={160}
              height={160}
              style={{ display: "block" }}
            />
          </Box>
        </Box>

        {/* Dates */}
        <Box
          sx={{
            mb: 6,
            p: 2,
            background: "rgba(0, 40, 80, 0.4)",
            border: "2px solid #0060cc",
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "#4dc3ff",
              letterSpacing: "1px",
              fontFamily: "'VT323', monospace",
              textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
            }}
          >
            * * XXXX * *
          </Typography>
        </Box>

        {/* Coming Soon */}
        <Box
          className={glitchActive ? "glitch" : ""}
          sx={{
            mb: 6,
            position: "relative",
            "&.glitch": {
              animation: "glitch 1s infinite",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              fontWeight: "bold",
              color: "#ffffff",
              textShadow: "0 0 10px rgba(0, 160, 255, 0.7), 0 0 20px rgba(0, 128, 255, 0.5)",
              fontFamily: "'Press Start 2P', cursive",
              letterSpacing: "2px",
            }}
          >
            COMING SOON
          </Typography>
        </Box>

        {/* Loading Bar */}
        <Box
          sx={{
            position: "relative",
            height: "30px",
            background: "rgba(0, 40, 80, 0.5)",
            borderRadius: "4px",
            border: "2px solid #0070dd",
            overflow: "hidden",
            mb: 2,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${loadingProgress}%`,
              background: glitchActive
                ? "repeating-linear-gradient(45deg, #ff2222, #ff2222 10px, #ff6644 10px, #ff6644 20px)"
                : "linear-gradient(90deg, #0088ff, #00ccff)",
              transition: "width 0.3s ease-out",
            }}
          />
        </Box>

        {/* Loading Status */}
        <Typography
          sx={{
            color: glitchActive ? "#ff4444" : "#4dc3ff",
            fontSize: "0.8rem",
            fontFamily: "'VT323', monospace",
            letterSpacing: "1px",
            mt: 1,
          }}
        >
          {glitchActive ? "ERR0R: SYSTEM FAILURE - RETRY LATER" : `LOADING DATA... ${loadingProgress}%`}
        </Typography>

        {/* Encryption Text */}
        <Box
          sx={{
            mt: 6,
            p: 2,
            background: "rgba(0, 40, 80, 0.4)",
            border: "1px solid #0060cc",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              color: "#00cc99",
              fontSize: "0.7rem",
              fontFamily: "monospace",
              letterSpacing: "1px",
              whiteSpace: "nowrap",
              animation: "scroll 20s linear infinite",
            }}
          >
            {binaryText}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}