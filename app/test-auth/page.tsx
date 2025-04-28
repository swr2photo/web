'use client';

import { signIn } from 'next-auth/react';

export default function TestAuth() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ทดสอบการล็อกอิน</h1>
      <button 
        onClick={() => signIn('google')}
        style={{ padding: '10px' }}
      >
        ล็อกอินด้วย Google
      </button>
    </div>
  );
}
