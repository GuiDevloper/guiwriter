<template>
  <section class="not-found-container">
    <div class="content">
      <h1>404 :(</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/"> Me leve pro Início </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const msgs = [
  `Não há nada aqui.`,
  `Como viemos parar aqui, ein?`,
  `Você foi longe demais.`,
  `Parece que temos algum caminho sem saída.`
]

function getMsg() {
  return msgs[Math.floor(Math.random() * msgs.length)]
}
</script>

<style lang="stylus" scoped>
.not-found-container
  display flex
  align-items center
  width 90vw
  height 50vh
  justify-content center

.content
  padding 2rem
</style>
