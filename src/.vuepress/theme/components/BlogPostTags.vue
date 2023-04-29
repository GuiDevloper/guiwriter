<template>
  <p
    class="tags"
    v-if="tags.length > 0"
  >
    <b>Tags: </b>
    <router-link
      class="blog-link"
      v-for="(tag, i) in tags"
      :to="`/tag/${tag}/`"
    >
      {{ `${tag}${i < tags.length - 1 ? ', ' : ''}` }}
    </router-link>
  </p>
</template>

<script setup lang="ts">
const { tags } = defineProps({
  tags: {
    type: Array<String>,
    required: true,
    default: []
  }
})
</script>

<style lang="stylus" scoped>
.tags
  margin 0
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  margin-right 1rem
</style>
