import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { FunctionSignature } from '../practice.types'
import { createCodeRunner, TIME_LIMIT_MS } from './code-runner'
import { executeRequest, type HarnessFactories } from './execute'
import type { Harness, RunnerEvent, RunRequest } from './protocol'

const signature: FunctionSignature = {
  kind: 'function',
  name: 'echo',
  params: [{ name: 'x', type: 'string' }],
  returns: 'string',
}

/** Echoes its input, except "hang", which never returns (an infinite loop). */
const echoHarness: Harness = {
  prepare: async () => undefined,
  run: ([x]) =>
    x === 'hang'
      ? new Promise(() => {})
      : Promise.resolve({ ok: true, value: x, stdout: '', timeMs: 2 }),
}
const factories: HarnessFactories = {
  javascript: () => echoHarness,
  typescript: () => echoHarness,
  python: (_signature, emit) => {
    emit({ type: 'status', message: 'Loading the Python runtime…' })
    return echoHarness
  },
}

/** Runs requests in-process but behaves like a Worker from the runner's point of view. */
class FakeWorker {
  onmessage: ((event: MessageEvent<RunnerEvent>) => void) | null = null
  onerror: ((event: ErrorEvent) => void) | null = null
  terminated = false
  postMessage(request: RunRequest) {
    void executeRequest(request, factories, (data) => {
      if (!this.terminated) this.onmessage?.({ data } as MessageEvent<RunnerEvent>)
    })
  }
  terminate() {
    this.terminated = true
  }
}

const request = (inputs: string[], overrides: Partial<RunRequest> = {}): RunRequest => ({
  language: 'javascript',
  code: '',
  signature,
  tests: inputs.map((x) => ({ args: [x], expected: x })),
  compare: 'exact',
  stopOnFailure: true,
  ...overrides,
})

describe('createCodeRunner', () => {
  let workers: FakeWorker[]
  const runner = () =>
    createCodeRunner(() => {
      const worker = new FakeWorker()
      workers.push(worker)
      return worker as unknown as Worker
    })

  beforeEach(() => {
    workers = []
    vi.useFakeTimers()
  })
  afterEach(() => vi.useRealTimers())

  it('judges a run and discards the JavaScript worker afterwards', async () => {
    const outcome = await runner().run(request(['a', 'b']))
    expect(outcome).toMatchObject({ kind: 'judged', verdict: 'Accepted', passed: 2, runtimeMs: 4 })
    expect(workers).toHaveLength(1)
    expect(workers[0]!.terminated).toBe(true)
  })

  it('stops a test that overruns the time limit and reports Time Limit Exceeded', async () => {
    const pending = runner().run(request(['a', 'hang', 'c']))
    await vi.advanceTimersByTimeAsync(TIME_LIMIT_MS.javascript)
    await expect(pending).resolves.toMatchObject({
      kind: 'judged',
      verdict: 'Time Limit Exceeded',
      passed: 1,
      failedIndex: 1,
      message: 'Test case 2 ran longer than 3 s.',
    })
    expect(workers[0]!.terminated).toBe(true)
  })

  it('keeps the Python worker between runs, reports loading status, and replaces it after a time-out', async () => {
    const codeRunner = runner()
    const onStatus = vi.fn()
    await codeRunner.run(request(['a'], { language: 'python' }), onStatus)
    await codeRunner.run(request(['b'], { language: 'python' }))
    expect(onStatus).toHaveBeenCalledWith('Loading the Python runtime…')
    expect(workers).toHaveLength(1)
    expect(workers[0]!.terminated).toBe(false)

    const pending = codeRunner.run(request(['hang'], { language: 'python' }))
    await vi.advanceTimersByTimeAsync(TIME_LIMIT_MS.python)
    await expect(pending).resolves.toMatchObject({ verdict: 'Time Limit Exceeded' })
    expect(workers[0]!.terminated).toBe(true)

    await codeRunner.run(request(['c'], { language: 'python' }))
    expect(workers).toHaveLength(2)

    codeRunner.dispose()
    expect(workers[1]!.terminated).toBe(true)
  })

  it('reports a worker that fails to start', async () => {
    const codeRunner = createCodeRunner(() => {
      const worker = new FakeWorker()
      worker.postMessage = () =>
        worker.onerror?.({ message: 'Boom', preventDefault() {} } as ErrorEvent)
      return worker as unknown as Worker
    })
    await expect(codeRunner.run(request(['a']))).resolves.toEqual({
      kind: 'error',
      message: 'Boom',
    })
  })
})
