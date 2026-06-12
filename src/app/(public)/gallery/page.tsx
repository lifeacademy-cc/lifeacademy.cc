import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import ExhibitionGallery, { type GalleryItem } from '@/components/sections/ExhibitionGallery'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'ภาพบรรยากาศการเรียนและกิจกรรม — LIFE Academy',
  description: 'อัลบั้มภาพบรรยากาศการเรียนการสอน ห้องเรียนแบบเป็นกันเอง กิจกรรมพัฒนาผู้เรียน Active Learning และบรรยากาศงานนิทรรศการวิชาการของ LIFE Academy หาดใหญ่',
}

export const dynamic = 'force-dynamic'

const VALID_CATEGORIES = ['booth', 'active', 'mind', 'classroom'] as const
type Category = typeof VALID_CATEGORIES[number]

function toCategory(raw: string | null | undefined): Category {
  if (raw && (VALID_CATEGORIES as readonly string[]).includes(raw)) {
    return raw as Category
  }
  return 'classroom'
}

export default async function GalleryPage() {
  let dynamicItems: GalleryItem[] | undefined

  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('gallery')
      .select('id, title, image_url, category')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (data && data.length > 0) {
      dynamicItems = data.map((row, idx) => ({
        id: idx + 1,
        src: row.image_url,
        category: toCategory(row.category),
        title: row.title || 'ภาพกิจกรรม LIFE Academy',
        desc: '',
      }))
    }
  } catch {
    // fallback to static data
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-24 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl translate-y-1/2" />

        <div className="relative container-max z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-ui font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" /> Gallery & Atmosphere
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            ภาพบรรยากาศ<span className="text-[#f59e0b]">การเรียนรู้</span>
          </h1>
          <p className="font-thai text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            สัมผัสบรรยากาศการเรียนจริงภายในสถาบัน ห้องเรียนขนาดเล็กที่ดูแลอย่างทั่วถึง
            กิจกรรมพัฒนาทักษะชีวิต และกิจกรรมนิทรรศการวิชาการของเด็กๆ LIFE Academy หาดใหญ่
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <ExhibitionGallery items={dynamicItems} />
    </div>
  )
}
