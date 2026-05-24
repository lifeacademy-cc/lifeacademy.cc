// lib/utils/format.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return price.toLocaleString('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 })
}

export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
    ...options,
  })
}

export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':')
  return `${h}:${m} น.`
}

export function dayOfWeekTh(day: number): string {
  const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
  return days[day] ?? ''
}

export function getSubjectColor(subject: string): string {
  const map: Record<string, string> = {
    math:      'bg-blue-100 text-blue-800',
    english:   'bg-green-100 text-green-800',
    science:   'bg-purple-100 text-purple-800',
    thai:      'bg-red-100 text-red-800',
    physics:   'bg-indigo-100 text-indigo-800',
    chemistry: 'bg-yellow-100 text-yellow-800',
    biology:   'bg-emerald-100 text-emerald-800',
    social:    'bg-orange-100 text-orange-800',
  }
  return map[subject] ?? 'bg-gray-100 text-gray-800'
}

export function getLevelLabel(level: string): string {
  const map: Record<string, string> = {
    primary: 'ประถมศึกษา', secondary: 'มัธยมต้น',
    high: 'มัธยมปลาย', exam: 'เตรียมสอบ',
  }
  return map[level] ?? level
}

export function getSubjectLabel(subject: string): string {
  const map: Record<string, string> = {
    math: 'คณิตศาสตร์', english: 'ภาษาอังกฤษ',
    science: 'วิทยาศาสตร์', thai: 'ภาษาไทย',
    physics: 'ฟิสิกส์', chemistry: 'เคมี',
    biology: 'ชีววิทยา', social: 'สังคมศึกษา',
  }
  return map[subject] ?? subject
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}
