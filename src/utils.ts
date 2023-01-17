import { isPackageExists as packageExists, PackageInfo } from 'local-pkg'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Permet de savoir si un certain package est listé
 * dans le package.json du process en cours.
 *
 * @param name Le nom du package
 */
export const isPackageListed = (name: string) => {
  const packageJson: Partial<PackageInfo['packageJson']> = (() => {
    try {
      return JSON.parse(readFileSync(
        resolve(process.cwd(), 'package.json')
      ).toString())
    } catch (error) {
      return {}
    }
  })()

  const deps = packageJson?.dependencies ?? {}
  const devDeps = packageJson?.devDependencies ?? {}

  return name in deps || name in devDeps
}

export function removeUnusedItems (items: string[]) {
  return items.filter((item) => item !== '')
}

export const TS = packageExists('typescript')
export const Nuxt = packageExists('nuxt')
export const Vue = packageExists('vue')
export const Prettier = packageExists('prettier') && isPackageListed('prettier')
export const EslintPluginPrettier = packageExists('eslint-plugin-prettier')
export const VueEslintTypescript = packageExists('@vue/eslint-config-typescript')
export const VueEslintPrettier = packageExists('@vue/eslint-config-prettier')