import { defineConfig } from 'eslint-define-config'
import { Vue, Prettier, EslintPluginPrettier, VueEslintPrettier } from '../utils'
import { removeUnusedItems } from '../utils'

export = defineConfig({
  plugins: removeUnusedItems([
    // Gestion de prettier sans vue (ou nuxt) (si vue est présent, on utilise le plugin @vue)
    Prettier && !Vue && EslintPluginPrettier ? 'prettier' : ''
  ]),
  extends: removeUnusedItems([
    // Gestion de prettier quand vue est présent
    Prettier && Vue && VueEslintPrettier ? '@vue/eslint-config-prettier' : '',
  ]),
  rules: {
    'prettier/prettier': 'error'
  }
})
