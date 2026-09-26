import type { AppUser, SignInInput, SignUpInput } from './auth.types'

/** Backend-agnostic authentication contract. The UI depends only on this interface. */
export interface AuthService {
  /** Subscribe to auth state. Called once immediately with the current user (or null). */
  onAuthStateChanged(listener: (user: AppUser | null) => void): () => void
  signUp(input: SignUpInput): Promise<AppUser>
  signIn(input: SignInInput): Promise<AppUser>
  signOut(): Promise<void>
  sendVerificationEmail(): Promise<void>
  /** Re-fetch the current user (e.g. to pick up `emailVerified` after clicking the link). */
  reloadUser(): Promise<AppUser | null>
  sendPasswordReset(email: string): Promise<void>
}

/** Normalised auth error; `code` follows Firebase's `auth/*` codes. */
export class AuthError extends Error {
  readonly code: string
  constructor(code: string, message?: string) {
    super(message ?? code)
    this.name = 'AuthError'
    this.code = code
  }
}
