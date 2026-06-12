import { createClient } from '@/lib/supabase/server'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Globe, 
  Lock,
  Newspaper
} from 'lucide-react'
import Link from 'next/link'
import { cn, formatDate } from '@/lib/utils/format'

export const metadata = { title: 'Manage Articles — Admin Panel' }

const categoryConfig: Record<string, { label: string; color: string }> = {
  news:         { label: 'ข่าวสาร',     color: 'bg-blue-100 text-blue-700' },
  activity:     { label: 'กิจกรรม',     color: 'bg-purple-100 text-purple-700' },
  success:      { label: 'ความสำเร็จ',   color: 'bg-emerald-100 text-emerald-700' },
  announcement: { label: 'ประกาศ',     color: 'bg-amber-100 text-amber-700' },
}

export default async function AdminArticlesPage() {
  const supabase = createClient()
  
  // Fetch news articles
  const { data: articles, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 animate-fade-in">
      <AdminPageHeader 
        title="Articles & Content" 
        description="จัดการบทความข่าวสาร กิจกรรม และประกาศประชาสัมพันธ์ของสถาบัน"
        action={{ label: 'Write New Article', href: '/admin/articles/new' }}
      />

      {/* Filters & Search */}
      <div className="card mb-6 border-slate-200/60 shadow-sm py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1a56db]/20 transition-all font-thai"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-ui text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <select className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-thai text-slate-600 focus:ring-2 focus:ring-[#1a56db]/20 transition-all outline-none">
            <option value="">ทุกหมวดหมู่</option>
            <option value="news">ข่าวสาร</option>
            <option value="activity">กิจกรรม</option>
            <option value="success">ความสำเร็จ</option>
            <option value="announcement">ประกาศ</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="card border-slate-200/60 p-0 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Article Info
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Category
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Published Date
                </th>
                <th className="py-4 px-6 text-right text-[10px] font-ui font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles && articles.length > 0 ? articles.map((article) => {
                const cat = categoryConfig[article.category] || categoryConfig.news
                return (
                  <tr key={article.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                          {article.image_url ? (
                            <img src={article.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Globe className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-thai font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-[#1a56db] transition-colors">
                            {article.title}
                          </div>
                          <div className="font-thai text-slate-400 text-xs mt-0.5 line-clamp-1">
                            {article.excerpt || 'ไม่มีคำโปรย...'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn("badge text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider", cat.color)}>
                        {cat.label}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {article.is_published ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-ui text-[10px] font-bold uppercase tracking-widest">
                          <Globe className="w-3 h-3" /> Published
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400 font-ui text-[10px] font-bold uppercase tracking-widest">
                          <Lock className="w-3 h-3" /> Draft
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 font-ui text-slate-500 text-xs">
                      {article.published_at ? formatDate(article.published_at) : '-'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/news/${article.id}`} 
                          target="_blank"
                          className="p-2 rounded-lg text-slate-400 hover:text-[#1a56db] hover:bg-blue-50 transition-all"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/articles/edit/${article.id}`}
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
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <Newspaper className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-ui font-bold text-slate-400">No articles found</p>
                        <Link href="/admin/articles/new" className="text-[#1a56db] text-xs font-bold hover:underline">
                          Create your first article
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
