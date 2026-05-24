'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GraduationCap, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!name || !phone || !email || !password) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบ')
      return
    }

    setLoading(true)
    try {
      // 1. Sign up the user via Supabase Auth
      const { data, error: authErr } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            role: 'student', // Default role is student
          },
        },
      })

      if (authErr) throw authErr

      // 2. Check if verification email is sent
      if (data.user && data.session === null) {
        setDone(true) // Needs email verification
      } else {
        // Logged in directly
        router.push('/student/dashboard')
        router.refresh()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการลงทะเบียน')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1740] via-[#0f2557] to-[#1a3680] flex items-center justify-center px-4">
        <div className="w-full max-w-md card p-8 text-center space-y-5 animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-navy text-2xl">ลงทะเบียนเสร็จสิ้น!</h2>
          <p className="font-thai text-text-muted text-sm leading-relaxed">
            ระบบได้จัดส่งลิงก์ยืนยันตัวตนไปยังอีเมล <strong className="text-navy">{email}</strong> เรียบร้อยแล้ว 
            กรุณาเข้ากล่องข้อความของท่านและคลิกลิงก์เพื่อเปิดใช้งานบัญชีผู้เรียน
          </p>
          <div className="pt-2">
            <Link href="/login" className="btn-primary w-full justify-center">
              ไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1740] via-[#0f2557] to-[#1a3680] flex items-center justify-center px-4 py-12">
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white text-sm font-ui transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> กลับหน้าแรก
      </Link>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-[#f59e0b]" />
          </div>
          <h1 className="font-display font-bold text-white text-2xl">LIFE Academy</h1>
          <p className="font-thai text-white/60 text-sm mt-1">สมัครสมาชิกบัญชีผู้เรียนใหม่</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6 border border-border/40">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="field-label">ชื่อ-นามสกุลผู้เรียน <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="ตัวอย่าง: น้องมิ้น สุขใจ"
                className="field-input text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="field-label">เบอร์โทรศัพท์ติดต่อ <span className="text-red-500">*</span></label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="เช่น 0812345678"
                className="field-input text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="field-label">อีเมลสมัครใช้งาน <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="field-input text-sm"
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="field-label">กำหนดรหัสผ่าน <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                  className="field-input pr-10 text-sm"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-[#0f2557]"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-thai text-center">
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 text-sm font-semibold"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> กำลังสร้างบัญชี...</>
              ) : (
                'สมัครสมาชิกผู้เรียน'
              )}
            </button>

            {/* LINE Signup */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <span className="relative bg-white px-3 text-[#94a3b8] text-xs font-thai">หรือ</span>
            </div>

            <button
              type="button"
              onClick={() => {
                supabase.auth.signInWithOAuth({
                  provider: 'line' as any,
                  options: { redirectTo: `${window.location.origin}/student/dashboard` }
                })
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#00b900] hover:bg-[#009e00] text-white font-bold font-thai rounded-2xl transition-all shadow-sm hover:shadow text-sm"
            >
              💬 สมัครสมาชิกด้วย LINE
            </button>
          </form>

          {/* Login Link */}
          <div className="pt-4 border-t border-[#e2e8f0] text-center">
            <p className="font-thai text-[#64748b] text-sm">
              มีบัญชีผู้เรียนอยู่แล้ว?{' '}
              <Link href="/login" className="text-[#1a56db] font-bold hover:underline">
                เข้าสู่ระบบเลย
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
