import Link from 'next/link'
import { Heart, Brain, Users, Award, Sparkles, MessageCircle, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บริการปรึกษาพัฒนาทักษะชีวิต — LIFE Academy',
  description: 'บริการปรึกษาและจัดกิจกรรมเพื่อพัฒนาทักษะชีวิต (Life Skills) ความฉลาดทางอารมณ์ (EQ) และทักษะทางสังคม (Soft Skills) สำหรับเยาวชน',
}

export default function LifeSkillsServicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-20 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#fecdd3]/10 blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-ui font-bold tracking-widest uppercase border border-rose-500/20">
            EMOTIONAL INTELLIGENCE & SOFT SKILLS
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            พัฒนาทักษะชีวิต เพื่อความสำเร็จที่ยั่งยืน
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            เพราะ "ความรู้เรียนทันกันได้ แต่ทักษะชีวิตและทัศนคติคือรากฐานความสำเร็จในอนาคต"
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Concept Block */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="section-tag">ทักษะชีวิตสำหรับศตวรรษที่ 21</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0f2557] leading-tight">
                เก่งวิชาการอย่างเดียว<br />อาจไม่เพียงพออีกต่อไป
              </h2>
              <p className="font-thai text-[#64748b] text-sm leading-relaxed">
                ในยุคที่เทคโนโลยีพัฒนาอย่างก้าวกระโดด ทักษะที่หุ่นยนต์ทำแทนไม่ได้คือ Soft Skills และทักษะชีวิต (Life Skills) การเรียนรู้เพื่อทำความเข้าใจตนเอง การจัดการสภาวะจิตใจ การปรับตัว และการอยู่ร่วมกับผู้อื่น เป็นแกนหลักที่ทำให้เด็กเติบโตอย่างมีความมั่นใจและมีความสุข
              </p>
              <p className="font-thai text-[#64748b] text-sm leading-relaxed">
                LIFE Academy ไม่ใช่แค่สถาบันกวดวิชาที่มุ่งเน้นการสอบเข้าเท่านั้น แต่เราใส่ใจในการให้คำแนะนำด้านการพัฒนาทัศนคติเชิงบวก (Growth Mindset) และความฉลาดทางอารมณ์ (EQ) ควบคู่ไปด้วย
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-6">
              <h3 className="font-ui font-bold text-[#0f2557] text-lg">หัวข้อที่ให้คำปรึกษาและพัฒนา</h3>
              <div className="space-y-4">
                {[
                  { icon: Brain, title: 'การจัดการอารมณ์และความเครียด (EQ)', desc: 'ทักษะการเข้าใจสภาวะอารมณ์ของตนเอง การผ่อนคลายความตึงเครียดจากการเรียนและการสอบเข้า' },
                  { icon: Users, title: 'ทักษะทางสังคมและการสื่อสาร (Social Skills)', desc: 'การนำเสนอตัวเอง การสื่อสารอย่างสร้างสรรค์เพื่อสร้างความสัมพันธ์อันดีกับผู้คนรอบข้าง' },
                  { icon: Heart, title: 'ความเคารพในตนเองและการสร้างเป้าหมาย (Self-Esteem)', desc: 'การมองเห็นคุณค่าในตัวเอง และกระบวนการคิดเพื่อวางเป้าหมายของชีวิตอย่างอิสระ' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" />
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

          {/* Activities and Consulting Format */}
          <div className="bg-white border border-[#e2e8f0] rounded-3xl p-8 sm:p-10 shadow-sm space-y-10">
            <div className="max-w-xl mx-auto space-y-2 text-center">
              <span className="section-tag mx-auto">รูปแบบการให้บริการ</span>
              <h2 className="font-display font-extrabold text-2xl text-[#0f2557]">กิจกรรมและการให้คำปรึกษา</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'One-on-One Counseling', desc: 'การพูดคุยส่วนตัวเพื่อรับฟังปัญหาและความอึดอัดใจ โดยเน้นบรรยากาศที่อบอุ่นและปลอดภัยสำหรับเยาวชน' },
                { title: 'Parent & Child Guidance', desc: 'การพูดคุยเพื่อปรับความเข้าใจและแนะแนวการสื่อสารในครอบครัว ลดช่องว่างระหว่างวัยในการเตรียมสอบและชีวิตส่วนตัว' },
                { title: 'Growth Mindset Workshop', desc: 'กิจกรรมกลุ่มย่อยแบบมีปฏิสัมพันธ์ (Interactive Workshop) สนุกสนาน สร้างพลังใจและมิตรภาพใหม่ๆ' },
              ].map((item, idx) => (
                <div key={item.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0f2557] text-white flex items-center justify-center font-ui font-bold text-xs">{idx + 1}</div>
                  <h4 className="font-ui font-bold text-[#0f2557] text-base">{item.title}</h4>
                  <p className="font-thai text-[#64748b] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 max-w-xl relative z-10 text-center md:text-left">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                ร่วมพูดคุยหรือปรึกษาทักษะชีวิตนักเรียน
              </h3>
              <p className="font-thai text-white/70 text-sm leading-relaxed">
                หากผู้ปกครองหรือน้องๆ ต้องการพูดคุยเพื่อแนะแนว ปรึกษาปัญหาระหว่างเรียน หรือขอคำปรึกษาการปรับตัวเข้ากับสังคม สามารถทักสอบถามคิวกับทีมอาจารย์ได้ฟรี
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
              <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none text-white py-3 px-6 text-sm flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> แอดไลน์ปรึกษาฟรี
              </a>
              <Link href="/contact" className="btn-primary bg-white hover:bg-slate-100 text-[#0f2557] py-3 px-6 text-sm flex items-center justify-center gap-2">
                ติดต่อสอบถาม <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
