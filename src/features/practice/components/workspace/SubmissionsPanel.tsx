import { AlertTriangle, ArrowLeft, Clock, History, PencilLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Language, Submission } from '../../practice.types'
import { languages } from '../../signature'
import { formatTimeAgo } from '../../submission.logic'
import { useSubmissions } from '../../submissions.hooks'
import { CodeEditor } from '../CodeEditor'
import { VerdictLabel } from '../labels'
import { ValueBlock } from './ValueBlock'

const languageLabel = (id: Language) => languages.find((l) => l.id === id)?.label ?? id
const hasRuntime = (s: Submission) =>
  s.verdict !== 'Compile Error' && s.verdict !== 'Time Limit Exceeded'

function SubmissionDetail({
  submission,
  onBack,
  onRestore,
}: {
  submission: Submission
  onBack: () => void
  onRestore: (language: Language, code: string) => void
}) {
  const { failure } = submission
  return (
    <div className="grid grid-cols-1 gap-5 px-5 py-4">
      <Button variant="ghost" size="sm" className="-ml-2 w-fit" onClick={onBack}>
        <ArrowLeft /> All submissions
      </Button>
      <header className="grid gap-1">
        <VerdictLabel verdict={submission.verdict} className="text-xl" />
        <p className="text-sm text-muted-foreground">
          {submission.verdict === 'Compile Error'
            ? 'Your code did not compile.'
            : `${submission.passed} / ${submission.total} testcases passed`}
          {' · '}
          <time dateTime={new Date(submission.createdAt).toISOString()}>
            Submitted {new Date(submission.createdAt).toLocaleString()}
          </time>
        </p>
      </header>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border px-4 py-3">
          <dt className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" /> Runtime
          </dt>
          <dd className="mt-1 font-semibold">
            {hasRuntime(submission) ? `${submission.runtimeMs} ms` : '—'}
          </dd>
        </div>
        <div className="rounded-lg border px-4 py-3">
          <dt className="text-xs text-muted-foreground">Language</dt>
          <dd className="mt-1 font-semibold">{languageLabel(submission.language)}</dd>
        </div>
      </dl>

      {failure && (
        <section className="grid gap-3" aria-label="Failure details">
          {failure.error && <ValueBlock label="Error" value={failure.error} tone="error" />}
          {failure.input && <ValueBlock label="Last executed input" value={failure.input} />}
          {failure.output !== undefined && <ValueBlock label="Output" value={failure.output} />}
          {failure.expected !== undefined && submission.verdict === 'Wrong Answer' && (
            <ValueBlock label="Expected" value={failure.expected} />
          )}
          {failure.stdout && <ValueBlock label="Stdout" value={failure.stdout} />}
        </section>
      )}

      <section className="grid gap-2" aria-label="Submitted code">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Code · {languageLabel(submission.language)}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRestore(submission.language, submission.code)}
          >
            <PencilLine /> Edit in editor
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <CodeEditor
            value={submission.code}
            language={submission.language}
            readOnly
            aria-label="Submitted code"
          />
        </div>
      </section>
    </div>
  )
}

export function SubmissionsPanel({
  problemKey,
  selectedId,
  onSelect,
  onRestore,
}: {
  problemKey: string
  selectedId: string | undefined
  onSelect: (id: string | undefined) => void
  onRestore: (language: Language, code: string) => void
}) {
  const { data: submissions, isPending, isError, refetch } = useSubmissions(problemKey)
  const selected = submissions?.find((s) => s.id === selectedId)

  if (selected)
    return (
      <SubmissionDetail
        submission={selected}
        onBack={() => onSelect(undefined)}
        onRestore={onRestore}
      />
    )

  if (isPending)
    return (
      <div className="grid gap-2 px-5 py-5" aria-label="Loading submissions">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )

  if (isError)
    return (
      <div
        role="alert"
        className="m-5 flex items-center gap-3 rounded-lg border border-destructive/40 p-4 text-sm"
      >
        <AlertTriangle className="size-5 text-destructive" />
        <span className="flex-1">Couldn’t load your submissions.</span>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    )

  if (submissions.length === 0)
    return (
      <div className="flex flex-col items-center gap-3 px-6 py-16 text-center text-sm text-muted-foreground">
        <History className="size-8" />
        No submissions yet. Submit your code to judge it against every test case.
      </div>
    )

  return (
    <ul className="grid px-3 py-3" aria-label="Submissions">
      {submissions.map((s) => (
        <li key={s.id}>
          <button
            type="button"
            onClick={() => onSelect(s.id)}
            className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 rounded-md px-3 py-2.5 text-left text-sm hover:bg-accent"
          >
            <VerdictLabel verdict={s.verdict} />
            <span className="text-muted-foreground">{languageLabel(s.language)}</span>
            <span className="text-xs text-muted-foreground">{formatTimeAgo(s.createdAt)}</span>
            <span className="text-xs text-muted-foreground">
              {hasRuntime(s) ? `${s.runtimeMs} ms` : '—'}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
