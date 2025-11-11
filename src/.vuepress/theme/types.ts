import type {
  AutoLinkOptions,
  DefaultThemeOptions
} from '@vuepress/theme-default'
import type { Page, PageFrontmatter } from 'vuepress'

export type CustomThemeOptions = DefaultThemeOptions & {
  site_name: string
  hostname: string
  author: {
    name: string
    twitter?: string
  }
}

export type CustomPage = Page & {
  data: CustomPageData
  frontmatter: CustomPageFrontmatter
}

export type CustomPageData = {
  readingTime: {
    minutes: string
  }
  sidebar: AutoLinkOptions[]
  pages: CustomPageFrontmatter[]
}

export type CustomPageFrontmatter = PageFrontmatter & {
  Image?: FrontmatterImage
  image?: string
  tags?: string[]
  heroText?: string
  tagline?: string
  blog?: boolean & {
    type: string
    tag: string
    name: string
  }
}

export type FrontmatterImage = {
  url: string
  alt: string
  full: boolean
  description: string
}
