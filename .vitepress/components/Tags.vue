<script setup>
import { formatTime } from '../../scripts/utils.js'

defineProps({
  tags: {
    type: Array,
    default: () => {
      return []
    },
  },
})
</script>

<template>
  <div style="display: flex; align-items: center; gap: 5px; margin-top: 10px">
    <Badge type="danger" :text="formatTime($frontmatter.date, 'YYYY-MM-DD')" />
    <Badge type="warning" :text="$frontmatter.category" />
    <Badge v-for="tag in tags" :key="tag" type="info" :text="'# ' + tag" />
  </div>
</template>

<style scoped></style>
