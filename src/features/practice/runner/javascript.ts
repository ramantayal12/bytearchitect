import { toJsonValue } from '../judge'
import type { Signature } from '../practice.types'
import type { Execution, Harness } from './protocol'

const STDOUT_LIMIT = 16_384

const formatLogArg = (value: unknown) => {
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value) ?? String(value)
  } catch {
    return String(value)
  }
}

/**
 * `new Function` bodies start two lines into the generated source in V8 and SpiderMonkey,
 * so a stack frame's line minus two is the line in the learner's editor.
 */
function describeError(error: unknown): string {
  if (!(error instanceof Error)) return `Error: ${String(error)}`
  const frame = /<anonymous>:(\d+):\d+|Function:(\d+):\d+/.exec(error.stack ?? '')
  const line = Number(frame?.[1] ?? frame?.[2]) - 2
  return `${error.name}: ${error.message}${line > 0 ? ` (line ${line})` : ''}`
}

type Entry = ((...args: unknown[]) => unknown) & (new (...args: unknown[]) => object)

/**
 * Runs JavaScript (or TypeScript, via `transpile`) in the current realm. The worker gives
 * every JavaScript run a fresh realm, so user code can't leak into the next run.
 */
export function createJavaScriptHarness(
  signature: Signature,
  transpile?: (code: string) => Promise<string>,
): Harness {
  const entryName = signature.kind === 'function' ? signature.name : signature.className
  let entry: Entry | undefined
  let stdout = ''
  const write = (...args: unknown[]) => {
    if (stdout.length < STDOUT_LIMIT) stdout += args.map(formatLogArg).join(' ') + '\n'
  }
  const capturedConsole = { log: write, info: write, warn: write, error: write, debug: write }

  const call = (args: unknown[]): unknown => {
    if (!entry) throw new Error('Code is not loaded')
    if (signature.kind === 'function') return entry(...args)
    const [operations, argumentLists] = args as [string[], unknown[][]]
    let instance: Record<string, unknown> | undefined
    return operations.map((op, i) => {
      const opArgs = argumentLists[i] ?? []
      if (op === signature.className) {
        instance = new entry!(...opArgs) as Record<string, unknown>
        return null
      }
      const method = instance?.[op]
      if (typeof method !== 'function')
        throw new TypeError(`${signature.className}.${op} is not a function`)
      return toJsonValue(method.apply(instance, opArgs))
    })
  }

  return {
    async prepare(code) {
      let source = code
      try {
        if (transpile) source = await transpile(code)
      } catch (error) {
        return error instanceof Error ? `${error.name}: ${error.message}` : String(error)
      }
      try {
        const load = new Function(
          'console',
          `${source}\n;return typeof ${entryName} === 'undefined' ? undefined : ${entryName};`,
        )
        entry = load(capturedConsole) as Entry | undefined
      } catch (error) {
        return describeError(error)
      }
      if (typeof entry !== 'function') {
        const what = signature.kind === 'function' ? 'function' : 'class'
        return `ReferenceError: ${what} ${entryName} is not defined. Keep the ${what} name from the starter code.`
      }
      return undefined
    },

    async run(args): Promise<Execution> {
      stdout = ''
      const input = structuredClone(args)
      const start = performance.now()
      try {
        const value = toJsonValue(call(input))
        return { ok: true, value, stdout, timeMs: performance.now() - start }
      } catch (error) {
        return { ok: false, error: describeError(error), stdout, timeMs: performance.now() - start }
      }
    },
  }
}
