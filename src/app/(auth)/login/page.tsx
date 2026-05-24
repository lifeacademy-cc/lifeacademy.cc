'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GraduationCap, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: authErr } = await supabase.auth.signInWithPassword({ email, password })
      if (authErr) throw authErr
      router.push('/student/dashboard')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' : 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1740] via-[#0f2557] to-[#1a3680] flex items-center justify-center px-4">

      {/* Back */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white text-sm font-ui transition-colors">
        <ArrowLeft className="w-4 h-4" /> กลับหน้าแรก
      </Link>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-[#f59e0b]" />
          </div>
          <h1 className="font-display font-bold text-white text-2xl">LIFE Academy</h1>
          <p className="font-thai text-white/60 text-sm mt-1">เข้าสู่ระบบนักเรียน</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="field-label">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@email.com"
                className="field-input"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="field-label">รหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="field-input pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f2557] transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-thai text-center">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-60"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> กำลังเข้าสู่ระบบ...</> : 'เข้าสู่ระบบ'}
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#e2e8f0]" /></div>
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
              💬 เข้าสู่ระบบด้วย LINE
            </button>

            <div className="text-center pt-2">
              <Link href="/forgot-password" className="text-[#1a56db] text-sm font-ui hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-[#e2e8f0] text-center">
            <p className="font-thai text-[#64748b] text-sm">
              ยังไม่มีบัญชี?{' '}
              <Link href="/contact" className="text-[#1a56db] font-semibold hover:underline">
                ติดต่อสมัครเรียน
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
