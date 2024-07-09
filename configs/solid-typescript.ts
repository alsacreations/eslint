import tseslint, { type Config } from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'

const { default: solidTypescript } = (await import(
  // @ts-expect-error - le fichier est en CommonJS, on doit également forcer l'extension de fichier
  'eslint-plugin-solid/configs/typescript.js'
)) as { default: typeof import('eslint-plugin-solid/configs/typescript') }

const config = tseslint.config({
  files: ['**/*.{ts,tsx}'],
  ...(solidTypescript as unknown as Config),
  languageOptions: {
    parser: tsParser,
  },
})

export default config as unknown[]
