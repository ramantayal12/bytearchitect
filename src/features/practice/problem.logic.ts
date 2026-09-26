import { formatValue } from './judge'
import type {
  Problem,
  ProblemDefinition,
  ReturnType,
  Signature,
  TestCase,
  ValueType,
} from './practice.types'

/** Unique across problem sets; used for submission history and editor drafts. */
export const problemKey = (problem: Pick<Problem, 'setId' | 'slug'>) =>
  `${problem.setId}/${problem.slug}`

/** Names of a test's inputs: the parameters, or LeetCode's two lines for design problems. */
export const inputNames = (signature: Signature): string[] =>
  signature.kind === 'function' ? signature.params.map((p) => p.name) : ['operations', 'arguments']

/** "nums = [1,2]\ntarget = 3" */
export const formatInput = (signature: Signature, args: unknown[]): string =>
  inputNames(signature)
    .map((name, i) => `${name} = ${formatValue(args[i])}`)
    .join('\n')

export function matchesType(value: unknown, type: ReturnType): boolean {
  if (type === 'void') return value === null
  if (type.endsWith('[]'))
    return (
      Array.isArray(value) && value.every((v) => matchesType(v, type.slice(0, -2) as ValueType))
    )
  switch (type) {
    case 'int':
      return Number.isInteger(value)
    case 'double':
      return typeof value === 'number' && Number.isFinite(value)
    case 'boolean':
      return typeof value === 'boolean'
    case 'string':
      return typeof value === 'string'
  }
  return false
}

/** Human-readable problems with one test case; empty when it fits the signature. */
function validateTestCase(signature: Signature, test: TestCase): string[] {
  const problems: string[] = []
  if (signature.kind === 'function') {
    if (test.args.length !== signature.params.length)
      return [`expected ${signature.params.length} arguments, got ${test.args.length}`]
    signature.params.forEach((p, i) => {
      if (!matchesType(test.args[i], p.type)) problems.push(`argument ${p.name} is not ${p.type}`)
    })
    if (!matchesType(test.expected, signature.returns))
      problems.push(`expected output is not ${signature.returns}`)
    return problems
  }

  const [operations, argumentLists] = test.args as [unknown, unknown]
  const expected = test.expected
  if (
    test.args.length !== 2 ||
    !Array.isArray(operations) ||
    !Array.isArray(argumentLists) ||
    !Array.isArray(expected) ||
    operations.length !== argumentLists.length ||
    operations.length !== expected.length
  )
    return ['operations, arguments and expected outputs must be arrays of equal length']
  if (operations[0] !== signature.className)
    problems.push(`the first operation must construct ${signature.className}`)
  operations.forEach((op, i) => {
    const method =
      i === 0
        ? { name: op as string, params: signature.constructorParams, returns: 'void' as const }
        : signature.methods.find((m) => m.name === op)
    const args = argumentLists[i] as unknown
    if (!method) return problems.push(`call ${i}: unknown method ${String(op)}`)
    if (!Array.isArray(args) || args.length !== method.params.length)
      return problems.push(`call ${i}: ${method.name} takes ${method.params.length} arguments`)
    method.params.forEach((p, j) => {
      if (!matchesType(args[j], p.type)) problems.push(`call ${i}: ${p.name} is not ${p.type}`)
    })
    if (!matchesType(expected[i], method.returns))
      problems.push(`call ${i}: expected output is not ${method.returns}`)
  })
  return problems
}

/** Validation used by content tests; returns human-readable problems. */
export function validateProblem(definition: ProblemDefinition): string[] {
  const problems: string[] = []
  if (definition.examples.length === 0) problems.push('needs at least one example')
  const all = [...definition.examples, ...definition.tests]
  all.forEach((test, i) => {
    const label = i < definition.examples.length ? `example ${i + 1}` : `test ${i + 1}`
    for (const p of validateTestCase(definition.signature, test)) problems.push(`${label}: ${p}`)
  })
  const inputs = all.map((t) => JSON.stringify(t.args))
  if (new Set(inputs).size !== inputs.length) problems.push('duplicate test inputs')
  if (!definition.solution.javascript.trim() || !definition.solution.python.trim())
    problems.push('needs JavaScript and Python reference solutions')
  return problems
}

/** The test-case editor's text (one JSON value per input) for the given tests. */
export const toCaseTexts = (tests: Pick<TestCase, 'args'>[]): string[][] =>
  tests.map((t) => t.args.map((a) => JSON.stringify(a)))

/**
 * Parses custom test cases from the editor. Their expected outputs are unknown here; the
 * runner computes them with the reference solution.
 */
export function parseCaseTexts(
  cases: string[][],
  names: string[],
): { tests: TestCase[] } | { error: string; index: number } {
  const tests: TestCase[] = []
  for (const [index, texts] of cases.entries()) {
    const args: unknown[] = []
    for (const [j, text] of texts.entries()) {
      try {
        args.push(JSON.parse(text))
      } catch {
        return { index, error: `Case ${index + 1}: ${names[j]} is not valid JSON.` }
      }
    }
    tests.push({ args, expected: null })
  }
  return { tests }
}
