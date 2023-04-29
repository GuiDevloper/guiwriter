<template>
  <div class="home">
    <div class="hero">
      <h1 class="home-title">
        {{ frontmatter.heroText }}
      </h1>

      <h2 class="home-description">
        {{ frontmatter.description }}
      </h2>
    </div>

    <BlogPostList
      :pages="pages"
      :pageData="frontmatter"
    />
  </div>
</template>

<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import { BlogPostList } from './index.vue'
import { CustomPageFrontmatter } from './view-utils'

const pages = computed(() => usePageData().value['pages'])

const frontmatter = computed(() => {
  return usePageFrontmatter<CustomPageFrontmatter>().value
})
</script>

<style scoped lang="stylus">
.home
  padding $navbarHeight 0 0

.home-description
  text $descriptionColorDefault var(--descriptionColor)

@media (max-width: $MQMobileNarrow)
  .home-description
    font-size 1.2rem
</style>
