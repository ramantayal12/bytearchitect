import { Clock } from 'lucide-react'
import { Link } from 'react-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { CourseProgress } from '@/features/progress'
import { formatMinutes, lessonId } from '../course.logic'
import type { Course } from '../course.types'
import { LessonStatusIcon } from './LessonStatusIcon'

export function CourseOutline({
  course,
  progress,
}: {
  course: Course
  progress: CourseProgress | undefined
}) {
  return (
    <div className="grid gap-8">
      {course.parts.map((part) => (
        <section key={part.id}>
          <h3 className="mb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {part.title}
          </h3>
          <Accordion type="multiple" className="rounded-lg border">
            {part.chapters.map((chapter) => {
              const done = chapter.lessons.filter(
                (l) => progress && lessonId(chapter.id, l.slug) in progress.completed,
              ).length
              return (
                <AccordionItem key={chapter.id} value={chapter.id} className="px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex flex-1 items-center gap-3">
                      <span className="flex-1 font-medium">{chapter.title}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {progress ? `${done}/` : ''}
                        {chapter.lessons.length} lessons
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid gap-1">
                      {chapter.lessons.map((l) => {
                        const id = lessonId(chapter.id, l.slug)
                        const lesson = course.getLesson(id)
                        return (
                          <li key={id}>
                            <Link
                              to={`/courses/${course.id}/${id}`}
                              className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent"
                            >
                              <LessonStatusIcon
                                kind={l.kind}
                                done={Boolean(progress && id in progress.completed)}
                              />
                              <span className="flex-1">{l.title}</span>
                              {lesson && (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="size-3" /> {formatMinutes(lesson.minutes)}
                                </span>
                              )}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </section>
      ))}
    </div>
  )
}
