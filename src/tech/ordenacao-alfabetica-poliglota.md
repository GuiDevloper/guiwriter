---
title: 'Ordenação Alfabética de Forma Poliglota'
date: '2025-02-20'
blog: true
excerpt: 'Colocar lista de palavras em ordem é tarefa simples e também um bom exemplo para comparar linguagens de programação como C#, Python e JS seja para poliglota iniciante ou experiente 🌎'
Image:
  {
    alt: 'Banner escrito: Ordenação Alfabética de Forma Poliglota - Colocar lista de palavras em ordem é tarefa simples e também um bom exemplo para comparar linguagens de programação como C#, Python e JS seja para poliglota iniciante ou experiente 🌎',
    url: '/images/ordenacao-alfabetica-poliglota.webp',
    full: false
  }
description: 'Colocar lista de palavras em ordem é tarefa simples e também um bom exemplo para comparar linguagens de programação como C#, Python e JS seja para poliglota iniciante ou experiente 🌎'
image: '/images/ordenacao-alfabetica-poliglota.webp'
thumbnail: '/images/thumbs/ordenacao-alfabetica-poliglota.webp'
permalink: /tech/ordenacao-alfabetica-poliglota
tags:
  - 'tutorial'
---

# Ordenação Alfabética de Forma Poliglota

Olá e boas vindas!

Mesmo parecendo uma tarefa simples, ordenar alfabeticamente um array em linguagens de programação traz uma oportunidade de vislumbrar suas semelhanças e como elas funcionam internamente, algo interessante para aprendizes e experientes!

