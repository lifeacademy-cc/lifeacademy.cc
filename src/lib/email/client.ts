import { Resend } from 'resend'
import type { RegisterFormInput } from '@/types'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function sendConfirmationEmail(data: RegisterFormInput) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping confirmation email')
    return
  }

  const subjectMap: Record<string, string> = {
    math: 'คณิตศาสตร์ 📐', english: 'ภาษาอังกฤษ 🔤',
    science: 'วิทยาศาสตร์ 🔬', thai: 'ภาษาไทย 📖',
    physics: 'ฟิสิกส์ ⚡', chemistry: 'เคมี 🧪',
    biology: 'ชีววิทยา 🌿', social: 'สังคมศึกษา 🌏',
  }
  const levelMap: Record<string, string> = {
    primary: 'ประถมศึกษา', secondary: 'มัธยมต้น',
    high: 'มัธยมปลาย', exam: 'เตรียมสอบ A-Level',
  }
  const formatMap: Record<string, string> = {
    onsite: 'เรียนที่สถาบัน (Onsite)',
    online: 'เรียนออนไลน์สด (Online)',
    private: 'เรียนแบบส่วนตัว (Private)',
  }

  const subjectTh = subjectMap[data.subject] ?? data.subject
  const levelTh = levelMap[data.level] ?? data.level
  const formatTh = formatMap[data.format] ?? data.format

  try {
    const response = await resend.emails.send({
      from: 'LIFE Academy <onboarding@resend.dev>',
      to: data.email || '',
      subject: `🎓 ยืนยันการลงทะเบียน LIFE Academy — คุณ ${data.name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; bg-color: #ffffff; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(15,37,87,0.06); border: 1px border #e2e8f0;">
            {/* Header */}
            <div style="background-color: #0f2557; background: linear-gradient(135deg, #0f2557 0%, #1a56db 100%); padding: 30px; text-align: center; color: #ffffff;">
              <span style="font-size: 28px; font-weight: bold; letter-spacing: 1px; display: block;">LIFE Academy</span>
              <span style="font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 2px;">Transform Learning, Transform Organization</span>
            </div>

            {/* Body */}
            <div style="padding: 40px 30px;">
              <h2 style="color: #0f2557; font-size: 20px; font-weight: bold; margin-top: 0; margin-bottom: 15px;">สวัสดีครับคุณ ${data.name},</h2>
              <p style="color: #64748b; font-size: 14px; margin-bottom: 25px;">
                ยินดีต้อนรับสู่ LIFE Academy ครับ! สถาบันได้รับข้อมูลการลงทะเบียนสนใจเรียนของท่านเรียบร้อยแล้ว ทีมงานและคุณครูผู้เชี่ยวชาญจะโทรติดต่อกลับหาท่านผ่านเบอร์โทรศัพท์ <strong style="color: #0f2557;">${data.phone}</strong> ภายในเวลา 1 ชั่วโมงเพื่อทำการนัดทดสอบประเมินระดับฟรี
              </p>

              {/* Data Summary */}
              <div style="background-color: #f0f4ff; border-radius: 16px; padding: 25px; margin-bottom: 30px; border: 1px solid #dce6ff;">
                <h3 style="color: #0f2557; font-size: 14px; font-weight: bold; margin-top: 0; margin-bottom: 15px; border-b: 1px solid #dce6ff; padding-bottom: 10px;">📊 ข้อมูลสรุปการลงทะเบียน</h3>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                  <tr>
                    <td style="color: #64748b; padding: 6px 0; width: 35%;">👤 ชื่อผู้เรียน:</td>
                    <td style="color: #0f2557; font-weight: bold; padding: 6px 0;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 6px 0;">📚 วิชาที่สนใจ:</td>
                    <td style="color: #0f2557; font-weight: bold; padding: 6px 0;">${subjectTh}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 6px 0;">🎯 ระดับการติว:</td>
                    <td style="color: #0f2557; font-weight: bold; padding: 6px 0;">${levelTh}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 6px 0;">🏠 รูปแบบห้องเรียน:</td>
                    <td style="color: #0f2557; font-weight: bold; padding: 6px 0;">${formatTh}</td>
                  </tr>
                  ${data.message ? `
                  <tr>
                    <td style="color: #64748b; padding: 6px 0; vertical-align: top;">💬 หมายเหตุเพิ่มเติม:</td>
                    <td style="color: #0f2557; font-weight: bold; padding: 6px 0; font-style: italic;">"${data.message}"</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              {/* Steps Info */}
              <div style="margin-bottom: 30px;">
                <h3 style="color: #0f2557; font-size: 14px; font-weight: bold; margin-bottom: 15px;">👉 ขั้นตอนถัดไปในการรับสิทธิ์เรียน:</h3>
                <ol style="padding-left: 20px; font-size: 13px; color: #64748b; margin: 0; space-y: 8px;">
                  <li style="margin-bottom: 8px;"><strong style="color: #0f2557;">รอสายโทรศัพท์:</strong> ทีมวิชาการจะโทรแนะนำแนวทางการจัดห้องเรียนและนัดหมายวันทดสอบ</li>
                  <li style="margin-bottom: 8px;"><strong style="color: #0f2557;">เข้ารับการทดสอบ:</strong> ทำแบบทดสอบระดับวิชา 30 นาทีกับอาจารย์ผู้เชี่ยวชาญฟรี</li>
                  <li style="margin-bottom: 8px;"><strong style="color: #0f2557;">รับโรดแมปการติว:</strong> อาจารย์จะวิเคราะห์จุดเด่นจุดอ่อนพร้อมจัดห้องเรียนที่เหมาะสมที่สุดให้บุตรหลาน</li>
                </ol>
              </div>

              {/* LINE Banner CTA */}
              <div style="background-color: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #e2e8f0; text-align: center;">
                <p style="font-size: 13px; color: #64748b; margin-top: 0; margin-bottom: 12px;">ท่านสามารถแอดไลน์สถาบันเพื่อรับสิทธิ์ด่วนหรือคุยกับครูวิชาการได้ทันที</p>
                <a href="https://lin.ee/xvYZMZP" style="background-color: #00b900; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; padding: 12px 24px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 10px rgba(0,185,0,0.25);">
                  🟢 คุยกับอาจารย์วิชาการทาง LINE OA
                </a>
              </div>
            </div>

            {/* Footer */}
            <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              <span>© ${new Date().getFullYear()} LIFE Academy — สถาบันติวเตอร์ชั้นนำ หาดใหญ่ สงขลา</span><br />
              <span style="display: block; margin-top: 5px;">ติดต่อสอบถาม: 082-496-5545 | LINE OA: แอดเพื่อนไลน์สถาบัน</span>
            </div>
          </div>
        </div>
      `,
    })

    return response
  } catch (error) {
    console.error('Failed to send confirmation email via Resend:', error)
    throw error
  }
}

export async function sendLowScoreAlertEmail(data: {
  email: string
  studentName: string
  courseName: string
  score: number
  maxScore: number
  date: string
}) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping low score alert email')
    return
  }

  const percentage = Math.round((data.score / data.maxScore) * 100)

  try {
    const response = await resend.emails.send({
      from: 'LIFE Academy <onboarding@resend.dev>',
      to: data.email,
      subject: `⚠️ แจ้งเตือนคะแนนสอบต่ำกว่าเกณฑ์การเรียนของ ${data.studentName} — LIFE Academy`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; bg-color: #ffffff; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(15,37,87,0.06); border: 1px solid #e2e8f0;">
            <div style="background-color: #dc2626; padding: 30px; text-align: center; color: #ffffff;">
              <span style="font-size: 28px; font-weight: bold; letter-spacing: 1px; display: block;">LIFE Academy</span>
              <span style="font-size: 11px; text-transform: uppercase; color: #fecaca; letter-spacing: 2px;">รายงานผลคะแนนสอบประเมินรายวิชา</span>
            </div>

            <div style="padding: 40px 30px;">
              <h2 style="color: #0f2557; font-size: 20px; font-weight: bold; margin-top: 0; margin-bottom: 15px;">เรียน ผู้ปกครองของ ${data.studentName},</h2>
              <p style="color: #64748b; font-size: 14px; margin-bottom: 25px;">
                สถาบันขอรายงานผลคะแนนการทดสอบย่อยล่าสุดของนักเรียน เพื่อร่วมกันวิเคราะห์และเพิ่มความพร้อมในการเตรียมความพร้อมสำหรับบุตรหลาน
              </p>

              <div style="background-color: #fff5f5; border-radius: 16px; padding: 25px; margin-bottom: 30px; border: 1px solid #fed7d7;">
                <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                  <tr>
                    <td style="color: #64748b; padding: 6px 0; width: 35%;">👤 นักเรียน:</td>
                    <td style="color: #dc2626; font-weight: bold; padding: 6px 0;">${data.studentName}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 6px 0;">📚 รายวิชา:</td>
                    <td style="color: #0f2557; font-weight: bold; padding: 6px 0;">${data.courseName}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 6px 0;">📝 คะแนนที่ได้:</td>
                    <td style="color: #dc2626; font-weight: bold; padding: 6px 0;">${data.score} / ${data.maxScore} (${percentage}%)</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 6px 0;">📅 วันที่ทดสอบ:</td>
                    <td style="color: #0f2557; font-weight: bold; padding: 6px 0;">${data.date}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 30px;">
                <h3 style="color: #0f2557; font-size: 14px; font-weight: bold; margin-bottom: 15px;">💡 คำแนะนำและแผนการช่วยเหลือจากทางสถาบัน:</h3>
                <p style="font-size: 13px; color: #64748b; margin-top: 0; margin-bottom: 12px;">
                  เนื่องจากคะแนนต่ำกว่าเกณฑ์เฉลี่ย 60% สถาบันเตรียมแผนปรับพื้นฐานและทบทวนบทเรียนเพิ่มเติมดังนี้:
                </p>
                <ol style="padding-left: 20px; font-size: 13px; color: #64748b; margin: 0;">
                  <li style="margin-bottom: 8px;"><strong style="color: #0f2557;">เอกสารทบทวนบทเรียน:</strong> ทางโรงเรียนได้พิมพ์ใบฝึกหัดเสริมให้ฝึกฝนเพิ่มเติมแล้ว</li>
                  <li style="margin-bottom: 8px;"><strong style="color: #0f2557;">คลินิกวิชาการ:</strong> จองคาบเรียนเสริมแบบส่วนตัวเพื่อถามตอบโจทย์ที่ยังไม่เข้าใจฟรี</li>
                </ol>
              </div>

              <div style="text-align: center;">
                <a href="https://lin.ee/xvYZMZP" style="background-color: #0f2557; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; padding: 12px 24px; border-radius: 12px; display: inline-block;">
                  💬 ติดต่อพูดคุยกับคุณครูประจำวิชา
                </a>
              </div>
            </div>

            <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              <span>© ${new Date().getFullYear()} LIFE Academy — สถาบันติวเตอร์ชั้นนำ หาดใหญ่ สงขลา</span>
            </div>
          </div>
        </div>
      `,
    })

    return response
  } catch (error) {
    console.error('Failed to send low score alert email:', error)
    throw error
  }
}

