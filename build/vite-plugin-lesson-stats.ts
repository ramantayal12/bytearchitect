/**
 * Virtual module `virtual:lesson-stats`: reading-time estimates for every lesson,
 * computed from the MDX/quiz sources at build time so the sidebar can show
 * durations without downloading lesson chunks.
 *
 * Shape: { [courseId]: { [lessonId]: { minutes } } }
 * where lessonId = "<chapterId>/<slug>".
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

const VIRTUAL_ID = 'virtual:lesson-stats'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const WORDS_PER_MINUTE = 200
const MINUTES_PER_QUESTION = 0.5

export interface LessonStat {
  words: number
  questions: number
  minutes: number
}

/** Strip frontmatter, code/mermaid fences, imports/exports and JSX tags before counting words. */
export function countWords(mdx: string): number {
  const text = mdx
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^(import|export) .*$/gm, '')
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
    .replace(/[#*_`>|[\]()-]/g, ' ')
  return text.split(/\s+/).filter((w) => /\w/.test(w)).length
}

export const countQuestions = (quizSource: string): number =>
  (quizSource.match(/\bprompt\s*:/g) ?? []).length

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  )
  return files.flat()
}

export async function computeLessonStats(contentRoot: string) {
  const result: Record<string, Record<string, LessonStat>> = {}
  const courses = await readdir(contentRoot, { withFileTypes: true })
  for (const course of courses.filter((c) => c.isDirectory())) {
    const lessonsDir = path.join(contentRoot, course.name, 'lessons')
    const stats: Record<string, LessonStat> = {}
    for (const file of await walk(lessonsDir)) {
      const match = /^(.*)\.(mdx|quiz\.ts)$/.exec(
        path.relative(lessonsDir, file).split(path.sep).join('/'),
      )
      if (!match?.[1]) continue
      const id = match[1]
      const stat = (stats[id] ??= { words: 0, questions: 0, minutes: 0 })
      const source = await readFile(file, 'utf8')
      if (match[2] === 'mdx') stat.words = countWords(source)
      else stat.questions = countQuestions(source)
    }
    for (const stat of Object.values(stats)) {
      stat.minutes = Math.max(
        1,
        Math.round(stat.words / WORDS_PER_MINUTE + stat.questions * MINUTES_PER_QUESTION),
      )
    }
    result[course.name] = stats
  }
  return result
}

export default function lessonStats(contentRoot = path.resolve('src/content/courses')): Plugin {
  return {
    name: 'lesson-stats',
    resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
    async load(id) {
      if (id !== RESOLVED_ID) return
      // Only reading time is shipped to the browser; words and questions stay build-side.
      const stats = await computeLessonStats(contentRoot)
      const minutes = Object.fromEntries(
        Object.entries(stats).map(([course, lessons]) => [
          course,
          Object.fromEntries(
            Object.entries(lessons).map(([id, s]) => [id, { minutes: s.minutes }]),
          ),
        ]),
      )
      return `export default ${JSON.stringify(minutes)}`
    },
    configureServer(server) {
      const invalidate = (file: string) => {
        if (!file.startsWith(contentRoot)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
      }
      server.watcher.on('add', invalidate)
      server.watcher.on('change', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}
