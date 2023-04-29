import { Page, PageFrontmatter } from 'vuepress'

export function getPublishDate(date?: string | Date) {
  if (!date) return ''

  const dateDate = new Date(date)
  const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const parts = dateTimeFormat.formatToParts(dateDate)
  const partValues = parts.map(p => p.value)

  return partValues.slice(0, 3).join('') + ', ' + partValues[4]
}

export type CustomPage = Page & {
  frontmatter: CustomPageFrontmatter
}

export type CustomPageFrontmatter = PageFrontmatter & {
  Image?: FrontmatterImage
  image?: string
  tags?: string[]
  heroText?: string
  blog?: boolean & {
    type: string
    tag: string
    name: string
  }
}

type FrontmatterImage = {
  url: string
  alt: string
  full: boolean
  description: string
}
