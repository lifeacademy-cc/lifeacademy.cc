'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  Calendar, Clock, BookOpen, User, ArrowLeft,
  Sparkles, CheckCircle2, ChevronRight, MapPin, AlertCircle
} from 'lucide-react'

// --- HIGH-FIDELITY MOCK FALLBACK DATA ---
const mockWeeklySchedules = [
  { 
    id: 's1', 
    day: 'จันทร์', 
    courseName: 'คณิตศาสตร์ ม.ต้น (เน้นสอบเข้มข้น)', 
    teacherName: 'อาจารย์สมชาย ใจดี', 
    startTime: '16:00', 
    endTime: '18:00', 
    room: 'ห้อง A201 (ชั้น 2)',
    subject: 'math' 
  },
  { 
    id: 's2', 
    day: 'พุธ', 
    courseName: 'ฟิสิกส์เข้มข้น ม.ปลาย', 
    teacherName: 'อาจารย์สมหญิง รักเรียน', 
    startTime: '16:00', 
    endTime: '18:00', 
    room: 'ห้อง B102 (ชั้น 1)',
    subject: 'physics' 
  },
  { 
    id: 's3', 
    day: 'ศุกร์', 
    courseName: 'ภาษาอังกฤษ TCAS (A-Level)', 
    teacherName: 'อาจารย์มาลี สดใส', 
    startTime: '14:00', 
    endTime: '16:00', 
    room: 'ห้อง A101 (ชั้น 1)',
    subject: 'english' 
  }
]

const daysOfWeek = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์']

