import type { Language } from '../practice.types'
import { OutcomeCollector } from './outcome'
import type { RunnerEvent, RunOutcome, RunRequest } from './protocol'

/** Time limit per test case (and for loading the code); Python runs as WebAssembly, so it gets more. */
export const TIME_LIMIT_MS: Record<Language, number> = {
  javascript: 3000,
  typescript: 3000,
  python: 8000,
}

export interface CodeRunner {
  run(request: RunRequest, onStatus?: (message: string) => void): Promise<RunOutcome>
  dispose(): void
}

type WorkerLike = Pick<Worker, 'postMessage' | 'terminate' | 'onmessage' | 'onerror'>

const createRunnerWorker = (): WorkerLike =>
  new Worker(new URL('./runner.worker.ts', import.meta.url), { type: 'module' })

/**
 * Runs code in Web Workers. JavaScript and TypeScript get a fresh worker per run, so
 * nothing leaks between runs; the Python worker is kept, because loading Pyodide takes
 * seconds, and each run gets a fresh namespace. A run that overruns a time limit is
 * stopped by terminating its worker.
 */
export function createCodeRunner(createWorker: () => WorkerLike = createRunnerWorker): CodeRunner {
  let pythonWorker: WorkerLike | undefined
  let cancelActive: (() => void) | undefined

  return {
    run(request, onStatus) {
      cancelActive?.()
      const keep = request.language === 'python'
      const worker = keep ? (pythonWorker ??= createWorker()) : createWorker()
      const limit = TIME_LIMIT_MS[request.language]
      const collector = new OutcomeCollector(request.tests.length)

      return new Promise<RunOutcome>((resolve) => {
        let timer: ReturnType<typeof setTimeout> | undefined
        const finish = (outcome: RunOutcome, terminate: boolean) => {
          clearTimeout(timer)
          worker.onmessage = null
          worker.onerror = null
          cancelActive = undefined
          if (terminate || !keep) worker.terminate()
          if (terminate && worker === pythonWorker) pythonWorker = undefined
          resolve(outcome)
        }

        worker.onmessage = ({ data }: MessageEvent<RunnerEvent>) => {
          if (data.type === 'status') return onStatus?.(data.message)
          clearTimeout(timer)
          if (data.type === 'phase')
            timer = setTimeout(() => finish(collector.timeOut(limit), true), limit)
          collector.add(data)
          if (collector.outcome) finish(collector.outcome, false)
        }
        worker.onerror = (event) => {
          event.preventDefault()
          finish({ kind: 'error', message: event.message || 'The code runner failed.' }, true)
        }
        cancelActive = () => finish({ kind: 'error', message: 'The run was cancelled.' }, true)
        worker.postMessage(request)
      })
    },

    dispose() {
      cancelActive?.()
      pythonWorker?.terminate()
      pythonWorker = undefined
    },
  }
}
