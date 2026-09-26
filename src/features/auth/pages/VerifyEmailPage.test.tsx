import { act, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '../AuthProvider'
import type { AuthService } from '../auth.service'
import type { AppUser } from '../auth.types'
import VerifyEmailPage from './VerifyEmailPage'

const unverified: AppUser = { uid: 'u1', email: 'a@b.c', displayName: 'A', emailVerified: false }

const fakeAuth = (reloadUser: AuthService['reloadUser']): AuthService => ({
  onAuthStateChanged: (listener) => {
    listener(unverified)
    return () => {}
  },
  signUp: async () => unverified,
  signIn: async () => unverified,
  signOut: async () => {},
  sendVerificationEmail: async () => {},
  reloadUser,
  sendPasswordReset: async () => {},
})

const renderPage = (service: AuthService) => {
  const router = createMemoryRouter(
    [
      { path: '/verify-email', element: <VerifyEmailPage /> },
      { path: '/', element: <p>home page</p> },
    ],
    { initialEntries: ['/verify-email'] },
  )
  render(
    <AuthProvider service={service}>
      <RouterProvider router={router} />
    </AuthProvider>,
  )
}

describe('<VerifyEmailPage />', () => {
  it('moves on by itself when the email is already verified on arrival', async () => {
    renderPage(fakeAuth(async () => ({ ...unverified, emailVerified: true })))
    expect(await screen.findByText('home page')).toBeInTheDocument()
  })

  it('checks again when the tab becomes visible', async () => {
    let verifiedYet = false
    const reloadUser = vi.fn(async () => ({ ...unverified, emailVerified: verifiedYet }))
    renderPage(fakeAuth(reloadUser))
    expect(await screen.findByText('Verify your email')).toBeInTheDocument()
    expect(reloadUser).toHaveBeenCalledTimes(1)

    verifiedYet = true
    await act(async () => {
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(await screen.findByText('home page')).toBeInTheDocument()
    expect(reloadUser).toHaveBeenCalledTimes(2)
  })
})
