'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Star, Award, CheckCircle2, ChevronRight, MessageCircle, Phone, Loader2, Sparkles } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils/format'
import type { LevelTestInput, LevelTestResult, ApiResponse } from '@/types'

const levels = [
  { value: 'primary', label: 'ประถมศึกษา (ป.1–6)', icon: '🎒' },
  { value: 'secondary', label: 'มัธยมต้น (ม.1–3)', icon: '📐' },
  { value: 'high', label: 'มัธยมปลาย (ม.4–6)', icon: '🧪' },
  { value: 'exam', label: 'เตรียมสอบ (TCAS/A-Level)', icon: '🎓' },
]

const subjects = [
  { value: 'math', label: 'คณิตศาสตร์', icon: '📐' },
  { value: 'english', label: 'ภาษาอังกฤษ', icon: '🔤' },
  { value: 'science', label: 'วิทยาศาสตร์', icon: '🔬' },
]

const goals = [
  { value: 'improve', label: 'ปรับปรุงพื้นฐาน & พัฒนาคะแนนเรียน', icon: '📈' },
  { value: 'exam', label: 'เตรียมสอบปลายภาค / สอบเข้าโรงเรียนดัง / มหาวิทยาลัย', icon: '🎯' },
  { value: 'maintain', label: 'รักษาเกรด & เสริมโจทย์ท้าทายระดับสูง', icon: '🏆' },
]

// Quiz Questions Bank
interface Question {
  id: number
  text: string
  options: string[]
  answerIdx: number
}

