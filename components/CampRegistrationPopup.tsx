// components/CampRegistrationPopup.jsx
"use client";

import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Snackbar,
  Alert,
  ThemeProvider,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AlertColor } from '@mui/material';

// สร้าง theme สำหรับ Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Kanit, sans-serif',
  },
});

// สร้าง schema สำหรับ validate ข้อมูล
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('กรุณากรอกชื่อ'),
  lastName: yup
    .string()
    .required('กรุณากรอกนามสกุล'),
  studentId: yup
    .string()
    .required('กรุณากรอกรหัสนักศึกษา')
    .matches(/^\d{8}$/, 'รหัสนักศึกษาต้องเป็นตัวเลข 8 หลัก'),
  faculty: yup
    .string()
    .required('กรุณาเลือกคณะ'),
  phoneNumber: yup
    .string()
    .required('กรุณากรอกเบอร์โทรศัพท์')
    .matches(/^0\d{9}$/, 'เบอร์โทรศัพท์ไม่ถูกต้อง ต้องขึ้นต้นด้วย 0 และมี 10 หลัก'),
  email: yup
    .string()
    .required('กรุณากรอกอีเมล')
    .email('รูปแบบอีเมลไม่ถูกต้อง'),
  lineId: yup
    .string()
    .required('กรุณากรอก LINE ID')
});

// Component ที่จะแสดง popup เมื่อกดปุ่ม
export default function CampRegistrationPopup() {
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor; // Explicitly type severity as AlertColor
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      studentId: '',
      faculty: '',
      phoneNumber: '',
      email: '',
      lineId: ''
    }
  });

  // รายชื่อคณะ
  const faculties = [
    'วิศวกรรมศาสตร์',
    'วิทยาศาสตร์',
    'เทคโนโลยีสารสนเทศ',
    'บริหารธุรกิจ',
    'ศิลปศาสตร์',
    'นิติศาสตร์',
    'แพทยศาสตร์',
    'สถาปัตยกรรมศาสตร์',
    'ครุศาสตร์',
    'อื่นๆ'
  ];

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // จำลองการส่งข้อมูลโดยการ delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // จำลองการตรวจสอบข้อมูลซ้ำ (ในกรณีจริงควรใช้ API call)
      const isDuplicate = false; // สมมติว่าไม่ซ้ำ

      if (isDuplicate) {
        setAlertInfo({
          open: true,
          message: 'ข้อมูลนี้เคยลงทะเบียนแล้ว กรุณาตรวจสอบรหัสนักศึกษาหรืออีเมล',
          severity: 'error',
        });
      } else {
        // สมมติว่าส่งข้อมูลสำเร็จ
        setAlertInfo({
          open: true,
          message: 'ลงทะเบียนสำเร็จ! ขอบคุณที่สมัครเข้าร่วมค่าย',
          severity: 'success',
        });
        reset(); // เคลียร์ฟอร์ม
        handleClose(); // ปิด popup เมื่อส่งข้อมูลสำเร็จ
      }
    } catch (error) {
      setAlertInfo({
        open: true,
        message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        severity: 'error',
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertInfo({
      ...alertInfo,
      open: false
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          สมัครเข้าร่วมค่าย
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          ค่ายพัฒนาทักษะการเขียนโปรแกรม สำหรับนักศึกษาทุกคณะ
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleOpen}
          sx={{ px: 4, py: 1.5, mt: 2 }}
        >
          สมัครเข้าร่วมค่าย
        </Button>

        {/* Dialog Popup */}
        <Dialog 
          open={open} 
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          scroll="paper"
        >
          <DialogTitle>
            ลงทะเบียนเข้าร่วมค่าย
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
              กรุณากรอกข้อมูลให้ครบถ้วนเพื่อสมัครเข้าร่วมกิจกรรม
            </Typography>

            <Box component="form" id="registration-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="ชื่อ"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="นามสกุล"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Controller
                  name="studentId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="รหัสนักศึกษา"
                      error={!!errors.studentId}
                      helperText={errors.studentId?.message}
                      inputProps={{ maxLength: 8 }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Controller
                  name="faculty"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.faculty}>
                      <InputLabel>คณะ</InputLabel>
                      <Select {...field} label="คณะ">
                        {faculties.map((faculty) => (
                          <MenuItem key={faculty} value={faculty}>
                            {faculty}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.faculty?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="เบอร์โทรศัพท์"
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      inputProps={{ maxLength: 10 }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="อีเมล"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Controller
                  name="lineId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="LINE ID"
                      error={!!errors.lineId}
                      helperText={errors.lineId?.message}
                    />
                  )}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleClose} color="inherit">
              ยกเลิก
            </Button>
            <Button 
              type="submit"
              variant="contained"
              form="registration-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'กำลังส่งข้อมูล...' : 'สมัครเข้าร่วมค่าย'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar 
          open={alertInfo.open} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseAlert} 
            severity={alertInfo.severity} 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertInfo.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}