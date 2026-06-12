import { createClient } from '@/lib/supabase/server'
import CourseListInteractive from '@/components/courses/CourseListInteractive'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import type { Course } from '@/types'

export const metadata: Metadata = {
  title: 'หลักสูตรทั้งหมด — LIFE Academy',
  description: 'ค้นหาหลักสูตรติวเตอร์ที่ดีที่สุดสำหรับบุตรหลานของคุณ ทั้งวิชาคณิตศาสตร์ ภาษาอังกฤษ วิทยาศาสตร์ และวิชาเฉพาะทางต่างๆ ทั้งรูปแบบสถาบันและออนไลน์',
}

const mockCourses: Course[] = [
  // ประถมศึกษา
  { id: 'p_read_write', name: 'คอร์ส “อ่านออกเขียนได้”', level: 'p1', subject: 'thai', format: 'onsite', price: 1500, max_students: 8, sessions_per_week: 2, enrolled_count: 3, description: 'สำหรับนักเรียนชั้น อนุบาล 3 - ป.1 ที่สะกดคำยังไม่เป็น หรือยังอ่านไม่ออกเขียนไม่ได้และอ่านหนังสือไม่คล่อง', is_active: true, created_at: '' },
  { id: 'p_math_1_3', name: 'คณิตศาสตร์ ประถม 1–3 (ปูพื้นฐาน)', level: 'p3', subject: 'math', format: 'onsite', price: 1500, max_students: 10, sessions_per_week: 2, enrolled_count: 5, description: 'เน้นปูพื้นฐานคณิตศาสตร์และพัฒนาทักษะการคิดคำนวณเบื้องต้นอย่างเป็นระบบ', is_active: true, created_at: '' },
  { id: 'p_eng_1_3', name: 'ภาษาอังกฤษ ประถม 1–3 (Fun with English)', level: 'p3', subject: 'english', format: 'onsite', price: 1500, max_students: 10, sessions_per_week: 2, enrolled_count: 4, description: 'เรียนรู้ภาษาอังกฤษผ่านกิจกรรมแสนสนุก สร้างความคุ้นเคยกับสำเนียงธรรมชาติและคำศัพท์รอบตัว', is_active: true, created_at: '' },
  { id: 'p_math_4_6', name: 'คณิตศาสตร์ ประถม 4–6 (พื้นฐานแข็งแกร่ง)', level: 'p6', subject: 'math', format: 'onsite', price: 1500, max_students: 10, sessions_per_week: 2, enrolled_count: 7, description: 'เสริมพื้นฐานคณิตศาสตร์ สร้างความเข้าใจที่มั่นคงในโจทย์ปัญหาและสมการ ปูทางสู่ ม.ต้น', is_active: true, created_at: '' },
  { id: 'p_eng_4_6', name: 'ภาษาอังกฤษ ประถม 4–6 (Grammar & Communication)', level: 'p6', subject: 'english', format: 'onsite', price: 1500, max_students: 10, sessions_per_week: 2, enrolled_count: 6, description: 'เน้นโครงสร้างไวยากรณ์พื้นฐาน คำศัพท์ และฝึกการสนทนาโต้ตอบอย่างมั่นใจ', is_active: true, created_at: '' },
  { id: 'p_sci_4_6', name: 'วิทยาศาสตร์ ประถม 4–6 (กระบวนการคิด)', level: 'p6', subject: 'science', format: 'onsite', price: 1500, max_students: 10, sessions_per_week: 2, enrolled_count: 5, description: 'เน้นกระบวนการทางวิทยาศาสตร์ การทดลอง และเนื้อหาชีววิทยา เคมี ฟิสิกส์พื้นฐาน', is_active: true, created_at: '' },
  { id: 'p_exam_m1', name: 'คอร์สประถมเตรียมสอบเข้า ม.1 (คณิต-วิทย์-อังกฤษ)', level: 'p6', subject: 'math', format: 'onsite', price: 1800, max_students: 8, sessions_per_week: 2, enrolled_count: 4, description: 'ติวเข้มและตะลุยโจทย์ 3 วิชาหลักเพื่อสอบเข้า ม.1 โรงเรียนดังระดับจังหวัด', is_active: true, created_at: '' },
  // มัธยมศึกษาตอนต้น (เตรียมสอบเข้า ม.4)
  { id: 's_math_m4', name: 'คณิตศาสตร์ ม.ต้น (เตรียมสอบเข้า ม.4)', level: 'm3', subject: 'math', format: 'onsite', price: 1800, max_students: 8, sessions_per_week: 2, enrolled_count: 5, description: 'เตรียมสอบเข้า ม.4 โรงเรียนชั้นนำ ตะลุยโจทย์จริงและเทคนิคพิเศษคณิตศาสตร์ ม.1-3', is_active: true, created_at: '' },
  { id: 's_sci_m4', name: 'วิทยาศาสตร์ ม.ต้น (เตรียมสอบเข้า ม.4)', level: 'm3', subject: 'science', format: 'onsite', price: 1800, max_students: 8, sessions_per_week: 2, enrolled_count: 6, description: 'สรุปวิชาวิทยาศาสตร์ (ฟิสิกส์ เคมี ชีววิทยา ดาราศาสตร์) พร้อมข้อสอบเก่าเข้า ม.4', is_active: true, created_at: '' },
  { id: 's_eng_m4', name: 'ภาษาอังกฤษ ม.ต้น (เตรียมสอบเข้า ม.4)', level: 'm3', subject: 'english', format: 'onsite', price: 1800, max_students: 8, sessions_per_week: 2, enrolled_count: 4, description: 'เจาะลึก Grammar ศัพท์ระดับสูง และแนวข้อสอบ Reading & Conversation สำหรับสอบเข้า ม.4', is_active: true, created_at: '' },
  { id: 'fs_mind_brain', name: 'Mind & Brain Booster', level: 'future_skill', subject: 'mind', format: 'onsite', price: 1500, max_students: 8, sessions_per_week: 2, enrolled_count: 2, description: 'ฝึกสติและสมาธิเบื้องต้นผ่านกิจกรรมแสนสนุก ช่วยแก้ภาวะใจลอย สมาธิสั้น เพิ่มโฟกัสในการเรียนและการใช้ชีวิต (ทดลองเรียนฟรี!)', is_active: true, created_at: '' },
]

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; subject?: string; format?: string; q?: string }>
}) {
  const resolvedSearchParams = await searchParams
  let courses: Course[] = []

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true })

    if (error || !data || data.length === 0) {
      courses = mockCourses
    } else {
      courses = data as Course[]
    }
  } catch (e) {
    // Graceful fallback to mock data when database is offline or not configured
    courses = mockCourses
  }

  // Map incoming subject parameter if custom mapped
  const defaultLevel = resolvedSearchParams.level || 'all'
  const defaultSubject = resolvedSearchParams.subject || ''
  const defaultSearch = resolvedSearchParams.q || ''

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-16 px-4 relative overflow-hidden">
        {/* Glowing visual decorations */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#f59e0b]/10 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase mb-4 border border-white/10">
            LIFE Academy Courses
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            หลักสูตรทั้งหมดของเรา
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            เลือกเรียนได้ตามใจชอบ ครอบคลุมวิชาหลัก ทุกระดับชั้น ทั้งสถาบัน (Onsite) และสดทางออนไลน์ (Online)
          </p>
        </div>
      </section>

      {/* 2. Interactive Catalog List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <CourseListInteractive 
            initialCourses={courses} 
            defaultLevel={defaultLevel}
            defaultSubject={defaultSubject}
            defaultSearchQuery={defaultSearch}
          />
        </div>
      </section>

      {/* 3. Bottom Banner CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-border/40">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="font-display font-extrabold text-[#0f2557] text-2xl">
            ไม่พบหลักสูตรที่กำลังค้นหาอยู่ใช่หรือไม่?
          </h2>
          <p className="font-thai text-text-muted text-sm leading-relaxed max-w-xl mx-auto">
            LIFE Academy สามารถออกแบบหลักสูตรและการเรียนการสอนแบบเฉพาะบุคคล (Personalized Course) เพื่อเป้าหมายเฉพาะของนักเรียนแต่ละคนได้เช่นกัน
          </p>
          <div className="pt-2">
            <Link 
              href="/contact" 
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm"
            >
              ปรึกษาแนวทางการเรียนฟรี <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
