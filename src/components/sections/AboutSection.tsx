'use client'

import { useEffect, useRef } from 'react'
import { Award, Users, BookOpen, TrendingUp, Shield, Heart, CheckCircle2 } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: '14 ปีแห่งความเชี่ยวชาญ',
    desc: 'ประสบการณ์สอนมากกว่า 14 ปีในหาดใหญ่ เราเข้าใจจุดอ่อน–จุดแข็งของหลักสูตรไทยดีที่สุด',
    color: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  },
  {
    icon: Users,
    title: 'ครูประจำตัวทุกคน',
    desc: 'ไม่ใช่ระบบฝากเพื่อน นักเรียนมีครูประจำที่รู้จักจุดอ่อนและปรับวิธีสอนให้เหมาะกับแต่ละคน',
    color: 'bg-[#1a56db]/10 text-[#1a56db]',
  },
  {
    icon: BookOpen,
    title: 'เนื้อหาตรงหลักสูตร',
    desc: 'ปรับปรุงเนื้อหาให้ตรงกับหลักสูตรสถาบันและมาตรฐานข้อสอบแต่ละปีการศึกษา',
    color: 'bg-[#059669]/10 text-[#059669]',
  },
  {
    icon: TrendingUp,
    title: 'ติดตามผลทุกสัปดาห์',
    desc: 'รายงานผลการเรียนส่งถึงผู้ปกครองทุกสัปดาห์ผ่าน LINE พร้อมคำแนะนำจากครู',
    color: 'bg-[#7c3aed]/10 text-[#7c3aed]',
  },
  {
    icon: Shield,
    title: 'รับประกันผล',
    desc: 'ถ้าคะแนนไม่ดีขึ้นใน 3 เดือน เรียนต่อฟรีจนกว่าจะได้ผล เพราะเราเชื่อในสิ่งที่เราสอน',
    color: 'bg-[#dc2626]/10 text-[#dc2626]',
  },
  {
    icon: Heart,
    title: 'บรรยากาศเป็นกันเอง',
    desc: 'ห้องเรียนสบาย ครูเป็นกันเอง ไม่กดดัน ไม่ตัดสิน นักเรียนกล้าถามกล้าตอบได้ทุกเวลา',
    color: 'bg-[#0891b2]/10 text-[#0891b2]',
  },
]

