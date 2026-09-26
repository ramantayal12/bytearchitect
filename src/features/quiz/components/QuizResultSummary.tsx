import { RotateCcw, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { QuizResult } from '../quiz.types'

interface QuizResultSummaryProps {
  result: QuizResult
  bestScore?: number
  onRetry: () => void
}

export function QuizResultSummary({ result, bestScore, onRetry }: QuizResultSummaryProps) {
  const percent = Math.round((result.correct / result.total) * 100)
  const message =
    percent === 100
      ? 'Perfect score!'
      : percent >= 70
        ? 'Nicely done.'
        : 'Review the explanations below and try again.'
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-muted/40 p-4 sm:flex-row sm:items-center">
      <Trophy className="size-8 shrink-0 text-primary" />
      <div className="flex-1">
        <p className="font-semibold" aria-live="polite">
          You scored {result.correct} / {result.total} ({percent}%)
        </p>
        <p className="text-sm text-muted-foreground">
          {message}
          {bestScore !== undefined &&
            bestScore > result.correct &&
            ` Your best: ${bestScore} / ${result.total}.`}
        </p>
        <Progress value={percent} className="mt-2 h-2" />
      </div>
      <Button variant="outline" onClick={onRetry}>
        <RotateCcw /> Retake quiz
      </Button>
    </div>
  )
}
