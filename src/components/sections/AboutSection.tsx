'use client'

import { useState, useEffect, useRef } from 'react'
import { Award, Users, BookOpen, TrendingUp, Shield, Heart, CheckCircle2, Trophy, Sparkles, Star, X, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react'

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

const featuredAchievements = [
  { id: 1, src: '/success-1.jpg', category: 'onet-100', name: 'น้องภูมิใจ', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา ภาษาอังกฤษ' },
  { id: 2, src: '/success-2.jpg', category: 'onet-100', name: 'น้องไอซ์', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา คณิตศาสตร์' },
  { id: 5, src: '/success-5.jpg', category: 'exam-pass', name: 'น้องฝุ้นฝุ้น', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMT', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 7, src: '/success-7.jpg', category: 'exam-pass', name: 'น้องเจนนี่', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
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
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)

  const handlePrev = () => {
    if (selectedImageIdx === null) return
    setSelectedImageIdx(selectedImageIdx === 0 ? featuredAchievements.length - 1 : selectedImageIdx - 1)
  }

  const handleNext = () => {
    if (selectedImageIdx === null) return
    setSelectedImageIdx(selectedImageIdx === featuredAchievements.length - 1 ? 0 : selectedImageIdx + 1)
  }

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

      {/* Student Achievements Section */}
      <section className="section bg-[#f8fafc] border-y border-[#e2e8f0]" id="success">
        <div className="container-max">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-ui font-semibold text-xs tracking-wider uppercase mb-3">
              <Trophy className="w-3.5 h-3.5" /> Wall of Fame
            </span>
            <h2 className="section-title mt-1">คนเก่งของเรา</h2>
            <p className="section-subtitle mx-auto">
              ความภาคภูมิใจและผลสัมฤทธิ์ทางการศึกษาที่ยอดเยี่ยมของน้องๆ LIFE Academy จากความตั้งใจและเทคนิคการเรียนที่มีประสิทธิภาพ
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featuredAchievements.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedImageIdx(idx)}
                className="group bg-[#f8fafc] rounded-3xl overflow-hidden border border-[#e2e8f0]/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image with Decorative Overlay */}
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <img
                    src={item.src}
                    alt={`${item.name} - ${item.achievement}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Brand Logo Accent */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-sm">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                  </div>

                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-amber-500 text-slate-900 font-ui font-extrabold text-xs px-4 py-2 rounded-2xl shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> คลิกชมใบประกาศ
                    </span>
                  </div>
                </div>

                {/* Text Area */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-slate-100/50">
                  <div>
                    <div className="flex items-center gap-1 text-amber-600 font-ui font-extrabold text-[10px] uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {item.category === 'onet-100' ? 'ONET 100 FULL' : 'ENTRANCE PASS'}
                    </div>
                    <h3 className="font-ui font-extrabold text-base text-[#0f2557] mt-1.5 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="font-thai font-semibold text-slate-700 text-xs mt-1 leading-snug">
                      {item.achievement}
                    </p>
                  </div>
                  
                  <div className="font-thai text-[11px] text-slate-500 mt-2.5 border-t border-slate-100 pt-2 line-clamp-1">
                    🏫 {item.school}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 animate-on-scroll">
            <a href="/hall-of-fame" className="btn-primary bg-[#0f2557] hover:bg-[#1a56db] text-white py-3 px-8 font-ui font-bold text-xs shadow-md shadow-blue-900/10 inline-flex items-center gap-1.5 rounded-2xl">
              ดูทำเนียบคนเก่งทั้งหมด →
            </a>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImageIdx !== null && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 select-none">
            {/* Close button */}
            <button
              onClick={() => setSelectedImageIdx(null)}
              className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors"
              aria-label="ปิดใบประกาศ"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors hidden sm:block"
              aria-label="ใบประกาศก่อนหน้า"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main view container */}
            <div className="max-w-2xl w-full max-h-[85vh] flex flex-col justify-center items-center text-white relative px-4">
              <img
                src={featuredAchievements[selectedImageIdx].src}
                alt={`${featuredAchievements[selectedImageIdx].name} - ${featuredAchievements[selectedImageIdx].achievement}`}
                className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/10 bg-slate-900"
              />
              
              {/* Bottom details pill */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl px-6 py-4 mt-4 text-center max-w-lg border border-white/5 shadow-lg">
                <div className="text-amber-500 font-ui font-extrabold text-[10px] uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> CONGRATULATIONS TO SUCCESS
                </div>
                <h3 className="font-ui font-extrabold text-base text-white">
                  {featuredAchievements[selectedImageIdx].name}
                </h3>
                <p className="font-thai text-white/80 text-xs mt-1.5">
                  {featuredAchievements[selectedImageIdx].achievement} ({featuredAchievements[selectedImageIdx].school})
                </p>
              </div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors hidden sm:block"
              aria-label="ใบประกาศถัดไป"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile swipe tip */}
            <div className="absolute bottom-4 left-0 right-0 text-center sm:hidden text-white/30 text-[10px] font-ui">
              ← ปัดซ้าย หรือ ปัดขวา เพื่อเลื่อนสไลด์ใบประกาศ →
            </div>
          </div>
        )}
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
