<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'resume',
  },
})

const downloads = ref([
  { label: 'PDF', name: props.name + '.pdf', url: '/files/resume.pdf' },
  { label: 'MD', name: props.name + '.md', url: '/files/resume.md' },
])
</script>

<template>
  <div class="resume-downloader">
    <span>简历下载：</span>
    <a v-for="item in downloads" :key="item.label" :href="item.url" :download="item.name">
      {{ item.label }}
    </a>
  </div>
</template>

<style scoped>
.resume-downloader {
  display: flex;
  justify-content: end;
  align-items: baseline;
  gap: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}
</style>
