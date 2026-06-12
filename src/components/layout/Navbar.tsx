'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/format'

interface SubmenuItem {
  href: string
  label: string
}

interface NavLink {
  href?: string
  label: string
  submenu?: SubmenuItem[]
}

const navLinks: NavLink[] = [
  { href: '/', label: 'หน้าหลัก' },
  {
    href: '/courses',
    label: 'หลักสูตร',
    submenu: [
      { href: '/courses?level=exam&q=ม.1', label: 'ติวเข้า ม.1' },
      { href: '/courses?level=exam&q=ม.4', label: 'ติวเข้า ม.4' },
      { href: '/courses?level=exam&q=จุฬาภรณ์', label: 'ติวเข้า ม.1 จุฬาภรณ์ฯ' },
      { href: '/courses?level=primary', label: 'ระดับประถมศึกษา' },
      { href: '/courses?level=secondary', label: 'ระดับมัธยมศึกษา' },
      { href: '/courses/onsite', label: '🏫 เรียนที่สถาบัน (Onsite)' },
      { href: '/courses/online', label: '💻 เรียนออนไลน์สด (Online)' },
      { href: '/courses/private', label: '👤 เรียนส่วนตัว (Private)' },
      { href: '/elearning', label: '📖 E-Learning' },
    ]
  },
  {
    href: '/#contact',
    label: 'บริการ',
    submenu: [
      { href: '/services/study-plan', label: 'ปรึกษาการวางแผนติว ม.1/ม.4' },
      { href: '/services/life-skills', label: 'ปรึกษาการพัฒนาทักษะชีวิต' },
      { href: '/life-future-skill', label: 'Life Future Skill' },
    ]
  },
  { href: '/hall-of-fame', label: 'คนเก่งของเรา' },
  {
    href: '/about',
    label: 'เกี่ยวกับเรา',
    submenu: [
      { href: '/about#history', label: 'ประวัติความเป็นมา' },
      { href: '/about#vision', label: 'วิสัยทัศน์ - พันธกิจ' },
      { href: '/about#team', label: 'ผู้บริหาร ทีมงาน' },
      { href: '/teachers', label: 'ครูผู้สอน' },
      { href: '/gallery', label: 'ภาพบรรยากาศ' },
    ]
  },
  { href: '/bookstore', label: 'ร้านหนังสือ' },
  { href: '/#contact', label: 'ติดต่อเรา' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})
  const navContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleMobileSubmenu = (label: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setMobileExpanded(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e2e8f0]'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img 
            src="/logo.jpg" 
            className="w-9 h-9 rounded-xl object-cover object-center shadow-sm group-hover:shadow-md transition-shadow"
            alt="LIFE Academy Logo"
          />
          <div>
            <span className="font-display font-bold text-[#0f2557] text-lg leading-none block">LIFE</span>
            <span className="font-ui text-[10px] text-[#64748b] tracking-widest uppercase leading-none">Academy</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div ref={navContainerRef} className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            if (link.submenu) {
              const isOpen = activeDropdown === link.label
              return (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href!}
                    onClick={() => setActiveDropdown(null)}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-thai text-[#1e293b] hover:bg-[#f0f4ff] transition-colors",
                      isOpen && "bg-[#f0f4ff] text-[#1a56db]"
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-[calc(100%-4px)] left-0 pt-2 min-w-[220px] animate-fade-in z-50">
                      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-xl py-2">
                        {link.submenu.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-4 py-2.5 text-xs text-[#475569] hover:text-[#1a56db] hover:bg-[#f0f4ff] font-thai transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href!}
                className="nav-link px-3.5 py-2 rounded-xl hover:bg-[#f0f4ff] text-sm font-thai text-[#1e293b]"
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="tel:092-241-4289"
            className="hidden lg:flex items-center gap-1.5 text-[#0f2557] text-sm font-semibold font-ui hover:text-[#1a56db] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            092-241-4289
          </a>
          <Link
            href="/level-test"
            className="hidden sm:inline-flex btn-primary py-2 px-4 text-xs"
          >
            ทดสอบระดับฟรี
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl hover:bg-[#f0f4ff] transition-colors"
            aria-label="เมนู"
          >
            {open ? <X className="w-5 h-5 text-[#0f2557]" /> : <Menu className="w-5 h-5 text-[#0f2557]" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#e2e8f0] px-4 pb-4 pt-2 max-h-[85vh] overflow-y-auto animate-fade-in">
          {navLinks.map(link => {
            if (link.submenu) {
              const isExpanded = !!mobileExpanded[link.label]
              return (
                <div key={link.label} className="border-b border-[#f1f5f9] last:border-0">
                  <div className="flex items-center justify-between w-full rounded-xl hover:bg-[#f0f4ff] transition-colors">
                    <Link
                      href={link.href!}
                      onClick={() => setOpen(false)}
                      className="flex-1 px-4 py-3 text-[#1e293b] font-thai font-medium text-left"
                    >
                      {link.label}
                    </Link>
                    <button
                      onClick={(e) => toggleMobileSubmenu(link.label, e)}
                      className="px-4 py-3 text-[#1e293b] hover:text-[#1a56db] transition-colors"
                    >
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180")} />
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="pl-4 pb-2 bg-[#f8fafc] rounded-xl mb-1">
                      {link.submenu.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="block px-4 py-2.5 text-xs text-[#475569] hover:text-[#1a56db] font-thai transition-colors border-l-2 border-slate-200"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-[#1e293b] font-thai font-medium rounded-xl hover:bg-[#f0f4ff] transition-colors border-b border-[#f1f5f9] last:border-0"
              >
                {link.label}
              </Link>
            )
          })}
          <div className="mt-3 pt-3 border-t border-[#e2e8f0] flex gap-2">
            <a href="tel:092-241-4289" className="btn-outline flex-1 justify-center py-2.5 text-sm font-ui">
              <Phone className="w-4 h-4" /> 092-241-4289
            </a>
            <Link href="/level-test" onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center py-2.5 text-sm">
              ทดสอบระดับฟรี
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
