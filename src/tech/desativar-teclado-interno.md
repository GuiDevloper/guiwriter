---
title: 'Linux Mint: Desativando Teclado Interno de Laptop'
date: '2025-10-14'
blog: true
permalink: /tech/desativar-teclado-interno
tags:
  - 'linux'
---

# Linux Mint: Desativando Teclado Interno de Laptop

Em um laptop com teclado interno falho optamos por conectar um externo, mas o que fazer se o antigo teclado tem vida própria e digita coisas aleatórias de vez em quando?

Configurar um comando de desativação no `~/.bashrc` para sempre executar ao iniciar o terminal/sistema!

É necessário saber o nome interno do teclado interno 👀

Execute no terminal:

```bash
xinput list
```

O nome estará ali, no meu caso é `AT Translated Set 2 keyboard`, então o comando de desativação será:

```bash
xinput disable "AT Translated Set 2 keyboard"
```

Basta adicionar ao fim do `~/.bashrc`, recarregá-lo com o famoso `source ~/.bashrc` e perceberá que o teclado interno foi desligado! (Desejo que não desative o novo por engano 🙏)

## Fontes e Futuras Ideias

- [Comandinho para Desabilitar Tecladinho](https://askubuntu.com/a/603717)
