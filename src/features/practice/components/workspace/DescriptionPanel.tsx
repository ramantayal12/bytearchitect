import { CheckCircle2, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatValue } from '../../judge'
import type { LoadedProblem, Problem } from '../../practice.types'
import { formatInput } from '../../problem.logic'
import { DifficultyLabel } from '../labels'

/** Examples are rendered from the judged data, so they always match the test cases. */
function Examples({ loaded }: { loaded: LoadedProblem }) {
  const { signature, examples } = loaded.definition
  return (
    <div className="not-prose my-6 grid gap-5">
      {examples.map((example, i) => (
        <div key={i}>
          <p className="mb-2 font-semibold">Example {i + 1}:</p>
          <pre className="overflow-x-auto rounded-md border-l-2 bg-muted/50 px-4 py-3 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
            <strong>Input:</strong> {formatInput(signature, example.args).replaceAll('\n', ', ')}
            {'\n'}
            <strong>Output:</strong> {formatValue(example.expected)}
            {example.explanation && (
              <>
                {'\n'}
                <strong>Explanation:</strong> {example.explanation}
              </>
            )}
          </pre>
        </div>
      ))}
    </div>
  )
}

export function DescriptionPanel({
  problem,
  loaded,
  solved,
}: {
  problem: Problem
  loaded: LoadedProblem
  solved: boolean
}) {
  const { Statement } = loaded
  return (
    <article className="grid grid-cols-1 gap-5 px-5 py-5">
      <header className="grid gap-3">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {problem.number}. {problem.title}
          </h1>
          {solved && (
            <span className="mt-1.5 flex shrink-0 items-center gap-1 text-sm text-success">
              Solved <CheckCircle2 className="size-4" />
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="secondary">
            <DifficultyLabel difficulty={problem.difficulty} />
          </Badge>
          {problem.topics.map((t) => (
            <Badge key={t} variant="outline" className="font-normal text-muted-foreground">
              {t}
            </Badge>
          ))}
        </div>
      </header>

      <div className="prose max-w-none prose-neutral dark:prose-invert prose-a:text-primary prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted/50">
        <Statement components={{ Examples: () => <Examples loaded={loaded} /> }} />
      </div>

      <footer className="border-t pt-4 text-sm text-muted-foreground">
        Reported in: {problem.source.round}, {problem.source.date}.{' '}
        <a
          href={problem.source.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          Original discussion <ExternalLink className="size-3.5" />
        </a>
      </footer>
    </article>
  )
}
