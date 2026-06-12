import Link from 'next/link'
import { Play, BookOpen, Clock, Users, Star, CheckCircle, ArrowRight, MessageCircle, Lock, Wifi } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Learning — LIFE Academy | เรียนออนไลน์ตามอัธยาศัย',
  description: 'คอร์สวิดีโอออนไลน์จาก LIFE Academy เรียนได้ทุกที่ทุกเวลา ดูซ้ำได้ไม่จำกัด สอนโดยครูผู้เชี่ยวชาญ พร้อมแบบทดสอบออนไลน์',
}

const courses = [
  {
    id: 'math-m1-entrance',
    title: 'ติวเข้า ม.1 คณิตศาสตร์',
    subtitle: 'ครบทุกหัวข้อที่ออกสอบ โรงเรียนชั้นนำหาดใหญ่',
    teacher: 'ครูอ้อ',
    subject: 'คณิตศาสตร์',
    subjectColor: 'bg-blue-100 text-blue-700',
    level: 'ป.6 → ม.1',
    lessons: 24,
    hours: 18,
    students: 320,
    rating: 4.9,
    price: 1490,
    originalPrice: 2490,
    badge: 'BEST SELLER',
    badgeColor: 'bg-amber-500',
    thumbnail: '/courses/thumb-math-m1.jpg',
    topics: ['เลขจำนวนเต็ม', 'เศษส่วนและทศนิยม', 'สมการ', 'เรขาคณิต', 'สถิติและความน่าจะเป็น'],
  },
  {
    id: 'eng-m1-entrance',
    title: 'ติวเข้า ม.1 ภาษาอังกฤษ',
    subtitle: 'Grammar + Vocabulary + Reading ครบจบในคอร์สเดียว',
    teacher: 'ครูเจน',
    subject: 'ภาษาอังกฤษ',
    subjectColor: 'bg-green-100 text-green-700',
    level: 'ป.6 → ม.1',
    lessons: 20,
    hours: 15,
    students: 280,
    rating: 4.8,
    price: 1290,
    originalPrice: 1990,
    badge: 'POPULAR',
    badgeColor: 'bg-violet-500',
    thumbnail: '/courses/thumb-eng-m1.jpg',
    topics: ['Tenses พื้นฐาน', 'Vocabulary สำคัญ', 'Reading Comprehension', 'Grammar ระดับสอบ'],
  },
  {
    id: 'math-primary',
    title: 'คณิตศาสตร์ ป.4–ป.6',
    subtitle: 'เสริมพื้นฐานให้แน่น พร้อมสู่ ม.ต้น',
    teacher: 'ครูอ้อ',
    subject: 'คณิตศาสตร์',
    subjectColor: 'bg-blue-100 text-blue-700',
    level: 'ป.4–ป.6',
    lessons: 30,
    hours: 22,
    students: 195,
    rating: 4.7,
    price: 990,
    originalPrice: 1490,
    badge: null,
    badgeColor: '',
    thumbnail: '/courses/thumb-math-primary.jpg',
    topics: ['เศษส่วน', 'ทศนิยม', 'ร้อยละ', 'เรขาคณิต', 'การวัด', 'สถิติเบื้องต้น'],
  },
  {
    id: 'sci-m1-m3',
    title: 'วิทยาศาสตร์ ม.1–ม.3',
    subtitle: 'ฟิสิกส์ เคมี ชีววิทยา ครบทุกบทเรียน',
    teacher: 'ครูนิว',
    subject: 'วิทยาศาสตร์',
    subjectColor: 'bg-purple-100 text-purple-700',
    level: 'ม.1–ม.3',
    lessons: 36,
    hours: 28,
    students: 142,
    rating: 4.8,
    price: 1590,
    originalPrice: 2490,
    badge: 'NEW',
    badgeColor: 'bg-emerald-500',
    thumbnail: '/courses/thumb-sci.jpg',
    topics: ['ชีวิตและสิ่งแวดล้อม', 'สสารและสมบัติ', 'พลังงาน', 'ดาราศาสตร์', 'เทคโนโลยี'],
  },
]

