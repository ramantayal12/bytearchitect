import stats from 'virtual:lesson-stats'
import { defineCourse } from '@/features/courses'
import { meta, parts } from './course'

export default defineCourse({
  meta,
  parts,
  files: () => import('./files'),
  stats: stats[meta.id],
})
