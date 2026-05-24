'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import type { RegisterFormInput } from '@/types'

const levels = [
  { value: 'primary',   label: 'ประถมศึกษา (ป.1–6)' },
  { value: 'secondary', label: 'มัธยมต้น (ม.1–3)' },
  { value: 'high',      label: 'มัธยมปลาย (ม.4–6)' },
  { value: 'exam',      label: 'เตรียมสอบ (TCAS/GAT/PAT)' },
]
const subjects = [
  { value: 'math',      label: 'คณิตศาสตร์ 📐' },
  { value: 'english',   label: 'ภาษาอังกฤษ 🔤' },
  { value: 'science',   label: 'วิทยาศาสตร์ 🔬' },
  { value: 'thai',      label: 'ภาษาไทย 📖' },
  { value: 'physics',   label: 'ฟิสิกส์ ⚡' },
  { value: 'chemistry', label: 'เคมี 🧪' },
  { value: 'biology',   label: 'ชีววิทยา 🌿' },
  { value: 'social',    label: 'สังคมศึกษา 🌏' },
]

const INITIAL: RegisterFormInput = {
  name: '', phone: '', email: '',
  level: '', subject: '', format: 'onsite', message: '',
}

export default function RegisterForm() {
  const [form,    setForm]    = useState<RegisterFormInput>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [error,   setError]   = useState('')

  const set = (k: keyof RegisterFormInput, v: string) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.level || !form.subject) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบ')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error ?? 'เกิดข้อผิดพลาด')
      setDone(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'ไม่สามารถส่งข้อมูลได้ กรุณาโทรหาเราโดยตรง')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-[#059669]/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#059669]" />
        </div>
        <h3 className="font-display font-bold text-[#0f2557] text-2xl mb-2">ส่งข้อมูลสำเร็จ! 🎉</h3>
        <p className="font-thai text-[#64748b] mb-6">
          ทีมงาน LIFE Academy จะติดต่อกลับภายใน 1 ชั่วโมง<br />
          (จ–ศ: 14:00–20:00 น. | ส–อา: 09:00–18:00 น.)
        </p>
        <button
          onClick={() => { setForm(INITIAL); setDone(false) }}
          className="btn-outline"
        >
          ลงทะเบียนอีกครั้ง
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label className="field-label">
          ชื่อ-นามสกุลผู้เรียน <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          placeholder="เช่น น้องมิ้น สุขใจ"
          className="field-input"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="field-label">
          เบอร์โทรศัพท์ <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => set('phone', e.target.value)}
          placeholder="0812345678"
          className="field-input"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="field-label">อีเมล (ไม่บังคับ)</label>
        <input
          type="email"
          value={form.email}
          onChange={e => set('email', e.target.value)}
          placeholder="example@email.com"
          className="field-input"
        />
      </div>

      {/* Level + Subject — 2 col */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="field-label">
            ระดับชั้น <span className="text-red-500">*</span>
          </label>
          <select value={form.level} onChange={e => set('level', e.target.value)} className="field-input" required>
            <option value="">เลือกระดับชั้น...</option>
            {levels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label">
            วิชาที่สนใจ <span className="text-red-500">*</span>
          </label>
          <select value={form.subject} onChange={e => set('subject', e.target.value)} className="field-input" required>
            <option value="">เลือกวิชา...</option>
            {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Format */}
      <div>
        <label className="field-label">รูปแบบการเรียน <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'onsite',  label: '🏫 ที่สถาบัน' },
            { value: 'online',  label: '💻 ออนไลน์' },
            { value: 'private', label: '👤 ส่วนตัว' },
          ].map(opt => (
            <label
              key={opt.value}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all text-sm font-thai
                ${form.format === opt.value
                  ? 'border-[#1a56db] bg-[#f0f4ff] text-[#0f2557] font-semibold'
                  : 'border-[#e2e8f0] hover:border-[#1a56db]/40'
                }`}
            >
              <input
                type="radio"
                name="format"
                value={opt.value}
                checked={form.format === opt.value}
                onChange={e => set('format', e.target.value as 'onsite' | 'online' | 'private')}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="field-label">ข้อความเพิ่มเติม (ไม่บังคับ)</label>
        <textarea
          value={form.message}
          onChange={e => set('message', e.target.value)}
          placeholder="เช่น เรียนวันไหนสะดวก, เป้าหมายการสอบ, ความต้องการพิเศษ..."
          rows={3}
          className="field-input resize-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-thai">
          ⚠️ {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> กำลังส่งข้อมูล...</>
        ) : (
          <>ส่งข้อมูล — ติดต่อกลับฟรี <ArrowRight className="w-4 h-4" /></>
        )}
      </button>

      <p className="text-center text-[#64748b] text-xs font-thai">
        ข้อมูลของคุณปลอดภัย 100% • ไม่มีการขายข้อมูลให้บุคคลที่สาม
      </p>
    </form>
  )
}
