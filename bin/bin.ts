#!/usr/bin/env node

import * as t from '@babel/types'
import traverse from '@babel/traverse'
import generator from '@babel/generator'
import * as parser from '@babel/parser'
import { consola } from 'consola'
import { program } from 'commander'
import { mergeWith, isArray } from 'lodash'
import { readFile, writeFile } from 'fs/promises'
import { getDeps } from '../helpers/deps'
import { getConfigs } from '../helpers/configs'
import type { ProgramAnswers } from '../helpers/questions'
import { questions } from '../helpers/questions'
import YAML from 'yaml'
import prettier from 'prettier'
import type { JsonObject } from 'type-fest'
import path from 'node:path'

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

      let eslintConfigPath = await findUp([
        `.eslintrc.js`,
        `.eslintrc.cjs`,
        `.eslintrc.yaml`,
        `.eslintrc.yml`,
        `.eslintrc.json`,
      ])

      if (!eslintConfigPath) {
        consola.warn('No ESLint config file found. Trying to create one...')

        const closestPackageJson = await findUp('package.json')

        if (!closestPackageJson) {
          throw new Error(
            "Couldn't find a package.json file to create default ESLint config",
          )
        }

        const newEslintConfigPath = path.resolve(
          path.dirname(closestPackageJson),
          '.eslintrc.js',
        )

        await writeFile(newEslintConfigPath, `module.exports = { root: true }`)

        consola.success('Successfully created ESLint config file')

        eslintConfigPath = newEslintConfigPath
      }

      const isYml =
        eslintConfigPath.endsWith('.yaml') || eslintConfigPath.endsWith('.yml')
      const isJson = eslintConfigPath.endsWith('.json')
      const isJs =
        eslintConfigPath.endsWith('.js') || eslintConfigPath.endsWith('.cjs')

      if (isJs) {
        const originalCode = (await readFile(eslintConfigPath)).toString()

        const ast = parser.parse(originalCode, {
          sourceType: 'module', // Specify the source type (e.g., 'module' or 'script')
        })

        let extendsArrayNode: null | t.ArrayExpression = null
        let extendsPropertyNode = null

        let hasRequiredModule = false

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
                const exists =
                  !t.isSpreadElement(property) &&
                  !t.isObjectMethod(property) &&
                  t.isArrayExpression(property.value) &&
                  (t.isIdentifier(property.key, { name: 'extends' }) ||
                    t.isStringLiteral(property.key, { value: 'extends' }))

                if (exists) {
                  extendsArrayNode = property.value as t.ArrayExpression
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
          ExpressionStatement(path) {
            // Check if it's a standalone `require` statement
            if (
              t.isCallExpression(path.node.expression) &&
              t.isIdentifier(path.node.expression.callee, {
                name: 'require',
              }) &&
              path.node.expression.arguments.length === 1 &&
              t.isStringLiteral(path.node.expression.arguments[0], {
                value: '@rushstack/eslint-patch/modern-module-resolution',
              })
            ) {
              hasRequiredModule = true
            }
          },
        })

        if (!hasRequiredModule) {
          const requireStatement = t.expressionStatement(
            t.callExpression(t.identifier('require'), [
              t.stringLiteral(
                '@rushstack/eslint-patch/modern-module-resolution',
              ),
            ]),
          )

          // Find the first non-import declaration and insert the `require` statement before it
          let insertionIndex = 0

          for (const node of ast.program.body) {
            if (!t.isImportDeclaration(node)) {
              break
            }

            insertionIndex++
          }

          ast.program.body.splice(insertionIndex, 0, requireStatement)
        }

        const modifiedCode = generator(ast).code

        await writeFile(
          eslintConfigPath,
          await prettier.format(modifiedCode, {
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
          : isYml
            ? YAML.parse(currentConfigRaw)
            : undefined

        if (!currentConfig) {
          throw new Error('Failed to parse ESLint config file.')
        }

        const modifiedConfig = mergeWith(
          currentConfig,
          {
            extends: configs,
          },
          (objValue, srcValue) => {
            if (isArray(objValue)) {
              return objValue.concat(srcValue)
            }
          },
        )

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
          { env: { FORCE_COLOR: 'true' }, stdio: 'inherit' },
        )

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
