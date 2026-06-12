import { Plus } from 'lucide-react'
import Link from 'next/link'

interface AdminPageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    href: string
    icon?: any
  }
}

export default function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display font-bold text-slate-900 text-2xl">{title}</h1>
        {description && (
          <p className="font-thai text-slate-500 text-sm mt-1">{description}</p>
        )}
      </div>

      {action && (
        <Link 
          href={action.href} 
          className="btn-primary py-2.5 px-5 text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#1a56db]/20"
        >
          {action.icon ? <action.icon className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {action.label}
        </Link>
      )}
    </div>
  )
}
