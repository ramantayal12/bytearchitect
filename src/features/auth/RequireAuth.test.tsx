import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from './AuthProvider'
import type { AuthService } from './auth.service'
import type { AppUser } from './auth.types'
import { RequireVerifiedUser } from './components/RequireAuth'

const fakeAuth = (user: AppUser | null): AuthService => ({
  onAuthStateChanged: (listener) => {
    listener(user)
    return () => {}
  },
  signUp: async () => user!,
  signIn: async () => user!,
  signOut: async () => {},
  sendVerificationEmail: async () => {},
  reloadUser: async () => user,
  sendPasswordReset: async () => {},
})

const renderAt = (user: AppUser | null) => {
  const router = createMemoryRouter(
    [
      { path: '/lesson', element: <RequireVerifiedUser>secret lesson</RequireVerifiedUser> },
      { path: '/login', element: <p>login page</p> },
      { path: '/verify-email', element: <p>verify page</p> },
    ],
    { initialEntries: ['/lesson'] },
  )
  render(
    <AuthProvider service={fakeAuth(user)}>
      <RouterProvider router={router} />
    </AuthProvider>,
  )
}

const user: AppUser = { uid: 'u1', email: 'a@b.c', displayName: 'A', emailVerified: true }

describe('<RequireVerifiedUser />', () => {
  it('redirects guests to login', () => {
    renderAt(null)
    expect(screen.getByText('login page')).toBeInTheDocument()
  })

  it('redirects unverified users to email verification', () => {
    renderAt({ ...user, emailVerified: false })
    expect(screen.getByText('verify page')).toBeInTheDocument()
  })

  it('renders content for verified users', () => {
    renderAt(user)
    expect(screen.getByText('secret lesson')).toBeInTheDocument()
  })
})
