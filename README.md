Ce repo contient la paquet npm correspondant à la configuration estlint de l'[agence Alsacréations](https://www.alsacreations.fr/).

## Ce qui est inclus

### 🤝 Configurations communes à plusieurs technologies

- Règles communes à JavaScript et Vue/Nuxt

### ⚙️ Configuration Javascript

- Utilisation des règles eslint de base (sans plugin)

### 💪 Configuration TypeScript

- Utilisation du plugin `@typescript-eslint`.
- Utilisation du <span lang="en">parser</span> `@typescript-eslint/parser`.

### 😎 Configuration Vue 3

- Utilisation du plugin `eslint-plugin-vue`
- Utilisation du <span lang="en">parser</span> `vue-eslint-parser` (ne rentre pas en conflit avec TypeScript)

### 💚 Configuration Nuxt

- Utilisation du plugin `@nuxtjs/eslint-plugin`

## Installation

```sh
# npm
npm i -D alsacreations-eslint-plugin
# yarn
yarn add -D alsacreations-eslint-plugin
# pnpm (recommandé)
pnpm add -D alsacreations-eslint-plugin
```

## Utilisation

```js
// .eslintrc.js ou fichier de configuration équivalent
// https://eslint.org/docs/latest/user-guide/configuring/configuration-files

module.exports = {
  // ...,
  extends: [
    'eslint:recommended',
    'alsacreations', // Utilisation de toutes les configurations
    'alsacreations/javascript', // Utilisation de la configuration JavaScript
    'alsacreations/vue', // Utilisation de la configuration Vue
    'alsacreations/typescript', // Utilisation de la configuration TypeScript
    'alsacreations/nuxt', // Utilisation de la configuration Nuxt
  ],
  rules: {
    // Modifier les règles au besoin
  }
}
```

## Développement

1. Forker le projet depuis ce repo.
2. Installer [pnpm](https://pnpm.io/installation) si vous ne l'avez pas déjà.
3. Installer les dépendances dans le projet `pnpm install`

### Créer une nouvelle configuration

1. Créer un sous-dossier `src/le-nom-configuration`
2. Reprendre l'exemple des autres configurations
3. Ajouter votre nouvelle configuration dans le fichier `src/index.ts`
4. Modifier la clé `exports` du fichier `package.json` en reprenant les autres exemples.
5. Créer une pull request vers la branche `main` de ce repo.

### Conventions git

Utilisation de [conventionnal commits](https://www.conventionalcommits.org/en/v1.0.0/). Depuis ces commits, le changelog de chaque release est automatisé.
