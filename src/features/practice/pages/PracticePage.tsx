import { ProblemSetCard } from '../components/ProblemSetCard'
import { useProblemSets } from '../practice-context'

export default function PracticePage() {
  const problemSets = useProblemSets()
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Practice real <span className="text-primary">interview</span> questions.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Solve coding questions reported from real interviews in a LeetCode-style workspace. Run
          your code against examples or your own inputs, then submit it against hidden tests, in
          JavaScript, TypeScript or Python, right in your browser.
        </p>
      </section>
      <h2 className="mb-4 text-xl font-semibold">Problem sets</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {problemSets.map((set) => (
          <ProblemSetCard key={set.id} problemSet={set} />
        ))}
      </div>
    </div>
  )
}
