// @vitest-environment node
import { loadPyodide } from 'pyodide'
import { beforeAll, describe, expect, it } from 'vitest'
import type { ClassSignature, FunctionSignature, Language } from '../practice.types'
import { inProcessHarnesses, runInProcess } from './in-process'
import type { HarnessFactories } from './execute'
import type { JudgedRun, RunRequest } from './protocol'

const twoSum: FunctionSignature = {
  kind: 'function',
  name: 'twoSum',
  params: [
    { name: 'nums', type: 'int[]' },
    { name: 'target', type: 'int' },
  ],
  returns: 'int[]',
}

const counter: ClassSignature = {
  kind: 'class',
  className: 'Counter',
  constructorParams: [{ name: 'start', type: 'int' }],
  methods: [
    { name: 'add', params: [{ name: 'n', type: 'int' }], returns: 'void' },
    { name: 'get', params: [], returns: 'int' },
  ],
}

const twoSumTests = [
  { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { args: [[3, 2, 4], 6], expected: [1, 2] },
  { args: [[3, 3], 6], expected: [0, 1] },
]

const counterTests = [
  {
    args: [
      ['Counter', 'add', 'get', 'add', 'get'],
      [[5], [2], [], [-1], []],
    ],
    expected: [null, null, 7, null, 6],
  },
]

const solutions = {
  javascript: `function twoSum(nums, target) {
  const seen = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i]
    seen.set(nums[i], i)
  }
}`,
  typescript: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i])!, i]
    seen.set(nums[i], i)
  }
  return []
}`,
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, n in enumerate(nums):
            if target - n in seen:
                return [seen[target - n], i]
            seen[n] = i`,
}

const counterSolutions = {
  javascript: `class Counter {
  constructor(start) { this.n = start }
  add(n) { this.n += n }
  get() { return this.n }
}`,
  typescript: `class Counter {
  private n: number
  constructor(start: number) { this.n = start }
  add(n: number): void { this.n += n }
  get(): number { return this.n }
}`,
  python: `class Counter:
    def __init__(self, start: int):
        self.n = start

    def add(self, n: int) -> None:
        self.n += n

    def get(self) -> int:
        return self.n`,
}

let harnesses: HarnessFactories

beforeAll(async () => {
  harnesses = inProcessHarnesses(await loadPyodide())
}, 60_000)

const run = (language: Language, code: string, overrides: Partial<RunRequest> = {}) =>
  runInProcess(
    {
      language,
      code,
      signature: twoSum,
      tests: twoSumTests,
      compare: 'exact',
      stopOnFailure: true,
      ...overrides,
    },
    harnesses,
  )

const judged = async (promise: Promise<unknown>) => {
  const outcome = (await promise) as JudgedRun
  expect(outcome.kind).toBe('judged')
  return outcome
}

describe.each(['javascript', 'typescript', 'python'] as const)('%s runner', (language) => {
  it('accepts a correct function solution', async () => {
    const outcome = await judged(run(language, solutions[language]))
    expect(outcome).toMatchObject({ verdict: 'Accepted', passed: 3, total: 3 })
    expect(outcome.cases.map((c) => c.output)).toEqual([
      [0, 1],
      [1, 2],
      [0, 1],
    ])
  })

  it('accepts a correct class solution driven by operations', async () => {
    const outcome = await judged(
      run(language, counterSolutions[language], { signature: counter, tests: counterTests }),
    )
    expect(outcome.verdict).toBe('Accepted')
    expect(outcome.cases[0]?.output).toEqual([null, null, 7, null, 6])
  })
})

