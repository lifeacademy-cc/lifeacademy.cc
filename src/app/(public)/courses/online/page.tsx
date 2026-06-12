import Link from 'next/link'
import { Monitor, Wifi, Video, MessageSquare, ArrowRight, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'เรียนออนไลน์สด (Online) — LIFE Academy',
  description: 'เรียนออนไลน์สดกับครู LIFE Academy ผ่าน Zoom สะดวกทุกที่ ครูสอนสด ตอบคำถามได้ทันที เหมาะสำหรับนักเรียนนอกพื้นที่หาดใหญ่',
}

const features = [
  { icon: Video,        title: 'สอนสดผ่าน Zoom',          desc: 'ครูสอนสดและตอบคำถามได้ทันทีเหมือนนั่งในห้องเรียนจริง' },
  { icon: Monitor,      title: 'เรียนได้จากทุกที่',         desc: 'ใช้ได้ทั้ง คอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน ไม่ต้องเดินทาง' },
  { icon: Wifi,         title: 'บันทึกย้อนหลัง',           desc: 'ทุกคลาสถูกบันทึกไว้ ทบทวนซ้ำได้ตลอดช่วงการเรียน' },
  { icon: MessageSquare, title: 'กลุ่ม LINE สนับสนุน',     desc: 'มีกลุ่ม LINE สำหรับถามการบ้านและรับสื่อการสอนเพิ่มเติม' },
]

export default function OnlinePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2557] via-[#1a56db] to-[#059669] py-20 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            💻 ONLINE LIVE CLASS
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            เรียนออนไลน์สด<br />
            <span className="text-[#f59e0b]">สะดวกทุกที่ทุกเวลา</span>
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            ครูสอนสดผ่าน Zoom มีปฏิสัมพันธ์กับครูและเพื่อนได้เต็มที่ เหมาะสำหรับน้องๆ ทุกจังหวัดทั่วประเทศ
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/courses?format=online" className="btn-primary py-3 px-6 text-sm">
              ดูหลักสูตร Online <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
              className="btn-primary bg-white/10 hover:bg-white/20 border-white/20 text-white py-3 px-6 text-sm">
              <MessageCircle className="w-4 h-4" /> สอบถาม
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="section-tag mx-auto">ทำไมต้อง Online กับ LIFE Academy</span>
            <h2 className="font-display font-bold text-2xl text-[#0f2557]">เรียนออนไลน์แต่ได้คุณภาพเหมือนเรียนสด</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white rounded-3xl border border-[#e2e8f0] p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#059669]" />
                  </div>
                  <div>
                    <h3 className="font-ui font-bold text-[#0f2557] text-sm">{f.title}</h3>
                    <p className="font-thai text-[#64748b] text-xs mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* What you need */}
          <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8 shadow-sm">
            <h3 className="font-ui font-bold text-[#0f2557] text-lg mb-4">สิ่งที่ต้องเตรียมสำหรับการเรียน Online</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { num: '01', item: 'อุปกรณ์', desc: 'คอมพิวเตอร์ / แท็บเล็ต / โทรศัพท์มือถือ' },
                { num: '02', item: 'อินเทอร์เน็ต', desc: 'ความเร็ว 10 Mbps ขึ้นไป สัญญาณเสถียร' },
                { num: '03', item: 'Zoom', desc: 'ดาวน์โหลดแอป Zoom ฟรี ก่อนวันเรียน' },
              ].map(item => (
                <div key={item.num} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-ui font-black text-2xl text-slate-200">{item.num}</div>
                  <div className="font-ui font-bold text-[#0f2557] text-sm">{item.item}</div>
                  <p className="font-thai text-[#64748b] text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#0f2557] to-[#059669] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h3 className="font-display font-bold text-2xl">เรียน Online กับเราได้เลย</h3>
              <p className="font-thai text-white/70 text-sm">ไม่จำกัดพื้นที่ เรียนได้ทั่วประเทศ ทักไลน์เพื่อสมัครได้ทันที</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
                  className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none py-3 px-6 text-sm flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> แอดไลน์สมัครเรียน
                </a>
                <Link href="/courses?format=online" className="btn-primary bg-white/10 hover:bg-white/20 border-white/20 text-white py-3 px-6 text-sm flex items-center justify-center gap-2">
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
