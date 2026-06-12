import { createClient } from '@/lib/supabase/server'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  BookOpen, 
  CheckCircle2, 
  XCircle,
  Users,
  Video
} from 'lucide-react'
import Link from 'next/link'
import { cn, formatPrice, getSubjectLabel, getLevelLabel } from '@/lib/utils/format'

export const metadata = { title: 'Manage Courses — Admin Panel' }

const formatConfig: Record<string, { label: string; color: string }> = {
  onsite:    { label: 'สถาบัน', color: 'bg-blue-100 text-blue-700' },
  online:    { label: 'ออนไลน์สด', color: 'bg-emerald-100 text-emerald-700' },
  private:   { label: 'ส่วนตัว', color: 'bg-purple-100 text-purple-700' },
  elearning: { label: 'E-Learning', color: 'bg-amber-100 text-amber-700' },
}

export default async function AdminCoursesPage() {
  const supabase = createClient()
  
  // Fetch courses
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 animate-fade-in">
      <AdminPageHeader 
        title="Courses Management" 
        description="จัดการหลักสูตรการเรียนการสอนทั้งหมด ทั้งแบบปกติและออนไลน์"
        action={{ label: 'Add New Course', href: '/admin/courses/new' }}
      />

      {/* Filters & Search */}
      <div className="card mb-6 border-slate-200/60 shadow-sm py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1a56db]/20 transition-all font-thai"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-thai text-slate-600 focus:ring-2 focus:ring-[#1a56db]/20 transition-all outline-none">
            <option value="">ทุกระดับชั้น</option>
            <option value="primary">ประถมศึกษา</option>
            <option value="secondary">มัธยมต้น</option>
            <option value="high">มัธยมปลาย</option>
            <option value="exam">เตรียมสอบ</option>
            <option value="future_skill">Life Future Skill</option>
          </select>
          <select className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-thai text-slate-600 focus:ring-2 focus:ring-[#1a56db]/20 transition-all outline-none">
            <option value="">ทุกรูปแบบ</option>
            <option value="onsite">สถาบัน</option>
            <option value="online">ออนไลน์สด</option>
            <option value="elearning">E-Learning</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="card border-slate-200/60 p-0 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Course Name
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Subject / Level
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Format
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Price
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Status
                </th>
                <th className="py-4 px-6 text-right text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses && courses.length > 0 ? courses.map((course) => {
                const fmt = formatConfig[course.format] || formatConfig.onsite
                return (
                  <tr key={course.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="font-thai font-bold text-slate-900 text-sm group-hover:text-[#1a56db] transition-colors">
                        {course.name}
                      </div>
                      <div className="font-ui text-slate-400 text-[10px] flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Max {course.max_students}</span>
                        {course.format === 'elearning' && (
                          <Link href={`/admin/videos?courseId=${course.id}`} className="flex items-center gap-1 text-[#1a56db] hover:underline">
                            <Video className="w-3 h-3" /> Manage Videos
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-thai text-slate-700 text-xs font-semibold">{getSubjectLabel(course.subject)}</div>
                      <div className="font-thai text-slate-400 text-[10px]">{getLevelLabel(course.level)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn("badge text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider", fmt.color)}>
                        {fmt.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-ui text-slate-900 font-bold text-sm">
                      {formatPrice(course.price)}
                    </td>
                    <td className="py-4 px-6">
                      {course.is_active ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-ui text-[10px] font-bold uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400 font-ui text-[10px] font-bold uppercase tracking-widest">
                          <XCircle className="w-3 h-3" /> Inactive
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/courses/edit/${course.id}`}
                          className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-ui font-bold text-slate-400">No courses found</p>
                        <Link href="/admin/courses/new" className="text-[#1a56db] text-xs font-bold hover:underline">
                          Create your first course
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
