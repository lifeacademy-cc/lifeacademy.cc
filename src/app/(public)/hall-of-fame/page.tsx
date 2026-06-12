import WallOfFame from '@/components/sections/WallOfFame'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'คนเก่งของเรา — LIFE Academy',
  description: 'ทำเนียบนักเรียนคนเก่ง ความภูมิใจสูงสุดของ LIFE Academy กับผลการเรียนที่เป็นเลิศและการสอบเข้าโรงเรียนชั้นนำ',
}

export default function HallOfFamePage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-6">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-16 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#f59e0b]/10 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-ui font-bold tracking-widest uppercase mb-4 border border-amber-500/20">
            LIFE Academy Wall of Fame
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            ทำเนียบนักเรียนคนเก่งของเรา
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            ความภาคภูมิใจและผลสัมฤทธิ์ทางการศึกษาที่ยอดเยี่ยมของน้องๆ LIFE Academy จากความตั้งใจและเทคนิคการเรียนที่มีประสิทธิภาพ
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-6">
        <WallOfFame />
      </div>
    </div>
  )
}
