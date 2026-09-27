import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { AuthProvider, type AppUser, type AuthService } from '@/features/auth'
import { PracticeProvider } from './PracticeProvider'
import type { NewSubmission } from './practice.types'
import { createMemorySubmissionRepository } from './submissions.repository'
import { useRecordSubmission, useSubmissions } from './submissions.hooks'

const user: AppUser = { uid: 'u1', email: 'a@b.c', displayName: 'A', emailVerified: true }
const auth: AuthService = {
  onAuthStateChanged: (listener) => {
    listener(user)
    return () => {}
  },
  signUp: async () => user,
  signIn: async () => user,
  signOut: async () => {},
  sendVerificationEmail: async () => {},
  reloadUser: async () => user,
  sendPasswordReset: async () => {},
}

const submission = (verdict: NewSubmission['verdict']): NewSubmission => ({
  language: 'python',
  code: '',
  verdict,
  passed: 0,
  total: 1,
  runtimeMs: 0,
})

describe('submission hooks', () => {
  it('keeps earlier submissions when submitting before the history was loaded', async () => {
    const repo = createMemorySubmissionRepository()
    await repo.add('u1', 's/p', submission('Wrong Answer')) // from an earlier session
    const client = new QueryClient()
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>
        <AuthProvider service={auth}>
          <PracticeProvider problemSets={[]} submissions={repo}>
            {children}
          </PracticeProvider>
        </AuthProvider>
      </QueryClientProvider>
    )

    const record = renderHook(() => useRecordSubmission('s/p'), { wrapper })
    await record.result.current.mutateAsync(submission('Accepted'))

    const history = renderHook(() => useSubmissions('s/p'), { wrapper })
    await waitFor(() => expect(history.result.current.isSuccess).toBe(true))
    expect(history.result.current.data?.map((s) => s.verdict)).toEqual(['Accepted', 'Wrong Answer'])

    // Once loaded, new submissions are prepended without another read.
    await record.result.current.mutateAsync(submission('Runtime Error'))
    await waitFor(() =>
      expect(history.result.current.data?.map((s) => s.verdict)).toEqual([
        'Runtime Error',
        'Accepted',
        'Wrong Answer',
      ]),
    )
  })
})
