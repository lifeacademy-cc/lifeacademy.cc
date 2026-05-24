'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('กรุณากรอกอีเมลของท่าน')
      return
    }

    setLoading(true)
    try {
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetErr) throw resetErr
      setDone(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการส่งอีเมล')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1740] via-[#0f2557] to-[#1a3680] flex items-center justify-center px-4">
        <div className="w-full max-w-sm card p-8 text-center space-y-5 animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-navy text-2xl">ส่งอีเมลสำเร็จ!</h2>
          <p className="font-thai text-text-muted text-sm leading-relaxed">
            ระบบได้ส่งลิงก์กู้คืนรหัสผ่านไปยังอีเมล <strong className="text-navy">{email}</strong> แล้ว 
            กรุณาเข้าเช็คกล่องข้อความและคลิกลิงก์เพื่อกำหนดรหัสผ่านใหม่
          </p>
          <div className="pt-2">
            <Link href="/login" className="btn-primary w-full justify-center">
              กลับหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1740] via-[#0f2557] to-[#1a3680] flex items-center justify-center px-4">
      {/* Back to Login */}
      <Link 
        href="/login" 
        className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white text-sm font-ui transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> กลับไปหน้าเข้าสู่ระบบ
      </Link>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-[#f59e0b]" />
          </div>
          <h1 className="font-display font-bold text-white text-2xl">LIFE Academy</h1>
          <p className="font-thai text-white/60 text-sm mt-1">กู้คืนรหัสผ่านผู้ใช้งาน</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-5 border border-border/40">
          <form onSubmit={handleReset} className="space-y-5">
            <p className="font-thai text-text-muted text-xs sm:text-sm leading-relaxed text-center">
              ระบุอีเมลผู้เรียนที่ลงทะเบียนไว้ในระบบ ระบบจะจัดส่งลิงก์สำหรับเปลี่ยนรหัสผ่านใหม่ให้ท่านทางอีเมล
            </p>

            <div>
              <label className="field-label">อีเมลสมัครใช้งาน</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="field-input text-sm"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-thai text-center">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 text-sm font-semibold"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> กำลังส่งคำขอ...</>
              ) : (
                'ส่งลิงก์กู้คืนรหัสผ่าน'
              )}
            </button>
          </form>

          {/* Links footer */}
          <div className="pt-4 border-t border-[#e2e8f0] text-center">
            <p className="font-thai text-[#64748b] text-sm">
              จำรหัสผ่านได้แล้ว?{' '}
              <Link href="/login" className="text-[#1a56db] font-bold hover:underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs font-ui mt-6">
          © 2569 LIFE Academy · CAP Vision Institute
        </p>
      </div>
    </div>
  )
}
