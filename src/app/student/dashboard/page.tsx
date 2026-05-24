import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen, Calendar, TrendingUp, Bell, Clock,
  CheckCircle2, XCircle, AlertCircle, Star, LogOut,
} from 'lucide-react'
import { formatTime } from '@/lib/utils/format'
import ResultsLineChart from '@/components/student/ResultsLineChart'
import AttendanceRealtime from '@/components/student/AttendanceRealtime'

export const metadata = { title: 'แผงนักเรียน — LIFE Academy' }

// Mock fallback data for development/sandbox environment
const mockSchedule = [
  { id: '1', courseName: 'คณิตศาสตร์ ม.ต้น (เน้นสอบ)', teacherName: 'อาจารย์สมชาย', day: 'จันทร์', startTime: '16:00', endTime: '18:00', room: 'A201', isNow: false },
  { id: '2', courseName: 'ฟิสิกส์เข้มข้น ม.ปลาย',         teacherName: 'อาจารย์สมหญิง', day: 'พุธ',   startTime: '16:00', endTime: '18:00', room: 'B102', isNow: false },
  { id: '3', courseName: 'ภาษาอังกฤษ TCAS (A-Level)',   teacherName: 'อาจารย์มาลี',   day: 'ศุกร์',  startTime: '14:00', endTime: '16:00', room: 'A101', isNow: false },
]

const mockResults = [
  { subject: 'คณิตศาสตร์', score: 82, maxScore: 100 },
  { subject: 'ฟิสิกส์',     score: 75, maxScore: 100 },
  { subject: 'อังกฤษ',      score: 90, maxScore: 100 },
]

