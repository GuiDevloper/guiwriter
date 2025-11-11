import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import type { Theme } from 'vuepress'
import { path } from 'vuepress/utils'
import {
  CustomThemeOptions,
  getFrontmatters,
  getPlugins,
  getSidebar
} from './util'

export default (options: CustomThemeOptions): Theme => {
  const sidebarList = getSidebar()
  const { themePlugins, ...otherOptions } = options
  // returns a theme object
  return {
    name: 'vuepress-theme-succinct',
    extends: defaultTheme({
      themePlugins: {
        mediumZoom: false,
        hint: false,
        git: { filter: () => false },
        sitemap: {
          hostname: options.hostname
        },
        ...themePlugins
      },
      sidebar: {
        '/': 'heading',
        '/tag/': false
      },
      ...otherOptions
    }),

    // path to the client config of your theme
    clientConfigFile: path.resolve(__dirname, 'client.ts'),

    plugins: getPlugins(options),

    alias: {
      // set alias for replaceable components
      '@theme/Page.vue': path.resolve(__dirname, 'components/Page.vue')
    },

    extendsBundlerOptions(options: ViteBundlerOptions) {
      options.viteOptions = {
        build: {
          sourcemap: false
        }
      }
    },

    extendsPage: page => {
      page.data['pages'] = getFrontmatters()
      page.data['sidebar'] = sidebarList
    }

    // other plugin APIs are also available
  }
}
