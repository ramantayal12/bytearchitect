declare module 'virtual:lesson-stats' {
  const stats: Record<string, Record<string, { minutes: number }>>
  export default stats
}
