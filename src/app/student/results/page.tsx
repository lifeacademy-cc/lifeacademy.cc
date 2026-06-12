'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  TrendingUp, Star, Award, BookOpen, Clock,
  ArrowLeft, CheckCircle2, AlertCircle, Info, FileText
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts'

// --- HIGH-FIDELITY MOCK FALLBACK DATA ---
const mockTestResults = [
  { 
    id: 'r1', 
    courseName: 'คณิตศาสตร์ ม.ต้น (เน้นสอบเข้มข้น)', 
    test_type: 'pre', 
    score: 45, 
    max_score: 100, 
    test_date: '2026-03-16', 
    notes: 'ประเมินความรู้คณิตศาสตร์พื้นฐานก่อนเรียน' 
  },
  { 
    id: 'r2', 
    courseName: 'คณิตศาสตร์ ม.ต้น (เน้นสอบเข้มข้น)', 
    test_type: 'midterm', 
    score: 72, 
    max_score: 100, 
    test_date: '2026-04-20', 
    notes: 'สอบกลางภาค ครอบคลุมเรื่องระบบสมการเชิงเส้น' 
  },
  { 
    id: 'r3', 
    courseName: 'คณิตศาสตร์ ม.ต้น (เน้นสอบเข้มข้น)', 
    test_type: 'post', 
    score: 88, 
    max_score: 100, 
    test_date: '2026-05-18', 
    notes: 'ประเมินปลายภาคเรียน ผลงานยอดเยี่ยม พัฒนาการรวดเร็ว' 
  },
  { 
    id: 'r4', 
    courseName: 'ภาษาอังกฤษ TCAS (A-Level)', 
    test_type: 'pre', 
    score: 55, 
    max_score: 100, 
    test_date: '2026-03-20', 
    notes: 'วัดระดับความรู้ภาษาอังกฤษ Vocabulary & Reading' 
  },
  { 
    id: 'r5', 
    courseName: 'ภาษาอังกฤษ TCAS (A-Level)', 
    test_type: 'post', 
    score: 82, 
    max_score: 100, 
    test_date: '2026-05-22', 
    notes: 'ประเมินระดับความพร้อมสอบจริง ทำคะแนนผ่านเกณฑ์เยี่ยม' 
  }
]

const mockComment = 'น้องภูมินทร์ มีพัฒนาการที่น่าประทับใจมากในวิชาคณิตศาสตร์และภาษาอังกฤษ ผลสอบกลางภาคและปลายภาคเรียนชี้ให้เห็นชัดเจนว่าน้องมีความเข้าใจในหลักการและสามารถประยุกต์ใช้ในการแก้โจทย์ระดับแข่งขันได้เป็นอย่างดี ครูขอเน้นย้ำให้น้องฝึกฝนเพิ่มในส่วนของความละเอียดรอบคอบในการคำนวณ เพื่อให้พร้อมกวาดคะแนนสอบเข้า ม.4 ได้แบบเต็มเม็ดเต็มหน่วยครับ!'

