import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { courses } from '@/content/courses'
import { problemSets } from '@/content/practice'
import { createFirebaseAuthService } from '@/features/auth'
import { createFirestoreSubmissionRepository } from '@/features/practice'
import { createFirestoreProgressRepository } from '@/features/progress'
import { reloadOnStaleChunks } from '@/lib/stale-chunks'
import './index.css'

reloadOnStaleChunks()

const services = {
  auth: createFirebaseAuthService(),
  progress: createFirestoreProgressRepository(),
  courses,
  problemSets,
  submissions: createFirestoreSubmissionRepository(),
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App services={services} />
  </StrictMode>,
)
