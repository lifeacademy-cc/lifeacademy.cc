'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon, Sparkles, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'

export interface GalleryItem {
  id: number
  src: string
  category: 'booth' | 'active' | 'mind' | 'classroom'
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
  {
    id: 13,
    src: '/classroom/classroom-1.jpg',
    category: 'classroom',
    title: 'บรรยากาศการเรียนการสอนที่เป็นกันเอง',
    desc: 'คุณครูใส่ใจดูแลนักเรียนอย่างใกล้ชิด เน้นการปฏิสัมพันธ์และการตั้งคำถามเพื่อกระตุ้นการคิดวิเคราะห์',
  },
  {
    id: 14,
    src: '/classroom/classroom-2.jpg',
    category: 'classroom',
    title: 'ห้องเรียนขนาดเล็กเพื่อการดูแลที่ทั่วถึง',
    desc: 'จัดห้องเรียนสไตล์ Onsite ที่มีจำนวนนักเรียนจำกัดต่อห้อง ช่วยให้คุณครูสามารถเข้าถึงและช่วยเหลือเด็กๆ ได้เป็นรายบุคคล',
  },
  {
    id: 15,
    src: '/classroom/classroom-3.jpg',
    category: 'classroom',
    title: 'รอยยิ้มและความสนุกสนานในห้องเรียน',
    desc: 'เด็กๆ มีความสุขและสนุกไปกับการเรียนรู้ผ่านกิจกรรมที่เป็นกันเอง ช่วยลดความตึงเครียดและเพิ่มประสิทธิภาพการจดจำ',
  },
  {
    id: 16,
    src: '/classroom/classroom-4.jpg',
    category: 'classroom',
    title: 'ความตั้งใจและสมาธิในการฝึกฝนโจทย์',
    desc: 'บรรยากาศห้องเรียนระดับมัธยมศึกษาตอนต้น นักเรียนทุกคนมุ่งมั่นตั้งใจทำแบบฝึกหัดเพื่อเตรียมความพร้อมสู่สนามสอบ',
  },
  {
    id: 17,
    src: '/classroom/classroom-5.jpg',
    category: 'classroom',
    title: 'การทำงานกลุ่มและปรึกษาหารือ',
    desc: 'ส่งเสริมการเรียนรู้ร่วมกัน (Collaborative Learning) แลกเปลี่ยนความคิดเห็นเพื่อหาคำตอบและพัฒนาทักษะการทำงานเป็นทีม',
  },
  {
    id: 18,
    src: '/classroom/classroom-6.jpg',
    category: 'classroom',
    title: 'การจดบันทึกและการจัดระเบียบความคิด',
    desc: 'เด็กๆ ได้รับการฝึกฝนการสรุปเนื้อหาและการจดโน้ตย่อที่เป็นระบบเพื่อความเข้าใจและการทบทวนที่ง่ายขึ้น',
  },
  {
    id: 19,
    src: '/classroom/classroom-7.jpg',
    category: 'classroom',
    title: 'การวางแผนหลักสูตรและแนะแนวการศึกษา',
    desc: 'ทีมวิชาการร่วมประชุมออกแบบบทเรียนและวางแผนการติวรายสัปดาห์ เพื่อปรับระดับการเรียนการสอนให้ตรงกับเป้าหมายของเด็กๆ',
  },
  {
    id: 20,
    src: '/classroom/classroom-8.jpg',
    category: 'classroom',
    title: 'ความผูกพันและอบอุ่นระหว่างครูกับศิษย์',
    desc: 'ภาพความประทับใจร่วมกันหลังคาบเรียนที่เปี่ยมด้วยพลังบวกและการให้กำลังใจซึ่งกันและกันในครอบครัว LIFE Academy',
  },
  {
    id: 21,
    src: '/classroom/classroom-9.jpg',
    category: 'classroom',
    title: 'ตำราเรียนมาตรฐานและสื่อการสอนที่ทันสมัย',
    desc: 'นักเรียนภูมิใจนำเสนอหนังสือและชีทสรุปสูตรลัดเฉพาะของสถาบันฯ ที่ออกแบบมาเพื่อให้เข้าใจง่ายและทำข้อสอบได้จริง',
  },
  {
    id: 22,
    src: '/classroom/classroom-10.jpg',
    category: 'classroom',
    title: 'ห้องเรียนสมาธิและการจดจ่อระดับประถม',
    desc: 'บรรยากาศห้องเรียนระดับประถมศึกษาที่เน้นความเงียบสงบและการสร้างโฟกัสในการเขียนและคำนวณ',
  },
  {
    id: 23,
    src: '/classroom/classroom-11.jpg',
    category: 'classroom',
    title: 'การเรียนรู้ผ่านสื่อดิจิทัลและเทคโนโลยี',
    desc: 'นำเทคโนโลยี Interactive Screen มาช่วยในการนำเสนอโจทย์และสูตรคณิตศาสตร์แบบมีสีสันและเห็นภาพชัดเจน',
  },
  {
    id: 24,
    src: '/classroom/classroom-12.jpg',
    category: 'classroom',
    title: 'การโค้ชชิ่งและประเมินผลรายบุคคล',
    desc: 'คุณครูช่วยแนะแนวแนวข้อสอบและตรวจประเมินจุดเด่น-จุดแก้ไขของนักเรียนอย่างละเอียดและเป็นระบบ',
  },
  {
    id: 25,
    src: '/classroom/classroom-13.jpg',
    category: 'classroom',
    title: 'ความภาคภูมิใจในความก้าวหน้าทางการเรียน',
    desc: 'ความสุขของเด็กๆ เมื่อสามารถทำความเข้าใจเนื้อหาฟิสิกส์และวิทยาศาสตร์ระดับยากได้อย่างทะลุปรุโปร่ง',
  },
  {
    id: 26,
    src: '/activity/activity-1.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'รู้จักทักษะสมอง Multiple Intelligence ของตนเอง #LIFE #ญว #ทักษะชีวิต',
  },
  {
    id: 27,
    src: '/activity/activity-2.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'เข้าใจตนเอง เรียนรู้จากสิ่งรอบตัว #LIFE #ญว #เด็กเจนซี',
  },
  {
    id: 28,
    src: '/activity/activity-3.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'ทักษะการปรับตัวให้เข้ากับสังคมในรั้ว ญว. #LIFE #หาดใหญ่วิทยาลัย #ทักษะชีวิต',
  },
  {
    id: 29,
    src: '/activity/activity-4.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'รู้จักทักษะสมอง Multiple Intelligence ของตนเอง #LIFE #ญว #ทักษะชีวิต',
  },
  {
    id: 30,
    src: '/activity/activity-5.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'เข้าใจตนเอง เรียนรู้จากสิ่งรอบตัว #LIFE #ญว #เด็กเจนซี',
  },
  {
    id: 31,
    src: '/activity/activity-6.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'ทักษะการปรับตัวให้เข้ากับสังคมในรั้ว ญว. #LIFE #หาดใหญ่วิทยาลัย #ทักษะชีวิต',
  },
  {
    id: 32,
    src: '/activity/activity-7.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'รู้จักทักษะสมอง Multiple Intelligence ของตนเอง #LIFE #ญว #ทักษะชีวิต',
  },
  {
    id: 33,
    src: '/activity/activity-8.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'เข้าใจตนเอง เรียนรู้จากสิ่งรอบตัว #LIFE #ญว #เด็กเจนซี',
  },
  {
    id: 34,
    src: '/activity/activity-9.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'ทักษะการปรับตัวให้เข้ากับสังคมในรั้ว ญว. #LIFE #หาดใหญ่วิทยาลัย #ทักษะชีวิต',
  },
  {
    id: 35,
    src: '/activity/activity-10.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'รู้จักทักษะสมอง Multiple Intelligence ของตนเอง #LIFE #ญว #ทักษะชีวิต',
  },
  {
    id: 36,
    src: '/activity/activity-11.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'เข้าใจตนเอง เรียนรู้จากสิ่งรอบตัว #LIFE #ญว #เด็กเจนซี',
  },
  {
    id: 37,
    src: '/activity/activity-12.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'ทักษะการปรับตัวให้เข้ากับสังคมในรั้ว ญว. #LIFE #หาดใหญ่วิทยาลัย #ทักษะชีวิต',
  },
  {
    id: 38,
    src: '/activity/activity-13.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'รู้จักทักษะสมอง Multiple Intelligence ของตนเอง #LIFE #ญว #ทักษะชีวิต',
  },
  {
    id: 39,
    src: '/activity/activity-14.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'เข้าใจตนเอง เรียนรู้จากสิ่งรอบตัว #LIFE #ญว #เด็กเจนซี',
  },
  {
    id: 40,
    src: '/activity/activity-15.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'ทักษะการปรับตัวให้เข้ากับสังคมในรั้ว ญว. #LIFE #หาดใหญ่วิทยาลัย #ทักษะชีวิต',
  },
  {
    id: 41,
    src: '/activity/activity-16.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'รู้จักทักษะสมอง Multiple Intelligence ของตนเอง #LIFE #ญว #ทักษะชีวิต',
  },
  {
    id: 42,
    src: '/activity/activity-17.jpg',
    category: 'active',
    title: 'กิจกรรมปรับพื้นฐาน ม.1 & ม.4 (SMT, SMTE)',
    desc: 'เข้าใจตนเอง เรียนรู้จากสิ่งรอบตัว #LIFE #ญว #เด็กเจนซี',
  },
  {
    id: 43,
    src: '/brain_booster/brain_booster-1.jpg',
    category: 'mind',
    title: 'คอร์ส Mind & Brain Booster',
    desc: 'ฝึกสติ สมาธิ เบื้องต้น ได้เทคนิคไปฝึกในตอนเรียนและการใช้ชีวิต #LIFE #ฝึกสมาธิ #เด็กรุ่นใหม่',
  },
  {
    id: 44,
    src: '/brain_booster/brain_booster-2.jpg',
    category: 'mind',
    title: 'คอร์ส Mind & Brain Booster',
    desc: 'วันนี้เด็กๆ ได้มาฝึกอยู่กับตัวเอง เข้าใจและรีบฝึก รีบแก้ตั้งแต่ตอนนี้ ดีที่สุดค่ะ #ใจลอย #สมาธิสั้น',
  },
  {
    id: 45,
    src: '/brain_booster/brain_booster-3.jpg',
    category: 'mind',
    title: 'คอร์ส Mind & Brain Booster',
    desc: 'สนใจคอร์สฝึกสมาธิ ช่วยให้ลูกโฟกัสการเรียนมากขึ้น ปรึกษาฟรี ทดลองเรียนฟรีได้เลยค่ะ #LIFE',
  },
  {
    id: 46,
    src: '/brain_booster/brain_booster-4.jpg',
    category: 'mind',
    title: 'คอร์ส Mind & Brain Booster',
    desc: 'ฝึกการจดจ่อและโฟกัสผ่านกิจกรรมที่ออกแบบมาเพื่อเด็กรุ่นใหม่โดยเฉพาะ #สมาธิ #LIFE',
  },
  {
    id: 47,
    src: '/brain_booster/brain_booster-5.jpg',
    category: 'mind',
    title: 'คอร์ส Mind & Brain Booster',
    desc: 'การฝึกสมาธิคือพื้นฐานสำคัญของการเรียนรู้ที่มีประสิทธิภาพ #BrainBooster #LIFE',
  },
]

const categories = [
  { value: 'all', label: '📸 ภาพทั้งหมด' },
  { value: 'classroom', label: '🏫 บรรยากาศการเรียน' },
  { value: 'booth', label: '🎪 บรรยากาศออกบูธ' },
  { value: 'active', label: '🧪 กิจกรรม Active Learning' },
  { value: 'mind', label: '🧠 ฝึกสมาธิ & คลื่นสมอง' },
]

export default function ExhibitionGallery({ items, initialCategory = 'all' }: { items?: GalleryItem[], initialCategory?: string }) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory)
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
    }
  }, [initialCategory])

  const sourceItems = items && items.length > 0 ? items : galleryItems

  const filteredItems = activeCategory === 'all'
    ? sourceItems
    : sourceItems.filter(item => item.category === activeCategory)

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
                  {item.category === 'booth' ? '🎪 ออกบูธ' : item.category === 'active' ? '🧪 Active Learning' : item.category === 'mind' ? '🧠 คลื่นสมอง & สมาธิ' : '🏫 บรรยากาศการเรียน'}
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
