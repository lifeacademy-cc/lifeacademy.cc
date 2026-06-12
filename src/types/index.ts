// ============================================================
// types/index.ts — LIFE Academy Master Types
// ============================================================

// ─── DATABASE ENTITIES ──────────────────────────────────────

export interface Course {
  id: string
  name: string
  name_th?: string
  level: 'kg' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'm1' | 'm2' | 'm3' | 'future_skill'
  subject: 'math' | 'english' | 'science' | 'thai' | 'social' | 'physics' | 'chemistry' | 'biology' | 'mind'
  format: 'onsite' | 'online' | 'private' | 'elearning'
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
  format: 'onsite' | 'online' | 'private' | 'elearning'
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
  { value: 'exam_m1',      label: 'ติวเข้า ม.1',          color: 'bg-amber-100 text-amber-800',   icon: '🎯' },
  { value: 'exam_m4',      label: 'ติวเข้า ม.4',          color: 'bg-amber-100 text-amber-800',   icon: '🎯' },
  { value: 'exam_m1_pccp', label: 'ติวเข้า ม.1 จุฬาภรณ์ฯ', color: 'bg-yellow-100 text-yellow-800', icon: '🏆' },
  { value: 'math',         label: 'คณิตศาสตร์',           color: 'bg-blue-100 text-blue-800',     icon: '📐' },
  { value: 'science',      label: 'วิทยาศาสตร์',           color: 'bg-purple-100 text-purple-800', icon: '🔬' },
  { value: 'english',      label: 'ภาษาอังกฤษ',           color: 'bg-green-100 text-green-800',   icon: '🔤' },
  { value: 'thai',         label: 'ภาษาไทย',              color: 'bg-red-100 text-red-800',       icon: '📖' },
  { value: 'social',       label: 'สังคมศึกษา',            color: 'bg-orange-100 text-orange-800', icon: '🌏' },
  { value: 'life_skill',   label: 'พัฒนาทักษะชีวิต',      color: 'bg-teal-100 text-teal-800',    icon: '🌱' },
  { value: 'mind',         label: 'พัฒนาสมาธิ',           color: 'bg-rose-100 text-rose-800',    icon: '🧠' },
]

export const LEVELS: LevelLabel[] = [
  { value: 'kg', label: 'อนุบาล', short: 'อ.' },
  { value: 'p1', label: 'ป.1', short: 'ป.1' },
  { value: 'p2', label: 'ป.2', short: 'ป.2' },
  { value: 'p3', label: 'ป.3', short: 'ป.3' },
  { value: 'p4', label: 'ป.4', short: 'ป.4' },
  { value: 'p5', label: 'ป.5', short: 'ป.5' },
  { value: 'p6', label: 'ป.6', short: 'ป.6' },
  { value: 'm1', label: 'ม.1', short: 'ม.1' },
  { value: 'm2', label: 'ม.2', short: 'ม.2' },
  { value: 'm3', label: 'ม.3', short: 'ม.3' },
  { value: 'future_skill', label: 'Life Future Skill', short: 'Future' },
]

export type UserRole = 'student' | 'teacher' | 'admin' | 'parent'

export interface AppUser {
  id: string
  email: string
  role: UserRole
  profile?: Student | Teacher
}
