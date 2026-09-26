/**
 * Code runner worker. Learner code runs here, off the main thread: the page stays
 * responsive and an infinite loop is stopped by terminating the worker.
 */
import { executeRequest, type Emit } from './execute'
import { createJavaScriptHarness } from './javascript'
import type { RunnerEvent, RunRequest } from './protocol'
import { createPythonHarness, PYODIDE_INDEX_URL, type PythonRuntime } from './python'
import { transpileTypeScript } from './typescript'

const post = (event: RunnerEvent) =>
  (self as unknown as { postMessage(event: RunnerEvent): void }).postMessage(event)

let python: Promise<PythonRuntime> | undefined

/** Downloads Pyodide from the CDN once per worker; the Python worker is kept between runs. */
function loadPython(emit: Emit): Promise<PythonRuntime> {
  if (!python) {
    emit({ type: 'status', message: 'Loading the Python runtime…' })
    python = import(/* @vite-ignore */ `${PYODIDE_INDEX_URL}pyodide.mjs`)
      .then(({ loadPyodide }) => loadPyodide({ indexURL: PYODIDE_INDEX_URL }))
      .catch((error: unknown) => {
        python = undefined
        throw new Error(
          `Couldn't load the Python runtime. Check your connection and try again. (${String(error)})`,
        )
      })
  }
  return python
}

self.onmessage = (event: MessageEvent<RunRequest>) => {
  void executeRequest(
    event.data,
    {
      javascript: (signature) => createJavaScriptHarness(signature),
      typescript: (signature) => createJavaScriptHarness(signature, transpileTypeScript),
      python: async (signature, emit) => createPythonHarness(await loadPython(emit), signature),
    },
    post,
  )
}
