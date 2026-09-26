declare module '*.mdx' {
  import type { ComponentType } from 'react'
  import type { MDXProps } from 'mdx/types'

  export const frontmatter: { title?: string; description?: string } | undefined
  const MDXComponent: ComponentType<MDXProps>
  export default MDXComponent
}
