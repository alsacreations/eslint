import { defineConfig } from 'eslint-define-config'
import { Vue } from '../utils'

/**
 * Règles communes pour Vue et JS
 */
const commonConfig = defineConfig({
  rules: {
      // triple = obligatoire
      eqeqeq: 'error',
      // Préfère les template string que les concaténations
      'prefer-template': 'error'
  }
})

/**
 * Pour Vue, on prefix par `vue/`
 * @example `vue/space-in-parens`
 */
const commonVueConfig = defineConfig({
  rules: Vue
    ? Object.fromEntries(
      Object
        .entries(commonConfig.rules as Record<string, any>)
        .map(([key, value]) => [`vue/${key}`, value])
    )
    : {}
})

export = defineConfig({
  rules: {
    ...commonConfig.rules,
    ...commonVueConfig.rules
  }
})