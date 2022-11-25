import { defineConfig } from 'eslint-define-config'
import common = require('./../common/common')

export = defineConfig({
  extends: [
     'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  rules: {
    ...common.commonVueConfig.rules,
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/this-in-template': ['error', 'never'],
    'vue/v-on-style': ['error', 'longform'],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/custom-event-name-casing': 'error',
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
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'never'
        }
      }
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        alignAttributesVertically: false
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 }
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'CONDITIONALS',
          'LIST_RENDERING',
          'OTHER_DIRECTIVES',
          'GLOBAL',
          'UNIQUE',
          'DEFINITION',
          'TWO_WAY_BINDING',
          'OTHER_ATTR',
          'CONTENT',
          'RENDER_MODIFIERS',
          'EVENTS'
        ],
        alphabetical: false
      }
    ],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-multi-spaces': ['error']
  }
})
