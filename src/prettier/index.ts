import { defineConfig } from 'eslint-define-config'

function getConfig() {
  return defineConfig({
    extends: ['prettier'],
  })
}

export = getConfig()
