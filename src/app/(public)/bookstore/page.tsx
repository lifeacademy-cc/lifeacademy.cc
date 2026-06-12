import { BookOpen, Star, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ร้านหนังสือ — LIFE Academy',
  description: 'ร้านหนังสือ LIFE Academy คลังหนังสือติวสอบ แบบฝึกหัดเข้มข้น และหนังสือสรุปสูตรวิชาคณิตศาสตร์ วิทยาศาสตร์ ภาษาอังกฤษ สำหรับนักเรียนประถมและมัธยม',
}

interface Book {
  id: string
  title: string
  subject: 'math' | 'science' | 'english' | 'thai'
  level: string
  price: number
  originalPrice: number
  description: string
  features: string[]
  badge?: string
  bgColor: string
}

const mockBooks: Book[] = [
  {
    id: 'b1',
    title: 'ตะลุยโจทย์คณิตศาสตร์ ม.1 (SMA & SMT)',
    subject: 'math',
    level: 'ประถมศึกษาปีที่ 6 (สอบเข้า ม.1)',
    price: 350,
    originalPrice: 420,
    description: 'รวบรวมแนวข้อสอบคณิตศาสตร์เข้า ม.1 ห้องเรียนพิเศษ โรงเรียนดังทั่วภาคใต้ กว่า 500 ข้อ พร้อมเฉลยละเอียดและเทคนิคคิดลัด',
    features: ['คัดสรรโจทย์จากข้อสอบจริงย้อนหลัง 10 ปี', 'เฉลยวิธีทำอย่างละเอียดทุกข้อ', 'เทคนิคคิดลัดช่วยประหยัดเวลาสอบ'],
    badge: 'Best Seller',
    bgColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'b2',
    title: 'Ultimate English Grammar ม.ต้น มั่นใจ 100%',
    subject: 'english',
    level: 'มัธยมศึกษาปีที่ 1–3',
    price: 290,
    originalPrice: 350,
    description: 'สรุปโครงสร้างไวยากรณ์ภาษาอังกฤษระดับมัธยมศึกษาตอนต้นอย่างเข้าใจง่าย มีภาพประกอบและตารางเปรียบเทียบช่วยความจำ',
    features: ['ครอบคลุม Tenses ทั้งหมดและ Grammars สอบบ่อย', 'แบบทดสอบประเมินย่อยกว่า 20 ชุดพร้อมเฉลย', 'คำศัพท์ที่ออกสอบบ่อยในการแข่งระดับภาค'],
    badge: 'Popular',
    bgColor: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'b3',
    title: 'พิชิตข้อสอบวิทยาศาสตร์ ม.4 (ฟิสิกส์ เคมี ชีวะ)',
    subject: 'science',
    level: 'มัธยมศึกษาปีที่ 3 (สอบเข้า ม.4)',
    price: 380,
    originalPrice: 450,
    description: 'หนังสือคู่มือเตรียมสอบวิชาวิทยาศาสตร์สำหรับสอบเข้า ม.4 โรงเรียนวิทยาศาสตร์ภูมิภาคและโรงเรียนชั้นนำ เน้นจุดผิดบ่อย',
    features: ['สรุปเนื้อหาสำคัญ 3 วิชา ฟิสิกส์-เคมี-ชีววิทยา', 'แนวข้อสอบเสมือนจริงตามสัดส่วนข้อสอบรอบล่าสุด', 'สรุปสูตรลัดและ Map ความจำก่อนเข้าห้องสอบ'],
    bgColor: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'b4',
    title: 'เก่งภาษาไทยประถมปลาย (เตรียมสอบ ม.1)',
    subject: 'thai',
    level: 'ประถมศึกษาปีที่ 4–6',
    price: 240,
    originalPrice: 290,
    description: 'คู่มือเสริมทักษะภาษาไทย สรุปหลักภาษา การสะกดคำ และการอ่านจับใจความสำคัญ เพื่อให้พร้อมสำหรับทุกสนามสอบ',
    features: ['รวมหลักภาษาน่ารู้และคำประพันธ์ที่มักออกสอบ', 'แบบฝึกหัดท้ายบทเพื่อทบทวนความพร้อม', 'แถมสรุปย่อฉบับพกพา'],
    bgColor: 'from-rose-500 to-red-600',
  },
]

