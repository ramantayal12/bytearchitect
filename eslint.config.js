import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.yarn', 'src/components/ui'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Module boundaries: features are consumed only through their public index.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*'],
              message:
                'Import from the feature barrel (e.g. "@/features/auth") instead of its internals.',
            },
            {
              group: ['firebase/*'],
              message:
                'Only lib/firebase.ts and *.firebase.ts adapters may import the Firebase SDK.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/lib/firebase.ts', 'src/**/*.firebase.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
)
