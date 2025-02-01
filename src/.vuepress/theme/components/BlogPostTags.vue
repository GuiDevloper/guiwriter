<template>
  <p
    class="tags"
    v-if="tags.length > 0"
  >
    <b>Tags: </b>
    <template v-for="(tag, i) in tags">
      <router-link
        class="blog-link"
        :to="`/tag/${tag}/`"
      >
        {{ tag }} </router-link
      >{{ i < tags.length - 1 ? ', ' : '' }}
    </template>
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
  .blog-link
    text-decoration underline
</style>
