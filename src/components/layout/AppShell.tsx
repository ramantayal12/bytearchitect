import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { FullPageSpinner } from '@/features/auth'
import { AppHeader } from './AppHeader'

export function AppShell() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main>
        <Suspense fallback={<FullPageSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollRestoration />
    </div>
  )
}
