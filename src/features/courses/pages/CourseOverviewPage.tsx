import { CheckCircle2, PlayCircle } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/features/auth'
import { resumeLessonId, summarizeProgress, useCourseProgress } from '@/features/progress'
import { CourseOutline } from '../components/CourseOutline'
import { CourseStats } from '../components/CourseStats'
import { useCourse } from '../courses-context'
import NotFoundPage from './NotFoundPage'

export default function CourseOverviewPage() {
  const { courseId } = useParams()
  const course = useCourse(courseId)
  const { user } = useAuth()
  const { data: progress } = useCourseProgress(courseId ?? '')

  if (!course) return <NotFoundPage message="That course doesn’t exist." />

  const ids = course.lessons.map((l) => l.id)
  const summary = summarizeProgress(ids, progress)
  const resumeId = resumeLessonId(ids, progress)
  const started = summary.completed > 0 || Boolean(progress?.lastLessonId)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="grid gap-5 border-b pb-10">
        <Badge variant="secondary" className="w-fit">
          {course.level}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{course.title}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">{course.description}</p>
        <CourseStats course={course} />
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" asChild>
            <Link to={`/courses/${course.id}/${resumeId}`}>
              <PlayCircle /> {started ? 'Continue learning' : 'Start learning'}
            </Link>
          </Button>
          {!user && (
            <span className="text-sm text-muted-foreground">
              Free account required to read lessons.
            </span>
          )}
          {progress && (
            <div className="flex min-w-60 flex-1 items-center gap-3 text-sm text-muted-foreground">
              <Progress value={summary.percent} className="h-2 max-w-xs flex-1" />
              {summary.completed}/{summary.total} completed
            </div>
          )}
        </div>
      </header>

      <section className="grid gap-4 py-10">
        <h2 className="text-2xl font-semibold">What you’ll learn</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {course.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Course contents</h2>
        <CourseOutline course={course} progress={progress} />
      </section>
    </div>
  )
}
