---
title: 'Linux Mint: Terminal com Título Dinâmico'
date: '2025-11-17'
blog: true
permalink: /tech/terminal-titulo-dinamico
tags:
  - 'linux'
---

# Linux Mint: Terminal com Título Dinâmico

Percebi que meu terminal no [Linux Mint](https://linuxmint.com) não alterava o título da janela de acordo com o que estava executando nele, dificultando identificar cada uma entre várias.

A solução final pra isso foi adicionar o seguinte ao final do `~/.bashrc`, executando em cada nova janela:

```bash
if [[ "${TERM}" == "xterm-256color" || "${TERM}" == "alacritty" ]]; then
  trap 'printf "\033]0;%s: %s\007" "${PWD/#$HOME\/desktop/\~}" "${BASH_COMMAND%% *}"' DEBUG
  PROMPT_COMMAND='printf "\033]0;%s\007" "${PWD/#$HOME\/desktop/\~}"'
fi
```

> 💡 Abra o arquivo com um `nano ~/.bashrc` e recarregue imediatamente com `source ~/.bashrc`

## Explicação Detalhada

- `if [[ "${TERM}" == "..." ]]; then`: Apenas executa no meu [`xterm`](https://pt.wikipedia.org/wiki/Xterm) ou [`alacritty`](https://en.wikipedia.org/wiki/Alacritty)
- `trap '...' DEBUG`: Configura um interceptador ([`trap`](https://geeksforgeeks.org/linux-unix/shell-scripting-bash-trap-command/)) para o `DEBUG`, qual executará o entre aspas antes de cada comando _shell_
  - `printf "\033]0;%s : %s\007"`: Núcleo da alteração do título
    - `\033]0;`: inicia sequência do que estará no novo título
    - `%s : %s`: formata o título com duas strings separadas por `:`
    - `\007`: caractere ASCII Bell sinalizando o fim da sequência
    - `"${PWD/#$HOME\/desktop/\~}"`: Primeiro `%s`. Pega o [PWD](https://man7.org/linux/man-pages/man1/pwd.1.html) e substitui o `$HOME/desktop` por `~`, colocando um caminho limpo no título
    - `"${BASH_COMMAND%% *}"`: Segundo `%s`. Extrai o nome do programa executando atualmente
- `PROMPT_COMMAND='...'`: Faz o mesmo, exceto que com nenhum programa executando

> 💡 Nas Preferências do terminal tem opções de como aparecerá o título dinâmico, ex: substituindo totalmente o "Terminal" padrão

## Manualmente com Função bash

Também tem opção de só alterar o título manualmente salvando uma função dessa no `~/.bashrc` e executando com `set-title "Título"`

```bash
function set-title() {
  printf "\033]0;$*\007"
}
```

Isso extrai aquela parte de definir título com [`printf`](https://man7.org/linux/man-pages/man1/printf.1.html) e ASCII e coloca no título todas as strings passadas pro comando!

## Fontes e Futuras Ideias

- [Linha para alterar título sem mudar $PS1](https://askubuntu.com/a/860497)
- [Expressões Condicionais do Bash](https://gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)
