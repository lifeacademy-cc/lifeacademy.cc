import { createClient } from '@/lib/supabase/server'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MessageSquare,
  MoreVertical
} from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Students & Inquiries — Admin Panel' }

export default async function AdminStudentsPage() {
  const supabase = createClient()
  
  // Fetch inquiries for now (as students management might be more complex)
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 animate-fade-in">
      <AdminPageHeader 
        title="Students & Inquiries" 
        description="จัดการรายชื่อนักเรียนและข้อมูลการติดต่อสอบถามทั้งหมด"
        action={{ label: 'Add New Student', href: '/admin/students/new' }}
      />

      <div className="card border-slate-200/60 shadow-sm p-20 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
          <Users className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="font-ui font-bold text-slate-400 text-lg">Student Management</h4>
          <p className="text-sm text-slate-400 font-thai max-w-sm">ระบบจัดการข้อมูลนักเรียนอย่างละเอียดและประวัติการเรียน กำลังอยู่ระหว่างการพัฒนา</p>
        </div>
      </div>
    </div>
  )
}
