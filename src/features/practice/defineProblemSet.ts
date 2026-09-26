import type {
  Difficulty,
  LoadedProblem,
  MdxModule,
  ProblemDefinition,
  ProblemRef,
  ProblemSet,
  ProblemSetMeta,
  ProblemSource,
} from './practice.types'

type Loader<T> = () => Promise<T>

interface ProblemSetFiles {
  /** `import.meta.glob('./problems/*.problem.ts', { import: 'default' })` from the set folder. */
  definitionFiles: Record<string, Loader<unknown>>
  /** `import.meta.glob('./problems/*.mdx')`: `<slug>.mdx` statements and `<slug>.solution.mdx` editorials. */
  mdxFiles: Record<string, Loader<unknown>>
}

interface DefineProblemSetInput {
  meta: ProblemSetMeta
  problems: ProblemRef[]
  /** Lazily imports the module holding the set's globs (`() => import('./files')`). */
  files: Loader<ProblemSetFiles>
}

/** Outline DSL: one entry per problem, in display order. */
export const problem = (
  slug: string,
  title: string,
  difficulty: Difficulty,
  topics: string[],
  source: ProblemSource,
): ProblemRef => ({ slug, title, difficulty, topics, source })

/** Identity helper that gives `<slug>.problem.ts` files full type-checking. */
export const defineProblem = (definition: ProblemDefinition): ProblemDefinition => definition

/** "./problems/water-tower.solution.mdx" → ["water-tower", "solution"] */
const parseFile = (file: string) => {
  const m = /^\.\/problems\/([^/.]+)(?:\.(problem|solution))?\.(?:ts|mdx)$/.exec(file)
  if (!m?.[1]) throw new Error(`Unexpected problem file ${file}`)
  return { slug: m[1], role: m[2] ?? 'statement' }
}

/** Builds a problem set from an outline and the set folder's lazily-loaded files. */
export function defineProblemSet({ meta, problems, files }: DefineProblemSetInput): ProblemSet {
  const slugs = new Set(problems.map((p) => p.slug))
  if (slugs.size !== problems.length) throw new Error(`Duplicate problem slug in "${meta.id}"`)
  const resolved = problems.map((p, i) => ({ ...p, setId: meta.id, number: i + 1 }))
  const bySlug = new Map(resolved.map((p) => [p.slug, p]))

  return {
    ...meta,
    problems: resolved,
    getProblem: (slug) => bySlug.get(slug),
    async loadProblem(slug) {
      const { definitionFiles, mdxFiles } = await files()
      const loaders = new Map<string, Loader<unknown>>()
      for (const [file, load] of [
        ...Object.entries(definitionFiles),
        ...Object.entries(mdxFiles),
      ]) {
        const { slug: fileSlug, role } = parseFile(file)
        if (fileSlug === slug) loaders.set(role, load)
      }
      const [definition, statement, editorial] = (await Promise.all([
        loaders.get('problem')?.(),
        loaders.get('statement')?.(),
        loaders.get('solution')?.(),
      ])) as [ProblemDefinition | undefined, MdxModule | undefined, MdxModule | undefined]
      if (!definition || !statement) throw new Error(`Problem "${slug}" has no definition`)
      const loaded: LoadedProblem = { definition, Statement: statement.default }
      if (editorial) loaded.Editorial = editorial.default
      return loaded
    },
  }
}
