<template>
  <CommentService
    :darkmode="isDarkMode"
    class="giscus"
  />
</template>

<script setup lang="ts">
import { onUnmounted, onMounted, ref } from 'vue'
const isDarkMode = ref(true)

onMounted(() => {
  const html = document.documentElement

  isDarkMode.value = html.classList.contains('dark')

  // watch theme change
  const observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains('dark')
  })

  observer.observe(html, {
    attributeFilter: ['class'],
    attributes: true
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style scoped lang="stylus">
.giscus
  margin-bottom: 3rem
</style>
