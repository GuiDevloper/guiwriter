import { blogPlugin } from '@vuepress/plugin-blog'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { readingTimePlugin } from '@vuepress/plugin-reading-time'
import type { Plugin, PluginObject } from 'vuepress'
import type { CustomPage } from '../components/view-utils'
import type { CustomThemeOptions } from '.'

const SITE_LOGO = 'https://ik.imagekit.io/GuiDevloper/guiwriter/Logo.png'

export function seoPlugin(options: CustomThemeOptions): PluginObject {
  return {
    name: 'vuepress-plugin-seo',
    extendsPage(page: CustomPage) {
      page.frontmatter.head = page.frontmatter.head || []
      function add(name_type: 'property' | 'name', data: string[][]) {
        data.forEach(line => {
          page.frontmatter.head?.push([
            'meta',
            {
              [name_type]: line[0],
              content: line[1]
            }
          ])
        })
      }

      const ctx = {
        siteTitle: options.site_name,
        title: page.frontmatter.title || page.title || 'Home',
        description:
          page.frontmatter.description || page.frontmatter.tagline || '',
        author: page.frontmatter.author || options.author,
        tags: page.frontmatter.tags,
        twitterCard: 'summary_large_image',
        type: page.frontmatter.blog ? 'article' : 'website',
        url: options.hostname + page.path,
        image: page.frontmatter.Image
          ? page.frontmatter.Image.url
          : page.frontmatter.image || SITE_LOGO,
        publishedAt: page.frontmatter.date
          ? new Date(page.frontmatter.date).toISOString()
          : ''
      }

      // in production, make the image url absolute (fixes og:image)
      if (
        process.env.NODE_ENV !== 'development' &&
        ctx.image !== undefined &&
        !ctx.image.startsWith('https://')
      ) {
        ctx.image = options.hostname + ctx.image
      }

      add('property', [
        ['article:published_time', ctx.publishedAt],
        ['og:site_name', ctx.siteTitle],
        ['og:title', ctx.title],
        ['og:description', ctx.description],
        ['og:type', ctx.type],
        ['og:url', ctx.url],
        ['og:image', ctx.image]
      ])
      add('name', [['twitter:card', ctx.twitterCard]])
      add('name', [['description', ctx.description]])

      if (page.frontmatter.Image?.alt) {
        add('name', [['twitter:image:alt', page.frontmatter.Image.alt]])
      }

      // Author.
      if (options.author) {
        add('name', [
          ['twitter:label1', 'Written by'],
          ['twitter:data1', options.author.name]
        ])
        if (options.author.twitter) {
          add('name', [
            ['twitter:creator', `@${options.author.twitter}`],
            ['twitter:site', `@${options.author.twitter}`]
          ])
        }
      }

      // Tags.
      if (page.frontmatter.tags && Array.isArray(page.frontmatter.tags)) {
        add('name', [
          ['twitter:label2', 'Filed under'],
          ['twitter:data2', page.frontmatter.tags.join(', ')]
        ])
        page.frontmatter.tags.forEach(tag =>
          add('property', [['article:tag', tag]])
        )
      }
    }
  }
}

export function getPlugins(options: CustomThemeOptions): Plugin[] {
  return [
    mediumZoomPlugin({
      selector: '.zoom-img',
      zoomOptions: {
        background: '#212530'
      }
    }),
    readingTimePlugin(),
    seoPlugin(options),
    blogPlugin({
      filter: ({ filePathRelative, frontmatter }) => {
        // drop those pages which is NOT generated from file
        if (!filePathRelative) return false

        // drop those pages in `archives` directory
        if (filePathRelative.startsWith('archives/')) return false

        // drop those pages which do not use default layout
        if (frontmatter.home || frontmatter.layout) return false

        return true
      },

      getInfo: ({ frontmatter, git = {}, data = {} }) => {
        // getting page info
        const info: Record<string, any> = {
          date: frontmatter.date || null,
          tags: frontmatter.tags || [],
          excerpt: frontmatter.excerpt || '',
          title: frontmatter.title || '',
          image: frontmatter.image || SITE_LOGO,
          thumbnail: frontmatter.thumbnail || frontmatter.image || SITE_LOGO,
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
