'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Calendar, Clock, BookOpen, User, CheckCircle2, XCircle,
  AlertCircle, ArrowLeft, Plus, ChevronRight, Check, Send,
  HelpCircle, MessageCircle, Sparkles
} from 'lucide-react'

// --- HIGH-FIDELITY MOCK FALLBACK DATA ---
const mockCourses = [
  { id: 'c1', name: 'คณิตศาสตร์ ม.ต้น (เน้นสอบเข้า ม.4)', subject: 'math', level: 'm3' },
  { id: 'c2', name: 'ภาษาอังกฤษ Grammar & TCAS (A-Level)', subject: 'english', level: 'm3' },
  { id: 'c3', name: 'ฟิสิกส์เข้มข้น ม.ปลาย (เตรียมสอบวิศวะฯ)', subject: 'physics', level: 'm3' },
  { id: 'c4', name: 'เคมี + ชีววิทยา สายแพทย์/พยาบาล TCAS', subject: 'chemistry', level: 'm3' }
]

const mockTeachers = [
  { id: 't1', name: 'ครูพี่บิ๊ก (วิชาการคณิตศาสตร์ ม.อ.)', subject: ['math'] },
  { id: 't2', name: 'ครูพี่แนน (อักษรศาสตร์เกียรตินิยม / IELTS 8.5)', subject: ['english'] },
  { id: 't3', name: 'ครูพี่เอ็น (ศึกษาศาสตรมหาบัณฑิต วิทย์-เคมี)', subject: ['physics', 'chemistry', 'science'] }
]

const mockBookingsList = [
  {
    id: 'b1',
    booking_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    start_time: '16:00:00',
    end_time: '18:00:00',
    status: 'pending',
    notes: 'อยากทบทวนบทเรียนเรื่องสมการเชิงเส้นตัวแปรเดียวเพิ่มเติมครับ',
    course: { name: 'คณิตศาสตร์ ม.ต้น (เน้นสอบเข้า ม.4)' },
    teacher: { name: 'ครูพี่บิ๊ก (วิชาการคณิตศาสตร์ ม.อ.)' }
  },
  {
    id: 'b2',
    booking_date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0], // 3 days ago
    start_time: '14:00:00',
    end_time: '16:00:00',
    status: 'confirmed',
    notes: 'ปรับพื้นฐานเรื่อง Tense และเตรียมตัวสอบกลางภาคย่อย',
    course: { name: 'ภาษาอังกฤษ Grammar & TCAS (A-Level)' },
    teacher: { name: 'ครูพี่แนน (อักษรศาสตร์เกียรตินิยม / IELTS 8.5)' }
  }
]

const timeSlots = [
  { start: '09:00:00', end: '11:00:00', label: 'ช่วงเช้า (09:00 - 11:00)' },
  { start: '13:00:00', end: '15:00:00', label: 'ช่วงบ่าย 1 (13:00 - 15:00)' },
  { start: '16:00:00', end: '18:00:00', label: 'ช่วงเย็น (16:00 - 18:00)' }
]

