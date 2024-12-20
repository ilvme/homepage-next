import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: '林深时觉寒',
  description: 'A VitePress Site',

  srcDir: 'docs',
  outDir: 'dist',

  themeConfig: {
    logo: 'favicon.ico',

    comment: true,

    nav,
    sidebar,
    // aside: 'left',
    outline: {
      level: [2, 4],
      label: '目录',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2019-present 林深时觉寒',
    },

    lightModeSwitchTitle: '点击切换至亮色模式',
    darkModeSwitchTitle: '点击切换成暗色模式',

    externalLinkIcon: true,

    // socialLinks: [{ icon: 'github', link: 'https://github.com/kangjia96' }],
  },
})
