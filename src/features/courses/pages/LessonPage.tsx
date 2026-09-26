import { AlertTriangle, ChevronRight, Clock, ListChecks, PanelLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { nextQuizScore, useCourseProgress, useUpdateProgress } from '@/features/progress'
import { Quiz, type QuizResult } from '@/features/quiz'
import { formatMinutes, getAdjacentLessons } from '../course.logic'
import type { Course, Lesson } from '../course.types'
import { BookmarkButton } from '../components/BookmarkButton'
import { CourseSidebar } from '../components/CourseSidebar'
import { LessonNav } from '../components/LessonNav'
import { LessonRail } from '../components/LessonRail'
import { useCourse } from '../courses-context'
import { useLessonModules, usePrefetchLesson } from '../lesson.hooks'
import { useHeadings } from '../reading.hooks'
import NotFoundPage from './NotFoundPage'

export default function LessonPage() {
  const { courseId, chapterId, lessonSlug } = useParams()
  const course = useCourse(courseId)
  const lesson = course?.getLesson(`${chapterId}/${lessonSlug}`)
  if (!course || !lesson) return <NotFoundPage message="That lesson doesn’t exist." />
  return <LessonView key={lesson.id} course={course} lesson={lesson} />
}

function LessonView({ course, lesson }: { course: Course; lesson: Lesson }) {
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)
  // State-backed ref so the right rail re-reads headings once the article mounts.
  const [article, setArticle] = useState<HTMLElement | null>(null)
  const headings = useHeadings(article)
  const { data: progress } = useCourseProgress(course.id)
  const updateProgress = useUpdateProgress(course.id)
  const modules = useLessonModules(course, lesson)
  const prefetch = usePrefetchLesson(course)
  const { previous, next } = getAdjacentLessons(course.lessons, lesson.id)
  const completed = Boolean(progress && lesson.id in progress.completed)
  const bookmarked = Boolean(progress && lesson.id in progress.bookmarks)
  const quizScore = progress?.quizzes[lesson.id]

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [lesson.id])

  useEffect(() => {
    if (modules.isSuccess) prefetch(next)
  }, [modules.isSuccess, next, prefetch])

  const completeAndContinue = () => {
    if (!completed)
      updateProgress.mutate({
        completed: { [lesson.id]: true },
        lastLessonId: next?.id ?? lesson.id,
      })
    if (next) navigate(`/courses/${course.id}/${next.id}`)
    else {
      toast.success('You’ve reached the end of the course. Congratulations!')
      navigate(`/courses/${course.id}`)
    }
  }

  const toggleComplete = () =>
    updateProgress.mutate({ completed: { [lesson.id]: !completed }, lastLessonId: lesson.id })

  const toggleBookmark = () => updateProgress.mutate({ bookmarks: { [lesson.id]: !bookmarked } })

  const resetProgress = () =>
    updateProgress.mutate(
      { reset: true },
      { onSuccess: () => toast.success('Course progress has been reset.') },
    )

  const recordQuiz = (result: QuizResult) => {
    const score = nextQuizScore(quizScore, result.correct, result.total)
    // Taking a chapter quiz counts as completing it.
    updateProgress.mutate({
      quizzes: { [lesson.id]: score },
      ...(lesson.kind === 'quiz' && { completed: { [lesson.id]: true } }),
      lastLessonId: lesson.id,
    })
  }

  const sidebar = (onNavigate?: () => void) => (
    <CourseSidebar
      course={course}
      currentLessonId={lesson.id}
      progress={progress}
      onNavigate={onNavigate}
      onReset={resetProgress}
    />
  )

  const Body = modules.data?.mdx?.default
  const description = modules.data?.mdx?.frontmatter?.description
  const questions = modules.data?.quiz

  return (
    <div className="flex">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-96 shrink-0 border-r bg-sidebar lg:block">
        {sidebar()}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-[60rem] px-5 py-10 sm:px-10">
          <div className="mb-8 flex items-center gap-3">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <PanelLeft /> Contents
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[22rem] max-w-[calc(100vw-2rem)] p-0"
                // Focus the panel, not the search box, so phones don't pop up the keyboard.
                onOpenAutoFocus={(e) => {
                  e.preventDefault()
                  ;(e.currentTarget as HTMLElement).focus()
                }}
              >
                <SheetTitle className="sr-only">Course contents</SheetTitle>
                {sidebar(() => setSheetOpen(false))}
              </SheetContent>
            </Sheet>
            <nav aria-label="Breadcrumb" className="min-w-0">
              <ol className="flex items-center gap-2 text-[15px] text-foreground/80">
                <li className="shrink-0">
                  <Link to="/" className="hover:text-foreground">
                    Courses
                  </Link>
                </li>
                <BreadcrumbSeparator />
                <li className="truncate">
                  <Link to={`/courses/${course.id}`} className="hover:text-foreground">
                    {course.title}
                  </Link>
                </li>
                <BreadcrumbSeparator />
                <li className="truncate text-muted-foreground" aria-current="page">
                  {lesson.chapterTitle}
                </li>
              </ol>
            </nav>
          </div>

          <header className="mb-10 grid gap-4">
            <div className="flex items-start gap-2">
              <h1 className="text-4xl leading-[1.15] font-bold tracking-tight sm:text-[2.75rem]">
                {lesson.title}
              </h1>
              {progress && (
                <BookmarkButton
                  bookmarked={bookmarked}
                  onToggle={toggleBookmark}
                  className="mt-1 shrink-0 sm:mt-2"
                />
              )}
            </div>
            {description && <p className="text-lg text-muted-foreground">{description}</p>}
            <p className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-4" /> {formatMinutes(lesson.minutes)}
              </span>
              {lesson.kind === 'quiz' && (
                <span className="flex items-center gap-1">
                  <ListChecks className="size-4" /> Chapter quiz
                </span>
              )}
            </p>
          </header>

          {modules.isPending && <LessonSkeleton />}
          {modules.isError && (
            <div
              role="alert"
              className="flex items-center gap-3 rounded-lg border border-destructive/40 p-4 text-sm"
            >
              <AlertTriangle className="size-5 text-destructive" />
              <span className="flex-1">This lesson failed to load. You may be offline.</span>
              <Button variant="outline" size="sm" onClick={() => modules.refetch()}>
                Retry
              </Button>
            </div>
          )}

          {Body && (
            <article
              ref={setArticle}
              className="lesson-prose prose prose-lg max-w-none prose-neutral dark:prose-invert prose-a:text-primary prose-img:rounded-lg"
            >
              <Body />
            </article>
          )}

          {questions && (
            <section className="mt-10" aria-label="Quiz">
              <Quiz
                questions={questions}
                title={lesson.kind === 'quiz' ? lesson.title : 'Test your understanding'}
                bestScore={quizScore?.best}
                onSubmit={recordQuiz}
              />
            </section>
          )}

          {modules.isSuccess && (
            <LessonNav
              courseId={course.id}
              previous={previous}
              next={next}
              completed={completed}
              onCompleteAndContinue={completeAndContinue}
              onToggleComplete={toggleComplete}
              onPrefetch={prefetch}
            />
          )}
        </div>
      </div>

      <aside
        aria-label="Lesson tools"
        className="sticky top-16 hidden h-[calc(100vh-4rem)] w-20 shrink-0 xl:block"
      >
        <LessonRail
          headings={headings}
          completed={completed}
          onToggleComplete={progress ? toggleComplete : undefined}
        />
      </aside>
    </div>
  )
}

function BreadcrumbSeparator() {
  return (
    <li aria-hidden className="shrink-0 text-muted-foreground">
      <ChevronRight className="size-3.5" />
    </li>
  )
}

function LessonSkeleton() {
  return (
    <div className="grid gap-3" aria-label="Loading lesson">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="mt-4 h-48 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