const quizQuestions: Record<string, Question[]> = {
  math: [
    { id: 1, text: 'แก้สมการ: 5x + 3 = 18. ค่าของ x คือข้อใด?', options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'], answerIdx: 1 },
    { id: 2, text: 'ซื้อสินค้าราคา 500 บาท ได้รับส่วนลด 15% จะต้องจ่ายเงินกี่บาท?', options: ['400 บาท', '425 บาท', '450 บาท', '475 บาท'], answerIdx: 1 },
    { id: 3, text: 'พื้นที่ของรูปสามเหลี่ยมที่มีฐานยาว 10 ซม. และสูง 6 ซม. คือข้อใด?', options: ['15 ตร.ซม.', '30 ตร.ซม.', '45 ตร.ซม.', '60 ตร.ซม.'], answerIdx: 1 },
    { id: 4, text: 'ถ้า 2^(x-1) = 8 แล้ว x มีค่าเท่าใด?', options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'], answerIdx: 2 },
    { id: 5, text: 'อัตราส่วนชายต่อหญิงเป็น 3:5 ถ้ามีชาย 15 คน จะมีผู้หญิงกี่คน?', options: ['20 คน', '25 คน', '30 คน', '35 คน'], answerIdx: 1 },
  ],
  english: [
    { id: 1, text: 'She ______ to school by bus every day.', options: ['go', 'goes', 'going', 'went'], answerIdx: 1 },
    { id: 2, text: 'If it rains tomorrow, we ______ the football match.', options: ['will cancel', 'cancel', 'cancelled', 'would cancel'], answerIdx: 0 },
    { id: 3, text: 'He has been interested ______ learning astronomy for years.', options: ['at', 'on', 'in', 'to'], answerIdx: 2 },
    { id: 4, text: 'Choose the synonym of the word "Cheerful":', options: ['Sad', 'Angry', 'Happy', 'Bored'], answerIdx: 2 },
    { id: 5, text: 'We ______ this wonderful movie three times already.', options: ['saw', 'have seen', 'see', 'seen'], answerIdx: 1 },
  ],
  science: [
    { id: 1, text: 'ดาวเคราะห์ดวงใดในระบบสุริยะที่อยู่ใกล้ดวงอาทิตย์มากที่สุด?', options: ['ดาวศุกร์', 'ดาวพุธ', 'ดาวอังคาร', 'โลก'], answerIdx: 1 },
    { id: 2, text: 'กระบวนการสังเคราะห์ด้วยแสงของพืชเกิดขึ้นที่ออร์แกเนลล์ใดเป็นหลัก?', options: ['นิวเคลียส', 'ไมโทคอนเดรีย', 'คลอโรพลาสต์', 'ผนังเซลล์'], answerIdx: 2 },
    { id: 3, text: 'แก๊สชนิดใดที่มีสัดส่วนปริมาณมากที่สุดในชั้นบรรยากาศโลก?', options: ['ออกซิเจน', 'คาร์บอนไดออกไซด์', 'ไนโตรเจน', 'ไฮโดรเจน'], answerIdx: 2 },
    { id: 4, text: 'แรงโน้มถ่วงของโลกทำให้วัตถุตกลงสู่พื้นด้วยความเร่งประมาณเท่าใด?', options: ['g ≈ 5.5 m/s²', 'g ≈ 9.8 m/s²', 'g ≈ 12.0 m/s²', 'g ≈ 1.5 m/s²'], answerIdx: 1 },
    { id: 5, text: 'สารใดในข้อต่อไปนี้จัดว่าเป็น "สารประกอบ"?', options: ['เหล็ก (Fe)', 'น้ำ (H₂O)', 'อากาศ', 'ทองแดง (Cu)'], answerIdx: 1 },
  ],
}

export default function LevelTestInteractive() {
  const [step, setStep] = useState(1) // 1: Setup, 2: Quiz, 3: Register Modal/Result
  const [level, setLevel] = useState('')
  const [subject, setSubject] = useState('')
  const [goal, setGoal] = useState('')
  
  // Quiz states
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isPending, startTransition] = useTransition()
  
  // Lead info states (Quick Register Modal before showing results)
  const [showRegModal, setShowRegModal] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [phone, setPhone] = useState('')
  
  // Result states
  const [result, setResult] = useState<LevelTestResult | null>(null)
  const [scorePercent, setScorePercent] = useState(0)

  const activeQuestions = quizQuestions[subject] || quizQuestions.math

  const handleNextStep1 = () => {
    if (level && subject && goal) {
      setStep(2)
      setQIdx(0)
      setAnswers({})
    }
  }

  const handleAnswerSelect = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [activeQuestions[qIdx].id]: optIdx }))
    if (qIdx < activeQuestions.length - 1) {
      setTimeout(() => setQIdx(prev => prev + 1), 300)
    } else {
      // Finished all questions! Trigger quick registration to lock lead and get results
      setTimeout(() => setShowRegModal(true), 400)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName || !phone) return

    startTransition(async () => {
      try {
        // Calculate score
        let correctCount = 0
        activeQuestions.forEach(q => {
          if (answers[q.id] === q.answerIdx) correctCount++
        })
        const scorePct = (correctCount / activeQuestions.length) * 100
        setScorePercent(scorePct)

        // 1. Submit lead to Inquiry endpoint
        await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: studentName,
            phone,
            level,
            subject,
            format: 'onsite',
            message: `[Level Test Quiz] คะแนนทำได้: ${correctCount}/${activeQuestions.length} (${scorePct}%) | เป้าหมาย: ${goal}`,
          }),
        })

        // 2. Fetch computed recommendation
        const testRes = await fetch('/api/level-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ level, subject, goal }),
        })
        const json: ApiResponse<LevelTestResult> = await testRes.json()

        if (json.success && json.data) {
          // Enrich strengths/weaknesses dynamically based on score
          const enriched = { ...json.data }
          if (scorePct >= 80) {
            enriched.strengths = ['ทำโจทย์ทดสอบระดับดีเยี่ยม', 'เข้าใจหลักการพื้นฐานแน่นมาก', ...enriched.strengths]
            enriched.description = `คุณทำคะแนนทดสอบได้ดีเยี่ยม (${scorePct}%)! แสดงว่ามีทักษะและพื้นฐานวิชา${subjects.find(s => s.value === subject)?.label}ที่ดีมาก เหมาะแก่การเสริมโจทย์ระดับท้าทายและการเตรียมสอบแข่งขันอย่างเข้มข้น`
          } else if (scorePct >= 50) {
            enriched.strengths = ['เข้าใจหลักการพื้นฐานระดับปานกลาง', ...enriched.strengths]
            enriched.weaknesses = ['ยังทำผิดพลาดในจุดคำนวณซับซ้อน', ...enriched.weaknesses]
            enriched.description = `คุณทำคะแนนทดสอบระดับปานกลาง (${scorePct}%)! แนะนำให้เริ่มต้นหลักสูตรเพื่อปิดจุดบกพร่องและฝึกฝนเทคนิคการคิดเป็นระบบเพิ่มเติมเพื่อทำคะแนนให้ดีขึ้น`
          } else {
            enriched.weaknesses = ['พื้นฐานความเข้าใจหลักการยังไม่มั่นคง', 'สับสนจุดสูตรสำคัญ', ...enriched.weaknesses]
            enriched.description = `คุณทำคะแนนทดสอบระดับพื้นฐาน (${scorePct}%)! แนะนำอย่างยิ่งให้เริ่มต้นหลักสูตรปรับพื้นฐานและฝึกฝนความเข้าใจอย่างค่อยเป็นค่อยไปร่วมกับครูประจำตัวเพื่อความมั่นใจ`
          }

          setResult(enriched)
          setShowRegModal(false)
          setStep(3)
        }
      } catch (err) {
        console.error('Quiz recommendation fetch failed:', err)
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {/* STEP 1: PARAMETER SETUP */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="card border border-border/40 p-6 sm:p-8 space-y-6 shadow-xl"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f4ff] text-[#1a56db] text-xs font-ui font-semibold border border-blue-100">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Evaluation
              </span>
              <h2 className="font-display font-bold text-2xl text-[#0f2557]">
                ระบบวิเคราะห์ประเมินระดับผู้เรียน
              </h2>
              <p className="font-thai text-text-muted text-xs sm:text-sm">
                เลือกข้อมูลเบื้องต้นเพื่อเริ่มทดสอบทำควิซ 5 ข้อประเมินจุดแข็ง-จุดอ่อนเฉพาะบุคคล
              </p>
            </div>

            {/* Form selections */}
            <div className="space-y-5 pt-2">
              {/* Level */}
              <div>
                <label className="field-label flex items-center gap-1.5">🎒 ระดับการศึกษา</label>
                <div className="grid grid-cols-2 gap-3">
                  {levels.map((l) => (
                    <button
                      key={l.value}
                      onClick={() => setLevel(l.value)}
                      className={cn(
                        'flex items-center gap-2 p-3 rounded-2xl border-2 text-left font-thai text-xs sm:text-sm transition-all',
                        level === l.value
                          ? 'border-[#1a56db] bg-[#f0f4ff] text-[#0f2557] font-semibold'
                          : 'border-border/60 hover:border-blue-200'
                      )}
                    >
                      <span className="text-base">{l.icon}</span> {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="field-label flex items-center gap-1.5">🔬 วิชาที่สนใจทดสอบ</label>
                <div className="grid grid-cols-3 gap-3">
                  {subjects.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSubject(s.value)}
                      className={cn(
                        'flex flex-col sm:flex-row items-center gap-2 p-3 rounded-2xl border-2 text-center sm:text-left font-thai text-xs sm:text-sm transition-all justify-center sm:justify-start',
                        subject === s.value
                          ? 'border-[#1a56db] bg-[#f0f4ff] text-[#0f2557] font-semibold'
                          : 'border-border/60 hover:border-blue-200'
                      )}
                    >
                      <span className="text-base">{s.icon}</span> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="field-label flex items-center gap-1.5">🎯 เป้าหมายสูงสุดการเรียน</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {goals.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setGoal(g.value)}
                      className={cn(
                        'flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left font-thai text-xs sm:text-sm transition-all',
                        goal === g.value
                          ? 'border-[#1a56db] bg-[#f0f4ff] text-[#0f2557] font-semibold'
                          : 'border-border/60 hover:border-blue-200'
                      )}
                    >
                      <span className="text-base">{g.icon}</span> {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={handleNextStep1}
                disabled={!level || !subject || !goal}
                className="btn-primary w-full justify-center py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed"
              >
                เริ่มทำแบบทดสอบ (5 ข้อ) <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: INTERACTIVE QUIZ */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="card border border-border/40 p-6 sm:p-8 space-y-6 shadow-xl"
          >
            {/* Header progress bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-ui text-text-muted">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 hover:text-[#0f2557] font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> ย้อนกลับ
                </button>
                <span className="font-semibold text-navy">ข้อที่ {qIdx + 1} จาก {activeQuestions.length}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1a56db] to-[#f59e0b] transition-all duration-300"
                  style={{ width: `${((qIdx + 1) / activeQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="py-2">
              <span className="badge text-[10px] bg-[#f59e0b]/15 text-[#d97706] font-bold font-ui mb-2 border border-amber-200">
                QUIZ QUESTION
              </span>
              <h3 className="font-thai font-bold text-lg sm:text-xl text-[#0f2557] leading-relaxed">
                {activeQuestions[qIdx].text}
              </h3>
            </div>

            {/* Option Buttons */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {activeQuestions[qIdx].options.map((opt, idx) => {
                const isSelected = answers[activeQuestions[qIdx].id] === idx
                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswerSelect(idx)}
                    className={cn(
                      'w-full p-4 rounded-2xl border-2 font-thai text-sm sm:text-base text-left transition-all hover:bg-slate-50 flex items-center justify-between',
                      isSelected 
                        ? 'border-[#1a56db] bg-[#f0f4ff] text-[#0f2557] font-semibold' 
                        : 'border-border/60'
                    )}
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center font-ui text-[10px] text-text-muted">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 3: RESULT DASHBOARD */}
        {step === 3 && result && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Dashboard Hero Header */}
            <div className="card bg-gradient-to-br from-[#0f2557] to-[#1a56db] text-white p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden border-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-ui font-semibold border border-white/10">
                    <Award className="w-3.5 h-3.5 text-[#f59e0b]" /> ASSESSMENT REPORT
                  </span>
                  <h2 className="font-display font-black text-2xl">ผลประเมินระดับควิซของคุณ</h2>
                  <p className="font-thai text-white/60 text-xs sm:text-sm">วิเคราะห์อัจฉริยะเชิงระบบ • LIFE Academy</p>
                </div>
                {/* Dynamic Score Ring */}
                <div className="w-20 h-20 rounded-full border-4 border-white/15 bg-white/10 flex items-center justify-center flex-shrink-0 relative">
                  <div className="text-center">
                    <span className="font-ui font-extrabold text-xl leading-none block">{scorePercent}%</span>
                    <span className="font-thai text-[9px] text-white/60 block mt-0.5">คะแนนทำได้</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="text-xs text-white/50 font-ui uppercase tracking-wider">ระดับชั้นเรียนแนะนำ</div>
                <div className="font-display font-extrabold text-xl text-[#f59e0b] flex items-center gap-2">
                  🎓 {result.recommendedLevel}
                </div>
                <p className="font-thai text-white/80 text-sm leading-relaxed pt-1">
                  {result.description}
                </p>
              </div>
            </div>

            {/* Strengths & Weaknesses grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="card p-6 border border-emerald-100 shadow-sm bg-white">
                <h3 className="font-ui font-bold text-[#059669] text-base mb-3 flex items-center gap-1.5">
                  👍 จุดแข็งที่โดดเด่น
                </h3>
                <ul className="space-y-2.5">
                  {result.strengths.map((str) => (
                    <li key={str} className="flex items-start gap-2.5 font-thai text-text text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                      {str}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="card p-6 border border-red-100 shadow-sm bg-white">
                <h3 className="font-ui font-bold text-[#dc2626] text-base mb-3 flex items-center gap-1.5">
                  ⚠️ จุดบกพร่องที่ต้องเสริม
                </h3>
                <ul className="space-y-2.5">
                  {result.weaknesses.map((weak) => (
                    <li key={weak} className="flex items-start gap-2.5 font-thai text-text text-xs sm:text-sm">
                      <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">!</div>
                      {weak}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Steps Timeline */}
            <div className="card p-6 sm:p-8 border border-border/40 shadow-md bg-white">
              <h3 className="font-ui font-bold text-[#0f2557] text-base mb-5 flex items-center gap-1.5">
                📅 เส้นทางวางแผนพัฒนาการเรียนรู้ (Personalized Learning Path)
              </h3>
              
              <div className="relative border-l border-border pl-6 ml-3 space-y-6">
                {[
                  { title: 'ระยะเริ่มต้น (สัปดาห์แรก)', desc: result.nextSteps[0] || 'ประเมินความเข้ากับครูประจำตัว' },
                  { title: 'เดือนที่ 1–2', desc: result.nextSteps[1] || 'ปรับปรุงพื้นฐานและปิดจุดบกพร่องสะสม' },
                  { title: 'เดือนที่ 3–4', desc: result.nextSteps[2] || 'เสริมความชำนาญโจทย์ปานกลางเพิ่มเกรด' },
                  { title: 'เดือนที่ 5–6', desc: result.nextSteps[3] || 'พร้อมสำหรับข้อสอบแข่งขันและเป้าหมายสูงสุด' },
                ].map((step, idx) => (
                  <div key={step.title} className="relative">
                    {/* timeline node */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-[#1a56db] bg-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1a56db]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-ui font-bold text-xs sm:text-sm text-[#0f2557]">{step.title}</h4>
                      <p className="font-thai text-text-muted text-xs sm:text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call To Action options */}
            <div className="card p-6 sm:p-8 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-border/60 shadow-sm text-center space-y-4">
              <h3 className="font-ui font-bold text-[#0f2557] text-base">คุยกับครูเพื่อรับสิทธิ์และข้อสอบตัวจริงฟรี</h3>
              <p className="font-thai text-text-muted text-xs max-w-lg mx-auto">
                ครูวิชา{subjects.find(s => s.value === subject)?.label} ได้รับรายงานผลควิซของนักเรียนเรียบร้อยแล้ว แนะนำให้รับการประเมินและขอคำปรึกษาเพิ่มเติมฟรีโดยไม่มีค่าใช้จ่าย
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <a
                  href="https://lin.ee/xvYZMZP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center bg-[#00b900] hover:bg-[#009e00] border-0 text-white font-bold px-6 text-sm"
                >
                  <MessageCircle className="w-4.5 h-4.5" /> ติดต่อครูทาง LINE OA
                </a>
                <button
                  onClick={() => { setStep(1); setResult(null); }}
                  className="btn-outline justify-center border-2 py-3.5 px-6 text-sm font-semibold"
                >
                  ทดสอบวิชาอื่นใหม่อีกครั้ง
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK REGISTRATION LEAD CAPTURE MODAL */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full relative z-10 space-y-5 border border-border/40"
          >
            <div className="text-center space-y-1.5">
              <span className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-2 text-xl">
                🎓
              </span>
              <h3 className="font-display font-extrabold text-navy text-xl">กรอกข้อมูลผู้เรียน</h3>
              <p className="font-thai text-text-muted text-xs leading-relaxed">
                กรอกข้อมูลสั้นๆ ด้านล่างเพื่อบันทึกและคำนวณผลประเมินจุดแข็ง-จุดอ่อน คลาสติวเตอร์ที่เหมาะสมกับเป้าหมายนักเรียน
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-1">
              <div>
                <label className="field-label">ชื่อผู้เรียน <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="ตัวอย่าง: น้องมุก สุขใจ"
                  className="field-input"
                />
              </div>

              <div>
                <label className="field-label">เบอร์โทรศัพท์ติดต่อกลับ <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="เช่น 0812345678"
                  className="field-input"
                />
              </div>

              <button
                type="submit"
                disabled={isPending || !studentName || !phone}
                className="btn-primary w-full justify-center py-4 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> กำลังประมวลผล...</>
                ) : (
                  <>ดูผลลัพธ์การประเมินอัจฉริยะ <ArrowRight className="w-4.5 h-4.5" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
