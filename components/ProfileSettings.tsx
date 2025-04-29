"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

// MUI Components
import {
  Box,
  Typography,
  TextField,
  Button,
  alpha,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Grid,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Tooltip,
  Switch,
  FormControlLabel,
} from "@mui/material";

// MUI Icons
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import Link from "next/link";

// Define types for userData
interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  language: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  bio: string;
  preferences: UserPreferences;
}

// Define type for notification
interface NotificationState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export default function ProfileSettings() {
  const { data: session, status, update } = useSession();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [notification, setNotification] = useState<NotificationState>({ 
    open: false, 
    message: "", 
    severity: "success" 
  });
  
  // User data states
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    bio: "",
    preferences: {
      notifications: true,
      darkMode: true,
      language: "th",
    }
  });
  
  const theme = useTheme();
  
  // Responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Handle mounting and random glitch effect
  useEffect(() => {
    setIsMounted(true);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 5000);

    // Initialize user data from session
    if (session?.user) {
      setUserData(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
        // Other fields would be filled if they were available in the session
      }));
    }

    return () => {
      clearInterval(glitchInterval);
    };
  }, [session]);

  // Don't render anything during SSR or before hydration
  if (!isMounted) {
    return null;
  }

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Handle preference changes
  const handlePreferenceChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        [name]: event.target.checked
      }
    });
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // Simulating API call to save profile data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update session (in a real app, this would be connected to your API)
      await update({
        ...session,
        user: {
          ...session?.user,
          name: userData.name,
        }
      });
      
      setNotification({
        open: true,
        message: "โปรไฟล์ถูกบันทึกเรียบร้อยแล้ว",
        severity: "success"
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
      setNotification({
        open: true,
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        severity: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Navigation tabs
  const tabs = [
    { id: "general", label: "ข้อมูลทั่วไป", icon: <PersonIcon /> },
    { id: "security", label: "ความปลอดภัย", icon: <SecurityIcon /> },
    { id: "notifications", label: "การแจ้งเตือน", icon: <NotificationsIcon /> },
    { id: "appearance", label: "การแสดงผล", icon: <PaletteIcon /> },
  ];

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box
                  sx={{
                    position: "relative",
                    width: 150,
                    height: 150,
                    mb: 2,
                    border: "3px solid #0070ff",
                    borderRadius: "50%",
                    overflow: "hidden",
                    boxShadow: `0 0 20px ${alpha("#0070ff", 0.4)}`,
                    animation: "avatar-pulse 3s infinite ease-in-out",
                    "@keyframes avatar-pulse": {
                      "0%": { boxShadow: `0 0 10px ${alpha("#0070ff", 0.4)}` },
                      "50%": { boxShadow: `0 0 25px ${alpha("#0070ff", 0.6)}` },
                      "100%": { boxShadow: `0 0 10px ${alpha("#0070ff", 0.4)}` },
                    },
                  }}
                >
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Avatar 
                      sx={{ width: "100%", height: "100%", bgcolor: alpha("#0070ff", 0.3) }}
                    >
                      <PersonIcon sx={{ fontSize: 80, color: "#4dc3ff" }} />
                    </Avatar>
                  )}
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{
                    color: "#4dc3ff",
                    borderColor: "#0070ff",
                    fontFamily: "'VT323', monospace",
                    fontSize: "18px",
                    "&:hover": {
                      borderColor: "#4dc3ff",
                      bgcolor: alpha("#0070ff", 0.1),
                      boxShadow: `0 0 10px ${alpha("#0070ff", 0.4)}`,
                    },
                  }}
                >
                  เปลี่ยนรูปภาพ
                </Button>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="ชื่อ-นามสกุล"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" }
                      }}
                      InputProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" },
                        sx: {
                          borderColor: "#0070ff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0070ff",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="อีเมล"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      disabled
                      InputLabelProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" }
                      }}
                      InputProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" },
                        sx: {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0070ff",
                          },
                        }
                      }}
                      helperText="อีเมลไม่สามารถแก้ไขได้"
                      FormHelperTextProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "16px" }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="เบอร์โทรศัพท์"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" }
                      }}
                      InputProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" },
                        sx: {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0070ff",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="ระดับชั้น"
                      name="grade"
                      value={userData.grade}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" }
                      }}
                      InputProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" },
                        sx: {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0070ff",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="โรงเรียน"
                      name="school"
                      value={userData.school}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" }
                      }}
                      InputProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" },
                        sx: {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0070ff",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="เกี่ยวกับฉัน"
                      name="bio"
                      value={userData.bio}
                      onChange={handleInputChange}
                      variant="outlined"
                      multiline
                      rows={4}
                      InputLabelProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" }
                      }}
                      InputProps={{
                        style: { fontFamily: "'VT323', monospace", fontSize: "18px" },
                        sx: {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0070ff",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4dc3ff",
                          },
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      
      case "security":
        return (
          <Box sx={{ mt: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: alpha("#051628", 0.7),
                border: "1px solid #0070ff",
                borderRadius: "8px",
                mb: 3,
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#4dc3ff", 
                  fontFamily: "'VT323', monospace",
                  fontSize: "24px",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LockIcon /> การเข้าถึงบัญชี
              </Typography>
              
              <Typography
                sx={{
                  color: "#78c6ff",
                  fontFamily: "'VT323', monospace",
                  fontSize: "18px",
                  mb: 2,
                }}
              >
                บัญชีของคุณใช้การล็อกอินผ่าน Google ไม่จำเป็นต้องตั้งรหัสผ่านเพิ่มเติม
              </Typography>
              
              <Button
                variant="outlined"
                sx={{
                  color: "#4dc3ff",
                  borderColor: "#0070ff",
                  fontFamily: "'VT323', monospace",
                  fontSize: "18px",
                  mt: 1,
                  "&:hover": {
                    borderColor: "#4dc3ff",
                    bgcolor: alpha("#0070ff", 0.1),
                    boxShadow: `0 0 10px ${alpha("#0070ff", 0.4)}`,
                  },
                }}
              >
                เปลี่ยนวิธีการเข้าสู่ระบบ
              </Button>
            </Paper>
            
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: alpha("#051628", 0.7),
                border: "1px solid #0070ff",
                borderRadius: "8px",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#4dc3ff", 
                  fontFamily: "'VT323', monospace",
                  fontSize: "24px",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <SecurityIcon /> การยืนยันตัวตนแบบสองชั้น
              </Typography>
              
              <Typography
                sx={{
                  color: "#78c6ff",
                  fontFamily: "'VT323', monospace",
                  fontSize: "18px",
                  mb: 2,
                }}
              >
                เพิ่มความปลอดภัยให้กับบัญชีของคุณด้วยการยืนยันตัวตนอีกขั้นตอน
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={false}
                    sx={{ 
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: "#0070ff",
                        '&:hover': {
                          backgroundColor: alpha("#0070ff", 0.1),
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: "#0070ff",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: "#78c6ff" }}>
                    เปิดใช้การยืนยันตัวตนแบบสองชั้น
                  </Typography>
                }
              />
            </Paper>
          </Box>
        );
        
      case "notifications":
        return (
          <Box sx={{ mt: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: alpha("#051628", 0.7),
                border: "1px solid #0070ff",
                borderRadius: "8px",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#4dc3ff", 
                  fontFamily: "'VT323', monospace",
                  fontSize: "24px",
                  mb: 3,
                }}
              >
                การตั้งค่าการแจ้งเตือน
              </Typography>
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={userData.preferences.notifications}
                      onChange={handlePreferenceChange('notifications')}
                      sx={{ 
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: "#0070ff",
                          '&:hover': {
                            backgroundColor: alpha("#0070ff", 0.1),
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: "#0070ff",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: "#78c6ff" }}>
                      แจ้งเตือนเมื่อมีกิจกรรมใหม่
                    </Typography>
                  }
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={true}
                      sx={{ 
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: "#0070ff",
                          '&:hover': {
                            backgroundColor: alpha("#0070ff", 0.1),
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: "#0070ff",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: "#78c6ff" }}>
                      แจ้งเตือนผ่านอีเมล
                    </Typography>
                  }
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={false}
                      sx={{ 
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: "#0070ff",
                          '&:hover': {
                            backgroundColor: alpha("#0070ff", 0.1),
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: "#0070ff",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: "#78c6ff" }}>
                      แจ้งเตือนผ่าน SMS
                    </Typography>
                  }
                />
              </Box>
            </Paper>
          </Box>
        );
        
      case "appearance":
        return (
          <Box sx={{ mt: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: alpha("#051628", 0.7),
                border: "1px solid #0070ff",
                borderRadius: "8px",
                mb: 3,
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#4dc3ff", 
                  fontFamily: "'VT323', monospace",
                  fontSize: "24px",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PaletteIcon /> ธีม
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={userData.preferences.darkMode}
                    onChange={handlePreferenceChange('darkMode')}
                    sx={{ 
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: "#0070ff",
                        '&:hover': {
                          backgroundColor: alpha("#0070ff", 0.1),
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: "#0070ff",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: "#78c6ff" }}>
                    โหมดมืด
                  </Typography>
                }
              />
            </Paper>
            
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: alpha("#051628", 0.7),
                border: "1px solid #0070ff",
                borderRadius: "8px",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#4dc3ff", 
                  fontFamily: "'VT323', monospace",
                  fontSize: "24px",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LanguageIcon /> ภาษา
              </Typography>
              
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant={userData.preferences.language === "th" ? "contained" : "outlined"}
                  sx={{
                    color: userData.preferences.language === "th" ? "#ffffff" : "#4dc3ff",
                    borderColor: "#0070ff",
                    backgroundColor: userData.preferences.language === "th" ? alpha("#0070ff", 0.7) : "transparent",
                    fontFamily: "'VT323', monospace",
                    fontSize: "18px",
                    "&:hover": {
                      borderColor: "#4dc3ff",
                      bgcolor: userData.preferences.language === "th" ? alpha("#0070ff", 0.8) : alpha("#0070ff", 0.1),
                      boxShadow: `0 0 10px ${alpha("#0070ff", 0.4)}`,
                    },
                  }}
                  onClick={() => setUserData({...userData, preferences: {...userData.preferences, language: "th"}})}
                >
                  ไทย
                </Button>
                
                <Button
                  variant={userData.preferences.language === "en" ? "contained" : "outlined"}
                  sx={{
                    color: userData.preferences.language === "en" ? "#ffffff" : "#4dc3ff",
                    borderColor: "#0070ff",
                    backgroundColor: userData.preferences.language === "en" ? alpha("#0070ff", 0.7) : "transparent",
                    fontFamily: "'VT323', monospace",
                    fontSize: "18px",
                    "&:hover": {
                      borderColor: "#4dc3ff",
                      bgcolor: userData.preferences.language === "en" ? alpha("#0070ff", 0.8) : alpha("#0070ff", 0.1),
                      boxShadow: `0 0 10px ${alpha("#0070ff", 0.4)}`,
                    },
                  }}
                  onClick={() => setUserData({...userData, preferences: {...userData.preferences, language: "en"}})}
                >
                  English
                </Button>
              </Box>
            </Paper>
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: { xs: 2, md: 4 },
        position: "relative",
        transform: isGlitching ? "translateX(2px)" : "none",
        transition: "transform 0.1s",
      }}
    >
      {/* Header with back button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Button
          component={Link}
          href="/profile"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#4dc3ff",
            fontFamily: "'VT323', monospace",
            fontSize: "18px",
            "&:hover": {
              bgcolor: alpha("#0070ff", 0.1),
              transform: "translateX(-5px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          กลับไปหน้าโปรไฟล์
        </Button>
      </Box>

      {/* Main title with pixel theme */}
      <Typography
        variant="h4"
        sx={{
          color: "#4dc3ff",
          fontFamily: "'VT323', monospace",
          fontSize: { xs: "32px", md: "40px" },
          position: "relative",
          display: "inline-block",
          mb: 4,
          textShadow: `0 0 10px ${alpha("#4dc3ff", 0.7)}`,
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: 0,
            width: "100%",
            height: "2px",
            background: "linear-gradient(90deg, #0070ff, transparent)",
          },
        }}
      >
        ตั้งค่าโปรไฟล์
      </Typography>

      {/* Main content container */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: alpha("#051628", 0.8),
          borderRadius: "12px",
          border: "2px solid #0070ff",
          overflow: "hidden",
          boxShadow: `0 0 30px ${alpha("#0070ff", 0.3)}`,
          backdropFilter: "blur(10px)",
          position: "relative",
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
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, #0070ff, transparent)",
            opacity: 0.5,
          },
        }}
      >
        {/* Tab navigation */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            borderBottom: `1px solid ${alpha("#0070ff", 0.3)}`,
          }}
        >
          {tabs.map((tab) => (
            <Box
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                py: 2,
                px: 3,
                fontSize: { xs: "18px", md: "20px" },
                fontFamily: "'VT323', monospace",
                color: activeTab === tab.id ? "#ffffff" : "#78c6ff",
                bgcolor: activeTab === tab.id ? alpha("#0070ff", 0.2) : "transparent",
                borderBottom: activeTab === tab.id ? "2px solid #0070ff" : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: alpha("#0070ff", 0.1),
                  color: activeTab === tab.id ? "#ffffff" : "#4dc3ff",
                },
              }}
            >
              {tab.icon}
              {tab.label}
            </Box>
          ))}
        </Box>

        {/* Tab content */}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {renderTabContent()}
        </Box>

        {/* Action buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 3,
            gap: 2,
            borderTop: `1px solid ${alpha("#0070ff", 0.3)}`,
            bgcolor: alpha("#051628", 0.5),
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "#78c6ff",
              fontFamily: "'VT323', monospace",
              fontSize: "18px",
              "&:hover": {
                color: "#ffffff",
                bgcolor: alpha("#0070ff", 0.1),
              },
            }}
          >
            ยกเลิก
          </Button>
          
          <Button
            onClick={handleSaveProfile}
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{
              bgcolor: alpha("#0070ff", 0.7),
              color: "#ffffff",
              fontFamily: "'VT323', monospace",
              fontSize: "18px",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                bgcolor: alpha("#0070ff", 0.9),
                boxShadow: `0 0 15px ${alpha("#0070ff", 0.5)}`,
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: `linear-gradient(to right, transparent, ${alpha("#4dc3ff", 0.3)}, transparent)`,
                transform: "rotate(45deg)",
                transition: "all 0.5s",
                opacity: 0,
              },
              "&:hover::before": {
                opacity: 1,
                left: "100%",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isLoading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </Button>
        </Box>
      </Paper>
      
      {/* Notification snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ 
            fontFamily: "'VT323', monospace",
            fontSize: "18px",
            bgcolor: notification.severity === "success" ? alpha("#4caf50", 0.9) : alpha("#f44336", 0.9),
            color: "#ffffff",
            border: notification.severity === "success" ? "1px solid #2e7d32" : "1px solid #d32f2f",
            borderLeft: notification.severity === "success" ? "4px solid #2e7d32" : "4px solid #d32f2f",
            boxShadow: `0 4px 20px ${alpha("#000000", 0.3)}`,
            '& .MuiAlert-icon': {
              color: "#ffffff"
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}