<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{ code: string }>()

onMounted(() => {
  if (process.env.NODE_ENV === 'production' && props.code && window) {
    let goatcounter = document.createElement('script')
    goatcounter.setAttribute(
      'data-goatcounter',
      `https://${props.code}.goatcounter.com/count`
    )
    goatcounter.setAttribute('async', 'true')
    goatcounter.setAttribute('src', '//gc.zgo.at/count.js')
    let s = document.getElementsByTagName('script')[0]
    s.parentNode?.insertBefore(goatcounter, s)
  }
})
</script>

<template></template>
