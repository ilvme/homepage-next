<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'
import Giscus from '@giscus/vue'
import { usePageId } from '../composables/usePageId.js'

const { isDark, theme, frontmatter } = useData()

const pageId = usePageId()

const { comment } = theme.value
console.log(comment)
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <template v-if="theme.comment.enabled && frontmatter.comment !== false" #doc-footer-before>
      <div class="doc-comments">
        <Giscus
          mapping="url"
          strict="1"
          :term="pageId"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="top"
          :theme="isDark ? 'dark' : 'light'"
          crossorigin="anonymous"
          async
          id="comments"
          v-bind="{ ...comment }"
        />
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style></style>
