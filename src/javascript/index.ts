import { defineConfig } from 'eslint-define-config'

export = defineConfig({
  extends: [
    '../common'
  ],
  rules: {
    curly: ['error', 'all'], // {} toujours requises
    'no-trailing-spaces': 'error', // pas d'espaces vides
    'object-shorthand': ['error', 'always'],
    // les const, c'est la vie
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false
      }
    ],
    // pas d'espaces avant les () d'une fonction
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ]
  }
})
