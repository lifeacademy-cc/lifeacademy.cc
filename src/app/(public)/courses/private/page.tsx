import Link from 'next/link'
import { User, Target, Calendar, Star, ArrowRight, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'เรียนส่วนตัว (Private) — LIFE Academy',
  description: 'คอร์สเรียนส่วนตัว 1 ต่อ 1 กับครูผู้เชี่ยวชาญ LIFE Academy ออกแบบหลักสูตรเฉพาะบุคคล เน้นจุดอ่อน เร่งผลลัพธ์ได้เร็วกว่า',
}

const features = [
  { icon: User,     title: 'เรียน 1 ต่อ 1 กับครู',     desc: 'ครูโฟกัสที่นักเรียน 100% ไม่มีการรอคอย ครูตอบทุกคำถามได้ทันที' },
  { icon: Target,   title: 'ออกแบบหลักสูตรเฉพาะบุคคล', desc: 'วิเคราะห์จุดอ่อน-จุดแข็ง แล้วออกแบบเนื้อหาและแบบฝึกที่ตรงกับนักเรียนโดยเฉพาะ' },
  { icon: Calendar, title: 'นัดเรียนได้ตามสะดวก',      desc: 'ยืดหยุ่นเต็มที่ ตกลงเวลากับครูได้โดยตรง ทั้ง Onsite และ Online' },
  { icon: Star,     title: 'เห็นผลเร็วกว่า',           desc: 'นักเรียนเรียน Private มักเห็นพัฒนาการเร็วกว่าเรียนกลุ่มถึง 2 เท่า' },
]

export default function PrivatePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#7c3aed] py-20 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            👤 PRIVATE 1-ON-1
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            เรียนส่วนตัว<br />
            <span className="text-[#f59e0b]">ครูโฟกัสคุณ 100%</span>
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            หลักสูตรออกแบบเฉพาะบุคคล เร่งพัฒนาจุดอ่อน เสริมจุดแข็ง เห็นผลเร็วกว่าเรียนกลุ่ม
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
              className="btn-primary py-3 px-6 text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> นัดปรึกษาฟรี
            </a>
            <Link href="/courses?format=private"
              className="btn-primary bg-white/10 hover:bg-white/20 border-white/20 text-white py-3 px-6 text-sm flex items-center gap-2">
              ดูหลักสูตร Private <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="section-tag mx-auto">ทำไมต้องเรียน Private</span>
            <h2 className="font-display font-bold text-2xl text-[#0f2557]">เรียนส่วนตัว เหมาะกับใคร?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white rounded-3xl border border-[#e2e8f0] p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#7c3aed]" />
                  </div>
                  <div>
                    <h3 className="font-ui font-bold text-[#0f2557] text-sm">{f.title}</h3>
                    <p className="font-thai text-[#64748b] text-xs mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Who is this for */}
          <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8 shadow-sm space-y-5">
            <h3 className="font-ui font-bold text-[#0f2557] text-lg">เหมาะกับน้องๆ ที่...</h3>
            <ul className="space-y-3">
              {[
                'ต้องการเตรียมสอบเข้าโรงเรียนดังในเวลาจำกัด',
                'มีจุดอ่อนเฉพาะวิชาที่ต้องการเสริมโดยเร่งด่วน',
                'ตารางเรียนไม่สะดวกกับรอบกลุ่มปกติ',
                'ต้องการความใส่ใจพิเศษมากกว่าการเรียนกลุ่ม',
                'กำลังเร่งติวก่อนสอบใหญ่ในระยะเวลาสั้น',
              ].map(item => (
                <li key={item} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                  </div>
                  <span className="font-thai text-[#475569] text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#0f2557] to-[#7c3aed] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h3 className="font-display font-bold text-2xl">สนใจเรียนส่วนตัว?</h3>
              <p className="font-thai text-white/70 text-sm">ทักมาเพื่อนัดประเมินและออกแบบแผนการเรียนเฉพาะสำหรับคุณฟรี</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
                  className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none py-3 px-6 text-sm flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> แอดไลน์นัดปรึกษา
                </a>
                <Link href="/contact" className="btn-primary bg-white/10 hover:bg-white/20 border-white/20 text-white py-3 px-6 text-sm flex items-center justify-center gap-2">
                  ติดต่อสถาบัน <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
