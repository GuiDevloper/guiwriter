import { path } from '@vuepress/utils'
import { defaultTheme, Theme } from 'vuepress'
import { ThemeOptions } from './util'

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
    clientConfigFile: path.resolve(__dirname, 'client.ts')

    // other plugin APIs are also available
  }
}
