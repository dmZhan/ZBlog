<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Avatar from '../Avatar.vue'
import Comments from './Comments.vue'
import Hero from './Hero.vue'
import Page from './Page.vue'
import Progress from './Progress.vue'
import CopyWright from './CopyWright.vue'
// import Title from './Title.vue'
// import Category from './Category.vue'


const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-top>
      <Progress />
    </template>
    <!-- <template #doc-before>
      <Title />
      <Category />
    </template> -->
    <template #doc-after>
      <Comments />
    </template>
    <template #aside-outline-before>
      <Avatar />
    </template>
    <template #home-hero-before>
      <Hero />
    </template>
    <template #home-hero-after>
      <Page />
    </template>
  </Layout>
  <CopyWright />
</template>
