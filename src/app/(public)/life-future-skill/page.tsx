import Link from 'next/link'
import { Sparkles, Mic2, Brain, Crown, ArrowRight, MessageCircle, CheckCircle, Star } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Life Future Skill — LIFE Academy',
  description: 'โปรแกรมพัฒนาทักษะในศตวรรษที่ 21 สำหรับเยาวชน เตรียมพร้อมสู่อนาคต ด้วยหลักสูตร Glowing Up, Communication Skill, Brain Booster และ Young Leadership Camp',
}

const programs = [
  {
    id: 'glowing-up',
    icon: Sparkles,
    color: '#f59e0b',
    bg: 'bg-amber-50',
    badge: 'SELF DEVELOPMENT',
    title: 'Glowing Up',
    subtitle: 'โปรแกรมพัฒนาบุคลิกภาพและความมั่นใจ',
    desc: 'ปลดล็อกศักยภาพในตัวคุณ สร้างบุคลิกภาพที่น่าประทับใจ ตั้งแต่การดูแลตัวเอง มารยาท ทัศนคติเชิงบวก ไปจนถึงการสร้างภาพลักษณ์ที่ดีในสังคม',
    outcomes: [
      'สร้างความมั่นใจในตนเองและการแสดงออก',
      'พัฒนาบุคลิกภาพและมารยาทสังคม',
      'ปลูกฝัง Growth Mindset เพื่อการเติบโตอย่างต่อเนื่อง',
      'เทคนิค Self-care และการดูแลสุขภาพกายใจ',
    ],
  },
  {
    id: 'communication-skill',
    icon: Mic2,
    color: '#1a56db',
    bg: 'bg-blue-50',
    badge: 'COMMUNICATION',
    title: 'Communication Skill',
    subtitle: 'ทักษะการสื่อสารและการพูดในที่สาธารณะ',
    desc: 'ทักษะสำคัญที่สุดในศตวรรษที่ 21 — เรียนรู้ศาสตร์การสื่อสารอย่างมีประสิทธิภาพ การพูดต่อหน้าชุมชน การเขียน และการฟังอย่างเข้าใจ',
    outcomes: [
      'เทคนิคการพูดต่อสาธารณะอย่างมั่นใจ',
      'ทักษะการสื่อสารในทีมและการเจรจาต่อรอง',
      'ฝึก Storytelling และการนำเสนอด้วย Slide',
      'การสื่อสารทั้ง Thai และ English ในสถานการณ์จริง',
    ],
  },
  {
    id: 'brain-booster',
    icon: Brain,
    color: '#7c3aed',
    bg: 'bg-violet-50',
    badge: 'COGNITIVE SKILLS',
    title: 'Brain Booster Program',
    subtitle: 'โปรแกรมเพิ่มประสิทธิภาพการคิดและเรียนรู้',
    desc: 'ฝึกฝนสมองให้ทำงานได้อย่างชาญฉลาด ด้วยเทคนิคการจดจำ การคิดเชิงตรรกะ การแก้ปัญหาเชิงสร้างสรรค์ และการบริหารเวลาอย่างมืออาชีพ',
    outcomes: [
      'Mind Map และเทคนิคจดจำขั้นสูง',
      'Critical Thinking และ Problem Solving',
      'การบริหารเวลาและจัดลำดับความสำคัญ',
      'เทคนิค Speed Reading และการจับใจความ',
    ],
  },
  {
    id: 'young-leadership',
    icon: Crown,
    color: '#059669',
    bg: 'bg-emerald-50',
    badge: 'LEADERSHIP CAMP',
    title: 'Young Leadership Camp',
    subtitle: 'แคมป์พัฒนาผู้นำรุ่นใหม่',
    desc: 'ประสบการณ์เข้มข้นในรูปแบบแคมป์ เพื่อปั้นผู้นำรุ่นใหม่ที่มีวิสัยทัศน์ รับผิดชอบสังคม และสามารถขับเคลื่อนทีมสู่ความสำเร็จ',
    outcomes: [
      'Workshop ผู้นำทีมและการตัดสินใจภายใต้แรงกดดัน',
      'Project-based Learning แก้ปัญหาชุมชน',
      'การสร้าง Network กับเยาวชนรุ่นใหม่ทั่วภาคใต้',
      'ใบรับรองการร่วมกิจกรรมและ Portfolio',
    ],
  },
]