const howItWorks = [
  { step: '01', title: 'เลือกคอร์ส', desc: 'เลือกวิชาและระดับที่สนใจ สอบถามผ่านไลน์ได้เลย' },
  { step: '02', title: 'ชำระเงิน', desc: 'โอนเงินผ่านบัญชีธนาคาร หรือ พร้อมเพย์ ปลอดภัย 100%' },
  { step: '03', title: 'รับลิงก์เข้าเรียน', desc: 'ทีมงานส่งลิงก์และรหัสผ่านภายใน 1 ชั่วโมง' },
  { step: '04', title: 'เรียนได้เลย!', desc: 'ดูวิดีโอได้ไม่จำกัด ทบทวนซ้ำตลอดระยะเวลาที่กำหนด' },
]

const perks = [
  { icon: Play,       text: 'วิดีโอ HD คุณภาพสูง ดูได้ทุกอุปกรณ์' },
  { icon: Clock,      text: 'ดูซ้ำได้ไม่จำกัดตลอดช่วงการเรียน' },
  { icon: BookOpen,   text: 'สรุปเนื้อหา PDF ดาวน์โหลดฟรี' },
  { icon: CheckCircle, text: 'แบบทดสอบออนไลน์ตรวจผลทันที' },
  { icon: Wifi,       text: 'เรียนออนไลน์ได้ทุกที่ ไม่ต้องเดินทาง' },
  { icon: Lock,       text: 'ระบบล็อกอินปลอดภัย เข้าถึงได้เฉพาะผู้ซื้อ' },
]

