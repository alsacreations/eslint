import { ProgramAnswers } from './questions'

export function getConfigs(answers: ProgramAnswers) {
  const configs: Record<string, string> = {
    js: `import js from 'eslint-config-alsacreations/configs/javascript'`,
  }

  if (answers.vue) {
    configs.vue = `import vue from 'eslint-config-alsacreations/configs/vue'`
  }

  if (answers.typescript) {
    configs.typescript = `import typescript from 'eslint-config-alsacreations/configs/typescript'`
  }

  if (answers.solid && !answers.typescript) {
    configs.solid = `import solid from 'eslint-config-alsacreations/configs/solid'`
  }

  if (answers.solid && answers.typescript) {
    configs.solidTs = `import solidTs from 'eslint-config-alsacreations/configs/solid-typescript'`
  }

  if (answers.prettier) {
    configs.prettier = `import prettier from 'eslint-config-alsacreations/configs/prettier'`
  }

  return configs
}
