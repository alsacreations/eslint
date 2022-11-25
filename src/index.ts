import { defineConfig } from 'eslint-define-config'

export = defineConfig({
  extends: [
    './javascript',
    './typescript',
    './nuxt',
    './vue'
  ]
})