import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  Users, BookOpen, TrendingUp, MessageSquare,
  ArrowUpRight, Clock, CheckCircle2, Plus, Calendar, Settings
} from 'lucide-react'
import Link from 'next/link'
import YoutubeSettingForm from '@/components/admin/YoutubeSettingForm'

export const metadata = { title: 'Dashboard — Admin Panel' }

const mockStats = {
  totalStudents:    127,
  activeStudents:   98,
  newInquiries:     12,
  monthlyRevenue:   186000,
  attendanceRate:   92,
  upcomingLessons:  18,
}

const mockInquiries = [
  { id: '1', name: 'น้องมิน', phone: '081-234-5678', subject: 'คณิต',  level: 'ม.ปลาย', status: 'new',       createdAt: '10 นาทีที่แล้ว' },
  { id: '2', name: 'น้องบอล', phone: '089-876-5432', subject: 'อังกฤษ', level: 'ม.ต้น',  status: 'contacted', createdAt: '2 ชั่วโมงที่แล้ว' },
  { id: '3', name: 'น้องจูน', phone: '062-111-2222', subject: 'ฟิสิกส์', level: 'ม.ปลาย', status: 'new',       createdAt: '3 ชั่วโมงที่แล้ว' },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  new:       { label: 'ใหม่',        color: 'bg-[#1a56db]/10 text-[#1a56db]' },
  contacted: { label: 'ติดต่อแล้ว',  color: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
  enrolled:  { label: 'สมัครแล้ว',   color: 'bg-[#059669]/10 text-[#059669]' },
  closed:    { label: 'ปิดแล้ว',     color: 'bg-slate-100 text-slate-500' },
}

export default async function AdminDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  let youtubeUrl = 'https://www.youtube.com/watch?v=ScMzIvxBSi4'
  try {
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'youtube_video_url')
      .single()
    if (data?.value) {
      youtubeUrl = data.value
    }
  } catch (e) {
    // Fallback
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-slate-900 text-2xl">Overview Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <p className="font-thai text-slate-500 text-sm">
              {new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/articles/new" className="btn-outline py-2 px-4 text-xs font-semibold">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> New Article
          </Link>
          <Link href="/admin/students/new" className="btn-primary py-2 px-4 text-xs font-semibold">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Student
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'นักเรียนทั้งหมด',  value: mockStats.totalStudents,                  icon: Users,          color: 'text-[#1a56db]', bg: 'bg-[#1a56db]/10' },
          { label: 'Active',           value: mockStats.activeStudents,                  icon: CheckCircle2,   color: 'text-[#059669]', bg: 'bg-[#059669]/10' },
          { label: 'สอบถามใหม่',       value: mockStats.newInquiries,                    icon: MessageSquare,  color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' },
          { label: 'รายได้เดือนนี้',   value: `฿${mockStats.monthlyRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-[#7c3aed]', bg: 'bg-[#7c3aed]/10' },
          { label: 'เข้าเรียน',        value: `${mockStats.attendanceRate}%`,            icon: CheckCircle2,   color: 'text-[#059669]', bg: 'bg-[#059669]/10' },
          { label: 'คาบวันนี้',        value: mockStats.upcomingLessons,                 icon: Clock,          color: 'text-[#0891b2]', bg: 'bg-[#0891b2]/10' },
        ].map(stat => (
          <div key={stat.label} className="card border-slate-200/60 flex flex-col gap-2 group hover:border-[#1a56db]/30 transition-all hover:shadow-md">
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className={`font-ui font-black text-2xl ${stat.color}`}>{stat.value}</div>
            <div className="font-thai text-slate-500 text-xs font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* New inquiries */}
        <div className="lg:col-span-2 card border-slate-200/60 p-0 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <div>
              <h2 className="font-ui font-bold text-slate-900">Recent Inquiries</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-ui mt-0.5">Latest 5 messages</p>
            </div>
            <Link href="/admin/students?tab=inquiries"
              className="flex items-center gap-1.5 text-[#1a56db] text-xs font-ui font-bold hover:text-[#0f2557] transition-colors"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/30">
                  {['ชื่อ', 'เบอร์โทร', 'วิชา / ระดับ', 'สถานะ', ''].map(h => (
                    <th key={h} className="py-3 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockInquiries.map(inq => {
                  const s = statusConfig[inq.status] ?? statusConfig.new
                  return (
                    <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-thai font-bold text-slate-900 text-sm group-hover:text-[#1a56db] transition-colors">{inq.name}</div>
                        <div className="font-ui text-slate-400 text-[10px] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {inq.createdAt}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-ui text-slate-600 text-sm font-medium">{inq.phone}</td>
                      <td className="py-4 px-6">
                        <div className="font-thai text-slate-800 text-xs font-semibold">{inq.subject}</div>
                        <div className="font-thai text-slate-400 text-[10px]">{inq.level}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`badge ${s.color} text-[10px] px-2 py-0.5 font-bold`}>{s.label}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a href={`tel:${inq.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-ui font-bold hover:bg-[#1a56db] hover:text-white transition-all shadow-sm"
                        >
                          📞 Call
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick sidebar */}
        <div className="space-y-6">
          {/* YouTube Video Setting Form */}
          <YoutubeSettingForm initialUrl={youtubeUrl} />

          <div className="card border-slate-200/60 shadow-sm">
            <h2 className="font-ui font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#1a56db]" /> Quick Links
            </h2>
            <div className="space-y-1.5">
              {[
                { href: '/admin/students/new',    label: 'เพิ่มนักเรียนใหม่',   icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                { href: '/admin/courses',         label: 'จัดการหลักสูตร',       icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { href: '/admin/reports',         label: 'สรุปรายได้ประจำเดือน', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
                { href: '/admin/articles/new',    label: 'เขียนบทความใหม่',      icon: Plus, color: 'text-amber-500', bg: 'bg-amber-50' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                >
                  <div className={`w-8 h-8 rounded-lg ${l.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <l.icon className={`w-4 h-4 ${l.color}`} />
                  </div>
                  <span className="font-thai text-slate-700 text-sm font-medium">{l.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-[#1a56db] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f2557] to-[#1a56db] p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="font-ui font-black text-xs uppercase tracking-widest text-white/50 mb-2">Pending Task</div>
              <div className="font-display font-bold text-lg mb-1">📢 ค่าเรียนค้างชำระ</div>
              <div className="font-thai text-white/70 text-sm leading-relaxed">
                มีนักเรียน <span className="text-[#f59e0b] font-bold">3 คน</span> ยังไม่ได้ชำระค่าเรียนเดือนมิถุนายน
              </div>
              <Link href="/admin/reports?tab=payment"
                className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-ui font-black text-[#f59e0b] hover:text-white transition-colors uppercase tracking-widest"
              >
                View Details <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
