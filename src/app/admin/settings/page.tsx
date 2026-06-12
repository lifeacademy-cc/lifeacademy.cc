import { createClient } from '@/lib/supabase/server'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import YoutubeSettingForm from '@/components/admin/YoutubeSettingForm'
import { Settings, Shield, Globe, Bell } from 'lucide-react'

export const metadata = { title: 'Site Settings — Admin Panel' }

export default async function AdminSettingsPage() {
  const supabase = createClient()
  
  let youtubeUrl = ''
  try {
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'youtube_video_url')
      .single()
    if (data?.value) {
      youtubeUrl = data.value
    }
  } catch (e) {
    // Fallback
  }

  return (
    <div className="p-8 animate-fade-in">
      <AdminPageHeader 
        title="Site Settings" 
        description="ปรับแต่งการตั้งค่าพื้นฐานของเวบไซต์และระบบหลังบ้าน"
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card border-slate-200/60 shadow-sm">
            <h3 className="font-ui font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#1a56db]" /> General Configuration
            </h3>
            
            <div className="space-y-6">
              {/* Site Name Setting (Mock UI) */}
              <div className="space-y-2">
                <label className="text-xs font-ui font-bold text-slate-400 uppercase tracking-widest">Site Name</label>
                <input 
                  type="text" 
                  defaultValue="LIFE Academy"
                  className="field-input w-full font-ui text-sm"
                  disabled
                />
                <p className="text-[10px] text-slate-400 font-thai">* แก้ไขได้ในไฟล์ config ของระบบ</p>
              </div>

              {/* Maintenance Mode (Mock UI) */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="space-y-0.5">
                  <div className="text-sm font-ui font-bold text-slate-900">Maintenance Mode</div>
                  <p className="text-xs text-slate-500 font-thai">ปิดเวบไซต์ชั่วคราวเพื่อปรับปรุงระบบ</p>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-not-allowed">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border-slate-200/60 shadow-sm">
            <h3 className="font-ui font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" /> Security & Access
            </h3>
            <div className="p-10 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
              <Shield className="w-10 h-10 text-slate-200" />
              <p className="font-thai text-slate-400 text-sm">การตั้งค่าความปลอดภัยขั้นสูงจะเปิดให้ใช้งานในเวอร์ชันถัดไป</p>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          <YoutubeSettingForm initialUrl={youtubeUrl} />
          
          <div className="card border-slate-200/60 shadow-sm bg-[#f8fafc]">
            <h3 className="font-ui font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
              <Bell className="w-4 h-4 text-amber-500" /> Notification Info
            </h3>
            <p className="text-xs text-slate-500 font-thai leading-relaxed">
              ระบบแจ้งเตือนผ่าน LINE Notify ถูกเชื่อมต่อกับ Token ของแอดมินเรียบร้อยแล้ว ทุกการสอบถามจะส่งตรงถึงมือถือของคุณทันที
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
