require('@rushstack/eslint-patch/modern-module-resolution')

/* eslint-env node */
module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',

    // Les configurations `alsacreations/*` prennent le pas sur les autres
    'alsacreations/javascript',
    'alsacreations/typescript',

    // Ce qui touche à prettier devrait toujours être en dernier
    // La configuration `alsacreations/prettier` **doit** être la dernière.
    'alsacreations/prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
