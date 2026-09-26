/**
 * Remark plugin: renders ```mermaid fences to inline SVG at build time.
 *
 * Each diagram is rendered twice (light + dark theme) and replaced with
 * `<MermaidFigure light="<svg…>" dark="<svg…>" />`, so the browser never
 * downloads the mermaid runtime. Rendered SVGs are cached on disk, keyed by a
 * hash of the source and theme, which keeps dev reloads and rebuilds fast.
 */
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Code, Root } from 'mdast'
import type { MermaidConfig } from 'mermaid'
import { createMermaidRenderer, type MermaidRenderer } from 'mermaid-isomorphic'
import { chromium, type LaunchOptions } from 'playwright'
import { visit } from 'unist-util-visit'
import type { VFile } from 'vfile'

type Theme = 'light' | 'dark'

const CACHE_DIR = path.resolve('node_modules/.cache/mermaid-svg')
const CACHE_VERSION = 'v1'

const FONT = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

const THEMES: Record<Theme, MermaidConfig> = {
  light: {
    theme: 'base',
    fontFamily: FONT,
    themeVariables: {
      fontFamily: FONT,
      primaryColor: '#eef2ff',
      primaryBorderColor: '#6366f1',
      primaryTextColor: '#1e1b4b',
      secondaryColor: '#ecfeff',
      tertiaryColor: '#f8fafc',
      lineColor: '#64748b',
      clusterBkg: '#f8fafc',
      clusterBorder: '#cbd5e1',
      noteBkgColor: '#fef9c3',
      noteBorderColor: '#eab308',
      actorBkg: '#eef2ff',
      actorBorder: '#6366f1',
      signalColor: '#334155',
      signalTextColor: '#0f172a',
    },
  },
  dark: {
    theme: 'base',
    fontFamily: FONT,
    darkMode: true,
    themeVariables: {
      fontFamily: FONT,
      background: '#09090b',
      primaryColor: '#1e1b4b',
      primaryBorderColor: '#818cf8',
      primaryTextColor: '#e0e7ff',
      secondaryColor: '#083344',
      tertiaryColor: '#18181b',
      lineColor: '#94a3b8',
      textColor: '#e4e4e7',
      mainBkg: '#1e1b4b',
      clusterBkg: '#18181b',
      clusterBorder: '#3f3f46',
      edgeLabelBackground: '#18181b',
      noteBkgColor: '#422006',
      noteTextColor: '#fef9c3',
      noteBorderColor: '#a16207',
      actorBkg: '#1e1b4b',
      actorBorder: '#818cf8',
      actorTextColor: '#e0e7ff',
      signalColor: '#cbd5e1',
      signalTextColor: '#e4e4e7',
      labelTextColor: '#e4e4e7',
    },
  },
}

/**
 * Prefer Playwright's bundled Chromium (`yarn playwright install chromium`); fall back to a
 * locally installed Google Chrome when it isn't downloaded. Override with MERMAID_BROWSER_CHANNEL.
 */
function launchOptions(): LaunchOptions {
  const channel = process.env.MERMAID_BROWSER_CHANNEL
  if (channel) return { channel }
  return existsSync(chromium.executablePath()) ? {} : { channel: 'chrome' }
}

let renderer: MermaidRenderer | undefined
const getRenderer = () => (renderer ??= createMermaidRenderer({ launchOptions: launchOptions() }))

const hash = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 12)

async function renderDiagram(source: string, theme: Theme): Promise<string> {
  const key = hash(`${CACHE_VERSION}:${theme}:${source}`)
  const cacheFile = path.join(CACHE_DIR, `${key}.svg`)
  try {
    return await readFile(cacheFile, 'utf8')
  } catch {
    // cache miss
  }

  const [result] = await getRenderer()([source], {
    prefix: `m${key}`,
    mermaidConfig: THEMES[theme],
  })
  if (!result || result.status === 'rejected') {
    const reason = result?.status === 'rejected' ? String(result.reason) : 'unknown error'
    throw new Error(reason)
  }

  const svg = result.value.svg
  await mkdir(CACHE_DIR, { recursive: true })
  await writeFile(cacheFile, svg)
  return svg
}

export default function remarkMermaidSvg() {
  return async (tree: Root, file: VFile) => {
    const nodes: { node: Code; index: number; parent: { children: unknown[] } }[] = []
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'mermaid' && parent && index !== undefined) {
        nodes.push({ node, index, parent: parent as { children: unknown[] } })
      }
    })

    await Promise.all(
      nodes.map(async ({ node, index, parent }) => {
        let light: string
        let dark: string
        try {
          ;[light, dark] = await Promise.all([
            renderDiagram(node.value, 'light'),
            renderDiagram(node.value, 'dark'),
          ])
        } catch (error) {
          const line = node.position?.start.line ?? '?'
          throw new Error(`Mermaid render failed in ${file.path}:${line}\n${String(error)}`, {
            cause: error,
          })
        }
        parent.children[index] = {
          type: 'mdxJsxFlowElement',
          name: 'MermaidFigure',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'light', value: light },
            { type: 'mdxJsxAttribute', name: 'dark', value: dark },
          ],
          children: [],
        }
      }),
    )
  }
}
