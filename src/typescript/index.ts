import { defineConfig } from 'eslint-define-config'
import { TS } from '../utils'
import { consola } from 'consola'

function getConfig() {
  if (!TS) {
    consola.warn(
      `'eslint-config-alsacreations/typescript' config wanted but 'typescript' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  return defineConfig({
    extends: ['plugin:@typescript-eslint/recommended'],

    plugins: ['@typescript-eslint'],

    // Utilisation de parserOptions.parser pour être compatible avec eslint-plugin-vue
    // parserOptions: {
    //   parser: '@typescript-eslint/parser'
    // },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      /**
       * @see https://typescript-eslint.io/rules/no-use-before-define/
       */
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',

      /*
       * Per the docs, the root no-unused-vars should be disabled:
       * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
       */
      'no-unused-vars': 'off',

      // https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',

      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          ['fixStyle' as any]: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
    overrides: [
      {
        // enable the rule specifically for TypeScript files
        files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
        rules: {
          '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
              accessibility: 'explicit',
              overrides: {
                parameterProperties: 'off',
              },
            },
          ],
          'no-unused-vars': 'off',
        },
      },
    ],
  })
}

export = getConfig()
