// lib/line/flex-messages.ts — LINE Flex Message Templates

import type { RegisterFormInput } from '@/types'

const LINE_API = 'https://api.line.me/v2/bot/message/push'
const TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!
const ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID ?? 'Ue652c6a963399b81a811eb04fe88c123'

// ─── Push message helper ───────────────────────────────────

export async function pushToAdmin(messages: object[]) {
  if (!TOKEN) {
    console.warn('LINE_CHANNEL_ACCESS_TOKEN not set — skipping LINE notification')
    return
  }
  const res = await fetch(LINE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ to: ADMIN_USER_ID, messages }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error('LINE push error:', err)
  }
  return res
}

// ─── New inquiry Flex Message ──────────────────────────────

export function newInquiryFlex(data: RegisterFormInput) {
  const subjectMap: Record<string, string> = {
    math: 'คณิตศาสตร์ 📐', english: 'ภาษาอังกฤษ 🔤',
    science: 'วิทยาศาสตร์ 🔬', thai: 'ภาษาไทย 📖',
    physics: 'ฟิสิกส์ ⚡', chemistry: 'เคมี 🧪',
    biology: 'ชีววิทยา 🌿', social: 'สังคมศึกษา 🌏',
  }
  const levelMap: Record<string, string> = {
    primary: 'ประถมศึกษา', secondary: 'มัธยมต้น',
    high: 'มัธยมปลาย', exam: 'เตรียมสอบ',
  }
  const formatMap: Record<string, string> = {
    onsite: '🏫 ที่สถาบัน', online: '💻 ออนไลน์', private: '👤 ส่วนตัว',
  }

  return {
    type: 'flex',
    altText: `🎓 ลูกค้าใหม่: ${data.name} | ${subjectMap[data.subject] ?? data.subject}`,
    contents: {
      type: 'bubble',
      size: 'kilo',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0f2557',
        paddingAll: '16px',
        contents: [
          {
            type: 'text',
            text: '🎓 ลูกค้าใหม่ LIFE Academy',
            color: '#ffffff',
            size: 'md',
            weight: 'bold',
          },
          {
            type: 'text',
            text: new Date().toLocaleDateString('th-TH', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit',
            }),
            color: '#94a3b8',
            size: 'xs',
            margin: 'sm',
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '16px',
        spacing: 'sm',
        contents: [
          row('👤 ชื่อ', data.name),
          row('📞 เบอร์', data.phone),
          row('📚 วิชา', subjectMap[data.subject] ?? data.subject),
          row('🎯 ระดับ', levelMap[data.level] ?? data.level),
          row('🏠 รูปแบบ', formatMap[data.format] ?? data.format),
          ...(data.message ? [row('💬 หมายเหตุ', data.message)] : []),
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '12px',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#f59e0b',
            action: {
              type: 'uri',
              label: '📞 โทรติดต่อกลับ',
              uri: `tel:${data.phone}`,
            },
          },
        ],
      },
    },
  }
}

function row(label: string, value: string) {
  return {
    type: 'box',
    layout: 'horizontal',
    contents: [
      { type: 'text', text: label, size: 'sm', color: '#64748b', flex: 3 },
      { type: 'text', text: value, size: 'sm', color: '#1e293b', weight: 'bold', flex: 5, wrap: true },
    ],
  }
}

// ─── Attendance alert ──────────────────────────────────────

