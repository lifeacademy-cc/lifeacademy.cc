'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, BookOpen, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CourseCard from './CourseCard'
import CourseTabs, { TabDef } from './CourseTabs'
import CourseFilter from './CourseFilter'
import type { Course } from '@/types'

interface CourseListInteractiveProps {
  initialCourses: Course[]
  defaultLevel?: string
  defaultSubject?: string
}

export default function CourseListInteractive({
  initialCourses,
  defaultLevel = 'all',
  defaultSubject = '',
}: CourseListInteractiveProps) {
  // States
  const [activeTab, setActiveTab] = useState(defaultLevel)
  const [selectedSubject, setSelectedSubject] = useState(defaultSubject)
  const [selectedFormat, setSelectedFormat] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Simulate skeleton loading on mount for visual premium polished feel
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // Update tabs if URL params change
  useEffect(() => {
    if (defaultLevel) setActiveTab(defaultLevel)
    if (defaultSubject) setSelectedSubject(defaultSubject)
  }, [defaultLevel, defaultSubject])

  // Filter logic
  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      // 1. Level / Tab Filter
      if (activeTab === 'online') {
        if (course.format !== 'online') return false
      } else if (activeTab !== 'all') {
        if (course.level !== activeTab) return false
      }

      // 2. Subject Filter
      if (selectedSubject !== '') {
        if (course.subject !== selectedSubject) return false
      }

      // 3. Format Filter
      if (selectedFormat !== '') {
        if (course.format !== selectedFormat) return false
      }

      // 4. Search Query Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase()
        const matchName = course.name.toLowerCase().includes(q)
        const matchNameTh = course.name_th?.toLowerCase().includes(q)
        const matchDesc = course.description?.toLowerCase().includes(q)
        const matchSubject = course.subject.toLowerCase().includes(q)
        if (!matchName && !matchNameTh && !matchDesc && !matchSubject) return false
      }

      return true
    })
  }, [initialCourses, activeTab, selectedSubject, selectedFormat, searchQuery])

  // Dynamic counts for tab switcher
  const tabDefs = useMemo<TabDef[]>(() => {
    // We compute counts based on subject and format filters, but ignoring level to show how many matches exist in each level!
    const baseList = initialCourses.filter((course) => {
      if (selectedSubject !== '' && course.subject !== selectedSubject) return false
      if (selectedFormat !== '' && course.format !== selectedFormat) return false
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase()
        const matchName = course.name.toLowerCase().includes(q)
        const matchNameTh = course.name_th?.toLowerCase().includes(q)
        const matchDesc = course.description?.toLowerCase().includes(q)
        if (!matchName && !matchNameTh && !matchDesc) return false
      }
      return true
    })

    return [
      { key: 'all',       label: 'ทั้งหมด',     count: baseList.length },
      { key: 'primary',   label: 'ประถม',       count: baseList.filter(c => c.level === 'primary').length },
      { key: 'secondary', label: 'ม.ต้น',       count: baseList.filter(c => c.level === 'secondary').length },
      { key: 'high',      label: 'ม.ปลาย',      count: baseList.filter(c => c.level === 'high').length },
      { key: 'exam',      label: 'เตรียมสอบ',   count: baseList.filter(c => c.level === 'exam').length },
      { key: 'online',    label: 'ออนไลน์',     count: baseList.filter(c => c.format === 'online').length },
    ]
  }, [initialCourses, selectedSubject, selectedFormat, searchQuery])

  const handleReset = () => {
    setActiveTab('all')
    setSelectedSubject('')
    setSelectedFormat('')
    setSearchQuery('')
  }

  return (
    <div className="grid lg:grid-cols-4 gap-8 items-start">
      {/* 1. Sidebar Filters */}
      <div className="lg:col-span-1">
        <CourseFilter
          selectedSubject={selectedSubject}
          selectedFormat={selectedFormat}
          onSubjectChange={setSelectedSubject}
          onFormatChange={setSelectedFormat}
          onReset={handleReset}
          totalCount={filteredCourses.length}
        />
      </div>

      {/* 2. Main List Area */}
      <div className="lg:col-span-3 space-y-6">
        {/* Search bar & Tabs row */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#94a3b8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาหลักสูตร เช่น คณิต ม.4, อังกฤษ TCAS, Zoom..."
              className="field-input pl-11 shadow-sm w-full font-thai text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-ui text-[#94a3b8] hover:text-[#0f2557]"
              >
                ล้าง
              </button>
            )}
          </div>

          <CourseTabs
            activeTab={activeTab}
            tabs={tabDefs}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Dynamic content */}
        {loading ? (
          // Skeleton Loading
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card border border-border/40 p-6 flex flex-col space-y-4 animate-pulse">
                <div className="h-1.5 rounded bg-slate-200 -mt-6 -mx-6 mb-4" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-slate-200 rounded-full" />
                  <div className="h-5 w-16 bg-slate-200 rounded-full" />
                </div>
                <div className="h-6 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-full bg-slate-200 rounded" />
                <div className="h-4 w-5/6 bg-slate-200 rounded" />
                <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                  <div className="h-6 w-20 bg-slate-200 rounded" />
                  <div className="h-4 w-12 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          // Cards Grid
          <motion.div 
            layout
            className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card border border-dashed border-border/80 p-12 text-center max-w-xl mx-auto flex flex-col items-center justify-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-text-muted/60" />
            </div>
            <div className="space-y-1">
              <h3 className="font-ui font-bold text-[#0f2557] text-base">ไม่พบหลักสูตรที่ตรงตามเงื่อนไข</h3>
              <p className="font-thai text-text-muted text-xs">
                ลองปรับเปลี่ยนคำค้นหา หรือล้างตัวกรองเพื่อค้นหาหลักสูตรอื่นๆ ของสถาบัน
              </p>
            </div>
            <button
              onClick={handleReset}
              className="btn-primary py-2 px-5 text-xs font-semibold"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
