import { defineConfig } from 'eslint-define-config'
import { Nuxt, Vue } from '../utils'
import { consola } from 'consola'

function getConfig() {
  if (!Nuxt) {
    consola.warn(
      `'eslint-config-alsacreations/nuxt' config wanted but 'nuxt' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  if (!Vue) {
    consola.warn(
      `'eslint-config-alsacreations/nuxt' config wanted but 'vue' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  return defineConfig({
    extends: ['@nuxtjs/eslint-config', './../vue'],
  })
}

export = getConfig()
