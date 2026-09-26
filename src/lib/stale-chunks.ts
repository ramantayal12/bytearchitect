/**
 * After a deploy, a tab opened on the previous version may request lazy chunks
 * whose hashed filenames no longer exist. Reload once to pick up the new build;
 * the timestamp guard prevents a reload loop if a chunk is genuinely missing.
 */
const KEY = 'stale-chunk-reload-at'
const MIN_INTERVAL_MS = 60_000

export function reloadOnStaleChunks() {
  window.addEventListener('vite:preloadError', (event) => {
    try {
      const last = Number(sessionStorage.getItem(KEY) ?? 0)
      if (Date.now() - last < MIN_INTERVAL_MS) return
      sessionStorage.setItem(KEY, String(Date.now()))
    } catch {
      return // Storage unavailable: can't guard against loops, so let the error surface.
    }
    event.preventDefault()
    window.location.reload()
  })
}
