import { path, fs } from '@vuepress/utils'
import { CustomPageFrontmatter } from 'theme/components/view-utils'
import { fileURLToPath } from 'url'
import { DefaultThemeOptions, SidebarGroup } from 'vuepress'
import matter from 'gray-matter'
export * from './plugins'

export type ThemeOptions = DefaultThemeOptions & {
  site_name: string
  hostname: string
  author: {
    name: string
    twitter?: string
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const postsDir = path.resolve(process.cwd(), 'src')

export function getPostsPaths() {
  let posts: string[] = []
  function getPaths(currentDir: string = '') {
    const files = fs.readdirSync(path.join(postsDir, currentDir), {
      withFileTypes: true
    })

    files.forEach(file => {
      if (file.name === '.vuepress' || file.name === 'README.md') return
      const joinedDir = path.join(currentDir, file.name)
      if (file.isDirectory()) {
        return getPaths(joinedDir)
      }
      posts.push(joinedDir)
    })
  }
  getPaths()
  return posts
}

export function getFrontmatters() {
  const posts = getPostsPaths()
  return posts.map(post => {
    const fullPath = path.join(postsDir, post)
    const src = fs.readFileSync(fullPath, 'utf-8')
    const parsed: CustomPageFrontmatter = matter(src).data
    return {
      ...parsed,
      Image: {},
      description: ''
    }
  })
}

export function capitalize(text: string) {
  return `${text[0].toUpperCase()}${text.substring(1)}`
}

export function getSidebar() {
  const files = fs.readdirSync(postsDir, {
    withFileTypes: true
  })
  let final = files.reduce((acc, file) => {
    if (!file.isDirectory() || file.name === '.vuepress') return acc
    const { data } = matter(
      fs.readFileSync(path.join(postsDir, file.name, 'README.md'), 'utf8')
    )
    acc.push({
      text: data.title,
      link: data.permalink,
      children: []
      // collapsible: true,
    })
    // acc[existIndex].children.push(href)
    return acc
  }, [] as SidebarGroup[])
  final = final.sort((a, b) => a.text.length - b.text.length)
  final.unshift({ text: 'Home', link: '/', children: [] })
  return final
}
