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
  locales: {
    '/': {
      lang: 'pt-BR'
    }
  }
})
