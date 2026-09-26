import { formatValue, truncate } from './judge'
import type { Language, NewSubmission, Signature, TestCase } from './practice.types'
import { formatInput } from './problem.logic'
import type { JudgedRun } from './runner/protocol'

/** Firestore rules cap stored code; LeetCode solutions are far shorter. */
export const MAX_CODE_LENGTH = 50_000
const MAX_DETAIL_LENGTH = 2000

/** The record stored for a judged submission, with its first failure formatted for display. */
export function toSubmission(
  run: JudgedRun,
  tests: TestCase[],
  signature: Signature,
  language: Language,
  code: string,
): NewSubmission {
  const submission: NewSubmission = {
    language,
    code,
    verdict: run.verdict,
    passed: run.passed,
    total: run.total,
    runtimeMs: run.runtimeMs,
  }
  if (run.verdict === 'Compile Error') {
    submission.failure = { error: truncate(run.message ?? '', MAX_DETAIL_LENGTH) }
    return submission
  }
  const test = run.failedIndex === undefined ? undefined : tests[run.failedIndex]
  if (!test) return submission
  const result = run.cases[run.failedIndex!]
  const error = result?.error ?? run.message
  submission.failure = {
    input: truncate(formatInput(signature, test.args), MAX_DETAIL_LENGTH),
    expected: truncate(formatValue(test.expected), MAX_DETAIL_LENGTH),
    ...(result?.output !== undefined && {
      output: truncate(formatValue(result.output), MAX_DETAIL_LENGTH),
    }),
    ...(error && { error: truncate(error, MAX_DETAIL_LENGTH) }),
    ...(result?.stdout && { stdout: truncate(result.stdout, MAX_DETAIL_LENGTH) }),
  }
  return submission
}

const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
]

/** "3 minutes ago", "yesterday", "just now". */
export function formatTimeAgo(epochMillis: number, now = Date.now()): string {
  const seconds = Math.round((epochMillis - now) / 1000)
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return relativeTime.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}
