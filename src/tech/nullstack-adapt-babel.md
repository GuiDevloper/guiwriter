---
title: 'Nullstack + Babel: Renovando o antigo compilador'
date: '2023-08-19'
blog: true
excerpt: 'Projeto que renova o antigo compilador do Nullstack em Babel e traz de volta seu dourado sistema de plugins/presets.'
Image:
  {
    alt: 'Banner contendo o logotipo do Nullstack, do TypeScript e do Babel e a mascote do Nullstack, Nulla-chan, feliz por você estar lendo este post',
    url: 'https://ik.imagekit.io/GuiDevloper/guiwriter/tech/nullstack-adapt-babel.jpg',
    description: "Mascote Nulla-chan criada por <a href='https://artstation.com/biancazanette' target='_blank' rel='nofollow noopener noreferrer'>Bianca Zanette (Bilkaya)</a>",
    full: true
  }
description: 'Projeto que renova o antigo compilador do Nullstack em Babel e traz de volta seu dourado sistema de plugins/presets'
image: 'https://ik.imagekit.io/GuiDevloper/guiwriter/tech/nullstack-adapt-babel.jpg'
thumbnail: 'https://ik.imagekit.io/GuiDevloper/guiwriter/tech/thumbnails/nullstack-adapt-babel.jpg?updatedAt=1692402060874'
permalink: /tech/nullstack-adapt-babel
tags:
  - 'nullstack'
  - 'open-source'
---

# Nullstack + Babel: Renovando o antigo compilador

> - Índice
>   [[toc]]

