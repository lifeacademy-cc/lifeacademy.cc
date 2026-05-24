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
  // ประถม
  { id: 'p1', name: 'คณิต ป.4–6 (พื้นฐานแข็งแกร่ง)',    level: 'primary',   subject: 'math',      format: 'onsite', price: 1500, max_students: 10, sessions_per_week: 2, enrolled_count: 9, description: 'เสริมพื้นฐานคณิตศาสตร์ สร้างความเข้าใจที่มั่นคง ก่อนก้าวสู่ ม.ต้น', is_active: true, created_at: '' },
  { id: 'p2', name: 'ภาษาไทย ป.1–6 (อ่านออก เขียนได้)', level: 'primary',   subject: 'thai',      format: 'onsite', price: 1500, max_students: 10, sessions_per_week: 2, enrolled_count: 7, description: 'เสริมทักษะการอ่าน การเขียนไวยากรณ์ และการสื่อสารภาษาไทยอย่างมั่นใจ', is_active: true, created_at: '' },
  { id: 'p3', name: 'อังกฤษ ป.1–6 (Fun with English)',   level: 'primary',   subject: 'english',   format: 'onsite', price: 1500, max_students: 10, sessions_per_week: 2, enrolled_count: 8, description: 'เรียนภาษาอังกฤษผ่านกิจกรรม สนุกสนานและซึมซับสำเนียงธรรมชาติ', is_active: true, created_at: '' },
  // มัธยมต้น
  { id: 's1', name: 'คณิตศาสตร์ ม.ต้น (เน้นสอบ)',        level: 'secondary', subject: 'math',      format: 'onsite', price: 1800, max_students: 8,  sessions_per_week: 2, enrolled_count: 6, description: 'เตรียมสอบ O-NET และสอบเข้า ม.4 โรงเรียนดังด้วยโจทย์จริงและเทคนิคพิเศษ', is_active: true, created_at: '' },
  { id: 's2', name: 'วิทยาศาสตร์ ม.ต้น (ครบทุกบท)',      level: 'secondary', subject: 'science',   format: 'onsite', price: 1800, max_students: 8,  sessions_per_week: 2, enrolled_count: 5, description: 'เน้นวิชาวิทยาศาสตร์ทั่วไป ฟิสิกส์ เคมี ชีววิทยา ตามหลักสูตรพื้นฐาน ม.1–3', is_active: true, created_at: '' },
  { id: 's3', name: 'อังกฤษ ม.ต้น (Grammar + สื่อสาร)', level: 'secondary', subject: 'english',   format: 'onsite', price: 1800, max_students: 10, sessions_per_week: 2, enrolled_count: 7, description: 'โครงสร้างไวยากรณ์แน่นปึก พร้อมทักษะการฟังพูดเพื่อนำไปใช้ในการเรียนและสอบ', is_active: true, created_at: '' },
  // มัธยมปลาย
  { id: 'h1', name: 'ฟิสิกส์เข้มข้น ม.ปลาย',            level: 'high',      subject: 'physics',   format: 'onsite', price: 2200, max_students: 8,  sessions_per_week: 2, enrolled_count: 5, description: 'เจาะลึกฟิสิกส์ ม.4–6 เน้นสอบ TCAS/A-Level และวิชาสามัญ พร้อมโจทย์ยากระดับแนวหน้า', is_active: true, created_at: '' },
  { id: 'h2', name: 'เคมี ม.ปลาย (สำหรับสายวิทย์)',     level: 'high',      subject: 'chemistry', format: 'onsite', price: 2200, max_students: 8,  sessions_per_week: 2, enrolled_count: 4, description: 'เคมีอินทรีย์ ปฏิกิริยาเคมี อะตอมและตารางธาตุ เจาะลึกเพื่อเตรียมสอบแข่งขัน', is_active: true, created_at: '' },
  { id: 'h3', name: 'คณิต ม.ปลาย + PAT1',               level: 'high',      subject: 'math',      format: 'onsite', price: 2000, max_students: 8,  sessions_per_week: 2, enrolled_count: 6, description: 'คณิตศาสตร์ ม.4–6 และแนวข้อสอบเข้ามหาวิทยาลัยชั้นนำอย่างละเอียด', is_active: true, created_at: '' },
  { id: 'h4', name: 'ชีววิทยา ม.ปลาย (สายแพทย์)',       level: 'high',      subject: 'biology',   format: 'onsite', price: 2200, max_students: 8,  sessions_per_week: 2, enrolled_count: 3, description: 'ชีววิทยา ม.4–6 เนื้อหาเข้มข้นเน้นความเข้าใจโครงสร้างพืชและสัตว์', is_active: true, created_at: '' },
  // เตรียมสอบ
  { id: 'e1', name: 'เคมี + ชีวฯ แพทย์/พยาบาล TCAS',   level: 'exam',      subject: 'chemistry', format: 'onsite', price: 2400, max_students: 6,  sessions_per_week: 3, enrolled_count: 5, description: 'เตรียมสอบสายวิทยาศาสตร์สุขภาพ แพทย์-พยาบาล เน้นตะลุยโจทย์ BMAT และ A-Level', is_active: true, created_at: '' },
  { id: 'e2', name: 'คณิต TCAS (A-Level/วิชาสามัญ)',    level: 'exam',      subject: 'math',      format: 'onsite', price: 2400, max_students: 8,  sessions_per_week: 3, enrolled_count: 6, description: 'เตรียมตัวสอบ A-Level คณิตศาสตร์ และวิชาสามัญ ตะลุยโจทย์ย้อนหลัง 10 ปี', is_active: true, created_at: '' },
  { id: 'e3', name: 'ภาษาอังกฤษ TCAS (A-Level)',       level: 'exam',      subject: 'english',   format: 'onsite', price: 2400, max_students: 8,  sessions_per_week: 3, enrolled_count: 5, description: 'GAT English Reading, Writing, Speaking + วิชาสามัญภาษาอังกฤษระดับเข้มข้น', is_active: true, created_at: '' },
  // Online
  { id: 'o1', name: 'คณิต Online (ทุกระดับ)',           level: 'secondary', subject: 'math',      format: 'online', price: 1600, max_students: 5,  sessions_per_week: 2, enrolled_count: 3, description: 'เรียนออนไลน์สด ม.1–6 ครูสอนตัวต่อตัวผ่าน Zoom ตอบคำถามสดทันใจ สะดวกทุกที่', is_active: true, created_at: '' },
  { id: 'o2', name: 'อังกฤษ Online (ทุกระดับ)',         level: 'secondary', subject: 'english',   format: 'online', price: 1600, max_students: 5,  sessions_per_week: 2, enrolled_count: 2, description: 'เรียนภาษาอังกฤษออนไลน์ ครูสอนสด โต้ตอบทันที ได้บรรยากาศเหมือนห้องเรียนจริง', is_active: true, created_at: '' },
]

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { level?: string; subject?: string; format?: string }
}) {
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
  const defaultLevel = searchParams.level || 'all'
  const defaultSubject = searchParams.subject || ''

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
