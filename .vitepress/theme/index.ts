import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/index.css'
import BaseLayout from './BaseLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(BaseLayout, null, {})
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme
