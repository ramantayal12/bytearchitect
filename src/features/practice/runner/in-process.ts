import { executeRequest, type HarnessFactories } from './execute'
import { createJavaScriptHarness } from './javascript'
import { OutcomeCollector } from './outcome'
import type { RunOutcome, RunRequest } from './protocol'
import { createPythonHarness, type PythonRuntime } from './python'
import { transpileTypeScript } from './typescript'

/** Harnesses running in the current realm; Python needs a loaded Pyodide runtime. */
export function inProcessHarnesses(python?: PythonRuntime): HarnessFactories {
  return {
    javascript: (signature) => createJavaScriptHarness(signature),
    typescript: (signature) => createJavaScriptHarness(signature, transpileTypeScript),
    python: (signature) => {
      if (!python) throw new Error('No Python runtime was provided')
      return createPythonHarness(python, signature)
    },
  }
}

/**
 * Runs a request without a worker or time limits. Used by tests (including the content
 * tests that verify every problem's reference solutions) to judge exactly as the app does.
 */
export async function runInProcess(
  request: RunRequest,
  harnesses: HarnessFactories = inProcessHarnesses(),
): Promise<RunOutcome> {
  const collector = new OutcomeCollector(request.tests.length)
  await executeRequest(request, harnesses, (event) => collector.add(event))
  return collector.outcome ?? { kind: 'error', message: 'The run ended without an outcome' }
}
