import { defineConfig } from 'tsup'
import fg from 'fast-glob'

export default defineConfig({
  entry: fg.sync('{configs,helpers,bin}/**/*.{js,ts}', {
    ignore: ['**/*.d.ts'],
  }),
  clean: true,
  format: 'esm',
  bundle: false,
  dts: true,
})
