<!-- 网站最下方版权申明 -->
<template>
  <footer>
    Powered by
    <a href="https://github.com/dmZhan/" target="_blank" title="作者"
      >Dog Man</a
    >
    | Copyright © 2019-{{ date }} | MIT License
  </footer>
</template>

<script lang="ts" setup>
const date = new Date().getFullYear();
</script>

<style scoped>
footer {
  text-align: center;
  position: relative;
  width: 100%;
  bottom: 20px;
  padding: 0 20px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
}
a {
  color: var(--vp-c-brand);
  font-weight: bold;
}
a:hover {
  text-decoration: none;
  color: var(--vp-c-hover);
}
</style>
