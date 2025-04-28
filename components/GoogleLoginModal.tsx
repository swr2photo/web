'use client';

import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GoogleLoginModalProps {
  open: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

const GoogleLoginModal = ({ open, onClose, redirectUrl = '/' }: GoogleLoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <Dialog 
      open={open} 
      onClose={!isLoading ? onClose : undefined}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'visible',
          bgcolor: '#051628',
          border: '1px solid #0070ff',
          color: '#fff',
        }
      }}
    >
      {/* ปุ่มปิด */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        disabled={isLoading}
        sx={{
          position: 'absolute',
          right: 12,
          top: 12,
          color: '#4dc3ff',
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ 
        pt: 4, 
        textAlign: 'center',
        fontWeight: 600,
        fontFamily: "'Press Start 2P', cursive",
        fontSize: '1rem',
        color: '#4dc3ff'
      }}>
        เข้าสู่ระบบ PSU SciCamp
      </DialogTitle>
      
      <DialogContent sx={{ px: 4, pb: 5, pt: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#78c6ff',
              fontFamily: "'VT323', monospace",
              fontSize: '1.1rem'
            }}
            gutterBottom
          >
            เข้าสู่ระบบเพื่อเข้าร่วมกิจกรรมและรับข่าวสารล่าสุด
          </Typography>
        </Box>

        {/* แสดงข้อความ error ถ้ามี */}
        {error && (
          <Typography 
            color="error" 
            variant="body2" 
            sx={{ 
              mb: 2, 
              textAlign: 'center',
              backgroundColor: 'rgba(255, 51, 102, 0.1)',
              p: 1,
              borderRadius: 1,
              color: '#ff3366',
              fontFamily: "'VT323', monospace",
            }}
          >
            {error}
          </Typography>
        )}

        {/* ปุ่ม Login with Google */}
        <Button
          variant="outlined"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Box sx={{ width: 20, height: 20, position: 'relative' }}>
                <svg viewBox="0 0 48 48" width="20" height="20">
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
            py: 1.5,
            borderColor: '#0070ff',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 96, 214, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(0, 112, 221, 0.2)',
              borderColor: '#4dc3ff',
            },
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: '0 0 10px rgba(0, 112, 255, 0.2)',
            fontFamily: "'VT323', monospace",
          }}
        >
          {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Google'}
        </Button>

        <Divider sx={{ 
          my: 3, 
          borderColor: 'rgba(77, 195, 255, 0.2)',
          '&::before, &::after': {
            borderColor: 'rgba(77, 195, 255, 0.2)',
          }
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#4dc3ff',
              fontFamily: "'VT323', monospace",
            }}
          >
            หรือ
          </Typography>
        </Divider>

        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center', 
            mt: 2,
            color: '#78c6ff',
            fontFamily: "'VT323', monospace",
          }}
        >
          การเข้าสู่ระบบถือว่าคุณยอมรับ{' '}
          <Box component="a" href="/terms" sx={{ color: '#4dc3ff', textDecoration: 'none' }}>
            เงื่อนไขการใช้งาน
          </Box>
          {' '}และ{' '}
          <Box component="a" href="/privacy" sx={{ color: '#4dc3ff', textDecoration: 'none' }}>
            นโยบายความเป็นส่วนตัว
          </Box>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleLoginModal;