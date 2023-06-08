import { defineConfig } from 'eslint-define-config'
import { Nuxt, TS, Vue } from '../utils'
import { removeUnusedItems } from '../utils'
import { consola } from 'consola'
import typescriptConfig = require('../typescript')

function getConfig() {
  if (!Nuxt) {
    consola.warn(
      `'eslint-config-alsacreations/nuxt-typescript' config wanted but 'nuxt' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  if (!Vue) {
    consola.warn(
      `'eslint-config-alsacreations/nuxt-typescript' config wanted but 'vue' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  if (!TS) {
    consola.warn(
      `'eslint-config-alsacreations/nuxt-typescript' config wanted but 'typescript' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  return defineConfig({
    extends: removeUnusedItems(['@nuxtjs/eslint-config-typescript', '../vue']),
    rules: typescriptConfig.rules,
  })
}

export = getConfig()
