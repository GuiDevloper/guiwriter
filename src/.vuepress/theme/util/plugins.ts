import { CustomPage } from 'theme/components/view-utils'
import { DefaultThemeOptions, PluginObject } from 'vuepress'
import mediumZoomPlugin from '@vuepress/plugin-medium-zoom'
import { readingTimePlugin } from '@renovamen/vuepress-plugin-reading-time'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { blogPlugin } from 'vuepress-plugin-blog2'

export type ThemeOptions = DefaultThemeOptions & {
  site_name: string
  hostname: string
  author: {
    name: string
    twitter?: string
  }
}

export function getPlugins(options: ThemeOptions): PluginObject[] {
  return [
    mediumZoomPlugin({
      selector: '.zoom-img',
      zoomOptions: {
        background: '#212530'
      }
    }),
    readingTimePlugin,
    pwaPlugin(),
    blogPlugin({
      filter: ({ filePathRelative, frontmatter }) => {
        // drop those pages which is NOT generated from file
        if (!filePathRelative) return false

        // drop those pages in `archives` directory
        if (filePathRelative.startsWith('archives/')) return false

        // drop those pages which do not use default layout
        if (frontmatter.heroText || frontmatter.layout) return false

        return true
      },

      getInfo: ({ frontmatter, git = {}, data = {} }) => {
        // getting page info
        const info: Record<string, any> = {
          date: frontmatter.date || null,
          tags: frontmatter.tags || [],
          excerpt: frontmatter.excerpt || '',
          title: frontmatter.title || '',
          image: frontmatter.image || '',
          thumbnail: frontmatter.thumbnail || frontmatter.image,
          permalink: frontmatter.permalink || ''
        }

        return info
      },
      category: [
        {
          key: 'tag',
          getter: ({ frontmatter }: CustomPage) => frontmatter.tags
        }
      ]
    })
  ]
}
