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
  const posts = getPostsPaths()
  return posts.reduce(
    (acc, post) => {
      const folder = capitalize(post.split('/')[0])
      const href = `/${post}`
      const existIndex = acc.findIndex(v => v.text === folder)
      if (existIndex === -1) {
        return [
          ...acc,
          {
            text: folder,
            // children: [href],
            // collapsible: true
            link: `/${folder.toLowerCase()}/`
          }
        ]
      }
      // acc[existIndex].children.push(href)
      return acc
    },
    [{ text: 'Home', link: '/' }] as SidebarGroup[]
  )
}