[Babel](https://babeljs.io/) esteve presente desde os primórdios da web moderna traduzindo sintaxes diversas do JavaScript, como de versões novas (ex: ES2020), para aquela padronizada e suportada pelo maior número de navegadores (ex: ES5). E até hoje isso tem espaço respeitado nas propostas da própria linguagem do JS (ex: [do expressions](https://babeljs.io/docs/babel-plugin-proposal-do-expressions)).

Sendo tão salvador, pode-se imaginar que existiram fortes razões para propor a implementação do novo compilador [SWC](https://swc.rs) no Nullstack. E sim, como eu mesmo fui o principal idealizador disso, posso afirmar: De performance e leveza à simplicidade de algo baseado em [Rust](https://rust-lang.org/pt-BR/), projetos como SWC representam uma grande mudança em como se desenvolve a web.

"Então se o SWC muda a web e virou o compilador padrão, por que voltar? Se decida!"
Ok! Leia mais sobre as razões do `nullstack-adapt-babel` existir na seção [Propósito](#proposito).

> ✨ A documentação a seguir é uma tradução do [README do projeto](https://github.com/GuiDevloper/nullstack-adapters/blob/main/nullstack-adapt-babel/README.md)

O `nullstack-adapt-babel` substitue totalmente o compilador do Nullstack (atualmente [SWC](https://swc.rs/) + [swc-plugin-nullstack](https://github.com/nullstack/swc-plugin-nullstack)) pelo Babel e seu dourado/antigo sistema de [plugins](https://babeljs.io/docs/plugins)/[presets](https://babeljs.io/docs/presets).

## Como usar

Este script pode ser usado de duas maneiras:

- No modo "automático" você só precisa usar com [`npx`](https://docs.npmjs.com/cli/v9/commands/npx) antes de seus scripts Nullstack, como:

```json
"scripts": {
  "start": "npx nullstack-adapt-babel && nullstack start",
  "build": "npx nullstack-adapt-babel && nullstack build"
}
```

> Isso imediatamente faz [essas coisas](#o-que-isso-faz-em-detalhes) que podem ser totalmente desativadas [dessas maneiras](#como-desativar-toda-a-magica)

- No modo "manual" você o usa como uma função que altera a [Configuração do Webpack](https://nullstack.app/pt-br/como-customizar-webpack):

```js
// webpack.config.js
const useBabel = require('nullstack-adapt-babel')
const configs = require('nullstack/webpack.config')

module.exports = useBabel(configs)
```

> No modo manual você pode [configurar o Babel com plugins/presets](#como-usar-plugins-presets)

## O que isso faz em detalhes

#### Quando usado no modo automático com `npx`:

Procura o **nullstack/webpack.config.js** original e substitui o seu `module.exports` da seguinte forma:

```diff
- module.exports = [server, client]
+ module.exports = require('/full/path/to/nullstack-adapt-babel')([server, client])
```

Fazendo este pacote ser chamado diretamente a cada execução do Nullstack, atualizando a configuração do Webpack em sua fonte, então tudo é feito exatamente como no modo manual.

#### Quando usado no modo manual com **webpack.config.js** customizado:

Procura o carregador (*loader* do Webpack) do compilador original e faz com que ele nunca seja executado:

```diff
- function swc(options, other) {
+ function swc(options, other) {return {};
```

> Isso é obrigatório para um ambiente como [StackBlitz](https://stackblitz.com/) que não suporta nem a menção do SWC

- Verifica se [deve ficar desabilitado](#como-desativar-toda-a-magica) retornando a configuração original se verdadeiro

- Substitui a chave `optimization` original para usar [esbuild](https://esbuild.github.io/) em produção (veja sua configuração [aqui](https://github.com/GuiDevloper/nullstack-adapters/blob/main/nullstack-adapt-babel/src/utils/optimization.js))

- Recria o array `module.rules` mantendo os carregadores necessários e adicionando os relacionados ao Babel

> 💡 Quer mergulhar no código? Tudo começa [aqui](https://github.com/GuiDevloper/nullstack-adapters/blob/main/nullstack-adapt-babel/src/index.ts)

## Como desativar toda a mágica

A cada execução isso procura por uma chave `NULLSTACK_DEFAULT_CONFIG` em seu **.env**, como:

```properties
NULLSTACK_DEFAULT_CONFIG=true
```

Usando se existir, caso contrário, procura pelo mesmo em uma chave `nullstack-adapt-babel` em seu **package.json**:

```json
"nullstack-adapt-babel": {
  "NULLSTACK_DEFAULT_CONFIG": true
}
```

Usar esse valor desfará tudo e deixará que o Nullstack funcione com seu compilador padrão.

## Como usar plugins/presets

Opções customizadas podem ser passadas no 2º argumento da função, permitindo configurar seus próprios plugins/presets:

```js
// webpack.config.js
const useBabel = require('nullstack-adapt-babel')
const configs = require('nullstack/webpack.config')

module.exports = useBabel(configs, {
  babel: {
    plugins: [
      ['babel-plugin-transform-remove-console', { exclude: ['info'] }],
      '@babel/plugin-proposal-throw-expressions'
    ],
    presets: [['@babel/preset-flow', { allowDeclareFields: true }]]
  }
})
```

> Atualmente, os plugins/presets customizados são apenas anexados ao original

> Atualmente, o nosso `@babel/parser` apenas suporta os plugins `doExpressions` e `throwExpressions`, como escrito [aqui](https://github.com/GuiDevloper/nullstack-adapters/blob/main/nullstack-adapt-babel/src/loaders/merged/merged-utils.ts#L94), contribua com esse arquivo se desejar adicionar mais opções!

## Propósito

Alguém pode perguntar _"Nullstack tendo um compilador SWC rápido, por que alguém voltaria ao ~~futuro~~ passado?", e compreensível, tipo, eu mesmo estou me perguntando isso agora finalmente documentando tudo isso 😅

> Não apenas rápido, a beleza daquilo até me seduziu a aprender um pouco de [Rust](https://rust-lang.org/pt-BR) e contribuir com nosso [próprio plugin do SWC](https://github.com/nullstack/swc-plugin-nullstack) ⚡

Então, sim, há algum raciocínio em trazer de volta os dias de Babel, além de dar a liberdade dos plugins/presets para o usuário e gostar de experimentos, queríamos usar uma plataforma como [StackBlitz](https://stackblitz.com/) que atualmente não suporta os binários do SWC.

Então este pacote possibilita projetos como estes:

## Projetos de exemplo

- [Nullstack New](https://github.com/GuiDevloper/nullstack-new): Execute um template Nullstack com um link ✨🚀
- [Nullstack Examples](https://github.com/GuiDevloper/nullstack-examples): Alguns exemplos no framework Nullstack facilmente visualizados no [StackBlitz](https://stackblitz.com/)
