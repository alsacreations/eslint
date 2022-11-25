require('@rushstack/eslint-patch/modern-module-resolution')

/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@nuxtjs',

    // Les configurations `alsacreations/*` prennent le pas sur les autres
    'alsacreations/javascript',
    'alsacreations/nuxt',
    'alsacreations/typescript',

    // Ce qui touche à prettier devrait toujours être en dernier
    // La configuration `alsacreations/prettier` **doit** être la dernière.
    '@vue/eslint-config-prettier',
    'alsacreations/prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
