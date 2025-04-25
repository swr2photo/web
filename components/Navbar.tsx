"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-black/80 backdrop-blur border-b border-white/10 fixed top-0 z-50 text-white font-[var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/next.svg" alt="Logo" width={28} height={28} />
          <span className="text-lg font-semibold tracking-tight">MyApp</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-[#00dfd8] transition">Home</Link>
          <Link href="/about" className="hover:text-[#00dfd8] transition">About</Link>
          <Link href="/docs" className="hover:text-[#00dfd8] transition">Docs</Link>
          <Link
            href="/login"
            className="ml-4 px-4 py-2 rounded-full bg-[#00dfd8] text-black font-medium hover:bg-opacity-80 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-black/90">
          <Link href="/" className="hover:text-[#00dfd8]">Home</Link>
          <Link href="/about" className="hover:text-[#00dfd8]">About</Link>
          <Link href="/docs" className="hover:text-[#00dfd8]">Docs</Link>
          <Link
            href="/login"
            className="px-4 py-2 mt-2 rounded-full bg-[#00dfd8] text-black font-medium text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
