import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { pushToAdmin, newInquiryFlex } from '@/lib/line/flex-messages'
import { sendConfirmationEmail } from '@/lib/email/client'
import type { RegisterFormInput, ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: RegisterFormInput = await request.json()

    // ─── Validate ──────────────────────────────────────────
    if (!body.name?.trim()) {
      return NextResponse.json<ApiResponse>({ success: false, error: 'กรุณากรอกชื่อ' }, { status: 400 })
    }
    if (!body.phone?.trim()) {
      return NextResponse.json<ApiResponse>({ success: false, error: 'กรุณากรอกเบอร์โทร' }, { status: 400 })
    }
    if (!body.level || !body.subject) {
      return NextResponse.json<ApiResponse>({ success: false, error: 'กรุณาเลือกระดับชั้นและวิชา' }, { status: 400 })
    }

    // ─── Save to Supabase ───────────────────────────────────
    const supabase = createAdminClient()
    const { error: dbError } = await supabase
      .from('inquiries')
      .insert({
        name:    body.name.trim(),
        phone:   body.phone.trim(),
        email:   body.email?.trim() || null,
        level:   body.level,
        subject: body.subject,
        format:  body.format,
        message: body.message?.trim() || null,
        status:  'new',
        source:  'website',
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Don't block LINE notification even if DB fails
    }

    // ─── Send LINE notification ─────────────────────────────
    try {
      await pushToAdmin([newInquiryFlex(body)])
    } catch (lineErr) {
      console.error('LINE notification error:', lineErr)
      // Not fatal — continue
    }

    // ─── Send confirmation email (optional) ────────────────
    if (body.email?.trim()) {
      try {
        await sendConfirmationEmail(body)
      } catch (emailErr) {
        console.error('Email error:', emailErr)
      }
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'รับข้อมูลสำเร็จ ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมง',
    })

  } catch (err) {
    console.error('Register API error:', err)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่' },
      { status: 500 }
    )
  }
}
