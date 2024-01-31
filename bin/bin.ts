#!/usr/bin/env node

import { consola } from 'consola'
import { program } from 'commander'
import { writeFile } from 'fs/promises'
import { getDeps } from '../helpers/deps'
import { getConfigs } from '../helpers/configs'
import { getAnswers } from '../helpers/questions'
import prettier from 'prettier'
import path from 'node:path'
import { codeBlock } from 'common-tags'

program
  .name('eslint-config-alsacreations')
  .description('Bootstrap eslint-config-alsacreations in a project')
  .version('0.1.0')

program
  .command('init')
  .description('Bootstrap eslint-config-alsacreations in a project')
  .action(async () => {
    try {
      const [{ findUp }, { execaCommand }, { default: chalk }] =
        await Promise.all([import('find-up'), import('execa'), import('chalk')])

      const answers = await getAnswers()

      const deps = getDeps(answers)
      const configs = getConfigs(answers)

      let eslintConfigPath = await findUp([
        `.eslintrc.js`,
        `.eslintrc.cjs`,
        `.eslintrc.yaml`,
        `.eslintrc.yml`,
        `.eslintrc.json`,
      ])

      let prettierConfigPath = await findUp([
        `.prettierrc.js`,
        `prettier.config.js`,
        `prettier.config.cjs`,
        `prettier.config.mjs`,
        `.prettierrc.mjs`,
        `.prettierrc.cjs`,
      ])

      if (prettierConfigPath && answers.prettier && answers.astro) {
        consola.box(
          [
            chalk.bold.blue(
              `Please add the following to your Prettier config file:`,
            ),
            chalk.green(
              codeBlock`
            "plugins": ["prettier-plugin-astro"],
            "overrides": [
              {
                "files": "*.astro",
                "options": {
                  "parser": "astro"
                }
              }
            ]`,
            ),
          ].join('\n\n'),
        )

        const confirmed = await consola.prompt('Do you want to continue?', {
          type: 'confirm',
        })

        if (!confirmed) {
          process.exit(0)
        }
      } else if (!prettierConfigPath && answers.prettier) {
        consola.warn(
          'No JavaScript Prettier config file found. Trying to create one...',
        )

        const closestPackageJson = await findUp('package.json')

        if (!closestPackageJson) {
          throw new Error(
            "Couldn't find a package.json file to create default Prettier config",
          )
        }

        const newPrettierConfigPath = path.resolve(
          path.dirname(closestPackageJson),
          '.prettierrc.mjs',
        )

        await writeFile(
          newPrettierConfigPath,
          await prettier.format(
            `
            /** @type {import("prettier").Config} */
            export default {
              'semi': false,
              'singleQuote': true,
              'quoteProps': 'as-needed',
              'trailingComma': 'all',
              'bracketSpacing': true,
              'bracketSameLine': false,
              'arrowParens': 'always',
              'singleAttributePerLine': true,
              'printWidth': 80,
              'jsxSingleQuote': true,
              ${
                answers.astro
                  ? codeBlock`
                plugins: ['prettier-plugin-astro'],
                overrides: [
                  {
                    files: '*.astro',
                    options: {
                      parser: 'astro',
                    },
                  },
                ],`
                  : ``
              }
            }`,
            {
              semi: false,
              parser: 'babel',
              singleQuote: true,
              quoteProps: 'as-needed',
            },
          ),
        )

        consola.success('Successfully created Prettier config file')

        prettierConfigPath = newPrettierConfigPath
      }

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
          '.eslintrc.cjs',
        )

        await writeFile(
          newEslintConfigPath,
          await prettier.format(
            `
          require('@rushstack/eslint-patch/modern-module-resolution')

          module.exports = {
            root: true,
            extends: ${JSON.stringify(configs)},
          }`,
            {
              semi: false,
              parser: 'babel',
              singleQuote: true,
              quoteProps: 'as-needed',
            },
          ),
        )

        consola.success('Successfully created ESLint config file')
      }

      if (
        eslintConfigPath &&
        (eslintConfigPath.endsWith('.js') || eslintConfigPath.endsWith('.cjs'))
      ) {
        consola.box(
          chalk.bold.blue(
            `Please add the following line at the top of your ESLint config file:`,
          ),
          chalk.green(
            codeBlock`require('@rushstack/eslint-patch/modern-module-resolution')`,
          ),
        )

        const confirmed = await consola.prompt('Do you want to continue?', {
          type: 'confirm',
        })

        if (!confirmed) {
          process.exit(0)
        }

        consola.box(
          [
            chalk.bold.blue(
              `Please add the following configuration to your ESLint config file:`,
            ),
            '\n\n',
            chalk.green(codeBlock`extends: ${JSON.stringify(configs)}`),
          ].join(''),
        )

        const confirmed2 = await consola.prompt('Do you want to continue?', {
          type: 'confirm',
        })

        if (!confirmed2) {
          process.exit(0)
        }
      } else if (
        eslintConfigPath &&
        (eslintConfigPath.endsWith('.yaml') ||
          eslintConfigPath.endsWith('.yml') ||
          eslintConfigPath.endsWith('.json'))
      ) {
        throw new Error(
          `ESLint config file is not a JavaScript file. JSON and YAML files are not supported.`,
        )
      }

      try {
        const installCommands = {
          npm: `npm install -D ${deps.join(' ')}`,
          yarn: `yarn add -D ${deps.join(' ')}`,
          pnpm: `pnpm add -D ${deps.join(' ')}`,
          bun: `bun add -D ${deps.join(' ')}`,
        }

        const packageManager = await consola.prompt(
          'What is your package manager?',
          {
            type: 'select',
            options: [
              'npm',
              'yarn',
              'pnpm',
              'bun',
            ] satisfies (keyof typeof installCommands)[],
          },
        )

        const execaRes = execaCommand(installCommands[packageManager], {
          env: { FORCE_COLOR: 'true' },
          stdio: 'inherit',
        })

        await execaRes

        consola.success('Installation successful!')
      } catch (error) {
        throw new Error(
          `Failed to install packages, please install the following dependencies manually: ${chalk.bold.green(
            deps.join(' '),
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
