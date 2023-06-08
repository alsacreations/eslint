import { defineConfig } from 'eslint-define-config'
import { removeUnusedItems } from '../utils'
import commonConfig = require('../common')

console.log(commonConfig)

/**
 * Pour Vue, on prefix par `vue/`
 * @example `vue/space-in-parens`
 */
const commonVueConfig = defineConfig({
  rules: Object.fromEntries(
    Object.entries(commonConfig.rules as Record<string, any>).map(
      ([key, value]) => [`vue/${key}`, value],
    ),
  ),
})

console.log(commonVueConfig)

function getConfig() {
  return defineConfig({
    overrides: [
      {
        files: ['*.vue'],
        rules: {
          'no-unused-vars': 'off',
          'no-undef': 'off',
        },
      },
    ],

    extends: removeUnusedItems(['plugin:vue/vue3-recommended', '../common']),

    rules: {
      ...commonVueConfig.rules,
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
          named: 'longform',
        },
      ],
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/component-definition-name-casing': 'error',
      'vue/mustache-interpolation-spacing': ['error', 'always'],
      'vue/no-multi-spaces': ['error'],
      'vue/v-for-delimiter-style': ['error', 'in'],
      'vue/no-v-text': ['error'],
      'vue/no-unused-properties': [
        'error',
        {
          groups: ['props', 'data', 'computed', 'methods', 'setup'],
          deepData: false,
        },
      ],
      'vue/define-macros-order': ['error'],
      'vue/define-props-declaration': ['error', 'type-based'],
    },
  })
}

export = getConfig()
