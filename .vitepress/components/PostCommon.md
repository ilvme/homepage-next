<script setup>
import Tags from '../../.vitepress/components/Tags.vue'; 
import { useData } from 'vitepress' ;
const data = useData();
console.log(data)
</script>

# {{ $frontmatter.title }}

<Tags :tags="$frontmatter.tags"/>