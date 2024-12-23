<script setup>
import Tags from '../../../.vitepress/theme/components/Tags.vue'; 
</script>

# {{ $frontmatter.title }}

<Tags :tags="$frontmatter.tags"/>