'use client';

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
  Box,
  CircularProgress,
  Divider,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import Image from 'next/image';

interface GoogleLoginModalProps {
  open: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

const GoogleLoginModal = ({ open, onClose, redirectUrl = '/' }: GoogleLoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Get theme and check for mobile viewport
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setMounted(true);
  }, []);

  // ใช้ NextAuth แทนการจำลอง
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Starting Google login process...");
      console.log("Redirect URL:", redirectUrl);
      
      // ใช้ signIn จาก NextAuth
      const result = await signIn('google', { 
        callbackUrl: redirectUrl,
        redirect: false // ไม่ redirect อัตโนมัติ เพื่อจัดการกับข้อผิดพลาด
      });
      
      console.log("Sign in result:", result);
      
      if (result?.error) {
        setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ โปรดลองอีกครั้ง');
        console.error('Login error:', result.error);
        setIsLoading(false);
      } else if (result?.url) {
        // สำเร็จและมี URL เป้าหมาย
        window.location.href = result.url;
      } else {
        // สำเร็จแต่ไม่มี URL (ควรจะไม่เกิดขึ้น)
        onClose();
        setIsLoading(false);
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ โปรดลองอีกครั้ง');
      console.error('Login error:', err);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <Dialog 
      open={open} 
      onClose={!isLoading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: { xs: '8px', sm: '12px' },
          boxShadow: '0 0 30px rgba(0, 112, 255, 0.4)',
          bgcolor: '#051628',
          border: '2px solid #0070ff',
          color: '#fff',
          position: 'relative',
          margin: { xs: 2, sm: 'auto' },
          maxHeight: { xs: 'calc(100% - 32px)', sm: '90vh' },
          width: { xs: 'calc(100% - 32px)', sm: '100%' }, // Limit width on mobile
          overflow: 'hidden', // Changed to hidden to prevent content overflow
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0, 40, 80, 0.1) 1px, transparent 1px)',
            backgroundSize: '100% 2px',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.2,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #4dc3ff, transparent)',
            opacity: 0.7,
          }
        },
        '.MuiBackdrop-root': {
          backgroundColor: 'rgba(5, 22, 40, 0.8)',
        },
        '& .MuiDialog-container': {
          alignItems: { xs: 'center', sm: 'center' },
        }
      }}
    >
      {/* Scanline effect - simplified */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(77, 195, 255, 0.1), rgba(77, 195, 255, 0))',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* ปุ่มปิด */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        disabled={isLoading}
        sx={{
          position: 'absolute',
          right: { xs: 8, sm: 12 },
          top: { xs: 8, sm: 12 },
          color: '#4dc3ff',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'rgba(77, 195, 255, 0.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ 
        pt: { xs: 4, sm: 4 }, 
        px: { xs: 2, sm: 4 },
        textAlign: 'center',
        fontWeight: 600,
        fontFamily: "'Press Start 2P', cursive",
        fontSize: { xs: '0.8rem', sm: '1rem' },
        color: '#4dc3ff',
        textShadow: '0 0 10px rgba(77, 195, 255, 0.5)',
        position: 'relative',
        mb: 2,
        mt: { xs: 8, sm: 8 },
      }}>
        เข้าสู่ระบบ PSU SciCamp
        
        {/* Logo above title - simplified dimensions */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: -60, sm: -70 },
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: 80, sm: 90 },
            height: { xs: 80, sm: 90 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(5, 22, 40, 0.9)',
            borderRadius: '50%',
            border: '2px solid #0070ff',
            boxShadow: '0 0 20px rgba(0, 112, 255, 0.5)',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          <Box 
            sx={{ 
              position: 'relative', 
              width: { xs: 55, sm: 65 },
              height: { xs: 55, sm: 65 },
            }}
          >
            <Image
              src="/images/PSU-SCC-LOGO 2.svg"
              alt="PSU SciCamp Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent 
        sx={{ 
          px: { xs: 2, sm: 3 }, // Reduced padding
          pb: { xs: 3, sm: 4 }, 
          pt: { xs: 1, sm: 2 }, 
          position: 'relative', 
          zIndex: 1,
          overflowX: 'hidden', // Prevent horizontal overflow
          // Add min-height to accommodate content
          minHeight: { xs: '180px', sm: '220px' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2, flexShrink: 0 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#78c6ff',
              fontFamily: "'VT323', monospace",
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              textShadow: '0 0 10px rgba(77, 195, 255, 0.3)',
              maxWidth: '100%', // Ensure text doesn't exceed container
            }}
          >
            เข้าสู่ระบบเพื่อเข้าร่วมกิจกรรมและรับข่าวสารล่าสุด
          </Typography>
        </Box>

        {/* แสดงข้อความ error ถ้ามี - simplified */}
        {error && (
          <Box
            sx={{
              mb: 2,
              textAlign: 'center',
              backgroundColor: 'rgba(255, 51, 102, 0.1)',
              p: { xs: 1.5, sm: 2 },
              borderRadius: 2,
              border: '1px solid rgba(255, 51, 102, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#ff3366',
                fontFamily: "'VT323', monospace",
                fontSize: { xs: '1rem', sm: '1.1rem' },
                position: 'relative',
                zIndex: 1,
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* Main content area - simplified */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          my: 2, // Add margin for spacing
        }}>
          {/* ปุ่ม Login with Google - simplified */}
          <Button
            variant="outlined"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 }, position: 'relative' }}>
                  <svg viewBox="0 0 48 48" width="100%" height="100%">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.42-.76-2.94-.76-4.5 0-1.56.27-3.08.76-4.5l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </svg>
                </Box>
              )
            }
            sx={{
              py: { xs: 1.5, sm: 1.8 },
              borderColor: '#0070ff',
              color: '#ffffff',
              backgroundColor: 'rgba(0, 96, 214, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(0, 112, 221, 0.2)',
                borderColor: '#4dc3ff',
                transform: 'translateY(-3px)',
                boxShadow: '0 5px 15px rgba(0, 112, 255, 0.3)',
              },
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              textTransform: 'none',
              boxShadow: '0 0 15px rgba(0, 112, 255, 0.2)',
              fontFamily: "'VT323', monospace",
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:disabled': {
                borderColor: 'rgba(0, 112, 255, 0.3)',
                color: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Google'}
            </Box>
          </Button>
        </Box>

        {/* Decorative circuit lines - simplified */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: 0,
            flexShrink: 0,
            mt: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '80%',
              height: '100%',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: '#0070ff',
              }
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '40%',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#4dc3ff',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 5px rgba(77, 195, 255, 0.8)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '60%',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#4dc3ff',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 5px rgba(77, 195, 255, 0.8)',
              }}
            />
          </Box>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center', 
            mt: 2,
            color: '#78c6ff',
            fontFamily: "'VT323', monospace",
            fontSize: { xs: '0.85rem', sm: '0.95rem' },
            position: 'relative',
            zIndex: 1,
            flexShrink: 0,
            px: 1, // Add padding to prevent text from touching edges
          }}
        >
          การเข้าสู่ระบบถือว่าคุณยอมรับ{' '}
          <Box component="a" href="/terms" sx={{ 
            color: '#4dc3ff', 
            textDecoration: 'none',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -1,
              left: 0,
              width: '100%',
              height: 1,
              backgroundColor: '#4dc3ff',
              opacity: 0.5,
              transition: 'all 0.3s ease',
            },
            '&:hover::after': {
              opacity: 1,
              bottom: -2,
            },
          }}>
            เงื่อนไขการใช้งาน
          </Box>
          {' '}และ{' '}
          <Box component="a" href="/privacy" sx={{ 
            color: '#4dc3ff', 
            textDecoration: 'none',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -1,
              left: 0,
              width: '100%',
              height: 1,
              backgroundColor: '#4dc3ff',
              opacity: 0.5,
              transition: 'all 0.3s ease',
            },
            '&:hover::after': {
              opacity: 1,
              bottom: -2,
            },
          }}>
            นโยบายความเป็นส่วนตัว
          </Box>
        </Typography>
      </DialogContent>

      {/* Global styles for animations - simplified */}
      <style jsx global>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 20px rgba(0, 112, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(0, 112, 255, 0.5); }
          100% { box-shadow: 0 0 20px rgba(0, 112, 255, 0.3); }
        }
      `}</style>
    </Dialog>
  );
};

export default GoogleLoginModal;