<template>
  <div>
    <ul
      class="blog-list"
      v-if="filteredPages.length > 0"
    >
      <li
        v-for="item in filteredPages"
        class="blog-list__item"
      >
        <BlogPostPreview :item="item" />
      </li>
    </ul>
    <p
      v-else
      class="text-empty"
    >
      Nada por aqui (por enquanto)
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BlogPostPreview } from './index.vue'
import { CustomPageFrontmatter } from './view-utils'

const { pages, pageData } = defineProps<{
  pages: CustomPageFrontmatter[]
  pageData?: CustomPageFrontmatter
}>()

const filteredPages = computed(() => {
  return pages
    .filter(page => page.permalink.startsWith(pageData?.permalink || ''))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<style lang="stylus" scoped>
.blog-list
  padding 0 1rem
  margin 0 auto
  max-width 650px

.blog-list__item
  list-style-type none

.text-empty
  text-align center
</style>
