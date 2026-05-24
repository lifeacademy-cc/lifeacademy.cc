import type { Metadata } from 'next'
import { CheckCircle2, Award, Mail, MessageCircle, Heart, Star, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ทีมผู้บริหารและครูผู้สอน — LIFE Academy',
  description: 'ทำความรู้จักทีมผู้บริหารและคณะครูผู้เชี่ยวชาญของ LIFE Academy หาดใหญ่ นำโดย CEO นางสาวอุทัยวรรณ ธรรมโภคิน และผู้จัดการสาขา นายอาลาวี มูลทรัพย์',
}

interface Executive {
  name: string
  role: string
  image: string
  quote: string
  bio: string[]
  stats: { label: string; value: string }[]
}

const executives: Executive[] = [
  {
    name: 'นางสาวอุทัยวรรณ ธรรมโภคิน',
    role: 'CEO & Founder / ผู้ก่อตั้งสถาบัน',
    image: '/ceo.jpg',
    quote: '“มุ่งมั่นปั้นคนเก่ง ปูพื้นฐานความรู้เคียงคู่การสร้างคนดีเพื่ออนาคตของเด็กหาดใหญ่ทุกคน”',
    bio: [
      'ผู้ก่อตั้งและบริหารสถาบัน LIFE Academy มายาวนานกว่า 14 ปี',
      'พัฒนาหลักสูตรการเรียนที่เน้นความเข้าใจและการนำไปใช้จริง',
      'ส่งต่อนักเรียนสู่ความสำเร็จและสอบเข้ามหาวิทยาลัยชั้นนำแล้วกว่า 5,000 คน',
    ],
    stats: [
      { label: 'ประสบการณ์', value: '14+ ปี' },
      { label: 'ความสำเร็จ', value: '5,000+ ศิษย์เก่า' },
    ],
  },
  {
    name: 'นายอาลาวี มูลทรัพย์',
    role: 'Hatyai Branch Manager / ผู้จัดการสาขาหาดใหญ่',
    image: '/manager.jpg',
    quote: '“ดูแลนักเรียนและผู้ปกครองเหมือนครอบครัวเดียวกัน เพื่อความสุขและสิ่งที่ดีที่สุดในการเรียนรู้”',
    bio: [
      'ดูแลภาพรวมการบริหารการจัดการ การตารางสอนและการดูแลความปลอดภัยนักเรียน',
      'ควบคุมมาตรฐานการประเมินวิเคราะห์ผลสอบระดับ (Level Test)',
      'ผู้ประสานงานหลักระหว่างคุณครูวิชาการ นักเรียน และผู้ปกครองอย่างใกล้ชิด',
    ],
    stats: [
      { label: 'ดูแลระบบเรียน', value: '100% ครอบคลุม' },
      { label: 'การันตีบริการ', value: 'ดีเด่น' },
    ],
  },
]

const teachers = [
  {
    name: 'ครูพี่แนน',
    role: 'หัวหน้าฝ่ายวิชาการภาษาอังกฤษ',
    education: 'อักษรศาสตรบัณฑิต (เกียรตินิยมอันดับ 1) / IELTS 8.5',
    specialty: 'เชี่ยวชาญการปูพื้นฐานแกรมม่าและการเตรียมสอบเข้า ม.1/ม.4 และมหาวิทยาลัย',
    initials: 'EN',
    color: 'bg-gradient-to-br from-blue-500 to-[#1a56db]',
  },
  {
    name: 'ครูพี่บิ๊ก',
    role: 'หัวหน้าฝ่ายวิชาการคณิตศาสตร์',
    education: 'วิทยาศาสตรบัณฑิต (คณิตศาสตร์ประยุกต์) ม.อ.',
    specialty: 'เชี่ยวชาญเทคนิคคิดลัด ปรับทัศนคติคณิตศาสตร์ จากยากให้กลายเป็นเรื่องสนุก',
    initials: 'MATH',
    color: 'bg-gradient-to-br from-[#f59e0b] to-amber-600',
  },
  {
    name: 'ครูพี่เอ็น',
    role: 'ครูผู้เชี่ยวชาญวิทยาศาสตร์ & เคมี',
    education: 'ศึกษาศาสตรมหาบัณฑิต (การสอนวิทยาศาสตร์)',
    specialty: 'เน้นการสอนแบบเห็นภาพผ่านการทดลองและการคิดวิเคราะห์อย่างเป็นระบบ',
    initials: 'SCI',
    color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
  },
]

