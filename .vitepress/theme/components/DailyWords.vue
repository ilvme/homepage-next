<script setup>
import { ref } from 'vue'
import { Octokit } from '@octokit/rest'
import oldWordsRaw from '../../../scripts/old-words.raw.js'
import parseCSV from '../../../scripts/words.js'
import { formatTime } from '../../../scripts/utils.js'
import Word from './Word.vue'

defineOptions({ name: 'Words' })

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
  userAgent: 'kangjia96/daily-words',
  baseUrl: 'https://api.github.com',
})

const words = ref([])
const labels = ref([])
const loading = ref(false)

// 获取所有说说数据
const fetchWords = async () => {
  try {
    loading.value = true
    // TODO 分页查询实现
    const { data } = await octokit.issues.listForRepo({
      owner: 'kangjia96',
      repo: 'daily-words',
      sort: 'created',
      state: 'all',
      per_page: 1000,
    })

    words.value = data.map((item) => ({
      ...item,
      updated_at: formatTime(item.updated_at),
    }))
    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('获取最新说说数据失败：', error)
  }
  words.value.push(...parseCSV(oldWordsRaw))
}

// 获取所有标签数据
const fetchLabels = async () => {
  try {
    const { data } = await octokit.issues.listLabelsForRepo({
      owner: 'kangjia96',
      repo: 'daily-words',
    })
    labels.value = data
  } catch (error) {
    console.error('获取标签数据失败：', error)
  }
}

// 页面加载时调用获取说说数据的函数
fetchWords()
fetchLabels()
</script>

<template>
  <main style="width: 80%; margin: 0 auto">
    <h1 style="margin: 20px 0; font-weight: bolder; font-size: 1.75rem">
      说说 <Badge type="warning" text="功能开发中，不稳定" />
    </h1>
    <div class="word-desc">
      说说（Daily Words):一句话叙当前所历之事，一句话抒此刻难言之情，一句话吐所遇违心之槽。
    </div>

    <p style="margin-bottom: 10px">
      合计：{{ words.length }} 个说说。
      <badge v-for="label in labels" :key="label.id" type="info" :text="'# ' + label.name" />
    </p>

    <!-- 加载中... -->
    <div v-if="loading" style="text-align: center">loading.......</div>

    <!-- 空 -->
    <div v-else-if="!loading && words.length === 0" style="text-align: center">empty~</div>

    <!-- 说说 -->
    <div v-else style="display: flex; flex-wrap: wrap; gap: 10px">
      <Word v-for="word in words" :key="word.id" :word="word" />
    </div>
  </main>
</template>

<style scoped>
.word-desc {
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
}
</style>
