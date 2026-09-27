import { useEffect, useState, useSyncExternalStore } from 'react'
import { createCodeRunner } from './runner/code-runner'

/** One code runner per workspace; its workers are terminated when the page unmounts. */
export function useCodeRunner() {
  const [runner] = useState(() => createCodeRunner())
  useEffect(() => () => runner.dispose(), [runner])
  return runner
}

/** Tracks a media query; false where matchMedia is unavailable (tests). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia?.(query)
      mq?.addEventListener('change', onChange)
      return () => mq?.removeEventListener('change', onChange)
    },
    () => window.matchMedia?.(query).matches ?? false,
  )
}
