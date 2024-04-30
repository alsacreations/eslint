import tseslint from 'typescript-eslint'
import eslintJs from '@eslint/js'
import common from './common'

export default tseslint.config(eslintJs.configs.recommended, ...common, {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
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
