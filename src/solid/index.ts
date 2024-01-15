import { defineConfig } from 'eslint-define-config'

function getConfig() {
  return defineConfig({
    plugins: ['solid'],
    extends: ['plugin:solid/recommended'],
  })
}

export = getConfig()
