import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { courses } from '@/content/courses'
import { createFirebaseAuthService } from '@/features/auth'
import { createFirestoreProgressRepository } from '@/features/progress'
import { reloadOnStaleChunks } from '@/lib/stale-chunks'
import './index.css'

reloadOnStaleChunks()

const services = {
  auth: createFirebaseAuthService(),
  progress: createFirestoreProgressRepository(),
  courses,
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App services={services} />
  </StrictMode>,
)
