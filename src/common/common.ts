import { defineConfig } from 'eslint-define-config'

/**
 * Règles communes pour Vue et JS
 */
const commonConfig = defineConfig({
  rules: {
      // Force des espaces consistants dans les parenthèses
      'space-in-parens': ['error', 'never'],
      // pas de dernière virgule
      'comma-dangle': ['error', 'never'],
      // Force un espace avant et après un mot clé, if, else etc
      'keyword-spacing': ['error'],
      // Force un espace dans les objets
      'object-curly-spacing': ['error', 'always'],
      // imbrication des {} (if/else/try/catch/etc...) unique
      'brace-style': 'error',
      // triple = obligatoire
      eqeqeq: 'error',
      // espaces entre opérateurs
      'space-infix-ops': ['error'],
      // Force les propriétés à être espacées Ex: { hello: 'World' } -> espace après le double point
      'key-spacing': ['error', { afterColon: true }],
      // Préfère les template string que les concaténations
      'prefer-template': 'error',
      'comma-spacing': ['error', { 'before': false, 'after': true }],
  }
})

/**
 * Pour Vue, on prefix par `vue/`
 * @example `vue/space-in-parens`
 */
const commonVueConfig = defineConfig({
  rules: Object.fromEntries(
    Object
      .entries(commonConfig.rules as Record<string, any>)
      .map(([key, value]) => [`vue/${key}`, value])
  )
})

export = {
  commonConfig,
  commonVueConfig
}