import { NextRequest, NextResponse } from 'next/server'
import type { LevelTestInput, LevelTestResult, ApiResponse } from '@/types'

// Rule-based recommendation (Phase 1)
// Will be upgraded to Claude AI in Phase 3
function computeRecommendation(input: LevelTestInput): LevelTestResult {
  const { level, subject, goal } = input

  const levelMap: Record<string, string> = {
    primary:   'ประถมศึกษา',
    secondary: 'มัธยมต้น',
    high:      'มัธยมปลาย',
    exam:      'เตรียมสอบ',
  }
  const subjectMap: Record<string, string> = {
    math: 'คณิตศาสตร์', english: 'ภาษาอังกฤษ',
    science: 'วิทยาศาสตร์', thai: 'ภาษาไทย',
    physics: 'ฟิสิกส์', chemistry: 'เคมี',
    biology: 'ชีววิทยา', social: 'สังคมศึกษา',
  }

  const subjectTh = subjectMap[subject] ?? subject
  const levelTh   = levelMap[level] ?? level

  // Strength/weakness heuristics
  const strengths: string[] = []
  const weaknesses: string[] = []

  if (goal === 'improve')     weaknesses.push(`พื้นฐาน${subjectTh}ที่ต้องเสริม`, 'วิธีคิดเป็นระบบ')
  if (goal === 'exam')        strengths.push('มีแรงจูงใจชัดเจน', 'รู้เป้าหมาย')
  if (goal === 'maintain')    strengths.push('มีพื้นฐานที่ดี', 'ต้องการรักษาระดับ')

  strengths.push('มีความตั้งใจเรียน', 'พร้อมรับคำแนะนำจากครู')
  weaknesses.push('ยังไม่มีระบบการเรียนที่ชัดเจน')

  const nextSteps = [
    `ทดสอบระดับฟรีกับครู${subjectTh}โดยตรง`,
    'เลือกคอร์สที่เหมาะกับระดับปัจจุบัน',
    'วางแผนการเรียน 3–6 เดือน',
    'ติดตามผลทุกเดือนกับครูประจำ',
  ]

  return {
    recommendedLevel: `${levelTh} — ${subjectTh}`,
    description: `จากข้อมูลที่ให้มา เราแนะนำให้เริ่มต้นด้วยหลักสูตร${subjectTh}ระดับ${levelTh}
      ซึ่งครอบคลุมเนื้อหาที่เหมาะสมกับเป้าหมายของคุณ
      ครูผู้เชี่ยวชาญจะทดสอบระดับเพิ่มเติมก่อนเริ่มเรียน`,
    courses: [], // Will be fetched from Supabase in production
    strengths,
    weaknesses,
    nextSteps,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LevelTestInput = await request.json()

    if (!body.level || !body.subject || !body.goal) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'กรุณากรอกข้อมูลให้ครบ' },
        { status: 400 }
      )
    }

    const result = computeRecommendation(body)

    return NextResponse.json<ApiResponse<LevelTestResult>>({
      success: true,
      data: result,
    })

  } catch (err) {
    console.error('Level test API error:', err)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    )
  }
}
