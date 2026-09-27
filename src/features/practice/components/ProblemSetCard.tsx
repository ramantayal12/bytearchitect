import { ArrowRight, Code2 } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useCourseProgress } from '@/features/progress'
import type { Difficulty, ProblemSet } from '../practice.types'
import { DifficultyLabel } from './labels'

const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard']

export function ProblemSetCard({ problemSet }: { problemSet: ProblemSet }) {
  const { data: progress } = useCourseProgress(problemSet.id)
  const total = problemSet.problems.length
  const solved = problemSet.problems.filter((p) => progress && p.slug in progress.completed).length
  return (
    <Card className="relative flex flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <Badge variant="secondary" className="w-fit">
          <Code2 /> Coding practice
        </Badge>
        <CardTitle className="text-xl">
          <Link
            to={`/practice/${problemSet.id}`}
            className="after:absolute after:inset-0 hover:text-primary"
          >
            {problemSet.title}
          </Link>
        </CardTitle>
        <CardDescription>{problemSet.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <li>{total} problems</li>
          {difficulties.map((d) => (
            <li key={d}>
              <DifficultyLabel difficulty={d} />{' '}
              {problemSet.problems.filter((p) => p.difficulty === d).length}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex items-center gap-3">
        {progress ? (
          <>
            <Progress value={(solved / total) * 100} className="h-2 flex-1" />
            <span className="text-xs text-muted-foreground">
              {solved}/{total} solved
            </span>
          </>
        ) : (
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            Start practicing <ArrowRight className="size-4" />
          </span>
        )}
      </CardFooter>
    </Card>
  )
}
