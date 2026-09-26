/**
 * Fails a production build whose Firebase config could never work once deployed:
 * a missing project id, or a `demo-*` emulator project without the emulators enabled.
 * This catches the easy mistake of deploying with only `.env.local` (the emulator setup)
 * instead of a `.env.production.local` holding the real web-app config.
 */
import type { Plugin } from 'vite'

export default function firebaseEnvGuard(): Plugin {
  return {
    name: 'firebase-env-guard',
    apply: 'build',
    configResolved({ mode, env }) {
      if (mode !== 'production' || env.VITE_USE_EMULATORS === 'true') return
      const projectId = env.VITE_FIREBASE_PROJECT_ID as string | undefined
      if (!projectId || projectId.startsWith('demo-')) {
        throw new Error(
          `Production build has no real Firebase project (VITE_FIREBASE_PROJECT_ID=${projectId ?? '<unset>'}).\n` +
            'Put your web-app config in .env.production.local (see README → Deploying), ' +
            'or set VITE_USE_EMULATORS=true for a local emulator build.',
        )
      }
    },
  }
}
