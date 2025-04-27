"use client";

import { usePathname } from "next/navigation";
import PixelNavbar from "@/components/PixelNavbar";
import { useEffect, useState } from "react";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Check only valid paths
  const validPaths = ['/', '/curriculum', '/qualifications', '/schedule', '/faq', '/contact'];
  const shouldShowNavbar = pathname ? validPaths.includes(pathname) : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always return children during the first render to avoid hydration errors
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {shouldShowNavbar && <PixelNavbar />}
      <div style={{ paddingTop: shouldShowNavbar ? "80px" : 0 }}>
        {children}
      </div>
    </>
  );
}