<script setup>
defineProps({
  word: { type: Object, required: true },
})
</script>

<template>
  <p class="talk-item">
    <p>{{ word.body }}</p>
    <p style="display: flex; gap: 10px; margin: 5px 0">
      <span style="font-size: 0.8em" v-for="label in word.labels" :key="label.id">
        #{{ label.name }}
      </span>
    </p>
    <p style="text-align: right; font-size: 0.8em">{{ word.updated_at }}</p>
  </p>
</template>

<style scoped lang="less">
.talk-item {
  max-width: 333px;
  min-width: 200px;
  height: fit-content;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: var(--vp-c-bg-alt);

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}
</style>
