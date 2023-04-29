import { defineUserConfig } from 'vuepress'
import CustomTheme from './theme'

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
    hostname: ''
  }),
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