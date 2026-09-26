import { useCallback, useMemo, useSyncExternalStore } from 'react'

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

/** A heading counts as "current" once its top scrolls above this line (sticky header + margin). */
const ACTIVE_OFFSET_PX = 120

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

const isScrolledToBottom = () =>
  window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

/**
 * Top-level h2/h3 headings of a rendered lesson article. Ids come from rehype-slug at build time.
 * Pass the article element via a state-backed callback ref so this re-reads when it mounts.
 */
export function useHeadings(article: HTMLElement | null): Heading[] {
  return useMemo(
    () =>
      article
        ? Array.from(
            article.querySelectorAll<HTMLHeadingElement>(':scope > h2[id], :scope > h3[id]'),
            (el) => ({ id: el.id, text: el.textContent ?? '', level: el.tagName === 'H2' ? 2 : 3 }),
          )
        : [],
    [article],
  )
}

/** Id of the heading whose section is being read (scroll-spy). */
export function useActiveHeading(headings: readonly Heading[]): string | undefined {
  const getSnapshot = useCallback(() => {
    if (headings.length && isScrolledToBottom()) return headings.at(-1)?.id
    let active = headings[0]?.id
    for (const { id } of headings) {
      const top = document.getElementById(id)?.getBoundingClientRect().top
      if (top === undefined || top > ACTIVE_OFFSET_PX) break
      active = id
    }
    return active
  }, [headings])
  return useSyncExternalStore(subscribeToScroll, getSnapshot, () => undefined)
}

const readScrollPercent = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 100
}

/** How far down the page the reader has scrolled, 0–100. */
export function useScrollPercent(): number {
  return useSyncExternalStore(subscribeToScroll, readScrollPercent, () => 0)
}
