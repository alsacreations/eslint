import { defineConfig } from 'eslint-define-config'
import { TS, Nuxt, Vue, Prettier } from './utils'
import { removeUnusedItems } from './utils'

export = defineConfig({
  extends: removeUnusedItems([
    './javascript',
    Nuxt ? './nuxt' : '',
    Vue && !Nuxt ?'./vue' : '',
    TS ? './typescript' : '',

    // Devrait toujours être dernier
    Prettier ? './prettier' : ''
  ])
})