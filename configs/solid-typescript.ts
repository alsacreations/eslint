import tseslint, { type Config } from 'typescript-eslint'
import solidTypescript from 'eslint-plugin-solid/configs/typescript'
import tsParser from '@typescript-eslint/parser'

export default tseslint.config({
  files: ['*.ts', '*.tsx'],
  ...(solidTypescript as unknown as Config),
  languageOptions: {
    parser: tsParser,
  },
})
