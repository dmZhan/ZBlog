<script setup lang='ts'>
import { VPTeamMembers } from 'vitepress/theme'
import telegram from '/telegram.svg?raw'
import email from '/email.svg?raw'
import type { DefaultTheme } from 'vitepress'

const members: DefaultTheme.TeamMember[] = [
  {
    avatar: '/avatar.jpg',
    name: 'DogMan',
    title: 'Owner',
    links: [
      { icon:'github', link: 'https://github.com/dmZhan' },
      { icon: 'twitter', link: 'https://github.com/dmZhan' },
      { icon: { svg: telegram }, link: 'https://github.com/dmZhan' },
      { icon: { svg: email }, link: 'https://github.com/dmZhan' },
    ]
  }
]
</script>

<template>
  <VPTeamMembers size="small" :members="members"></VPTeamMembers>
</template>

