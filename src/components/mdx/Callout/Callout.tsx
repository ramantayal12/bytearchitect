import { AlertTriangle, Info, Lightbulb, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  note: {
    icon: Info,
    label: 'Note',
    className: 'border-sky-500/40 bg-sky-500/5 [&_svg.callout-icon]:text-sky-500',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    className: 'border-emerald-500/40 bg-emerald-500/5 [&_svg.callout-icon]:text-emerald-500',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Watch out',
    className: 'border-amber-500/40 bg-amber-500/5 [&_svg.callout-icon]:text-amber-500',
  },
  interview: {
    icon: Sparkles,
    label: 'Interview tip',
    className: 'border-violet-500/40 bg-violet-500/5 [&_svg.callout-icon]:text-violet-500',
  },
} as const

export type CalloutType = keyof typeof VARIANTS

export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: ReactNode
}) {
  const variant = VARIANTS[type]
  const Icon = variant.icon
  return (
    <aside className={cn('my-6 flex gap-3 rounded-lg border-l-4 p-4', variant.className)}>
      <Icon className="callout-icon mt-1 size-5 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        <p className="!mt-0 !mb-1 font-semibold">{title ?? variant.label}</p>
        {children}
      </div>
    </aside>
  )
}
