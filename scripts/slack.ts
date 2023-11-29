import { $fetch, FetchError } from 'ofetch'
import { consola } from 'consola'
import { readPackage } from 'read-pkg'
import stripAnsi from 'strip-ansi'

const SLACK_NOTIFICATION_URL = process.env.SLACK_NOTIFICATION_URL

async function start() {
  try {
    if (!SLACK_NOTIFICATION_URL) {
      throw new Error(
        '`SLACK_NOTIFICATION_URL` is not defined as an env variable.',
      )
    }

    const { execaCommand } = await import('execa')

    const { version, name: pkgName } = await readPackage()

    let { stdout: changelog } = await execaCommand(
      'pnpm changelogen --no-output',
    )

    changelog = stripAnsi(changelog)

    const text = changelog
      .trim()
      // Gestion du gras pour Slack
      .replace(/\*\*/gm, '*')
      // Transforme les titres en gras
      .replace(/(#{1,6}) (.+)/g, (_match, _hashes, content) => `*${content}*`)
      // Transforme les liens md pour Slack
      .replace(
        /\[(.*?)\]\((.*?)\)/gm,
        (_match, linkText, url) => `<${url}|${linkText}>`,
      )
      // Supprime les tags <samp> et </samp>
      .replace(/<samp>|<\/samp>/gm, '')

    await $fetch(SLACK_NOTIFICATION_URL, {
      method: 'post',
      body: {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*🎉 ${pkgName} v${version} released !*`,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: text,
            },
          },
        ],
      },
    })
  } catch (error) {
    if (error instanceof FetchError) {
      consola.error(error.data)
    } else {
      consola.error(error)
    }

    process.exit(1)
  }
}

start()
