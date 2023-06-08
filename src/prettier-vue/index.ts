import { defineConfig } from 'eslint-define-config'
import { VueEslintPrettier } from '../utils'
import { consola } from 'consola'

function getConfig() {
  if (!VueEslintPrettier) {
    consola.warn(
      `'eslint-config-alsacreations/prettier-vue' config wanted but '@vue/eslint-config-prettier' not installed. Skipping.`,
    )

    return defineConfig({})
  }

  return defineConfig({
    extends: ['@vue/eslint-config-prettier/skip-formatting'],
  })
}

export = getConfig()
