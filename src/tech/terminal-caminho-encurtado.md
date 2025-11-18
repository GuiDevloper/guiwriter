---
title: 'Linux Mint: Encurtando o Caminho Mostrado no Terminal'
date: '2025-11-17'
blog: true
permalink: /tech/terminal-caminho-encurtado
tags:
  - 'linux'
---

# Linux Mint: Encurtando o Caminho Mostrado no Terminal

Quis usar o terminal com caminho sempre focado na pasta atual e encontrei essa variável global que permite configurar isso:

```bash
export PROMPT_DIRTRIM=1
```

> `1` equivale a sempre mostrar apenas um nível (pasta atual)

Antes:

```bash
~/desktop/projects/nullstack $ |
```

Depois:

```bash
~/.../nullstack $ |
```

Basta adicionar ao final do `~/.bashrc` e executará sempre que um novo terminal abrir!

> 💡 Edite o arquivo com um `nano ~/.bashrc` e recarregue imediatamente com `source ~/.bashrc`

## Fontes e Futuras Ideias

- [Usando Variável e Antiga Alternativa](https://askubuntu.com/a/29580)
- [Tópico Sobre no Fórum do Linux Mint](https://forums.linuxmint.com/viewtopic.php?t=241035)
