import type { Metadata } from 'next'
import { CheckCircle2, Award, Mail, MessageCircle, Heart, Star, Sparkles, Download, FileText, Phone, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ทีมผู้บริหารและครูผู้สอน — LIFE Academy',
  description: 'ทำความรู้จักทีมผู้บริหารและคณะครูผู้เชี่ยวชาญของ LIFE Academy หาดใหญ่ นำโดย CEO ครูนวล อุทัยวรรณ, General Manager ครูวี อาลาวี, HR Manager ครูเติ้ล เอราวัตร และ ครูมิ่ง มิ่งขวัญ',
}

interface TeacherProfile {
  name: string
  nickname: string
  role: string
  image: string
  cvImage: string
  quote: string
  education: string[]
  experience: string[]
  achievements?: string[]
  specialty: string
  color: string
  initials: string
}

const mainTeachers: TeacherProfile[] = [
  {
    name: 'อุทัยวรรณ ธรรมโภคิน',
    nickname: 'ครูนวล',
    role: 'CEO & Founder / ผู้ก่อตั้งสถาบัน',
    image: '/ceo.jpg',
    cvImage: '/teachers/cv-nual.jpg',
    quote: '“มุ่งมั่นปั้นคนเก่ง ปูพื้นฐานความรู้เคียงคู่การสร้างคนดีเพื่ออนาคตของเด็กหาดใหญ่ทุกคน”',
    education: [
      'วท.บ. (ชีววิทยา) มหาวิทยาลัยสงขลานครินทร์ (ม.อ.)',
      'นักศึกษาทุนเรียนดีวิทยาศาสตร์แห่งประเทศไทยในพระบรมราชูปถัมภ์',
      'หลักสูตร Brain Intelligence (AIM Training) และ Career Finder (Talent Academy)'
    ],
    experience: [
      'ผู้ก่อตั้งและผู้บริหารสถาบัน LIFE Academy (14+ ปี)',
      'อดีตอาจารย์ประจำวิชาชีววิทยา โรงเรียน ม.อ.วิทยานุสรณ์ (2549-2551)',
      'วิทยากรโครงการพัฒนาครู สพฐ. หัวข้อ "ปั้นเด็กเก่ง ดี มีความสุข"',
      'ผู้เขียนหนังสือธรรมะจัดพิมพ์ระดับประเทศ "ปาฏิหาริย์แห่งธรรม"'
    ],
    achievements: [
      'ศิษย์เก่าดีเด่น สาขาคุณธรรมจริยธรรม คณะวิทยาศาสตร์ ม.อ. ประจำปี 2565',
      'คะแนนสอบคณิตศาสตร์ อันดับ 1 (100 คะแนนเต็ม) ระดับประเทศ (Pre-ent ม.ต้น)',
      'ชนะเลิศการคัดเลือกตัวแทนนักเรียนรางวัลพระราชทาน ประจำจังหวัดสตูล'
    ],
    specialty: 'ผู้เชี่ยวชาญการแนะแนวการเรียน การวางแผนชีวิต และการสอนวิชาชีววิทยาอย่างสร้างสรรค์',
    color: 'from-blue-600 to-[#1a56db]',
    initials: 'CEO'
  },
  {
    name: 'อาลาวี มูลทรัพย์',
    nickname: 'ครูวี',
    role: 'General Manager & Mathematics Tutor / ผู้จัดการทั่วไป',
    image: '/manager.jpg',
    cvImage: '/teachers/cv-wee.jpg',
    quote: '“เน้นความเข้าใจในเนื้อหาเพื่อสร้างเทคนิคและแนวทางการวิเคราะห์โจทย์ ถ้าเข้าใจ เจอโจทย์แบบไหนก็ไม่หวั่น”',
    education: [
      'วท.บ. (เกียรตินิยมอันดับ 2) ภาควิชาวิทยาศาสตร์ประยุกต์ เคมี-ชีววิทยา มหาวิทยาลัยสงขลานครินทร์ (ม.อ.)',
      'ได้รับทุนการศึกษาผลการเรียนดีเด่น และทุนผู้ช่วยสอน (Teaching Assistant) ม.อ.',
      'อดีตผู้ช่วยวิจัยและผู้ช่วยอาจารย์ ณ สถาบันชีววิทยาศาสตร์โมเลกุล มหาวิทยาลัยมหิดล'
    ],
    experience: [
      'ผู้จัดการทั่วไปสถาบัน LIFE Tutor หาดใหญ่ (ดูแลตารางสอนและความปลอดภัยนักเรียน)',
      'ติวเตอร์วิชาคณิตศาสตร์ประจำสถาบัน LIFE Tutor (2562 - ปัจจุบัน)',
      'ร่วมผลิตและทำคลิปวิเคราะห์แนวข้อสอบเข้า ม.1 และ ม.4 ร่วมกับทรูปลูกปัญญา (VCOURSE)',
      'วิทยากรติวคณิตศาสตร์ให้กับโรงเรียนชั้นนำ เช่น รร.หาดใหญ่พิทยาคม, รร.วรพัฒน์, รร.ปากพนัง'
    ],
    achievements: [
      'รางวัล Outstanding category และ Popular vote การนำเสนอผลงานวิจัยวิชาการ ม.อ.',
      'พัฒนาวิเคราะห์ระบบประเมินและจัดสอบวัดระดับความรู้ระดับบุคคล (Level Test)'
    ],
    specialty: 'เชี่ยวชาญการปูพื้นฐานคณิตศาสตร์และการคิดวิเคราะห์ระดับแข่งขัน สสวท., TEDET, O-NET และห้องเรียนโครงการพิเศษ (SMA, SMT, SMTE, EP)',
    color: 'from-[#f59e0b] to-amber-600',
    initials: 'MATH'
  },
  {
    name: 'มิ่งขวัญ จุลวรรณา',
    nickname: 'ครูมิ่ง',
    role: 'English Language Specialist / หัวหน้าทีมวิชาการภาษาอังกฤษ',
    image: '/teachers/cv-ming.jpg', // ใช้รูปใบประวัติเนื่องจากยังไม่มีรูปหน้าตรงเฉพาะ
    cvImage: '/teachers/cv-ming.jpg',
    quote: '“สร้างสรรค์การเรียนรู้ภาษาอังกฤษจากโครงสร้างแกรมม่าที่เข้าใจง่าย สู่การประยุกต์ใช้งานได้จริงในระดับสากล”',
    education: [
      'ศศ.ม. (ปริญญาโท) ด้านภาษาศาสตร์และการศึกษาภาษาอังกฤษ (Linguistics and English Language Studies) จาก Universiti Sains Malaysia (USM), ประเทศมาเลเซีย',
      'ศศ.บ. (ปริญญาตรี) ภาควิชาภาษาอังกฤษ คณะมนุษยศาสตร์และสังคมศาสตร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี'
    ],
    experience: [
      'วิทยากรพิเศษบรรยายวิชาภาษาอังกฤษพื้นฐาน 1 และ 2 ณ มหาวิทยาลัยหาดใหญ่',
      'ติวเตอร์วิชาภาษาอังกฤษ คอร์สติวสอบเข้า ม.1 / ม.4 และเตรียมนักเรียนเข้าศึกษาต่อต่างประเทศ',
      'วิทยากรติวเข้ม O-NET และ GAT ให้แก่โรงเรียนชั้นนำระดับจังหวัด เช่น รร.วิเชียรมาตุ, รร.สภาราชินี จ.ตรัง, รร.ปลายพระยา จ.กระบี่, รร.ปากพะยูน จ.พัทลุง',
      'ผู้ออกแบบคอร์สพิเศษประยุกต์ภาษาอังกฤษ เช่น Speak out loud (ภาษาอังกฤษธุรกิจ) และ Born to be Cadet (เตรียมสอบทหาร/ตำรวจ)'
    ],
    specialty: 'ผู้เชี่ยวชาญด้านภาษาศาสตร์ ไวยากรณ์เชิงลึก เทคนิคการพิชิตข้อสอบ GAT/O-NET/IELTS และการสื่อสารภาษาอังกฤษเชิงธุรกิจ',
    color: 'from-emerald-500 to-teal-600',
    initials: 'ENG'
  },
  {
    name: 'เอราวัตร ชูหนูขาว',
    nickname: 'ครูเติ้ล',
    role: 'HR Manager & Thai Language Tutor / หัวหน้าฝ่ายทรัพยากรมนุษย์',
    image: '/teachers/cv-tle.jpg', // ใช้รูปใบประวัติเนื่องจากยังไม่มีรูปหน้าตรงเฉพาะ
    cvImage: '/teachers/cv-tle.jpg',
    quote: '“ความเข้าใจสำคัญกว่าการจดจำ เพราะความเข้าใจช่วยให้เราจดจำสิ่งต่าง ๆ ได้ลึกซึ้งและยาวนานขึ้น”',
    education: [
      'ศิลปศาสตรบัณฑิต คณะมนุษยศาสตร์และสังคมศาสตร์ สาขาวิชาเอกการพัฒนาสังคม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี'
    ],
    experience: [
      'หัวหน้าฝ่ายทรัพยากรมนุษย์ (HR Manager) ดูแลการคัดสรรบุคลากรและพัฒนาศักยภาพทีมงาน',
      'ติวเตอร์วิชาภาษาไทยประจำสถาบัน LIFE Tutor หาดใหญ่ (ประสบการณ์สอนยาวนานตั้งแต่ปี 2551)',
      'วิทยากรด้านกระบวนการ ICE Breaking เพื่อละลายพฤติกรรมและพัฒนาศักยภาพการทำงานร่วมกัน',
      'อาจารย์พิเศษวิชาภาษาไทยระดับประถม-มัธยม ณ โรงเรียนเสนาพงศ์ และโรงเรียนส่งเสริมศาสนาวิทยามูลนิธิ'
    ],
    specialty: 'เชี่ยวชาญการสอนภาษาไทยที่เชื่อมโยงความเข้าใจหลักภาษา เทคนิคการวิเคราะห์ข้อเขียน และจิตวิทยาการจูงใจพัฒนาทักษะชีวิต (Soft Skills) ของผู้เรียน',
    color: 'from-rose-500 to-red-600',
    initials: 'TH'
  }
]

