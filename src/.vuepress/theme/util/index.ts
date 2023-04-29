import { DefaultThemeOptions } from 'vuepress'

export type ThemeOptions = DefaultThemeOptions & {
  site_name: string
  hostname: string
  author: {
    name: string
    twitter?: string
  }
}
