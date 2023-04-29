---
title: 'Nullstack Instances: Bom código melhorando o próprio futuro'
date: '2021-03-18'
blog: true
excerpt: 'Como código bem desenvolvido pode permitir a implementação de novos recursos e manutenção futura até por novatos no projeto.'
Image:
  {
    alt: 'Banner contendo código embaçado ao fundo, logotipo do framework Javascript Nullstack e sua mascote, Nulla-chan, dizendo olá',
    url: 'https://ik.imagekit.io/GuiDevloper/guiwriter/tech/nullstack-instances.jpg',
    description: "Mascote Nulla-chan criada por <a href='https://artstation.com/biancazanette' target='_blank' rel='nofollow noopener noreferrer'>Bianca Zanette (Bilkaya)</a>",
    full: true
  }
description: 'Como código bem desenvolvido pode permitir a implementação de novos recursos e manutenção futura até por novatos no projeto'
image: 'https://ik.imagekit.io/GuiDevloper/guiwriter/tech/nullstack-instances.jpg'
thumbnail: 'https://ik.imagekit.io/GuiDevloper/guiwriter/tech/thumbnails/nullstack-instances.jpg?updatedAt=1682528276671'
permalink: /tech/nullstack-instances
tags:
  - 'nullstack'
  - 'open-source'
---

# Nullstack Instances: Bom código melhorando o próprio futuro

> - Índice
>   [[toc]]

Já tendo desenvolvido projetos com linguagens como Java, PHP e C# e frameworks como Angular, sempre expresso o quanto busco por ferramentas otimizadas, seja na parte do desenvolvedor ou na do usuário final.

E minha mais recente descoberta que supre tal busca é o framework brasileiro Nullstack.

Se dê um tempo para imaginar isso:

> Um framework que te permite escrever em Javascript puro e manipular desde a estrutura do banco de dados até a renderização no browser, em um único componente, se preferir.

Tome o tempo que precisar para sonhar com isso e imagine o poder que teria se fosse possível, espera, e se já for?

## O Primeiro Passo - Receio

Desde o começo, vendo em um post em grupo de desenvolvedores eu estranhei a ideia.
Foi apenas estudando a documentação, conhecendo seus recursos, objetivos e histórico dos autores que enxerguei a importância de seu conceito.

