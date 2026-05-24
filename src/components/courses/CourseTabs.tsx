'use client'

import { cn } from '@/lib/utils/format'

export interface TabDef {
  key: string
  label: string
  count: number
}

interface CourseTabsProps {
  activeTab: string
  tabs: TabDef[]
  onTabChange: (key: string) => void
}

export default function CourseTabs({ activeTab, tabs, onTabChange }: CourseTabsProps) {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              'px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-ui font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-1.5',
              isActive
                ? 'bg-[#0f2557] text-white shadow-card'
                : 'bg-white text-text-muted hover:text-[#0f2557] hover:bg-slate-100 border border-border/40'
            )}
          >
            {tab.label}
            <span
              className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px] font-bold font-ui',
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-text-muted'
              )}
            >
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
