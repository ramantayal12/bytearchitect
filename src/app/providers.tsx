import { MDXProvider } from '@mdx-js/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { mdxComponents } from '@/components/mdx'
import { ThemeProvider } from '@/components/theme'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, type AuthService } from '@/features/auth'
import { CoursesProvider, type Course } from '@/features/courses'
import { ProgressProvider, type ProgressRepository } from '@/features/progress'

export interface AppServices {
  auth: AuthService
  progress: ProgressRepository
  courses: readonly Course[]
}

/** Composition root: all backend adapters are injected here. */
export function AppProviders({
  services,
  children,
}: {
  services: AppServices
  children: ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } }),
  )
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider service={services.auth}>
          <ProgressProvider repository={services.progress}>
            <CoursesProvider courses={services.courses}>
              <MDXProvider components={mdxComponents}>
                <TooltipProvider>
                  {children}
                  <Toaster richColors position="bottom-right" />
                </TooltipProvider>
              </MDXProvider>
            </CoursesProvider>
          </ProgressProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
