import { defineConfig as defineEslintConfig } from 'eslint-define-config'
import { TS, Nuxt, Vue, Prettier, initUtils, removeUnusedItems } from './utils'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

export type PluginOptions = {
  ignore?: (
    | 'vue'
    | 'nuxt'
    | 'typescript'
    | 'prettier'
  )[]
}

/**
 * Création d'un fichier .json qui correspond à la config souhaitée.
 * Permet dans des cas particuliers de paramétrer les presets que l'on souhaite.
 * 
 * @param options
 * @returns Le chemin vers le fichier .json qui pourra être passé à eslint dans la clé `extends`
 */
export function createConfig(options?: PluginOptions) {
  const {
    ignore = []
  } = options ?? {}

  initUtils(ignore)

  const config = defineEslintConfig({
    extends: removeUnusedItems([
      './javascript',
      Nuxt ? './nuxt' : '',
      Vue && !Nuxt ?'./vue' : '',
      TS ? './typescript' : '',

      // Devrait toujours être dernier
      Prettier ? './prettier' : ''
    ])
  })

  const configPath = resolve(__dirname, 'config.json')

  writeFileSync(
    configPath,
    JSON.stringify(config)
  )

  return configPath
}