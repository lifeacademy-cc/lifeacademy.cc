import Link from 'next/link'
import { Sparkles, Calendar, Target, Award, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา — LIFE Academy',
  description: 'ทำความรู้จัก LIFE Academy สถาบันกวดวิชาชั้นนำในหาดใหญ่ ประสบการณ์กว่า 14 ปี กับวิสัยทัศน์ พันธกิจ และทีมผู้บริหารผู้เชี่ยวชาญ',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-20 px-4 relative overflow-hidden text-center text-white">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#fecdd3]/5 blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            DISCOVER OUR STORY & VALUES
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            ทำความรู้จัก LIFE Academy
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            สถาบันการเรียนรู้ที่มุ่งเน้นความเป็นเลิศทางวิชาการ ควบคู่การสร้างพัฒนาการและทักษะชีวิตของเยาวชนเพื่ออนาคต
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-4 sm:px-6" id="history">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="section-tag">ประวัติความเป็นมา</span>
            <h2 className="font-display font-bold text-3xl text-[#0f2557] leading-tight">
              14 ปีแห่งความไว้วางใจ<br />และการผลักดันเยาวชน
            </h2>
            <p className="font-thai text-[#64748b] text-sm leading-relaxed">
              LIFE Academy ก่อตั้งขึ้น ณ อำเภอหาดใหญ่ จังหวัดสงขลา ด้วยเจตนารมณ์ที่มุ่งหวังจะยกระดับมาตรฐานการศึกษาในภาคใต้ เราเริ่มต้นจากการเป็นศูนย์กวดวิชาขนาดเล็กที่สอนโดยอาจารย์ผู้เชี่ยวชาญเฉพาะทาง จนกระทั่งได้รับความไว้วางใจจากผู้ปกครองและนักเรียนมาอย่างยาวนานกว่า 14 ปี
            </p>
            <p className="font-thai text-[#64748b] text-sm leading-relaxed">
              ในปัจจุบัน เราได้ช่วยส่งเสริมนักเรียนมากกว่า 5,000 คนให้ประสบความสำเร็จตามความคาดหวัง ทั้งการสอบเข้าศึกษาต่อในระดับ ม.1 และ ม.4 โรงเรียนชื่อดัง รวมถึงการสอบเข้าแข่งขันในระดับประเทศ พร้อมปรับตัวเข้ากับรูปแบบการเรียนการสอนสมัยใหม่ ทั้งในสถาบัน (Onsite) และผ่านสื่อออนไลน์สด (Online)
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a56db]/20 to-[#f59e0b]/20 rounded-3xl blur-2xl -z-10" />
            <img 
              src="/logo.jpg" 
              alt="LIFE Academy Team & Learning" 
              className="rounded-3xl shadow-xl w-full aspect-video md:aspect-[4/3] object-cover border border-slate-200"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#0f2557] text-white relative overflow-hidden" id="vision">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-ui font-semibold uppercase tracking-wider">
              Vision & Mission
            </span>
            <h2 className="font-display font-black text-3xl text-white">วิสัยทัศน์ และพันธกิจ</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#f59e0b] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#0f2557]" />
              </div>
              <h3 className="font-ui font-bold text-xl text-white">วิสัยทัศน์ (Vision)</h3>
              <p className="font-thai text-white/70 text-sm leading-relaxed">
                เป็นสถาบันการเรียนรู้ชั้นนำที่พัฒนาศักยภาพผู้เรียนอย่างรอบด้าน มุ่งหวังให้เยาวชนไม่เพียงแต่เป็นผู้ที่มีความเป็นเลิศทางวิชาการ แต่ยังเปี่ยมไปด้วยคุณธรรม ความฉลาดทางอารมณ์ และมีทักษะชีวิตพร้อมก้าวทันโลกศตวรรษที่ 21
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#1a56db] flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-ui font-bold text-xl text-white">พันธกิจ (Mission)</h3>
              <ul className="space-y-3 font-thai text-white/70 text-sm">
                <li className="flex gap-2 items-start">
                  <span className="text-[#f59e0b] mt-1">•</span>
                  <span>ออกแบบและพัฒนาหลักสูตรการติวที่เปี่ยมประสิทธิภาพ เน้นความเข้าใจลึกซึ้งและการประยุกต์ใช้จริง</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#f59e0b] mt-1">•</span>
                  <span>คัดสรรและส่งเสริมทีมคุณครูผู้สอนมืออาชีพ ที่ใส่ใจในความแตกต่างและการเรียนรู้ส่วนบุคคลของเด็ก</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#f59e0b] mt-1">•</span>
                  <span>สร้างบรรยากาศและสิ่งแวดล้อมที่กระตุ้นความอยากรู้ ปลอดภัย และส่งเสริมสุขภาพจิตของเยาวชน</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Executives & Team Section */}
      <section className="py-20 px-4 sm:px-6" id="team">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="section-tag mx-auto">คณะผู้บริหาร</span>
            <h2 className="font-display font-black text-3xl text-[#0f2557]">ผู้บริหาร และทีมวิชาการ</h2>
            <p className="font-thai text-[#64748b] text-sm">
              บุคลากรผู้เบื้องหลังความสำเร็จและขับเคลื่อนสถาบันด้วยประสบการณ์และความเชี่ยวชาญการแนะแนว
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {[
              { name: 'ดร. พงษ์ภูมิ ใจดี', role: 'ผู้ก่อตั้งและผู้อำนวยการสถาบัน', desc: 'กว่า 15 ปีในวงการบริหารการศึกษา ออกแบบระบบการติวระดับมาตรฐานสากล' },
              { name: 'ครูเด่น มาสเตอร์ฟา', role: 'ผู้อำนวยการฝ่ายวิชาการและแนะแนว', desc: 'ผู้เชี่ยวชาญการวางกลยุทธ์ Roadmap เตรียมสอบเข้า ม.1 และ ม.4 โรงเรียนชั้นนำ' },
              { name: 'อาจารย์นภัสสร อักษรศิลป์', role: 'หัวหน้างานหลักสูตรประถมศึกษา', desc: 'ผู้ออกแบบหลักสูตรกิจกรรมและการประเมินทักษะชีวิต (Life Skills)' },
            ].map(member => (
              <div key={member.name} className="bg-white rounded-3xl border border-[#e2e8f0] p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#f0f4ff] flex items-center justify-center mb-5">
                    <Users className="w-8 h-8 text-[#1a56db]" />
                  </div>
                  <h3 className="font-ui font-bold text-lg text-[#0f2557]">{member.name}</h3>
                  <div className="font-ui font-semibold text-[#f59e0b] text-xs mt-1">{member.role}</div>
                  <p className="font-thai text-[#64748b] text-xs mt-3 leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <p className="font-thai text-[#64748b] text-sm mb-4">
              ต้องการทำความรู้จักทีมงานครูผู้สอนเพิ่มติมใช่หรือไม่?
            </p>
            <Link href="/teachers" className="btn-primary inline-flex items-center gap-2 text-xs">
              ทำเนียบครูผู้สอน <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
