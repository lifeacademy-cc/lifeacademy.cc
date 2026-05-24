import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  Users, BookOpen, TrendingUp, MessageSquare,
  ArrowUpRight, Clock, CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Admin Dashboard — LIFE Academy' }

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
  closed:    { label: 'ปิดแล้ว',     color: 'bg-gray-100 text-gray-500' },
}

export default async function AdminDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // In production: check admin role
  // const role = user.user_metadata?.role
  // if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-[#f0f4ff]">

      {/* Admin header */}
      <header className="bg-[#0f2557] text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg">LIFE Academy</span>
            <span className="badge bg-white/20 text-white font-ui text-xs">Admin Panel</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/admin/dashboard', label: 'Overview' },
              { href: '/admin/students',  label: 'นักเรียน' },
              { href: '/admin/courses',   label: 'หลักสูตร' },
              { href: '/admin/reports',   label: 'รายงาน' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-sm font-ui transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="font-thai text-white/70 text-sm hidden sm:block">สวัสดี, Admin</span>
            <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex items-center justify-center text-[#0f2557] font-bold text-xs">A</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Page title */}
        <div>
          <h1 className="font-display font-bold text-[#0f2557] text-2xl">ภาพรวมวันนี้</h1>
          <p className="font-thai text-[#64748b] text-sm mt-1">
            {new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'นักเรียนทั้งหมด',  value: mockStats.totalStudents,                  icon: Users,          color: 'text-[#1a56db]', bg: 'bg-[#1a56db]/10' },
            { label: 'Active',           value: mockStats.activeStudents,                  icon: CheckCircle2,   color: 'text-[#059669]', bg: 'bg-[#059669]/10' },
            { label: 'สอบถามใหม่',       value: mockStats.newInquiries,                    icon: MessageSquare,  color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' },
            { label: 'รายได้เดือนนี้',   value: `฿${mockStats.monthlyRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-[#7c3aed]', bg: 'bg-[#7c3aed]/10' },
            { label: 'เข้าเรียน',        value: `${mockStats.attendanceRate}%`,            icon: CheckCircle2,   color: 'text-[#059669]', bg: 'bg-[#059669]/10' },
            { label: 'คาบวันนี้',        value: mockStats.upcomingLessons,                 icon: Clock,          color: 'text-[#0891b2]', bg: 'bg-[#0891b2]/10' },
          ].map(stat => (
            <div key={stat.label} className="card flex flex-col gap-2">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className={`font-ui font-bold text-xl ${stat.color}`}>{stat.value}</div>
              <div className="font-thai text-[#64748b] text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* New inquiries */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-ui font-bold text-[#0f2557]">สอบถามล่าสุด</h2>
              <Link href="/admin/students?tab=inquiries"
                className="flex items-center gap-1 text-[#1a56db] text-xs font-ui font-semibold hover:underline"
              >
                ดูทั้งหมด <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e2e8f0]">
                    {['ชื่อ', 'เบอร์', 'วิชา', 'ระดับ', 'สถานะ', ''].map(h => (
                      <th key={h} className="pb-3 text-left text-xs font-ui font-semibold text-[#64748b] first:pl-0 px-2">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockInquiries.map(inq => {
                    const s = statusConfig[inq.status] ?? statusConfig.new
                    return (
                      <tr key={inq.id} className="border-b border-[#f0f4ff] hover:bg-[#f8fafc] transition-colors">
                        <td className="py-3 pl-0 px-2">
                          <div className="font-thai font-semibold text-[#0f2557] text-sm">{inq.name}</div>
                          <div className="font-ui text-[#94a3b8] text-xs">{inq.createdAt}</div>
                        </td>
                        <td className="py-3 px-2 font-ui text-[#64748b] text-sm">{inq.phone}</td>
                        <td className="py-3 px-2 font-thai text-[#0f2557] text-sm">{inq.subject}</td>
                        <td className="py-3 px-2 font-thai text-[#64748b] text-sm">{inq.level}</td>
                        <td className="py-3 px-2">
                          <span className={`badge ${s.color} text-xs`}>{s.label}</span>
                        </td>
                        <td className="py-3 px-2">
                          <a href={`tel:${inq.phone}`}
                            className="text-[#1a56db] text-xs font-ui font-semibold hover:underline whitespace-nowrap"
                          >
                            📞 โทร
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
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-ui font-bold text-[#0f2557] mb-4">ลิงก์ด่วน</h2>
              <div className="space-y-2">
                {[
                  { href: '/admin/students/new',    label: 'เพิ่มนักเรียนใหม่',   icon: '👤' },
                  { href: '/admin/courses',         label: 'จัดการหลักสูตร',       icon: '📚' },
                  { href: '/admin/reports',         label: 'ออก Report ประจำเดือน', icon: '📊' },
                  { href: '/admin/students?export', label: 'Export CSV',          icon: '📥' },
                ].map(l => (
                  <Link key={l.href} href={l.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f0f4ff] transition-colors"
                  >
                    <span className="text-base">{l.icon}</span>
                    <span className="font-thai text-[#0f2557] text-sm">{l.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#94a3b8] ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#0f2557] to-[#1a56db] p-5 text-white">
              <div className="font-ui font-bold mb-1">📢 แจ้งเตือน</div>
              <div className="font-thai text-white/70 text-sm">
                มีนักเรียน 3 คนยังไม่ชำระค่าเรียนเดือนนี้
              </div>
              <Link href="/admin/reports?tab=payment"
                className="inline-block mt-3 text-xs font-ui font-semibold text-[#f59e0b] hover:underline"
              >
                ดูรายละเอียด →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
