import LevelTestInteractive from '@/components/level-test/LevelTestInteractive'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ทดสอบระดับวิเคราะห์อัจฉริยะ — LIFE Academy',
  description: 'แบบทดสอบระดับวิเคราะห์จุดเด่นจุดอ่อนของนักเรียน ค้นหาคอร์สและสร้างโรดแมปการติวรายบุคคลฟรีเฉพาะทางคณิตศาสตร์ ภาษาอังกฤษ และวิทยาศาสตร์',
}

export default function LevelTestPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Page Header */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-16 px-4 text-center relative overflow-hidden">
        {/* Orbs and grids */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#f59e0b]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            📊 Free Learning Evaluation
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            ระบบวิเคราะห์ระดับการเรียนรู้
          </h1>
          <p className="font-thai text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            ทดสอบทำควิซด่วน 5 ข้อ เพื่อค้นหาจุดแข็ง จุดบกพร่องที่ต้องปรับ และรับคอร์สเรียนพร้อมแผนพัฒนาการติวแบบเฉพาะบุคคลฟรีวันนี้
          </p>
        </div>
      </section>

      {/* 2. Interactive Assessment Quiz Widget */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <LevelTestInteractive />
      </section>

      {/* 3. Fast Stats & Guarantee */}
      <section className="py-8 bg-white border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { title: 'ความแม่นยำสูง', desc: 'วิเคราะห์โครงสร้างระดับชั้นตามหลักสูตรสถาบันและข้อสอบมาตรฐานจริง' },
              { title: 'ครูตรวจซ้ำ', desc: 'ผลลัพธ์ได้รับการตรวจสอบและส่งตรงถึงครูประจำเพื่อวางแผนคลาสเรียน' },
              { title: 'ปรึกษาฟรี 100%', desc: 'ไม่มีข้อผูกมัดใดๆ ในการเข้ารับสิทธิ์ประเมินวิเคราะห์และโรดแมป' },
            ].map(item => (
              <div key={item.title} className="space-y-1">
                <div className="font-ui font-extrabold text-[#0f2557] text-sm uppercase tracking-wider">{item.title}</div>
                <div className="font-thai text-text-muted text-xs leading-relaxed max-w-xs mx-auto">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
