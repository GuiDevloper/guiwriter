<template>
  <ParentLayout>
    <template #page-top>
      <template v-if="frontmatter.blog === true">
        <section
          v-if="image"
          :class="{
            'image-text back-blog': true,
            'not-full': !image.full
          }"
        >
          <img
            :alt="image.alt"
            :title="image.alt"
            :src="image.url"
            class="zoom-img"
          />
          <em v-html="image.description"></em>
        </section>
      </template>
      <Home v-else-if="!frontmatter.blog" />
    </template>

    <template
      #page-content-top
      v-if="frontmatter.blog === true"
    >
      <p class="blog-date-reading">
        <time :datetime="frontmatter.date?.toString()">
          {{ publishDate }}
        </time>
        <template v-if="readingTime">
          {{ ` - ${readingTime.minutes} min de leitura` }}
        </template>
      </p>
      <BlogPostTags
        v-if="frontmatter.tags"
        :tags="frontmatter.tags"
      />
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
// @ts-ignore
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import { CustomPageFrontmatter, getPublishDate } from '../components/view-utils'
import { Home, BlogPostTags } from '../components/index.vue'

type ReadingTimeObject = {
  readingTime: {
    minutes: string
  }
}

const readingTime = computed(() => {
  return usePageData<ReadingTimeObject>().value.readingTime
})

const frontmatter = computed(() => {
  return usePageFrontmatter<CustomPageFrontmatter>().value
})

const publishDate = computed(() => getPublishDate(frontmatter.value.date))

const image = computed(() => frontmatter.value.Image)
</script>

<style lang="stylus" src="../styles/index.styl" />
