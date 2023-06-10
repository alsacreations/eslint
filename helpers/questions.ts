import type { Question } from 'inquirer'
import type { Merge } from 'type-fest'

export const questions = [
  {
    type: 'confirm',
    name: 'prettier',
    message: 'Do you use Prettier ?',
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: 'Do you use TypeScript ?',
  },
  {
    type: 'confirm',
    name: 'nuxt',
    message: 'Do you use Nuxt ?',
  },
  {
    type: 'confirm',
    name: 'vue',
    message: 'Do you use Vue ?',
    when: (answers) => answers['nuxt'] === false,
  },
] as const satisfies readonly Readonly<Question>[]

type ProgramQuestion = (typeof questions)[number]

type OptionalQuestion = Extract<ProgramQuestion, { when: any }>
type RequiredQuestion = Exclude<ProgramQuestion, { when: any }>

export type ProgramAnswers = Merge<
  Partial<Record<OptionalQuestion['name'], boolean>>,
  Record<RequiredQuestion['name'], boolean>
>
