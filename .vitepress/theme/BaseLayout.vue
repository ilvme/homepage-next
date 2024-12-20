<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

const { isDark, theme, frontmatter } = useData()
console.log(theme.value)
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
    <template v-if="theme.comment && frontmatter.comment !== false" #doc-footer-before>
      <div class="doc-comments">
        <!--        <Giscus-->
        <!--          id="comments"-->
        <!--          mapping="specific"-->
        <!--          :term="pageId"-->
        <!--          strict="1"-->
        <!--          reactionsEnabled="1"-->
        <!--          emitMetadata="0"-->
        <!--          inputPosition="top"-->
        <!--          :theme="isDark ? 'dark' : 'light'"-->
        <!--          lang="zh-CN"-->
        <!--          loading="lazy"-->
        <!--          v-bind="{ ...comment }"-->
        <!--        />-->
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style></style>
