#!/usr/bin/node

import * as t from '@babel/types'
import traverse from '@babel/traverse'
import generator from '@babel/generator'
import * as parser from '@babel/parser'
import { consola } from 'consola'
import { program } from 'commander'
import { cosmiconfig } from 'cosmiconfig'
import { mergeWith, isArray } from 'lodash'
import { readFile, writeFile } from 'fs/promises'
import { getDeps } from '../helpers/deps'
import { getConfigs } from '../helpers/configs'
import { ProgramAnswers, questions } from '../helpers/questions'
import YAML from 'yaml'
import prettier from 'prettier'

const explorer = cosmiconfig('eslint')

program
  .name('eslint-config-alsacreations')
  .description('Bootstrap eslint-config-alsacreations in a project')
  .version('0.1.0')

program
  .command('init')
  .description('Bootstrap eslint-config-alsacreations in a project')
  .action(async () => {
    try {
      const inquirer = (await import('inquirer')).default
      const { execaCommand } = await import('execa')

      const answers = await inquirer.prompt<ProgramAnswers>(questions)

      const deps = getDeps(answers)
      const configs = getConfigs(answers)

      const cosmiConfigRes = await explorer.search()

      if (cosmiConfigRes) {
        const {
          config: esLintConfig,
          filepath: eslintConfigPath,
          isEmpty = false,
        } = cosmiConfigRes

        const isYml =
          eslintConfigPath.endsWith('.yaml') ||
          eslintConfigPath.endsWith('.yml')
        const isJson = eslintConfigPath.endsWith('.json')
        const isJs = eslintConfigPath.endsWith('.js')

        const modifiedConfig = mergeWith(
          isEmpty ? {} : esLintConfig,
          {
            extends: configs,
          },
          (objValue, srcValue) => {
            if (isArray(objValue)) {
              return objValue.concat(srcValue)
            }
          },
        )

        if (isJs) {
          const originalCode = (await readFile(eslintConfigPath)).toString()

          const ast = parser.parse(originalCode, {
            sourceType: 'module', // Specify the source type (e.g., 'module' or 'script')
          })

          traverse(ast, {
            AssignmentExpression(path) {
              const { left, right } = path.node

              if (
                t.isMemberExpression(left) &&
                t.isIdentifier(left.object, { name: 'module' }) &&
                t.isIdentifier(left.property, { name: 'exports' })
              ) {
                // Prettier ne peut formater que du JS valide, on ajoute donc une fause `const` devant
                const formattedObjectString = prettier.format(
                  `const x = ${JSON.stringify(modifiedConfig)}`,
                  { parser: 'babel', semi: false, singleQuote: true },
                )

                path.get('right').replaceWithSourceString(
                  // On supprime la fausse `const` maintenant inutile
                  formattedObjectString.replace('const x = ', ''),
                )
              }
            },
          })

          const modifiedCode = generator(ast).code

          await writeFile(
            eslintConfigPath,
            prettier.format(modifiedCode, {
              semi: false,
              parser: 'babel',
              singleQuote: true,
              quoteProps: 'as-needed',
            }),
            'utf8',
          )
        }

        if (isJson) {
          await writeFile(
            eslintConfigPath,
            JSON.stringify(modifiedConfig, null, 2),
            'utf8',
          )
        }

        if (isYml) {
          await writeFile(
            eslintConfigPath,
            YAML.stringify(modifiedConfig, null, 2),
            'utf8',
          )
        }
      }

      try {
        const execaRes = execaCommand(
          `npx --package=@antfu/ni ni ${deps.join(' ')}`,
          { env: { FORCE_COLOR: 'true' } },
        )

        // Ajoute les log du process enfant aux logs du process parent
        execaRes.pipeStdout?.(process.stdout)

        await execaRes
      } catch (error) {
        throw new Error(
          `Failed to install packages, please install the following dependencies manually: ${deps.join(
            ' ',
          )}`,
        )
      }
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'isTtyError' in error &&
        error.isTtyError
      ) {
        consola.error(`Prompt couldn't be rendered in the current environment`)
      } else {
        consola.error(error)
      }

      process.exit(1)
    }
  })

program.parse()
