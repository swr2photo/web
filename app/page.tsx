import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white font-[var(--font-geist-sans)] flex flex-col justify-between items-center px-6 sm:px-12 py-16">
      
      {/* Hero */}
      <main className="flex flex-col items-center text-center gap-10 max-w-2xl">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={160}
          height={36}
          className="dark:invert"
        />

        <div className="text-2xl sm:text-3xl font-semibold leading-snug">
          Build your next project with <span className="text-[#00dfd8]">Next.js</span>
        </div>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          Kickstart your app with the latest Next.js features. Deploy fast, scale instantly, and explore the power of modern web.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00dfd8] text-black font-medium py-3 px-6 rounded-full text-sm sm:text-base hover:bg-opacity-80 transition"
          >
            Deploy on Vercel
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white font-medium py-3 px-6 rounded-full text-sm sm:text-base hover:bg-white/10 transition"
          >
            Read Documentation
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 flex flex-wrap gap-6 text-sm text-gray-400 justify-center">
        <a
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition"
        >
          <Image src="/file.svg" alt="Learn icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition"
        >
          <Image src="/window.svg" alt="Examples icon" width={16} height={16} />
          Templates
        </a>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          nextjs.org →
        </a>
      </footer>
    </div>
  );
}