export default function BookstorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-20 px-4 relative overflow-hidden text-center text-white">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#f59e0b]/10 blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            LIFE ACADEMY BOOKSTORE
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            คลังหนังสือติวสอบและแบบฝึกหัด
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            หนังสือและแบบฝึกหัดคุณภาพสูง เรียบเรียงและเขียนโดยทีมคุณครูผู้เชี่ยวชาญของ LIFE Academy เพื่อผลสัมฤทธิ์ที่ดีที่สุดของนักเรียน
          </p>
        </div>
      </section>

      {/* Book Catalog Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12 space-y-2">
            <span className="section-tag mx-auto">หนังสือแนะนำ</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0f2557]">หนังสือติวคุณภาพยอดนิยม</h2>
            <p className="font-thai text-[#64748b] text-sm max-w-md mx-auto">
              สั่งซื้อง่ายผ่านไลน์ มีบริการจัดส่งทั่วประเทศ หรือรับหนังสือได้โดยตรงที่สถาบัน LIFE Academy หาดใหญ่
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mockBooks.map(book => (
              <div 
                key={book.id}
                className="bg-white rounded-3xl border border-[#e2e8f0] p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 shadow-sm overflow-hidden"
              >
                {/* Book Cover Design (Premium Visual Accent) */}
                <div className={`w-full sm:w-44 aspect-[3/4] rounded-2xl bg-gradient-to-br ${book.bgColor} text-white p-5 flex flex-col justify-between shadow-md relative flex-shrink-0 select-none overflow-hidden group`}>
                  {/* Glowing light overlay */}
                  <div className="absolute top-0 left-0 w-full h-full bg-white/5 group-hover:left-full transition-all duration-1000 -skew-x-12" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-ui font-bold tracking-widest uppercase opacity-85">LIFE ACADEMY</span>
                    <BookOpen className="w-4 h-4 opacity-80" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-base leading-snug tracking-wide line-clamp-3">
                      {book.title}
                    </h3>
                    <div className="w-8 h-1 bg-white/80 rounded" />
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-thai font-semibold bg-white/20 px-2 py-0.5 rounded-full">{book.level}</span>
                    <span className="font-ui font-extrabold text-lg">฿{book.price}</span>
                  </div>

                  {book.badge && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white font-ui font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                      {book.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#f0f4ff] text-[#1a56db] font-thai text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {book.subject === 'math' ? 'คณิตศาสตร์' : book.subject === 'science' ? 'วิทยาศาสตร์' : book.subject === 'english' ? 'ภาษาอังกฤษ' : 'ภาษาไทย'}
                    </span>
                    <h3 className="font-ui font-bold text-lg text-[#0f2557] leading-snug">{book.title}</h3>
                    <div className="font-thai text-slate-500 text-xs tracking-tight line-clamp-1">🎯 สำหรับ: {book.level}</div>
                    <p className="font-thai text-[#64748b] text-xs leading-relaxed line-clamp-3 pt-1">
                      {book.description}
                    </p>
                    <ul className="pt-2 space-y-1.5">
                      {book.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] font-thai text-slate-700">
                          <span className="text-[#1a56db] mt-0.5">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-xs line-through font-ui">฿{book.originalPrice}</span>
                      <span className="text-[#1a56db] font-ui font-black text-xl ml-1.5">฿{book.price}</span>
                    </div>
                    <a 
                      href="https://lin.ee/xvYZMZP" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary py-2 px-4 text-xs font-semibold inline-flex items-center gap-1.5 rounded-xl"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> สั่งซื้อผ่านไลน์
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Special Order Banner */}
          <div className="mt-16 bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-md">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 max-w-xl relative z-10 text-center md:text-left">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                มีสิทธิพิเศษสำหรับนักเรียนในสถาบัน
              </h3>
              <p className="font-thai text-white/70 text-sm leading-relaxed">
                นักเรียนที่ลงทะเบียนคอร์สเรียน onsite หรือ online ของ LIFE Academy จะได้รับเอกสารประกอบการเรียนและหนังสือบางเล่มฟรีตามสิทธิ์ของคอร์สนั้นๆ
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10 flex-shrink-0">
              <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none text-white py-3 px-6 text-sm flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> สอบถามสิทธิ์นักเรียน
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
