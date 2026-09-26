// @vitest-environment node
/**
 * Completeness and correctness checks for every problem set. They fail the build if an
 * outline entry is missing a file, a test case doesn't fit the signature, or a reference
 * solution (JavaScript or Python, judged exactly as in the browser) fails any test.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { compile } from '@mdx-js/mdx'
import { loadPyodide } from 'pyodide'
import remarkGfm from 'remark-gfm'
import { beforeAll, describe, expect, it } from 'vitest'
import {
  inProcessHarnesses,
  languages,
  PYODIDE_VERSION,
  runInProcess,
  starterCode,
  validateProblem,
  type ProblemDefinition,
  type ProblemRef,
} from '@/features/practice'

const MAX_EXAMPLES = 4
const MIN_HIDDEN_TESTS = 8

const outlines = import.meta.glob<{ problems: ProblemRef[] }>('./*/set.ts', { eager: true })
const definitions = import.meta.glob<ProblemDefinition>('./*/problems/*.problem.ts', {
  import: 'default',
  eager: true,
})
// Enumerate MDX files lazily (nothing is imported) and read their raw source from disk.
const mdxSources = Object.fromEntries(
  Object.keys(import.meta.glob('./*/problems/*.mdx')).map((file) => [
    file,
    readFileSync(new URL(file, import.meta.url), 'utf8'),
  ]),
)

/** "./<set>/problems/<slug>.solution.mdx" → ["<set>", "<slug>.solution.mdx"] */
const bySet = <T>(files: Record<string, T>) => {
  const map = new Map<string, Map<string, T>>()
  for (const [file, value] of Object.entries(files)) {
    const [, set, name] = /^\.\/([^/]+)\/problems\/(.+)$/.exec(file) ?? []
    if (!set || !name) throw new Error(`Unexpected content path ${file}`)
    if (!map.has(set)) map.set(set, new Map())
    map.get(set)!.set(name, value)
  }
  return map
}

const definitionsBySet = bySet(definitions)
const mdxBySet = bySet(mdxSources)

let harnesses: ReturnType<typeof inProcessHarnesses>
beforeAll(async () => {
  harnesses = inProcessHarnesses(await loadPyodide())
}, 60_000)

it('ships the Pyodide version the browser downloads', async () => {
  const pkg = JSON.parse(readFileSync('node_modules/pyodide/package.json', 'utf8')) as {
    version: string
  }
  expect(PYODIDE_VERSION).toBe(pkg.version)
})

for (const [outlineFile, { problems }] of Object.entries(outlines)) {
  const setId = path.basename(path.dirname(outlineFile))
  const defs = definitionsBySet.get(setId) ?? new Map<string, ProblemDefinition>()
  const mdx = mdxBySet.get(setId) ?? new Map<string, string>()

  describe(`problem set "${setId}"`, () => {
    it('has exactly the files its outline lists', () => {
      const expected = problems.flatMap((p) => [
        `${p.slug}.problem.ts`,
        `${p.slug}.mdx`,
        `${p.slug}.solution.mdx`,
      ])
      expect([...defs.keys(), ...mdx.keys()].sort()).toEqual(expected.sort())
    })

    // Problems missing a file fail the check above instead.
    const complete = problems.filter((p) => defs.has(`${p.slug}.problem.ts`))
    describe.each(complete.map((p) => [p.slug, p] as const))('%s', (slug, problem) => {
      const definition = defs.get(`${slug}.problem.ts`)!
      const tests = [...definition.examples, ...definition.tests]
      const request = (language: (typeof languages)[number]['id'], code: string) => ({
        language,
        code,
        signature: definition.signature,
        tests,
        compare: definition.compare ?? 'exact',
        stopOnFailure: true,
      })

      it('links to its LeetCode Discuss report', () => {
        expect(problem.source.url).toMatch(/^https:\/\/leetcode\.com\/discuss\//)
      })

      it('has a statement with examples and an editorial, both valid MDX', async () => {
        const statement = mdx.get(`${slug}.mdx`)!
        expect(statement).toContain('<Examples />')
        expect(statement).toContain('**Constraints:**')
        for (const source of [statement, mdx.get(`${slug}.solution.mdx`)!]) {
          await expect(compile(source, { remarkPlugins: [remarkGfm] })).resolves.toBeTruthy()
        }
      })

      it('has well-formed examples and enough hidden tests', () => {
        expect(validateProblem(definition)).toEqual([])
        expect(definition.examples.length).toBeLessThanOrEqual(MAX_EXAMPLES)
        expect(definition.tests.length).toBeGreaterThanOrEqual(MIN_HIDDEN_TESTS)
      })

      it('accepts the JavaScript reference solution', async () => {
        const outcome = await runInProcess(
          request('javascript', definition.solution.javascript),
          harnesses,
        )
        expect(outcome).toMatchObject({ kind: 'judged', verdict: 'Accepted' })
      })

      it('accepts the Python reference solution', async () => {
        const outcome = await runInProcess(request('python', definition.solution.python), harnesses)
        expect(outcome).toMatchObject({ kind: 'judged', verdict: 'Accepted' })
      })

      it.each(languages.map((l) => l.id))('has %s starter code that compiles', async (language) => {
        const outcome = await runInProcess(
          request(language, starterCode(definition.signature, language)),
          harnesses,
        )
        expect(outcome.kind).toBe('judged')
        expect(outcome).not.toMatchObject({ verdict: 'Compile Error' })
      })
    })
  })
}
