import type { ComponentProps } from 'react'

/** Makes wide markdown tables scroll horizontally instead of breaking the layout. */
export function TableWrapper(props: ComponentProps<'table'>) {
  return (
    <div className="my-6 overflow-x-auto [&>table]:my-0">
      <table {...props} />
    </div>
  )
}
