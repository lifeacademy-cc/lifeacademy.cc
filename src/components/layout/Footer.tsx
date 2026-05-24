import Link from 'next/link'
import { GraduationCap, MapPin, Phone, Clock, Facebook, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f2557] text-white">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img 
                src="/logo.jpg" 
                className="w-10 h-10 rounded-xl object-cover object-center shadow-sm"
                alt="LIFE Academy Logo"
              />
              <div>
                <span className="font-display font-bold text-xl leading-none block">LIFE Academy</span>
                <span className="text-white/50 text-xs font-ui tracking-widest uppercase">Hatyai, Songkhla</span>
              </div>
            </div>
            <p className="text-white/70 font-thai text-sm leading-relaxed max-w-sm">
              สถาบันติวเตอร์ชั้นนำในหาดใหญ่ ด้วยประสบการณ์กว่า 14 ปี
              เราช่วยให้นักเรียนกว่า 5,000 คนบรรลุเป้าหมายทางการศึกษา
              ด้วยวิธีการเรียนที่ได้ผลและครูมืออาชีพ
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/LifeHadyai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877f2] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://lin.ee/xvYZMZP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#00b900] flex items-center justify-center transition-colors"
                title="แอดเพื่อนผ่าน Line OA"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-ui font-semibold text-sm tracking-wider uppercase text-[#f59e0b] mb-4">
              เมนูหลัก
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/',          label: 'หน้าแรก' },
                { href: '/courses',   label: 'หลักสูตรทั้งหมด' },
                { href: '/teachers',  label: 'ครูผู้สอน' },
                { href: '/news',      label: 'ข่าวกิจกรรม' },
                { href: '/contact',   label: 'ติดต่อสอบถาม' },
                { href: '/login',     label: 'เข้าสู่ระบบนักเรียน' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-white font-thai text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-ui font-semibold text-sm tracking-wider uppercase text-[#f59e0b] mb-4">
              ข้อมูลติดต่อ
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <span className="font-thai">อ.เมือง จ.สงขลา (หาดใหญ่) 90110</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Phone className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <a href="tel:082-496-5545" className="hover:text-white transition-colors font-ui">
                  082-496-5545
                </a>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Clock className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <div className="font-thai">
                  <div>จ–ศ: 14:00–20:00 น.</div>
                  <div>ส–อา: 09:00–18:00 น.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/40 text-xs font-ui">
          <span>© {new Date().getFullYear()} LIFE Academy — All rights reserved.</span>
          <span>Developed by CAP Vision Institute × ครูเด่น มาสเตอร์ฟา</span>
        </div>
      </div>
    </footer>
  )
}
