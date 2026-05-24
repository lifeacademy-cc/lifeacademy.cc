'use client'

import { useState } from 'react'
import { Image as ImageIcon, Sparkles, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'

interface GalleryItem {
  id: number
  src: string
  category: 'booth' | 'active' | 'mind'
  title: string
  desc: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: '/event-1.jpg',
    category: 'booth',
    title: 'คุณครูต้อนรับน้องๆ สู่บูธนิทรรศการ',
    desc: 'บรรยากาศอันอบอุ่นของทีมงานวิชาการ LIFE Academy ที่ต้อนรับน้องๆ เข้าสู่กิจกรรม',
  },
  {
    id: 2,
    src: '/event-2.jpg',
    category: 'active',
    title: 'กิจกรรมนักวิทยาศาสตร์น้อย',
    desc: 'เด็กๆ สวมเสื้อกาวน์นักวิจัยตัวน้อยร่วมทำการระบายสีและวิเคราะห์สมาธิเชิงลึก',
  },
  {
    id: 3,
    src: '/event-3.jpg',
    category: 'mind',
    title: 'ศิลปะบำบัดฝึกการจดจ่อ (Mandala)',
    desc: 'ระบายสีแผนผังลวดลายเรขาคณิต (Mandala) เพื่อให้เด็กๆ ได้ฝึกสมาธิและการจดจ่อสูงสุด',
  },
  {
    id: 4,
    src: '/event-4.jpg',
    category: 'booth',
    title: 'บูธ LIFE Academy Hatyai',
    desc: 'การออกบูธนำเสนอแนวคิด "ปั้นคนเก่ง สร้างคนดี" และสื่อการเรียนรู้นวัตกรรมยุคใหม่',
  },
  {
    id: 5,
    src: '/event-5.jpg',
    category: 'mind',
    title: 'เครื่องตรวจวัดคลื่นสมองจำลอง (Check your Brain)',
    desc: 'การใช้สายคาดศีรษะเทคโนโลยีสมาธิเพื่อตรวจสอบการผ่อนคลายและคลื่นความจำของเด็กๆ',
  },
  {
    id: 6,
    src: '/event-6.jpg',
    category: 'mind',
    title: 'ตัวต่อเสริมสติปัญญา (Tangram)',
    desc: 'กิจกรรมต่อชิ้นส่วนเรขาคณิต Tangram ท้าทายความคิดสร้างสรรค์และมิติสัมพันธ์',
  },
  {
    id: 7,
    src: '/event-7.jpg',
    category: 'booth',
    title: 'ทีมวิชาการและแนะแนวการเรียน',
    desc: 'ทีมครูผู้เชี่ยวชาญพร้อมให้ข้อมูลและวิเคราะห์แนวทางการเรียนเป็นรายบุคคล',
  },
  {
    id: 8,
    src: '/event-8.jpg',
    category: 'booth',
    title: 'ปรึกษาการศึกษาและพัฒนาการเรียนรู้',
    desc: 'ผู้ปกครองเข้าร่วมพูดคุยและปรึกษากระบวนการวางแผนสอบเข้าและปรับพื้นฐานวิชาการ',
  },
  {
    id: 9,
    src: '/event-9.jpg',
    category: 'mind',
    title: 'การแก้ไขปัญหาเชิงกลยุทธ์ผ่านเกมตรรกะ',
    desc: 'พี่ๆ มัธยมร่วมกิจกรรมท้าทายความคิดเพื่อสร้างทางเดินความคิดเชิงโครงสร้างร่วมกัน',
  },
  {
    id: 10,
    src: '/event-10.jpg',
    category: 'active',
    title: 'ระบบทดลองวิจัยสมาธิแบบเรียลไทม์',
    desc: 'การทดสอบวัดประสิทธิผลความตื่นตัวของสมองกับการทำสมาธิสร้างสรรค์เชิงปฏิบัติการ',
  },
  {
    id: 11,
    src: '/event-11.jpg',
    category: 'active',
    title: 'ห้องแล็บทดลองแสนสนุกของเด็กๆ',
    desc: 'จำลองบรรยากาศความสนุกของการระบายสีฝึกฝนความเข้าใจและคัดแยกเฉดสีตามทฤษฎีศิลปะ',
  },
  {
    id: 12,
    src: '/event-12.jpg',
    category: 'booth',
    title: 'ความสนใจอย่างล้นหลามจากครอบครัวหาดใหญ่',
    desc: 'ผู้ปกครองและนักเรียนให้การตอบรับอย่างอบอุ่นและสมัครเข้าร่วมวัดระดับฟรีกันอย่างคึกคัก',
  },
]

