<template>
  <section class="page">
    <div class="tag-wrapper">
      <RouterLink
        v-for="({ items, path }, name) in tagMap.map"
        :to="path"
        class="tag"
      >
        {{ name }}
        <span class="tag-num">
          {{ items.length }}
        </span>
      </RouterLink>
    </div>
    <BlogPostList :pages="currentItems" />
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import type { Ref } from 'vue'
import { BlogPostList } from './index.vue'

type TagMap = {
  map: [{ items: object[]; path: string }]
  currentItems: [{ info: object }]
}

const tagMap: Ref<TagMap> = useBlogCategory('tag')
const currentItems = tagMap.value.currentItems?.map(v => v.info) || []
</script>

<style lang="stylus" scoped>
.page
  padding-top $navbarHeight

.tag-wrapper
  content_wrapper()
  font-size 14px
  padding 1rem
  max-width 650px
  a
    color inherit
  .tag
    display inline-block
    overflow hidden
    padding 0.2rem 0.8rem
    border-radius 0.25rem
    cursor pointer
    transition background 0.3s, color 0.3s
    .tag-num
      margin-left 0.2em
      font-size 0.7rem
      line-height 1.2rem
    &.router-link-active
      background var(--c-brand)
      color var(--c-bg)
</style>
