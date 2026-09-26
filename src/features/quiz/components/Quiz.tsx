import { ChevronLeft, ChevronRight, ListChecks } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { gradeQuiz } from '../quiz.logic'
import type { QuizAnswers, QuizDefinition, QuizResult } from '../quiz.types'
import { QuestionView } from './QuestionView'
import { QuizResultSummary } from './QuizResultSummary'

export interface QuizProps {
  questions: QuizDefinition
  title?: string
  /** Best score from a previous attempt, if any. */
  bestScore?: number
  onSubmit?: (result: QuizResult) => void
}

const emptyAnswers = (n: number): QuizAnswers => Array.from({ length: n }, () => [])

export function Quiz({
  questions,
  title = 'Test your understanding',
  bestScore,
  onSubmit,
}: QuizProps) {
  const [answers, setAnswers] = useState<QuizAnswers>(() => emptyAnswers(questions.length))
  const [current, setCurrent] = useState(0)
  const [result, setResult] = useState<QuizResult | null>(null)

  const question = questions[current]
  if (!question) return null
  const answeredCount = answers.filter((a) => a.length > 0).length
  const isLast = current === questions.length - 1
  const allAnswered = answeredCount === questions.length

  const submit = () => {
    const next = gradeQuiz(questions, answers)
    setResult(next)
    onSubmit?.(next)
  }

  const retry = () => {
    setAnswers(emptyAnswers(questions.length))
    setResult(null)
    setCurrent(0)
  }

  return (
    <Card className="not-prose gap-4" data-testid="quiz">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <ListChecks className="size-5 text-primary" />
        <CardTitle className="flex-1 text-base">{title}</CardTitle>
        {bestScore !== undefined && !result && (
          <Badge variant="secondary">
            Best: {bestScore}/{questions.length}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="grid gap-5">
        {result ? (
          <>
            <QuizResultSummary result={result} bestScore={bestScore} onRetry={retry} />
            <ol className="grid gap-6">
              {questions.map((q, i) => (
                <li key={i}>
                  <QuestionView
                    question={q}
                    number={i + 1}
                    selected={answers[i] ?? []}
                    revealed
                    onChange={() => {}}
                  />
                </li>
              ))}
            </ol>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>
                Question {current + 1} of {questions.length}
              </span>
              <Progress value={((current + 1) / questions.length) * 100} className="h-1.5 flex-1" />
            </div>
            <QuestionView
              question={question}
              number={current + 1}
              selected={answers[current] ?? []}
              revealed={false}
              onChange={(selected) =>
                setAnswers((prev) => prev.map((a, i) => (i === current ? selected : a)))
              }
            />
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                onClick={() => setCurrent((c) => c - 1)}
                disabled={current === 0}
              >
                <ChevronLeft /> Previous
              </Button>
              {isLast ? (
                <Button onClick={submit} disabled={!allAnswered}>
                  Submit answers
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => setCurrent((c) => c + 1)}
                  disabled={(answers[current] ?? []).length === 0}
                >
                  Next <ChevronRight />
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
