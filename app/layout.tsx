import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PSU SciCamp - Coming Soon",
  description: "PSU SciCamp ค่ายคอมพิวเตอร์ คณะวิทยาศาสตร์ มหาวิทยาลัยสงขลานครินทร์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
        style={{ margin: 0, padding: 0, backgroundColor: "#051628" }}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}