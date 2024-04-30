import tseslint from 'typescript-eslint'

export default tseslint.config({
  rules: {
    // triple = obligatoire
    eqeqeq: 'error',
    // Préfère les template string que les concaténations
    'prefer-template': 'error',
  },
})
