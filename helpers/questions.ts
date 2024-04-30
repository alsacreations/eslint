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
    name: 'solid',
    message: 'Do you use Solid ?',
  },
  {
    name: 'astro',
    message: 'Do you use Astro ?',
  },
  {
    name: 'vue',
    message:
      'Do you use Vue ? (Nuxt is not supported, do not select this option if you use Nuxt)',
  },
] as const satisfies readonly {
  name: string
  message: string
  when?: (answers: Record<string, boolean>) => boolean
}[]

export async function getAnswers() {
  const answers: Record<string, boolean> = {}

  for await (const question of questions) {
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
