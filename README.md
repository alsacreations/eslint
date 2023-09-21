Ce repo contient le paquet npm correspondant à la configuration ESLint de l'[agence Alsacréations](https://www.alsacreations.fr/).

## Ce qui est inclus

### 🤝 Configurations communes à plusieurs technologies

- Règles communes à JavaScript et Vue/Nuxt

### ⚙️ Configuration Javascript

- Utilisation des règles ESLint de base (sans plugin)

### 💪 Configuration TypeScript

- Utilisation du plugin `@typescript-eslint`.
- Utilisation du <span lang="en">parser</span> `@typescript-eslint/parser`.

### 😎 Configuration Vue 3

- Utilisation du plugin `eslint-plugin-vue`
- Utilisation du <span lang="en">parser</span> `vue-eslint-parser` (ne rentre pas en conflit avec TypeScript)

### 💚 Configuration Nuxt

- Utilisation du plugin `@nuxtjs/eslint-plugin`

## Installation automatique

```sh
# npm, yarn, pnpm
# Si besoin au préalable pnpm init (pour disposer d'un fichier package.json)
npx eslint-config-alsacreations@latest init
```

## Installation manuelle

<details>
  <summary>JavaScript et TypeScript (sans framework)</summary>

### Base

```sh
# npm, yarn, pnpm
npm i --save-dev eslint-config-alsacreations @rushstack/eslint-patch eslint
```

### Avec TS (optionnel)

```sh
# npm, yarn, pnpm
npm i --save-dev typescript
```

### Avec Prettier (optionnel)

```sh
# npm, yarn, pnpm
npm i --save-dev prettier eslint-config-prettier
```

</details>

<details>
  <summary>Vue (sans Nuxt)</summary>
  
### Base

```sh
# npm, yarn, pnpm
npm i --save-dev eslint-config-alsacreations @rushstack/eslint-patch eslint-plugin-vue eslint
```

### Avec TS (optionnel)

```sh
# npm, yarn, pnpm
npm i --save-dev @vue/eslint-config-typescript typescript
```

### Avec Prettier (optionnel)

```sh
# npm, yarn, pnpm
npm i --save-dev prettier @vue/eslint-config-prettier
```

</details>

<details>
  <summary>Nuxt</summary>
  
### Base

```sh
# npm, yarn, pnpm
npm i --save-dev eslint-config-alsacreations @rushstack/eslint-patch @nuxtjs/eslint-config eslint
```

### Avec TS (optionnel)

```sh
# npm, yarn, pnpm
npm i --save-dev @nuxtjs/eslint-config-typescript && npm uninstall @nuxtjs/eslint-config
```

### Avec Prettier (optionnel)

```sh
# npm, yarn, pnpm
npm i --save-dev prettier @vue/eslint-config-prettier
```

</details>

### Configuration

Puis ajouter un fichier de configuration à la racine `.eslintrc.js` ou équivalent.

```js
require('@rushstack/eslint-patch/modern-module-resolution')

/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',

    'alsacreations/javascript',

    // /!\ Ne choisir que l'un ou l'autre
    'alsacreations/nuxt', // Nuxt tout seul
    'alsacreations/vue', // Vue tout seul

    // /!\ Ne choisir que l'un ou l'autre
    // /!\ Ne pas choisir 'alsacreations/nuxt' ni 'alsacreations/vue'
    'alsacreations/nuxt-typescript', // Nuxt + TS
    'alsacreations/vue-typescript', // Vue + TS

    // /!\ Ne pas choisir si 'alsacreations/nuxt-typescript' ou 'alsacreations/vue-typescript' sont utilisés
    'alsacreations/typescript', // TS tout seul

    // /!\ Ne choisir que l'un ou l'autre
    'alsacreations/prettier', // Prettier tout seul
    'alsacreations/prettier-vue', // Vue + Prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
```

## Développement

1. Forker le projet depuis ce repo.
2. Installer [pnpm](https://pnpm.io/installation) si vous ne l'avez pas déjà.
3. Installer les dépendances dans le projet `pnpm install`.

### Créer une nouvelle configuration

1. Créer un sous-dossier `src/le-nom-configuration`.
2. Reprendre l'exemple des autres configurations.
3. Ajouter votre nouvelle configuration dans le fichier `src/index.ts`.
4. Créer une pull request vers la branche `main` de ce repo.

### Conventions git

Utilisation de [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). Depuis ces commits, le changelog de chaque release est automatisé.
