import { path } from '@vuepress/utils'
import { defaultTheme, Theme, ViteBundlerOptions } from 'vuepress'
import { getFrontmatters, getSidebar, ThemeOptions } from './util'
import { getPlugins } from './util'

export default (options: ThemeOptions): Theme => {
  options.sidebar = getSidebar()
  // returns a theme object
  return {
    name: 'vuepress-theme-succinct',
    extends: defaultTheme({
      themePlugins: {
        mediumZoom: false,
        git: false
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
    }

    // other plugin APIs are also available
  }
}
