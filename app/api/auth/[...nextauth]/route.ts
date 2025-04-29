// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// สำหรับ Next.js ที่ deploy บน GitHub Pages (static export)
// เราไม่สามารถใช้ API routes ได้จริงๆ เพราะไม่มีเซิร์ฟเวอร์
// แต่เราต้องมีไฟล์นี้เพื่อให้ NextAuth client-side libraries ทำงานได้

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  // ไม่ต้องมี apiEndpoints เพราะเราจะจัดการทุกอย่างจาก client side
});

export { handler as GET, handler as POST };