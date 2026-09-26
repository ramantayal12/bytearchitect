import { useState } from 'react'
import { RouterProvider } from 'react-router'
import { AppProviders, type AppServices } from './providers'
import { createAppRouter } from './router'

export function App({ services }: { services: AppServices }) {
  const [router] = useState(createAppRouter)
  return (
    <AppProviders services={services}>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
