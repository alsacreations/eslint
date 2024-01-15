import { ProgramAnswers } from './questions'

export function getDeps(answers: ProgramAnswers) {
  return [
    'eslint-config-alsacreations',
    '@rushstack/eslint-patch',
    'eslint',
    answers.typescript ? 'typescript' : undefined,
    answers.prettier ? 'prettier' : undefined,
    answers.astro && answers.prettier ? 'prettier-plugin-astro' : undefined,
    answers.solid ? 'eslint-plugin-solid' : undefined,
    // Prettier sans framework
    !answers.vue && !answers.nuxt && answers.prettier
      ? 'eslint-config-prettier'
      : undefined,
    // Prettier avec framework
    (answers.vue || answers.nuxt) && answers.prettier
      ? '@vue/eslint-config-prettier'
      : undefined,
    // Vue avec TS
    answers.vue && !answers.nuxt && answers.typescript
      ? '@vue/eslint-config-typescript'
      : undefined,
    // Vue
    answers.vue && !answers.nuxt ? 'eslint-plugin-vue' : undefined,
    // Nuxt
    !answers.vue && answers.nuxt && !answers.typescript
      ? '@nuxtjs/eslint-config'
      : undefined,
    // Nuxt + TS
    !answers.vue && answers.nuxt && answers.typescript
      ? '@nuxtjs/eslint-config-typescript'
      : undefined,
  ].filter((item) => typeof item === 'string') as string[]
}
