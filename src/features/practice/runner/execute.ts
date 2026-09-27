import { outputsMatch } from '../judge'
import type { Language, Signature, TestCase } from '../practice.types'
import { createJavaScriptHarness } from './javascript'
import type { Harness, RunnerEvent, RunRequest } from './protocol'

export type Emit = (event: RunnerEvent) => void

export type HarnessFactories = Record<
  Language,
  (signature: Signature, emit: Emit) => Harness | Promise<Harness>
>

const message = (error: unknown) => (error instanceof Error ? error.message : String(error))

/** Recomputes expected outputs with the reference solution; undefined if an input is invalid. */
async function withReferenceOutputs(
  request: RunRequest & { reference: string },
  emit: Emit,
): Promise<TestCase[] | undefined> {
  const reference = createJavaScriptHarness(request.signature)
  const error = await reference.prepare(request.reference)
  if (error) throw new Error(`Reference solution failed to load: ${error}`)
  const tests: TestCase[] = []
  for (const [index, test] of request.tests.entries()) {
    emit({ type: 'phase', phase: { name: 'reference', index } })
    const result = await reference.run(test.args)
    if (!result.ok) {
      // Line numbers would point into the hidden reference solution.
      emit({ type: 'invalid-input', index, message: result.error.replace(/ \(line \d+\)$/, '') })
      return undefined
    }
    tests.push({ args: test.args, expected: result.value })
  }
  return tests
}

/**
 * Runs a request and reports progress as events. Shared by the browser worker and the
 * content tests, so problems are verified with exactly the code learners are judged by.
 */
export async function executeRequest(request: RunRequest, factories: HarnessFactories, emit: Emit) {
  try {
    const tests =
      request.reference === undefined
        ? request.tests
        : await withReferenceOutputs({ ...request, reference: request.reference }, emit)
    if (!tests) return

    const harness = await factories[request.language](request.signature, emit)
    emit({ type: 'phase', phase: { name: 'compile' } })
    const compileError = await harness.prepare(request.code)
    if (compileError !== undefined) {
      emit({ type: 'compile-error', message: compileError })
      return
    }

    for (const [index, test] of tests.entries()) {
      emit({ type: 'phase', phase: { name: 'case', index } })
      const execution = await harness.run(test.args)
      const passed = execution.ok && outputsMatch(execution.value, test.expected, request.compare)
      emit({
        type: 'case',
        index,
        result: {
          passed,
          args: test.args,
          expected: test.expected,
          ...(execution.ok ? { output: execution.value } : { error: execution.error }),
          stdout: execution.stdout,
          timeMs: execution.timeMs,
        },
      })
      // A runtime error ends the run, as on LeetCode; so does any failure on Submit.
      if (!execution.ok || (!passed && request.stopOnFailure)) break
    }
    emit({ type: 'done' })
  } catch (error) {
    emit({ type: 'crash', message: message(error) })
  }
}
