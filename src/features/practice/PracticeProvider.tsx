import { useMemo, type ReactNode } from 'react'
import { PracticeContext } from './practice-context'
import type { ProblemSet } from './practice.types'
import type { SubmissionRepository } from './submissions.repository'

export function PracticeProvider({
  problemSets,
  submissions,
  children,
}: {
  problemSets: readonly ProblemSet[]
  submissions: SubmissionRepository
  children: ReactNode
}) {
  const value = useMemo(() => ({ problemSets, submissions }), [problemSets, submissions])
  return <PracticeContext.Provider value={value}>{children}</PracticeContext.Provider>
}
