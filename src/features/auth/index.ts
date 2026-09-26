export type { AppUser, SignInInput, SignUpInput } from './auth.types'
export { AuthError, type AuthService } from './auth.service'
export { authErrorMessage } from './auth.errors'
export { createFirebaseAuthService } from './auth.firebase'
export { AuthProvider } from './AuthProvider'
export { useAuth } from './auth-context'
export { RedirectIfSignedIn, RequireVerifiedUser } from './components/RequireAuth'
export { FullPageSpinner } from './components/FullPageSpinner'

export const authRoutes = {
  Login: () => import('./pages/LoginPage'),
  Signup: () => import('./pages/SignupPage'),
  VerifyEmail: () => import('./pages/VerifyEmailPage'),
  ForgotPassword: () => import('./pages/ForgotPasswordPage'),
}
