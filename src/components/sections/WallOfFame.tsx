'use client'

import { useState } from 'react'
import { Sparkles, Trophy, Star, X, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react'

interface StudentAchievement {
  id: number
  src: string
  category: 'exam-pass' | 'onet-100'
  name: string
  achievement: string
  school: string
}

const achievements: StudentAchievement[] = [
  { id: 1, src: '/success-1.jpg', category: 'onet-100', name: 'น้องภูมิใจ', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา ภาษาอังกฤษ' },
  { id: 2, src: '/success-2.jpg', category: 'onet-100', name: 'น้องไอซ์', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา คณิตศาสตร์' },
  { id: 3, src: '/success-3.jpg', category: 'onet-100', name: 'น้องเกล', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา ภาษาอังกฤษ' },
  { id: 4, src: '/success-4.jpg', category: 'onet-100', name: 'น้องภูมิใจ', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา คณิตศาสตร์' },
  { id: 5, src: '/success-5.jpg', category: 'exam-pass', name: 'น้องฝุ้นฝุ้น', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMT', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 6, src: '/success-6.jpg', category: 'onet-100', name: 'น้องเกล', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา คณิตศาสตร์' },
  { id: 7, src: '/success-7.jpg', category: 'exam-pass', name: 'น้องเจนนี่', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 8, src: '/success-8.jpg', category: 'onet-100', name: 'น้องแพน', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา คณิตศาสตร์' },
  { id: 9, src: '/success-9.jpg', category: 'onet-100', name: 'น้องจั่นเจา', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา คณิตศาสตร์' },
  { id: 10, src: '/success-10.jpg', category: 'onet-100', name: 'น้องมะลิ', achievement: 'O-NET 100 คะแนนเต็ม', school: 'วิชา คณิตศาสตร์' },
  { id: 11, src: '/success-11.jpg', category: 'exam-pass', name: 'น้องออร์แกน', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 12, src: '/success-12.jpg', category: 'exam-pass', name: 'น้องไพลิน', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 13, src: '/success-13.jpg', category: 'exam-pass', name: 'น้องภพ', achievement: 'สอบติด ม.4 ห้องโครงการ SMA (อันดับ 7)', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 14, src: '/success-14.jpg', category: 'exam-pass', name: 'น้องภูผา', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMT', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 15, src: '/success-15.jpg', category: 'exam-pass', name: 'น้องเจ้านาย', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMP', school: 'โรงเรียนหาดใหญ่วิทยาลัย 2' },
  { id: 16, src: '/success-16.jpg', category: 'exam-pass', name: 'น้องคุณ', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMT', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 17, src: '/success-17.jpg', category: 'exam-pass', name: 'น้องจั่นเจา', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMA', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 18, src: '/success-18.jpg', category: 'exam-pass', name: 'น้องอั่งเปา', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMA', school: 'โรงเรียนหาดใหญ่วิทยาลัยสมบูรณ์กุลกันยา' },
  { id: 19, src: '/success-19.jpg', category: 'exam-pass', name: 'น้องโฟกัส', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 20, src: '/success-20.jpg', category: 'exam-pass', name: 'น้องดานีน', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 21, src: '/success-21.jpg', category: 'exam-pass', name: 'น้องโอโซน', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ AST', school: 'โรงเรียนหาดใหญ่วิทยาลัยสมบูรณ์กุลกันยา' },
  { id: 22, src: '/success-22.jpg', category: 'exam-pass', name: 'น้องพาส', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMTE', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 23, src: '/success-23.jpg', category: 'exam-pass', name: 'น้องอะตอม', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMA', school: 'โรงเรียนหาดใหญ่วิทยาลัยสมบูรณ์กุลกันยา' },
  { id: 24, src: '/success-24.jpg', category: 'exam-pass', name: 'น้องฮาริส', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMT', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 25, src: '/success-25.jpg', category: 'exam-pass', name: 'น้องไตเติ้ล', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMA', school: 'โรงเรียนหาดใหญ่วิทยาลัยสมบูรณ์กุลกันยา' },
  { id: 26, src: '/success-26.jpg', category: 'exam-pass', name: 'น้องเอินนิ่ง', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMTE (ลำดับ 30)', school: 'โรงเรียนบดินทรเดชา' },
  { id: 27, src: '/success-27.jpg', category: 'exam-pass', name: 'น้องกันกัน', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMA', school: 'โรงเรียนหาดใหญ่วิทยาลัยสมบูรณ์กุลกันยา' },
  { id: 28, src: '/success-28.jpg', category: 'exam-pass', name: 'น้องปัญญ์', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 29, src: '/success-29.jpg', category: 'exam-pass', name: 'น้องเรมี่', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMA', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 30, src: '/success-30.jpg', category: 'exam-pass', name: 'น้องเกล', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 31, src: '/success-31.jpg', category: 'exam-pass', name: 'น้องภูมิ', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMTE', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 32, src: '/success-32.jpg', category: 'exam-pass', name: 'น้องฮันน่า', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 33, src: '/success-33.jpg', category: 'exam-pass', name: 'น้องไอซ์', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMA', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 34, src: '/success-34.jpg', category: 'exam-pass', name: 'น้องแพร', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMA', school: 'โรงเรียนหาดใหญ่วิทยาลัยสมบูรณ์กุลกันยา' },
  { id: 35, src: '/success-35.jpg', category: 'exam-pass', name: 'น้องต้นหยง', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 36, src: '/success-36.jpg', category: 'exam-pass', name: 'น้องพอใจ', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMTE', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 37, src: '/success-37.jpg', category: 'exam-pass', name: 'น้องอชิ', achievement: 'สอบติด ม.1 ห้องเรียนพิเศษ SMT', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
  { id: 38, src: '/success-38.jpg', category: 'exam-pass', name: 'น้องยูมิ', achievement: 'สอบติด ม.1 ห้องโครงการ EP', school: 'โรงเรียนหาดใหญ่วิทยาลัย' },
]

const categories = [
  { value: 'all', label: '🏆 ผลงานทั้งหมด' },
  { value: 'exam-pass', label: '🎓 สอบติดมัธยมดัง (ม.1/ม.4)' },
  { value: 'onet-100', label: '💯 O-NET 100 คะแนนเต็ม' },
]

export default function WallOfFame() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState<number>(8)
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)

  const filteredItems = activeCategory === 'all'
    ? achievements
    : achievements.filter(item => item.category === activeCategory)

  const handlePrev = () => {
    if (selectedImageIdx === null) return
    setSelectedImageIdx(selectedImageIdx === 0 ? filteredItems.length - 1 : selectedImageIdx - 1)
  }

  const handleNext = () => {
    if (selectedImageIdx === null) return
    setSelectedImageIdx(selectedImageIdx === filteredItems.length - 1 ? 0 : selectedImageIdx + 1)
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, filteredItems.length))
  }

  return (
    <section className="section bg-white border-t border-[#e2e8f0]" id="success">
      <div className="container-max">
        
        {/* Title Block */}
        <div className="text-center mb-12 animate-on-scroll">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-ui font-semibold text-xs tracking-wider uppercase mb-3">
            <Trophy className="w-3.5 h-3.5" /> Wall of Fame
          </span>
          <h2 className="section-title mt-1">ทำเนียบนักเรียนคนเก่ง</h2>
          <p className="section-subtitle mx-auto">
            ความภูมิใจสูงสุดของ LIFE Academy กับผลลัพธ์การเรียนที่เป็นเลิศและการก้าวสู่รั้วโรงเรียนดังที่มุ่งหวัง
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value)
                setVisibleCount(8) // Reset view count
                setSelectedImageIdx(null)
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-semibold font-thai transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/10 font-bold'
                  : 'bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {filteredItems.slice(0, visibleCount).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIdx(idx)}
              className="group bg-[#f8fafc] rounded-3xl overflow-hidden border border-[#e2e8f0]/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image with Decorative Overlay */}
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img
                  src={item.src}
                  alt={`${item.name} - ${item.achievement}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Brand Logo Accent */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-sm">
                  <GraduationCap className="w-4 h-4 text-amber-500" />
                </div>

                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-amber-500 text-slate-900 font-ui font-extrabold text-xs px-4 py-2 rounded-2xl shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> คลิกชมใบประกาศ
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-slate-100/50">
                <div>
                  <div className="flex items-center gap-1 text-amber-600 font-ui font-extrabold text-[10px] uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {item.category === 'onet-100' ? 'ONET 100 FULL' : 'ENTRANCE PASS'}
                  </div>
                  <h3 className="font-ui font-extrabold text-base text-[#0f2557] mt-1.5 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="font-thai font-semibold text-slate-700 text-xs mt-1 leading-snug">
                    {item.achievement}
                  </p>
                </div>
                
                <div className="font-thai text-[11px] text-slate-500 mt-2.5 border-t border-slate-100 pt-2 line-clamp-1">
                  🏫 {item.school}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <div className="text-center mt-12 animate-fade-in">
            <button
              onClick={handleLoadMore}
              className="btn-primary bg-[#0f2557] hover:bg-[#1a56db] text-white py-3 px-8 font-ui font-bold text-xs shadow-md shadow-blue-900/10 inline-flex items-center gap-1.5 rounded-2xl"
            >
              แสดงนักเรียนคนเก่งเพิ่ม ({filteredItems.length - visibleCount} คน) ↓
            </button>
          </div>
        )}

        {/* Interactive Lightbox Modal */}
        {selectedImageIdx !== null && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 select-none">
            {/* Close button */}
            <button
              onClick={() => setSelectedImageIdx(null)}
              className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors"
              aria-label="ปิดใบประกาศ"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors hidden sm:block"
              aria-label="ใบประกาศก่อนหน้า"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main view container */}
            <div className="max-w-2xl w-full max-h-[85vh] flex flex-col justify-center items-center text-white relative px-4">
              <img
                src={filteredItems[selectedImageIdx].src}
                alt={`${filteredItems[selectedImageIdx].name} - ${filteredItems[selectedImageIdx].achievement}`}
                className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/10 bg-slate-900"
              />
              
              {/* Bottom details pill */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl px-6 py-4 mt-4 text-center max-w-lg border border-white/5 shadow-lg">
                <div className="text-amber-500 font-ui font-extrabold text-[10px] uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> CONGRATULATIONS TO SUCCESS
                </div>
                <h3 className="font-ui font-extrabold text-base text-white">
                  {filteredItems[selectedImageIdx].name}
                </h3>
                <p className="font-thai text-white/80 text-xs mt-1.5">
                  {filteredItems[selectedImageIdx].achievement} ({filteredItems[selectedImageIdx].school})
                </p>
              </div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors hidden sm:block"
              aria-label="ใบประกาศถัดไป"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile swipe tip */}
            <div className="absolute bottom-4 left-0 right-0 text-center sm:hidden text-white/30 text-[10px] font-ui">
              ← ปัดซ้าย หรือ ปัดขวา เพื่อเลื่อนสไลด์ใบประกาศ →
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
