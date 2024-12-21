<script setup>
import { ref } from 'vue'
import { Octokit } from '@octokit/rest'
import oldWordsRaw from '../../scripts/old-words.raw.js'
import parseCSV from '../../scripts/words.js'

defineOptions({ name: 'Words' })

const octokit = new Octokit()

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
      updated_at: formatPublishTime(item.updated_at),
    }))
    words.value.push(...parseCSV(oldWordsRaw))
    console.log(words.value)
    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('获取说说数据失败：', error)
  }
}

// 获取所有标签数据
const fetchLabels = async () => {
  try {
    const { data } = await octokit.issues.listLabelsForRepo({
      owner: 'kangjia96',
      repo: 'daily-words',
    })
    labels.value = data
    console.log('label', labels.value)
  } catch (error) {
    console.error('获取标签数据失败：', error)
  }
}

// 格式化发布时间函数
const formatPublishTime = (date) => {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 页面加载时调用获取说说数据的函数
fetchWords()
fetchLabels()
</script>

<template>
  <main style="width: 80%; margin: 0 auto">
    <h1 style="margin: 20px 0; font-weight: bolder; font-size: 1.75rem">
      说说 <Badge type="warning" text="功能内测中，不稳定" />
    </h1>
    <div style="background-color: #322a02; padding: 10px; border-radius: 10px">
      说说（Daily Words):一句话叙当前所历之事，一句话抒此刻难言之情，一句话吐所遇违心之槽。
    </div>
    <div>
      <p>合计：{{ words.length }} 个说说。</p>
      <p>
        <span>标签：</span>
        <span v-for="label in labels" :key="label.id" style="margin-right: 10px">
          #{{ label.name }}
        </span>
      </p>
    </div>
    <div v-if="loading" style="text-align: center">loading.......</div>
    <div v-else-if="!loading && words.length === 0" style="text-align: center">empty~</div>
    <div v-else style="display: flex; flex-wrap: wrap">
      <div v-for="word in words" :key="word.id" class="talk-item">
        <p>{{ word.body }}</p>
        <p style="display: flex; gap: 10px; margin: 5px 0">
          <span style="font-size: 0.8em" v-for="label in word.labels" :key="label.id">
            #{{ label.name }}
          </span>
        </p>
        <p style="text-align: right; font-size: 0.8em">{{ word.updated_at }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.talk-item {
  border: rebeccapurple 1px solid;
  padding: 10px;
  margin: 10px;
}
</style>
