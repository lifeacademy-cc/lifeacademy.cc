import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { BarChart3 } from 'lucide-react'

export const metadata = { title: 'Reports & Analytics — Admin Panel' }

export default function AdminReportsPage() {
  return (
    <div className="p-8 animate-fade-in">
      <AdminPageHeader 
        title="Reports & Analytics" 
        description="สรุปผลรายได้ จำนวนนักเรียน และสถิติการใช้งานต่างๆ"
      />

      <div className="card border-slate-200/60 shadow-sm p-20 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
          <BarChart3 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="font-ui font-bold text-slate-400 text-lg">Coming Soon</h4>
          <p className="text-sm text-slate-400 font-thai max-w-sm">ระบบออกรายงานและกราฟวิเคราะห์ข้อมูล จะเปิดให้ใช้งานเร็วๆ นี้</p>
        </div>
      </div>
    </div>
  )
}
