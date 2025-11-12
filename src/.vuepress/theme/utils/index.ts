export * from './plugins'

import type { SidebarLinkOptions } from '@vuepress/theme-default'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'
import { fs, path } from 'vuepress/utils'
import type { CustomPageFrontmatter } from '../types'

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
  let authorRoute = null
  let final = files.reduce((acc, file) => {
    if (!file.isDirectory() || file.name === '.vuepress') return acc
    const { data } = matter(
      fs.readFileSync(path.join(postsDir, file.name, 'README.md'), 'utf8')
    )
    const link = {
      text: data.title,
      link: data.permalink
      // children: []
      // collapsible: true
    }
    if (data.permalink === '/links/') {
      authorRoute = link
    } else {
      acc.push(link)
    }
    // acc[existIndex].children.push(href)
    return acc
  }, [] as SidebarLinkOptions[])
  final = final.sort((a, b) => a.text.length - b.text.length)
  final.unshift(authorRoute)
  // final.unshift({ text: 'Home', link: '/' })
  return final
}
