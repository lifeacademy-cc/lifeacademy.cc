'use client'

import { useState } from 'react'
import { Play, Sparkles, Youtube } from 'lucide-react'

interface VideoSectionProps {
  videoUrl?: string
}

export default function VideoSection({ videoUrl = 'https://www.youtube.com/watch?v=ScMzIvxBSi4' }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Helper to extract Youtube ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : 'ScMzIvxBSi4'
  }

  const youtubeId = getYoutubeId(videoUrl)
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

  return (
    <section className="section bg-slate-50 border-t border-[#e2e8f0]" id="intro-video">
      <div className="container-max">
        
        {/* Title */}
        <div className="text-center mb-12 animate-on-scroll">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-ui font-semibold text-xs tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> LIFE Academy Insights
          </span>
          <h2 className="section-title mt-1">แนะนำสถาบันและการเรียนรู้</h2>
          <p className="section-subtitle mx-auto">
            ร่วมเจาะลึกบรรยากาศการเรียนจริง เทคนิคการสอนของครูวิชาการ และเคล็ดลับการเตรียมความพร้อมในการกวดวิชา
          </p>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-black group">
            
            {!isPlaying ? (
              <>
                {/* Custom Thumbnail Overlay */}
                <img
                  src={thumbnailUrl}
                  alt="LIFE Academy Video Cover"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to simpler thumbnail if maxresdefault is not available
                    e.currentTarget.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                  }}
                />
                <div className="absolute inset-0 bg-[#0f2557]/40 backdrop-blur-[1px] group-hover:bg-[#0f2557]/30 transition-colors duration-300" />
                
                {/* Play Button & Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-[#1a56db] hover:bg-[#1a56db] hover:text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 mb-4 group/btn relative"
                    aria-label="เล่นวิดีโอ"
                  >
                    {/* Glowing outer animation */}
                    <span className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75 group-hover/btn:bg-[#1a56db]/30" />
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  </button>
                  <h3 className="font-ui font-black text-lg sm:text-2xl drop-shadow-md">คลิกเพื่อรับชมวิดีโอแนะนำสถาบัน</h3>
                  <p className="font-thai text-white/80 text-xs sm:text-sm mt-2 max-w-sm drop-shadow-sm">
                    สัมผัสบรรยากาศห้องเรียน ความใส่ใจของทีมงานวิชาการ และ Roadmap สู่ความสำเร็จ
                  </p>
                </div>

                {/* Floating Youtube icon */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 text-[10px] font-ui border border-white/10 shadow-sm">
                  <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
                  YouTube Video
                </div>
              </>
            ) : (
              /* Embedded YouTube Iframe */
              <iframe
                src={embedUrl}
                title="LIFE Academy Video Presentation"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

          </div>
        </div>

      </div>
    </section>
  )
}