export default function StudentSchedulePage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [schedules, setSchedules] = useState<any[]>(mockWeeklySchedules)
  const [isLoading, setIsLoading] = useState(true)
  const [isMockMode, setIsMockMode] = useState(false)

  // Load schedule data
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (!currentUser) {
          setIsMockMode(true)
          setIsLoading(false)
          return
        }
        setUser(currentUser)

        // Fetch user's enrollments and joined schedules
        const { data: dbEnrollments } = await supabase
          .from('enrollments')
          .select('id, student_id, course_id, courses(*)')
          .eq('student_id', currentUser.id)
          .eq('status', 'active')

        if (dbEnrollments && dbEnrollments.length > 0) {
          const enrollmentIds = dbEnrollments.map(e => e.id)
          
          // Fetch schedules matching active enrollments
          const { data: dbSchedules } = await supabase
            .from('schedules')
            .select('*, courses(*), teachers(*)')
            .in('enrollment_id', enrollmentIds)
            .eq('is_active', true)

          if (dbSchedules && dbSchedules.length > 0) {
            // Translate db model to weekly schedule format
            const formatted = dbSchedules.map(s => {
              const daysMap = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
              const dayIndex = Array.isArray(s.day_of_week) ? s.day_of_week[0] : 1
              return {
                id: s.id,
                day: daysMap[dayIndex] || 'จันทร์',
                courseName: s.courses?.name || 'หลักสูตรศึกษา',
                teacherName: s.teachers?.name || 'คุณครูประจำวิชา',
                startTime: s.start_time?.substring(0, 5) || '16:00',
                endTime: s.end_time?.substring(0, 5) || '18:00',
                room: s.room ? `ห้อง ${s.room}` : 'ห้องเรียนออนไลน์',
                subject: s.courses?.subject || 'math'
              }
            })
            setSchedules(formatted)
          } else {
            // If enrollments exist but no schedules set up in Supabase DB yet
            setIsMockMode(true)
          }
        } else {
          // If no enrollments exist in DB, fallback to high-fidelity mocks
          setIsMockMode(true)
        }
      } catch (err) {
        console.error('Supabase load schedules error, using mock data:', err)
        setIsMockMode(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Group schedules by day of week for timetable rendering
  const getSchedulesForDay = (dayName: string) => {
    return schedules.filter(s => s.day === dayName)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-thai relative">
      
      {/* Header Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/student/dashboard" className="font-ui font-bold text-text-muted hover:text-[#1a56db] flex items-center gap-1.5 text-xs transition-colors">
              <ArrowLeft className="w-4 h-4" /> แดชบอร์ดผู้เรียน
            </Link>
            <span className="text-border/60">|</span>
            <span className="font-thai text-[#0f2557] text-xs font-bold bg-[#f0f4ff] border border-blue-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#1a56db]" /> ตารางเรียนของฉัน
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isMockMode && (
              <span className="text-[9px] font-bold bg-amber-50 text-[#f59e0b] border border-amber-200 px-2 py-0.5 rounded-md">
                SIMULATION MODE
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Page Banner */}
        <div className="bg-gradient-to-br from-[#0f2557] via-[#102a69] to-[#1a56db] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-[#f59e0b]" /> ตารางเรียนรายวิชาประจำสัปดาห์
            </h1>
            <p className="font-thai text-white/70 text-xs sm:text-sm max-w-2xl leading-relaxed">
              ตารางเรียนทั้งหมดของคุณจำแนกตามวันเรียนอย่างเป็นระบบ กรุณาเข้าเรียนตรงเวลานัดหมายและจัดเตรียมเอกสารประกอบการเรียนที่ครูส่งให้ก่อนเข้าห้องเรียน 15 นาที
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
            <p className="font-thai text-text-muted text-xs font-semibold">กำลังจัดตารางเรียนรายสัปดาห์...</p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Weekly Timetable Grid Layout */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
              <h2 className="font-ui font-extrabold text-[#0f2557] text-base border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1a56db]" /> ปฏิทินแสดงตารางเรียน (Timetable Grid)
              </h2>

              <div className="grid md:grid-cols-7 gap-4 items-stretch">
                {daysOfWeek.map(day => {
                  const daySchedules = getSchedulesForDay(day)
                  const hasClasses = daySchedules.length > 0

                  return (
                    <div 
                      key={day} 
                      className={`rounded-2xl border p-4 flex flex-col justify-start min-h-[160px] transition-all
                        ${hasClasses 
                          ? 'bg-blue-50/50 border-[#1a56db]/20 shadow-sm' 
                          : 'bg-slate-50/50 border-slate-100'
                        }
                      `}
                    >
                      {/* Day title header */}
                      <div className="border-b border-slate-100 pb-2 mb-3 text-center">
                        <span className={`font-ui font-black text-xs px-2.5 py-1 rounded-full
                          ${day === 'เสาร์' ? 'bg-[#f59e0b]/10 text-amber-700'
                            : day === 'อาทิตย์' ? 'bg-rose-50 text-rose-700'
                            : 'bg-[#0f2557]/10 text-[#0f2557]'
                          }
                        `}>
                          {day}
                        </span>
                      </div>

                      {/* Day list classes */}
                      <div className="space-y-3 flex-1 flex flex-col justify-center">
                        {!hasClasses ? (
                          <span className="text-[10px] font-thai text-slate-400 text-center italic block my-auto">
                            ไม่มีเรียน
                          </span>
                        ) : (
                          daySchedules.map(s => (
                            <div 
                              key={s.id} 
                              className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:border-[#1a56db]/40 hover:-translate-y-0.5 transition-all text-left space-y-1.5"
                            >
                              <div className="font-ui font-extrabold text-[#0f2557] text-[11px] leading-tight truncate" title={s.courseName}>
                                {s.courseName}
                              </div>
                              <div className="font-ui text-text-muted text-[10px] flex items-center gap-1 font-semibold">
                                <Clock className="w-3 h-3 text-[#1a56db]" /> {s.startTime} - {s.endTime} น.
                              </div>
                              <div className="font-thai text-[9px] text-[#475569] truncate">
                                🧑‍🏫 {s.teacherName}
                              </div>
                              <div className="font-thai text-[9px] text-text-muted flex items-center gap-0.5">
                                <MapPin className="w-3 h-3 text-slate-400" /> {s.room}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* List Detail View */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h2 className="font-ui font-extrabold text-[#0f2557] text-base border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1a56db]" /> ข้อมูลรายชื่อและสถานที่เรียน (Class Detail Log)
              </h2>

              <div className="space-y-4">
                {schedules.map((s, idx) => (
                  <div 
                    key={s.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#1a56db]/20 transition-all hover:shadow-md text-left"
                  >
                    <div className="flex items-start gap-4">
                      {/* Subject badge circle avatar */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center text-white shrink-0 shadow-sm font-ui font-extrabold text-xs">
                        {s.subject.toUpperCase().substring(0, 3)}
                      </div>

                      <div className="space-y-1">
                        <div className="font-ui font-extrabold text-[#0f2557] text-sm sm:text-base leading-snug">
                          {s.courseName}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#1a56db]" /> วัน {s.day} เวลา {s.startTime} - {s.endTime} น.
                          </span>
                          <span className="flex items-center gap-1 font-thai text-[#475569]">
                            <User className="w-3.5 h-3.5 text-slate-400" /> ครูผู้สอน: {s.teacherName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 shrink-0">
                      <div className="text-left sm:text-right">
                        <div className="text-[10px] text-text-muted font-bold font-thai">ห้องเรียนประจำวิชา</div>
                        <div className="font-thai font-extrabold text-xs text-[#0f2557] mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" /> {s.room}
                        </div>
                      </div>
                      
                      <Link 
                        href="/student/booking" 
                        className="btn bg-[#f0f4ff] hover:bg-[#e1ecff] text-[#1a56db] text-xs font-ui font-extrabold px-4.5 py-2 rounded-xl transition-all"
                      >
                        จองเพิ่มชดเชย
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timetable instructions disclaimer card */}
            <div className="p-4.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-ui font-bold text-xs text-[#b45309]">💡 คำแนะนำการเรียนประจำสถาบัน</h4>
                <p className="font-thai text-[11px] text-[#b45309] leading-relaxed">
                  กรณีนักเรียนติดภารกิจที่โรงเรียนหรือลาป่วย ไม่สามารถเข้าเรียนตามคาบปกติในตารางด้านบนได้ กรุณากดปุ่ม **"จองเพิ่มชดเชย"** เพื่อส่งคำร้องของัดชดเชยส่วนตัวกับคุณครูวิชาการประจำวิชานั้น ๆ ล่วงหน้าอย่างน้อย 1 วัน เพื่อผลประโยชน์ในการเรียนของน้องอย่างสูงสุด
                </p>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  )
}
