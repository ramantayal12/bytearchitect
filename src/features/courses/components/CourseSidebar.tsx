import { Bookmark, ChevronDown, RotateCcw, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { CourseProgress } from '@/features/progress'
import { summarizeProgress } from '@/features/progress'
import { cn } from '@/lib/utils'
import { filterChapters, lessonId } from '../course.logic'
import type { Chapter, Course } from '../course.types'
import { LessonStatusIcon } from './LessonStatusIcon'

interface CourseSidebarProps {
  course: Course
  currentLessonId: string
  progress: CourseProgress | undefined
  onNavigate?: () => void
  /** Clears completions and quiz scores. The reset button is hidden without it. */
  onReset?: () => void
}

export function CourseSidebar({
  course,
  currentLessonId,
  progress,
  onNavigate,
  onReset,
}: CourseSidebarProps) {
  const [query, setQuery] = useState('')
  const chapters = useMemo(() => course.parts.flatMap((p) => p.chapters), [course])
  const visible = filterChapters(chapters, query)
  const searching = query.trim() !== ''
  const summary = summarizeProgress(
    course.lessons.map((l) => l.id),
    progress,
  )
  const hasProgress = Boolean(
    progress &&
    (Object.keys(progress.completed).length > 0 || Object.keys(progress.quizzes).length > 0),
  )

  return (
    <div className="flex h-full flex-col">
      <div className="grid shrink-0 gap-4 px-5 pt-6 pb-4">
        <Link
          to={`/courses/${course.id}`}
          className="pr-8 text-xl leading-tight font-bold tracking-tight hover:text-primary"
          onClick={onNavigate}
        >
          {course.title}
        </Link>
        <div className="flex items-center gap-3">
          <Progress
            value={summary.percent}
            className="h-1 flex-1 bg-foreground/15"
            aria-label="Course progress"
          />
          <span className="text-xs text-muted-foreground tabular-nums">{summary.percent}%</span>
          {progress && onReset && <ResetProgressButton disabled={!hasProgress} onReset={onReset} />}
        </div>
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search content"
            aria-label="Search course content"
            className="h-10 pl-9"
          />
        </div>
      </div>

      <nav aria-label="Course contents" className="min-h-0 flex-1 overflow-y-auto border-t">
        {visible.map(({ chapter, number }) => (
          <ChapterGroup
            key={chapter.id}
            courseId={course.id}
            chapter={chapter}
            number={number}
            forceOpen={searching}
            currentLessonId={currentLessonId}
            progress={progress}
            onNavigate={onNavigate}
          />
        ))}
        {visible.length === 0 && (
          <p className="px-5 py-6 text-sm text-muted-foreground">No lessons match “{query}”.</p>
        )}
      </nav>
    </div>
  )
}

function ResetProgressButton({ disabled, onReset }: { disabled: boolean; onReset: () => void }) {
  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="icon-xs"
              className="size-7"
              disabled={disabled}
              aria-label="Reset progress"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Reset progress</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset course progress?</AlertDialogTitle>
          <AlertDialogDescription>
            This clears your completed lessons and quiz scores for this course. Your bookmarks are
            kept.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onReset}>Reset progress</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

interface ChapterGroupProps {
  courseId: string
  chapter: Chapter
  number: number
  /** Keeps the chapter expanded while search results are shown. */
  forceOpen: boolean
  currentLessonId: string
  progress: CourseProgress | undefined
  onNavigate?: () => void
}

function ChapterGroup({
  courseId,
  chapter,
  number,
  forceOpen,
  currentLessonId,
  progress,
  onNavigate,
}: ChapterGroupProps) {
  const containsCurrent = chapter.lessons.some(
    (l) => lessonId(chapter.id, l.slug) === currentLessonId,
  )
  const [open, setOpen] = useState(containsCurrent)
  // Auto-expand when navigation moves into this chapter (derived during render, not in an effect).
  const [wasCurrent, setWasCurrent] = useState(containsCurrent)
  if (containsCurrent !== wasCurrent) {
    setWasCurrent(containsCurrent)
    if (containsCurrent) setOpen(true)
  }
  const activeRef = useRef<HTMLAnchorElement>(null)
  const expanded = open || forceOpen

  useEffect(() => {
    if (containsCurrent) activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [containsCurrent, currentLessonId])

  return (
    <Collapsible open={expanded} onOpenChange={setOpen} className="border-b">
      <CollapsibleTrigger className="flex w-full items-start gap-1.5 px-5 py-4 text-left text-[15px] leading-snug font-semibold hover:bg-accent/50">
        <span className="shrink-0 tabular-nums">{number}.</span>
        <span className="flex-1">{chapter.title}</span>
        <ChevronDown
          className={cn(
            'mt-0.5 ml-2 size-4 shrink-0 text-muted-foreground transition-transform',
            expanded && 'rotate-180',
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="grid gap-0.5 pb-3">
          {chapter.lessons.map((l) => {
            const id = lessonId(chapter.id, l.slug)
            const isCurrent = id === currentLessonId
            return (
              <li key={id}>
                <NavLink
                  ref={isCurrent ? activeRef : undefined}
                  to={`/courses/${courseId}/${id}`}
                  onClick={onNavigate}
                  className={cn(
                    'relative flex items-start gap-3 py-2.5 pr-5 pl-8 text-sm leading-snug text-foreground/75 hover:bg-accent/50 hover:text-foreground',
                    isCurrent &&
                      'bg-accent font-medium text-foreground before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-primary',
                  )}
                >
                  <LessonStatusIcon
                    kind={l.kind}
                    done={Boolean(progress && id in progress.completed)}
                    className="mt-0.5"
                  />
                  <span className="flex-1">{l.title}</span>
                  {progress && id in progress.bookmarks && (
                    <Bookmark
                      className="mt-0.5 size-3.5 shrink-0 fill-current text-primary"
                      aria-label="Bookmarked"
                    />
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
