import { BookOpen, Clock, Layers, ListChecks } from 'lucide-react'
import { formatMinutes } from '../course.logic'
import type { Course } from '../course.types'

export function CourseStats({ course }: { course: Course }) {
  const quizzes = course.lessons.filter((l) => l.kind === 'quiz').length
  const chapters = course.parts.reduce((n, p) => n + p.chapters.length, 0)
  const items = [
    { icon: Layers, label: `${chapters} chapters` },
    { icon: BookOpen, label: `${course.lessons.length - quizzes} lessons` },
    { icon: ListChecks, label: `${quizzes} quizzes` },
    { icon: Clock, label: formatMinutes(course.totalMinutes) },
  ]
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-1.5">
          <Icon className="size-4" /> {label}
        </li>
      ))}
    </ul>
  )
}
