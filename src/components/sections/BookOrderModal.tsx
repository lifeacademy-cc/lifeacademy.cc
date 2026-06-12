'use client'

import { useState } from 'react'
import { X, Loader2, CheckCircle2, ShoppingBag } from 'lucide-react'

interface BookOrderModalProps {
  isOpen: boolean
  onClose: () => void
  bookTitle: string
  price: number
}

interface OrderForm {
  customerName: string
  phone: string
  address: string
  paymentMethod: string
}

const INITIAL_FORM: OrderForm = {
  customerName: '',
  phone: '',
  address: '',
  paymentMethod: 'โอนเงินผ่านธนาคาร'
}

export default function BookOrderModal({ isOpen, onClose, bookTitle, price }: BookOrderModalProps) {
  const [form, setForm] = useState<OrderForm>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const set = (k: keyof OrderForm, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.customerName || !form.phone || !form.address) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน')
      return
    }
    
    setError('')
    setLoading(true)
    
    try {
      const res = await fetch('/api/order-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookTitle,
          totalPrice: form.paymentMethod.includes('ปลายทาง') ? price + 20 : price,
          customerName: form.customerName,
          phone: form.phone,
          address: form.address,
          paymentMethod: form.paymentMethod
        }),
      })
      
      const json = await res.json()
      if (!json.success) throw new Error(json.error ?? 'เกิดข้อผิดพลาดในการสั่งซื้อ')
      setDone(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setForm(INITIAL_FORM)
    setDone(false)
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#0f2557] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h3 className="font-ui font-bold text-white text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#f59e0b]" /> 
            แบบฟอร์มสั่งซื้อหนังสือ
          </h3>
          <button 
            onClick={handleClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {done ? (
            <div className="text-center py-8 animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-display font-bold text-[#0f2557] text-2xl mb-2">สั่งซื้อสำเร็จ! 🎉</h3>
              <p className="font-thai text-slate-600 text-sm mb-6 max-w-xs mx-auto">
                ขอบคุณที่สั่งซื้อหนังสือ <strong>{bookTitle}</strong><br/>
                ทางเจ้าหน้าที่จะติดต่อกลับที่เบอร์ {form.phone} ภายใน 24 ชั่วโมง เพื่อยืนยันการจัดส่งครับ
              </p>
              <button onClick={handleClose} className="btn-primary w-full py-3 justify-center">
                ปิดหน้าต่าง
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              {/* Order Summary box */}
              <div className="bg-[#f0f4ff] border border-[#1a56db]/20 rounded-2xl p-4 mb-2">
                <div className="font-thai text-xs text-slate-500 mb-1">รายการสั่งซื้อ:</div>
                <div className="font-ui font-bold text-[#0f2557] leading-tight mb-2">{bookTitle}</div>
                <div className="flex justify-between items-center border-t border-[#1a56db]/10 pt-2 mt-2">
                  <span className="font-thai text-sm text-slate-600">ยอดชำระสุทธิ</span>
                  <span className="font-ui font-black text-[#1a56db] text-lg">฿{price}</span>
                </div>
              </div>

              <div>
                <label className="field-label">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={e => set('customerName', e.target.value)}
                  placeholder="เช่น นายรักเรียน ขยันยิ่ง"
                  className="field-input"
                  required
                />
              </div>

              <div>
                <label className="field-label">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="field-input"
                  required
                />
              </div>

              <div>
                <label className="field-label">ที่อยู่สำหรับจัดส่ง <span className="text-red-500">*</span></label>
                <textarea
                  value={form.address}
                  onChange={e => set('address', e.target.value)}
                  placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
                  rows={3}
                  className="field-input resize-none"
                  required
                />
              </div>

              <div>
                <label className="field-label">ช่องทางการชำระเงิน <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'โอนเงินผ่านธนาคาร', label: '🏦 โอนเงิน' },
                    { value: 'เก็บเงินปลายทาง (COD)', label: '🚚 ปลายทาง (+20)' },
                  ].map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all text-xs font-thai font-semibold
                        ${form.paymentMethod === opt.value
                          ? 'border-[#1a56db] bg-[#f0f4ff] text-[#0f2557]'
                          : 'border-slate-200 hover:border-[#1a56db]/40 text-slate-600'
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.value}
                        checked={form.paymentMethod === opt.value}
                        onChange={e => set('paymentMethod', e.target.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-thai animate-fade-in">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3.5 text-sm mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> กำลังดำเนินการ...</>
                ) : (
                  <>ยืนยันการสั่งซื้อเลย</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
