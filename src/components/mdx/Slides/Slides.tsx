import { Children, isValidElement, useEffect, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface SlideProps {
  caption?: string
  children?: ReactNode
}

/** A single step in a <Slides> deck. Rendered by its parent. */
export function Slide({ children }: SlideProps) {
  return <>{children}</>
}

/**
 * Step-through illustration, e.g. a request flowing through a system one hop at a time.
 * Usage:
 *   <Slides title="Resolving a domain">
 *     <Slide caption="The browser checks its cache">```mermaid …```</Slide>
 *   </Slides>
 */
export function Slides({ title, children }: { title?: string; children: ReactNode }) {
  const slides = Children.toArray(children).filter(isValidElement<SlideProps>)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const caption = slides[current]?.props.caption

  return (
    <figure
      className="not-prose my-8 rounded-xl border bg-card"
      aria-label={title ?? 'Illustration'}
    >
      {title && <div className="border-b px-4 py-2 text-sm font-medium">{title}</div>}
      {/* shadcn Carousel provides the carousel region semantics and arrow-key navigation. */}
      <Carousel setApi={setApi} aria-label={title ?? 'Illustration'}>
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i} aria-label={`${i + 1} of ${slides.length}`}>
              <div className="p-4 [&_.mermaid-svg]:min-h-40 [&>div]:my-0 [&>div]:border-0 [&>div]:bg-transparent">
                {slide.props.children}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <figcaption className="flex items-center gap-3 border-t px-4 py-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </Button>
        <p className="flex-1 text-center text-sm" aria-live="polite">
          {caption}
        </p>
        <span className="text-xs text-muted-foreground tabular-nums">
          {current + 1} / {slides.length}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={current === slides.length - 1}
          aria-label="Next slide"
        >
          <ChevronRight />
        </Button>
      </figcaption>
      <div className="flex justify-center gap-1.5 pb-3" aria-hidden>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              'h-1.5 rounded-full bg-muted-foreground/30 transition-all',
              i === current ? 'w-5 bg-primary' : 'w-1.5',
            )}
          />
        ))}
      </div>
    </figure>
  )
}
