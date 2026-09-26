import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function BookmarkButton({
  bookmarked,
  onToggle,
  className,
}: {
  bookmarked: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-pressed={bookmarked}
          aria-label="Bookmark lesson"
          className={className}
        >
          <Bookmark className={cn('size-6', bookmarked && 'fill-current text-primary')} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{bookmarked ? 'Remove bookmark' : 'Bookmark lesson'}</TooltipContent>
    </Tooltip>
  )
}