export default function LifeFutureSkillPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] via-[#1a3a8f] to-[#7c3aed] py-24 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-[300px] h-[300px] rounded-full bg-[#f59e0b]/10 blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/15">
            21st CENTURY SKILLS PROGRAM
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Life Future Skill
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            โปรแกรมพัฒนาทักษะชีวิตและทักษะในศตวรรษที่ 21 สำหรับเยาวชน
            ที่ไม่ใช่แค่เก่งวิชาการ แต่พร้อมเผชิญโลกอนาคตอย่างมั่นใจ
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {['Glowing Up', 'Communication Skill', 'Brain Booster', 'Young Leadership Camp'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-ui border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 px-4 sm:px-6 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="section-tag">ทำไมต้อง Life Future Skill?</span>
            <h2 className="font-display font-bold text-3xl text-[#0f2557] leading-tight">
              เพราะโลกอนาคต<br />ต้องการมากกว่าเกรด
            </h2>
            <p className="font-thai text-[#64748b] text-sm leading-relaxed">
              ในยุค AI และการเปลี่ยนแปลงอย่างรวดเร็ว ทักษะที่แตกต่างเยาวชนออกจากกันไม่ใช่คะแนนสอบ
              แต่คือ ความสามารถในการสื่อสาร ความคิดสร้างสรรค์ การนำตัวเอง และการทำงานร่วมกับผู้อื่น
            </p>
            <p className="font-thai text-[#64748b] text-sm leading-relaxed">
              LIFE Academy ออกแบบโปรแกรม Life Future Skill เพื่อเติมเต็มช่องว่างที่ห้องเรียนปกติไม่ได้สอน
              ผ่านกิจกรรม Workshop, Camp และการฝึกปฏิบัติจริงในบรรยากาศที่สนุกและปลอดภัย
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'หลักสูตร', value: '4', unit: 'โปรแกรม' },
              { label: 'กลุ่มเป้าหมาย', value: 'ป.4–ม.6', unit: '' },
              { label: 'รูปแบบ', value: 'Workshop', unit: '& Camp' },
              { label: 'ใบรับรอง', value: 'Certificate', unit: 'ทุกหลักสูตร' },
            ].map(stat => (
              <div key={stat.label} className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-5 text-center">
                <div className="font-ui font-black text-2xl text-[#1a56db]">{stat.value}</div>
                {stat.unit && <div className="font-ui text-xs text-[#64748b]">{stat.unit}</div>}
                <div className="font-thai text-xs text-[#94a3b8] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="section-tag mx-auto">โปรแกรมทั้งหมด</span>
            <h2 className="font-display font-black text-3xl text-[#0f2557]">เลือกหลักสูตรที่ใช่สำหรับคุณ</h2>
            <p className="font-thai text-[#64748b] text-sm">แต่ละโปรแกรมออกแบบเฉพาะเพื่อพัฒนาทักษะที่แตกต่างกัน</p>
          </div>

          <div className="space-y-8">
            {programs.map((program, idx) => {
              const Icon = program.icon
              const isEven = idx % 2 === 0
              return (
                <div
                  key={program.id}
                  className={`bg-white rounded-3xl border border-[#e2e8f0] shadow-sm overflow-hidden grid md:grid-cols-2 gap-0 hover:shadow-lg transition-shadow duration-300`}
                >
                  {/* Icon side */}
                  <div
                    className={`flex flex-col justify-center items-center p-10 gap-4 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                    style={{ background: `linear-gradient(135deg, ${program.color}15, ${program.color}05)` }}
                  >
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-sm" style={{ background: program.color }}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-ui font-bold tracking-widest uppercase border" style={{ color: program.color, borderColor: `${program.color}40`, background: `${program.color}10` }}>
                      {program.badge}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: program.color }} />
                      ))}
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`p-8 sm:p-10 space-y-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div>
                      <h3 className="font-display font-black text-2xl text-[#0f2557]">{program.title}</h3>
                      <p className="font-thai text-sm mt-1" style={{ color: program.color }}>{program.subtitle}</p>
                    </div>
                    <p className="font-thai text-[#64748b] text-sm leading-relaxed">{program.desc}</p>
                    <div className="space-y-2">
                      <h4 className="font-ui font-bold text-[#0f2557] text-xs uppercase tracking-wide">สิ่งที่จะได้รับ</h4>
                      <ul className="space-y-2">
                        {program.outcomes.map(outcome => (
                          <li key={outcome} className="flex gap-2 items-start">
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: program.color }} />
                            <span className="font-thai text-[#475569] text-xs">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="https://lin.ee/xvYZMZP"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-ui font-semibold px-4 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
                      style={{ background: program.color }}
                    >
                      สอบถามหลักสูตรนี้ <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Format Section */}
      <section className="py-16 px-4 sm:px-6 bg-white border-y border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="section-tag mx-auto">รูปแบบการเรียนรู้</span>
            <h2 className="font-display font-bold text-2xl text-[#0f2557]">เรียนสนุก ได้ทักษะจริง</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Interactive Workshop', desc: 'กิจกรรมกลุ่มแบบลงมือปฏิบัติจริง ไม่นั่งฟังบรรยายอย่างเดียว มีเกม Role Play และ Case Study' },
              { num: '02', title: 'Leadership Camp', desc: 'แคมป์ค้างคืน 1–3 วัน เน้นประสบการณ์ร่วมกับเพื่อนจากหลายสถาบัน สร้างทักษะและมิตรภาพ' },
              { num: '03', title: 'Online & Onsite', desc: 'ยืดหยุ่นเลือกได้ทั้งรูปแบบออนไลน์ผ่าน Zoom หรือเข้าเรียนที่สถาบันโดยตรง' },
            ].map(item => (
              <div key={item.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="font-ui font-black text-3xl text-[#e2e8f0]">{item.num}</div>
                <h4 className="font-ui font-bold text-[#0f2557]">{item.title}</h4>
                <p className="font-thai text-[#64748b] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#0f2557] to-[#7c3aed] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 left-1/3 w-60 h-60 bg-[#f59e0b]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 max-w-xl relative z-10 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-ui border border-white/10 font-semibold uppercase tracking-wider">
                สมัครเรียน / สอบถาม
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                พร้อมพัฒนาทักษะอนาคต<br />เริ่มต้นได้วันนี้
              </h3>
              <p className="font-thai text-white/70 text-sm leading-relaxed">
                ทักทายเพื่อสอบถามรายละเอียด กำหนดการเปิดรุ่น และค่าใช้จ่าย
                ทีมงานยินดีให้คำปรึกษาทุกวัน
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
              <a
                href="https://lin.ee/xvYZMZP"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none text-white py-3 px-6 text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> แอดไลน์สอบถาม
              </a>
              <Link
                href="/contact"
                className="btn-primary bg-white hover:bg-slate-100 text-[#0f2557] py-3 px-6 text-sm flex items-center justify-center gap-2"
              >
                ติดต่อสถาบัน <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
