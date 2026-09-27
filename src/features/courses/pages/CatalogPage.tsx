import { ProblemSetCard, useProblemSets } from '@/features/practice'
import { useCourses } from '../courses-context'
import { CourseCard } from '../components/CourseCard'

export default function CatalogPage() {
  const courses = useCourses()
  const problemSets = useProblemSets()
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Learn to design systems that <span className="text-primary">scale</span>.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Text-based, interactive courses with illustrated walkthroughs and quizzes after every
          lesson. No videos — read at your own pace and check your understanding as you go.
        </p>
      </section>
      <h2 className="mb-4 text-xl font-semibold">Courses</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="relative">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
      {problemSets.length > 0 && (
        <>
          <h2 className="mt-12 mb-4 text-xl font-semibold">Interview practice</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {problemSets.map((set) => (
              <ProblemSetCard key={set.id} problemSet={set} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
