<template>
  <BlogPostList
    :pages="pages.pages"
    :pageData="frontmatter"
  />
</template>

<script setup lang="ts">
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import { BlogPostList } from './index.vue'
import type { CustomPageData, CustomPageFrontmatter } from '../types'

const pages = usePageData<CustomPageData>()

const frontmatter = usePageFrontmatter<CustomPageFrontmatter>()
</script>

<style lang="stylus">
@require '../styles/index'

.vp-hero-description
  font-weight 600
  text $descriptionColorDefault var(--descriptionColor)
</style>
