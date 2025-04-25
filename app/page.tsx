import Image from "next/image";
import Link from "next/link";
import Timeline from "@/components/Timeline"; // นำเข้า Component Timeline

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white font-[var(--font-geist-sans)] flex flex-col justify-between items-center px-6 sm:px-12 py-16">
      
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center gap-10 max-w-2xl">
        <Image
          src="/camp-logo.svg"
          alt="Camp Logo"
          width={120}
          height={120}
          className="rounded-full border border-white/10 shadow-lg"
        />
        <div className="text-3xl sm:text-4xl font-bold leading-snug">
          ค่ายคอม PSU SciCamp
        </div>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          ยินดีต้อนรับสู่ค่ายคอมพิวเตอร์ คณะวิทยาศาสตร์ ม.อ.  
          <br />
          เรียนรู้ พัฒนา สร้างแรงบันดาลใจ และเติบโตไปด้วยกัน
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/register"
            className="bg-[#00dfd8] text-black font-medium py-3 px-6 rounded-full text-sm sm:text-base hover:bg-opacity-80 transition"
          >
            สมัครเข้าค่าย
          </Link>
          <Link
            href="/about"
            className="border border-white/20 text-white font-medium py-3 px-6 rounded-full text-sm sm:text-base hover:bg-white/10 transition"
          >
            รายละเอียดค่าย
          </Link>
        </div>
      </main>

      {/* Timeline Section */}
      <Timeline /> {/* เพิ่มบรรทัดนี้เพื่อแสดง Timeline ของกิจกรรมค่าย */}
      
    </div>
  );
}