export default function StudentBookingPage() {
  const supabase = createClient()
  const router = useRouter()

  // App state
  const [user, setUser] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>(mockCourses)
  const [teachers, setTeachers] = useState<any[]>(mockTeachers)
  const [bookings, setBookings] = useState<any[]>(mockBookingsList)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMockMode, setIsMockMode] = useState(false)

  // Booking Form State
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(0)
  const [notes, setNotes] = useState('')

  // Toast system
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([])
  
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4500)
  }

  // Load user data and dynamic options
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        // 1. Check active user session
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (!currentUser) {
          // If no user found, fallback to simulated developer preview mode
          setIsMockMode(true)
          showToast('เข้าสู่ระบบจองคลาสโหมดผู้พัฒนา (Sandbox Mode) เรียบร้อย 🚀', 'info')
          setIsLoading(false)
          return
        }

        setUser(currentUser)

        // 2. Fetch active courses
        const { data: dbCourses } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
        
        if (dbCourses && dbCourses.length > 0) {
          setCourses(dbCourses)
        }

        // 3. Fetch active teachers
        const { data: dbTeachers } = await supabase
          .from('teachers')
          .select('*')
          .eq('is_active', true)

        if (dbTeachers && dbTeachers.length > 0) {
          setTeachers(dbTeachers)
        }

        // 4. Fetch user's bookings
        const { data: dbBookings } = await supabase
          .from('bookings')
          .select('*, courses(*), teachers(*)')
          .eq('student_id', currentUser.id)
          .order('booking_date', { ascending: false })

        if (dbBookings) {
          // Normalise response format
          const formatted = dbBookings.map(b => ({
            id: b.id,
            booking_date: b.booking_date,
            start_time: b.start_time,
            end_time: b.end_time,
            status: b.status,
            notes: b.notes,
            course: b.courses || { name: 'วิชาเรียนหลักสูตร' },
            teacher: b.teachers || { name: 'คุณครูวิชาการ' }
          }))
          setBookings(formatted)
        }

      } catch (err) {
        console.error('Supabase load data error, using mock data:', err)
        setIsMockMode(true)
        showToast('ฐานข้อมูลกำลังปรับปรุง - เปิดโหมดสาธิตแบบจำลอง (Demo Simulation)', 'info')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Create new class booking
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCourse) {
      showToast('กรุณาเลือกวิชาหรือหลักสูตรที่ต้องการเรียน', 'error')
      return
    }
    if (!selectedTeacher) {
      showToast('กรุณาระบุคุณครูผู้สอน', 'error')
      return
    }
    if (!bookingDate) {
      showToast('กรุณาระบุวันที่ต้องการจองเรียน', 'error')
      return
    }

    setIsSubmitting(true)
    const slot = timeSlots[selectedTimeSlot]

    try {
      if (isMockMode || !user) {
        // Mock submission fallback
        setTimeout(() => {
          const matchedCourse = courses.find(c => c.id === selectedCourse)
          const matchedTeacher = teachers.find(t => t.id === selectedTeacher)

          const newBooking = {
            id: 'mock-' + Date.now(),
            booking_date: bookingDate,
            start_time: slot.start,
            end_time: slot.end,
            status: 'pending',
            notes: notes,
            course: { name: matchedCourse ? matchedCourse.name : 'วิชาเสริมที่เลือก' },
            teacher: { name: matchedTeacher ? matchedTeacher.name : 'คุณครูวิชาการ' }
          }

          setBookings(prev => [newBooking, ...prev])
          showToast('ส่งใบคำขอจองคลาสเรียนสำเร็จเรียบร้อย! เจ้าหน้าที่จะติดต่อยืนยันทาง LINE', 'success')
          setIsSubmitting(false)

          // Reset form
          setSelectedCourse('')
          setSelectedTeacher('')
          setBookingDate('')
          setNotes('')
        }, 1000)
      } else {
        // Real DB submission
        const payload = {
          student_id: user.id,
          course_id: selectedCourse,
          teacher_id: selectedTeacher,
          booking_date: bookingDate,
          start_time: slot.start,
          end_time: slot.end,
          notes: notes,
          status: 'pending'
        }

        const { data, error } = await supabase
          .from('bookings')
          .insert([payload])
          .select()

        if (error) throw error

        // Send LINE Flex Message notification to admin
        const matchedCourse = courses.find(c => c.id === selectedCourse)
        const matchedTeacher = teachers.find(t => t.id === selectedTeacher)
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'booking_request',
            studentEmail: user.email,
            courseName: matchedCourse?.name ?? selectedCourse,
            teacherName: matchedTeacher?.name ?? selectedTeacher,
            bookingDate,
            startTime: slot.start,
            endTime: slot.end,
            notes: notes || undefined,
          }),
        }).catch(err => console.error('LINE notify error:', err))

        showToast('จองคลาสเรียนสำเร็จและบันทึกสู่ระบบแล้ว 🎉', 'success')
        
        // Refresh booking list
        const { data: dbBookings } = await supabase
          .from('bookings')
          .select('*, courses(*), teachers(*)')
          .eq('student_id', user.id)
          .order('booking_date', { ascending: false })

        if (dbBookings) {
          const formatted = dbBookings.map(b => ({
            id: b.id,
            booking_date: b.booking_date,
            start_time: b.start_time,
            end_time: b.end_time,
            status: b.status,
            notes: b.notes,
            course: b.courses || { name: 'วิชาเรียนหลักสูตร' },
            teacher: b.teachers || { name: 'คุณครูวิชาการ' }
          }))
          setBookings(formatted)
        }

        setIsSubmitting(false)
        setSelectedCourse('')
        setSelectedTeacher('')
        setBookingDate('')
        setNotes('')
      }
    } catch (err: any) {
      console.error(err)
      showToast(`จองล้มเหลว: ${err.message || 'กรุณาลองใหม่อีกครั้ง'}`, 'error')
      setIsSubmitting(false)
    }
  }

  // Cancel Booking handler (only for pending)
  const handleCancelBooking = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการยกเลิกคำขอจองคลาสเรียนนี้?')) return

    try {
      if (isMockMode || !user) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
        showToast('ยกเลิกการจองคาบเรียนสำเร็จเรียบร้อย', 'info')
      } else {
        const { error } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('id', id)

        if (error) throw error

        showToast('อัปเดตยกเลิกรายการจองในระบบเรียบร้อย', 'info')
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
      }
    } catch (err: any) {
      console.error(err)
      showToast(`เกิดข้อผิดพลาด: ${err.message}`, 'error')
    }
  }

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
              : <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            }
            <div className="text-xs font-semibold leading-relaxed">{t.message}</div>
          </div>
        ))}
      </div>

      {/* Header Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/student/dashboard" className="font-ui font-bold text-text-muted hover:text-[#1a56db] flex items-center gap-1.5 text-xs transition-colors">
              <ArrowLeft className="w-4 h-4" /> แดชบอร์ดผู้เรียน
            </Link>
            <span className="text-border/60">|</span>
            <span className="font-thai text-[#0f2557] text-xs font-bold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" /> ระบบจองเรียนพิเศษ
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center text-white text-xs font-ui font-black">
              {user?.email?.[0]?.toUpperCase() || 'S'}
            </div>
            {isMockMode && (
              <span className="text-[9px] font-bold bg-[#f0f4ff] text-[#1a56db] border border-blue-100 px-2 py-0.5 rounded-md">
                DEMO MODE
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Banner header card */}
        <div className="bg-gradient-to-br from-[#0f2557] via-[#102a69] to-[#1a56db] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl flex items-center gap-2">
              <Calendar className="w-7 h-7 text-[#f59e0b]" /> จองคาบเรียนเสริม & ติวชดเชย
            </h1>
            <p className="font-thai text-white/70 text-xs sm:text-sm max-w-2xl leading-relaxed">
              สิทธิพิเศษสำหรับนักเรียนสถาบัน LIFE Academy เท่านั้น สามารถจองสล็อตเพื่อทบทวนบทเรียน สอบถามเนื้อหาค้างใจ หรือนัดชดเชยวิชาเรียนพิเศษกับคุณครูวิชาการประจำวิชาได้โดยไม่เสียค่าใช้จ่ายเพิ่มเติม
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
            <p className="font-thai text-text-muted text-xs font-semibold">กำลังตรวจสอบสิทธิ์การจองและจัดเตรียมแบบฟอร์ม...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Left/Middle Column - Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleCreateBooking} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="font-ui font-extrabold text-[#0f2557] text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Plus className="w-5 h-5 text-[#1a56db]" /> ระบุข้อมูลแบบคำขอจองคลาส
                </h2>

                {/* Course Selection */}
                <div className="space-y-2 text-left">
                  <label htmlFor="course" className="block text-xs font-bold text-[#0f2557] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#1a56db]" /> เลือกหลักสูตร/วิชาเรียนหลัก *
                  </label>
                  <select
                    id="course"
                    required
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-xs font-thai font-semibold text-[#0f2557] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] transition-all"
                  >
                    <option value="">-- กรุณาเลือกหลักสูตรที่ลงทะเบียนไว้ --</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.level ? `(${c.level === 'high' ? 'ม.ปลาย' : c.level === 'secondary' ? 'ม.ต้น' : 'ประถม'})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Teacher Selection */}
                <div className="space-y-2 text-left">
                  <label htmlFor="teacher" className="block text-xs font-bold text-[#0f2557] flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#1a56db]" /> เลือกคุณครูผู้สอน *
                  </label>
                  <select
                    id="teacher"
                    required
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-xs font-thai font-semibold text-[#0f2557] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] transition-all"
                  >
                    <option value="">-- กรุณาเลือกครูผู้เชี่ยวชาญประจำสถาบัน --</option>
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Date and Time slots selection */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date Input */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="date" className="block text-xs font-bold text-[#0f2557] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#1a56db]" /> เลือกวันที่จองเรียน *
                    </label>
                    <input
                      type="date"
                      id="date"
                      required
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Min is tomorrow
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-ui font-semibold text-[#0f2557] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] transition-all"
                    />
                  </div>

                  {/* Time slots radios cards */}
                  <div className="space-y-2 text-left">
                    <label className="block text-xs font-bold text-[#0f2557] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#1a56db]" /> เลือกช่วงเวลาที่สะดวก *
                    </label>
                    <div className="space-y-2">
                      {timeSlots.map((ts, idx) => (
                        <label 
                          key={idx}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all
                            ${selectedTimeSlot === idx 
                              ? 'bg-blue-50 border-[#1a56db] text-[#1a56db]' 
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/50'
                            }
                          `}
                        >
                          <span className="text-xs font-thai font-semibold">{ts.label}</span>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="timeSlot" 
                              checked={selectedTimeSlot === idx}
                              onChange={() => setSelectedTimeSlot(idx)}
                              className="sr-only"
                            />
                            <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center
                              ${selectedTimeSlot === idx ? 'border-[#1a56db] bg-[#1a56db]' : 'border-slate-300 bg-white'}
                            `}>
                              {selectedTimeSlot === idx && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notes Textarea */}
                <div className="space-y-2 text-left">
                  <label htmlFor="notes" className="block text-xs font-bold text-[#0f2557] flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-[#1a56db]" /> รายละเอียดสิ่งที่อยากให้คุณครูเน้นเสริมพิเศษ (ถ้ามี)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="เช่น อยากติวสอบเรื่องความน่าจะเป็นเพิ่มเติม หรือต้องการให้ครูอธิบายสูตรลัดวิชาฟิสิกส์บทที่ 3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-thai text-[#0f2557] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0f2557] to-[#1a56db] hover:opacity-95 text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#0f2557]/10 active:scale-[0.99] transition-all text-xs"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      กำลังส่งใบคำร้องจอง...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4.5 h-4.5" />
                      ส่งคำขอจองคลาสเรียนพิเศษทันที
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column - Booking List & Help info */}
            <div className="space-y-6">
              
              {/* Active / History of bookings */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h3 className="font-ui font-extrabold text-[#0f2557] text-sm flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <Clock className="w-4.5 h-4.5 text-[#1a56db]" /> ประวัติคำขอจองเรียนของคุณ
                </h3>

                <div className="space-y-4.5 max-h-[460px] overflow-y-auto pr-1">
                  {bookings.length === 0 ? (
                    <div className="text-center py-10 space-y-2">
                      <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="font-thai text-text-muted text-xs">คุณยังไม่มีประวัติการจองคลาสเสริม</p>
                    </div>
                  ) : (
                    bookings.map(b => (
                      <div key={b.id} className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all bg-slate-50/50 space-y-3">
                        <div className="flex items-start justify-between">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full
                            ${b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : b.status === 'cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }
                          `}>
                            {b.status === 'confirmed' ? 'อนุมัติแล้ว' : b.status === 'cancelled' ? 'ยกเลิกแล้ว' : 'รอดำเนินการ'}
                          </span>
                          
                          {/* Cancel button only for pending bookings */}
                          {b.status === 'pending' && (
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="text-[10px] font-bold text-rose-600 hover:underline"
                            >
                              ยกเลิกคำขอ
                            </button>
                          )}
                        </div>

                        <div className="space-y-1.5 text-left text-xs">
                          <div className="font-ui font-black text-[#0f2557] leading-snug">{b.course.name}</div>
                          <div className="font-thai text-[#475569] flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" /> ครูผู้สอน: {b.teacher.name}
                          </div>
                          <div className="font-ui text-text-muted flex items-center gap-1.5 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" /> วันเรียน: {new Date(b.booking_date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="font-ui text-text-muted flex items-center gap-1.5 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> เวลา: {b.start_time.substring(0,5)} - {b.end_time.substring(0,5)} น.
                          </div>
                          
                          {b.notes && (
                            <div className="mt-2 text-[11px] font-thai bg-white p-2.5 border border-slate-100 rounded-xl leading-relaxed text-slate-500 italic">
                              💡 &ldquo;{b.notes}&rdquo;
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Booking rules instructions card */}
              <div className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <h4 className="font-ui font-extrabold text-sm text-[#f59e0b] mb-3">🛡️ กฎเกณฑ์และเงื่อนไขการจองเรียน</h4>
                <ul className="text-left font-thai text-[11px] text-white/80 space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>การจองสามารถทำล่วงหน้าได้ **อย่างน้อย 1 วัน** และสูงสุดไม่เกิน 14 วัน</li>
                  <li>เมื่อจองเสร็จสิ้น ระบบจะขึ้นว่า **รอดำเนินการ (Pending)** ทางสถาบันจะติดต่อกลับยืนยันคิวผ่าน LINE ภายใน 2 ชั่วโมง</li>
                  <li>กรณีต้องการยกเลิกคำขอจองคลาสเรียน กรุณากด **"ยกเลิกคำขอ"** ก่อนเวลานัดหมายอย่างน้อย 4 ชั่วโมง เพื่อเปิดโอกาสให้เพื่อนๆ ได้จองเรียนเสริมถัดไป</li>
                </ul>

                <div className="border-t border-white/10 pt-4 mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-white leading-none">สอบถามเพิ่มเติมโทรสายตรง</div>
                    <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="text-[11px] font-ui text-[#f59e0b] font-black hover:underline mt-1 block">
                      แอดไลน์ @lifeacademy
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  )
}
