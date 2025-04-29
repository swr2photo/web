/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // สำหรับ GitHub Pages
  distDir: 'out',
  images: {
    unoptimized: true, // สำหรับ static export
  },
  // ตรวจสอบให้แน่ใจว่า basePath ตรงกับชื่อ repository GitHub ของคุณหากไม่ได้ใช้โดเมนที่กำหนดเอง
  // basePath: '/your-repo-name',
};

module.exports = nextConfig;