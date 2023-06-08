import { defineConfig } from 'eslint-define-config'

export = defineConfig({
  rules: {
    // triple = obligatoire
    eqeqeq: 'error',
    // Préfère les template string que les concaténations
    'prefer-template': 'error',
  },
})
