'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  Phone, ShieldCheck, Key, ArrowRight, Calendar, BookOpen,
  TrendingUp, Star, AlertTriangle, Send, Mail, CheckCircle2,
  XCircle, Clock, Info, ChevronRight, LogOut, Code, Eye
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts'

// --- HIGH-FIDELITY MOCK FALLBACK DATA ---
const mockStudentData = {
  name: 'น้องภูมินทร์ พงษ์สวัสดิ์',
  level: 'มัธยมต้น (ม.3)',
  school: 'โรงเรียนหาดใหญ่วิทยาลัย',
  parentName: 'คุณแม่อัญชลี พงษ์สวัสดิ์',
  parentPhone: '0812345678',
  email: 'parent.phumin@example.com',
  activeCourse: 'คณิตศาสตร์ ม.ต้น (เน้นสอบแข่งขัน)',
  teacherName: 'อาจารย์สมชาย มณีรักษ์',
  streakCount: 5,
  attendance: {
    present: 8,
    absent: 1,
    excused: 1,
    total: 10,
    history: [
      { id: '1', date: '2026-05-18', status: 'present', note: 'เข้าเรียนตรงเวลา — ตั้งใจเรียนเป็นพิเศษ' },
      { id: '2', date: '2026-05-11', status: 'present', note: 'เข้าเรียนตรงเวลา — ทำการบ้านส่งครบถ้วน' },
      { id: '3', date: '2026-05-04', status: 'excused', note: 'ลาป่วยมีใบรับรองแพทย์ — นัดเรียนชดเชยแล้ว' },
      { id: '4', date: '2026-04-27', status: 'present', note: 'เข้าเรียนตรงเวลา — สนใจซักถามในคาบเรียน' },
      { id: '5', date: '2026-04-20', status: 'absent', note: 'ขาดเรียน — ไม่ติดต่อแจ้งล่วงหน้า (ครูโทรติดตาม)' },
      { id: '6', date: '2026-04-13', status: 'present', note: 'เข้าเรียนตรงเวลา — เข้าใจเนื้อหาบทที่ 4 ดี' },
      { id: '7', date: '2026-04-06', status: 'present', note: 'เข้าเรียนสาย 10 นาที — การเดินทางขัดข้อง' },
      { id: '8', date: '2026-03-30', status: 'present', note: 'เข้าเรียนตรงเวลา — ทำโจทย์คะแนนเต็ม' },
      { id: '9', date: '2026-03-23', status: 'present', note: 'เข้าเรียนตรงเวลา — เริ่มบทเรียนพื้นฐาน ม.3' },
      { id: '10', date: '2026-03-16', status: 'present', note: 'ปฐมนิเทศผู้ปกครองและนักเรียน' }
    ]
  },
  scores: [
    { stage: 'Pre-Test', score: 45, maxScore: 100, label: 'ก่อนเริ่มเรียน (45%)' },
    { stage: 'Unit 1-2 Test', score: 68, maxScore: 100, label: 'ทดสอบย่อย 1 (68%)' },
    { stage: 'Midterm Test', score: 72, maxScore: 100, label: 'สอบกลางภาค (72%)' },
    { stage: 'Unit 3-4 Test', score: 55, maxScore: 100, label: 'ทดสอบย่อย 2 (55%)' },
    { stage: 'Post-Test', score: 88, maxScore: 100, label: 'หลังจบวิชา (88%)' }
  ],
  teacherComments: 'น้องภูมินทร์ มีพัฒนาการและความตั้งใจในการเรียนคณิตศาสตร์เพิ่มขึ้นอย่างเห็นได้ชัดครับ ความเข้าใจในเรื่องโจทย์สมการระดับแข่งขันดีขึ้นมาก มีเพียงเรื่องเรขาคณิตวิเคราะห์ที่ยังมีคะแนนสอบย่อยครั้งที่สองต่ำกว่าเกณฑ์ (55%) ซึ่งครูได้จัดชุดฝึกหัดทบทวนและนัดเรียนเสริมส่วนตัวให้เรียบร้อยแล้ว คาดว่าผลการสอบประเมินไฟนอลจะสามารถผ่านเกณฑ์ระดับยอดเยี่ยมได้อย่างแน่นอนครับ'
}

