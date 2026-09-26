import { useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../auth-context'
import { FullPageSpinner } from './FullPageSpinner'

/** Renders children only for signed-in users with a verified email address. */
export function RequireVerifiedUser({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageSpinner />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (!user.emailVerified)
    return <Navigate to="/verify-email" replace state={{ from: location.pathname }} />
  return <>{children}</>
}

/**
 * For auth pages: bounces users who *arrive* already signed in. Sign-ins that happen on
 * the page itself are left to the page, so multi-step flows (e.g. sign-up → send
 * verification email) can finish before navigating.
 */
export function RedirectIfSignedIn({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [arrivedSignedIn, setArrivedSignedIn] = useState<boolean | null>(null)
  if (!loading && arrivedSignedIn === null) setArrivedSignedIn(Boolean(user))

  if (loading || arrivedSignedIn === null) return <FullPageSpinner />
  if (arrivedSignedIn && user) {
    return <Navigate to={user.emailVerified ? from : '/verify-email'} replace state={{ from }} />
  }
  return <>{children}</>
}
