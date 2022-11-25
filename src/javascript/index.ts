import { defineConfig } from 'eslint-define-config'
import common = require('./../common/common')

export = defineConfig({
  rules: {
    ...common.commonConfig.rules,
    indent: ['error', 2, { SwitchCase: 1 }],
    // Force les commentaires multi-lignes du type starred-block
    'multiline-comment-style': ['error', 'starred-block'],
    curly: ['error', 'all'], // {} toujours requises
    'quote-props': 'off', // controle des quotes autour des propriétés des objets
    'no-trailing-spaces': 'error', // pas d'espaces vides
    semi: ['error', 'never'], // pas de ";" à la fin des lignes
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
