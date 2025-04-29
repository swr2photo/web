"use client";

import { usePathname } from "next/navigation";
import PixelNavbar from "@/components/PixelNavbar";
import { useEffect, useState } from "react";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check only valid paths
  const validPaths = ['/', '/curriculum', '/qualifications', '/schedule', '/faq', '/contact'];
  const shouldShowNavbar = pathname ? validPaths.includes(pathname) : false;

  useEffect(() => {
    setMounted(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Always return children during the first render to avoid hydration errors
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {shouldShowNavbar && <PixelNavbar />}
      <main className={isMobile ? "mobile-main" : ""}>
        {children}
      </main>
      
      {/* Mobile-specific styles */}
      <style jsx global>{`
        .mobile-main {
          width: 100%;
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        @media (max-width: 768px) {
          html, body {
            overflow-x: hidden;
            width: 100%;
            position: relative;
          }
          
          /* Force width calculation to include borders and padding */
          * {
            box-sizing: border-box;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}