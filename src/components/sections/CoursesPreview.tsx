import Link from 'next/link'
import { ArrowRight, Users, Clock } from 'lucide-react'
import { cn, getSubjectColor, getSubjectLabel, getLevelLabel, formatPrice } from '@/lib/utils/format'
import type { Course } from '@/types'

// Demo courses (Phase 1 — before Supabase is wired up)
const demoCourses: Course[] = [
  {
    id: 'p_read_write', name: 'คอร์ส “อ่านออกเขียนได้”', name_th: 'อ่านออกเขียนได้',
    level: 'primary', subject: 'thai', format: 'onsite',
    price: 1500, description: 'สำหรับนักเรียนชั้น อนุบาล 3 - ป.1 ที่สะกดคำยังไม่เป็น หรือยังอ่านไม่ออกเขียนไม่ได้และอ่านหนังสือไม่คล่อง',
    max_students: 8, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 3,
  },
  {
    id: 'fs_mind_brain', name: 'Mind & Brain Booster', name_th: 'พัฒนาสมาธิและโฟกัส',
    level: 'future_skill', subject: 'mind', format: 'onsite',
    price: 1500, description: 'ฝึกสติและสมาธิเบื้องต้นผ่านกิจกรรมแสนสนุก ช่วยแก้ภาวะใจลอย สมาธิสั้น เพิ่มโฟกัสในการเรียนและการใช้ชีวิต (ทดลองเรียนฟรี!)',
    max_students: 8, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 2,
  },
  {
    id: 'p_math_4_6', name: 'คณิตศาสตร์ ประถม 4–6 (พื้นฐานแข็งแกร่ง)', name_th: 'คณิต ประถมปลาย',
    level: 'primary', subject: 'math', format: 'onsite',
    price: 1500, description: 'เสริมพื้นฐานคณิตศาสตร์ สร้างความเข้าใจที่มั่นคงในโจทย์ปัญหาและสมการ ปูทางสู่ ม.ต้น',
    max_students: 10, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 7,
  },
  {
    id: 'p_exam_m1', name: 'คอร์สประถมเตรียมสอบเข้า ม.1 (คณิต-วิทย์-อังกฤษ)', name_th: 'เตรียมสอบเข้า ม.1',
    level: 'primary', subject: 'math', format: 'onsite',
    price: 1800, description: 'ติวเข้มและตะลุยโจทย์ 3 วิชาหลักเพื่อสอบเข้า ม.1 โรงเรียนดังระดับจังหวัด',
    max_students: 8, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 4,
  },
  {
    id: 's_math_m4', name: 'คณิตศาสตร์ ม.ต้น (เตรียมสอบเข้า ม.4)', name_th: 'คณิต เตรียมสอบ ม.4',
    level: 'secondary', subject: 'math', format: 'onsite',
    price: 1800, description: 'เตรียมสอบเข้า ม.4 โรงเรียนชั้นนำ ตะลุยโจทย์จริงและเทคนิคพิเศษคณิตศาสตร์ ม.1-3',
    max_students: 8, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 5,
  },
  {
    id: 's_sci_m4', name: 'วิทยาศาสตร์ ม.ต้น (เตรียมสอบเข้า ม.4)', name_th: 'วิทย์ เตรียมสอบ ม.4',
    level: 'secondary', subject: 'science', format: 'onsite',
    price: 1800, description: 'สรุปวิชาวิทยาศาสตร์ (ฟิสิกส์ เคมี ชีววิทยา ดาราศาสตร์) พร้อมข้อสอบเก่าเข้า ม.4',
    max_students: 8, sessions_per_week: 2, is_active: true, created_at: '',
    enrolled_count: 6,
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
