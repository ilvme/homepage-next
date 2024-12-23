<script setup>
import { friends } from '../../../scripts/friends.js'
const to = (url) => {
  window.open(url)
}
</script>

<template>
  <div v-if="friends.length === 0">空空如也～</div>
  <div class="friends" v-else>
    <div @click="to(item.link)" class="friends-item" v-for="item in friends" :key="item.link">
      <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
        <img :src="item.icon" :alt="item.title" class="avatar" />
        <div class="title">{{ item.title }}</div>
      </div>
      <div class="desc">{{ item.desc }}</div>
    </div>
  </div>
</template>

<style scoped>
.friends {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}
.friends-item {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 300px;
  height: 120px;
  padding: 10px 16px;
  border: 1px solid var(--vp-code-copy-code-hover-border-color);
  cursor: pointer;
  border-radius: 8px;
}
.friends-item:hover {
  background: var(--vp-c-bg-alt);
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.title {
  margin-top: 8px;
  color: var(--vp-c-text-1);
  text-align: center;
  font-size: 1.15rem;
  font-weight: bold;
}
.desc {
  margin-top: 8px;
  color: #666;
  font-size: 0.75rem;
  line-height: 1.5;
}
</style>
