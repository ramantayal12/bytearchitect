import type { CaseResult, JudgedRun, Phase, RunnerEvent, RunOutcome } from './protocol'

/** Verdict for the tests that ran: the first failure decides it, as on LeetCode. */
export function judge(cases: CaseResult[], total: number): JudgedRun {
  const failedIndex = cases.findIndex((c) => !c.passed)
  const failed = cases[failedIndex]
  return {
    kind: 'judged',
    verdict: !failed ? 'Accepted' : failed.error !== undefined ? 'Runtime Error' : 'Wrong Answer',
    cases,
    total,
    passed: cases.filter((c) => c.passed).length,
    runtimeMs: Math.round(cases.reduce((sum, c) => sum + c.timeMs, 0)),
    ...(failed && { failedIndex }),
  }
}

/** Folds the worker's event stream into an outcome; `outcome` is set once the run ends. */
export class OutcomeCollector {
  private readonly cases: CaseResult[] = []
  private readonly total: number
  private phase: Phase | undefined
  outcome: RunOutcome | undefined

  constructor(total: number) {
    this.total = total
  }

  add(event: RunnerEvent) {
    switch (event.type) {
      case 'phase':
        this.phase = event.phase
        break
      case 'case':
        this.cases[event.index] = event.result
        break
      case 'compile-error':
        this.outcome = {
          ...judge([], this.total),
          verdict: 'Compile Error',
          message: event.message,
        }
        break
      case 'invalid-input':
        this.outcome = { kind: 'invalid-input', index: event.index, message: event.message }
        break
      case 'crash':
        this.outcome = { kind: 'error', message: event.message }
        break
      case 'done':
        this.outcome = judge(this.cases, this.total)
        break
    }
  }

  /** The outcome when the current phase overran its time limit. */
  timeOut(limitMs: number): RunOutcome {
    const seconds = `${limitMs / 1000} s`
    switch (this.phase?.name) {
      case 'reference':
        return {
          kind: 'invalid-input',
          index: this.phase.index,
          message: `Computing the expected output took longer than ${seconds}. Try a smaller input.`,
        }
      case 'case':
        return {
          ...judge(this.cases, this.total),
          verdict: 'Time Limit Exceeded',
          failedIndex: this.phase.index,
          message: `Test case ${this.phase.index + 1} ran longer than ${seconds}.`,
        }
      default:
        return {
          ...judge([], this.total),
          verdict: 'Time Limit Exceeded',
          message: `Your code's top-level statements ran longer than ${seconds}.`,
        }
    }
  }
}