describe('judging', () => {
  it('stops at the first wrong answer on submit and reports it', async () => {
    const outcome = await judged(run('javascript', 'function twoSum() { return [0, 1] }'))
    expect(outcome).toMatchObject({ verdict: 'Wrong Answer', passed: 1, failedIndex: 1 })
    expect(outcome.cases).toHaveLength(2)
    expect(outcome.cases[1]).toMatchObject({ output: [0, 1], expected: [1, 2], passed: false })
  })

  it('runs every case on "Run", even after a wrong answer', async () => {
    const outcome = await judged(
      run('javascript', 'function twoSum() { return [0, 1] }', { stopOnFailure: false }),
    )
    expect(outcome).toMatchObject({ verdict: 'Wrong Answer', passed: 2, failedIndex: 1 })
    expect(outcome.cases).toHaveLength(3)
  })

  it('reports compile errors with a line number', async () => {
    const js = await judged(run('javascript', 'function twoSum( {'))
    expect(js.verdict).toBe('Compile Error')
    expect(js.message).toMatch(/SyntaxError/)

    const py = await judged(run('python', 'class Solution:\n    def twoSum(self, nums, target)\n'))
    expect(py.verdict).toBe('Compile Error')
    expect(py.message).toMatch(/SyntaxError: .* \(line 2\)/)

    const ts = await judged(run('typescript', 'function twoSum(nums: number[] {'))
    expect(ts.verdict).toBe('Compile Error')
  })

  it('requires the entry point from the starter code', async () => {
    const js = await judged(run('javascript', 'function other() {}'))
    expect(js.message).toMatch(/function twoSum is not defined/)
    const py = await judged(run('python', 'class Solution:\n    def other(self): pass\n'))
    expect(py.message).toMatch(/method twoSum is not defined/)
  })

  it('reports runtime errors with the failing line and stops', async () => {
    const js = await judged(
      run('javascript', 'function twoSum(nums) {\n  return nums.missing.length\n}', {
        stopOnFailure: false,
      }),
    )
    expect(js).toMatchObject({ verdict: 'Runtime Error', failedIndex: 0 })
    expect(js.cases).toHaveLength(1)
    expect(js.cases[0]?.error).toMatch(/^TypeError: .* \(line 2\)$/)

    const py = await judged(
      run(
        'python',
        'class Solution:\n    def twoSum(self, nums, target):\n        return 1 // 0\n',
      ),
    )
    expect(py.verdict).toBe('Runtime Error')
    expect(py.cases[0]?.error).toMatch(/^ZeroDivisionError: .* \(line 3\)$/)
  })

  it('captures stdout per test case', async () => {
    const js = await judged(
      run(
        'javascript',
        'function twoSum(nums, t) { console.log("n =", nums.length, {t}); return [0, 1] }',
      ),
    )
    expect(js.cases[0]?.stdout).toBe('n = 4 {"t":9}\n')
    const py = await judged(
      run(
        'python',
        'class Solution:\n    def twoSum(self, nums, t):\n        print("n =", len(nums))\n        return [0, 1]\n',
      ),
    )
    expect(py.cases[0]?.stdout).toBe('n = 4\n')
  })

  it('does not let a test mutate the next test’s input', async () => {
    const code = 'function twoSum(nums, t) { nums.push(99); return [0, 1] }'
    const outcome = await judged(
      run('javascript', code, { tests: [twoSumTests[0]!, twoSumTests[0]!] }),
    )
    expect(outcome.cases.map((c) => c.args)).toEqual([twoSumTests[0]!.args, twoSumTests[0]!.args])
  })

  it('normalizes Python tuples and sets and JavaScript Sets to arrays', async () => {
    const py = await judged(
      run('python', 'class Solution:\n    def twoSum(self, nums, t):\n        return (0, 1)\n'),
    )
    expect(py.cases[0]).toMatchObject({ output: [0, 1], passed: true })
    const js = await judged(run('javascript', 'function twoSum() { return new Set([0, 1]) }'))
    expect(js.cases[0]).toMatchObject({ output: [0, 1], passed: true })
  })

  it('computes expected outputs for custom inputs with the reference solution', async () => {
    const outcome = await judged(
      run('python', solutions.python, {
        reference: solutions.javascript,
        tests: [{ args: [[1, 5, 9], 14], expected: 'ignored' }],
      }),
    )
    expect(outcome.cases[0]).toMatchObject({ expected: [1, 2], output: [1, 2], passed: true })
  })

  it('flags custom inputs the reference solution rejects', async () => {
    const outcome = await run('javascript', solutions.javascript, {
      reference:
        'function twoSum(nums) { if (!Array.isArray(nums)) throw new Error("nums must be an array") }',
      tests: [{ args: ['oops', 1], expected: null }],
    })
    expect(outcome).toEqual({
      kind: 'invalid-input',
      index: 0,
      message: 'Error: nums must be an array',
    })
  })
})
