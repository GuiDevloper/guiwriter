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
  const darkChosen = () => html.getAttribute('data-theme') === 'dark'
  isDarkMode.value = darkChosen()

  // watch theme change
  const observer = new MutationObserver(() => {
    isDarkMode.value = darkChosen()
  })

  observer.observe(html, { attributeFilter: ['data-theme'] })

  onUnmounted(() => observer.disconnect())
})
</script>

<style lang="stylus">
.giscus
  // margin-bottom: 3rem

.vp-comment
  padding 0 1.5rem
</style>
