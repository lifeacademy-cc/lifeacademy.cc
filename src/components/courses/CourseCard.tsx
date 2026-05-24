'use client'

import Link from 'next/link'
import { ArrowRight, Users, Clock } from 'lucide-react'
import { cn, getSubjectColor, getSubjectLabel, getLevelLabel, formatPrice } from '@/lib/utils/format'
import type { Course } from '@/types'

const formatMap: Record<string, { label: string; color: string }> = {
  onsite: { label: '🏫 ที่สถาบัน', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  online: { label: '💻 ออนไลน์',  color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  private: { label: '👤 ส่วนตัว',  color: 'bg-purple-50 text-purple-700 border-purple-200' },
}

export default function CourseCard({ course }: { course: Course }) {
  const fmt = formatMap[course.format] ?? formatMap.onsite
  const enrolled = course.enrolled_count ?? 0
  const seats = course.max_students - enrolled

  return (
    <div className="card-hover flex flex-col group h-full border border-border/40 relative">
      {/* Decorative header gradient */}
      <div className="h-1.5 rounded-t-xl -mt-6 -mx-6 mb-4 bg-gradient-to-r from-[#1a56db] via-[#0f2557] to-[#f59e0b]" />

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={cn('badge text-xs px-2.5 py-0.5 border border-transparent font-medium', getSubjectColor(course.subject))}>
          {getSubjectLabel(course.subject)}
        </span>
        <span className={cn('badge text-xs px-2.5 py-0.5 border font-medium', fmt.color)}>
          {fmt.label}
        </span>
        <span className="badge text-xs px-2.5 py-0.5 border border-border bg-slate-50 text-slate-600 font-medium">
          {getLevelLabel(course.level)}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-ui font-bold text-[#0f2557] text-base leading-snug mb-2 group-hover:text-[#1a56db] transition-colors">
        {course.name}
      </h3>

      {/* Description */}
      <p className="font-thai text-text-muted text-xs leading-relaxed flex-1 mb-4">
        {course.description ?? 'ไม่มีรายละเอียดหลักสูตร'}
      </p>

      {/* Course Stats */}
      <div className="flex items-center gap-4 text-xs text-text-muted font-ui mb-4">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-navy/40" /> {course.sessions_per_week} คาบ/สัปดาห์
        </span>
        <span className={cn('flex items-center gap-1.5 font-semibold', 
          seats <= 0 ? 'text-red-500' : seats <= 2 ? 'text-amber-600' : 'text-slate-600'
        )}>
          <Users className="w-3.5 h-3.5" /> 
          {seats <= 0 ? '❌ เต็มแล้ว' : seats <= 2 ? `⚠️ เหลือ ${seats} ที่สุดท้าย` : `ว่าง ${seats} ที่`}
        </span>
      </div>

      {/* Price + Button */}
      <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-auto">
        <div>
          <span className="font-ui font-extrabold text-[#0f2557] text-lg">
            {formatPrice(course.price)}
          </span>
          <span className="text-text-muted text-xs font-thai font-normal"> /เดือน</span>
        </div>
        <Link 
          href={`/contact?course=${course.id}`}
          className="inline-flex items-center gap-1 text-xs font-ui font-bold text-[#1a56db] hover:text-[#0f2557] transition-all hover:translate-x-1"
        >
          เริ่มเรียน <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
