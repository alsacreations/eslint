import { isPackageExists as packageExists, PackageInfo } from 'local-pkg'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { PluginOptions } from './plugin'

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

export let TS = false
export let Nuxt = false
export let Vue = false
export let Prettier = false
export let EslintPluginPrettier = packageExists('eslint-plugin-prettier')
export let VueEslintTypescript = packageExists('@vue/eslint-config-typescript')
export let VueEslintPrettier = packageExists('@vue/eslint-config-prettier')

/**
 * Instancie les utilités définissant les paquets installés
 * @param ignored Liste de paquets ignorés
 */
export function initUtils(ignored: Required<PluginOptions>['ignore']) {
  const isIgnored = (pkg: typeof ignored[number]) => (
    !!ignored.find(p => p === pkg)
  )

  TS = packageExists('typescript') && !isIgnored('typescript')
  Nuxt = packageExists('nuxt') && !isIgnored('nuxt') && !isIgnored('vue')
  Vue = packageExists('vue') && !isIgnored('vue')
  Prettier = packageExists('prettier') && isPackageListed('prettier') && !isIgnored('prettier')
}