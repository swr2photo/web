'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full border-t border-white/10 py-6 text-center text-sm bg-black/80 backdrop-blur mt-8 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)] ring-1 ring-white/10"
    >
      {/* Glowing Gradient Layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-10 blur-2xl"
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/70">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>

        <div className="flex gap-4 text-white/60 items-center">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>

          {/* Icons with hover ripple effect */}
          {[
            { href: "https://github.com", icon: <GitHubIcon /> },
            { href: "https://instagram.com", icon: <InstagramIcon /> },
            { href: "https://facebook.com", icon: <FacebookIcon /> },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-2 rounded-full transition duration-300 hover:text-white"
            >
              <span className="absolute inset-0 scale-0 group-hover:scale-150 transition-transform bg-white/10 rounded-full"></span>
              <span className="relative z-10">{item.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
