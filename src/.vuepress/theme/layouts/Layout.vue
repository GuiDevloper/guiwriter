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
  </ParentLayout>
</template>

<script setup lang="ts">
// @ts-ignore
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import { CustomPageFrontmatter } from 'theme/components/view-utils'
import { Home } from '../components/index.vue'

const frontmatter = computed(() => {
  return usePageFrontmatter<CustomPageFrontmatter>().value
})

const image = computed(() => frontmatter.value.Image)
</script>
