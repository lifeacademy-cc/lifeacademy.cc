'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Newspaper, 
  Briefcase, 
  Image as ImageIcon, 
  Video, 
  Settings,
  LogOut,
  Bell,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils/format'

const menuItems = [
  { group: 'Main', items: [
    { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/students',  label: 'Students / Inquiries', icon: Users },
  ]},
  { group: 'Content Management', items: [
    { href: '/admin/articles',  label: 'Articles / News', icon: Newspaper },
    { href: '/admin/courses',   label: 'Courses', icon: BookOpen },
    { href: '/admin/videos',    label: 'Course Videos', icon: Video },
    { href: '/admin/services',  label: 'Services', icon: Briefcase },
    { href: '/admin/gallery',   label: 'Gallery / Photos', icon: ImageIcon },
  ]},
  { group: 'System', items: [
    { href: '/admin/settings',  label: 'Site Settings', icon: Settings },
  ]},
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0f2557] text-white flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Brand */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#f59e0b] flex items-center justify-center font-bold text-white shadow-lg">
          L
        </div>
        <div>
          <h1 className="font-display font-bold text-lg leading-none">LIFE Academy</h1>
          <span className="text-[10px] font-ui uppercase tracking-widest text-white/50">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-8 mt-4">
        {menuItems.map((group) => (
          <div key={group.group} className="space-y-2">
            <h3 className="px-4 text-[10px] font-ui font-bold uppercase tracking-widest text-white/30">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-ui transition-all group relative",
                      isActive 
                        ? "bg-white/10 text-white font-semibold" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className={cn(
                      "w-4.5 h-4.5",
                      isActive ? "text-[#f59e0b]" : "text-white/40 group-hover:text-white/60"
                    )} />
                    {item.label}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/20" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-[#0a1a3d]">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-ui text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5 text-red-400" />
          Logout to Site
        </Link>
      </div>
    </aside>
  )
}
