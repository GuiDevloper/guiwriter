import { path } from '@vuepress/utils'
import { defaultTheme, Theme } from 'vuepress'
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

    extendsPage: page => {
      page.data['pages'] = getFronters()
    }

    // other plugin APIs are also available
  }
}
