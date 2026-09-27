import { describe, expect, it } from 'vitest'
import { defineProblem, defineProblemSet, problem } from './defineProblemSet'
import { formatValue, outputsMatch, toJsonValue, truncate } from './judge'
import type { ClassSignature, FunctionSignature } from './practice.types'
import {
  formatInput,
  matchesType,
  parseCaseTexts,
  toCaseTexts,
  validateProblem,
} from './problem.logic'
import type { JudgedRun } from './runner/protocol'
import { starterCode } from './signature'
import { formatTimeAgo, toSubmission } from './submission.logic'
import { createMemorySubmissionRepository } from './submissions.repository'

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

describe('outputsMatch', () => {
  it('compares deeply and exactly by default', () => {
    expect(outputsMatch([1, [2, 3]], [1, [2, 3]])).toBe(true)
    expect(outputsMatch([1, 2], [2, 1])).toBe(false)
    expect(outputsMatch({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(outputsMatch('1', 1)).toBe(false)
  })

  it('ignores top-level order when unordered', () => {
    expect(outputsMatch([[1, 2], [3]], [[3], [1, 2]], 'unordered')).toBe(true)
    expect(outputsMatch([[2, 1], [3]], [[3], [1, 2]], 'unordered')).toBe(false)
  })

  it('tolerates floating-point error when float', () => {
    expect(outputsMatch([0.1 + 0.2], [0.3], 'float')).toBe(true)
    expect(outputsMatch([0.3001], [0.3], 'float')).toBe(false)
  })
})

describe('toJsonValue', () => {
  it('normalizes values the way the Python harness does', () => {
    expect(toJsonValue(undefined)).toBeNull()
    expect(toJsonValue(new Set([1, 2]))).toEqual([1, 2])
    expect(toJsonValue(new Int32Array([3]))).toEqual([3])
    expect(toJsonValue(-0)).toBe(0)
  })

  it('rejects values without a JSON form', () => {
    expect(() => toJsonValue(NaN)).toThrow(/NaN/)
    expect(() => toJsonValue(1n)).toThrow(/BigInt/)
    const cycle: unknown[] = []
    cycle.push(cycle)
    expect(() => toJsonValue(cycle)).toThrow(/circular/)
  })

  it('formats and truncates for display', () => {
    expect(formatValue(['a', 1, null])).toBe('["a",1,null]')
    expect(truncate('abcdef', 3)).toBe('abc… (3 more characters)')
  })
})

describe('matchesType', () => {
  it.each([
    [3, 'int', true],
    [3.5, 'int', false],
    [3.5, 'double', true],
    [[[1], [2]], 'int[][]', true],
    [[1, '2'], 'int[]', false],
    [null, 'void', true],
    ['a', 'string', true],
  ] as const)('%j is %s: %s', (value, type, expected) => {
    expect(matchesType(value, type)).toBe(expected)
  })
})

describe('validateProblem', () => {
  const valid = defineProblem({
    signature: twoSum,
    examples: [{ args: [[2, 7], 9], expected: [0, 1] }],
    tests: [{ args: [[3, 3], 6], expected: [0, 1] }],
    solution: { javascript: 'function twoSum() {}', python: 'class Solution: pass' },
  })

  it('accepts a well-formed problem', () => {
    expect(validateProblem(valid)).toEqual([])
  })

  it('reports tests that do not fit the signature', () => {
    expect(
      validateProblem({
        ...valid,
        tests: [
          { args: [[3, 3]], expected: [0, 1] },
          { args: [['3'], 6], expected: 1 },
          { args: [[2, 7], 9], expected: [0, 1] },
        ],
      }),
    ).toEqual([
      'test 2: expected 2 arguments, got 1',
      'test 3: argument nums is not int[]',
      'test 3: expected output is not int[]',
      'duplicate test inputs',
    ])
  })

  it('checks every call of a design problem', () => {
    const problems = validateProblem({
      ...valid,
      signature: counter,
      examples: [
        {
          args: [
            ['Counter', 'add', 'reset', 'get'],
            [[1], ['x'], [], []],
          ],
          expected: [null, null, null, 'one'],
        },
      ],
      tests: [],
    })
    expect(problems).toEqual([
      'example 1: call 1: n is not int',
      'example 1: call 2: unknown method reset',
      'example 1: call 3: expected output is not int',
    ])
  })
})

describe('starter code', () => {
  it('generates LeetCode-style signatures in every language', () => {
    expect(starterCode(twoSum, 'python')).toBe(
      'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass\n',
    )
    expect(starterCode(twoSum, 'typescript')).toBe(
      'function twoSum(nums: number[], target: number): number[] {\n  \n}\n',
    )
    expect(starterCode(twoSum, 'javascript')).toContain(' * @param {number[]} nums\n')
    expect(starterCode(counter, 'python')).toContain('    def add(self, n: int) -> None:\n')
    expect(starterCode(counter, 'javascript')).toContain('class Counter {\n')
  })
})

describe('custom test cases', () => {
  it('round-trips through the editor text', () => {
    const texts = toCaseTexts([{ args: [[1, 2], 3] }])
    expect(texts).toEqual([['[1,2]', '3']])
    expect(parseCaseTexts(texts, ['nums', 'target'])).toEqual({
      tests: [{ args: [[1, 2], 3], expected: null }],
    })
  })

  it('points at the first input that is not JSON', () => {
    expect(
      parseCaseTexts(
        [
          ['[1]', '2'],
          ['[1', '2'],
        ],
        ['nums', 'target'],
      ),
    ).toEqual({
      index: 1,
      error: 'Case 2: nums is not valid JSON.',
    })
  })

  it('formats inputs with their names', () => {
    expect(formatInput(twoSum, [[1, 2], 3])).toBe('nums = [1,2]\ntarget = 3')
    expect(formatInput(counter, [['Counter'], [[1]]])).toBe(
      'operations = ["Counter"]\narguments = [[1]]',
    )
  })
})

describe('toSubmission', () => {
  const run = (overrides: Partial<JudgedRun>): JudgedRun => ({
    kind: 'judged',
    verdict: 'Accepted',
    cases: [],
    total: 2,
    passed: 2,
    runtimeMs: 12,
    ...overrides,
  })
  const tests = [
    { args: [[2, 7], 9], expected: [0, 1] },
    { args: [[3, 3], 6], expected: [0, 1] },
  ]

  it('records the first failing test for a wrong answer', () => {
    const submission = toSubmission(
      run({
        verdict: 'Wrong Answer',
        passed: 1,
        failedIndex: 1,
        cases: [
          { passed: true, args: [], expected: [0, 1], output: [0, 1], stdout: '', timeMs: 1 },
          { passed: false, args: [], expected: [0, 1], output: [1, 0], stdout: 'dbg\n', timeMs: 1 },
        ],
      }),
      tests,
      twoSum,
      'javascript',
      'code',
    )
    expect(submission).toEqual({
      language: 'javascript',
      code: 'code',
      verdict: 'Wrong Answer',
      passed: 1,
      total: 2,
      runtimeMs: 12,
      failure: {
        input: 'nums = [3,3]\ntarget = 6',
        expected: '[0,1]',
        output: '[1,0]',
        stdout: 'dbg\n',
      },
    })
  })

  it('records the time-out message for the test that did not finish', () => {
    const submission = toSubmission(
      run({ verdict: 'Time Limit Exceeded', passed: 0, failedIndex: 0, message: 'Too slow' }),
      tests,
      twoSum,
      'python',
      'code',
    )
    expect(submission.failure).toEqual({
      input: 'nums = [2,7]\ntarget = 9',
      expected: '[0,1]',
      error: 'Too slow',
    })
  })

  it('records only the error for a compile error, and nothing for an accepted run', () => {
    expect(
      toSubmission(
        run({ verdict: 'Compile Error', message: 'SyntaxError' }),
        tests,
        twoSum,
        'python',
        'x',
      ).failure,
    ).toEqual({ error: 'SyntaxError' })
    expect(toSubmission(run({}), tests, twoSum, 'python', 'x').failure).toBeUndefined()
  })
})

describe('formatTimeAgo', () => {
  it('uses the largest whole unit', () => {
    const now = Date.UTC(2026, 0, 10)
    expect(formatTimeAgo(now - 20_000, now)).toBe('just now')
    expect(formatTimeAgo(now - 3 * 60_000, now)).toBe('3 minutes ago')
    expect(formatTimeAgo(now - 26 * 3600_000, now)).toBe('yesterday')
  })
})

describe('defineProblemSet', () => {
  const set = defineProblemSet({
    meta: { id: 's', title: 'S', subtitle: '', description: '', source: { title: '', url: '' } },
    problems: [
      problem('a', 'A', 'Easy', [], { round: 'Onsite', date: '2024', url: '' }),
      problem('b', 'B', 'Hard', [], { round: 'Onsite', date: '2024', url: '' }),
    ],
    files: async () => ({
      definitionFiles: { './problems/b.problem.ts': async () => ({ signature: twoSum }) },
      mdxFiles: {
        './problems/b.mdx': async () => ({ default: () => 'statement' }),
        './problems/b.solution.mdx': async () => ({ default: () => 'editorial' }),
      },
    }),
  })

  it('numbers problems and loads their files by slug', async () => {
    expect(set.getProblem('b')).toMatchObject({ number: 2, setId: 's' })
    const loaded = await set.loadProblem('b')
    expect(loaded.definition.signature).toBe(twoSum)
    expect(loaded.Editorial).toBeDefined()
    await expect(set.loadProblem('a')).rejects.toThrow(/has no definition/)
  })
})

describe('createMemorySubmissionRepository', () => {
  it('lists submissions per user and problem, newest first', async () => {
    const repo = createMemorySubmissionRepository()
    const base = { language: 'python', code: '', passed: 0, total: 1, runtimeMs: 0 } as const
    await repo.add('u1', 's/a', { ...base, verdict: 'Wrong Answer' })
    await repo.add('u1', 's/a', { ...base, verdict: 'Accepted' })
    await repo.add('u2', 's/a', { ...base, verdict: 'Compile Error' })
    expect((await repo.list('u1', 's/a')).map((s) => s.verdict)).toEqual([
      'Accepted',
      'Wrong Answer',
    ])
    expect(await repo.list('u1', 's/b')).toEqual([])
  })
})
