import { defineConfig } from 'changelogithub'
import { execaCommandSync } from 'execa'
import { readPackageSync } from 'read-pkg'

const { version } = readPackageSync()

const { stdout: tagsResult } = execaCommandSync(
  'git tag --sort=version:refname',
)

const betaReleaseRegexp = /^v.*-beta\.?\d?/
const mainReleaseRegexp = /^v.*(?<!-beta\.?\d?)$/

const isBetaRelease = betaReleaseRegexp.test(`v${version}`)
const isMainRelease = mainReleaseRegexp.test(`v${version}`)

// Tags from most recent -> oldest
const tags = tagsResult.split('\n').reverse()

// prettier-ignore
const from = isMainRelease
  ? tags.find((tag) => mainReleaseRegexp.test(tag) && tag !== `v${version}`)
  : isBetaRelease
    ? tags.find((tag) => (mainReleaseRegexp.test(tag) || betaReleaseRegexp.test(tag) && tag !== `v${version}`))
    : undefined

if (!from) {
  throw new Error('Unable to find previous release.')
}

export default defineConfig({
  /**
   * When pushing a new main release, the `from` should be the last main release tag (and not a beta version)
   * When pushing a new beta release, the `from` should be the last release (beta or main)
   */
  from,
})
