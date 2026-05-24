// ============================================================
// types/index.ts — LIFE Academy Master Types
// ============================================================

// ─── DATABASE ENTITIES ──────────────────────────────────────

export interface Course {
  id: string
  name: string
  name_th?: string
  level: 'primary' | 'secondary' | 'high' | 'exam'
  subject: 'math' | 'english' | 'science' | 'thai' | 'social' | 'physics' | 'chemistry' | 'biology'
  format: 'onsite' | 'online' | 'private'
  price: number
  description?: string
  max_students: number
  sessions_per_week: number
  is_active: boolean
  created_at: string
  // computed / joined
  enrolled_count?: number
  teacher?: Teacher
}

export interface Teacher {
  id: string
  name: string
  subject: string[]
  experience_years?: number
  education?: string
  bio?: string
  avatar_url?: string
  is_active: boolean
  created_at: string
}

export interface Student {
  id: string
  name: string
  phone?: string
  parent_name?: string
  parent_phone?: string
  level?: string
  school?: string
  address?: string
  line_id?: string
  avatar_url?: string
  enrolled_at: string
  is_active: boolean
}

export interface Enrollment {
  id: string
  student_id: string
  course_id: string
  teacher_id?: string
  start_date: string
  end_date?: string
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  price_paid?: number
  payment_method?: string
  created_at: string
  // joined
  course?: Course
  teacher?: Teacher
  student?: Student
}

export interface Schedule {
  id: string
  enrollment_id: string
  teacher_id: string
  course_id: string
  day_of_week: number[]
  start_time: string
  end_time: string
  room?: string
  is_active: boolean
  created_at: string
  // joined
  course?: Course
  teacher?: Teacher
}

export interface Attendance {
  id: string
  enrollment_id: string
  session_date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  note?: string
  recorded_by?: string
  created_at: string
}

export interface TestResult {
  id: string
  student_id: string
  course_id: string
  test_type: 'pre' | 'post' | 'monthly' | 'mock' | 'midterm' | 'final'
  score: number
  max_score: number
  percentage: number
  notes?: string
  test_date: string
  created_at: string
  // joined
  course?: Course
}

export interface Booking {
  id: string
  student_id: string
  teacher_id: string
  course_id: string
  booking_date: string
  start_time: string
  end_time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  created_at: string
  // joined
  teacher?: Teacher
  course?: Course
}

export interface Inquiry {
  id: string
  name: string
  phone: string
  email?: string
  level?: string
  subject?: string
  format?: string
  message?: string
  status: 'new' | 'contacted' | 'enrolled' | 'closed'
  source: string
  created_at: string
}

export interface NewsArticle {
  id: string
  title: string
  content?: string
  excerpt?: string
  image_url?: string
  category: 'news' | 'activity' | 'success' | 'announcement'
  is_published: boolean
  published_at?: string
  created_at: string
}

// ─── FORM INPUTS ─────────────────────────────────────────────

export interface RegisterFormInput {
  name: string
  phone: string
  email?: string
  level: string
  subject: string
  format: 'onsite' | 'online' | 'private'
  message?: string
}

export interface BookingFormInput {
  student_id: string
  teacher_id: string
  course_id: string
  booking_date: string
  start_time: string
  end_time: string
  notes?: string
}

export interface LevelTestInput {
  level: string
  subject: string
  goal: string
  answers?: Record<string, string>
}

export interface LevelTestResult {
  recommendedLevel: string
  description: string
  courses: Course[]
  strengths: string[]
  weaknesses: string[]
  nextSteps: string[]
}

// ─── API RESPONSES ───────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ─── DASHBOARD / ANALYTICS ───────────────────────────────────

export interface DashboardStats {
  totalStudents: number
  activeStudents: number
  totalRevenue: number
  monthlyRevenue: number
  attendanceRate: number
  newInquiries: number
  upcomingLessons: number
}

export interface StudentDashboard {
  student: Student
  enrollments: Enrollment[]
  upcomingSchedule: ScheduleItem[]
  recentResults: TestResult[]
  attendanceSummary: {
    present: number
    absent: number
    late: number
    excused: number
    streak: number
  }
}

export interface ScheduleItem {
  id: string
  courseId: string
  courseName: string
  teacherName: string
  day: string
  date: string
  startTime: string
  endTime: string
  room?: string
  isToday: boolean
  isNow: boolean
}

// ─── UI HELPERS ──────────────────────────────────────────────

export type SubjectLabel = {
  value: string
  label: string
  color: string
  icon: string
}

export type LevelLabel = {
  value: string
  label: string
  short: string
}

export const SUBJECTS: SubjectLabel[] = [
  { value: 'math',      label: 'คณิตศาสตร์',    color: 'bg-blue-100 text-blue-800',   icon: '📐' },
  { value: 'english',   label: 'ภาษาอังกฤษ',    color: 'bg-green-100 text-green-800',  icon: '🔤' },
  { value: 'science',   label: 'วิทยาศาสตร์',    color: 'bg-purple-100 text-purple-800', icon: '🔬' },
  { value: 'thai',      label: 'ภาษาไทย',       color: 'bg-red-100 text-red-800',     icon: '📖' },
  { value: 'physics',   label: 'ฟิสิกส์',        color: 'bg-indigo-100 text-indigo-800', icon: '⚡' },
  { value: 'chemistry', label: 'เคมี',           color: 'bg-yellow-100 text-yellow-800', icon: '🧪' },
  { value: 'biology',   label: 'ชีววิทยา',       color: 'bg-emerald-100 text-emerald-800', icon: '🌿' },
  { value: 'social',    label: 'สังคมศึกษา',     color: 'bg-orange-100 text-orange-800', icon: '🌏' },
]

export const LEVELS: LevelLabel[] = [
  { value: 'primary',   label: 'ประถมศึกษา',   short: 'ป.' },
  { value: 'secondary', label: 'มัธยมต้น',     short: 'ม.ต้น' },
  { value: 'high',      label: 'มัธยมปลาย',    short: 'ม.ปลาย' },
  { value: 'exam',      label: 'เตรียมสอบ',    short: 'สอบ' },
]

export type UserRole = 'student' | 'teacher' | 'admin' | 'parent'

export interface AppUser {
  id: string
  email: string
  role: UserRole
  profile?: Student | Teacher
}
