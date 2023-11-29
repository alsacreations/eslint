import consola from 'consola'
import type { Merge } from 'type-fest'

const questions = [
  {
    name: 'prettier',
    message: 'Do you use Prettier ?',
  },
  {
    name: 'typescript',
    message: 'Do you use TypeScript ?',
  },
  {
    name: 'astro',
    message: 'Do you use Astro ?',
  },
  {
    name: 'nuxt',
    message: 'Do you use Nuxt ?',
  },
  {
    name: 'vue',
    message: 'Do you use Vue ?',
    when: (answers) => answers['nuxt'] === false,
  },
] as const satisfies readonly {
  name: string
  message: string
  when?: (answers: Record<string, boolean>) => boolean
}[]

export async function getAnswers() {
  const answers: Record<string, boolean> = {}

  for await (const question of questions) {
    if ('when' in question && question.when && !question.when(answers)) {
      continue
    }

    const answer = await consola.prompt(question.message, {
      type: 'confirm',
    })

    answers[question.name] = answer
  }

  return answers as ProgramAnswers
}

type ProgramQuestion = (typeof questions)[number]

type OptionalQuestion = Extract<ProgramQuestion, { when: any }>
type RequiredQuestion = Exclude<ProgramQuestion, { when: any }>

export type ProgramAnswers = Merge<
  Partial<Record<OptionalQuestion['name'], boolean>>,
  Record<RequiredQuestion['name'], boolean>
>