Listei aqui o código e um pouco sobre a implementação das linguagens [C#](https://pt.wikipedia.org/wiki/C_Sharp), [JS](https://pt.wikipedia.org/wiki/JavaScript) e [Python](https://pt.wikipedia.org/wiki/Python) (lista podendo aumentar futuramente).

Em cada linguagem usei 100 mil palavras embaralhadas e uma função de [_benchmark_](https://pt.wikipedia.org/wiki/Benchmark_(computa%C3%A7%C3%A3o)) para comparar os métodos usados (resultados dependem do ambiente)!

## Quando usar?

### Indicado

Uma ordenação direto no código tem seus casos de uso, ex: dicionários e uma listagem de usuários/tarefas em ambiente sem banco de dados, como consumindo um JSON.

> 💡 Usei nos simples [dicionários](/dict) daqui, veja a escrita de um [aqui](https://github.com/GuiDevloper/guiwriter/blob/628f5e572493ffb1199aa8679a87730d5457ab12/src/dict/dicionario-hardware.md?plain=1#L31)

### Contraindicado

Vale deixar registrado que enquanto pode ser algo rápido e funcional, raramente uma ordenação via código será recomendada em aplicações do mundo real.

Nessas temos um grande fluxo de dados e um banco de dados bem estruturado sendo perfeito para armazená-los ao lado de funções de ordenação performáticas!

## C Sharp

O algoritmo interno de ordenação do C# é o [IntroSort](https://pt.wikipedia.org/wiki/Intro_sort), ou seja, por debaixo dos panos este será aplicado no array ao usar o padrão [`Array.Sort()`](https://learn.microsoft.com/pt-br/dotnet/api/system.array.sort).

E como esta ordenação se baseia no [Unicode](https://pt.wikipedia.org/wiki/Unicode) da string, dando valores distantes para a mesma letra maiúscula ou com acentos, para funcionar alfabeticamente é necessário usar o [`StringComparer`](https://learn.microsoft.com/pt-br/dotnet/api/system.stringcomparer) configurado com nosso idioma específico:

```csharp
using System;
using System.Diagnostics; // benchmark
using System.Globalization; // CultureInfo
using System.Linq; // Enumerable/OrderBy

class Program
{
  static void Main()
  {
    string[] palavras = {
      "árvore", "éter", "coração", "zebra", "banana", "ônibus", "elefante", "fácil", "cálculo", "máquina"
    };

    // Essas 10 palavras x 10k pra virar 100k e usar em benchmark
    palavras = Enumerable.Repeat(palavras, 10000).SelectMany(x => x).ToArray();
    Random rand = new Random();
    // Embaralhando
    palavras = palavras.OrderBy(x => rand.Next()).ToArray();

    // Deixando array original intacto
    var palavrasClone = (string[])palavras.Clone();
    // Inicia benchmark
    var sw = Stopwatch.StartNew();
    // Teste 1: Ordenação padrão
    Array.Sort(palavrasClone);
    sw.Stop();
    // Exibe o tempo que passou em milissegundos
    Console.WriteLine($"Ordenação padrão: {sw.ElapsedMilliseconds} ms");

    palavrasClone = (string[])palavras.Clone();
    sw.Restart();
    // Teste 2: Usando comparador de String configurado pra pt-BR
    Array.Sort(palavrasClone, StringComparer.Create(new CultureInfo("pt-BR"), true));
    sw.Stop();
    Console.WriteLine($"Ordenação localizada: {sw.ElapsedMilliseconds} ms");
  }
}
```

Resultado no terminal:

```sh
> Ordenação localizada: 162 ms
> Ordenação padrão: 162 ms
```

> 💡 No [`CultureInfo()`](https://learn.microsoft.com/pt-br/dotnet/api/system.globalization.cultureinfo) poderia ser usado facilmente outro código de idioma, como `en-US`, eis outro lado do poliglota no título :\)

## JavaScript

O algoritmo interno do JS é o mais curioso, pois enquanto o [V8](https://pt.wikipedia.org/wiki/V8_(JavaScript)) usado no [Node.js](https://pt.wikipedia.org/wiki/Node.js) usa o [TimSort](https://pt.wikipedia.org/wiki/Timsort) este JavaScript executado nos navegadores depende totalmente de qual implementação da [especificação](https://262.ecma-international.org/11.0/#sec-array.prototype.sort) foi escrita neles, pois a linguagem a usará!

No Chrome e Safari é usado o TimSort, mas o Firefox usa o [QuickSort](https://pt.wikipedia.org/wiki/Quicksort), o que gera uma diferença na performance do mesmo código!

Para ir além da padrão que usa Unicode ao invés do alfabeto, usamos o [`String.localeCompare()`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare), como a seguir:

```js
const palavras = [
  "árvore", "Éter", "coração", "zebra", "banana", "ônibus", "elefante", "fácil", "cálculo", "máquina"
];

// Essas 10 palavras x 10k pra virar 100k e usar em benchmark
const muitasPalavras = palavras
  .map(palavra => Array(10000).fill(palavra))
  .flat()
  .sort(() => Math.random() - 0.5); // Embaralhando

// Função para medir o tempo de execução
function medirTempo(funcao, descricao) {
  const start = performance.now();
  funcao();
  const end = performance.now();
  console.log(`${descricao}: ${end - start}ms`);
}

// Teste 1
medirTempo(() => {
  muitasPalavras.sort();
}, 'Ordenação padrão');

// Teste 2
medirTempo(() => {
  muitasPalavras.sort((a, b) => a.localeCompare(b, 'pt-BR'));
}, 'Ordenação localizada');
```

Resultado no Terminal:

```sh
Ordenação padrão: 20ms
Ordenação localizada: 32ms
```

## Python

O [Tim Peters](https://en.wikipedia.org/wiki/Tim_Peters_(software_engineer)), criador do TimSort (e de nada mais nada menos que o [_Zen of Python_](https://pt.wikipedia.org/wiki/Zen_de_Python)), contribuiu muito com o Python desde sua implementação original, então é natural este ser o algoritmo padrão no [`sorted()`](https://docs.python.org/pt-br/3.13/howto/sorting.html).

Porém, como nas outras linguagens, a ordenação padrão usa a tabela Unicode ao invés do alfabeto, nos obrigando a ir mais além configurando um [`locale.setlocale()`](https://docs.python.org/pt-br/3.8/library/locale.html#locale.setlocale):

```python
import time # para benchmark
import locale # para definir local
import random # para misturar dados

# Geração de lista grande de palavras com acentos
palavras = ["árvore", "Éter", "coração", "zebra", "banana", "ônibus", "elefante", "fácil", "cálculo", "máquina"]
# Multiplicando para aumentar o tamanho da lista
palavras *= 10000
# Misturando para não ter ordenação prévia
random.shuffle(palavras)

# Teste 1
start = time.time()
sorted_padrao = sorted(palavras)
print(f"Ordenação padrão: {time.time() - start:.4f} segundos")

# Teste 2 (culturalmente correto)
locale.setlocale(locale.LC_ALL, "pt_BR.UTF-8")
start = time.time()
# argumento `key=` altera a função de ordenação padrão
sorted_locale = sorted(palavras, key=locale.strxfrm)
print(f"Ordenação localizada: {time.time() - start:.4f} segundos")
```

Resultado no Terminal:

```sh
Ordenação padrão: 0.0629 segundos
Ordenação localizada: 0.0909 segundos
```

> ⚠️  Um porém a se atentar é que o Python só pode ser configurado usando os locales disponíveis na máquina, ex: código executado em servidor europeu pode não ter o `"pt_BR"` e finalizar com erro.

## Conclusão

Quis registrar aqui pro futuro Eu as formas com que já realizei uma mesma coisa de rotina em diversas linguagens e acabei anotando um pouco de suas histórias, decisões de implementação, algoritmos usados internamente, performance e como tudo mesmo assim culminou em um código bem semelhante!

E são essas visões da TI que quero seguir compartilhando 🥳🎉

Agradeço a atenção e até 🚀

## Fontes e Futuras Ideias

- [Is JavaScript Array Sort Stable?](https://geeksforgeeks.org/is-javascript-array-sort-stable/)
- [How JavaScript sorts? TimSort algorithm](https://dev.to/bekmurzintimur/how-arrayprototypesort-works-3kcn)
- [Why Python repeats an array so easily?](https://stackoverflow.com/a/59997614)
- [Pass method as parameter on C#](https://stackoverflow.com/a/7766484)
- [JS sort different behavior between Firefox and Chrome](https://stackoverflow.com/a/68113398)