export default function TeachersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-20 px-4 text-center overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl translate-y-1/2"></div>
        
        <div className="relative container-max">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-ui font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" /> TEAM & LEADERSHIP
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            ทีมผู้บริหารและ<span className="text-[#f59e0b]">ครูผู้สอน</span>
          </h1>
          <p className="font-thai text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            เบื้องหลังความสำเร็จกว่า 14 ปีของเด็กหาดใหญ่ ด้วยคณะครูผู้เชี่ยวชาญเฉพาะทางและการดูแลเอาใจใส่อย่างเป็นระบบ
          </p>
        </div>
      </section>

      {/* Executives Section */}
      <section className="section bg-[#f0f4ff]">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="section-tag">คณะผู้บริหารสถาบัน</span>
            <h2 className="section-title mt-2">วิสัยทัศน์และการบริหารจัดการ</h2>
            <p className="section-subtitle mx-auto">
              พร้อมขับเคลื่อนศักยภาพเด็กๆ และเคียงข้างทุกก้าวการเรียนรู้ของคุณครู นักเรียน และผู้ปกครอง
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {executives.map((exec, idx) => (
              <div 
                key={exec.name} 
                className="bg-white rounded-3xl overflow-hidden border border-[#e2e8f0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Image Container with Custom Brand Overlay */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={exec.image}
                    alt={exec.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2557]/80 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="font-ui font-extrabold text-xs text-[#0f2557] tracking-wider">
                      {idx === 0 ? '✨ FOUNDER' : '🛡️ MANAGEMENT'}
                    </span>
                  </div>

                  {/* Name and Role Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="font-display font-extrabold text-xl sm:text-2xl drop-shadow-md">{exec.name}</div>
                    <div className="font-thai text-sm text-white/90 font-medium mt-1 drop-shadow-sm">{exec.role}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quote */}
                    <div className="font-thai italic font-semibold text-[#1a56db] text-sm md:text-base mb-6 pl-4 border-l-4 border-[#f59e0b] leading-relaxed bg-[#f0f4ff]/40 py-3 pr-3 rounded-r-xl">
                      {exec.quote}
                    </div>

                    {/* Bio details */}
                    <div className="space-y-3 mb-8">
                      {exec.bio.map((point) => (
                        <div key={point} className="flex items-start gap-2.5 font-thai text-[#475569] text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Footer */}
                  <div className="border-t border-slate-100 pt-6 mt-auto">
                    <div className="grid grid-cols-2 gap-4">
                      {exec.stats.map((st) => (
                        <div key={st.label} className="bg-[#f8fafc] rounded-2xl p-3.5 text-center border border-slate-100">
                          <div className="font-ui font-extrabold text-[#0f2557] text-lg">{st.value}</div>
                          <div className="font-thai text-[#64748b] text-[11px] mt-0.5">{st.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Team Section */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="section-tag">ทีมวิชาการมืออาชีพ</span>
            <h2 className="section-title mt-2">ครูผู้สอนระดับแนวหน้า</h2>
            <p className="section-subtitle mx-auto">
              คัดเลือกครูระดับหัวกะทิที่มีความรู้ลึกซึ้ง และจิตวิทยาการถ่ายทอดสูง เพื่อผลลัพธ์ที่ดีที่สุดสำหรับน้องๆ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((teacher, i) => (
              <div 
                key={teacher.name} 
                className="bg-white rounded-3xl p-8 border border-[#e2e8f0] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Avatar */}
                  <div className={`w-14 h-14 rounded-2xl ${teacher.color} flex items-center justify-center mb-6 shadow-md shadow-blue-500/10`}>
                    <span className="font-display font-extrabold text-white text-base tracking-wider">{teacher.initials}</span>
                  </div>

                  {/* Header info */}
                  <h3 className="font-ui font-extrabold text-lg text-[#0f2557] group-hover:text-[#1a56db] transition-colors">
                    {teacher.name}
                  </h3>
                  <div className="font-thai font-semibold text-[#f59e0b] text-xs mt-1">
                    {teacher.role}
                  </div>
                  
                  {/* Education info */}
                  <div className="bg-[#f8fafc] p-3 rounded-xl border border-slate-100 my-4 text-xs font-thai text-[#64748b] leading-relaxed">
                    🎓 {teacher.education}
                  </div>

                  {/* Specialty */}
                  <p className="font-thai text-sm text-[#475569] leading-relaxed mt-2">
                    {teacher.specialty}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 mt-6 flex items-center justify-between text-xs font-ui">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                    ประเมินการสอนดีเยี่ยม
                  </div>
                  <span className="text-[#64748b]">100% ใส่ใจ</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="section bg-[#f8fafc]">
        <div className="container-max">
          <div className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-2xl translate-x-1/3 translate-y-1/3"></div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10">
              <div className="lg:col-span-2">
                <span className="font-ui text-[#f59e0b] font-extrabold text-xs tracking-wider uppercase">OUR PROMISE & CARE</span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl mt-2 mb-4 leading-snug">
                  ส่งมอบการดูแลทางวิชาการและผลลัพธ์ที่ดีที่สุดสำหรับลูกของคุณ
                </h3>
                <p className="font-thai text-white/70 text-sm md:text-base leading-relaxed">
                  เราเชื่อมั่นว่าเด็กแต่ละคนมีเวลาในการเติบโตและความเข้าใจที่แตกต่างกัน คณะผู้บริหารและคุณครูทุกท่านจึงมุ่งดูแลนักเรียนเป็นรายบุคคล ปรับยุทธวิธีและเนื้อหาให้สอดคล้องกับพัฒนาการของเด็กอย่างแท้จริง
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col justify-center lg:items-end">
                <a href="/level-test" className="btn-primary bg-[#f59e0b] text-[#0f2557] hover:bg-[#d97706] text-center py-3.5 font-bold shadow-md shadow-amber-500/10">
                  ทดสอบวัดระดับฟรี
                </a>
                <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white/10 text-center py-3.5 flex items-center justify-center gap-1.5">
                  <MessageCircle className="w-4 h-4" /> แอดไลน์คุยกับครู
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
