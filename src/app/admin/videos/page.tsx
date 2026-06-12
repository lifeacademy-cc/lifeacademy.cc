import { createClient } from '@/lib/supabase/server'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { 
  Search, 
  Edit, 
  Trash2, 
  Video, 
  Play,
  ExternalLink,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils/format'

export const metadata = { title: 'Manage Course Videos — Admin Panel' }

export default async function AdminVideosPage({
  searchParams,
}: {
  searchParams: Promise<{ courseId?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const supabase = createClient()
  
  let query = supabase
    .from('course_videos')
    .select('*, courses(name)')
    .order('created_at', { ascending: false })

  if (resolvedSearchParams.courseId) {
    query = query.eq('course_id', resolvedSearchParams.courseId)
  }

  const { data: videos, error } = await query

  return (
    <div className="p-8 animate-fade-in">
      <AdminPageHeader 
        title="Course Videos" 
        description="จัดการวิดีโอประกอบหลักสูตร และบทเรียนออนไลน์"
        action={{ label: 'Add New Video', href: '/admin/videos/new' }}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos && videos.length > 0 ? videos.map((video) => (
          <div key={video.id} className="card border-slate-200/60 p-0 overflow-hidden hover:shadow-lg transition-all group">
            {/* Video Thumbnail */}
            <div className="aspect-video bg-slate-900 relative group/thumb">
              {video.thumbnail_url ? (
                <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700">
                  <Video className="w-10 h-10 opacity-30" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30">
                  <Play className="w-6 h-6 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-ui font-bold">
                Online
              </div>
            </div>

            {/* Video Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-thai font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-[#1a56db] transition-colors">
                  {video.title}
                </h3>
                {video.courses && (
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mt-1">
                    <BookOpen className="w-3 h-3" />
                    <span className="font-thai">{video.courses.name}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a 
                  href={video.video_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#1a56db] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/videos/edit/${video.id}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button 
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 card border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4 bg-transparent">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
              <Video className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-ui font-bold text-slate-400">No videos found</h4>
              <p className="text-sm text-slate-400 font-thai">คุณยังไม่ได้เพิ่มวิดีโอสำหรับหลักสูตรออนไลน์</p>
              <Link href="/admin/videos/new" className="inline-block pt-4 text-[#1a56db] text-sm font-bold hover:underline">
                อัพโหลดวิดีโอแรก
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
