// lib/auth.ts
'use client';

// แทนที่ด้วย URL ของ Worker ของคุณ
const WORKER_URL = 'https://auth-proxy.doralaikon-th.workers.dev';

export async function signInWithGoogle(callbackUrl: string = window.location.origin) {
  // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบของ Google ผ่าน Worker
  window.location.href = `${WORKER_URL}/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}

export async function signOut() {
  // เปลี่ยนเส้นทางไปยังเส้นทางออกจากระบบ Worker
  window.location.href = `${WORKER_URL}/api/auth/signout`;
}

export async function getSession() {
  try {
    const response = await fetch(`${WORKER_URL}/api/auth/session`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      return { user: null };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get session:', error);
    return { user: null };
  }
}