const testimonials = [
  {
    name: 'น้องมิ้น',
    role: 'นักเรียน ม.6 | TCAS ม.อ. คณะแพทย์',
    quote: 'ก่อนมาเรียน LIFE Academy คะแนน PAT2 แค่ 40% หลังเรียน 6 เดือน ได้ 78% ติดแพทย์ ม.อ. ในปีแรกที่สมัคร',
    score: '78%',
    subject: 'PAT2',
    color: 'border-[#f59e0b]',
  },
  {
    name: 'น้องบอส',
    role: 'นักเรียน ม.3 | สอบเข้า ม.4 สาธิต มอ.',
    quote: 'คณิตไม่เคยผ่าน 50 เลย ครู LIFE สอนให้เข้าใจจริงๆ ไม่ใช่แค่ท่องสูตร ตอนนี้สอบได้ 85 เต็ม 100',
    score: '85/100',
    subject: 'คณิต',
    color: 'border-[#1a56db]',
  },
  {
    name: 'ผู้ปกครองน้องจูน',
    role: 'ผู้ปกครอง | ลูกเรียน ป.5–ม.3 (5 ปี)',
    quote: 'ฝากลูกที่ LIFE Academy มา 5 ปีแล้ว ครูใส่ใจมาก ลูกรักการเรียนขึ้นเยอะ ไม่ต้องบังคับ ไม่เครียด',
    score: '5 ปี',
    subject: 'ความไว้ใจ',
    color: 'border-[#059669]',
  },
]

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = ref.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function AboutSection() {
  const ref = useScrollReveal()

  return (
    <div ref={ref}>
      {/* About */}
      <section className="section bg-white" id="about">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <div className="animate-on-scroll order-2 lg:order-1">
              <div className="relative">
                {/* Main image placeholder */}
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-white">
                    <div className="font-display text-7xl font-bold opacity-20">14</div>
                    <div className="font-display text-3xl font-bold">Years</div>
                    <div className="font-thai text-sm text-white/60 mt-2">แห่งความสำเร็จ</div>
                  </div>
                  {/* Floating badges */}
                  <div className="absolute top-6 -right-4 bg-[#f59e0b] text-[#0f2557] rounded-2xl px-4 py-2 shadow-lg font-ui font-bold text-sm">
                    ⭐ 4.9/5 ดาว
                  </div>
                  <div className="absolute bottom-8 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg">
                    <div className="font-ui font-bold text-[#0f2557] text-sm">5,000+</div>
                    <div className="font-thai text-[#64748b] text-xs">นักเรียนสำเร็จ</div>
                  </div>
                </div>
                {/* Decorative */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-[#f0f4ff] -z-10" />
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl bg-[#fef3c7] -z-10" />
              </div>
            </div>

            {/* Content side */}
            <div className="order-1 lg:order-2">
              <div className="animate-on-scroll">
                <span className="section-tag">เกี่ยวกับ LIFE Academy</span>
                <h2 className="section-title mt-2">
                  14 ปีที่เราช่วย<br />
                  <span className="text-[#1a56db]">เด็กหาดใหญ่ประสบความสำเร็จ</span>
                </h2>
                <p className="section-subtitle">
                  เราไม่ได้แค่สอนหนังสือ — เราสร้างนิสัยการเรียนรู้ที่ดี
                  ให้นักเรียนค้นพบศักยภาพที่แท้จริง และก้าวสู่เป้าหมายของตัวเอง
                </p>
              </div>

              <ul className="mt-8 space-y-3 animate-on-scroll delay-100">
                {[
                  'ครูผู้เชี่ยวชาญทุกวิชา ประสบการณ์ 5–15 ปี',
                  'ห้องเรียนขนาดเล็ก ไม่เกิน 10 คน',
                  'เรียนได้ทั้ง Onsite, Online และแบบส่วนตัว',
                  'มีระบบติดตามผลและรายงานให้ผู้ปกครอง',
                  'ปรับเนื้อหาตามหลักสูตรล่าสุดทุกปี',
                ].map(text => (
                  <li key={text} className="flex items-start gap-3 font-thai text-[#1e293b] text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3 animate-on-scroll delay-200">
                <a href="/contact" className="btn-primary">
                  ปรึกษาฟรี — ไม่มีค่าใช้จ่าย
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="container-max">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="section-tag">ทีมผู้บริหารสถาบัน</span>
            <h2 className="section-title mt-2">ผู้บริหารสถาบัน LIFE Academy</h2>
            <p className="section-subtitle mx-auto">
              มุ่งมั่นยกระดับวิชาการและดูแลเอาใจใส่นักเรียนทุกคนอย่างทั่วถึง
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CEO Card */}
            <div className="card flex flex-col sm:flex-row items-center gap-6 p-6 bg-white hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5">
              <div className="w-32 h-40 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm relative bg-slate-50">
                <img src="/ceo.jpg" alt="นางสาวอุทัยวรรณ ธรรมโภคิน" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-2 left-2 bg-[#f59e0b] text-[#0f2557] text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">CEO</div>
              </div>
              <div className="text-center sm:text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-ui font-extrabold text-lg text-[#0f2557]">นางสาวอุทัยวรรณ ธรรมโภคิน</h3>
                  <p className="font-thai text-[#f59e0b] text-xs font-semibold mt-1">CEO & Founder / ผู้ก่อตั้งสถาบัน</p>
                  <p className="font-thai text-[#475569] text-xs mt-3 leading-relaxed">
                    “มุ่งมั่นปั้นคนเก่ง ปูพื้นฐานความรู้เคียงคู่การสร้างคนดีเพื่ออนาคตของเด็กหาดใหญ่ทุกคน”
                  </p>
                </div>
                <div className="font-thai text-[10px] text-[#94a3b8] mt-4 border-t border-slate-100 pt-3">
                  บริหารและพัฒนาผู้เรียนสู่ความสำเร็จกว่า 14 ปี
                </div>
              </div>
            </div>

            {/* Manager Card */}
            <div className="card flex flex-col sm:flex-row items-center gap-6 p-6 bg-white hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5">
              <div className="w-32 h-40 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm relative bg-slate-50">
                <img src="/manager.jpg" alt="นายอาลาวี มูลทรัพย์" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-2 left-2 bg-[#1a56db] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">Manager</div>
              </div>
              <div className="text-center sm:text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-ui font-extrabold text-lg text-[#0f2557]">นายอาลาวี มูลทรัพย์</h3>
                  <p className="font-thai text-[#1a56db] text-xs font-semibold mt-1">ผู้จัดการสาขาหาดใหญ่</p>
                  <p className="font-thai text-[#475569] text-xs mt-3 leading-relaxed">
                    “ดูแลนักเรียนและผู้ปกครองเหมือนครอบครัวเดียวกัน เพื่อความสุขและสิ่งที่ดีที่สุดในการเรียนรู้”
                  </p>
                </div>
                <div className="font-thai text-[10px] text-[#94a3b8] mt-4 border-t border-slate-100 pt-3">
                  ควบคุมมาตรฐานวิชาการและการสอบ Level Test
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 animate-on-scroll">
            <a href="/teachers" className="btn-outline font-ui font-semibold inline-flex items-center gap-1">
              ทำความรู้จักคณะครูผู้สอนทั้งหมด →
            </a>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="section bg-[#f0f4ff]">
        <div className="container-max">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="section-tag">ทำไมต้อง LIFE Academy?</span>
            <h2 className="section-title mt-2">6 เหตุผลที่นักเรียนเลือกเรา</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`card-hover animate-on-scroll delay-${(i % 3 + 1) * 100}`}
              >
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-ui font-bold text-[#0f2557] mb-2 text-sm">{f.title}</h3>
                <p className="font-thai text-[#64748b] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="section-tag">เสียงจากนักเรียน</span>
            <h2 className="section-title mt-2">ผลลัพธ์ที่วัดได้จริง</h2>
            <p className="section-subtitle mx-auto">ไม่ใช่แค่คำสัญญา — ดูผลลัพธ์จริงจากนักเรียนของเรา</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`card-hover border-l-4 ${t.color} animate-on-scroll delay-${(i + 1) * 100}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full ${t.color.replace('border-', 'bg-').replace('[', '[').replace(']', ']')}/10 border ${t.color}`}>
                    <span className="font-ui font-bold text-xs text-[#0f2557]">{t.score}</span>
                    <span className="font-thai text-xs text-[#64748b] ml-1">{t.subject}</span>
                  </div>
                  <div className="text-[#f59e0b] text-sm">★★★★★</div>
                </div>
                <p className="font-thai text-[#1e293b] text-sm leading-relaxed mb-4 italic">
                  "{t.quote}"
                </p>
                <div>
                  <div className="font-ui font-semibold text-[#0f2557] text-sm">{t.name}</div>
                  <div className="font-thai text-[#64748b] text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
