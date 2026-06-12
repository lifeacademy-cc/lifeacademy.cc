import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { pushToAdmin, bookOrderFlex } from '@/lib/line/flex-messages'
import type { BookOrderInput, ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: BookOrderInput = await request.json()

    // ─── Validate ──────────────────────────────────────────
    if (!body.customerName?.trim()) {
      return NextResponse.json<ApiResponse>({ success: false, error: 'กรุณากรอกชื่อ' }, { status: 400 })
    }
    if (!body.phone?.trim()) {
      return NextResponse.json<ApiResponse>({ success: false, error: 'กรุณากรอกเบอร์โทร' }, { status: 400 })
    }
    if (!body.address?.trim()) {
      return NextResponse.json<ApiResponse>({ success: false, error: 'กรุณากรอกที่อยู่จัดส่ง' }, { status: 400 })
    }

    // ─── Save to Supabase ───────────────────────────────────
    const supabase = createAdminClient()
    const { error: dbError } = await supabase
      .from('book_orders')
      .insert({
        customer_name:  body.customerName.trim(),
        phone:          body.phone.trim(),
        line_id:        body.lineId?.trim() || null,
        address:        body.address.trim(),
        book_title:     body.bookTitle,
        total_price:    body.totalPrice,
        payment_method: body.paymentMethod,
        status:         'pending',
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Don't block LINE notification even if DB fails
      // Note: Make sure to create the 'book_orders' table in Supabase
    }

    // ─── Send LINE notification ─────────────────────────────
    try {
      await pushToAdmin([bookOrderFlex(body)])
    } catch (lineErr) {
      console.error('LINE notification error:', lineErr)
      // Not fatal — continue
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'รับข้อมูลการสั่งซื้อสำเร็จ ทีมงานจะติดต่อกลับเพื่อยืนยันยอดเงินและรอบการจัดส่งทางโทรศัพท์อีกครั้ง',
    })

  } catch (err) {
    console.error('Book Order API error:', err)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่' },
      { status: 500 }
    )
  }
}
