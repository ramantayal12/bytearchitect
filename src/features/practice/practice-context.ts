import { createContext, useContext } from 'react'
import type { ProblemSet } from './practice.types'
import type { SubmissionRepository } from './submissions.repository'

export interface PracticeContextValue {
  problemSets: readonly ProblemSet[]
  submissions: SubmissionRepository
}

export const PracticeContext = createContext<PracticeContextValue | null>(null)

function usePractice(): PracticeContextValue {
  const value = useContext(PracticeContext)
  if (!value) throw new Error('Practice hooks must be used inside <PracticeProvider>')
  return value
}

export const useProblemSets = (): readonly ProblemSet[] => usePractice().problemSets

export const useProblemSet = (setId: string | undefined): ProblemSet | undefined =>
  useProblemSets().find((s) => s.id === setId)

export const useSubmissionRepository = (): SubmissionRepository => usePractice().submissions
