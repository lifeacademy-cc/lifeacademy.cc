'use client'

import { useState } from 'react'
import { Filter, RotateCcw, X, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils/format'
import { SUBJECTS } from '@/types'

interface CourseFilterProps {
  selectedSubject: string
  selectedFormat: string
  onSubjectChange: (val: string) => void
  onFormatChange: (val: string) => void
  onReset: () => void
  totalCount: number
}

const formats = [
  { value: '', label: '📍 ทุกรูปแบบ' },
  { value: 'onsite', label: '🏫 เรียนที่สถาบัน (Onsite)' },
  { value: 'online', label: '💻 เรียนออนไลน์สด (Online)' },
  { value: 'private', label: '👤 เรียนแบบส่วนตัว (Private)' },
]

export default function CourseFilter({
  selectedSubject,
  selectedFormat,
  onSubjectChange,
  onFormatChange,
  onReset,
  totalCount,
}: CourseFilterProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false)

  const hasFilters = selectedSubject !== '' || selectedFormat !== ''

  const sidebarContent = (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="font-ui font-extrabold text-[#0f2557] text-base flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#1a56db]" /> ตัวกรองหลักสูตร
        </h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-xs text-red-600 hover:text-red-800 font-thai flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> ล้างตัวกรอง
          </button>
        )}
      </div>

      {/* Format Filter */}
      <div className="border-t border-border/60 pt-4">
        <h4 className="font-ui font-bold text-[#0f2557] text-sm mb-3">รูปแบบการเรียน</h4>
        <div className="space-y-2">
          {formats.map((f) => {
            const isSelected = selectedFormat === f.value
            return (
              <button
                key={f.value}
                onClick={() => onFormatChange(f.value)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-thai transition-all flex items-center justify-between',
                  isSelected
                    ? 'bg-[#f0f4ff] text-[#0f2557] font-semibold border-l-4 border-[#1a56db]'
                    : 'text-text-muted hover:bg-slate-50'
                )}
              >
                {f.label}
                {isSelected && <Check className="w-3.5 h-3.5 text-[#1a56db]" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Subject Filter */}
      <div className="border-t border-border/60 pt-4">
        <h4 className="font-ui font-bold text-[#0f2557] text-sm mb-3">กลุ่มวิชาที่สนใจ</h4>
        <div className="grid grid-cols-1 gap-1.5">
          <button
            onClick={() => onSubjectChange('')}
            className={cn(
              'w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-thai transition-all flex items-center justify-between',
              selectedSubject === ''
                ? 'bg-[#f0f4ff] text-[#0f2557] font-semibold border-l-4 border-[#1a56db]'
                : 'text-text-muted hover:bg-slate-50'
            )}
          >
            📚 ทุกวิชา
            {selectedSubject === '' && <Check className="w-3.5 h-3.5 text-[#1a56db]" />}
          </button>
          {SUBJECTS.map((s) => {
            const isSelected = selectedSubject === s.value
            return (
              <button
                key={s.value}
                onClick={() => onSubjectChange(s.value)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-thai transition-all flex items-center justify-between',
                  isSelected
                    ? 'bg-[#f0f4ff] text-[#0f2557] font-semibold border-l-4 border-[#1a56db]'
                    : 'text-text-muted hover:bg-slate-50'
                )}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{s.icon}</span> {s.label}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#1a56db]" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Result Indicator */}
      <div className="border-t border-border/60 pt-4 text-xs font-thai text-text-muted">
        พบทั้งหมด <span className="font-semibold text-[#0f2557]">{totalCount}</span> หลักสูตร
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar Filter */}
      <div className="hidden lg:block card border border-border/40 p-6 sticky top-24">
        {sidebarContent}
      </div>

      {/* Mobile Sticky Bar Filter Trigger */}
      <div className="lg:hidden flex items-center gap-3 w-full my-4">
        <button
          onClick={() => setIsOpenMobile(true)}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-thai font-semibold border border-border/60 flex-1 shadow-sm transition-all',
            hasFilters ? 'bg-[#f0f4ff] text-[#0f2557] border-[#1a56db]' : 'bg-white text-text'
          )}
        >
          <Filter className="w-4 h-4 text-[#1a56db]" /> ตัวกรองหลักสูตร 
          {hasFilters && <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />}
        </button>
        {hasFilters && (
          <button
            onClick={onReset}
            className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200 shadow-sm"
            aria-label="ล้างตัวกรอง"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpenMobile(false)}
          />
          {/* Drawer Panel */}
          <div className="absolute right-0 bottom-0 top-0 w-80 max-w-[85vw] bg-white shadow-2xl p-6 overflow-y-auto flex flex-col transition-transform duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
              <h3 className="font-ui font-extrabold text-[#0f2557] text-base">ตัวกรอง</h3>
              <button 
                onClick={() => setIsOpenMobile(false)}
                className="p-1 rounded-xl bg-slate-100 text-[#0f2557]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Drawer Content */}
            <div className="flex-1">
              {sidebarContent}
            </div>
            {/* Drawer Footer CTA */}
            <div className="mt-6 pt-4 border-t border-border">
              <button
                onClick={() => setIsOpenMobile(false)}
                className="btn-primary w-full justify-center text-sm font-semibold"
              >
                ดู {totalCount} หลักสูตร
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
