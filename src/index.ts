import { defineConfig as defineEslintConfig } from 'eslint-define-config'
import { createConfig } from './plugin'

/**
 * Config par défaut qui sera utilisée si eslint est configuré
 * de cette façon.
 * 
 * @example
 * ```
 * {
 *   extends: [
 *     'alsacreations'
 *   ]
 * }
 * ```
 */
export = defineEslintConfig({
  extends: [
    createConfig()
  ]
})