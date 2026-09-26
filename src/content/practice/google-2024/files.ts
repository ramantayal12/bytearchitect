/**
 * Problem loaders for this set. Kept out of `index.ts` and loaded on the first problem
 * visit, so the problem list doesn't ship every problem's lazy-import entry.
 */
export const definitionFiles = import.meta.glob('./problems/*.problem.ts', { import: 'default' })
export const mdxFiles = import.meta.glob('./problems/*.mdx')
