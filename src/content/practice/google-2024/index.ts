import { defineProblemSet } from '@/features/practice'
import { meta, problems } from './set'

export default defineProblemSet({ meta, problems, files: () => import('./files') })
