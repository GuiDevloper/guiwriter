import { path } from '@vuepress/utils'
import { defaultTheme, Theme, ViteBundlerOptions } from 'vuepress'
import { getFronters, ThemeOptions } from './util'

export default (options: ThemeOptions): Theme => {
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
      page.data['pages'] = getFronters()
    }

    // other plugin APIs are also available
  }
}
