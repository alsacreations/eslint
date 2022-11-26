import { defineConfig } from 'eslint-define-config'
import { TS } from '../utils'

export = defineConfig({
  extends: [
    TS
      ? '@nuxtjs/eslint-config-typescript'
      : '@nuxtjs/eslint-config',
    './../vue'
  ],
  rules: {}
})
