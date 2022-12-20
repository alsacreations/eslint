import { defineConfig } from 'eslint-define-config'
import { TS, Nuxt, Prettier, VueEslintTypescript, VueEslintPrettier } from '../utils'
import { removeUnusedItems } from '../utils'

export = defineConfig({
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        ...(
          TS
            ? { '@typescript-eslint/no-unused-vars': 'off' }
            : {}
        ),
      },
    },
  ],

  extends: removeUnusedItems([
    'plugin:vue/vue3-recommended',
    '../common',
    TS && !Nuxt && VueEslintTypescript ? '@vue/eslint-config-typescript/recommended' : ''
 ]),

  rules: {
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/this-in-template': ['error', 'never'],
    'vue/v-on-style': ['error', 'longform'],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/require-name-property': 'error',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/v-slot-style': [
      'error',
      {
        atComponent: 'longform',
        default: 'longform',
        named: 'longform'
      }
    ],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/component-definition-name-casing': 'error',
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/no-v-text': ['error'],
    'vue/no-unused-properties': ['error', {
      groups: ['props', 'data', 'computed', 'methods', 'setup'],
      deepData: false
    }],
    'vue/define-macros-order': ['error'],
    'vue/define-props-declaration': ['error', 'type-based']
  }
})
