import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white px-6 py-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#00dfd8]">404</h1>
        <p className="text-2xl sm:text-3xl mt-4 font-semibold">
          ขอโทษ! หน้าเว็บที่คุณค้นหาไม่พบ.
        </p>
        <p className="text-lg text-gray-400 mt-2">
          หน้าเว็บที่คุณกำลังมองหาอาจจะถูกลบ หรือไม่เคยมีมาก่อน.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="bg-[#00dfd8] text-black font-medium py-3 px-6 rounded-full text-lg hover:bg-opacity-80 transition"
          >
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
