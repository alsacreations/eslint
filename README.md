Ce repo contient le paquet npm correspondant à la configuration ESLint & Prettier de l'[agence Alsacréations](https://www.alsacreations.fr/).

## Ce qui est inclus

### 🤝 Configurations communes à plusieurs technologies

- Règles communes à JavaScript et Vue

### ⚙️ Configuration JavaScript

- Utilisation des règles ESLint de base (sans plugin)

### 💪 Configuration TypeScript

- Utilisation du plugin `@typescript-eslint`.
- Utilisation du <span lang="en">parser</span> `@typescript-eslint/parser`.

### 😎 Configuration Solid

- Utilisation du plugin `eslint-plugin-solid`

### 😎 Configuration Vue 3

- Utilisation du plugin `eslint-plugin-vue`

### 🚀 Configuration Prettier avec option pour Astro

- Utilisation du plugin `prettier-plugin-astro`

## Installation automatique

```sh
# npm, yarn, pnpm
# Si besoin au préalable pnpm init (pour disposer d'un fichier package.json)
npx eslint-config-alsacreations@latest init
# pnpm dlx eslint-config-alsacreations@latest init
```

### Configuration

Puis ajouter un fichier de configuration à la racine `.eslintrc.js` ou équivalent.

```ts
import js from 'eslint-config-alsacreations/configs/javascript'
import ts from 'eslint-config-alsacreations/configs/typescript'
import vue from 'eslint-config-alsacreations/configs/vue'
import solid from 'eslint-config-alsacreations/configs/solid'
import solidTs from 'eslint-config-alsacreations/configs/solid-typescript'
import prettier from 'eslint-config-alsacreations/configs/prettier'

export default [
    js,
    vue,

    // /!\ Ne choisir que l'un ou l'autre
    solid,
    solidTs,

    ts,
    prettier
]
```

## Développement

1. Forker le projet depuis ce repo.
2. Installer [pnpm](https://pnpm.io/installation) si vous ne l'avez pas déjà.
3. Installer les dépendances dans le projet `pnpm install`.

### Conventions git

Utilisation de [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). Depuis ces commits, le changelog de chaque release est automatisé.

### Déployer une nouvelle version

1. Se connecter à Github via la ligne de commande `gh auth login`.
2. Lancer la commande `pnpm run release` à la racine du projet.
