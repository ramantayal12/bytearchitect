import { ArrowLeft, ArrowRight, Check, PartyPopper } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import type { Lesson } from '../course.types'

interface LessonNavProps {
  courseId: string
  previous?: Lesson
  next?: Lesson
  completed: boolean
  onCompleteAndContinue: () => void
  onToggleComplete: () => void
  onPrefetch?: (lesson: Lesson | undefined) => void
}

export function LessonNav({
  courseId,
  previous,
  next,
  completed,
  onCompleteAndContinue,
  onToggleComplete,
  onPrefetch,
}: LessonNavProps) {
  return (
    <div className="mt-12 grid gap-4 border-t pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {previous ? (
          <Button variant="ghost" asChild>
            <Link to={`/courses/${courseId}/${previous.id}`}>
              <ArrowLeft /> <span className="max-w-48 truncate">{previous.title}</span>
            </Link>
          </Button>
        ) : (
          <span />
        )}
        <Button size="lg" onClick={onCompleteAndContinue} onMouseEnter={() => onPrefetch?.(next)}>
          {next ? (
            <>
              {completed ? 'Next lesson' : 'Complete & continue'} <ArrowRight />
            </>
          ) : (
            <>
              <PartyPopper /> {completed ? 'Back to course' : 'Finish course'}
            </>
          )}
        </Button>
      </div>
      <button
        type="button"
        onClick={onToggleComplete}
        className="mx-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <Check className="size-3.5" /> {completed ? 'Mark as not completed' : 'Mark as completed'}
      </button>
    </div>
  )
}
