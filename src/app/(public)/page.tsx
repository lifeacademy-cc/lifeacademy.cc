import HeroSection       from '@/components/sections/HeroSection'
import AboutSection      from '@/components/sections/AboutSection'
import CoursesPreview    from '@/components/sections/CoursesPreview'
import ExhibitionGallery from '@/components/sections/ExhibitionGallery'
import WallOfFame        from '@/components/sections/WallOfFame'
import RegisterForm      from '@/components/home/RegisterForm'
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LIFE Academy — สถาบันติวเตอร์ หาดใหญ่ | เรียนให้ได้ผล ด้วยครูมืออาชีพ',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CoursesPreview />
      <ExhibitionGallery />
      <WallOfFame />
      <ContactSection />
    </>
  )
}

// ─── Contact / Register Section ───────────────────────────

function ContactSection() {
  return (
    <section className="section bg-white" id="contact">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Form */}
          <div>
            <span className="section-tag">ติดต่อ / ลงทะเบียน</span>
            <h2 className="section-title mt-2">
              เริ่มต้นการเรียน<br />
              <span className="text-[#1a56db]">ฟรีทันที</span>
            </h2>
            <p className="section-subtitle mb-8">
              กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมง
              เพื่อนัดทดสอบระดับและเลือกหลักสูตรที่เหมาะกับคุณ
            </p>
            <div className="card">
              <RegisterForm />
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-ui font-bold text-[#0f2557] mb-4">ช่องทางติดต่อ</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#1a56db]" />
                  </div>
                  <div>
                    <div className="font-ui font-semibold text-[#0f2557] text-sm">โทรศัพท์</div>
                    <a href="tel:082-496-5545" className="font-thai text-[#64748b] text-sm hover:text-[#1a56db] transition-colors">
                      082-496-5545
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00b900]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#00b900]" />
                  </div>
                  <div>
                    <div className="font-ui font-semibold text-[#0f2557] text-sm">LINE Official</div>
                    <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="font-thai text-[#64748b] text-sm hover:text-[#00b900] transition-colors">
                      แอดเพื่อนไลน์สถาบัน
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#1a56db]" />
                  </div>
                  <div>
                    <div className="font-ui font-semibold text-[#0f2557] text-sm">ที่อยู่</div>
                    <a href="https://maps.app.goo.gl/2MtmNr2Dz5asx47t5" target="_blank" rel="noopener noreferrer" className="font-thai text-[#64748b] text-sm hover:text-[#1a56db] transition-colors">
                      อ.เมือง จ.สงขลา (หาดใหญ่) 90110
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#1a56db]" />
                  </div>
                  <div>
                    <div className="font-ui font-semibold text-[#0f2557] text-sm">เวลาทำการ</div>
                    <div className="font-thai text-[#64748b] text-sm">
                      จ–ศ: 14:00–20:00 น.<br />
                      ส–อา: 09:00–18:00 น.
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map real redirect */}
            <a 
              href="https://maps.app.goo.gl/2MtmNr2Dz5asx47t5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-3xl overflow-hidden border border-[#e2e8f0] bg-[#f0f4ff] h-52 flex flex-col items-center justify-center hover:bg-[#e1ecff] transition-colors group cursor-pointer text-center"
            >
              <MapPin className="w-8 h-8 text-[#1a56db] mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-thai text-sm font-semibold text-[#0f2557]">แผนที่ LIFE Academy</div>
              <div className="font-thai text-xs text-[#64748b] mt-1">คลิกเพื่อเปิดนำทางใน Google Maps →</div>
            </a>

            {/* FAQ quick */}
            <div className="card">
              <h3 className="font-ui font-bold text-[#0f2557] mb-3 text-sm">คำถามที่พบบ่อย</h3>
              <ul className="space-y-3">
                {[
                  { q: 'ทดสอบระดับใช้เวลากี่นาที?',   a: 'ประมาณ 30 นาที โดยครูผู้เชี่ยวชาญ ไม่มีค่าใช้จ่าย' },
                  { q: 'ห้องเรียนมีกี่คน?',             a: 'ไม่เกิน 8–10 คนต่อห้อง ให้ครูดูแลได้ทั่วถึง' },
                  { q: 'ถ้าหยุดเรียนได้ทำการชดเชยไหม?', a: 'ได้ครับ สามารถนัดเรียนชดเชยได้ตามตาราง' },
                ].map(faq => (
                  <li key={faq.q} className="border-b border-[#e2e8f0] last:border-0 pb-3 last:pb-0">
                    <div className="font-ui font-semibold text-[#0f2557] text-xs mb-1">❓ {faq.q}</div>
                    <div className="font-thai text-[#64748b] text-xs">{faq.a}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
