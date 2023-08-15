<script setup lang='ts'>
import { onContentUpdated, useData } from 'vitepress';
import { ref, shallowRef } from 'vue';

const { frontmatter, theme } = useData()
const headers = shallowRef<any>([])
const showIndent = ref(false)
onContentUpdated(()=>{
  // headers.value = 
})
</script>

<template>
  
</template>

<style scoped>

</style>
