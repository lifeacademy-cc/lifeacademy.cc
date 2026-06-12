'use client'

import { useState } from 'react'
import { ShoppingBag, MessageCircle, Truck } from 'lucide-react'
import BookOrderModal from '@/components/sections/BookOrderModal'

interface Book {
  id: string
  title: string
  subject: 'math' | 'science' | 'english' | 'thai' | 'general'
  level: string
  price: number
  originalPrice: number
  description: string
  features: string[]
  badge?: string
  image: string
}

interface BookstoreClientProps {
  books: Book[]
}

export default function BookstoreClient({ books }: BookstoreClientProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0f2557] to-[#1a56db] py-20 px-4 relative overflow-hidden text-center text-white">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#f59e0b]/10 blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-ui font-bold tracking-widest uppercase border border-white/10">
            LIFE ACADEMY BOOKSTORE
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            หนังสือเตรียมสอบเข้า ม.1 ยอดนิยม
          </h1>
          <p className="font-thai text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            คัดสรรรวบรวมสุดยอดหนังสือเก็งข้อสอบและคอร์สเรียนวิชาการจาก LIFE Academy เหมาะสำหรับน้อง ๆ ที่ต้องการเตรียมสอบเข้า ม.1 ห้องเรียนพิเศษ โครงการ Gifted และโรงเรียนชั้นนำ
          </p>
        </div>
      </section>

      {/* Book Catalog Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12 space-y-2">
            <span className="section-tag mx-auto">คลังหนังสือเตรียมสอบ</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0f2557]">หนังสือแนะนำปั้นคนเก่ง</h2>
            <p className="font-thai text-[#64748b] text-sm max-w-md mx-auto">
              จัดส่งทั่วประเทศ หรือรับหน้าร้านได้โดยตรงที่สถาบัน LIFE Academy หาดใหญ่ (สนใจเล่มไหนทักสั่งซื้อทางแชทได้ทันที)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {books.map(book => (
              <div 
                key={book.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 shadow-sm overflow-hidden"
              >
                {/* Real Book Cover Image Container */}
                <div className="w-full sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-md relative flex-shrink-0 bg-slate-50 border border-slate-200 group flex items-center justify-center select-none">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />
                  
                  {book.badge && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white font-ui font-bold text-[9px] uppercase tracking-wider px-2.5 py-0.75 rounded-full shadow-md z-10">
                      {book.badge}
                    </span>
                  )}
                </div>

                {/* Details Area */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#f0f4ff] text-[#1a56db] font-thai text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {book.subject === 'math' ? 'คณิตศาสตร์' : book.subject === 'science' ? 'วิทยาศาสตร์' : book.subject === 'english' ? 'ภาษาอังกฤษ' : book.subject === 'general' ? 'รวม 5 วิชา' : 'ภาษาไทย-สังคม'}
                    </span>
                    <h3 className="font-ui font-bold text-base text-[#0f2557] leading-snug">{book.title}</h3>
                    <div className="font-thai text-slate-500 text-xs tracking-tight">🎯 สำหรับ: {book.level}</div>
                    
                    <p className="font-thai text-[#64748b] text-xs leading-relaxed pt-1">
                      {book.description}
                    </p>
                    
                    <ul className="pt-2 space-y-1.5">
                      {book.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] font-thai text-slate-700">
                          <span className="text-[#1a56db] mt-0.5">•</span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and Action Bar */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-xs line-through font-ui">฿{book.originalPrice}</span>
                      <span className="text-[#1a56db] font-ui font-black text-xl ml-1.5">฿{book.price}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedBook(book)}
                      className="btn-primary py-2.5 px-4 text-xs font-semibold inline-flex items-center gap-1.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <ShoppingBag className="w-4 h-4" /> สั่งซื้อหนังสือ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Ordering Banner */}
          <div className="mt-16 bg-gradient-to-br from-[#0f2557] to-[#1a3680] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-md">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 max-w-xl relative z-10 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-ui font-semibold text-xs tracking-wider uppercase">
                <Truck className="w-3.5 h-3.5 text-[#f59e0b]" /> Delivery Services
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight mt-1">
                มีบริการจัดส่งด่วนทั่วประเทศ 📦
              </h3>
              <p className="font-thai text-white/70 text-sm leading-relaxed">
                หนังสือเตรียมสอบทุกเล่มของสถาบันจัดส่งแบบด่วนพิเศษส่งตรงถึงมือคุณทั่วประเทศไทย หรือสามารถเลือกรับหนังสือได้ด้วยตนเองโดยตรง ณ สถาบัน LIFE Academy หาดใหญ่
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10 flex-shrink-0">
              <a href="https://lin.ee/xvYZMZP" target="_blank" rel="noopener noreferrer" className="btn-primary bg-[#00b900] hover:bg-[#00a300] border-none text-white py-3.5 px-6 text-sm flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> แชทเพื่อสั่งซื้อด่วน
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Order Modal */}
      <BookOrderModal 
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        bookTitle={selectedBook?.title || ''}
        price={selectedBook?.price || 0}
      />
    </div>
  )
}
