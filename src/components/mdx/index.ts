import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout/Callout'
import { Diagram } from './Diagram/Diagram'
import { KeyTakeaways } from './KeyTakeaways/KeyTakeaways'
import { MermaidFigure } from './MermaidFigure/MermaidFigure'
import { Ponder } from './Ponder/Ponder'
import { Slide, Slides } from './Slides/Slides'
import { Tab, TabGroup } from './Tabs/TabGroup'
import { TableWrapper } from './TableWrapper'

/**
 * Widget registry — every component available to lesson MDX without imports.
 * To add a widget: create a folder here and register it below.
 */
export const mdxComponents: MDXComponents = {
  Callout,
  Diagram,
  KeyTakeaways,
  MermaidFigure,
  Ponder,
  Slide,
  Slides,
  Tab,
  TabGroup,
  table: TableWrapper,
}
