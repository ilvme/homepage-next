<script setup>
import Tags from '../../../.vitepress/components/Tags.vue'; 
</script>

# {{ $frontmatter.title }}

<Tags :tags="$frontmatter.tags"/>