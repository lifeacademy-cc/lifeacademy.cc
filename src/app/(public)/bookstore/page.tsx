import { BookOpen, Star, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ร้านหนังสือเตรียมสอบเข้า ม.1 — LIFE Academy',
  description: 'รวมหนังสือเตรียมสอบยอดนิยมจาก LIFE ACADEMY สำหรับเตรียมสอบเข้า ม.1 ห้องเรียนพิเศษ โรงเรียนดัง โครงการ Gifted / มอ.วิทยานุสรณ์ พร้อมคอร์สเรียนและคลิปเฉลยในเล่ม',
}

interface Book {
  id: string
  title: string
  subject: 'math' | 'science' | 'english' | 'thai' | 'general'
  level: string
  price: number
  originalPrice: number
  description: string
  features: string[]
  badge?: string
  image: string
}

const actualBooks: Book[] = [
  {
    id: 'math-sma',
    title: 'ตะลุยโจทย์คณิตศาสตร์ ม.1 (SMA & SMT)',
    subject: 'math',
    level: 'ประถมศึกษาปีที่ 6 (สอบเข้า ม.1)',
    price: 350,
    originalPrice: 420,
    description: 'รวบรวมแนวข้อสอบคณิตศาสตร์เข้า ม.1 ห้องเรียนพิเศษ โรงเรียนดังทั่วภาคใต้ กว่า 500 ข้อ พร้อมเฉลยละเอียดและเทคนิคคิดลัด เหมาะสำหรับน้องที่เตรียมสอบเข้า SMA, SMT และห้องเรียนพิเศษทุกสนาม',
    features: [
      'คัดสรรโจทย์จากข้อสอบจริงย้อนหลัง 10 ปี กว่า 500 ข้อ',
      'เฉลยวิธีทำอย่างละเอียดทุกข้อ พร้อมแนวคิดเสริม',
      'เทคนิคคิดลัดช่วยประหยัดเวลาสอบได้อย่างมีประสิทธิภาพ',
    ],
    badge: 'BEST SELLER',
    image: '/books/math-sma.jpg'
  },
  {
    id: 'eng-grammar',
    title: 'Ultimate English Grammar ม.ต้น มั่นใจ 100%',
    subject: 'english',
    level: 'มัธยมศึกษาปีที่ 1–3',
    price: 290,
    originalPrice: 350,
    description: 'สรุปโครงสร้างไวยากรณ์ภาษาอังกฤษระดับมัธยมศึกษาตอนต้นอย่างเข้าใจง่าย มีภาพประกอบและตารางเปรียบเทียบช่วยความจำ เหมาะสำหรับน้อง ม.1–3 ที่ต้องการพื้นฐาน Grammar ที่แน่นและใช้งานได้จริง',
    features: [
      'ครอบคลุม Tenses ทั้งหมดและ Grammars ที่ออกสอบบ่อย',
      'แบบทดสอบประเมินย่อยกว่า 20 ชุด พร้อมเฉลยละเอียด',
      'คำศัพท์ที่ออกสอบบ่อยในการแข่งขันระดับภาค',
    ],
    badge: 'POPULAR',
    image: '/books/eng-grammar.jpg'
  },
  {
    id: 'sci-m4',
    title: 'พิชิตข้อสอบวิทยาศาสตร์ ม.4 (ฟิสิกส์ เคมี ชีวะ)',
    subject: 'science',
    level: 'มัธยมศึกษาปีที่ 3 (สอบเข้า ม.4)',
    price: 390,
    originalPrice: 480,
    description: 'หนังสือคู่มือเตรียมรอบเข้า ม.4 วิชาวิทยาศาสตร์ครบทั้ง 3 สาย รวมฟิสิกส์ เคมี และชีววิทยา คัดสรรแนวข้อสอบจากโรงเรียนชั้นนำ พร้อมเฉลยอธิบายแนวคิดอย่างละเอียด',
    features: [
      'ครอบคลุม 3 วิชา: ฟิสิกส์ เคมี ชีววิทยา ในเล่มเดียว',
      'แนวข้อสอบจากโรงเรียนชั้นนำ พร้อมเฉลยแนวคิด',
      'เหมาะสำหรับเตรียมสอบเข้า ม.4 ห้องเรียนพิเศษทุกสนาม',
    ],
    badge: 'ครบ 3 วิชา',
    image: '/books/sci.jpg'
  },
  {
    id: 'thai-primary',
    title: 'เก่งภาษาไทย ประถมปลาย (เตรียมสอบ ม.1)',
    subject: 'thai',
    level: 'ประถมศึกษาปีที่ 4–6',
    price: 290,
    originalPrice: 350,
    description: 'คู่มือเสริมทักษะภาษาไทยระดับประถมปลาย เน้นการอ่าน การเขียน ไวยากรณ์ และความเข้าใจภาษา เตรียมพร้อมสำหรับการสอบเข้า ม.1 โรงเรียนรัฐและเอกชนชั้นนำ',
    features: [
      'เสริมทักษะการอ่าน การเขียน และไวยากรณ์ภาษาไทยครบถ้วน',
      'แนวข้อสอบคัดสรรจากข้อสอบจริงเข้า ม.1 หลายสนาม',
      'สรุปจุดสำคัญที่มักออกสอบและจำสับสนบ่อย',
    ],
    badge: 'เฉลยในเล่ม',
    image: '/books/thai-primary.jpg'
  },
  {
    id: 'mow-target',
    title: 'ตรงเป้า มอ.ว. (แนวข้อสอบ 5 วิชาหลัก เล่มใหม่)',
    subject: 'general',
    level: 'เตรียมสอบเข้า ม.1 โรงเรียน มอ.วิทยานุสรณ์',
    price: 590,
    originalPrice: 690,
    description: 'คู่มือเก็งข้อสอบและแนวข้อสอบคัดเลือกเข้า ม.1 โรงเรียน มอ.วิทยานุสรณ์ และเครือข่ายห้องเรียนพิเศษ รวบรวมเนื้อหาและแนวข้อสอบครบทั้ง 5 วิชาหลัก (วิทยาศาสตร์, คณิตศาสตร์, ภาษาอังกฤษ, ภาษาไทย และความรู้ทั่วไป) อัปเดตล่าสุดปี 2568',
    features: [
      'ครบถ้วน 5 วิชาหลัก (วิทย์, คณิต, อังกฤษ, ไทย, ความรู้ทั่วไป)',
      'แนวข้อสอบเก่าตรงจุด อัปเดตเนื้อหาตามโครงสร้างสอบล่าสุดปี 2568',
      'เหมาะอย่างยิ่งสำหรับน้อง ๆ ที่ต้องการสอบเข้าห้องเรียนโครงการพิเศษ'
    ],
    badge: 'เล่มใหม่ล่าสุด 2568',
    image: '/books/mow.jpg'
  },
  {
    id: 'keysci-summary',
    title: 'สรุปวิทย์ Key Sci (ฉบับเข้มข้น)',
    subject: 'science',
    level: 'ประถมศึกษาตอนปลาย (ป.4 - ป.6 / เตรียมสอบ ม.1)',
    price: 450,
    originalPrice: 520,
    description: 'หนังสือสรุปย่อวิชาวิทยาศาสตร์ประถมปลายอ่านด่วนก่อนสอบเข้า ม.1 สรุปเนื้อหากระชับครบถ้วนทุกพาร์ท (เคมี, ชีววิทยา, ฟิสิกส์, โลกและดาราศาสตร์) พร้อมแทรกเทคนิคคิดช่วยจำ แถมฟรี ข้อสอบ Pre-test และ Post-test 100 ข้อ',
    features: [
      'สรุปเนื้อหาวิทยาศาสตร์ประถมปลายครบทุกบทกระชับอ่านง่าย',
      'มีเทคนิคสรุปการจำและการเปรียบเทียบตาราง',
      'แถมข้อสอบ Pre-test และ Post-test สำหรับฝึกมือรวม 100 ข้อ'
    ],
    badge: 'สรุปวิทย์เข้มข้น',
    image: '/books/keysci.jpg'
  },
  {
    id: 'socnote-summary',
    title: 'สรุป Short Note สังคมศึกษา ม.1',
    subject: 'thai',
    level: 'ประถมศึกษาตอนปลาย (เตรียมสอบเข้า ม.1)',
    price: 290,
    originalPrice: 380,
    description: 'หนังสือสรุปย่อ Short Note วิชาสังคมศึกษา ระดับประถมปลาย ออกแบบและเรียบเรียงลายเส้นสีสันสดใสโดย ครูเติ้ล ช่วยจับประเด็นและข้อสอบสำคัญที่มักเอามาออกสอบเข้า ม.1 ได้อย่างรวดเร็วและแม่นยำ',
    features: [
      'สรุปวิชาสังคมประถมปลายครบทุกสาระวิชาออกสอบหลัก',
      'กระชับเนื้อหา ช่วยประหยัดเวลาอ่านทบทวนก่อนสอบจริง',
      'เน้นจับจุดสำคัญและประเด็นที่มักพบบ่อยในสนามสอบ ม.1'
    ],
    badge: 'Short Note สีสัน',
    image: '/books/socnote.jpg'
  },
  {
    id: 'fitsci-online',
    title: 'ฟิตวิทย์ (คอร์สเรียนออนไลน์ + หนังสือพิมพ์สี)',
    subject: 'science',
    level: 'คอร์สเรียนออนไลน์ + หนังสือเรียนพิมพ์สี 1 เล่ม',
    price: 2590,
    originalPrice: 3500,
    description: 'แพ็กเกจเรียนวิทยาศาสตร์ครบชุดยอดนิยม ประกอบด้วยคอร์สเรียนวิทย์ออนไลน์เจาะลึกเนื้อหาสอบเข้า ม.1 ทุกบทเรียน เข้าชมเรียนซ้ำได้ไม่จำกัดและไม่มีวันหมดอายุ พร้อมหนังสือคู่มือเรียนพิมพ์สีสดใส 1 เล่ม และคลิปเฉลยแบบฝึกหัดละเอียดยิบ',
    features: [
      'คอร์สเรียนวิทยวิทยาศาสตร์ออนไลน์ ครบทุกบทสอบเข้า ม.1',
      'เรียนออนไลน์ยืดหยุ่น ทบทวนซ้ำกี่ครั้งก็ได้ ไม่มีหมดอายุการใช้งาน',
      'แถมฟรี หนังสือแบบฝึกประกอบการเรียนพิมพ์สีจริง 1 เล่ม พร้อมคลิปอธิบายโจทย์'
    ],
    badge: 'คอร์สคู่หนังสือ',
    image: '/books/fitsci.jpg'
  }
]

