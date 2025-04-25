"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  alpha,
  Grid,
  Chip,
  Collapse,
  IconButton,
  Divider,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CodeIcon from "@mui/icons-material/Code";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";

export default function Timeline() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State to track expanded days
  const [expandedDays, setExpandedDays] = useState({
    day1: true,
    day2: false,
    day3: false
  });

  const toggleDay = (day) => {
    setExpandedDays({
      ...expandedDays,
      [day]: !expandedDays[day]
    });
  };

  // Timeline data
  const timelineData = [
    {
      id: "day1",
      date: "22 มิถุนายน 2025",
      title: "วันแรกของค่าย",
      isHighlight: true,
      activities: [
        {
          time: "08:00 - 09:00",
          title: "ลงทะเบียนและรับเอกสาร",
          location: "หอประชุมคณะวิทยาศาสตร์",
          icon: <EventIcon />,
          color: theme.palette.info.main
        },
        {
          time: "09:00 - 10:30",
          title: "พิธีเปิดค่ายและแนะนำวิทยากร",
          location: "ห้องประชุมใหญ่",
          icon: <GroupsIcon />,
          color: theme.palette.secondary.main
        },
        {
          time: "10:45 - 12:00",
          title: "กิจกรรมละลายพฤติกรรม",
          location: "ลานกิจกรรม",
          icon: <GroupsIcon />,
          color: theme.palette.success.main
        },
        {
          time: "12:00 - 13:00",
          title: "พักรับประทานอาหารกลางวัน",
          location: "โรงอาหารคณะวิทยาศาสตร์",
          icon: <AccessTimeIcon />,
          color: theme.palette.warning.main
        },
        {
          time: "13:00 - 16:00",
          title: "อบรมการเขียนโปรแกรมเบื้องต้น",
          location: "ห้องปฏิบัติการคอมพิวเตอร์ 1",
          icon: <CodeIcon />,
          color: theme.palette.primary.main
        }
      ]
    },
    {
      id: "day2",
      date: "23 มิถุนายน 2025",
      title: "วันพัฒนาทักษะ",
      activities: [
        {
          time: "09:00 - 10:30",
          title: "อบรมการพัฒนาเว็บไซต์",
          location: "ห้องปฏิบัติการคอมพิวเตอร์ 2",
          icon: <CodeIcon />,
          color: theme.palette.primary.main
        },
        {
          time: "10:45 - 12:00",
          title: "ฝึกปฏิบัติการเขียนโค้ด HTML และ CSS",
          location: "ห้องปฏิบัติการคอมพิวเตอร์ 2",
          icon: <CodeIcon />,
          color: theme.palette.primary.dark
        },
        {
          time: "12:00 - 13:00",
          title: "พักรับประทานอาหารกลางวัน",
          location: "โรงอาหารคณะวิทยาศาสตร์",
          icon: <AccessTimeIcon />,
          color: theme.palette.warning.main
        },
        {
          time: "13:00 - 16:00",
          title: "แบ่งกลุ่มทำ Workshop",
          location: "หลายห้องตามกลุ่มกิจกรรม",
          icon: <GroupsIcon />,
          color: theme.palette.secondary.dark
        }
      ]
    },
    {
      id: "day3",
      date: "24 มิถุนายน 2025",
      title: "วันนำเสนอผลงาน",
      activities: [
        {
          time: "09:00 - 10:30",
          title: "เตรียมนำเสนอผลงาน",
          location: "ห้องปฏิบัติการคอมพิวเตอร์",
          icon: <SchoolIcon />,
          color: theme.palette.secondary.main
        },
        {
          time: "10:45 - 12:00",
          title: "นำเสนอผลงานกลุ่ม",
          location: "ห้องประชุมใหญ่",
          icon: <GroupsIcon />,
          color: theme.palette.success.dark
        },
        {
          time: "12:00 - 13:00",
          title: "พักรับประทานอาหารกลางวัน",
          location: "โรงอาหารคณะวิทยาศาสตร์",
          icon: <AccessTimeIcon />,
          color: theme.palette.warning.main
        },
        {
          time: "13:00 - 15:00",
          title: "กิจกรรมแนะแนวการศึกษาต่อ",
          location: "ห้องประชุมใหญ่",
          icon: <SchoolIcon />,
          color: theme.palette.info.dark
        },
        {
          time: "15:00 - 16:00",
          title: "พิธีปิดค่ายและมอบเกียรติบัตร",
          location: "หอประชุมคณะวิทยาศาสตร์",
          icon: <EventIcon />,
          color: theme.palette.error.main
        }
      ]
    }
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: "900px", mx: "auto", mb: { xs: 10, md: 4 } }}>
      <Grid container spacing={3}>
        {timelineData.map((day, index) => (
          <Grid item xs={12} key={day.id}>
            <Paper
              elevation={day.isHighlight ? 6 : 3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                transition: "all 0.3s ease",
                border: day.isHighlight 
                  ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}` 
                  : `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                position: "relative",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 10px 20px -10px ${alpha(theme.palette.primary.main, 0.3)}`
                }
              }}
            >
              {/* Day Header */}
              <Box
                sx={{
                  p: 2.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: day.isHighlight 
                    ? `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.background.paper, 0.7)})`
                    : alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: "blur(8px)",
                  borderBottom: expandedDays[day.id] 
                    ? `1px solid ${alpha(theme.palette.divider, 0.2)}` 
                    : "none",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <EventIcon 
                      fontSize="small" 
                      sx={{ color: day.isHighlight ? theme.palette.primary.main : "text.secondary" }} 
                    />
                    <Typography 
                      variant="body2" 
                      color={day.isHighlight ? "primary" : "text.secondary"}
                    >
                      {day.date}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {day.title}
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip 
                    size="small" 
                    label={`${day.activities.length} กิจกรรม`} 
                    color={day.isHighlight ? "primary" : "default"}
                    variant="outlined"
                  />
                  <IconButton
                    onClick={() => toggleDay(day.id)}
                    sx={{
                      transform: expandedDays[day.id] ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "all 0.3s",
                    }}
                    size="small"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>
              </Box>
              
              {/* Day Content */}
              <Collapse in={expandedDays[day.id]}>
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <Box
                    sx={{
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: { xs: "16px", md: "20px" },
                        top: 0,
                        height: "100%",
                        width: "2px",
                        background: `linear-gradient(to bottom, ${alpha(theme.palette.divider, 0)}, ${alpha(theme.palette.primary.main, 0.5)}, ${alpha(theme.palette.divider, 0)})`,
                        zIndex: 0
                      }
                    }}
                  >
                    {day.activities.map((activity, actIndex) => (
                      <Box key={actIndex}>
                        <Box 
                          sx={{ 
                            display: "flex", 
                            gap: { xs: 2, md: 3 },
                            mb: actIndex === day.activities.length - 1 ? 0 : 3
                          }}
                        >
                          {/* Time indicator */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              minWidth: { xs: "32px", md: "40px" },
                              zIndex: 1
                            }}
                          >
                            <Box
                              sx={{
                                width: { xs: "32px", md: "40px" },
                                height: { xs: "32px", md: "40px" },
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: alpha(activity.color, 0.15),
                                color: activity.color,
                                border: `2px solid ${alpha(activity.color, 0.3)}`,
                                boxShadow: `0 0 0 4px ${alpha(theme.palette.background.paper, 0.7)}`,
                              }}
                            >
                              {activity.icon}
                            </Box>
                          </Box>
                          
                          {/* Activity content */}
                          <Box sx={{ flex: 1 }}>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: 1, 
                                mb: 0.5,
                                fontWeight: 500
                              }}
                            >
                              <AccessTimeIcon fontSize="small" />
                              {activity.time}
                            </Typography>
                            
                            <Typography variant="subtitle1" fontWeight={600}>
                              {activity.title}
                            </Typography>
                            
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: 1, 
                                mt: 1 
                              }}
                            >
                              <LocationOnIcon 
                                fontSize="small" 
                                sx={{ color: "text.secondary", opacity: 0.8 }} 
                              />
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                              >
                                {activity.location}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        
                        {actIndex < day.activities.length - 1 && (
                          <Box sx={{ display: { xs: "none", md: "block" } }}>
                            <Divider sx={{ my: 3, ml: 10, opacity: 0.5 }} />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}