<script setup>
import { Content, useData } from 'vitepress'
import { computed } from 'vue'

defineProps({ tags: {} })

const data = useData()

const bgColor = computed(() => (data.isDark.value ? '#333' : '#f3f1f1'))
const textColor = computed(() => (data.isDark.value ? '#fff' : '#000'))
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 10px">
    <div v-for="tag in tags" class="tag-item" :key="tag">
      <span>#</span>
      <span>{{ tag }}</span>
    </div>
  </div>
</template>

<style scoped>
.tag-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  background-color: v-bind(bgColor);
  color: v-bind(textColor);
  margin-top: 10px;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-style: italic;
}
</style>
