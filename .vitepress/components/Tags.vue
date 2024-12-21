<script setup>
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
  <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px">
    <!--    <Badge type="danger" :text="formatTime($frontmatter.date, 'YYYY-MM-DD')" />-->
    <!--    <Badge :text="$frontmatter.category" />-->
    <Badge v-for="tag in tags" :key="tag" type="tip" :text="'# ' + tag" />
  </div>
</template>

<style scoped></style>
