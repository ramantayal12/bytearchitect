import { CheckCircle2, ExternalLink, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/features/auth'
import { useCourseProgress } from '@/features/progress'
import { cn } from '@/lib/utils'
import { DifficultyLabel } from '../components/labels'
import { NotFound } from '../components/NotFound'
import { useProblemSet } from '../practice-context'
import type { Difficulty } from '../practice.types'

const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard']

export default function ProblemSetPage() {
  const { setId } = useParams()
  const problemSet = useProblemSet(setId)
  const { user } = useAuth()
  const { data: progress } = useCourseProgress(setId ?? '')
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>()
  const [topic, setTopic] = useState<string | undefined>()

  const topics = useMemo(
    () => [...new Set(problemSet?.problems.flatMap((p) => p.topics))].sort(),
    [problemSet],
  )

  if (!problemSet) return <NotFound message="That problem set doesn’t exist." />

  const solved = (slug: string) => Boolean(progress && slug in progress.completed)
  const solvedCount = problemSet.problems.filter((p) => solved(p.slug)).length
  const query = search.trim().toLowerCase()
  const visible = problemSet.problems.filter(
    (p) =>
      (!query || `${p.number}. ${p.title}`.toLowerCase().includes(query)) &&
      (!difficulty || p.difficulty === difficulty) &&
      (!topic || p.topics.includes(topic)),
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="grid gap-4 border-b pb-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/practice" className="hover:text-foreground">
            Practice
          </Link>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{problemSet.title}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">{problemSet.description}</p>
        <a
          href={problemSet.source.url}
          target="_blank"
          rel="noreferrer"
          className="flex w-fit items-center gap-1 text-sm text-primary hover:underline"
        >
          Source: {problemSet.source.title}
          <ExternalLink className="size-3.5" />
        </a>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="text-muted-foreground">{problemSet.problems.length} problems</span>
          {difficulties.map((d) => (
            <span key={d} className="text-muted-foreground">
              <DifficultyLabel difficulty={d} />{' '}
              {problemSet.problems.filter((p) => p.difficulty === d).length}
            </span>
          ))}
          {progress ? (
            <span className="flex min-w-60 flex-1 items-center gap-3 text-muted-foreground">
              <Progress
                value={(solvedCount / problemSet.problems.length) * 100}
                className="h-2 max-w-xs flex-1"
              />
              {solvedCount}/{problemSet.problems.length} solved
            </span>
          ) : (
            !user && (
              <span className="text-muted-foreground">
                Free account required to solve problems.
              </span>
            )
          )}
        </div>
      </header>

      <section className="grid gap-4 py-8" aria-label="Problems">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions"
              aria-label="Search questions"
              className="pl-9"
            />
          </div>
          <div className="flex gap-1" role="group" aria-label="Difficulty">
            {difficulties.map((d) => (
              <Button
                key={d}
                size="sm"
                variant={difficulty === d ? 'secondary' : 'ghost'}
                aria-pressed={difficulty === d}
                onClick={() => setDifficulty(difficulty === d ? undefined : d)}
              >
                {d}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Topics">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(topic === t ? undefined : t)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs transition-colors',
                topic === t
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="w-12 px-4 py-3 font-medium">
                  <span className="sr-only">Status</span>
                </th>
                <th scope="col" className="px-2 py-3 font-medium">
                  Title
                </th>
                <th scope="col" className="hidden px-2 py-3 font-medium md:table-cell">
                  Topics
                </th>
                <th scope="col" className="hidden px-2 py-3 font-medium lg:table-cell">
                  Reported
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Difficulty
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.slug} className="border-b last:border-b-0 even:bg-muted/30">
                  <td className="px-4 py-3">
                    {solved(p.slug) && (
                      <CheckCircle2 className="size-4 text-success" aria-label="Solved" />
                    )}
                  </td>
                  <td className="px-2 py-3">
                    <Link
                      to={`/practice/${problemSet.id}/${p.slug}`}
                      className="font-medium hover:text-primary"
                    >
                      {p.number}. {p.title}
                    </Link>
                  </td>
                  <td className="hidden px-2 py-3 md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.topics.map((t) => (
                        <Badge key={t} variant="secondary" className="font-normal">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="hidden px-2 py-3 whitespace-nowrap text-muted-foreground lg:table-cell">
                    {p.source.round} · {p.source.date}
                  </td>
                  <td className="px-4 py-3">
                    <DifficultyLabel difficulty={p.difficulty} />
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                    No questions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
