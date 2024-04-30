/// <reference path="./untyped.d.ts" />

import commonConfig from './common'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/**
 * Pour Vue, on prefix par `vue/`
 * @example `vue/space-in-parens`
 */
const commonVueConfigs = commonConfig.map((config) => {
  const rules = Object.fromEntries(
    Object.entries(config.rules as Record<string, any>).map(([key, value]) => [
      `vue/${key}`,
      value,
    ]),
  )

  return {
    rules,
  }
})

export default tseslint.config(
  ...commonConfig,
  ...commonVueConfigs,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['*.vue'],
    rules: {
      'no-undef': 'off',
    },
  },
  {
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
  },
)
