import { ProgramAnswers } from './questions'

export function getDeps(answers: ProgramAnswers) {
  return [
    'eslint-config-alsacreations',
    'eslint',
    answers.typescript ? 'typescript' : undefined,
    answers.prettier ? 'prettier' : undefined,
    answers.astro && answers.prettier ? 'prettier-plugin-astro' : undefined,
    answers.solid ? 'eslint-plugin-solid' : undefined,
    answers.prettier ? 'eslint-config-prettier' : undefined,
    // Vue
    answers.vue ? 'eslint-plugin-vue' : undefined,
  ].filter((item): item is string => typeof item === 'string')
}
