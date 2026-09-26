import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export default function NotFoundPage({
  message = 'We couldn’t find that page.',
}: {
  message?: string
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <p className="text-muted-foreground">{message}</p>
      <Button asChild>
        <Link to="/">Browse courses</Link>
      </Button>
    </div>
  )
}
