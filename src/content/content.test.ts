/**
 * Completeness checks for every registered course. These fail the build if an
 * outline entry is missing its lesson body or quiz, a lesson is a stub, or a quiz
 * is malformed — guaranteeing every lesson in the outline is actually shipped.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { compile } from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { describe, expect, it } from 'vitest'
import { countWords } from '../../build/vite-plugin-lesson-stats'
import { flattenLessons, type Part } from '@/features/courses'
import { validateQuiz, type QuizDefinition } from '@/features/quiz'

const MIN_LESSON_WORDS = 350
const LESSON_QUIZ_QUESTIONS = { min: 2, max: 5 }
const CHAPTER_QUIZ_MIN_QUESTIONS = 6
const FINAL_ASSESSMENT_MIN_QUESTIONS = 15

const outlines = import.meta.glob<{ parts: Part }>('./courses/*/course.ts', { eager: true })
// Enumerate lesson files lazily (nothing is imported) and read their raw source from disk.
const mdxFiles = Object.fromEntries(
  Object.keys(import.meta.glob('./courses/*/lessons/**/*.mdx')).map((file) => [
    file,
    readFileSync(new URL(file, import.meta.url), 'utf8'),
  ]),
)
const quizFiles = import.meta.glob<QuizDefinition>('./courses/*/lessons/**/*.quiz.ts', {
  import: 'default',
  eager: true,
})

/** "./courses/<course>/lessons/<chapter>/<slug>.mdx" → ["<course>", "<chapter>/<slug>"] */
const parsePath = (file: string) => {
  const m = /^\.\/courses\/([^/]+)\/lessons\/(.+)\.(mdx|quiz\.ts)$/.exec(file)
  if (!m?.[1] || !m[2]) throw new Error(`Unexpected content path ${file}`)
  return [m[1], m[2]] as const
}

const byCourse = <T>(files: Record<string, T>) => {
  const map = new Map<string, Map<string, T>>()
  for (const [file, value] of Object.entries(files)) {
    const [course, id] = parsePath(file)
    if (!map.has(course)) map.set(course, new Map())
    map.get(course)!.set(id, value)
  }
  return map
}

const mdxByCourse = byCourse(mdxFiles)
const quizByCourse = byCourse(quizFiles)

for (const [outlineFile, { parts }] of Object.entries(outlines)) {
  const courseId = path.basename(path.dirname(outlineFile))
  const lessons = flattenLessons(parts as unknown as Part[])
  const mdx = mdxByCourse.get(courseId) ?? new Map<string, string>()
  const quizzes = quizByCourse.get(courseId) ?? new Map<string, QuizDefinition>()
  const outlineIds = new Set(lessons.map((l) => l.id))

  describe(`course "${courseId}"`, () => {
    it('has no content files outside the outline (orphans)', () => {
      const orphans = [...mdx.keys(), ...quizzes.keys()].filter((id) => !outlineIds.has(id))
      expect(orphans).toEqual([])
    })

    it('has a lesson body and quiz for every lesson, and a quiz for every chapter quiz', () => {
      const missing = lessons.flatMap((l) => [
        ...(l.kind === 'lesson' && !mdx.has(l.id) ? [`${l.id}.mdx`] : []),
        ...(!quizzes.has(l.id) ? [`${l.id}.quiz.ts`] : []),
      ])
      expect(missing).toEqual([])
    })

    describe.each(lessons.filter((l) => mdx.has(l.id)).map((l) => [l.id, l] as const))(
      '%s',
      (id, lesson) => {
        const source = mdx.get(id)!

        it('compiles as MDX', async () => {
          await expect(
            compile(source, { remarkPlugins: [remarkGfm, remarkFrontmatter] }),
          ).resolves.toBeTruthy()
        })

        if (lesson.kind === 'lesson') {
          it(`is a full lesson (≥ ${MIN_LESSON_WORDS} words) with key takeaways`, () => {
            expect(countWords(source)).toBeGreaterThanOrEqual(MIN_LESSON_WORDS)
            expect(source).toContain('<KeyTakeaways>')
          })
        }
      },
    )

    describe.each(lessons.filter((l) => quizzes.has(l.id)).map((l) => [l.id, l] as const))(
      '%s quiz',
      (id, lesson) => {
        const questions = quizzes.get(id)!

        it('is well-formed', () => {
          expect(validateQuiz(questions)).toEqual([])
        })

        it('has the right number of questions', () => {
          if (lesson.kind === 'lesson') {
            expect(questions.length).toBeGreaterThanOrEqual(LESSON_QUIZ_QUESTIONS.min)
            expect(questions.length).toBeLessThanOrEqual(LESSON_QUIZ_QUESTIONS.max)
          } else {
            const min =
              lesson.slug === 'final-assessment'
                ? FINAL_ASSESSMENT_MIN_QUESTIONS
                : CHAPTER_QUIZ_MIN_QUESTIONS
            expect(questions.length).toBeGreaterThanOrEqual(min)
          }
        })
      },
    )
  })
}
