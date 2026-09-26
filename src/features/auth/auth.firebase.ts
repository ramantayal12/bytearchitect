import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { getFirebase } from '@/lib/firebase'
import { AuthError, type AuthService } from './auth.service'
import type { AppUser } from './auth.types'

const toAppUser = (user: User): AppUser => ({
  uid: user.uid,
  email: user.email ?? '',
  displayName: user.displayName ?? user.email?.split('@')[0] ?? 'Learner',
  emailVerified: user.emailVerified,
})

/**
 * The continue URL gives Firebase's "email verified" page a Continue button back to the app.
 * Hosts that aren't authorized domains (e.g. preview channels) reject it, so fall back to the
 * plain email there.
 */
async function sendVerification(user: User) {
  try {
    await sendEmailVerification(user, { url: `${window.location.origin}/verify-email` })
  } catch (error) {
    if (!(error instanceof FirebaseError && error.code === 'auth/unauthorized-continue-uri')) {
      throw error
    }
    await sendEmailVerification(user)
  }
}

async function wrap<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (error instanceof FirebaseError) throw new AuthError(error.code, error.message)
    throw error
  }
}

export function createFirebaseAuthService(): AuthService {
  const { auth, db } = getFirebase()

  const currentUser = () => {
    if (!auth.currentUser) throw new AuthError('auth/no-current-user')
    return auth.currentUser
  }

  return {
    onAuthStateChanged: (listener) =>
      onAuthStateChanged(auth, (user) => listener(user ? toAppUser(user) : null)),

    signUp: ({ displayName, email, password }) =>
      wrap(async () => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, { displayName })
        await setDoc(doc(db, 'users', user.uid), {
          displayName,
          // Use the normalised address from Auth so it matches the token claim checked by the rules.
          email: user.email ?? email,
          createdAt: serverTimestamp(),
        })
        await sendVerification(user)
        return toAppUser(user)
      }),

    signIn: ({ email, password }) =>
      wrap(async () => toAppUser((await signInWithEmailAndPassword(auth, email, password)).user)),

    signOut: () => wrap(() => signOut(auth)),

    sendVerificationEmail: () => wrap(() => sendVerification(currentUser())),

    reloadUser: () =>
      wrap(async () => {
        if (!auth.currentUser) return null
        await auth.currentUser.reload()
        // Refresh the ID token so Firestore rules see the new `email_verified` claim.
        await auth.currentUser.getIdToken(true)
        return toAppUser(auth.currentUser)
      }),

    sendPasswordReset: (email) => wrap(() => sendPasswordResetEmail(auth, email)),
  }
}
