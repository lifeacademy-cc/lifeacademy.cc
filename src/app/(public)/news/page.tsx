import Link from 'next/link'
import { ArrowRight, Calendar, Tag, Megaphone, BookOpen, Trophy, Bell } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ข่าวสารและประกาศ — LIFE Academy',
  description: 'ติดตามข่าวสาร ประกาศสำคัญ เคล็ดลับการเรียน และผลสัมฤทธิ์ของนักเรียน LIFE Academy หาดใหญ่',
}

type NewsCategory = 'announcement' | 'tips' | 'achievement' | 'event'

interface NewsItem {
  id: string
  title: string
  excerpt: string
  category: NewsCategory
  date: string
  tag: string
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'เปิดรับสมัครภาคเรียนใหม่ มิถุนายน 2568',
    excerpt: 'LIFE Academy เปิดรับสมัครนักเรียนใหม่และนักเรียนต่อเนื่องสำหรับภาคเรียน มิ.ย.–ก.ย. 2568 แล้ววันนี้ หลักสูตรมีที่นั่งจำกัดไม่เกิน 8–10 คนต่อห้อง สมัครก่อนได้สิทธิ์ก่อน',
    category: 'announcement',
    date: '20 พ.ค. 2568',
    tag: 'ประกาศ',
  },
  {
    id: '2',
    title: 'ผลสอบ O-NET นักเรียน LIFE Academy ปีการศึกษา 2567',
    excerpt: 'นักเรียน LIFE Academy ที่เข้าสอบ O-NET ปีการศึกษา 2567 ทำคะแนนเฉลี่ยสูงกว่าค่าเฉลี่ยประเทศในทุกวิชา โดยเฉพาะคณิตศาสตร์และภาษาอังกฤษที่ทำคะแนนโดดเด่น',
    category: 'achievement',
    date: '12 พ.ค. 2568',
    tag: 'ผลงาน',
  },
  {
    id: '3',
    title: '5 เทคนิคจำสูตรคณิตศาสตร์ให้ได้นาน ไม่หลุด',
    excerpt: 'ครูแนะนำวิธีจำสูตรคณิตที่ได้ผลจริงในห้องเรียน ตั้งแต่การสร้างภาพ Mindmap จนถึงเทคนิค Spaced Repetition ที่นักเรียนสาย ม.ปลายนำไปใช้สอบติด TCAS',
    category: 'tips',
    date: '5 พ.ค. 2568',
    tag: 'เคล็ดลับ',
  },
  {
    id: '4',
    title: 'ค่ายเตรียมสอบ TCAS รอบ 1 Portfolio วันที่ 21–22 มิ.ย. 68',
    excerpt: 'LIFE Academy จัดค่ายเข้มข้น 2 วัน เน้นเตรียมแฟ้มสะสมผลงานและเทคนิคสัมภาษณ์ รับจำนวนจำกัด 20 คน เหมาะสำหรับนักเรียน ม.6 ที่ต้องการยื่น Portfolio รอบแรก',
    category: 'event',
    date: '28 เม.ย. 2568',
    tag: 'กิจกรรม',
  },
  {
    id: '5',
    title: 'เพิ่มรอบเรียน Online วันอาทิตย์สำหรับนักเรียนต่างจังหวัด',
    excerpt: 'ตอบรับความต้องการนักเรียนที่ไม่สะดวกเดินทางมาสถาบัน เพิ่มรอบเรียนออนไลน์ผ่าน Zoom ทุกวันอาทิตย์ เวลา 10:00–12:00 น. วิชาคณิตศาสตร์และภาษาอังกฤษทุกระดับ',
    category: 'announcement',
    date: '20 เม.ย. 2568',
    tag: 'ประกาศ',
  },
  {
    id: '6',
    title: 'น้องมินติด มอ. วิชาการ คณะวิศวกรรมศาสตร์ด้วยคะแนน A-Level 90+',
    excerpt: 'ขอแสดงความยินดีกับน้องมิน นักเรียน LIFE Academy 3 ปี ที่สอบติดคณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์ รอบที่ 1 พร้อมทุนเรียนดี',
    category: 'achievement',
    date: '10 เม.ย. 2568',
    tag: 'ผลงาน',
  },
  {
    id: '7',
    title: 'วิธีวางแผนเวลาเรียนช่วงสอบปลายภาค ฉบับ LIFE Academy',
    excerpt: 'ครูสรุปแนวทางวางตารางเรียนสำหรับนักเรียนที่มีวิชาหลายวิชาในคราวเดียว ให้อ่านหนังสือครบทุกวิชาโดยไม่เครียด พร้อมตัวอย่างตารางจริงที่นักเรียนใช้ได้ทันที',
    category: 'tips',
    date: '2 เม.ย. 2568',
    tag: 'เคล็ดลับ',
  },
  {
    id: '8',
    title: 'ปรับปรุงห้องเรียน Smart Classroom พร้อมระบบ Interactive Whiteboard',
    excerpt: 'LIFE Academy ลงทุนปรับห้องเรียนใหม่ทั้งหมด ติดตั้ง Interactive Whiteboard และระบบเสียงคุณภาพสูง เพื่อยกระดับประสบการณ์เรียนทั้ง Onsite และ Hybrid',
    category: 'announcement',
    date: '25 มี.ค. 2568',
    tag: 'ประกาศ',
  },
]

