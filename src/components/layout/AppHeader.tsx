import { NavLink } from 'react-router'
import { ThemeToggle } from '@/components/theme'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { UserMenu } from './UserMenu'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-full items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav className="hidden text-sm sm:block">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn('text-muted-foreground hover:text-foreground', isActive && 'text-foreground')
            }
          >
            Courses
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
