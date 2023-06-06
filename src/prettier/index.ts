import { defineConfig } from 'eslint-define-config'
import { Vue, Prettier, EslintConfigPrettier, VueEslintPrettier } from '../utils'
import { removeUnusedItems } from '../utils'

export = defineConfig({
  extends: removeUnusedItems([
    // Gestion de prettier quand vue est présent
    Prettier && Vue && VueEslintPrettier ? '@vue/eslint-config-prettier/skip-formatting' : '',
    // Gestion de prettier sans vue (ou nuxt), si vue est présent, on utilise le plugin @vue
    Prettier && !Vue && EslintConfigPrettier ? 'prettier' : '',
  ])
})
