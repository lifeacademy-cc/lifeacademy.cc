import { NextRequest, NextResponse } from 'next/server'
import { pushToAdmin, absentAlertFlex, weeklyReportFlex, lowScoreAlertFlex } from '@/lib/line/flex-messages'
import { sendLowScoreAlertEmail } from '@/lib/email/client'
import type { ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, studentName, level, courseName, presentCount, totalSessions, avgScore, teacherComments, score, maxScore, date, email } = body

    if (!type) {
      return NextResponse.json<ApiResponse>({ success: false, error: 'กรุณาระบุประเภทการแจ้งเตือน (type)' }, { status: 400 })
    }

    let flexPayload: any = null

    // ─── Route notify trigger by type ──────────────────────────
    if (type === 'absent_alert') {
      const sName = studentName || 'น้องภูมินทร์ พงษ์สวัสดิ์'
      const subject = courseName || 'คณิตศาสตร์ ม.ต้น (เน้นสอบแข่งขัน)'
      const testDate = date || new Date().toLocaleDateString('th-TH')
      
      flexPayload = absentAlertFlex(sName, subject, testDate)
      await pushToAdmin([flexPayload])

    } else if (type === 'weekly_report') {
      const sName = studentName || 'น้องภูมินทร์ พงษ์สวัสดิ์'
      const sLevel = level || 'มัธยมต้น'
      const pCount = Number(presentCount ?? 8)
      const tSessions = Number(totalSessions ?? 10)
      const aScore = Number(avgScore ?? 85)
      const comments = teacherComments || 'น้องภูมินทร์มีความตั้งใจเรียนดีมากในสัปดาห์นี้ ทำคะแนนการทำแบบฝึกหัดได้โดดเด่นครับ'

      flexPayload = weeklyReportFlex({
        studentName: sName,
        level: sLevel,
        presentCount: pCount,
        totalSessions: tSessions,
        avgScore: aScore,
        teacherComments: comments
      })
      await pushToAdmin([flexPayload])

    } else if (type === 'low_score_alert') {
      const sName = studentName || 'น้องภูมินทร์ พงษ์สวัสดิ์'
      const cName = courseName || 'คณิตศาสตร์ ม.ต้น (เน้นสอบแข่งขัน)'
      const valScore = Number(score ?? 55)
      const valMax = Number(maxScore ?? 100)
      const testDate = date || new Date().toLocaleDateString('th-TH')
      
      flexPayload = lowScoreAlertFlex({
        studentName: sName,
        courseName: cName,
        score: valScore,
        maxScore: valMax,
        date: testDate
      })
      
      // 1. Send LINE alert
      await pushToAdmin([flexPayload])

      // 2. Send email alert (via Resend) if email is provided
      if (email && email.trim() !== '') {
        try {
          await sendLowScoreAlertEmail({
            email: email.trim(),
            studentName: sName,
            courseName: cName,
            score: valScore,
            maxScore: valMax,
            date: testDate
          })
        } catch (emailErr) {
          console.error('Email notify API route error:', emailErr)
        }
      }
    } else {
      return NextResponse.json<ApiResponse>({ success: false, error: 'ไม่พบประเภทการแจ้งเตือนที่กำหนด' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `ส่งการแจ้งเตือนประเภท ${type} สำเร็จ!`,
      payload: flexPayload
    })

  } catch (err) {
    console.error('Notification API Error:', err)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'เกิดข้อผิดพลาดในการประมวลผลการแจ้งเตือน' },
      { status: 500 }
    )
  }
}
