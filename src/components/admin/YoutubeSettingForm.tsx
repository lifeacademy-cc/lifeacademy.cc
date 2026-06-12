'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Youtube, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface YoutubeSettingFormProps {
  initialUrl?: string
}

export default function YoutubeSettingForm({ initialUrl = '' }: YoutubeSettingFormProps) {
  const [url, setUrl] = useState(initialUrl)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    if (!url.trim()) {
      setStatus({ type: 'error', message: 'กรุณากรอกลิงก์วิดีโอ YouTube' })
      return
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setStatus({ type: 'error', message: 'รูปแบบลิงก์ YouTube ไม่ถูกต้อง' })
      return
    }

    setLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('settings')
        .upsert(
          { key: 'youtube_video_url', value: url.trim() },
          { onConflict: 'key' }
        )

      if (error) throw error

      setStatus({ type: 'success', message: 'บันทึกข้อมูลสำเร็จแล้ว!' })
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setStatus({ type: null, message: '' })
      }, 3000)

    } catch (err: any) {
      console.error('Error saving youtube video settings:', err)
      setStatus({ type: 'error', message: err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Youtube className="w-5 h-5 text-red-500 fill-red-500" />
        <h2 className="font-ui font-bold text-[#0f2557] text-base">ตั้งค่าวิดีโอหน้าแรก</h2>
      </div>
      
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label htmlFor="youtube-url" className="block text-xs font-thai font-semibold text-[#64748b] mb-1.5">
            ลิงก์วิดีโอ YouTube (แนะนำ/ตัวอย่างการสอน)
          </label>
          <input
            id="youtube-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="field-input w-full font-ui text-xs text-[#0f2557]"
            disabled={loading}
          />
        </div>

        {/* Message Alert */}
        {status.type && (
          <div className={`flex items-center gap-2 p-3 rounded-xl text-xs font-thai ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
          }`}>
            {status.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-2.5 text-xs font-ui font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              กำลังบันทึก...
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              บันทึกการตั้งค่า
            </>
          )}
        </button>
      </form>
    </div>
  )
}
