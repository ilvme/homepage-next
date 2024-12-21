<script setup>
import { data as posts } from '../../scripts/blog.data.js'
import { formatTime } from '../../scripts/utils.js'

defineOptions({ name: 'Test' })

// todo  按照年份分类、按照时间排序，依次展示
console.log(posts)
</script>

<template>
  <ol>
    <li v-for="post in posts" :key="post.url">
      {{ formatTime(post.frontmatter.createTime, 'YYYY-MM-DD') }}
      <a :href="post.url">{{ post.frontmatter.title }}</a>
    </li>
  </ol>
</template>

<style scoped></style>
