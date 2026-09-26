import { CheckCircle2, ListChecks } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LessonKind } from '../course.types'

export function LessonStatusIcon({
  kind,
  done,
  className,
}: {
  kind: LessonKind
  done: boolean
  className?: string
}) {
  if (done)
    return (
      <CheckCircle2
        className={cn('size-4 shrink-0 text-success', className)}
        aria-label="Completed"
      />
    )
  if (kind === 'quiz')
    return (
      <ListChecks
        className={cn('size-4 shrink-0 text-muted-foreground', className)}
        aria-label="Quiz"
      />
    )
  return (
    <span
      role="img"
      className={cn('flex size-4 shrink-0 items-center justify-center', className)}
      aria-label="Not completed"
    >
      <span className="size-2 rounded-full bg-muted-foreground/50" />
    </span>
  )
}
