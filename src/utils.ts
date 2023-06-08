import { isPackageExists as packageExists, PackageInfo } from 'local-pkg'

export function removeUnusedItems(items: string[]) {
  return items.filter((item) => item !== '')
}

export const TS = packageExists('typescript')
export const Nuxt = packageExists('nuxt')
export const Vue = packageExists('vue')
export const Prettier = packageExists('prettier')
export const EslintConfigPrettier = packageExists('eslint-config-prettier')
export const VueEslintTypescript = packageExists(
  '@vue/eslint-config-typescript',
)
export const VueEslintPrettier = packageExists('@vue/eslint-config-prettier')
