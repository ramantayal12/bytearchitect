import { ArrowRight } from 'lucide-react'
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
import { summarizeProgress, useCourseProgress } from '@/features/progress'
import type { Course } from '../course.types'
import { CourseStats } from './CourseStats'

export function CourseCard({ course }: { course: Course }) {
  const { data: progress } = useCourseProgress(course.id)
  const summary = summarizeProgress(
    course.lessons.map((l) => l.id),
    progress,
  )
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <Badge variant="secondary" className="w-fit">
          {course.level}
        </Badge>
        <CardTitle className="text-xl">
          <Link
            to={`/courses/${course.id}`}
            className="after:absolute after:inset-0 hover:text-primary"
          >
            {course.title}
          </Link>
        </CardTitle>
        <CardDescription>{course.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <CourseStats course={course} />
      </CardContent>
      <CardFooter className="flex items-center gap-3">
        {progress ? (
          <>
            <Progress value={summary.percent} className="h-2 flex-1" />
            <span className="text-xs text-muted-foreground">{summary.percent}% complete</span>
          </>
        ) : (
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            View course <ArrowRight className="size-4" />
          </span>
        )}
      </CardFooter>
    </Card>
  )
}
