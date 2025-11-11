<template>
  <ParentLayout>
    <template #page-top>
      <Tag v-if="frontmatter.blog?.type === 'category'" />
      <section
        v-if="frontmatter.blog && image"
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
        <em
          v-if="image.description"
          v-html="image.description"
        ></em>
      </section>
    </template>

    <template #sidebar-top>
      <nav class="vp-sidebar-items">
        <RouteLink
          class="auto-link vp-sidebar-item vp-sidebar-heading"
          :to="s.link"
          aria-label="Artigos tecnológicos"
          :active="frontmatter.permalink == s.link"
          active-class="active"
          v-for="s in pageData.sidebar"
        >
          {{ s.text }}
        </RouteLink>
      </nav>
    </template>

    <template
      #page-content-top
      v-if="frontmatter.blog === true"
    >
      <p
        class="blog-date-reading"
        :class="{ 'reading-no-image': !image }"
      >
        <time
          :datetime="frontmatter.date?.toString()"
          class="publish-date"
        >
          {{ publishDate }}
        </time>
        <template v-if="readingTime">
          <span class="reading-time-separator"> - </span>
          {{ readingTime }}
        </template>
      </p>
      <BlogPostTags
        v-if="frontmatter.tags"
        :tags="frontmatter.tags"
      />
    </template>

    <template
      #page-bottom
      v-if="frontmatter.blog === true"
    >
      <Giscus />
    </template>
  </ParentLayout>

  <Home v-if="frontmatter.home" />
</template>

<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { RouteLink, usePageData, usePageFrontmatter } from 'vuepress/client'
import { computed } from 'vue'
import {
  activateGoatCounter,
  CustomPageFrontmatter,
  getPublishDate
} from '../components/view-utils'
import { Home, BlogPostTags, Tag, Giscus } from '../components/index.vue'
import { AutoLinkOptions } from '@vuepress/theme-default'

type CustomPageData = {
  readingTime: {
    minutes: string
  }
  sidebar: AutoLinkOptions[]
}

const pageData = usePageData<CustomPageData>()
const readingTime = computed(() => {
  const { minutes } = pageData.value.readingTime
  if (!minutes) return
  let time = +`${minutes}`.split('.')[0]
  if (time < 1) return 'Leitura rapidinha ⚡'
  return `${time} min de leitura`
})

const frontmatter = usePageFrontmatter<CustomPageFrontmatter>()
const publishDate = computed(() => getPublishDate(frontmatter.value.date))
const image = computed(() => frontmatter.value.Image)

activateGoatCounter()
</script>

<style lang="stylus" src="../styles/index.styl" />

<style lang="stylus" scoped>
.vp-sidebar-items
  padding-bottom 0
  .vp-sidebar-item
    padding-block 0.8rem

/*
.vp-sidebar .vp-navbar-item
  padding-left 2rem

.vp-sidebar-items .custom-sidebar-item
  // font-size: 1.1em;
  // padding-left: 1rem;
  // padding-block: 0;
  line-height 2
  font-weight 600
  font-size 1.1em
*/
</style>
