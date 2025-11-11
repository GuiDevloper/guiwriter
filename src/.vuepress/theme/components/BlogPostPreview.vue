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
    <time class="blog-post date">{{ publishDate }}</time>
    <p
      v-if="item.excerpt"
      v-html="item.excerpt"
      class="blog-post content"
    ></p>
    <div class="blog-post content tags-grid">
      <BlogPostTags :tags="item.tags" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getPublishDate, CustomPageFrontmatter } from './view-utils'
import { BlogPostTags } from './index.vue'

const { item } = defineProps<{ item: CustomPageFrontmatter }>()

const publishDate = computed(() => getPublishDate(item.date))
const backgroundImage = {
  'background-image': item.thumbnail
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

.blog-post .title
  margin 0.5rem 0 0
  font-size 1.5rem
  padding 0
  .blog-link
    font-weight inherit

.blog-post .date
  font-size 0.8rem

.blog-post .content
  font-size 1rem
  margin 1% 0

.tags-grid
  display grid
  grid-template-columns minmax(250px, 1fr) auto

@media (max-width: 600px)
  .tags-grid
    display block
</style>
