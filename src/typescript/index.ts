import { defineConfig } from 'eslint-define-config'
import { Nuxt, removeUnusedItems, Vue } from '../utils'

export = defineConfig({
  extends: removeUnusedItems([
    // Nuxt et Vue avec le plugin @nuxtjs/eslint-config-typescript et @vue/eslint-config-typescript s'occupe de ça
    Nuxt || Vue
      ? ''
      : 'plugin:@typescript-eslint/recommended',
  ]),

  plugins: removeUnusedItems([
    // Nuxt et Vue avec le plugin @nuxtjs/eslint-config-typescript et @vue/eslint-config-typescript s'occupe de ça
    Nuxt || Vue
      ? ''
      : '@typescript-eslint'
  ]),

  // Utilisation de parserOptions.parser pour être compatible avec eslint-plugin-vue
  // parserOptions: {
  //   parser: '@typescript-eslint/parser'
  // },

  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],

    /*
      * Per the docs, the root no-unused-vars should be disabled:
      * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
      */
    'no-unused-vars': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    'no-undef': 'off',

    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
      ['fixStyle' as any]: 'separate-type-imports'
    }],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error'
  },
  'overrides': [
    {
      // enable the rule specifically for TypeScript files
      'files': ['*.ts', '*.mts', '*.cts', '*.tsx'],
      'rules': {
        '@typescript-eslint/explicit-member-accessibility': ['error', {
          accessibility: 'explicit',
          overrides: {
            parameterProperties: 'off'
          }
        }]
      }
    }
  ]
})
