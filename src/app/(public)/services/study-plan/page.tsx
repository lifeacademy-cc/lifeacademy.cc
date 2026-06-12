import Link from 'next/link'
import { BookOpen, Calendar, Clock, Award, Compass, MessageCircle, Phone, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บริการวางแผนติวเข้า ม.1 & ม.4 — LIFE Academy',
  description: 'บริการปรึกษาการวางแผนติวเข้า ม.1 และ ม.4 วางแผนการอ่านหนังสือ การจัดการเวลา และวิเคราะห์จุดอ่อนจุดแข็งอย่างเป็นระบบ',
}

export default function StudyPlanServicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-20 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#f59e0b]/10 blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-ui font-bold tracking-widest uppercase border border-amber-500/20">
            PERSONAL ROADMAP & CONSULTING
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            วางแผนติวเข้า ม.1 และ ม.4 อย่างมีกลยุทธ์
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            เพราะการสอบติดไม่ใช่เรื่องของโชคช่วย แต่คือผลลัพธ์ของ "แผนการอ่านหนังสือที่ใช่" และ "การจัดการเวลาที่ถูกต้อง"
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Why planning is key */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="section-tag">ความสำคัญของการวางแผน</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0f2557] leading-tight">
                ทำไมเด็กเรียนเก่งหลายคนถึงสอบไม่ติด?
              </h2>
              <p className="font-thai text-[#64748b] text-sm leading-relaxed">
                การสอบเข้า ม.1 และ ม.4 ในปัจจุบันมีอัตราการแข่งขันสูงมาก ปัญหาไม่ใช่เพราะเด็กเรียนไม่รู้เรื่อง แต่ส่วนใหญ่เกิดจากการ **ไม่มีแบบแผนในการทบทวนเนื้อหา**, **ทำข้อสอบเก่าไม่ทันเวลา**, และ **ไม่สามารถแบ่งเวลาอ่านหนังสือให้ครอบคลุมวิชาสอบได้**
              </p>
              <p className="font-thai text-[#64748b] text-sm leading-relaxed">
                ที่ LIFE Academy เราจึงจัดทีมครูแนะแนววิชาการเพื่อทำหน้าช่วยวิเคราะห์และสร้าง **Personalized Study Roadmap** ให้กับนักเรียนรายบุคคล
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-6">
              <h3 className="font-ui font-bold text-[#0f2557] text-lg">องค์ประกอบของแผนการติวสู่ความสำเร็จ</h3>
              <div className="space-y-4">
                {[
                  { icon: Compass, title: 'วิเคราะห์รายบุคคล (Diagnostic)', desc: 'ประเมินความรู้พื้นฐานและระบุจุดเด่น-จุดอ่อนก่อนเริ่มเรียน' },
                  { icon: Calendar, title: 'ตารางอ่านหนังสือรายสัปดาห์', desc: 'กำหนดบทเรียนที่ต้องเก็บในแต่ละวัน เพื่อไม่ให้เกิดภาวะดินพอกหางหมู' },
                  { icon: Clock, title: 'เทคนิคการจัดการเวลา (Mock Test)', desc: 'ฝึกจำลองทำข้อสอบเก่าภายใต้ความกดดันและการจับเวลาจริง' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#1a56db]" />
                    </div>
                    <div>
                      <h4 className="font-ui font-semibold text-[#0f2557] text-sm">{item.title}</h4>
                      <p className="font-thai text-[#64748b] text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process Step */}
          <div className="bg-white border border-[#e2e8f0] rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-10">
            <div className="max-w-xl mx-auto space-y-2">
              <span className="section-tag mx-auto">ขั้นตอนการบริการ</span>
              <h2 className="font-display font-extrabold text-2xl text-[#0f2557]">4 ขั้นตอน ปั้นเด็กสอบติด</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'ประเมินระดับฟรี', desc: 'ทำข้อสอบประเมินจุดยืนในวิชาหลัก ใช้เวลาประมาณ 30 นาที' },
                { step: '02', title: 'สัมภาษณ์พูดคุย', desc: 'คุยกับครูวิชาการเพื่อค้นหาเป้าหมาย โรงเรียนที่อยากเข้า และไลฟ์สไตล์การเรียน' },
                { step: '03', title: 'วางแผน Roadmap', desc: 'สร้างตารางเรียนและตารางอ่านหนังสือแบบเจาะจงเฉพาะตัวนักเรียน' },
                { step: '04', title: 'ติดตามและปรับแผน', desc: 'จำลองการสอบรายเดือน ประเมินความก้าวหน้า และปรับรูปแบบเมื่อจำเป็น' },
              ].map(item => (
                <div key={item.step} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                  <div className="absolute -top-4 left-6 font-ui font-black text-3xl text-[#1a56db]/10 tracking-wider">{item.step}</div>
                  <h4 className="font-ui font-bold text-[#0f2557] text-base mt-2">{item.title}</h4>
                  <p className="font-thai text-[#64748b] text-xs mt-2 text-center leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 max-w-xl relative z-10 text-center md:text-left">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                จองคิวรับคำปรึกษาการวางแผนติวฟรีวันนี้
              </h3>
              <p className="font-thai text-white/70 text-sm leading-relaxed">
                รับแผนการอ่านหนังสือสำหรับติวเข้าสอบ ม.1 และ ม.4 พร้อมบทวิเคราะห์ประเมินเบื้องต้น ฟรี! โดยไม่มีเงื่อนไขใดๆ เพิ่มเติม
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
              <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none text-white py-3 px-6 text-sm flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> ปรึกษาผ่าน LINE
              </a>
              <Link href="/contact" className="btn-primary bg-white hover:bg-slate-100 text-[#0f2557] py-3 px-6 text-sm flex items-center justify-center gap-2">
                ลงทะเบียนรับ Roadmap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
