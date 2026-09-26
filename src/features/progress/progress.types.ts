export interface QuizScore {
  best: number
  last: number
  total: number
  attempts: number
  /** Epoch millis of the last attempt. */
  at: number
}

export interface CourseProgress {
  /** lessonId → epoch millis when it was completed. */
  completed: Record<string, number>
  /** lessonId → score of the quiz attached to that lesson. */
  quizzes: Record<string, QuizScore>
  /** lessonId → epoch millis when it was bookmarked. */
  bookmarks: Record<string, number>
  lastLessonId?: string
}

/** A single atomic change to a course progress document (= one write). */
export interface ProgressPatch {
  /** lessonId → true (mark complete) | false (un-mark). */
  completed?: Record<string, boolean>
  quizzes?: Record<string, QuizScore>
  /** lessonId → true (bookmark) | false (remove bookmark). */
  bookmarks?: Record<string, boolean>
  lastLessonId?: string
  /** Clear completions, quiz scores and the resume point; bookmarks are kept. Sent on its own. */
  reset?: true
}

export const emptyProgress = (): CourseProgress => ({ completed: {}, quizzes: {}, bookmarks: {} })

/** Pure application of a patch; used for optimistic updates and the in-memory repository. */
export function applyPatch(
  progress: CourseProgress,
  patch: ProgressPatch,
  now = Date.now(),
): CourseProgress {
  const next = structuredClone(progress)
  if (patch.reset) {
    next.completed = {}
    next.quizzes = {}
    delete next.lastLessonId
  }
  toggleKeys(next.completed, patch.completed, now)
  toggleKeys(next.bookmarks, patch.bookmarks, now)
  Object.assign(next.quizzes, patch.quizzes)
  if (patch.lastLessonId) next.lastLessonId = patch.lastLessonId
  return next
}

/** Sets each `true` key to its first-set time and removes each `false` key. */
function toggleKeys(
  target: Record<string, number>,
  changes: Record<string, boolean> | undefined,
  now: number,
) {
  for (const [id, on] of Object.entries(changes ?? {})) {
    if (on) target[id] = target[id] ?? now
    else delete target[id]
  }
}
