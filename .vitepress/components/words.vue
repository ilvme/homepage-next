<script setup>
import { ref } from 'vue'
import axios from 'axios'

defineOptions({ name: 'Words' })

import { useData } from 'vitepress'

const { isDark } = useData()

console.log(isDark.value)

const talks = ref([])

// 调用后端接口获取说说数据
const fetchTalks = async () => {
  try {
    const response = await axios.get('http://localhost:9999/api/v1/daily-words')
    console.log(response)
    talks.value = response.data
  } catch (error) {
    console.error('获取说说数据失败：', error)
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
fetchTalks()
</script>

<template>
  <main>
    <div style="display: flex; flex-wrap: wrap">
      <div v-for="(talk, index) in talks" :key="index" class="talk-item">
        <p class="talk-content">{{ talk.content }}</p>
        <p style="display: flex; gap: 10px; margin: 10px 0">
          <span style="font-size: 0.8em" v-for="(tag, tagIndex) in talk.tags" :key="tagIndex">
            #{{ tag }}
          </span>
        </p>
        <p style="text-align: right; font-size: 0.8em">{{ formatPublishTime(talk.publishTime) }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.talk-item {
  background-color: #fdfcfc;
  border: #e8e8e8 1px solid;
  padding: 10px;
  margin: 10px;
}
</style>