export default function TeachersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-24 px-4 text-center overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl translate-y-1/2"></div>
        
        <div className="relative container-max z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-ui font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" /> TEAM & LEADERSHIP
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            คณะผู้บริหารและ<span className="text-[#f59e0b]">ครูผู้สอน</span>
          </h1>
          <p className="font-thai text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            ทีมวิชาการและผู้บริหารระดับคุณภาพของ LIFE Academy หาดใหญ่ ผู้พัฒนาหลักสูตร ปั้นผลสำเร็จเยาวชน และเคียงข้างดูแลนักเรียนและผู้ปกครองอย่างใกล้ชิด
          </p>
        </div>
      </section>

      {/* Teachers Detail Section */}
      <section className="section bg-[#f8fafc] py-20">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="section-tag">แนะนำบุคลากรหลัก</span>
            <h2 className="section-title mt-2">ทำความรู้จักคุณครูผู้ผลักดันศักยภาพเด็ก ๆ</h2>
            <p className="section-subtitle mx-auto">
              ท่านสามารถดาวน์โหลดใบประวัติการสอน ใบคุณวุฒิ และเกียรติประวัติเต็มรูปแบบของคุณครูแต่ละท่านได้ทันที
            </p>
          </div>

          <div className="space-y-16">
            {mainTeachers.map((teacher, idx) => (
              <div 
                key={teacher.name}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 grid lg:grid-cols-12 gap-0 group"
              >
                {/* Image Grid Area */}
                <div className="lg:col-span-4 relative bg-slate-100 aspect-[4/5] lg:aspect-auto overflow-hidden min-h-[350px]">
                  <img
                    src={teacher.image}
                    alt={`${teacher.name} (${teacher.nickname})`}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  <div className={`absolute top-5 left-5 bg-gradient-to-r ${teacher.color} text-white px-3.5 py-1.5 rounded-2xl shadow-sm text-xs font-ui font-extrabold tracking-wider`}>
                    {teacher.initials}
                  </div>

                  {/* Mobile Name Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white lg:hidden">
                    <span className="font-thai text-sm text-[#f59e0b] font-bold block">{teacher.role}</span>
                    <h3 className="font-display font-extrabold text-2xl mt-0.5">{teacher.name} ({teacher.nickname})</h3>
                  </div>
                </div>

                {/* Content Grid Area */}
                <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Header Desktop */}
                    <div className="hidden lg:block border-b border-slate-100 pb-5 mb-5">
                      <span className="font-thai text-sm text-[#f59e0b] font-bold uppercase tracking-wider">{teacher.role}</span>
                      <h3 className="font-display font-extrabold text-3xl text-[#0f2557] mt-1">
                        {teacher.name} <span className="text-[#1a56db]">({teacher.nickname})</span>
                      </h3>
                    </div>

                    {/* Quote */}
                    <p className="font-thai italic font-semibold text-[#1a56db] text-sm sm:text-base leading-relaxed bg-[#f0f4ff]/50 px-4 py-3.5 border-l-4 border-[#f59e0b] rounded-r-2xl mb-6">
                      {teacher.quote}
                    </p>

                    {/* Resume Details Grid */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-8 text-sm">
                      {/* Education Column */}
                      <div className="space-y-3">
                        <h4 className="font-ui font-extrabold text-xs text-[#0f2557] tracking-wider flex items-center gap-1.5 uppercase">
                          🎓 ประวัติการศึกษา
                        </h4>
                        <ul className="space-y-2 font-thai text-[#475569] leading-relaxed">
                          {teacher.education.map((edu, index) => (
                            <li key={index} className="flex items-start gap-1.5">
                              <span className="text-[#1a56db] font-bold mt-0.5">•</span>
                              <span>{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Experience Column */}
                      <div className="space-y-3">
                        <h4 className="font-ui font-extrabold text-xs text-[#0f2557] tracking-wider flex items-center gap-1.5 uppercase">
                          💼 ประวัติการทำงานและการสอน
                        </h4>
                        <ul className="space-y-2 font-thai text-[#475569] leading-relaxed">
                          {teacher.experience.map((exp, index) => (
                            <li key={index} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold mt-0.5">•</span>
                              <span>{exp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Achievements (Optional) */}
                    {teacher.achievements && teacher.achievements.length > 0 && (
                      <div className="border-t border-slate-100 pt-5 mb-8">
                        <h4 className="font-ui font-extrabold text-xs text-[#0f2557] tracking-wider flex items-center gap-1.5 uppercase mb-3">
                          🏆 เกียรติรางวัลและผลงานเด่น
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {teacher.achievements.map((ach, index) => (
                            <div key={index} className="flex items-center gap-2 font-thai text-[#475569] text-xs">
                              <Award className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                              <span className="leading-relaxed">{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specialty Section */}
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs sm:text-sm font-thai text-[#475569]">
                      <span className="font-bold text-[#0f2557]">💡 จุดเน้นและความเชี่ยวชาญ:</span> {teacher.specialty}
                    </div>
                  </div>

                  {/* Action Bar (Download & Contact) */}
                  <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-ui font-bold">
                      <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      วิชาการมาตรฐานสากล
                    </div>

                    {/* Download Button */}
                    <a
                      href={teacher.cvImage}
                      download={`Resume_${teacher.nickname}_LIFE_Academy.jpg`}
                      className="inline-flex items-center justify-center gap-2 bg-[#0f2557] hover:bg-[#1a56db] text-white font-ui font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-slate-900/10 hover:shadow-lg transition-all duration-200"
                    >
                      <Download className="w-4 h-4" />
                      ดาวน์โหลดใบประวัติครู (Infographic)
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="section bg-white py-20">
        <div className="container-max">
          <div className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-2xl translate-x-1/3 translate-y-1/3"></div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10">
              <div className="lg:col-span-2">
                <span className="font-ui text-[#f59e0b] font-extrabold text-xs tracking-wider uppercase">OUR PROMISE & CARE</span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl mt-2 mb-4 leading-snug">
                  ส่งมอบการดูแลทางวิชาการและผลลัพธ์ที่ดีที่สุดสำหรับลูกของคุณ
                </h3>
                <p className="font-thai text-white/70 text-sm md:text-base leading-relaxed">
                  เราเชื่อมั่นว่าเด็กแต่ละคนมีเวลาในการเติบโตและความเข้าใจที่แตกต่างกัน คณะผู้บริหารและคุณครูทุกท่านจึงมุ่งดูแลนักเรียนเป็นรายบุคคล ปรับยุทธวิธีและเนื้อหาให้สอดคล้องกับพัฒนาการของเด็กอย่างแท้จริง
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col justify-center lg:items-end">
                <a href="/level-test" className="btn-primary bg-[#f59e0b] text-[#0f2557] hover:bg-[#d97706] text-center py-3.5 font-bold shadow-md shadow-amber-500/10">
                  ทดสอบวัดระดับเรียน
                </a>
                <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white/10 text-center py-3.5 flex items-center justify-center gap-1.5">
                  <MessageCircle className="w-4 h-4" /> แอดไลน์คุยกับสถาบัน
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

