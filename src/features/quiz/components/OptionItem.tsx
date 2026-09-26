import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuizOption } from '../quiz.types'

interface OptionItemProps {
  option: QuizOption
  index: number
  multi: boolean
  selected: boolean
  revealed: boolean
  onToggle: () => void
}

const LETTERS = 'ABCDEFGHIJ'

export function OptionItem({
  option,
  index,
  multi,
  selected,
  revealed,
  onToggle,
}: OptionItemProps) {
  const correct = option.correct === true
  const state = !revealed
    ? selected
      ? 'selected'
      : 'idle'
    : correct
      ? 'correct'
      : selected
        ? 'wrong'
        : 'idle'

  return (
    <li>
      <button
        type="button"
        role={multi ? 'checkbox' : 'radio'}
        aria-checked={selected}
        disabled={revealed}
        onClick={onToggle}
        className={cn(
          'flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors',
          'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-default',
          state === 'idle' && 'hover:border-primary/50 hover:bg-accent/50',
          state === 'selected' && 'border-primary bg-accent',
          state === 'correct' && 'border-success bg-success/10',
          state === 'wrong' && 'border-destructive bg-destructive/10',
        )}
      >
        <span
          className={cn(
            'flex size-6 shrink-0 items-center justify-center border text-xs font-semibold',
            multi ? 'rounded-md' : 'rounded-full',
            state === 'selected' && 'border-primary bg-primary text-primary-foreground',
            state === 'correct' && 'border-success bg-success text-white',
            state === 'wrong' && 'border-destructive bg-destructive text-white',
          )}
          aria-hidden
        >
          {state === 'correct' ? (
            <Check className="size-3.5" />
          ) : state === 'wrong' ? (
            <X className="size-3.5" />
          ) : (
            LETTERS[index]
          )}
        </span>
        <span className="flex-1 pt-0.5">
          <span className="block">{option.text}</span>
          {revealed && option.explanation && (selected || correct) && (
            <span className="mt-1 block text-muted-foreground">{option.explanation}</span>
          )}
        </span>
      </button>
    </li>
  )
}
