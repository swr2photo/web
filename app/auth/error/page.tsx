// app/auth/error/page.tsx (Server Component)
import { Suspense } from 'react';
import ErrorComponent from '@/components/ErrorComponent';
export default function ErrorPage() {
  return (
    <div>
      <h1>Error Page</h1>
      {/* ห่อหุ้ม ErrorComponent ด้วย Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorComponent />
      </Suspense>
    </div>
  );
}
