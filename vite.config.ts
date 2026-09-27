/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import remarkMermaidSvg from './build/remark-mermaid-svg.ts'
import firebaseEnvGuard from './build/vite-plugin-firebase-env-guard.ts'
import lessonStats from './build/vite-plugin-lesson-stats.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkMermaidSvg,
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            { theme: { light: 'github-light', dark: 'github-dark' }, keepBackground: false },
          ],
        ],
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
    lessonStats(),
    firebaseEnvGuard(),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    chunkSizeWarningLimit: 400,
  },
  // The code runner worker lazy-loads the TypeScript transpiler, which needs ES module workers.
  worker: {
    format: 'es',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