export default async function StudentDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if user session does not exist
  if (!user) {
    redirect('/login')
  }

  // Initial fallbacks
  let studentName = user.user_metadata?.name || user.email?.split('@')[0] || 'นักเรียน'
  let studentLevel = 'มัธยมปลาย'
  let streakCount = 5
  
  let scheduleList = mockSchedule
  let resultsList = mockResults
  let attendanceList: any[] = []
  let enrollmentIds: string[] = []

  try {
    // 1. Fetch Student Profile
    const { data: student } = await supabase
      .from('students')
      .select('*')
      .eq('id', user.id)
      .single()

    if (student) {
      studentName = student.name
      studentLevel = student.level === 'primary' ? 'ประถมศึกษา' 
                   : student.level === 'secondary' ? 'มัธยมต้น' 
                   : student.level === 'high' ? 'มัธยมปลาย' 
                   : 'เตรียมสอบ'
    }

    // 2. Fetch Enrollments
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('*, courses(*)')
      .eq('student_id', user.id)

    if (enrollments && enrollments.length > 0) {
      enrollmentIds = enrollments.map(e => e.id)
      
      // 3. Fetch Attendance
      const { data: attendance } = await supabase
        .from('attendance')
        .select('*')
        .in('enrollment_id', enrollmentIds)
        .order('session_date', { ascending: false })

      if (attendance) {
        attendanceList = attendance
      }

      // 4. Fetch Test Results
      const { data: testResults } = await supabase
        .from('test_results')
        .select('*, courses(*)')
        .eq('student_id', user.id)
        .order('test_date', { ascending: false })

      if (testResults && testResults.length > 0) {
        resultsList = testResults.map(r => ({
          subject: r.courses?.name || 'รายวิชา',
          score: Number(r.score),
          maxScore: Number(r.max_score),
        }))
      }
    }
  } catch (err) {
    // Graceful fallback to mock data on database queries failure
    console.error('Supabase dashboard data fetch error, using mocks:', err)
  }

  // Calculate quick stats
  const mockPresent = 22
  const total = attendanceList.length > 0 ? attendanceList.length : 25
  const finalPresent = attendanceList.length > 0 
    ? attendanceList.filter(a => a.status === 'present').length 
    : mockPresent
  
  const attendRate = Math.round((finalPresent / total) * 100)

  return (
    <div className="min-h-screen bg-slate-50 font-thai">
      {/* 1. Dashboard Navbar */}
      <header className="bg-white border-b border-border/60 sticky top-0 z-40">
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
            <span className="font-thai text-text-muted text-sm font-semibold">Student Portal</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="p-2 rounded-xl hover:bg-[#f0f4ff] transition-colors relative" aria-label="แจ้งเตือน">
              <Bell className="w-4.5 h-4.5 text-[#64748b]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
            </button>

            {/* User Dropdown Profile Circle */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center text-white text-sm font-ui font-extrabold shadow-sm">
                {studentName[0]?.toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-[#0f2557] leading-none">{studentName}</div>
                <div className="text-[10px] text-text-muted leading-none mt-1">{studentLevel}</div>
              </div>
            </div>

            {/* Logout */}
            <form action="/api/auth/signout" method="POST">
              <button 
                type="submit"
                className="p-2 rounded-xl hover:bg-red-50 text-text-muted hover:text-red-600 transition-colors ml-1"
                aria-label="ออกจากระบบ"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* 2. Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Welcome Dashboard Banner card */}
        <div className="bg-gradient-to-br from-[#0f2557] via-[#102a69] to-[#1a56db] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="font-thai text-white/70 text-xs sm:text-sm font-medium flex items-center gap-1.5">
                ยินดีต้อนรับกลับเข้าสู่ระบบศึกษา 👋
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl">{studentName}</h1>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="badge bg-[#f59e0b] text-[#0f2557] font-bold text-xs px-3 py-1 rounded-xl">
                  🔥 เรียนต่อเนื่อง {streakCount} วัน
                </span>
                <span className="badge bg-white/10 text-white border border-white/10 font-bold text-xs px-3 py-1 rounded-xl">
                  🎓 {studentLevel}
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl">
              {[
                { label: 'คาบเรียนสัปดาห์นี้', value: '3', icon: Calendar },
                { label: 'อัตราการเข้าเรียน', value: `${attendRate}%`, icon: CheckCircle2 },
                { label: 'คะแนนการสอบเฉลี่ย', value: '82%', icon: TrendingUp },
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

        {/* Quick actions row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'ตารางการเรียน', icon: Calendar, href: '/student/schedule', color: 'bg-blue-50 text-[#1a56db] border-blue-100 hover:border-blue-300' },
            { label: 'รายงานผลสอบ', icon: TrendingUp, href: '/student/results', color: 'bg-emerald-50 text-[#059669] border-emerald-100 hover:border-emerald-300' },
            { label: 'จองคลาสเรียน', icon: BookOpen, href: '/student/booking', color: 'bg-amber-50 text-[#f59e0b] border-amber-100 hover:border-amber-300' },
            { label: 'ติดต่อครูประจำชั้น', icon: Star, href: '/contact', color: 'bg-purple-50 text-[#7c3aed] border-purple-100 hover:border-purple-300' },
          ].map(a => (
            <Link key={a.label} href={a.href}
              className="card flex flex-col items-center gap-3.5 py-6 hover:-translate-y-0.5 hover:shadow-md border border-border/40 transition-all cursor-pointer text-center"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm ${a.color.split(' ')[0]} ${a.color.split(' ')[1]}`}>
                <a.icon className="w-5 h-5" />
              </div>
              <span className="font-thai font-extrabold text-[#0f2557] text-xs sm:text-sm">{a.label}</span>
            </Link>
          ))}
        </div>

        {/* Grid panel: Left and Right */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left panel: Schedule list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card border border-border/40 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-ui font-extrabold text-[#0f2557] text-base flex items-center gap-2">
                  <Calendar className="w-4.5 h-4.5 text-[#1a56db]" /> ตารางเรียนจำแนกวิชาสัปดาห์นี้
                </h2>
                <Link href="/student/schedule" className="text-[#1a56db] text-xs font-ui font-bold hover:underline flex items-center gap-0.5">
                  ดูตารางทั้งหมด →
                </Link>
              </div>

              <div className="space-y-3.5">
                {scheduleList.map(s => (
                  <div key={s.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all
                      ${s.isNow ? 'border-[#1a56db] bg-[#f0f4ff] shadow-sm' : 'border-border/60 hover:border-[#1a56db]/30'}
                    `}
                  >
                    <div className="text-center min-w-[55px] border-r border-border/60 pr-4">
                      <div className="font-ui font-extrabold text-[#0f2557] text-sm">{s.day}</div>
                      <div className="font-ui text-text-muted text-[10px] font-semibold mt-1">{formatTime(s.startTime)}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-ui font-extrabold text-[#0f2557] text-sm truncate">{s.courseName}</div>
                      <div className="font-thai text-text-muted text-xs mt-1">{s.teacherName} • ห้องเรียน {s.room}</div>
                    </div>
                    {s.isNow && (
                      <span className="badge bg-[#1a56db] text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse flex-shrink-0">
                        LIVE
                      </span>
                    )}
                    <Clock className="w-4 h-4 text-[#94a3b8]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Results Line Chart Comparison */}
            <div className="card border border-border/40 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-ui font-extrabold text-[#0f2557] text-base flex items-center gap-2">
                  <TrendingUp className="w-4.5 h-4.5 text-[#1a56db]" /> กราฟวิเคราะห์พัฒนาการเรียนย้อนหลัง (Recharts)
                </h2>
                <Link href="/student/results" className="text-[#1a56db] text-xs font-ui font-bold hover:underline">
                  ดูรายงานเต็ม →
                </Link>
              </div>
              
              {/* Line chart widget */}
              <ResultsLineChart />
              
              <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-border/50 text-[11px] font-thai text-text-muted text-center leading-relaxed max-w-xl mx-auto">
                📈 <strong>หมายเหตุ:</strong> กราฟสรุปความคืบหน้าการพัฒนาเปรียบเทียบระหว่างคะแนน Pre-Test ก่อนเริ่มหลักสูตร และคะแนน Post-Test ล่าสุดเพื่อประเมินความเร็วในการพัฒนาทักษะการเรียนรู้
              </div>
            </div>
          </div>

          {/* Right panel: Sidebar Realtime Attendance & Progress */}
          <div className="space-y-6">
            
            {/* Realtime Attendance Live Updates */}
            <AttendanceRealtime 
              initialAttendance={attendanceList} 
              enrollmentIds={enrollmentIds}
            />

            {/* Score progress meters */}
            <div className="card border border-border/40 p-6">
              <h2 className="font-ui font-bold text-[#0f2557] mb-5 flex items-center gap-2">
                <Star className="w-4.5 h-4.5 text-[#f59e0b] fill-[#f59e0b]" /> ความคืบหน้าคะแนนล่าสุด
              </h2>
              
              <div className="space-y-4">
                {resultsList.map(r => {
                  const pct = Math.round((r.score / r.maxScore) * 100)
                  return (
                    <div key={r.subject} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-ui">
                        <span className="text-[#0f2557] font-bold">{r.subject}</span>
                        <span className="text-text-muted font-bold">{r.score}/{r.maxScore}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 border border-border/30 overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            pct >= 85 ? 'bg-gradient-to-r from-[#059669] to-emerald-400' 
                            : pct >= 65 ? 'bg-gradient-to-r from-[#f59e0b] to-amber-300' 
                            : 'bg-gradient-to-r from-red-500 to-rose-400'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="pt-2 text-center border-t border-border/50 mt-5">
                <Link href="/student/results" className="inline-block text-xs font-ui font-bold text-[#1a56db] hover:text-[#0f2557] hover:underline">
                  ดูประวัติผลการเรียนทั้งหมด →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
