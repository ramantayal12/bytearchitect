/**
 * Lesson and quiz loaders for this course. Kept out of `index.ts` and loaded on the first
 * lesson visit, so pages that only need the outline (catalog, overview, auth) don't ship
 * hundreds of lazy-import entries in the entry bundle.
 */
export const lessonFiles = import.meta.glob('./lessons/**/*.mdx')
export const quizFiles = import.meta.glob('./lessons/**/*.quiz.ts', { import: 'default' })
