export default function Timeline() {
  return (
    <section className="w-full py-16 bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            กิจกรรมภายในค่าย
          </h2>
          <p className="text-gray-400 text-lg mt-4">
            ดูรายละเอียดกิจกรรมทั้งหมดของค่ายในแต่ละวัน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* วันแรก */}
          <div className="flex flex-col items-center bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
            <div className="bg-[#00dfd8] text-black text-xl py-2 px-4 rounded-full mb-4">
              วันแรก
            </div>
            <h3 className="text-xl font-semibold mb-2">เปิดค่ายและการต้อนรับ</h3>
            <p className="text-gray-400 mb-4">ต้อนรับผู้เข้าร่วมค่ายและเกริ่นนำเกี่ยวกับกิจกรรมต่าง ๆ ที่จะเกิดขึ้นตลอดค่าย</p>
            <p className="text-gray-500 text-sm">เวลา: 09:00 - 12:00</p>
          </div>

          {/* วันที่สอง */}
          <div className="flex flex-col items-center bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
            <div className="bg-[#00dfd8] text-black text-xl py-2 px-4 rounded-full mb-4">
              วันที่สอง
            </div>
            <h3 className="text-xl font-semibold mb-2">การเรียนรู้และปฏิบัติการด้านคอมพิวเตอร์</h3>
            <p className="text-gray-400 mb-4">เรียนรู้วิธีการเขียนโปรแกรมพื้นฐาน และฝึกปฏิบัติจริงในห้องเรียนคอมพิวเตอร์</p>
            <p className="text-gray-500 text-sm">เวลา: 13:00 - 16:00</p>
          </div>

          {/* วันที่สาม */}
          <div className="flex flex-col items-center bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
            <div className="bg-[#00dfd8] text-black text-xl py-2 px-4 rounded-full mb-4">
              วันที่สาม
            </div>
            <h3 className="text-xl font-semibold mb-2">การประกวดโปรเจกต์</h3>
            <p className="text-gray-400 mb-4">การนำเสนอโปรเจกต์ที่พัฒนาขึ้นระหว่างค่าย และการให้คะแนนจากคณะกรรมการ</p>
            <p className="text-gray-500 text-sm">เวลา: 10:00 - 14:00</p>
          </div>

          {/* วันที่สี่ */}
          <div className="flex flex-col items-center bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
            <div className="bg-[#00dfd8] text-black text-xl py-2 px-4 rounded-full mb-4">
              วันที่สี่
            </div>
            <h3 className="text-xl font-semibold mb-2">ปิดค่ายและมอบรางวัล</h3>
            <p className="text-gray-400 mb-4">พิธีปิดค่าย และมอบรางวัลให้กับผู้ที่ชนะการประกวดโปรเจกต์</p>
            <p className="text-gray-500 text-sm">เวลา: 16:00 - 18:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
