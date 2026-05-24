'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, GraduationCap, Phone } from 'lucide-react'
import { cn } from '@/lib/utils/format'

const navLinks = [
  { href: '/#about',    label: 'เกี่ยวกับเรา' },
  { href: '/courses',   label: 'หลักสูตร' },
  { href: '/teachers',  label: 'ครูผู้สอน' },
  { href: '/news',      label: 'ข่าวกิจกรรม' },
  { href: '/contact',   label: 'ติดต่อ' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link px-4 py-2 rounded-xl hover:bg-[#f0f4ff] text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="tel:082-496-5545"
            className="hidden sm:flex items-center gap-1.5 text-[#0f2557] text-sm font-semibold font-ui hover:text-[#1a56db] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            082-496-5545
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
        <div className="md:hidden bg-white border-t border-[#e2e8f0] px-4 pb-4 pt-2 animate-fade-in">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-[#1e293b] font-thai font-medium rounded-xl hover:bg-[#f0f4ff] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-[#e2e8f0] flex gap-2">
            <a href="tel:082-496-5545" className="btn-outline flex-1 justify-center py-2.5 text-sm">
              <Phone className="w-4 h-4" /> โทรเลย
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
