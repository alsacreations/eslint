import tseslint from 'typescript-eslint'
import eslintJs from '@eslint/js'

const config = tseslint.config(eslintJs.configs.recommended, {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // triple = obligatoire
    eqeqeq: 'error',
    // Préfère les template string que les concaténations
    'prefer-template': 'error',
    'no-use-before-define': 'error',
    curly: ['error', 'all'], // {} toujours requises
    'no-trailing-spaces': 'error', // pas d'espaces vides
    'object-shorthand': ['error', 'always'],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ],
    // pas d'espaces avant les () d'une fonction
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
})

export default config as unknown[]
