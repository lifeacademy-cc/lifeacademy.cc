import RegisterForm from '@/components/home/RegisterForm'
import { MapPin, Phone, Clock, MessageCircle, Facebook } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'ติดต่อ / ลงทะเบียน — LIFE Academy' }

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-16 px-4 text-center">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
          เริ่มต้น<span className="text-[#f59e0b]">วันนี้</span>
        </h1>
        <p className="font-thai text-white/70 text-lg max-w-md mx-auto">
          ทดสอบระดับฟรี ไม่มีค่าใช้จ่าย ทีมงานติดต่อกลับภายใน 1 ชั่วโมง
        </p>
      </section>

      <section className="section bg-[#f0f4ff]">
        <div className="container-max">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Form (larger) */}
            <div className="lg:col-span-3">
              <div className="card">
                <h2 className="font-ui font-bold text-[#0f2557] text-xl mb-2">ลงทะเบียนสอบถาม</h2>
                <p className="font-thai text-[#64748b] text-sm mb-6">กรอกข้อมูลด้านล่าง ทีมงานจะโทรกลับเพื่อนัดทดสอบระดับฟรี</p>
                <RegisterForm />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="card">
                <h3 className="font-ui font-bold text-[#0f2557] mb-4">ติดต่อเราโดยตรง</h3>
                <ul className="space-y-4">
                  {[
                    { Icon: Phone,          label: 'โทรศัพท์',   value: '082-496-5545',      href: 'tel:082-496-5545',                      color: 'bg-[#1a56db]/10 text-[#1a56db]' },
                    { Icon: MessageCircle,  label: 'LINE OA',    value: 'แอดเพื่อนไลน์สถาบัน', href: 'https://lin.ee/xvYZMZP',   color: 'bg-[#00b900]/10 text-[#00b900]' },
                    { Icon: Facebook,       label: 'Facebook',   value: 'LIFE Hadyai',      href: 'https://www.facebook.com/LifeHadyai',  color: 'bg-[#1877f2]/10 text-[#1877f2]' },
                    { Icon: MapPin,         label: 'ที่อยู่',    value: ' LIFE Academy หาดใหญ่ (ดูแผนที่)', href: 'https://maps.app.goo.gl/2MtmNr2Dz5asx47t5', color: 'bg-[#dc2626]/10 text-[#dc2626]' },
                    { Icon: Clock,          label: 'เวลาทำการ',  value: 'จ–ศ 14:00–20:00 | ส–อา 09:00–18:00', href: '#', color: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
                  ].map(c => (
                    <li key={c.label} className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center flex-shrink-0`}>
                        <c.Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-ui font-semibold text-[#0f2557] text-xs">{c.label}</div>
                        <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="font-thai text-[#64748b] text-sm hover:text-[#1a56db] transition-colors">
                          {c.value}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* LINE QR Code Card */}
              <div className="card flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-[#e2e8f0] text-center shadow-sm">
                <img 
                  src="/line-qr.png" 
                  className="w-32 h-32 object-contain rounded-2xl mb-3 shadow-sm border border-slate-100" 
                  alt="LIFE Academy LINE QR Code" 
                />
                <div className="font-thai font-bold text-xs text-[#0f2557]">สแกนแอดไลน์สถาบัน</div>
                <div className="font-thai text-text-muted text-[10px] mt-1">คุยกับคุณครูวิชาการเพื่อนัดวันประเมินฟรี</div>
                <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer"
                  className="mt-2 text-[#00b900] text-xs font-bold font-ui hover:underline flex items-center gap-1"
                >
                  🟢 แอดเพื่อนที่นี่ →
                </a>
              </div>

              {/* Map */}
              <div id="map" className="card flex flex-col items-center justify-center h-48 bg-[#f0f4ff] rounded-3xl border border-[#e2e8f0]">
                <MapPin className="w-8 h-8 text-[#1a56db] mb-2" />
                <div className="font-thai font-semibold text-[#0f2557]">แผนที่ LIFE Academy</div>
                <div className="font-thai text-[#64748b] text-sm">หาดใหญ่ สงขลา</div>
                <a href="https://maps.app.goo.gl/2MtmNr2Dz5asx47t5" target="_blank" rel="noopener noreferrer"
                  className="mt-3 text-[#1a56db] text-xs font-ui hover:underline"
                >
                  เปิด Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
