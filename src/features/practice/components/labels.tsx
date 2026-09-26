import { cn } from '@/lib/utils'
import type { Difficulty, Verdict } from '../practice.types'

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'text-success',
  Medium: 'text-amber-600 dark:text-amber-400',
  Hard: 'text-destructive',
}

export function DifficultyLabel({
  difficulty,
  className,
}: {
  difficulty: Difficulty
  className?: string
}) {
  return (
    <span className={cn('font-medium', difficultyStyles[difficulty], className)}>{difficulty}</span>
  )
}

export function VerdictLabel({ verdict, className }: { verdict: Verdict; className?: string }) {
  return (
    <span
      className={cn(
        'font-semibold',
        verdict === 'Accepted' ? 'text-success' : 'text-destructive',
        className,
      )}
    >
      {verdict}
    </span>
  )
}
