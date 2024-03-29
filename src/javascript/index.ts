import { defineConfig } from 'eslint-define-config'

export = defineConfig({
  extends: ['eslint:recommended', '../common'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'no-use-before-define': 'error',
    curly: ['error', 'all'], // {} toujours requises
    'no-trailing-spaces': 'error', // pas d'espaces vides
    'object-shorthand': ['error', 'always'],
    // les const, c'est la vie
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
