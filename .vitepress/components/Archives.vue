<script setup>
import { data as posts } from '../../scripts/blog.data.js'
import { formatTime } from '../../scripts/utils.js'

defineOptions({ name: 'Test' })

console.log(posts)
posts.forEach((post) => {
  post.frontmatter.date = formatTime(post.frontmatter.date)
})

// 将 Post 按照年份分类，并按照时间排序
const postsByYear = posts.reduce((acc, post) => {
  const year = post.frontmatter.date.slice(0, 4)
  if (!acc[year]) {
    acc[year] = []
  }
  acc[year].push(post)
  return acc
}, {})

// 降序排序的年份列表
const yearsDesc = Object.keys(postsByYear).sort((a, b) => b - a)
</script>

<template>
  <p>共计 {{ posts.length }} 篇。</p>
  <div v-for="year in yearsDesc" :key="year">
    <h2>{{ year }} 年（共计 {{ postsByYear[year].length }} 篇）</h2>
    <ul>
      <li v-for="post in postsByYear[year]" :key="post.url">
        <span style="margin-right: 10px; font-size: 0.95em">
          {{ formatTime(post.frontmatter.date, 'YYYY-MM-DD') }}
        </span>
        <a :href="post.url">{{ post.frontmatter.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
