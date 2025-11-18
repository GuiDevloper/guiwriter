<template>
  <section
    class="blog-post"
    :style="backgroundImage"
  >
    <h3 class="blog-post title">
      <router-link
        v-if="item.permalink"
        :to="item.permalink"
        class="blog-link"
      >
        {{ item.title }}
      </router-link>
    </h3>
    <!--<time class="blog-post date">{{ publishDate }}</time>-->
    <p
      v-if="item.excerpt"
      v-html="item.excerpt"
      class="blog-post content"
    ></p>
    <div
      v-if="item.tags && item.excerpt"
      class="blog-post content tags-grid"
    >
      <BlogPostTags :tags="item.tags" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getPublishDate, SITE_LOGO } from './view-utils'
import { BlogPostTags } from './index.vue'
import type { CustomPageFrontmatter } from '../types'

const { item } = defineProps<{ item: CustomPageFrontmatter }>()

const publishDate = computed(() => getPublishDate(item.date))
const backgroundImage = {
  'background-image':
    item.thumbnail && item.thumbnail !== SITE_LOGO
      ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(${item.thumbnail})`
      : 'initial'
}
</script>

<style lang="stylus" scoped>
section.blog-post
  background-color #25262b
  background-size cover
  background-position center
  padding 2% 4%
  border-radius 5px
  margin-bottom 1rem
  color #e2e1db
  border 1px #171717 solid
  font-size 1rem

.blog-post .title
  margin 0.1rem 0 0
  // margin 0
  // font-size 1.5rem
  font-size 20px
  padding 0
  .blog-link
    font-weight inherit

.blog-post .date
  font-size 0.8rem

.blog-post .content
  margin 1% 0 0

.tags-grid
  display grid
  grid-template-columns minmax(250px, 1fr) auto

@media (max-width: 600px)
  .tags-grid
    display block
</style>
