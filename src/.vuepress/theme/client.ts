import { defineClientConfig } from '@vuepress/client'
// @ts-ignore
import Layout from '@vuepress/theme-default/layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

export default defineClientConfig({
  layouts: {
    Layout,
    NotFound
  }
})
