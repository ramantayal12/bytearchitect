import { CheckCircle2, Loader2, Terminal, Timer, XCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { formatValue } from '../../judge'
import type { TestCase } from '../../practice.types'
import type { CaseResult, JudgedRun, RunOutcome } from '../../runner/protocol'
import { VerdictLabel } from '../labels'
import { ValueBlock } from './ValueBlock'

export interface RunState {
  mode: 'run' | 'submit'
  running: boolean
  /** Progress message from the runner, e.g. while Python loads. */
  status?: string
  tests: TestCase[]
  outcome?: RunOutcome
}

/** Input, stdout, output (or error) and expected output of one test case. */
function CaseDetail({
  names,
  test,
  result,
  message,
}: {
  names: string[]
  test: TestCase
  result: CaseResult | undefined
  message?: string
}) {
  return (
    <div className="grid gap-3">
      {names.map((name, i) => (
        <ValueBlock key={name} label={name} value={formatValue(test.args[i])} />
      ))}
      {result?.stdout && <ValueBlock label="Stdout" value={result.stdout} />}
      {result?.error !== undefined ? (
        <ValueBlock label="Error" value={result.error} tone="error" />
      ) : result ? (
        <ValueBlock label="Output" value={formatValue(result.output)} />
      ) : (
        message && <ValueBlock label="Error" value={message} tone="error" />
      )}
      {result && <ValueBlock label="Expected" value={formatValue(result.expected)} />}
    </div>
  )
}

function CaseIcon({ result, timedOut }: { result: CaseResult | undefined; timedOut: boolean }) {
  if (timedOut) return <Timer className="size-3.5 text-destructive" aria-label="Timed out" />
  if (!result) return null
  return result.passed ? (
    <CheckCircle2 className="size-3.5 text-success" aria-label="Passed" />
  ) : (
    <XCircle className="size-3.5 text-destructive" aria-label="Failed" />
  )
}

/** "Run": every case, with a tab per case. */
function RunCases({ run, outcome, names }: { run: RunState; outcome: JudgedRun; names: string[] }) {
  const [selected, setSelected] = useState(outcome.failedIndex ?? 0)
  const timedOut = (i: number) =>
    outcome.verdict === 'Time Limit Exceeded' && outcome.failedIndex === i
  const test = run.tests[selected]
  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Case results">
        {run.tests.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === selected}
            onClick={() => setSelected(i)}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1 text-sm',
              i === selected ? 'bg-secondary font-medium' : 'text-muted-foreground hover:bg-accent',
            )}
          >
            <CaseIcon result={outcome.cases[i]} timedOut={timedOut(i)} /> Case {i + 1}
          </button>
        ))}
      </div>
      {test && (
        <CaseDetail
          names={names}
          test={test}
          result={outcome.cases[selected]}
          message={timedOut(selected) ? outcome.message : 'Not run: an earlier case failed.'}
        />
      )}
    </>
  )
}

export function ResultPanel({ run, names }: { run: RunState | undefined; names: string[] }) {
  if (!run)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
        <Terminal className="size-6" />
        Run your code to see the results here.
      </div>
    )

  if (run.running || !run.outcome)
    return (
      <div role="status" className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        {run.status ?? (run.mode === 'submit' ? 'Judging…' : 'Running…')}
      </div>
    )

  const { outcome } = run
  if (outcome.kind === 'error')
    return (
      <div className="p-4">
        <ValueBlock label="The code runner failed" value={outcome.message} tone="error" />
      </div>
    )
  if (outcome.kind === 'invalid-input')
    return (
      <div className="p-4">
        <ValueBlock
          label={`Case ${outcome.index + 1} is not a valid input`}
          value={outcome.message}
          tone="error"
        />
      </div>
    )

  const failed = outcome.failedIndex === undefined ? undefined : run.tests[outcome.failedIndex]
  return (
    <div className="grid gap-4 p-4" aria-live="polite" data-testid="run-result">
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <VerdictLabel verdict={outcome.verdict} className="text-xl" />
        {outcome.verdict !== 'Compile Error' && (
          <span className="text-sm text-muted-foreground">
            {run.mode === 'submit' && `${outcome.passed} / ${outcome.total} testcases passed · `}
            Runtime: {outcome.runtimeMs} ms
          </span>
        )}
      </header>

      {outcome.verdict === 'Compile Error' ? (
        <ValueBlock label="Error" value={outcome.message ?? ''} tone="error" />
      ) : run.mode === 'run' ? (
        <RunCases run={run} outcome={outcome} names={names} />
      ) : failed ? (
        <>
          <p className="text-sm font-medium">Last executed input</p>
          <CaseDetail
            names={names}
            test={failed}
            result={outcome.cases[outcome.failedIndex!]}
            message={outcome.message}
          />
        </>
      ) : (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-success" />
          Your solution passed all {outcome.total} test cases, including the hidden ones.
        </p>
      )}
    </div>
  )
}
