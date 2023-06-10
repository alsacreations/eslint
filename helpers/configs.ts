import { ProgramAnswers } from './questions'

export function getConfigs(answers: ProgramAnswers) {
  const configs: string[] = ['alsacreations/javascript']

  const VueTS = answers.vue && answers.typescript
  const NuxtTS = answers.nuxt && answers.typescript

  if (answers.nuxt && !answers.typescript) {
    configs.push('alsacreations/nuxt')
  }

  if (answers.nuxt && answers.typescript) {
    configs.push('alsacreations/nuxt-typescript')
  }

  if (answers.vue && !answers.typescript) {
    configs.push('alsacreations/vue')
  }

  if (answers.vue && answers.typescript) {
    configs.push('alsacreations/vue-typescript')
  }

  if (!VueTS && !NuxtTS && answers.typescript) {
    configs.push('alsacreations/typescript')
  }

  if ((answers.vue || answers.nuxt) && answers.prettier) {
    configs.push('alsacreations/prettier-vue')
  }

  if (!answers.vue && !answers.nuxt && answers.prettier) {
    configs.push('alsacreations/prettier')
  }

  return configs
}
