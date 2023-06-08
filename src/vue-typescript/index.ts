import { defineConfig } from 'eslint-define-config'
import { TS, Vue, VueEslintTypescript } from '../utils'
import { removeUnusedItems } from '../utils'
import { consola } from 'consola'
import typescriptConfig = require('../typescript')

function getConfig() {
  if (!Vue) {
    consola.warn(
      `'eslint-config-alsacreations/vue-typescript' config wanted but 'vue' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  if (!TS) {
    consola.warn(
      `'eslint-config-alsacreations/vue-typescript' config wanted but 'typescript' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  if (!VueEslintTypescript) {
    consola.warn(
      `'eslint-config-alsacreations/vue-typescript' config wanted but '@vue/eslint-config-typescript' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  return defineConfig({
    extends: removeUnusedItems([
      '../vue',
      '@vue/eslint-config-typescript/recommended',
    ]),

    rules: typescriptConfig.rules,

    overrides: [
      {
        files: ['*.vue'],
        rules: {
          '@typescript-eslint/no-unused-vars': 'off',
        },
      },
    ],
  })
}

export = getConfig()
