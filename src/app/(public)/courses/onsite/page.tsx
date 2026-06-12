import Link from 'next/link'
import { MapPin, Users, Clock, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'เรียนที่สถาบัน (Onsite) — LIFE Academy หาดใหญ่',
  description: 'เรียนสดที่สถาบัน LIFE Academy หาดใหญ่ ห้องเรียนขนาดเล็ก ไม่เกิน 8–10 คน ครูดูแลใกล้ชิด เหมาะสำหรับเด็กที่ต้องการความใส่ใจเป็นรายบุคคล',
}

const features = [
  { icon: Users,    title: 'ห้องเรียนขนาดเล็ก',        desc: 'จำกัดไม่เกิน 8–10 คนต่อห้อง ครูดูแลได้ทั่วถึงทุกคน' },
  { icon: Clock,    title: 'ตารางเรียนยืดหยุ่น',       desc: 'มีหลายช่วงเวลาให้เลือก ทั้งช่วงเย็นวันธรรมดาและวันเสาร์-อาทิตย์' },
  { icon: MapPin,   title: 'บรรยากาศการเรียนจริง',     desc: 'ห้องเรียนปรับอากาศ พร้อมสื่อการสอน Interactive Screen ครบครัน' },
  { icon: CheckCircle, title: 'เรียนชดเชยได้',         desc: 'หยุดเรียนสามารถนัดเรียนชดเชยได้ตามตารางที่ตกลง' },
]

const schedule = [
  { day: 'จันทร์–ศุกร์', time: '14:00–16:00 น.' },
  { day: 'จันทร์–ศุกร์', time: '16:00–18:00 น.' },
  { day: 'จันทร์–ศุกร์', time: '18:00–20:00 น.' },
  { day: 'เสาร์–อาทิตย์', time: '09:00–11:00 น.' },
  { day: 'เสาร์–อาทิตย์', time: '11:00–13:00 น.' },
  { day: 'เสาร์–อาทิตย์', time: '14:00–16:00 น.' },
]

export default function OnsitePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-20 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            🏫 ONSITE LEARNING
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            เรียนที่สถาบัน<br />
            <span className="text-[#f59e0b]">ครูดูแลใกล้ชิด</span>
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            ห้องเรียนขนาดเล็ก ไม่เกิน 8–10 คน บรรยากาศอบอุ่น ครูผู้เชี่ยวชาญคอยดูแลและตอบคำถามได้ทันที
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/courses?format=onsite" className="btn-primary py-3 px-6 text-sm">
              ดูหลักสูตร Onsite <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
              className="btn-primary bg-white/10 hover:bg-white/20 border-white/20 text-white py-3 px-6 text-sm">
              <MessageCircle className="w-4 h-4" /> สอบถามตาราง
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="section-tag mx-auto">ข้อดีของการเรียน Onsite</span>
            <h2 className="font-display font-bold text-2xl text-[#0f2557]">เรียนสดที่สถาบัน ได้อะไรมากกว่าที่คิด</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white rounded-3xl border border-[#e2e8f0] p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#1a56db]" />
                  </div>
                  <div>
                    <h3 className="font-ui font-bold text-[#0f2557] text-sm">{f.title}</h3>
                    <p className="font-thai text-[#64748b] text-xs mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8 shadow-sm">
            <h3 className="font-ui font-bold text-[#0f2557] text-lg mb-6">ตารางเรียนที่เปิดสอน</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {schedule.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="w-2 h-2 rounded-full bg-[#1a56db] flex-shrink-0" />
                  <div>
                    <div className="font-thai text-xs text-[#64748b]">{s.day}</div>
                    <div className="font-ui font-semibold text-[#0f2557] text-sm">{s.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-thai text-[#94a3b8] text-xs mt-4">* ตารางอาจปรับตามรอบเปิดหลักสูตร สอบถามรายละเอียดได้ที่ Line</p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h3 className="font-display font-bold text-2xl">สนใจเรียนที่สถาบัน?</h3>
              <p className="font-thai text-white/70 text-sm">ทักหาเราเพื่อเช็กตารางว่างและจองที่นั่งได้เลย ไม่มีค่าใช้จ่ายในการสอบถาม</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
                  className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none py-3 px-6 text-sm flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> แอดไลน์สอบถาม
                </a>
                <Link href="/courses?format=onsite" className="btn-primary bg-white/10 hover:bg-white/20 border-white/20 text-white py-3 px-6 text-sm flex items-center justify-center gap-2">
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
