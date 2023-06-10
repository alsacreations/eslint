import { defineConfig } from 'tsup'
import fg from 'fast-glob'

export default defineConfig({
  entry: fg.sync('{src,helpers,bin}/**/*.{js,ts}'),
  clean: true,
  format: 'cjs',
  bundle: false,
})
