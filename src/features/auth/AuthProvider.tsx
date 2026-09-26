import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './auth-context'
import type { AuthService } from './auth.service'
import type { AppUser } from './auth.types'

export function AuthProvider({ service, children }: { service: AuthService; children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      service.onAuthStateChanged((next) => {
        setUser(next)
        setLoading(false)
      }),
    [service],
  )

  const refreshUser = useCallback(async () => {
    const next = await service.reloadUser()
    setUser(next)
    return next
  }, [service])

  const value = useMemo(
    () => ({ user, loading, service, refreshUser }),
    [user, loading, service, refreshUser],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
