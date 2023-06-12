#!/usr/bin/env node

import * as t from '@babel/types'
import traverse from '@babel/traverse'
import generator from '@babel/generator'
import * as parser from '@babel/parser'
import { consola } from 'consola'
import { program } from 'commander'
import { mergeWith, isArray, merge } from 'lodash'
import { readFile, writeFile } from 'fs/promises'
import { getDeps } from '../helpers/deps'
import { getConfigs } from '../helpers/configs'
import { ProgramAnswers, questions } from '../helpers/questions'
import YAML from 'yaml'
import prettier from 'prettier'
import type { JsonObject } from 'type-fest'

program
  .name('eslint-config-alsacreations')
  .description('Bootstrap eslint-config-alsacreations in a project')
  .version('0.1.0')

program
  .command('init')
  .description('Bootstrap eslint-config-alsacreations in a project')
  .action(async () => {
    try {
      const [{ default: inquirer }, { findUp }, { execaCommand }] =
        await Promise.all([
          import('inquirer'),
          import('find-up'),
          import('execa'),
        ])

      const answers = await inquirer.prompt<ProgramAnswers>(questions)

      const deps = getDeps(answers)
      const configs = getConfigs(answers)

      const eslintConfigPath = await findUp([
        `.eslintrc.js`,
        `.eslintrc.cjs`,
        `.eslintrc.yaml`,
        `.eslintrc.yml`,
        `.eslintrc.json`,
        `package.json`,
      ])

      if (!eslintConfigPath) {
        throw new Error('No ESLint config file found.')
      }

      const isYml =
        eslintConfigPath.endsWith('.yaml') || eslintConfigPath.endsWith('.yml')
      const isPackageJson = eslintConfigPath.includes('package.json')
      const isJson = eslintConfigPath.endsWith('.json') && !isPackageJson
      const isJs =
        eslintConfigPath.endsWith('.js') || eslintConfigPath.endsWith('.cjs')

      if (isJs) {
        const originalCode = (await readFile(eslintConfigPath)).toString()

        const ast = parser.parse(originalCode, {
          sourceType: 'module', // Specify the source type (e.g., 'module' or 'script')
        })

        let extendsArrayNode: null | t.ArrayExpression = null
        let extendsPropertyNode = null

        traverse(ast, {
          AssignmentExpression(path) {
            const { left, right } = path.node

            if (
              t.isMemberExpression(left) &&
              t.isIdentifier(left.object, { name: 'module' }) &&
              t.isIdentifier(left.property, { name: 'exports' }) &&
              t.isObjectExpression(right)
            ) {
              // Find (if it exists) the `extends` property within `module.exports`
              right.properties.forEach((property) => {
                if (
                  !t.isSpreadElement(property) &&
                  !t.isObjectMethod(property) &&
                  t.isStringLiteral(property.key, { value: 'extends' }) &&
                  t.isArrayExpression(property.value)
                ) {
                  extendsArrayNode = property.value
                  extendsPropertyNode = property
                }
              })

              if (extendsArrayNode) {
                // If `extends` property exists, add the items to the array
                extendsArrayNode.elements.push(
                  ...configs.map((config) => t.stringLiteral(config)),
                )
              } else {
                // If `extends` property doesn't exist, create it with an array value
                extendsArrayNode = t.arrayExpression(
                  configs.map((config) => t.stringLiteral(config)),
                )
                extendsPropertyNode = t.objectProperty(
                  t.stringLiteral('extends'),
                  extendsArrayNode,
                )
                right.properties.push(extendsPropertyNode)
              }
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
      } else {
        const currentConfigRaw = (await readFile(eslintConfigPath)).toString()

        // prettier-ignore
        const currentConfig: JsonObject | undefined = isJson
          ? JSON.parse(currentConfigRaw)
          : isPackageJson
            ? JSON.parse(currentConfigRaw)
            : isYml
              ? YAML.parse(currentConfigRaw)
              : undefined

        if (!currentConfig) {
          throw new Error('Failed to parse ESLint config file.')
        }

        const modifiedConfig = mergeWith(
          isPackageJson ? currentConfig.eslintConfig ?? {} : currentConfig,
          {
            extends: configs,
          },
          (objValue, srcValue) => {
            if (isArray(objValue)) {
              return objValue.concat(srcValue)
            }
          },
        )

        if (isPackageJson) {
          await writeFile(
            eslintConfigPath,
            JSON.stringify(
              merge(currentConfig, { eslintConfig: modifiedConfig }),
              null,
              2,
            ),
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
          `npx --package=@antfu/ni ni --save-dev ${deps.join(' ')}`,
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
