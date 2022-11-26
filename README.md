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

<details>
  <summary>JavaScript et TypeScript (sans framework)</summary>
  
### Base

  ```sh
  # npm, yarn, pnpm
  npm i -D alsacreations-eslint-plugin @rushstack/eslint-patch eslint
  ```

### Avec TS (optionnel)

  ```sh
  # npm, yarn, pnpm
  npm i -D typescript
  ```

### Avec Prettier (optionnel)

  ```sh
  # npm, yarn, pnpm
  npm i -D prettier eslint-plugin-prettier
  ```

</details>

<details>
  <summary>Vue (sans Nuxt)</summary>
  
### Base

  ```sh
  # npm, yarn, pnpm
  npm i -D alsacreations-eslint-plugin @rushstack/eslint-patch eslint-plugin-vue eslint
  ```

### Avec TS (optionnel)

  ```sh
  # npm, yarn, pnpm
  npm i -D @vue/eslint-config-typescript typescript
  ```

### Avec Prettier (optionnel)

  ```sh
  # npm, yarn, pnpm
  npm i -D prettier @vue/eslint-config-prettier
  ```

</details>

<details>
  <summary>Nuxt</summary>
  
### Base

  ```sh
  # npm, yarn, pnpm
  npm i -D alsacreations-eslint-plugin @rushstack/eslint-patch @nuxtjs/eslint-config eslint
  ```

### Avec TS (optionnel)

  ```sh
  # npm, yarn, pnpm
  npm i -D @nuxtjs/eslint-config-typescript && npm uninstall @nuxtjs/eslint-config
  ```

### Avec Prettier (optionnel)

  ```sh
  # npm, yarn, pnpm
  npm i -D prettier @vue/eslint-config-prettier
  ```

</details>

## Configuration

  ```js
  require('@rushstack/eslint-patch/modern-module-resolution')

  /* eslint-env node */
  module.exports = {
    root: true,
    extends: [
      'eslint:recommended',
      // Gère l'ordre de tous les plugins installés
      'alsacreations'
    ],
    parserOptions: {
      ecmaVersion: 'latest'
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
4. Créer une pull request vers la branche `main` de ce repo.

### Conventions git

Utilisation de [conventionnal commits](https://www.conventionalcommits.org/en/v1.0.0/). Depuis ces commits, le changelog de chaque release est automatisé.