export default function StudentResultsPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [results, setResults] = useState<any[]>(mockTestResults)
  const [isLoading, setIsLoading] = useState(true)
  const [isMockMode, setIsMockMode] = useState(false)

  // Fetch test results
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (!currentUser) {
          setIsMockMode(true)
          setIsLoading(false)
          return
        }
        setUser(currentUser)

        // Fetch user's test results
        const { data: dbResults } = await supabase
          .from('test_results')
          .select('*, courses(*)')
          .eq('student_id', currentUser.id)
          .order('test_date', { ascending: true })

        if (dbResults && dbResults.length > 0) {
          const formatted = dbResults.map(r => ({
            id: r.id,
            courseName: r.courses?.name || 'หลักสูตรเรียนพิเศษ',
            test_type: r.test_type,
            score: Number(r.score),
            max_score: Number(r.max_score),
            test_date: r.test_date,
            notes: r.notes || 'บันทึกคะแนนการประเมินรายวิชา'
          }))
          setResults(formatted)
        } else {
          setIsMockMode(true)
        }
      } catch (err) {
        console.error('Supabase load results error, using mock data:', err)
        setIsMockMode(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Format Recharts data (Pre vs Post test tracking)
  const chartData = [
    { name: 'วัดผลครั้งที่ 1 (Pre)', 'คณิตศาสตร์': 45, 'ภาษาอังกฤษ': 55, 'เกณฑ์ผ่าน': 60 },
    { name: 'วัดผลครั้งที่ 2 (Mid)', 'คณิตศาสตร์': 72, 'ภาษาอังกฤษ': 68, 'เกณฑ์ผ่าน': 60 },
    { name: 'วัดผลครั้งที่ 3 (Post)', 'คณิตศาสตร์': 88, 'ภาษาอังกฤษ': 82, 'เกณฑ์ผ่าน': 60 }
  ]

  const getTestTypeLabel = (type: string) => {
    switch (type) {
      case 'pre': return 'วัดระดับก่อนเรียน (Pre-Test)'
      case 'midterm': return 'สอบกลางภาค (Midterm)'
      case 'post': return 'วัดระดับปลายภาค (Post-Test)'
      case 'monthly': return 'สอบเก็บคะแนนประจำเดือน'
      case 'mock': return 'สอบจำลองเสมือนจริง'
      case 'final': return 'สอบปลายวิชา (Final)'
      default: return 'ทดสอบทักษะย่อย'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-thai relative">
      
      {/* Header Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/student/dashboard" className="font-ui font-bold text-text-muted hover:text-[#1a56db] flex items-center gap-1.5 text-xs transition-colors">
              <ArrowLeft className="w-4 h-4" /> แดชบอร์ดผู้เรียน
            </Link>
            <span className="text-border/60">|</span>
            <span className="font-thai text-[#0f2557] text-xs font-bold bg-[#f0f4ff] border border-blue-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#1a56db]" /> สมุดรายงานผลสอบ
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isMockMode && (
              <span className="text-[9px] font-bold bg-amber-50 text-[#f59e0b] border border-amber-200 px-2 py-0.5 rounded-md">
                SIMULATION MODE
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Page Banner */}
        <div className="bg-gradient-to-br from-[#0f2557] via-[#102a69] to-[#1a56db] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl flex items-center gap-2">
              <Award className="w-7 h-7 text-[#f59e0b]" /> สมุดบันทึกผลคะแนนและพัฒนาการเรียน
            </h1>
            <p className="font-thai text-white/70 text-xs sm:text-sm max-w-2xl leading-relaxed">
              ติดตามรายงานสรุปผลการทดสอบย่อยและการประเมินประมวลผลปลายภาคเรียนอย่างเป็นระบบ พร้อมดูวิวัฒนาการทักษะอย่างละเอียดผ่านกราฟความก้าวหน้า
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
            <p className="font-thai text-text-muted text-xs font-semibold">กำลังตรวจสอบสถิติคะแนนสะสม...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Left/Middle Column - Charts and Log */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 1. Recharts Area Chart */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left">
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
                  <h2 className="font-ui font-extrabold text-[#0f2557] text-base flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#1a56db]" /> กราฟประเมินการพัฒนาแบบทริปเปิ้ล (Triple Progress Area)
                  </h2>
                  <span className="text-[9px] font-bold text-[#1a56db] bg-[#f0f4ff] px-2 py-0.5 rounded-md">
                    เกณฑ์ผ่าน 60%
                  </span>
                </div>

                <div className="w-full h-[280px] font-thai text-[10px] sm:text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="mathColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1a56db" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#1a56db" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="englishColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} dy={8} />
                      <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[0, 100]} dx={-8} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '16px',
                          boxShadow: '0 4px 20px rgba(15,37,87,0.06)'
                        }}
                        labelStyle={{ fontWeight: 'bold', color: '#0f2557', marginBottom: '4px' }}
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
                      <Area type="monotone" dataKey="คณิตศาสตร์" stroke="#1a56db" strokeWidth={3} fillOpacity={1} fill="url(#mathColor)" activeDot={{ r: 6 }} />
                      <Area type="monotone" dataKey="ภาษาอังกฤษ" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#englishColor)" activeDot={{ r: 6 }} />
                      <Area type="monotone" dataKey="เกณฑ์ผ่าน" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 5" fillOpacity={0} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 2. Detailed results table log */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left">
                <h2 className="font-ui font-extrabold text-[#0f2557] text-base border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#1a56db]" /> ประวัติบันทึกคะแนนสอบอย่างละเอียด
                </h2>

                <div className="space-y-3.5">
                  {results.map((r) => {
                    const pct = Math.round((r.score / r.max_score) * 100)
                    return (
                      <div key={r.id} className="p-4.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#1a56db]/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="font-ui font-black text-[#0f2557] text-sm leading-snug">
                            {r.courseName}
                          </div>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted font-semibold">
                            <span className="bg-[#f0f4ff] text-[#1a56db] px-2 py-0.5 rounded-md text-[10px]">
                              {getTestTypeLabel(r.test_type)}
                            </span>
                            <span className="flex items-center gap-1">
                              📅 สอบวันที่: {new Date(r.test_date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>

                          {r.notes && (
                            <p className="text-[11px] font-thai text-slate-500 italic leading-relaxed pt-1">
                              &ldquo; {r.notes} &rdquo;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 shrink-0">
                          <div className="text-left sm:text-right">
                            <div className="text-[10px] text-text-muted font-bold font-thai">คะแนนสอบประเมิน</div>
                            <div className="font-ui font-black text-base text-[#0f2557] mt-0.5">
                              {r.score} / {r.max_score} <span className="text-xs text-text-muted">({pct}%)</span>
                            </div>
                          </div>

                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
                            ${pct >= 80 ? 'bg-emerald-50 text-emerald-600'
                              : pct >= 60 ? 'bg-amber-50 text-amber-600'
                              : 'bg-rose-50 text-rose-600'
                            }
                          `}>
                            {pct >= 60 ? <CheckCircle2 className="w-5.5 h-5.5" /> : <AlertCircle className="w-5.5 h-5.5" />}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Right Column - Academic Comments & Trust Assurance */}
            <div className="space-y-6">
              
              {/* Teacher Academic Feedback Comment Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#f59e0b]/5 to-transparent rounded-full blur-lg pointer-events-none" />
                
                <h3 className="font-ui font-extrabold text-[#0f2557] text-sm mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Star className="w-4.5 h-4.5 text-[#f59e0b] fill-[#f59e0b]" /> ความคิดเห็นโดยสังเขปจากสถาบัน
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs font-thai text-slate-700 leading-relaxed italic relative">
                    &ldquo; {mockComment} &rdquo;
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0f2557] to-[#1a56db] flex items-center justify-center text-white text-xs font-bold font-ui">
                        LA
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0f2557]">ฝ่ายประเมินผลการเรียน</div>
                        <div className="text-[9px] text-text-muted mt-0.5">LIFE Academy Hatyai</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[9px] text-text-muted font-semibold">รับรองความถูกต้อง</div>
                      <div className="font-ui text-xs font-black text-[#0f2557] italic mt-1 select-none">
                        Academic Team
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress tips advice list card */}
              <div className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] rounded-3xl p-6 text-white shadow-md relative overflow-hidden text-left">
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <h4 className="font-ui font-extrabold text-sm text-[#f59e0b] mb-3">🏅 เคล็ดลับการพิชิตข้อสอบ</h4>
                <ul className="text-left font-thai text-[11px] text-white/80 space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>**ทบทวนโจทย์เดิมย้ำ ๆ**: การวิเคราะห์จุดผิดจากใบสอบย่อยช่วยป้องกันการผิดซ้ำได้ถึง 80%</li>
                  <li>**นัดจองคาบเสริม**: หากมีบทเรียนใดที่ได้คะแนนสอบเฉลี่ยต่ำกว่า 60% กรุณาใช้สิทธิ์จองห้องชดเชยเพื่อทบทวนรายคน</li>
                  <li>**ฝึกวินัยการเข้าเรียนสม่ำเสมอ**: อัตราการเข้าเรียนที่สูงกว่า 95% มีความสัมพันธ์โดยตรงกับระดับเกรดสอบสะสมที่ระดับดีเยี่ยม</li>
                </ul>
              </div>

              {/* FAQ Advice for parents */}
              <div className="p-4.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-left">
                <Info className="w-5 h-5 text-[#1a56db] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-ui font-bold text-xs text-[#1e3a8a]">🎓 ข้อมูลการสอบเข้าโรงเรียนชั้นนำ</h4>
                  <p className="font-thai text-[11px] text-[#1e3a8a] leading-relaxed">
                    สถาบันมีการจัดการจำลองสอบ (Mock Exam) ทุกเดือนเพื่อช่วยให้น้อง ๆ ชินกับบรรยากาศสนามจริง โดยผลคะแนนสอบจำลองจะขึ้นรายงานในหน้านี้โดยอัตโนมัติเช่นกัน
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  )
}
