import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'LIFE Academy — สถาบันติวเตอร์ หาดใหญ่ | 14 ปีแห่งความสำเร็จ',
    template: '%s | LIFE Academy',
  },
  description: 'สถาบันติวเตอร์ชั้นนำในหาดใหญ่ ประสบการณ์ 14 ปี นักเรียนสำเร็จกว่า 5,000 คน เรียนคณิต-อังกฤษ-วิทย์ ทั้งแบบ Onsite และ Online',
  keywords: ['ติวเตอร์หาดใหญ่', 'กวดวิชาหาดใหญ่', 'เรียนพิเศษสงขลา', 'LIFE Academy', 'ติวคณิต', 'ติวอังกฤษ'],
  authors: [{ name: 'LIFE Academy' }],
  creator: 'CAP Vision Institute',
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'LIFE Academy — สถาบันติวเตอร์ หาดใหญ่',
    description: 'เรียนให้ได้ผล ด้วยครูมืออาชีพที่คุณไว้ใจ | 14 ปี | 5,000+ นักเรียน',
    url: 'https://lifeacademy.cc',
    siteName: 'LIFE Academy',
    locale: 'th_TH',
    type: 'website',
    images: [{ url: '/logo.jpg', width: 500, height: 500 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIFE Academy — สถาบันติวเตอร์ หาดใหญ่',
    description: 'เรียนให้ได้ผล ด้วยครูมืออาชีพที่คุณไว้ใจ',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://lifeacademy.cc'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-thai bg-[#f0f4ff] text-[#1e293b] antialiased">
        {children}
      </body>
    </html>
  )
}
