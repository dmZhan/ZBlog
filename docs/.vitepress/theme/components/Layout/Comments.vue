<!-- 文章评论区域 -->
<script setup lang="ts">
import { useData } from 'vitepress'

const { title } = useData()
</script>

<template>
  <div class="comments">
    <!-- need to do something -->
    <component
      :is="'script'"
      :key="title"
      src="https://giscus.app/client.js"
      data-repo="dmZhan/ZBlog"
      data-repo-id="R_kgDOKElQvg"
      data-category="General"
      data-category-id="DIC_kwDOKElQvs4CYnjA"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="1"
      data-input-position="top"
      data-theme="preferred_color_scheme"
      data-lang="en"
      data-loading="lazy"
      crossorigin="anonymous"
      async
    />
  </div>
</template>
