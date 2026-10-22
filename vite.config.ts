import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    singleQuote: true,
    semi: false,
    // Specs are hand-authored; generated files are owned by their tools.
    ignorePatterns: [
      '**/*.md',
      '**/routeTree.gen.ts',
      '**/worker-configuration.d.ts',
      '**/generated/**',
    ],
  },
  lint: {
    ignorePatterns: ['**/routeTree.gen.ts', '**/worker-configuration.d.ts', '**/generated/**'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
})
