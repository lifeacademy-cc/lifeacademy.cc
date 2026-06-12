import { createClient } from '@/lib/supabase/server'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { 
  Search, 
  Edit, 
  Trash2, 
  Briefcase, 
  CheckCircle2, 
  XCircle,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils/format'

export const metadata = { title: 'Manage Services — Admin Panel' }

export default async function AdminServicesPage() {
  const supabase = createClient()
  
  // Fetch services
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 animate-fade-in">
      <AdminPageHeader 
        title="Services Management" 
        description="จัดการบริการเสริมและโปรแกรมพิเศษต่างๆ ของสถาบัน"
        action={{ label: 'Add New Service', href: '/admin/services/new' }}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {services && services.length > 0 ? services.map((service) => (
          <div key={service.id} className="card border-slate-200/60 p-0 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
            {/* Service Preview Image */}
            <div className="h-40 bg-slate-100 relative overflow-hidden">
              {service.image_url ? (
                <img src={service.image_url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 bg-gradient-to-br from-slate-50 to-slate-100">
                  <Briefcase className="w-12 h-12 opacity-20" />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span className={cn(
                  "badge text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider",
                  service.is_active ? "bg-emerald-500 text-white" : "bg-slate-400 text-white"
                )}>
                  {service.is_active ? 'Active' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Service Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col">
              <div>
                <h3 className="font-thai font-bold text-slate-900 text-lg group-hover:text-[#1a56db] transition-colors line-clamp-1">
                  {service.title}
                </h3>
                <p className="font-thai text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                  {service.description || 'ไม่มีรายละเอียด...'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Link 
                    href={`/services/${service.id}`}
                    target="_blank"
                    className="p-2 rounded-lg text-slate-400 hover:text-[#1a56db] hover:bg-blue-50 transition-all"
                  >
                    <ExternalLink className="w-4.5 h-4.5" />
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/services/edit/${service.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-ui font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </Link>
                  <button 
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 card border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4 bg-transparent">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
              <Briefcase className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-ui font-bold text-slate-400 text-lg">No services found</h4>
              <p className="text-sm text-slate-400 font-thai">คุณยังไม่ได้เพิ่มรายการบริการสำหรับหน้าเวบไซต์</p>
              <Link href="/admin/services/new" className="inline-block pt-4 text-[#1a56db] text-sm font-bold hover:underline">
                เพิ่มบริการแรกของคุณ
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
