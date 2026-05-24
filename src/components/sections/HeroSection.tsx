'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, CheckCircle2, ChevronDown } from 'lucide-react'

const stats = [
  { value: 14,    suffix: '+', label: 'ปีประสบการณ์' },
  { value: 5000,  suffix: '+', label: 'นักเรียนสำเร็จ' },
  { value: 30,    suffix: '+', label: 'หลักสูตร' },
  { value: 95,    suffix: '%', label: 'พอใจมาก' },
]

function useCountUp(target: number, duration = 2000) {
  const [count, setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setCount(start)
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return { count, ref }
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value)
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-display font-bold text-white">
        <span ref={ref}>{count.toLocaleString()}</span>
        <span className="text-[#f59e0b]">{suffix}</span>
      </div>
      <div className="text-white/60 text-xs font-thai mt-1">{label}</div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0a1740] via-[#0f2557] to-[#1a3680]">

      {/* Decorative orbs */}
      <div className="hero-orb-1 -top-40 -right-40 opacity-60" />
      <div className="hero-orb-2 bottom-20 -left-20 opacity-80" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      {/* Floating accent dots */}
      <div className="absolute top-1/4 left-[8%] w-2 h-2 rounded-full bg-[#f59e0b] animate-float" />
      <div className="absolute top-1/3 right-[12%] w-3 h-3 rounded-full bg-[#3b82f6] animate-float delay-300" />
      <div className="absolute bottom-1/3 left-[15%] w-1.5 h-1.5 rounded-full bg-white/40 animate-float delay-500" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Copy */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-up">
            <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
            <span className="text-white/80 text-xs font-ui tracking-wide">
              อันดับ 1 ติวเตอร์ หาดใหญ่ • 14 ปีแห่งความสำเร็จ
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up delay-100">
            เรียนให้ได้ผล<br />
            <span className="text-[#f59e0b]">ด้วยครูมืออาชีพ</span><br />
            ที่คุณไว้ใจ
          </h1>

          <p className="text-white/70 font-thai text-lg leading-relaxed mb-8 max-w-lg animate-fade-up delay-200">
            สถาบันติวเตอร์ชั้นนำในหาดใหญ่ เรียนคณิต–อังกฤษ–วิทย์ 
            กับครูผู้เชี่ยวชาญ ทั้งแบบ Onsite และ Online 
            ผลลัพธ์ที่วัดได้จริง ไม่ใช่แค่คำสัญญา
          </p>

          {/* Features checklist */}
          <ul className="space-y-2 mb-8 animate-fade-up delay-300">
            {[
              'ทดสอบระดับฟรี ไม่มีค่าใช้จ่าย',
              'ครูประจำตัว ไม่สลับครูกลางคัน',
              'รายงานผลให้ผู้ปกครองทุกสัปดาห์',
            ].map(text => (
              <li key={text} className="flex items-center gap-2.5 text-white/80 font-thai text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 animate-fade-up delay-400">
            <Link
              href="/level-test"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2557] font-bold font-ui rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-sm"
            >
              ทดสอบระดับฟรี
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold font-ui rounded-2xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              ดูหลักสูตรทั้งหมด
            </Link>
          </div>
        </div>

        {/* Right: Course Finder Card */}
        <div className="animate-fade-up delay-300">
          <CourseFinder />
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map(s => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-white/30 animate-pulse-slow">
        <span className="text-xs font-ui">เลื่อนลง</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  )
}

// ─── Course Finder Widget ─────────────────────────────────

const levels  = ['ประถมศึกษา', 'มัธยมต้น (ม.1–3)', 'มัธยมปลาย (ม.4–6)', 'เตรียมสอบ TCAS/GAT/PAT']
const subjects = ['คณิตศาสตร์', 'ภาษาอังกฤษ', 'วิทยาศาสตร์', 'ฟิสิกส์', 'เคมี', 'ชีววิทยา', 'ภาษาไทย']

function CourseFinder() {
  const [level,   setLevel]   = useState('')
  const [subject, setSubject] = useState('')
  const [done,    setDone]    = useState(false)

  const handleSubmit = () => {
    if (level && subject) setDone(true)
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl border border-white/5 animate-float">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center">
          <Star className="w-4 h-4 text-white fill-white" />
        </div>
        <div>
          <div className="font-ui font-bold text-[#0f2557] text-sm">Course Finder</div>
          <div className="font-thai text-[#64748b] text-xs">ค้นหาหลักสูตรที่ใช่สำหรับคุณ</div>
        </div>
      </div>

      {!done ? (
        <div className="space-y-4">
          <div>
            <label className="field-label">ระดับชั้น</label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="field-input"
            >
              <option value="">เลือกระดับชั้น...</option>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">วิชาที่ต้องการเรียน</label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="field-input"
            >
              <option value="">เลือกวิชา...</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!level || !subject}
            className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            ค้นหาหลักสูตร <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#f0f4ff] border border-[#e2e8f0]">
            <div className="text-[#0f2557] font-semibold font-thai text-sm mb-1">🎯 เหมาะกับคุณมาก!</div>
            <div className="text-[#64748b] text-xs font-thai">
              {level} • {subject}
            </div>
            <div className="mt-2 text-[#1a56db] text-xs font-semibold font-ui">
              พบ 3 หลักสูตรที่แนะนำ
            </div>
          </div>
          <Link href={`/courses?level=${encodeURIComponent(level)}&subject=${encodeURIComponent(subject)}`}
            className="btn-primary w-full justify-center"
          >
            ดูหลักสูตรที่แนะนำ <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => { setDone(false); setLevel(''); setSubject('') }}
            className="w-full text-center text-[#64748b] text-xs font-thai hover:text-[#0f2557] transition-colors"
          >
            ค้นหาใหม่อีกครั้ง
          </button>
        </div>
      )}
    </div>
  )
}
