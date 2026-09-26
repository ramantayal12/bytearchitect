import { AuthError } from './auth.service'

const MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists. Try logging in instead.',
  'auth/invalid-email': 'That email address doesn’t look right.',
  'auth/weak-password': 'Please choose a stronger password (at least 8 characters).',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/quota-exceeded': 'We’ve hit today’s email limit. Please try again tomorrow.',
  'auth/no-current-user': 'You’re signed out. Please log in again.',
}

export function authErrorMessage(error: unknown): string {
  if (error instanceof AuthError)
    return MESSAGES[error.code] ?? 'Something went wrong. Please try again.'
  return 'Something went wrong. Please try again.'
}
