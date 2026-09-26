import type { ComponentType, ReactNode } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router'
import { AppShell } from '@/components/layout/AppShell'
import { RouteError } from '@/components/layout/RouteError'
import { authRoutes, RedirectIfSignedIn, RequireVerifiedUser } from '@/features/auth'
import { courseRoutes } from '@/features/courses'

type PageModule = { default: ComponentType }

/** Code-split page, optionally wrapped in a guard. */
const page = (
  load: () => Promise<PageModule>,
  wrap?: (el: ReactNode) => ReactNode,
): Pick<RouteObject, 'lazy'> => ({
  lazy: async () => {
    const { default: Page } = await load()
    return { element: wrap ? wrap(<Page />) : <Page /> }
  },
})

const guest = (el: ReactNode) => <RedirectIfSignedIn>{el}</RedirectIfSignedIn>
const verified = (el: ReactNode) => <RequireVerifiedUser>{el}</RequireVerifiedUser>

export const routes: RouteObject[] = [
  {
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, ...page(courseRoutes.Catalog) },
      { path: 'courses/:courseId', ...page(courseRoutes.CourseOverview) },
      { path: 'courses/:courseId/:chapterId/:lessonSlug', ...page(courseRoutes.Lesson, verified) },
      { path: 'login', ...page(authRoutes.Login, guest) },
      { path: 'signup', ...page(authRoutes.Signup, guest) },
      { path: 'forgot-password', ...page(authRoutes.ForgotPassword, guest) },
      { path: 'verify-email', ...page(authRoutes.VerifyEmail) },
      { path: '*', ...page(courseRoutes.NotFound) },
    ],
  },
]

export const createAppRouter = () => createBrowserRouter(routes)
