import type { CourseProgress, QuizScore } from './progress.types'

export interface ProgressSummary {
  completed: number
  total: number
  percent: number
}

export function summarizeProgress(
  lessonIds: readonly string[],
  progress: CourseProgress | undefined,
): ProgressSummary {
  const total = lessonIds.length
  const completed = progress ? lessonIds.filter((id) => id in progress.completed).length : 0
  return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) }
}

/** Where "Continue" should take the learner: last visited, else first incomplete, else first. */
export function resumeLessonId(
  lessonIds: readonly string[],
  progress: CourseProgress | undefined,
): string | undefined {
  if (progress?.lastLessonId && lessonIds.includes(progress.lastLessonId))
    return progress.lastLessonId
  return lessonIds.find((id) => !progress || !(id in progress.completed)) ?? lessonIds[0]
}

export function nextQuizScore(
  previous: QuizScore | undefined,
  correct: number,
  total: number,
  now = Date.now(),
): QuizScore {
  return {
    best: Math.max(previous?.best ?? 0, correct),
    last: correct,
    total,
    attempts: (previous?.attempts ?? 0) + 1,
    at: now,
  }
}