const categoryConfig: Record<NewsCategory, { icon: React.ComponentType<{ className?: string }>, color: string, bg: string }> = {
  announcement: { icon: Bell,      color: 'text-[#1a56db]', bg: 'bg-[#f0f4ff]' },
  tips:         { icon: BookOpen,  color: 'text-[#059669]', bg: 'bg-emerald-50' },
  achievement:  { icon: Trophy,    color: 'text-[#d97706]', bg: 'bg-amber-50'   },
  event:        { icon: Megaphone, color: 'text-[#7c3aed]', bg: 'bg-violet-50'  },
}

const tagColor: Record<NewsCategory, string> = {
  announcement: 'bg-[#dce6ff] text-[#1a56db]',
  tips:         'bg-emerald-100 text-emerald-700',
  achievement:  'bg-amber-100 text-amber-700',
  event:        'bg-violet-100 text-violet-700',
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#f59e0b]/10 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase mb-4 border border-white/10">
            LIFE Academy News
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            ข่าวสารและประกาศ
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            อัปเดตข่าวสารล่าสุด ประกาศเปิดรับสมัคร เคล็ดลับการเรียน และผลสัมฤทธิ์ของนักเรียน
          </p>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="bg-white border-b border-[#e2e8f0] sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { label: 'ทั้งหมด', value: 'all' },
            { label: 'ประกาศ', value: 'announcement' },
            { label: 'กิจกรรม', value: 'event' },
            { label: 'ผลงาน', value: 'achievement' },
            { label: 'เคล็ดลับ', value: 'tips' },
          ].map(chip => (
            <span
              key={chip.value}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-ui font-semibold border border-[#e2e8f0] text-[#64748b] bg-slate-50 cursor-default"
            >
              {chip.label}
            </span>
          ))}
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNews.map(item => {
              const cfg = categoryConfig[item.category]
              const Icon = cfg.icon
              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#e2e8f0] shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Category Icon Header */}
                  <div className={`${cfg.bg} px-5 pt-5 pb-3 flex items-center gap-3`}>
                    <div className={`w-9 h-9 rounded-xl ${cfg.bg} border border-[#e2e8f0] flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <span className={`text-xs font-ui font-bold px-2.5 py-1 rounded-full ${tagColor[item.category]}`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="px-5 pb-5 pt-3 flex flex-col flex-1">
                    <h2 className="font-ui font-bold text-[#0f2557] text-base leading-snug mb-2 group-hover:text-[#1a56db] transition-colors">
                      {item.title}
                    </h2>
                    <p className="font-thai text-[#64748b] text-sm leading-relaxed flex-1 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e2e8f0]">
                      <div className="flex items-center gap-1.5 text-[#94a3b8]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-ui text-xs">{item.date}</span>
                      </div>
                      <span className="font-ui text-xs font-semibold text-[#1a56db] flex items-center gap-1 cursor-default">
                        อ่านต่อ <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="font-display font-extrabold text-[#0f2557] text-2xl">
            สนใจเรียนกับ LIFE Academy?
          </h2>
          <p className="font-thai text-[#64748b] text-sm leading-relaxed max-w-xl mx-auto">
            ทดสอบระดับฟรี ไม่มีค่าใช้จ่าย ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมงเพื่อแนะนำหลักสูตรที่เหมาะกับบุตรหลานของคุณ
          </p>
          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm"
            >
              ลงทะเบียนเรียนฟรี <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-ui font-semibold rounded-xl border border-[#1a56db] text-[#1a56db] hover:bg-[#f0f4ff] transition-colors"
            >
              ดูหลักสูตรทั้งหมด
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
