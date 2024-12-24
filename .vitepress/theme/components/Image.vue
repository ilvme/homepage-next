<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Images' })

const props = defineProps({
  src: String,
  alt: String,
  width: { type: String, default: '30%' },
})
const imgBasePath = '/images/article/'
const realSrc = ref(imgBasePath + props.src)
</script>

<template>
  <div class="img-container">
    <img :src="realSrc" :alt="alt" :width="width" />
    <span class="img-desc">{{ alt }}</span>
  </div>
</template>

<style scoped lang="less">
.img-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-right: 20px;

  .img-desc {
    color: var(--vp-c-text-3);
    font-size: 0.75rem;
  }
}
</style>
