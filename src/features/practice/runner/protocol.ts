import type { Comparison, Language, Signature, TestCase, Verdict } from '../practice.types'

/** Posted to the runner worker: run `code` against `tests`. */
export interface RunRequest {
  language: Language
  code: string
  signature: Signature
  tests: TestCase[]
  compare: Comparison
  /** Submit stops at the first failing test; Run executes every test. */
  stopOnFailure: boolean
  /**
   * JavaScript reference solution. When set, each test's expected output is recomputed with
   * it first, which is how custom test cases get an expected answer.
   */
  reference?: string
}

/** What running user code on one input produced, before it is judged. */
export type Execution = { stdout: string; timeMs: number } & (
  { ok: true; value: unknown } | { ok: false; error: string }
)

/** A language runtime that has user code loaded and can call it on inputs. */
export interface Harness {
  /** Loads the code; resolves to an error message if it doesn't compile or define the entry point. */
  prepare(code: string): Promise<string | undefined>
  run(args: unknown[]): Promise<Execution>
}

export interface CaseResult {
  passed: boolean
  args: unknown[]
  expected: unknown
  /** Present when the code returned normally. */
  output?: unknown
  /** Present when the code threw. */
  error?: string
  stdout: string
  timeMs: number
}

/** The worker is timed per phase; a phase that overruns its limit is a time-out. */
export type Phase =
  /** Computing a custom test's expected output with the reference solution. */
  { name: 'reference'; index: number } | { name: 'compile' } | { name: 'case'; index: number }

export type RunnerEvent =
  | { type: 'status'; message: string }
  | { type: 'phase'; phase: Phase }
  | { type: 'case'; index: number; result: CaseResult }
  | { type: 'compile-error'; message: string }
  | { type: 'invalid-input'; index: number; message: string }
  | { type: 'crash'; message: string }
  | { type: 'done' }

export interface JudgedRun {
  kind: 'judged'
  verdict: Verdict
  /** Results of the tests that ran, in order. */
  cases: CaseResult[]
  /** Number of tests in the request. */
  total: number
  passed: number
  runtimeMs: number
  /** First failing test (wrong answer, runtime error or time-out). */
  failedIndex?: number
  /** Compile error or time-limit details. */
  message?: string
}

export type RunOutcome =
  | JudgedRun
  /** A custom test case the reference solution rejected. */
  | { kind: 'invalid-input'; index: number; message: string }
  /** The runner itself failed, e.g. the Python runtime couldn't be downloaded. */
  | { kind: 'error'; message: string }