A vida toda de desenvolvedor é comumente condicionada à títulos como [_front_ e _back-end_](https://pt.wikipedia.org/wiki/Front-end_e_back-end), quais tem uma gama própria de ferramentas cada, necessidade de buscar as melhores para o caso atual e de aprendê-las.

É visto casos onde o tempo usado para terminar estes passos iniciais e baixar pacotes para o desenvolvimento, ser o suficiente para termos usuários de projeto desenvolvido em Nullstack satisfeitos.

Pontos como esses que me fizeram até mergulhar na base de código do framework, algo que mesmo nunca tendo feito com outra ferramenta, me surpreendeu por consistir em simplesmente ler o bom e velho JS puro e bem escrito.

Logo me vi perder o receio de até mesmo implementar novos recursos.

## O Segundo Passo - Evolução

Um dos recursos mais interessantes que vi que seria ótimo implementar foi o apelidado Instances, qual consiste em tornar acessível ao desenvolvedor uma lista de todas as instâncias ativas da aplicação, incluindo seus dados e funções.

Usei o conhecimento dos primeiros dias de estudo da base de código para gerar a primeira iteração da funcionalidade:

A base deste recurso pensei que seria melhor desacoplada usando a [API de plugins de elementos](https://github.com/nullstack/nullstack/issues/19), qual consiste em percorrer cada _node_ do _template_ e modificar ou utilizar seus dados, e também era um recurso interno até esta minha [Pull Request](https://docs.github.com/pt/github/collaborating-with-issues-and-pull-requests/about-pull-requests): [nullstack#35](https://github.com/nullstack/nullstack/pull/35).

```jsx
// função transformadora da antiga API de plugin de elementos
transform({node, depth, scope}) {
  // se não havia armazenado a instância
  if (!scope.context.instances[node.type.name]) {
    // cria nova manualmente
    const instance = new node.type(scope);
    // armazena no context
    scope.context.instances[node.type.name] = instance;
  } else {
    // tendo armazenado, apenas guarda nas instâncias globais
    // utilizando a chave (key) da instância
    const key = node.attributes.key || generateKey(depth);
    scope.instances[key] = scope.context.instances[node.type.name];
  }
}
```

Já aqui temos coisas interessantes rolando simplificadamente, como o uso da [chave da instância](https://nullstack.app/pt-br/instancia-key) e armazenamento de `instances` no objeto `context` que é um dos conceitos base tendo uma seção dedicada na documentação: [Contexto](https://nullstack.app/pt-br/contexto).

Sendo direto e inspirado como um código escrito em Nullstack, o `scope` é o escopo interno do framework armazenando tudo necessário, desde `manifest` até cabeçalhos do projeto e requisições, gerando uma estrutura chamada `context` (ambos em server e client).

O `context` é o derivado do `scope` que fica disponível para o desenvolvedor, possibilitando manipulação de informações do [projeto](https://nullstack.app/pt-br/contexto-project), [página](https://nullstack.app/pt-br/contexto-page) e [segredos](https://nullstack.app/pt-br/contexto-secrets) (como acesso à uma base de dados).

Assim, minha ideia foi seguir com esse armazenamento alimentado pelo plugin no `context` interno:

```jsx
// construtor de cada componente
constructor(scope) {
  // ... // se não havia armazenado
  if (!scope.context.instances[name]) {
    // ... // cria proxy da instância atual
    const proxy = new Proxy(this, instanceProxyHandler);
    // ... // retorna proxy da instância
    return proxy;
  }
  // retorna proxy anteriormente criado
  return scope.context.instances[name];
}
```

E, com o _review_ e os _insights_ dos membros chegamos na mais otimizada iteração, repensando praticamente tudo da primeira e suprindo client e server da forma mais minimalista:

```jsx{2}
// client/client.js
client.instances = {};
context.instances = client.instances;
```

Já estamos prontos no client. Vamos pra próxima...<br>
O quê? Tá estranhando? Também estranhei e inicialmente neguei tal solução, mas é simples, uma das principais magias do Nullstack vem de transformar tudo em proxies.

Em outras palavras, está sendo disponibilizada a **referência** de `instances` para o `context`, qual estará sempre sincronizada e permite manipulação.

Assim, a implementação no server não tem mistério:

```jsx{3}
// server/prerender.js
const scope = {};
scope.instances = {};
context.instances = scope.instances;
```

E então, com esses ajustes suportados pelo código bem desacoplado, conseguimos tal recurso como o desse exemplo no [gatilho de ciclo de vida `initiate`](https://nullstack.app/pt-br/ciclo-de-vida-full-stack#initiate):

```jsx
async initiate({ instances })  {
  // supondo um componente com key="counter"
  const { counter } = instances;
  // modifica uma variável do componente como se fosse local
  counter.count++;
  counter.showCount = true; // até atribui valor

  // e, por que não, acionar um método de
  // armazenamento assíncrono do valor dele daqui
  await counter.saveCount();
}
```

No fim, assim como o próprio recurso evoluiu usufruindo da simplicidade e otimização qual é escrita a base da ferramenta, meu conhecimento e fluídez evoluiu ao, por exemplo, ser desafiado em ambiente até então desconhecido.

## Próximo Passo - Eterno Aprendizado

Este texto representa o sucesso da primeira tentativa de expressar minha experiência em projetos tão interessantes de código-aberto.

E apenas um exemplo de conhecimento trabalhado em uma vida de Constante/Eterno Aprendizado, onde se começa com um Java e veja só onde podemos chegar!

Qual será o próximo recurso implementado em um projeto de código-aberto?<br>
Que tal você que lê este texto participar de seu desenvolvimento e me contar?

Desejo o melhor!<br>
Até a próxima!

Links úteis:

- [Documentação em português do Nullstack](https://nullstack.app/pt-br)
- [Organização Nullstack no Github](https://github.com/nullstack)
- [Minha árvore de links](https://beacons.ai/GuiDevloper)
