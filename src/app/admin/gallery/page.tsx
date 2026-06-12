import { createClient } from '@/lib/supabase/server'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { 
  Search, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Filter,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils/format'

export const metadata = { title: 'Manage Gallery — Admin Panel' }

export default async function AdminGalleryPage() {
  const supabase = createClient()
  
  // Fetch gallery items
  const { data: photos, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 animate-fade-in">
      <AdminPageHeader 
        title="Photo Gallery" 
        description="จัดการภาพบรรยากาศการเรียนการสอน กิจกรรม และความประทับใจต่างๆ"
        action={{ label: 'Upload Photos', href: '/admin/gallery/new' }}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photos && photos.length > 0 ? photos.map((photo) => (
          <div key={photo.id} className="card p-0 border-slate-200/60 overflow-hidden group relative aspect-square shadow-sm hover:shadow-md transition-all">
            <img 
              src={photo.image_url} 
              alt={photo.title || ''} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
              <div className="flex justify-end">
                <span className="badge bg-white/20 backdrop-blur-md text-white text-[9px] font-bold border-white/10 uppercase tracking-widest">
                  {photo.category || 'Activity'}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="font-thai font-bold text-xs line-clamp-2 leading-snug">
                  {photo.title || 'Untitled Photo'}
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <Link 
                    href={`/admin/gallery/edit/${photo.id}`}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                  <button 
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/50 text-white transition-colors"
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
              <ImageIcon className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-ui font-bold text-slate-400">No photos found</h4>
              <p className="text-sm text-slate-400 font-thai">ยังไม่มีภาพถ่ายในคลังอัลบั้มของคุณ</p>
              <Link href="/admin/gallery/new" className="inline-block pt-4 text-[#1a56db] text-sm font-bold hover:underline">
                อัพโหลดรูปภาพแรก
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
