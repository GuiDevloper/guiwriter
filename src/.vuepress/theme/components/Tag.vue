<template>
  <section class="tag-wrapper">
    <div class="tag-list">
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
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import { BlogPostList } from './index.vue'

const tagMap = useBlogCategory('tag')
const currentItems = tagMap.value.currentItems?.map(v => v.info) || []
</script>

<style lang="stylus">
@require '../styles/mixins'

.tag-wrapper .blog-list
  padding 0 1rem !important

.tag-list
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
      background var(--accentColor)
      color var(--bodyBgColor)
</style>
