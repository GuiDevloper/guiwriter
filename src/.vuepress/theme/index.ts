import { path } from 'vuepress/utils'
import { Theme } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { getFrontmatters, getSidebar, ThemeOptions } from './util'
import { getPlugins } from './util'
import { ViteBundlerOptions } from '@vuepress/bundler-vite'

export default (options: ThemeOptions): Theme => {
  const sidebarList = getSidebar()
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
        copyCode: {
          locales: {
            '/': {
              copied: 'Copiado!',
              copy: 'Copiar'
            }
          },
          showInMobile: true
        },
        backToTop: {
          locales: {
            '/': {
              backToTop: 'Voltar ao topo'
            }
          },
          progress: false
        }
      },
      sidebar: {
        '/': 'heading',
        '/tag/': false
      },
      ...options
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
