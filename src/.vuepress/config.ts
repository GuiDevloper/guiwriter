import { viteBundler } from '@vuepress/bundler-vite'
import { Plugin, defineUserConfig } from 'vuepress'
import CustomTheme from './theme'

import { commentPlugin } from '@vuepress/plugin-comment'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { searchPlugin } from '@vuepress/plugin-search'

function getUserPlugins(): Plugin[] {
  return [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Pesquisar'
        }
      }
    }),
    pwaPlugin({
      locales: {
        '/': {
          update: 'Novo conteúdo disponível.',
          install: 'Atualizar'
        }
      }
    }),
    commentPlugin({
      provider: 'Giscus',
      repo: 'GuiDevloper/guiwriter',
      repoId: 'R_kgDOJcrPiQ',
      category: 'Announcements',
      categoryId: 'DIC_kwDOJcrPic4CWMFL',
      mapping: 'og:title',
      strict: true,
      reactionsEnabled: true,
      inputPosition: 'top',
      darkTheme: 'transparent_dark',
      lazyLoading: true
    })
  ]
}

export default defineUserConfig({
  title: 'GuiWriter',
  theme: CustomTheme({
    lastUpdated: false,
    logo: '/icons/android/android-launchericon-72-72.png',
    colorMode: 'dark',
    openInNewWindow: 'Abrir em nova aba',
    toggleColorMode: 'Trocar tema',
    toggleSidebar: 'Alternar sidebar',
    site_name: 'GuiWriter',
    author: {
      name: 'GuiDevloper',
      twitter: 'GuiDevloper'
    },
    hostname: 'https://guiwriter.vercel.app',
    navbar: [
      {
        text: 'Autor',
        link: 'https://beacons.ai/GuiDevloper',
        ariaLabel: 'Links do Autor'
      }
    ]
  }),
  bundler: viteBundler(),
  shouldPrefetch: false,
  plugins: getUserPlugins(),
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/icons/apple-touch-icon.png'
      }
    ],
    ['link', { rel: 'icon', sizes: '32x32', href: '/icons/favicon-32x32.png' }],
    ['link', { rel: 'icon', sizes: '16x16', href: '/icons/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#25262b'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#c44644' }],
    ['meta', { name: 'theme-color', content: '#c44644' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ]
  ],
  locales: {
    '/': {
      lang: 'pt-BR'
    }
  }
})
