---
title: 'Meu Dicionário de Hardware (Atualizável)'
date: '2025-02-05'
blog: true
excerpt: 'Este é um Hello World com utilidade, nada melhor do que testar este ambiente com algo leve como uma lista de palavras sérias e seus significados (não tão sérios assim) 🤡🚀.'
Image:
  {
    alt: 'Banner escrito: Meu Dicionário de Hardware (Atualizável) - Este é um Hello World com utilidade, nada melhor do que testar este ambiente com algo leve como uma lista de palavras sérias e seus significados (não tão sérios assim) 🤡🚀.',
    url: '/thumbs/dicionario-hardware.png',
    full: false
  }
description: 'Este é um Hello World com utilidade, nada melhor do que testar este ambiente com algo leve como uma lista de palavras sérias e seus significados (não tão sérios assim) 🤡🚀.'
image: '/thumbs/dicionario-hardware.png'
thumbnail: '/thumbs/dicionario-hardware.png'
permalink: /dict/dicionario-hardware
tags:
  - 'hardware'
sidebar: false
---

# Meu Dicionário de Hardware (Atualizável)

<ul>
  <li v-for="(meaning, word) of ordered_dict">
    <p>
      <strong>{{ word }}</strong>: {{ meaning }}
    </p>
  </li>
</ul>

<script setup>
const dict = {
  'PC/Computador Pessoal': 'Computa pessoalmente',
  'Mouse/Rato': 'Tem cauda, gatos o caçam, chama-se rato, parece rato, mas não é rato',
  'CPU/Unidade de Processamento Computacional': 'Processa as coisas',
  'GPU/Unidade de Processamento Gráfico': 'Processa a imagem das coisas',
  'APU/Unidade de Processamento Acelerado': 'Processa as coisas E a imagem das coisas 😳',
  'Monitor': 'Exibe os gráficos processados pela GPU',
  'Keyboard/Teclado': 'Cama massageadora do seu gato(a)',
  'PSU/Fonte de Alimentação': 'Transforma energia em Prato Feito pro PC',
  'Case/Gabinete': 'Anteriormente erroneamente chamado de CPU, abriga o PC',
  'RAM/Random Access Memory': 'Referência ao álbum épico do Daft Punk',
  'VRAM/Video Random Access Memory': 'RAM só pra gráficos, sendo APU usará a própria RAM',
  'Motherboard/Placa-Mãe': 'Mãe de todas as peças',
  'Disquete': 'Ícone de salvar coisas em live-action',
  'Pen Drive/Caneta Dirige': 'Referência ao Ryan Gosling',
  'Bluetooth/Dente Azul': 'Sistema de curto alcance para envio e recebimento de arquivos',
  'HD/Disco Rígido': 'Armazenamento de dados em disco quase imortal',
  'SSD/Unidade de Estado Sólido': 'Pen Drive pra PC, muito mais veloz que HD (e menos imortal)',
  'SATA/Entrada de Tecnologia Avançada Serial': 'É vermelho e poderão dizer que é nome de coisa ruim, mas é só uma entrada muito usada pelo armazenamento',
  'Cooler/Ventoinha': 'Ventilador pessoal do PC, CPU, GPU, etc',
}

const ordered_words = Object.keys(dict).sort((a, b) => a.localeCompare(b))
const ordered_dict = ordered_words.reduce((acc, cur) => {
  acc[cur] = dict[cur]
  return acc
}, {})
</script>
