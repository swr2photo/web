// ไฟล์: components/FAQAccordion.tsx
"use client";

import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
  Paper,
  alpha,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: "ค่ายเปิดรับสมัครถึงวันไหนคะ",
    answer: "ค่ายของเราเปิดรับสมัครตั้งแต่วันนี้ถึงวันที่ 15 พฤษภาคม 2025 หรือจนกว่าจะมีผู้สมัครครบตามจำนวนที่กำหนด"
  },
  {
    question: "ถ้าเรียนเตรียมวิศวะอยู่ สมัครค่ายนี้ได้ไหมครับ",
    answer: "ได้ครับ นักเรียนระดับมัธยมศึกษาตอนปลายทุกคนสามารถสมัครเข้าร่วมค่ายได้ ไม่ว่าจะอยู่สายการเรียนใดก็ตาม"
  },
  {
    question: "กรณีเป็นเด็กต่างจังหวัด พอจะมีคำแนะนำในการเดินทางมาค่ายไหมครับ",
    answer: (
      <>
        <Typography>สำหรับน้องๆ ที่มาจากต่างจังหวัด สามารถเดินทางมาได้หลายวิธี:</Typography>
        <ul>
          <li>รถไฟฟ้า BTS/MRT มาลงที่สถานีใกล้มหาวิทยาลัย</li>
          <li>รถโดยสารประจำทางสาย 24, 39, 59, 104, 510</li>
          <li>ทางค่ายมีจุดนัดพบหน้ามหาวิทยาลัยและมีพี่ค่ายคอยให้คำแนะนำในการเดินทาง</li>
        </ul>
        <Typography>หากมีข้อสงสัยเพิ่มเติมเกี่ยวกับการเดินทาง สามารถติดต่อได้ที่ Line Official: @campofficial</Typography>
      </>
    )
  },
  {
    question: "รูปแบบการจัดค่ายเป็นแบบ Onsite หรือเปล่าคะ",
    answer: "ค่ายของเราจัดในรูปแบบ Onsite เต็มรูปแบบ ณ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยของเรา เพื่อให้น้องๆ ได้สัมผัสบรรยากาศจริงและได้เรียนรู้ร่วมกันอย่างเต็มที่"
  },
  {
    question: "ถ้าไม่มีพื้นฐานทางด้านคอมพิวเตอร์ สามารถสมัครได้ไหมครับ",
    answer: "สมัครได้แน่นอนครับ ค่ายของเราออกแบบมาสำหรับผู้เริ่มต้น ไม่จำเป็นต้องมีพื้นฐานทางด้านคอมพิวเตอร์มาก่อน พี่ๆ จะสอนตั้งแต่พื้นฐานเลยครับ"
  },
  {
    question: "ต้องขอเอกสารจากทางโรงเรียนไหมคะ",
    answer: "ไม่จำเป็นต้องมีเอกสารจากทางโรงเรียนครับ เพียงแค่นำบัตรประจำตัวนักเรียนหรือบัตรประชาชนมาในวันค่ายก็เพียงพอแล้ว"
  },
  {
    question: "ในการกรอกเกรดเพื่อทำการสมัครค่าย จะต้องกรอกเกรดเทอมล่าสุด (GPA) หรือเกรดเฉลี่ยสะสม (GPAX) คะ",
    answer: "ให้กรอกเกรดเฉลี่ยสะสม (GPAX) ล่าสุดนะคะ เพื่อให้ทางทีมงานสามารถประเมินได้ครบถ้วน"
  },
  {
    question: "ค่ายนี้รับจำนวนกี่คน และสมัครก่อนมีสิทธิ์ก่อนหรือเปล่าคะ",
    answer: "ค่ายของเรารับนักเรียนทั้งหมด 60 คน โดยเราพิจารณาจากคุณสมบัติและคำตอบในใบสมัคร ไม่ได้ใช้ระบบสมัครก่อนมีสิทธิ์ก่อน ดังนั้นน้องๆ สามารถใช้เวลาในการกรอกใบสมัครได้อย่างเต็มที่"
  },
  {
    question: "ค่ายนี้มีเรียนอะไรบ้างครับ",
    answer: (
      <>
        <Typography>ค่ายของเราครอบคลุมเนื้อหาหลากหลาย ได้แก่:</Typography>
        <ul>
          <li>พื้นฐานการเขียนโปรแกรม</li>
          <li>การออกแบบและพัฒนาเว็บไซต์</li>
          <li>การเขียนโปรแกรมด้วย Python</li>
          <li>พื้นฐาน Data Science</li>
          <li>workshop สร้างโปรเจคจริง</li>
          <li>กิจกรรมสร้างเครือข่ายและทำงานเป็นทีม</li>
        </ul>
      </>
    )
  },
  {
    question: "ค่ายนี้ต้องค้างคืนไหมคะ แล้วพักที่ไหนคะ",
    answer: "ค่ายของเราเป็นค่ายค้างคืน 3 วัน 2 คืน โดยทางค่ายจัดที่พักให้ที่หอพักภายในมหาวิทยาลัย มีพี่ๆ ดูแลตลอด 24 ชั่วโมง ไม่ต้องกังวลเรื่องความปลอดภัยนะคะ"
  },
  {
    question: "ในการเข้าค่ายนี้ จะได้รับเกียรติบัตรไหมครับ",
    answer: "ผู้เข้าร่วมค่ายทุกคนจะได้รับเกียรติบัตรการเข้าร่วมค่าย ซึ่งสามารถนำไปใช้เป็นแฟ้มสะสมผลงานหรือประกอบการสมัครเข้ามหาวิทยาลัยได้ครับ"
  },
  {
    question: "ค่ายนี้มีเกณฑ์ในการรับคนอย่างไรบ้างคะ",
    answer: "เกณฑ์การรับสมัครพิจารณาจากความสนใจและความตั้งใจของน้องๆ ผ่านคำตอบในใบสมัคร โดยไม่ได้เน้นที่ผลการเรียนหรือประสบการณ์เดิม แต่เน้นที่ทัศนคติและความกระตือรือร้นในการเรียนรู้"
  }
];

const FAQAccordion: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, gap: 1.5 }}>
          <QuestionAnswerOutlinedIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold' }}>
            คำถามที่พบบ่อย (FAQs)
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          {faqData.map((faq, index) => (
            <Accordion 
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{ 
                mb: 1,
                '&:before': { display: 'none' },
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                borderRadius: '8px !important',
                overflow: 'hidden',
                '&.Mui-expanded': {
                  boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
                  background: alpha(theme.palette.primary.light, 0.1),
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  '&.Mui-expanded': {
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }
                }}
              >
                <Typography sx={{ fontWeight: 500, color: expanded === `panel${index}` ? theme.palette.primary.main : 'inherit' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 2, pb: 3, px: 3 }}>
                {typeof faq.answer === 'string' ? (
                  <Typography>{faq.answer}</Typography>
                ) : (
                  faq.answer
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        <Box sx={{ mt: 4, textAlign: 'center', p: 2, bgcolor: alpha(theme.palette.primary.light, 0.1), borderRadius: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            ยังมีข้อสงสัยเพิ่มเติม?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ติดต่อเราได้ที่ Line Official: <Box component="span" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>@campofficial</Box> หรืออีเมล: <Box component="span" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>camp@example.ac.th</Box>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default FAQAccordion;