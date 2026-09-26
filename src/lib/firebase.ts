/**
 * Firebase bootstrap. The only module (besides *.firebase.ts adapters) allowed to
 * touch the Firebase SDK. Uses `firestore/lite` to keep the bundle small: the app
 * reads/writes a single progress document per course and needs no realtime listeners.
 */
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore/lite'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const useEmulators = import.meta.env.VITE_USE_EMULATORS === 'true'

let instance: { app: FirebaseApp; auth: Auth; db: Firestore } | undefined

export function getFirebase() {
  if (instance) return instance
  if (!config.apiKey || !config.projectId) {
    throw new Error(
      'Missing Firebase configuration. Copy .env.example to .env.local and fill in VITE_FIREBASE_* values.',
    )
  }
  const app = initializeApp(config)
  const auth = getAuth(app)
  const db = getFirestore(app)
  if (useEmulators) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, '127.0.0.1', 8080)
  }
  instance = { app, auth, db }
  return instance
}
