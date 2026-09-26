import { createContext, useContext } from 'react'
import type { ProgressRepository } from './progress.repository'

export const ProgressRepositoryContext = createContext<ProgressRepository | null>(null)

export function useProgressRepository(): ProgressRepository {
  const repo = useContext(ProgressRepositoryContext)
  if (!repo) throw new Error('useProgressRepository must be used inside <ProgressProvider>')
  return repo
}
