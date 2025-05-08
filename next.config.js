const withCloudflarePages = require('@cloudflare/next-on-pages');

module.exports = withCloudflarePages({
  target: 'serverless', // เป็นการตั้งค่าที่จำเป็นสำหรับการ deploy บน Cloudflare Workers
  // การตั้งค่าอื่น ๆ ของ Next.js ที่คุณอาจต้องการ
});