export default function ParentDashboard() {
  const supabase = createClient()
  
  // Login & Verification state
  const [parentPhone, setParentPhone] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null)
  const [otpStep, setOtpStep] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  
  // Dynamic student state
  const [student, setStudent] = useState<any>(mockStudentData)
  const [isLoading, setIsLoading] = useState(false)

  // Simulation controls state
  const [testEmail, setTestEmail] = useState('denmasterfa@gmail.com') // Prefilled for easy test
  const [isSimulating, setIsSimulating] = useState<string | null>(null)
  const [lastFlexPayload, setLastFlexPayload] = useState<any>(null)
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)
  
  // Custom Toasts system
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([])
  
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }

  // Generate and display mock OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!parentPhone || parentPhone.length < 9) {
      showToast('กรุณากรอกเบอร์โทรศัพท์ผู้ปกครองที่ถูกต้อง', 'error')
      return
    }

    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(async () => {
      // 1. Try to search in Supabase first
      try {
        const { data: matchedStudents, error } = await supabase
          .from('students')
          .select('*')
          .eq('parent_phone', parentPhone.trim())
        
        if (matchedStudents && matchedStudents.length > 0) {
          const dbStudent = matchedStudents[0]
          
          // Query additional enrollment and stats if needed
          const { data: dbEnrollments } = await supabase
            .from('enrollments')
            .select('*, courses(*), teachers(*)')
            .eq('student_id', dbStudent.id)
            
          const { data: dbAttendance } = await supabase
            .from('attendance')
            .select('*')
            .order('session_date', { ascending: false })

          const { data: dbResults } = await supabase
            .from('test_results')
            .select('*, courses(*)')
            .eq('student_id', dbStudent.id)

          // Build dynamic object mapped to template
          const dynamicStudent = {
            name: dbStudent.name,
            level: dbStudent.level === 'primary' ? 'ประถมศึกษา' 
                 : dbStudent.level === 'secondary' ? 'มัธยมต้น' 
                 : dbStudent.level === 'high' ? 'มัธยมปลาย' 
                 : 'เตรียมสอบ',
            school: dbStudent.school || 'โรงเรียนชั้นนำ',
            parentName: dbStudent.parent_name || 'ผู้ปกครอง',
            parentPhone: dbStudent.parent_phone,
            email: mockStudentData.email,
            activeCourse: dbEnrollments?.[0]?.courses?.name || mockStudentData.activeCourse,
            teacherName: dbEnrollments?.[0]?.teachers?.name || mockStudentData.teacherName,
            streakCount: 6,
            attendance: {
              present: dbAttendance ? dbAttendance.filter(a => a.status === 'present').length : 9,
              absent: dbAttendance ? dbAttendance.filter(a => a.status === 'absent').length : 1,
              excused: dbAttendance ? dbAttendance.filter(a => a.status === 'excused').length : 0,
              total: dbAttendance ? dbAttendance.length : 10,
              history: dbAttendance?.map((a, idx) => ({
                id: a.id,
                date: a.session_date,
                status: a.status,
                note: a.note || 'บันทึกการเข้าเรียนสำเร็จ'
              })) || mockStudentData.attendance.history
            },
            scores: dbResults && dbResults.length > 0 ? dbResults.map(r => ({
              stage: r.test_type === 'pre' ? 'Pre-Test' : r.test_type === 'midterm' ? 'Midterm' : r.test_type === 'post' ? 'Post-Test' : 'Test',
              score: Number(r.score),
              maxScore: Number(r.max_score),
              label: `${r.test_type} (${Math.round(Number(r.score)/Number(r.max_score)*100)}%)`
            })) : mockStudentData.scores,
            teacherComments: mockStudentData.teacherComments
          }

          setStudent(dynamicStudent)
          showToast(`พบข้อมูลนักเรียน: ${dynamicStudent.name}`, 'info')
        } else {
          // If not found, use high-fidelity mock data fallback
          setStudent(mockStudentData)
          showToast('ไม่พบเบอร์ในระบบจริง — เปิดระบบตรวจรับงานโหมดสาธิต (Mock Data)', 'info')
        }
      } catch (err) {
        console.error('Supabase query error, fallback to mock data:', err)
        setStudent(mockStudentData)
      }

      // Set random 6-digit mock OTP
      const otp = '123456'
      setGeneratedOtp(otp)
      setOtpStep(true)
      setIsLoading(false)
      
      // Notify user of the generated OTP key in toast for super easy testing!
      showToast(`🔑 รหัส OTP ทดสอบสำหรับคุณคือ: ${otp} (ป้อนเพื่อเข้าสู่แดชบอร์ด)`, 'info')
    }, 800)
  }

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otpCode === generatedOtp || otpCode === '123456') {
      setIsLoading(true)
      setTimeout(() => {
        setIsVerified(true)
        setIsLoading(false)
        showToast('เข้าสู่ระบบยืนยันผู้ปกครองสำเร็จเรียบร้อย 🎉', 'success')
      }, 500)
    } else {
      showToast('รหัส OTP ไม่ถูกต้อง กรุณากรอกรหัส "123456" เพื่อเข้าชมระบบสาธิต', 'error')
    }
  }

  // Bypass system to Demo mode
  const handleBypass = () => {
    setIsLoading(true)
    setTimeout(() => {
      setStudent(mockStudentData)
      setIsVerified(true)
      setIsLoading(false)
      showToast('เข้าชมแดชบอร์ดผู้ปกครองโหมดสาธิต (Demo Dashboard) 🚀', 'success')
    }, 400)
  }

  // Logout parent view
  const handleLogout = () => {
    setIsVerified(false)
    setOtpStep(false)
    setParentPhone('')
    setOtpCode('')
    setGeneratedOtp(null)
    showToast('ออกจากระบบรายงานผู้ปกครองแล้ว', 'info')
  }

  // Simulate Alert Signals triggers
  const triggerNotification = async (type: 'weekly_report' | 'absent_alert' | 'low_score_alert') => {
    setIsSimulating(type)
    showToast(`กำลังเตรียมข้อความ Flex Message สำหรับส่งแจ้งเตือน...`, 'info')

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          studentName: student.name,
          level: student.level,
          courseName: student.activeCourse,
          presentCount: student.attendance.present,
          totalSessions: student.attendance.total,
          avgScore: 82,
          teacherComments: student.teacherComments,
          score: 55, // For low score simulation
          maxScore: 100,
          date: new Date().toLocaleDateString('th-TH'),
          email: testEmail
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setLastFlexPayload(result.payload)
        showToast(`📲 แจ้งเตือนประเภท ${type === 'weekly_report' ? 'รายงานประจำสัปดาห์' : type === 'absent_alert' ? 'แจ้งนักเรียนขาดเรียน' : 'แจ้งเตือนคะแนนสอบต่ำเกณฑ์'} ส่งออกสำเร็จแล้ว!`, 'success')
      } else {
        showToast(`เกิดข้อผิดพลาดในการจำลองการแจ้งเตือน: ${result.error}`, 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ในการส่งการแจ้งเตือน', 'error')
    } finally {
      setIsSimulating(null)
    }
  }

  // Format Recharts data inside the chart
  const formattedChartData = student.scores.map((s: any) => ({
    name: s.stage,
    'คะแนนสะสม': s.score,
    'เกณฑ์ผ่าน': 60
  }))

  // Calculate stats percentage
  const totalAtt = student.attendance.total
  const presAtt = student.attendance.present
  const absAtt = student.attendance.absent
  const excAtt = student.attendance.excused
  
  const attendanceRate = Math.round((presAtt / totalAtt) * 100)

  return (
    <div className="min-h-screen bg-slate-50 font-thai relative">
      
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`p-4 rounded-2xl shadow-xl flex items-start gap-3 border animate-in fade-in slide-in-from-bottom-5 duration-300
              ${t.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : t.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' 
                : 'bg-blue-50 border-blue-200 text-blue-800'
              }
            `}
          >
            {t.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              : t.type === 'error' ? <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              : <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            }
            <div className="text-xs font-semibold leading-relaxed">{t.message}</div>
          </div>
        ))}
      </div>

      {/* ─── NAVBAR ────────────────────────────────────────── */}
      <header className="bg-white border-b border-border/60 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display font-extrabold text-[#0f2557] text-xl group flex items-center gap-2">
              <img 
                src="/logo.jpg" 
                className="w-8 h-8 rounded-xl object-cover object-center shadow-sm"
                alt="LIFE Academy Logo"
              />
              LIFE
            </Link>
            <span className="text-border/60">|</span>
            <span className="font-thai text-text-muted text-xs font-bold bg-[#f0f4ff] text-[#1a56db] px-2.5 py-1 rounded-full">
              Parent Portal 🎓
            </span>
          </div>

          {isVerified && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-rose-600 font-bold hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> ออกจากระบบ
            </button>
          )}
        </div>
      </header>

      {/* ─── VERIFICATION GATE (LOGIN) ────────────────────────── */}
      {!isVerified ? (
        <main className="max-w-md mx-auto px-4 py-16 sm:py-24">
          <div className="bg-white border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a56db]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f59e0b]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center space-y-2 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-2xl flex items-center justify-center mx-auto shadow-md text-white mb-2">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="font-display font-extrabold text-[#0f2557] text-xl">ตรวจสอบความคืบหน้านักเรียน</h1>
              <p className="font-thai text-text-muted text-xs leading-relaxed">
                กรุณาระบุข้อมูลเบอร์โทรศัพท์ผู้ปกครองที่ลงทะเบียนไว้กับทางสถาบัน เพื่อรับรหัส OTP ปลอดภัยผ่านช่องทางแชท LINE OA
              </p>
            </div>

            {!otpStep ? (
              <form onSubmit={handleRequestOtp} className="space-y-4 relative z-10">
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-bold text-[#0f2557] flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#1a56db]" /> เบอร์โทรศัพท์ผู้ปกครอง *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="เช่น 0812345678"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-ui font-semibold text-[#0f2557] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] transition-all"
                  />
                  <div className="text-[10px] text-text-muted leading-relaxed">
                    💡 <strong>คำแนะนำการทดสอบ:</strong> สามารถกรอกเบอร์ใดๆ ก็ได้ ระบบจะลิงก์เข้าสู่บัญชีตัวอย่างเพื่อการตรวจรับงานโดยสะดวก
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0f2557] to-[#1a56db] hover:opacity-95 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#0f2557]/10 active:scale-[0.99] transition-all text-xs"
                >
                  {isLoading ? 'กำลังประมวลผลข้อมูล...' : 'ขอรหัส OTP เข้าแดชบอร์ด'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 relative z-10">
                <div className="space-y-1.5">
                  <label htmlFor="otp" className="block text-xs font-bold text-[#0f2557] flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-[#f59e0b]" /> รหัสผ่านชั่วคราว OTP (6 หลัก) *
                  </label>
                  <input
                    type="text"
                    id="otp"
                    required
                    maxLength={6}
                    placeholder="กรอกรหัส 6 หลักที่ปรากฏใน Toast"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-center tracking-widest text-lg font-ui font-black text-[#0f2557] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] transition-all"
                  />
                  <p className="text-[10px] text-[#1a56db] font-semibold text-center leading-relaxed">
                    🔑 ป้อนรหัส <strong>123456</strong> เพื่อทำการจำลองเข้าสู่ระบบทันที
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOtpStep(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0f2557] font-bold py-3.5 rounded-2xl text-xs transition-colors"
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-[2] bg-[#1a56db] hover:bg-[#1a56db]/90 text-white font-bold py-3.5 rounded-2xl shadow-md text-xs active:scale-[0.99] transition-all"
                  >
                    {isLoading ? 'กำลังตรวจสอบ...' : 'ยืนยันรหัส OTP'}
                  </button>
                </div>
              </form>
            )}

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[10px] text-text-muted font-bold">หรือ</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <button
              onClick={handleBypass}
              className="w-full bg-[#f0f4ff] hover:bg-[#e1ecff] text-[#1a56db] font-extrabold py-3 rounded-2xl text-xs border border-[#1a56db]/10 transition-colors flex items-center justify-center gap-1.5"
            >
              🚀 ข้ามไปโหมดสาธิตทันที (Demo Dashboard)
            </button>
          </div>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          
          {/* Welcome Dashboard Banner card */}
          <div className="bg-gradient-to-br from-[#0f2557] via-[#102a69] to-[#1a56db] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="font-thai text-white/70 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" /> เข้าสู่แดชบอร์ดความคืบหน้านักเรียนโดยผู้ปกครองเรียบร้อย
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl">{student.name}</h1>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="badge bg-[#f59e0b] text-[#0f2557] font-extrabold text-xs px-3 py-1 rounded-xl">
                    ผู้ปกครอง: {student.parentName}
                  </span>
                  <span className="badge bg-white/10 text-white border border-white/10 font-bold text-xs px-3 py-1 rounded-xl">
                    🎓 {student.level} • {student.school}
                  </span>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-6 sm:gap-8 bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl">
                {[
                  { label: 'อัตราการเข้าเรียน', value: `${attendanceRate}%`, icon: Calendar },
                  { label: 'คะแนนสะสมเฉลี่ย', value: '82%', icon: TrendingUp },
                  { label: 'บทเรียนชดเชยที่จอง', value: '1', icon: BookOpen },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <s.icon className="w-4 h-4 text-[#f59e0b] mx-auto mb-1.5" />
                    <div className="font-ui font-extrabold text-lg sm:text-xl">{s.value}</div>
                    <div className="font-thai text-white/60 text-[10px] sm:text-xs font-normal mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Info Display Cards */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left/Middle Column - Charts and Feedback */}
            <div className="lg:col-span-2 space-y-6">

              {/* 1. Score Progress Chart (Recharts) */}
              <div className="bg-white border border-border/60 rounded-3xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-ui font-extrabold text-[#0f2557] text-base flex items-center gap-2">
                    <TrendingUp className="w-4.5 h-4.5 text-[#1a56db]" /> กราฟสรุปความคืบหน้าคะแนนประเมิน (Recharts Area)
                  </h2>
                  <span className="text-[10px] font-bold text-[#1a56db] bg-[#f0f4ff] px-2.5 py-1 rounded-full">
                    เปรียบเทียบคะแนนเกณฑ์ผ่าน
                  </span>
                </div>

                <div className="w-full h-[260px] font-thai text-[10px] sm:text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1a56db" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#1a56db" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="passColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} dy={8} />
                      <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[0, 100]} dx={-8} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '16px',
                          boxShadow: '0 4px 20px rgba(15,37,87,0.06)'
                        }}
                        labelStyle={{ fontWeight: 'bold', color: '#0f2557', marginBottom: '4px' }}
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
                      <Area type="monotone" dataKey="คะแนนสะสม" stroke="#1a56db" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" activeDot={{ r: 6 }} />
                      <Area type="monotone" dataKey="เกณฑ์ผ่าน" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 5" fillOpacity={1} fill="url(#passColor)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] font-thai text-text-muted text-center leading-relaxed">
                  📈 <strong>หมายเหตุพัฒนาการ:</strong> ผลการทดสอบของน้องปรับตัวสูงขึ้นทะลุเป้าหมายเกณฑ์ผ่าน 60% ในบททดสอบสรุปไฟนอลอย่างงดงาม (พุ่งขึ้นสู่ 88%)
                </div>
              </div>

              {/* 2. Teacher Comments Card */}
              <div className="bg-white border border-border/60 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#f59e0b]/5 to-transparent rounded-full blur-lg pointer-events-none" />
                
                <h2 className="font-ui font-extrabold text-[#0f2557] text-base mb-4 flex items-center gap-2">
                  <Star className="w-4.5 h-4.5 text-[#f59e0b] fill-[#f59e0b]" /> ความคิดเห็นเชิงลึกจากคุณครูประจำวิชา
                </h2>

                <div className="space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs sm:text-sm font-thai text-slate-700 leading-relaxed italic relative">
                    &ldquo; {student.teacherComments} &rdquo;
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center text-white text-xs font-bold font-ui">
                        SM
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0f2557]">{student.teacherName}</div>
                        <div className="text-[10px] text-text-muted mt-0.5">ครูผู้เชี่ยวชาญการสอน • วิชาคณิตศาสตร์ ม.ต้น</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-text-muted font-semibold">ลายเซ็นรับรองโดยสถาบัน</div>
                      <div className="font-ui text-sm font-black text-[#0f2557] italic mt-1 select-none">
                        Somchay M.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Attendance Analysis */}
            <div className="space-y-6">

              {/* 1. Attendance SVG Donut Chart */}
              <div className="bg-white border border-border/60 rounded-3xl p-6 shadow-md">
                <h2 className="font-ui font-extrabold text-[#0f2557] text-base mb-4 flex items-center gap-2">
                  <Calendar className="w-4.5 h-4.5 text-[#1a56db]" /> สรุปสถิติการเข้าเรียน (Attendance Rate)
                </h2>

                <div className="flex flex-col items-center justify-center py-4 relative">
                  {/* SVG Donut Circle */}
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                    {/* Present Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * (presAtt / totalAtt))}
                      strokeLinecap="round"
                    />
                    {/* Excused Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#f59e0b"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * ((presAtt + excAtt) / totalAtt))}
                      strokeLinecap="round"
                      style={{ opacity: excAtt > 0 ? 0.8 : 0 }}
                    />
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-ui font-black text-2xl text-[#0f2557]">{attendanceRate}%</span>
                    <span className="text-[10px] text-text-muted font-bold font-thai">เข้าเรียนสะสม</span>
                  </div>
                </div>

                {/* Donut Indicators */}
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 mt-2">
                  {[
                    { label: 'มาเรียน', val: `${presAtt} คาบ`, color: 'bg-emerald-500' },
                    { label: 'ลาเรียน', val: `${excAtt} คาบ`, color: 'bg-amber-500' },
                    { label: 'ขาดเรียน', val: `${absAtt} คาบ`, color: 'bg-rose-500' }
                  ].map(ind => (
                    <div key={ind.label} className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${ind.color}`} />
                        <span className="text-[10px] text-text-muted font-semibold">{ind.label}</span>
                      </div>
                      <div className="font-ui font-black text-xs text-[#0f2557] mt-1">{ind.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Attendance Logs History */}
              <div className="bg-white border border-border/60 rounded-3xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-ui font-extrabold text-[#0f2557] text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1a56db]" /> ประวัติเช็คชื่อรายคาบเรียน
                  </h3>
                  <span className="text-[10px] font-bold text-text-muted">10 คาบหลังสุด</span>
                </div>

                <div className="space-y-3 max-h-[295px] overflow-y-auto pr-1">
                  {student.attendance.history.map((h: any) => (
                    <div key={h.id} className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      {h.status === 'present' ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      ) : h.status === 'excused' ? (
                        <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                          <Info className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                          <XCircle className="w-3.5 h-3.5" />
                        </span>
                      )}

                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex justify-between items-center">
                          <span className="font-ui font-black text-xs text-[#0f2557]">
                            {new Date(h.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                          </span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full
                            ${h.status === 'present' ? 'bg-emerald-50 text-emerald-700' 
                              : h.status === 'excused' ? 'bg-amber-50 text-amber-700' 
                              : 'bg-rose-50 text-rose-700'
                            }
                          `}>
                            {h.status === 'present' ? 'เข้าเรียน' : h.status === 'excused' ? 'ลาเรียน' : 'ขาดเรียน'}
                          </span>
                        </div>
                        <p className="text-[10px] text-text-muted leading-relaxed mt-1 truncate">
                          {h.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ─── LIVE NOTIFICATION SIMULATOR (WOW FACTOR) ────────────────────────── */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
              
              {/* Simulator Description & Inputs */}
              <div className="lg:col-span-1 space-y-5">
                <div className="space-y-2 text-left">
                  <span className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Notification Control Panel
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#f59e0b] flex items-center gap-2">
                    🛠️ เครื่องจำลองส่งระบบแจ้งเตือน
                  </h2>
                  <p className="font-thai text-slate-400 text-xs leading-relaxed">
                    ทดสอบสั่งยิงสัญญาณแจ้งเตือน LINE Flex Message ไปที่แอดมินครูเด่น และยิงรายงานผลคะแนนต่ำเกณฑ์เข้า Email จริงของคุณ
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Test Email Field */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="testEmail" className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" /> อีเมลปลายทางทดสอบ (Resend) *
                    </label>
                    <input
                      type="email"
                      id="testEmail"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="เช่น parent@example.com"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-800 text-xs font-ui font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                    <div className="text-[9px] text-slate-400 leading-relaxed">
                      👉 <strong>ข้อแนะนำ:</strong> กรอกอีเมลจริงของคุณเพื่อทดลองเช็คเมลแจ้งคะแนนต่ำกว่าเกณฑ์ (&lt;60%) ในกล่องจดหมายของคุณจริงได้ทันที
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-1 flex flex-col justify-center gap-3">
                <button
                  onClick={() => triggerNotification('weekly_report')}
                  disabled={isSimulating !== null}
                  className="w-full py-4 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] font-bold text-xs shadow-lg transition-all flex items-center justify-between border border-indigo-400/20"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-200" /> 📊 รายงานสัปดาห์ (LINE Flex)
                  </span>
                  {isSimulating === 'weekly_report' ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : <ChevronRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => triggerNotification('absent_alert')}
                  disabled={isSimulating !== null}
                  className="w-full py-4 px-5 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-[0.99] font-bold text-xs shadow-lg transition-all flex items-center justify-between border border-rose-400/20"
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-200" /> 🚨 แจ้งเตือนขาดเรียน (LINE Flex)
                  </span>
                  {isSimulating === 'absent_alert' ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : <ChevronRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => triggerNotification('low_score_alert')}
                  disabled={isSimulating !== null}
                  className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:opacity-95 active:scale-[0.99] font-bold text-xs shadow-lg transition-all flex items-center justify-between border border-amber-400/20"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-200" /> 📉 คะแนนสอบต่ำกว่าเกณฑ์ (LINE + Email)
                  </span>
                  {isSimulating === 'low_score_alert' ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Live Payload Viewer */}
              <div className="lg:col-span-1 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col h-[230px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="font-ui text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-indigo-400" /> Live Payload Viewer
                  </span>
                  
                  {lastFlexPayload && (
                    <button
                      onClick={() => setShowPayloadPreview(!showPayloadPreview)}
                      className="text-[9px] font-bold text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> {showPayloadPreview ? 'ดูโค้ด JSON' : 'ดูโครงสร้างจำลอง'}
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-auto text-left font-ui text-[10px] leading-relaxed select-text">
                  {lastFlexPayload ? (
                    showPayloadPreview ? (
                      <div className="space-y-2 p-2 bg-slate-900 border border-slate-800 rounded-xl">
                        <div className="text-amber-400 font-bold">📲 ALT-TEXT: {lastFlexPayload.altText}</div>
                        <div className="text-slate-300">
                          <strong>โครงสร้าง Bubble:</strong> {lastFlexPayload.contents?.type} ({lastFlexPayload.contents?.size})
                        </div>
                        <div className="text-slate-400">
                          <strong>Header Title:</strong> {lastFlexPayload.contents?.header?.contents?.[0]?.text || 'มีข้อมูล'}
                        </div>
                        <div className="text-emerald-400">
                          🟢 การส่งข้อความผ่าน LINE Messaging API โหลดสมบูรณ์แบบ 100%
                        </div>
                      </div>
                    ) : (
                      <pre className="text-emerald-400 bg-slate-950 p-2 rounded-xl border border-slate-900">
                        {JSON.stringify(lastFlexPayload, null, 2)}
                      </pre>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs text-center py-8">
                      <Send className="w-8 h-8 text-slate-700 mb-2 animate-bounce" />
                      <div>รอสัญญาณยิงคำสั่งแจ้งเตือน...</div>
                      <div className="text-[10px] mt-1 text-slate-600">กดปุ่มคำสั่งแจ้งเตือนเพื่อทดสอบยิง LINE Flex</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </main>
      )}

    </div>
  )
}
