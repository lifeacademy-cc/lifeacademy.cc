import Link from 'next/link'
import { ArrowRight, Users, Clock } from 'lucide-react'
import { cn, getSubjectColor, getSubjectLabel, getLevelLabel, formatPrice } from '@/lib/utils/format'
import type { Course } from '@/types'

// Demo courses (Phase 1 — before Supabase is wired up)
const demoCourses: Course[] = [
  {
    id: '1', name: 'คณิตศาสตร์ ม.ต้น (เน้นสอบ)', name_th: 'คณิตศาสตร์ ม.ต้น',
    level: 'secondary', subject: 'math', format: 'onsite',
    price: 1800, description: 'เตรียมสอบ O-NET และสอบเข้า ม.4 ด้วยโจทย์จริงและเทคนิคการทำข้อสอบ',
    max_students: 8, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 6,
  },
  {
    id: '2', name: 'ภาษาอังกฤษสื่อสาร + Grammar', name_th: 'อังกฤษ ม.ต้น-ปลาย',
    level: 'high', subject: 'english', format: 'onsite',
    price: 1800, description: 'เรียนการสื่อสารจริง + Grammar แบบเข้าใจลึก ไม่ท่องจำ เน้นนำไปใช้ได้',
    max_students: 10, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 7,
  },
  {
    id: '3', name: 'ฟิสิกส์เข้มข้น ม.ปลาย', name_th: 'ฟิสิกส์ ม.4–6',
    level: 'high', subject: 'physics', format: 'onsite',
    price: 2200, description: 'ฟิสิกส์ ม.4–6 เน้น TCAS/PAT2 เข้าใจหลักการ ทำโจทย์ได้ทุกรูปแบบ',
    max_students: 8, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 5,
  },
  {
    id: '4', name: 'คณิต ป.4–6 (พื้นฐานแข็งแกร่ง)', name_th: 'คณิต ประถมปลาย',
    level: 'primary', subject: 'math', format: 'onsite',
    price: 1500, description: 'เสริมพื้นฐานคณิตศาสตร์ สร้างความเข้าใจที่มั่นคง ก่อนก้าวสู่ ม.ต้น',
    max_students: 10, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 9,
  },
  {
    id: '5', name: 'เคมี + ชีววิทยา แพทย์/พยาบาล', name_th: 'วิทย์ สายแพทย์',
    level: 'exam', subject: 'chemistry', format: 'onsite',
    price: 2400, description: 'เตรียมสอบสายแพทย์-พยาบาล เน้น PAT2 และ BMAT เจาะลึกทุกบท',
    max_students: 6, sessions_per_week: 3, is_active: true, created_at: '',
    enrolled_count: 5,
  },
  {
    id: '6', name: 'เรียนออนไลน์ — คณิต ทุกระดับ', name_th: 'คณิต Online',
    level: 'secondary', subject: 'math', format: 'online',
    price: 1600, description: 'เรียนออนไลน์สด ตั้งแต่ ม.1–6 ครูสอนตัวต่อตัวผ่าน Zoom สะดวกทุกที่',
    max_students: 5, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 3,
  },
]

const formatMap: Record<string, { label: string; color: string }> = {
  onsite: { label: 'ที่สถาบัน', color: 'bg-blue-100 text-blue-700' },
  online: { label: 'ออนไลน์',  color: 'bg-green-100 text-green-700' },
  private:{ label: 'ส่วนตัว',  color: 'bg-purple-100 text-purple-700' },
}

function CourseCard({ course }: { course: Course }) {
  const fmt   = formatMap[course.format] ?? formatMap.onsite
  const seats = course.max_students - (course.enrolled_count ?? 0)

  return (
    <div className="card-hover group flex flex-col">
      {/* Header bar */}
      <div className="h-2 rounded-t-xl -mt-6 -mx-6 mb-4 bg-gradient-to-r from-[#0f2557] to-[#1a56db]" />

      {/* Subject & format badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={cn('badge', getSubjectColor(course.subject))}>
          {getSubjectLabel(course.subject)}
        </span>
        <span className={cn('badge', fmt.color)}>{fmt.label}</span>
        <span className="badge bg-gray-100 text-gray-600">{getLevelLabel(course.level)}</span>
      </div>

      {/* Title */}
      <h3 className="font-ui font-bold text-[#0f2557] mb-2 text-sm leading-snug group-hover:text-[#1a56db] transition-colors">
        {course.name}
      </h3>

      {/* Description */}
      <p className="font-thai text-[#64748b] text-xs leading-relaxed flex-1 mb-4">
        {course.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-[#64748b] font-ui mb-4">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {course.sessions_per_week}x/สัปดาห์
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span className={seats <= 2 ? 'text-red-500 font-semibold' : ''}>
            {seats <= 0 ? 'เต็ม' : `ว่าง ${seats} ที่`}
          </span>
        </span>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
        <div>
          <span className="font-ui font-bold text-[#0f2557] text-base">
            {formatPrice(course.price)}
          </span>
          <span className="text-[#64748b] text-xs font-thai">/เดือน</span>
        </div>
        <Link
          href={`/contact?course=${course.id}`}
          className="text-xs font-semibold font-ui text-[#1a56db] hover:text-[#0f2557] flex items-center gap-1 transition-colors"
        >
          สอบถาม <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

export default function CoursesPreview() {
  return (
    <section className="section bg-[#f0f4ff]" id="courses">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag">หลักสูตรของเรา</span>
            <h2 className="section-title mt-2">เลือกเรียนตามระดับของคุณ</h2>
            <p className="section-subtitle">
              30+ หลักสูตร ครอบคลุมทุกวิชาหลัก ทุกระดับชั้น
            </p>
          </div>
          <Link href="/courses" className="btn-outline shrink-0">
            ดูทั้งหมด <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#0f2557] to-[#1a3680] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-white text-2xl mb-2">ไม่แน่ใจว่าต้องเรียนคอร์สไหน?</h3>
            <p className="font-thai text-white/70 text-sm">ทดสอบระดับฟรีกับครูผู้เชี่ยวชาญ ใช้เวลาเพียง 30 นาที</p>
          </div>
          <Link href="/level-test" className="btn-gold shrink-0 text-sm px-8 py-3.5">
            ทดสอบระดับฟรี ✨
          </Link>
        </div>
      </div>
    </section>
  )
}
