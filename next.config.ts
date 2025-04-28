/** @type {import('next').NextConfig} */
const nextConfig = {
  // เปลี่ยนจาก output: 'export' เป็นการใช้ server
  output: 'export', // ถ้ามีบรรทัดนี้ ให้คอมเมนต์หรือลบออก

  images: {
    domains: ['lh3.googleusercontent.com'], // อนุญาตโดเมนรูปภาพ Google
    // ถ้ามี unoptimized: true ให้ลบออกหรือเปลี่ยนเป็น false
    // unoptimized: true,
  },
};

module.exports = nextConfig;