const categories = [
  { value: 'all', label: '📸 ภาพทั้งหมด' },
  { value: 'booth', label: '🎪 บรรยากาศออกบูธ' },
  { value: 'active', label: '🧪 กิจกรรม Active Learning' },
  { value: 'mind', label: '🧠 ฝึกสมาธิ & คลื่นสมอง' },
]

export default function ExhibitionGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const handlePrev = () => {
    if (selectedImageIdx === null) return
    setSelectedImageIdx(selectedImageIdx === 0 ? filteredItems.length - 1 : selectedImageIdx - 1)
  }

  const handleNext = () => {
    if (selectedImageIdx === null) return
    setSelectedImageIdx(selectedImageIdx === filteredItems.length - 1 ? 0 : selectedImageIdx + 1)
  }

  return (
    <section className="section bg-[#f0f4ff]/50 border-t border-[#e2e8f0]" id="gallery">
      <div className="container-max">
        
        {/* Title */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a56db]/10 text-[#1a56db] font-ui font-semibold text-xs tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Exhibition & Activities
          </span>
          <h2 className="section-title mt-1">ภาพกิจกรรมและผลงานสถาบัน</h2>
          <p className="section-subtitle mx-auto">
            บรรยากาศการออกบูธนิทรรศการ กิจกรรมการเรียนรู้เชิงรุก (Active Learning) และการฝึกพัฒนาคลื่นสมาธิของเด็กๆ LIFE Academy
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fade-in">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value)
                setSelectedImageIdx(null)
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold font-thai transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-[#0f2557] text-white shadow-md shadow-slate-900/10'
                  : 'bg-white text-[#475569] border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIdx(idx)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#e2e8f0] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image box */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-[#0f2557] font-ui font-bold text-xs px-3.5 py-1.5 rounded-2xl shadow">
                    🔎 คลิกขยายภาพ
                  </span>
                </div>
              </div>

              {/* Title & Desc */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-slate-50">
                <div>
                  <h3 className="font-ui font-extrabold text-sm text-[#0f2557] line-clamp-1 group-hover:text-[#1a56db] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-thai text-[#64748b] text-[11px] leading-relaxed mt-1.5 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                
                <span className="inline-block self-start font-thai text-[9px] font-bold px-2 py-0.5 bg-[#f0f4ff] text-[#1a56db] rounded-lg mt-3 uppercase tracking-wider">
                  {item.category === 'booth' ? '🎪 ออกบูธ' : item.category === 'active' ? '🧪 Active Learning' : '🧠 คลื่นสมอง & สมาธิ'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImageIdx !== null && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 select-none">
            {/* Close button */}
            <button
              onClick={() => setSelectedImageIdx(null)}
              className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors"
              aria-label="ปิดภาพขยาย"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors hidden sm:block"
              aria-label="ภาพก่อนหน้า"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main content box */}
            <div className="max-w-4xl w-full max-h-[85vh] flex flex-col justify-center items-center text-white relative px-4">
              <img
                src={filteredItems[selectedImageIdx].src}
                alt={filteredItems[selectedImageIdx].title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              
              {/* Details card below image */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mt-4 text-center max-w-2xl border border-white/5 shadow-lg">
                <span className="inline-block text-[#f59e0b] font-ui font-extrabold text-[10px] uppercase tracking-widest mb-1.5">
                  {filteredItems[selectedImageIdx].category === 'booth' ? '🎪 EXHIBITION' : filteredItems[selectedImageIdx].category === 'active' ? '🧪 ACTIVE LEARNING' : '🧠 MIND & FOCUS'}
                </span>
                <h3 className="font-ui font-bold text-lg text-white leading-tight">
                  {filteredItems[selectedImageIdx].title}
                </h3>
                <p className="font-thai text-white/70 text-xs mt-1.5 leading-relaxed">
                  {filteredItems[selectedImageIdx].desc}
                </p>
              </div>
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors hidden sm:block"
              aria-label="ภาพถัดไป"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile swipe info */}
            <div className="absolute bottom-4 left-0 right-0 text-center sm:hidden text-white/40 text-[10px] font-ui">
              ← ปัดซ้าย หรือ ปัดขวา เพื่อเปลี่ยนภาพ →
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
