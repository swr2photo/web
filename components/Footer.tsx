import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-6 text-center text-sm text-muted-foreground bg-black/80 backdrop-blur mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/70">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <div className="flex gap-4 text-white/60">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="https://github.com/" target="_blank" className="hover:underline">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