export default function BookstorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-20 px-4 relative overflow-hidden text-center text-white">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#f59e0b]/10 blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            LIFE ACADEMY BOOKSTORE
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            หนังสือเตรียมสอบเข้า ม.1 ยอดนิยม
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            คัดสรรรวบรวมสุดยอดหนังสือเก็งข้อสอบและคอร์สเรียนวิชาการจาก LIFE Academy เหมาะสำหรับน้อง ๆ ที่ต้องการเตรียมสอบเข้า ม.1 ห้องเรียนพิเศษ โครงการ Gifted และโรงเรียนชั้นนำ
          </p>
        </div>
      </section>

      {/* Book Catalog Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12 space-y-2">
            <span className="section-tag mx-auto">คลังหนังสือเตรียมสอบ</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0f2557]">หนังสือแนะนำปั้นคนเก่ง</h2>
            <p className="font-thai text-[#64748b] text-sm max-w-md mx-auto">
              จัดส่งทั่วประเทศ หรือรับหน้าร้านได้โดยตรงที่สถาบัน LIFE Academy หาดใหญ่ (สนใจเล่มไหนทักสั่งซื้อทางแชทได้ทันที)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {actualBooks.map(book => (
              <div 
                key={book.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 shadow-sm overflow-hidden"
              >
                {/* Real Book Cover Image Container */}
                <div className="w-full sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-md relative flex-shrink-0 bg-slate-50 border border-slate-200 group flex items-center justify-center select-none">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />
                  
                  {book.badge && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white font-ui font-bold text-[9px] uppercase tracking-wider px-2.5 py-0.75 rounded-full shadow-md z-10">
                      {book.badge}
                    </span>
                  )}
                </div>

                {/* Details Area */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#f0f4ff] text-[#1a56db] font-thai text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {book.subject === 'math' ? 'คณิตศาสตร์' : book.subject === 'science' ? 'วิทยาศาสตร์' : book.subject === 'english' ? 'ภาษาอังกฤษ' : book.subject === 'general' ? 'รวม 5 วิชา' : 'ภาษาไทย-สังคม'}
                    </span>
                    <h3 className="font-ui font-bold text-base text-[#0f2557] leading-snug">{book.title}</h3>
                    <div className="font-thai text-slate-500 text-xs tracking-tight">🎯 สำหรับ: {book.level}</div>
                    
                    <p className="font-thai text-[#64748b] text-xs leading-relaxed pt-1">
                      {book.description}
                    </p>
                    
                    <ul className="pt-2 space-y-1.5">
                      {book.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] font-thai text-slate-700">
                          <span className="text-[#1a56db] mt-0.5">•</span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and Action Bar */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-xs line-through font-ui">฿{book.originalPrice}</span>
                      <span className="text-[#1a56db] font-ui font-black text-xl ml-1.5">฿{book.price}</span>
                    </div>
                    <a 
                      href="https://lin.ee/xvYZMZP" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary py-2.5 px-4 text-xs font-semibold inline-flex items-center gap-1.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4" /> สั่งซื้อทาง Line
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Ordering Banner */}
          <div className="mt-16 bg-gradient-to-br from-[#0f2557] to-[#1a3680] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-md">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 max-w-xl relative z-10 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-ui font-semibold text-xs tracking-wider uppercase">
                <Truck className="w-3.5 h-3.5 text-[#f59e0b]" /> Delivery Services
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight mt-1">
                มีบริการจัดส่งด่วนทั่วประเทศ 📦
              </h3>
              <p className="font-thai text-white/70 text-sm leading-relaxed">
                หนังสือเตรียมสอบทุกเล่มของสถาบันจัดส่งแบบด่วนพิเศษส่งตรงถึงมือคุณทั่วประเทศไทย หรือสามารถเลือกรับหนังสือได้ด้วยตนเองโดยตรง ณ สถาบัน LIFE Academy หาดใหญ่
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10 flex-shrink-0">
              <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none text-white py-3.5 px-6 text-sm flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> แชทเพื่อสั่งซื้อด่วน
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

