<script setup>
import { data as originalPosts } from '../../scripts/blog.data.js'
import { formatTime } from '../../scripts/utils.js'

import { ref } from 'vue'

defineOptions({ name: 'BlogArchives' })

const posts = ref(originalPosts)

// 将 Post 按照年份分类，并按照时间排序
const postsByYear = posts.value.reduce((acc, post) => {
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
  <p>共计 {{ originalPosts.length }} 篇。</p>

  <div v-for="year in yearsDesc" :key="year">
    <h2>{{ year }} 年（共计 {{ postsByYear[year].length }} 篇）</h2>
    <ul>
      <li v-for="post in postsByYear[year]" :key="post.url">
        <div class="blog-item">
          <a :href="post.url">{{ post.frontmatter.title }}</a>
          <div>
            <span style="margin-right: 10px; font-size: 0.8em">
              {{ formatTime(post.frontmatter.date, 'YYYY-MM-DD') }}
            </span>
            <span class="blog-tag-item">
              <Badge type="tip" :text="post.frontmatter.category" />
            </span>
            <span class="blog-tag-item" v-for="tag in post.frontmatter.tags">
              <Badge type="info" :text="'# ' + tag" />
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blog-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-tag-item {
}
</style>