export default function ElearningPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2557] via-[#1e40af] to-[#7c3aed] py-20 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#f59e0b]/10 blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            📖 E-LEARNING PLATFORM
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            เรียนออนไลน์<br />
            <span className="text-[#f59e0b]">ตามอัธยาศัย ดูซ้ำได้ไม่จำกัด</span>
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            คอร์สวิดีโอคุณภาพสูงจากครูผู้เชี่ยวชาญ LIFE Academy
            เรียนได้ทุกที่ทุกเวลา ตามจังหวะของตัวเอง พร้อมแบบทดสอบและสรุปเนื้อหา PDF
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="#courses" className="btn-primary py-3 px-6 text-sm flex items-center gap-2">
              <Play className="w-4 h-4" /> ดูคอร์สทั้งหมด
            </a>
            <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
              className="btn-primary bg-white/10 hover:bg-white/20 border-white/20 text-white py-3 px-6 text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> สอบถาม
            </a>
          </div>
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {[
              { val: '4', unit: 'คอร์ส', label: 'เปิดสอน' },
              { val: '900+', unit: 'นาที', label: 'เนื้อหาวิดีโอ' },
              { val: '4.8★', unit: '', label: 'คะแนนเฉลี่ย' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-white font-display font-bold text-xl">{s.val}<span className="text-[#f59e0b] text-sm ml-0.5">{s.unit}</span></div>
                <div className="text-white/50 text-xs font-thai">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks strip */}
      <section className="bg-white border-b border-[#e2e8f0] py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {perks.map(p => {
            const Icon = p.icon
            return (
              <div key={p.text} className="flex flex-col items-center gap-1.5 text-center">
                <div className="w-9 h-9 rounded-xl bg-[#f0f4ff] flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-[#1a56db]" />
                </div>
                <span className="font-thai text-[#475569] text-[11px] leading-snug">{p.text}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Course Catalog */}
      <section id="courses" className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="section-tag mx-auto">คอร์สเรียนออนไลน์</span>
            <h2 className="font-display font-bold text-2xl text-[#0f2557]">เลือกคอร์สที่ใช่สำหรับคุณ</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex flex-col items-center gap-2 text-white">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white text-white ml-1" />
                    </div>
                    <span className="font-thai text-xs text-white/70">{course.lessons} บทเรียน • {course.hours} ชั่วโมง</span>
                  </div>
                  {/* Badge */}
                  {course.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-bold font-ui ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                  )}
                  {/* Subject tag */}
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold font-thai ${course.subjectColor}`}>
                    {course.subject}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-[#0f2557] text-base leading-snug">{course.title}</h3>
                    </div>
                    <p className="font-thai text-[#64748b] text-xs mt-1">{course.subtitle}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-[#94a3b8] font-thai">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students} คน</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{course.rating}</span>
                    <span className="flex items-center gap-1 text-[#1a56db] font-semibold">{course.level}</span>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.topics.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-lg bg-slate-100 text-[#64748b] text-[10px] font-thai">{t}</span>
                    ))}
                    {course.topics.length > 4 && (
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-[#64748b] text-[10px] font-thai">+{course.topics.length - 4} หัวข้อ</span>
                    )}
                  </div>

                  {/* Teacher */}
                  <div className="text-xs font-thai text-[#94a3b8]">สอนโดย <span className="text-[#0f2557] font-semibold">{course.teacher}</span></div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#f1f5f9]">
                    <div>
                      <div className="font-display font-bold text-[#0f2557] text-lg">฿{course.price.toLocaleString()}</div>
                      <div className="text-[#94a3b8] text-xs line-through">฿{course.originalPrice.toLocaleString()}</div>
                    </div>
                    <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
                      className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" /> สมัครเรียน
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 px-4 sm:px-6 border-y border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="section-tag mx-auto">วิธีการเรียน</span>
            <h2 className="font-display font-bold text-2xl text-[#0f2557]">เริ่มเรียนได้ใน 4 ขั้นตอน</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative text-center space-y-3">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-0 h-px border-t-2 border-dashed border-[#e2e8f0]" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center mx-auto">
                  <span className="text-white font-display font-bold text-sm">{step.step}</span>
                </div>
                <h3 className="font-ui font-bold text-[#0f2557] text-sm">{step.title}</h3>
                <p className="font-thai text-[#64748b] text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8 shadow-sm space-y-5">
            <h3 className="font-ui font-bold text-[#0f2557] text-lg">อุปกรณ์ที่ต้องใช้สำหรับ E-Learning</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: '💻', title: 'อุปกรณ์', desc: 'คอมพิวเตอร์ แท็บเล็ต หรือสมาร์ทโฟน' },
                { icon: '📶', title: 'อินเทอร์เน็ต', desc: 'ความเร็ว 5 Mbps ขึ้นไป สำหรับวิดีโอ HD' },
                { icon: '🌐', title: 'เบราว์เซอร์', desc: 'Chrome, Safari, Firefox เวอร์ชันล่าสุด' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="font-ui font-bold text-[#0f2557] text-sm">{item.title}</div>
                  <p className="font-thai text-[#64748b] text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="font-thai text-[#94a3b8] text-xs text-center">
              * ลิงก์เข้าเรียนจะส่งผ่าน LINE หลังจากยืนยันการชำระเงิน
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="font-ui font-bold text-[#0f2557] text-lg text-center mb-6">คำถามที่พบบ่อย</h3>
          {[
            { q: 'ดูวิดีโอได้นานแค่ไหน?', a: 'สามารถดูย้อนหลังได้ตลอดระยะเวลาที่กำหนดในแต่ละคอร์ส (โดยทั่วไป 6–12 เดือน)' },
            { q: 'ดูได้กี่อุปกรณ์?', a: 'เข้าถึงได้ 1 บัญชีต่อ 2 อุปกรณ์ สามารถสลับอุปกรณ์ได้ตามต้องการ' },
            { q: 'มีแบบทดสอบไหม?', a: 'มีแบบทดสอบท้ายบทพร้อมเฉลยละเอียด ช่วยทบทวนความเข้าใจหลังเรียนแต่ละหัวข้อ' },
            { q: 'ถ้ามีคำถามระหว่างเรียน ถามได้ไหม?', a: 'ถามผ่านกลุ่ม LINE ของแต่ละคอร์สได้ ครูจะตอบภายในเวลาทำการ' },
          ].map(faq => (
            <div key={faq.q} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
              <h4 className="font-ui font-semibold text-[#0f2557] text-sm mb-2">Q: {faq.q}</h4>
              <p className="font-thai text-[#64748b] text-sm leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 px-4 sm:px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#0f2557] via-[#1e40af] to-[#7c3aed] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h3 className="font-display font-bold text-2xl">เริ่มเรียน E-Learning วันนี้</h3>
              <p className="font-thai text-white/70 text-sm">สอบถามรายละเอียดและสมัครได้ผ่านไลน์ ทีมงานพร้อมช่วยเหลือคุณทุกขั้นตอน</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
                  className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none py-3 px-6 text-sm flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> แอดไลน์สมัครเรียน
                </a>
                <Link href="/courses" className="btn-primary bg-white/10 hover:bg-white/20 border-white/20 text-white py-3 px-6 text-sm flex items-center justify-center gap-2">
                  ดูหลักสูตรทั้งหมด <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
