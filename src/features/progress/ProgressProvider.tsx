import type { ReactNode } from 'react'
import { ProgressRepositoryContext } from './progress-context'
import type { ProgressRepository } from './progress.repository'

export function ProgressProvider({
  repository,
  children,
}: {
  repository: ProgressRepository
  children: ReactNode
}) {
  return (
    <ProgressRepositoryContext.Provider value={repository}>
      {children}
    </ProgressRepositoryContext.Provider>
  )
}