export function absentAlertFlex(studentName: string, subject: string, date: string) {
  return {
    type: 'flex',
    altText: `⚠️ แจ้งขาดเรียน: ${studentName}`,
    contents: {
      type: 'bubble',
      size: 'kilo',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#dc2626',
        paddingAll: '16px',
        contents: [
          {
            type: 'text',
            text: '🚨 แจ้งเตือนการขาดเรียน',
            color: '#ffffff',
            size: 'md',
            weight: 'bold',
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '16px',
        spacing: 'sm',
        contents: [
          row('👤 นักเรียน', studentName),
          row('📚 วิชา', subject),
          row('📅 วันที่ขาด', date),
          {
            type: 'text',
            text: '⚠️ หากน้องมีธุระจำเป็นหรือต้องการขอลาเรียนทดแทน กรุณาแจ้งฝ่ายประชาสัมพันธ์สถาบัน',
            size: 'xs',
            color: '#ef4444',
            wrap: true,
            margin: 'md'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '12px',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#0f2557',
            action: {
              type: 'uri',
              label: '📞 ติดต่อฝ่ายทะเบียน',
              uri: 'tel:0812345678',
            },
          },
        ],
      },
    },
  }
}

// ─── Weekly Report Flex Card ───────────────────────────────

export function weeklyReportFlex(data: {
  studentName: string
  level: string
  presentCount: number
  totalSessions: number
  avgScore: number
  teacherComments: string
}) {
  const attendanceRate = Math.round((data.presentCount / data.totalSessions) * 100)
  return {
    type: 'flex',
    altText: `📊 รายงานการเรียนประจำสัปดาห์: ${data.studentName}`,
    contents: {
      type: 'bubble',
      size: 'kilo',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0f2557',
        paddingAll: '16px',
        contents: [
          {
            type: 'text',
            text: '📊 รายงานการเรียนประจำสัปดาห์',
            color: '#ffffff',
            size: 'md',
            weight: 'bold',
          },
          {
            type: 'text',
            text: 'สถาบัน LIFE Academy หาดใหญ่',
            color: '#f59e0b',
            size: 'xs',
            weight: 'bold',
            margin: 'xs',
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '16px',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: `นักเรียน: ${data.studentName} (${data.level})`,
            weight: 'bold',
            size: 'sm',
            color: '#1e293b'
          },
          {
            type: 'separator',
            margin: 'sm'
          },
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'xs',
            contents: [
              row('📅 การเข้าเรียน', `${data.presentCount}/${data.totalSessions} คาบ (${attendanceRate}%)`),
              row('📝 คะแนนเฉลี่ย', `${data.avgScore}%`),
            ]
          },
          {
            type: 'separator',
            margin: 'sm'
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '💬 ความคิดเห็นจากครูผู้สอน:',
                size: 'xs',
                color: '#64748b',
                weight: 'bold',
                marginBottom: '4px'
              },
              {
                type: 'text',
                text: data.teacherComments,
                size: 'xs',
                color: '#334155',
                wrap: true
              }
            ]
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '12px',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#1a56db',
            action: {
              type: 'uri',
              label: '🌐 เปิดดูระบบรายงานเต็ม',
              uri: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://lifeacademy.co.th'}/student/parent`,
            },
          },
        ],
      },
    }
  }
}

// ─── Low Score Alert Flex Card ─────────────────────────────

export function lowScoreAlertFlex(data: {
  studentName: string
  courseName: string
  score: number
  maxScore: number
  date: string
}) {
  const percentage = Math.round((data.score / data.maxScore) * 100)
  return {
    type: 'flex',
    altText: `📉 แจ้งเตือนคะแนนสอบต่ำกว่าเกณฑ์: ${data.studentName}`,
    contents: {
      type: 'bubble',
      size: 'kilo',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#dc2626',
        paddingAll: '16px',
        contents: [
          {
            type: 'text',
            text: '📉 คะแนนสอบต่ำกว่าเกณฑ์ (60%)',
            color: '#ffffff',
            size: 'md',
            weight: 'bold',
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '16px',
        spacing: 'sm',
        contents: [
          row('👤 นักเรียน', data.studentName),
          row('📚 วิชา', data.courseName),
          row('📝 คะแนนที่ได้', `${data.score} / ${data.maxScore} (${percentage}%)`),
          row('📅 วันที่ทดสอบ', data.date),
          {
            type: 'text',
            text: '⚠️ หมายเหตุ: สถาบันจัดส่งแบบฝึกหัดทบทวนพิเศษให้แล้วทางไลน์ กรุณาช่วยสนับสนุนให้น้องฝึกทำแบบฝึกหัดเพิ่มเติมครับ',
            size: 'xs',
            color: '#ef4444',
            wrap: true,
            margin: 'md'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '12px',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#0f2557',
            action: {
              type: 'uri',
              label: '💬 สอบถามครูประจำวิชา',
              uri: 'https://lin.ee/xvYZMZP',
            },
          },
        ],
      },
    }
  }
}

