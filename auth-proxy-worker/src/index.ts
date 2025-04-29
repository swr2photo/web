// src/index.js
import { Router } from 'itty-router';

// สร้าง router ใหม่
const router = Router();

// กำหนดตัวแปรสภาพแวดล้อมใน Cloudflare
// GOOGLE_CLIENT_ID
// GOOGLE_CLIENT_SECRET
// JWT_SECRET
// NEXTAUTH_URL (URL ของ GitHub Pages ของคุณ)
// WORKER_URL (URL worker ของคุณ)

// เก็บสถานะและข้อมูลผู้ใช้ (ในการผลิตควรพิจารณาใช้ KV หรือ Durable Objects)
const AUTH_STORE = {};

// จัดการเส้นทาง API ของ NextAuth
router.get('/api/auth/csrf', async (request) => {
  const csrfToken = crypto.randomUUID();
  
  return new Response(JSON.stringify({ csrfToken }), {
    headers: { 'Content-Type': 'application/json' }
  });
});

router.get('/api/auth/providers', async (request) => {
  const providers = {
    google: {
      id: "google",
      name: "Google",
      type: "oauth",
      signinUrl: `${WORKER_URL}/api/auth/signin/google`,
      callbackUrl: `${WORKER_URL}/api/auth/callback/google`
    }
  };
  
  return new Response(JSON.stringify(providers), {
    headers: { 'Content-Type': 'application/json' }
  });
});

router.get('/api/auth/signin/google', async (request) => {
  const url = new URL(request.url);
  const callbackUrl = url.searchParams.get('callbackUrl') || NEXTAUTH_URL;
  
  // สร้างพารามิเตอร์ state สำหรับความปลอดภัย
  const state = crypto.randomUUID();
  AUTH_STORE[state] = { callbackUrl };
  
  // สร้าง URL Google OAuth
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  googleAuthUrl.searchParams.set('redirect_uri', `${WORKER_URL}/api/auth/callback/google`);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'openid email profile');
  googleAuthUrl.searchParams.set('state', state);
  googleAuthUrl.searchParams.set('prompt', 'select_account');
  
  return Response.redirect(googleAuthUrl.toString(), 302);
});

router.get('/api/auth/callback/google', async (request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  
  if (!code || !state || !AUTH_STORE[state]) {
    return new Response('Invalid request', { status: 400 });
  }
  
  const { callbackUrl } = AUTH_STORE[state];
  delete AUTH_STORE[state];
  
  // แลกโค้ดเพื่อรับโทเค็น
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${WORKER_URL}/api/auth/callback/google`,
      grant_type: 'authorization_code'
    })
  });
  
  const tokens = await tokenResponse.json();
  
  if (!tokens.access_token) {
    return new Response('Failed to get tokens', { status: 400 });
  }
  
  // รับข้อมูลผู้ใช้
  const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { 'Authorization': `Bearer ${tokens.access_token}` }
  });
  
  const userInfo = await userInfoResponse.json();
  
  // สร้างเซสชัน
  const sessionToken = crypto.randomUUID();
  const session = {
    user: {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.picture
    },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    accessToken: tokens.access_token
  };
  
  AUTH_STORE[sessionToken] = session;
  
  // ตั้งค่าคุกกี้และเปลี่ยนเส้นทางกลับไปยังแอป
  const cookieValue = `next-auth.session-token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`;
  
  return new Response(null, {
    status: 302,
    headers: {
      'Location': callbackUrl,
      'Set-Cookie': cookieValue
    }
  });
});

router.get('/api/auth/session', async (request) => {
  const cookies = request.headers.get('Cookie') || '';
  const sessionToken = cookies.match(/next-auth\.session-token=([^;]+)/)?.[1];
  
  if (!sessionToken || !AUTH_STORE[sessionToken]) {
    return new Response(JSON.stringify({ user: null }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const session = AUTH_STORE[sessionToken];
  
  return new Response(JSON.stringify(session), {
    headers: { 'Content-Type': 'application/json' }
  });
});

// เส้นทางออกจากระบบ
router.get('/api/auth/signout', async (request) => {
  const cookies = request.headers.get('Cookie') || '';
  const sessionToken = cookies.match(/next-auth\.session-token=([^;]+)/)?.[1];
  
  if (sessionToken && AUTH_STORE[sessionToken]) {
    delete AUTH_STORE[sessionToken];
  }
  
  return new Response(null, {
    status: 302,
    headers: {
      'Location': NEXTAUTH_URL,
      'Set-Cookie': 'next-auth.session-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
    }
  });
});

// จัดการคำขอ CORS preflight
router.options('*', async (request) => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': NEXTAUTH_URL,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
});

// เพิ่มส่วนหัว CORS ให้กับทุกการตอบสนอง
const addCorsHeaders = (response) => {
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Access-Control-Allow-Origin', NEXTAUTH_URL);
  newHeaders.set('Access-Control-Allow-Credentials', 'true');
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
};

// 404 สำหรับทุกอย่างอื่น
router.all('*', () => new Response('Not Found', { status: 404 }));

// เชื่อมต่อตัวจัดการเส้นทางกับ worker
export default {
  async fetch(request, env, ctx) {
    // ตั้งค่าตัวแปรสภาพแวดล้อม
    GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
    GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
    JWT_SECRET = env.JWT_SECRET;
    NEXTAUTH_URL = env.NEXTAUTH_URL;
    WORKER_URL = env.WORKER_URL;
    
    // จัดการคำขอด้วย router ของเรา
    const response = await router.handle(request);
    
    // เพิ่มส่วนหัว CORS ให้กับการตอบสนอง
    return addCorsHeaders(response);
  }
};