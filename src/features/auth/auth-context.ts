import { createContext, useContext } from 'react'
import type { AuthService } from './auth.service'
import type { AppUser } from './auth.types'

export interface AuthContextValue {
  user: AppUser | null
  /** True until the first auth state has been received. */
  loading: boolean
  service: AuthService
  refreshUser: () => Promise<AppUser | null>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
