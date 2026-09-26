import type { Comparison } from './practice.types'

const FLOAT_TOLERANCE = 1e-5

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

function deepEqual(
  a: unknown,
  b: unknown,
  numbersEqual: (x: number, y: number) => boolean,
): boolean {
  if (typeof a === 'number' && typeof b === 'number') return numbersEqual(a, b)
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => deepEqual(x, b[i], numbersEqual))
  }
  if (isRecord(a) && isRecord(b)) {
    const keys = Object.keys(a)
    return (
      keys.length === Object.keys(b).length &&
      keys.every((k) => k in b && deepEqual(a[k], b[k], numbersEqual))
    )
  }
  return a === b
}

const exactNumbers = (x: number, y: number) => x === y
const closeNumbers = (x: number, y: number) =>
  x === y || Math.abs(x - y) <= FLOAT_TOLERANCE * Math.max(1, Math.abs(x), Math.abs(y))

/** Does `actual` match `expected` under the problem's comparison mode? */
export function outputsMatch(actual: unknown, expected: unknown, mode: Comparison = 'exact') {
  if (mode === 'float') return deepEqual(actual, expected, closeNumbers)
  if (mode === 'unordered' && Array.isArray(actual) && Array.isArray(expected)) {
    const sort = (xs: unknown[]) => xs.map((x) => JSON.stringify(x)).sort()
    return deepEqual(sort(actual), sort(expected), exactNumbers)
  }
  return deepEqual(actual, expected, exactNumbers)
}

/**
 * Converts a value returned by user code into plain JSON data (what Python's harness also
 * produces): `undefined` becomes `null`, Sets/Maps/typed arrays become arrays and objects.
 * Throws for values that have no JSON form (BigInt, NaN, Infinity, cycles).
 */
export function toJsonValue(value: unknown): unknown {
  const seen = new Set<object>()
  const convert = (v: unknown): unknown => {
    if (v === undefined || v === null) return null
    if (typeof v === 'number') {
      if (!Number.isFinite(v)) throw new TypeError(`Output contains ${v}, which isn't valid JSON`)
      return Object.is(v, -0) ? 0 : v
    }
    if (typeof v === 'string' || typeof v === 'boolean') return v
    if (typeof v === 'bigint') throw new TypeError('Output contains a BigInt; return a number')
    if (typeof v === 'function' || typeof v === 'symbol')
      throw new TypeError(`Output contains a ${typeof v}`)
    if (seen.has(v)) throw new TypeError('Output contains a circular reference')
    seen.add(v)
    let result: unknown
    if (Array.isArray(v) || v instanceof Set || ArrayBuffer.isView(v))
      result = Array.from(v as Iterable<unknown>, convert)
    else if (v instanceof Map)
      result = Object.fromEntries([...v].map(([k, x]) => [String(k), convert(x)]))
    else result = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, convert(x)]))
    seen.delete(v)
    return result
  }
  return convert(value)
}

/** LeetCode-style rendering of a value: compact JSON. */
export const formatValue = (value: unknown): string => JSON.stringify(value ?? null)

/** Truncates long strings (e.g. huge hidden inputs) for display and storage. */
export const truncate = (text: string, max = 2000): string =>
  text.length <= max ? text : `${text.slice(0, max)}… (${text.length - max} more characters)`
