import { defineConfig } from 'tsup'
import fg from 'fast-glob'

const VERSION = require('./package.json').version

export default defineConfig({
  entry: fg.sync('{configs,bin}/**/*.{js,ts}', {
    ignore: ['**/*.d.ts'],
  }),
  clean: true,
  format: 'esm',
  external: [/eslint-config-.*/, /eslint-plugin-.*/, /@typescript-eslint\/.*/],
  bundle: true,
  dts: true,
  env: {
    VERSION,
  },
})
