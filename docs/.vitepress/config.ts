import { defineConfig } from 'vitepress'
import { rss } from './theme/rss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Dog Man's blog",
  description: "Dog Man's blog",
  lastUpdated: true,
  cleanUrls: true,
  appearance: false,
  markdown: {
    lineNumbers: true
  },
  buildEnd: rss,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg',
        href: '/horse.svg'
      }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/horse.svg',
    outline: [2, 3],
    search: {
      provider: 'local'
    },
    externalLinkIcon: true,
    nav: [
      { text: '🏡Home', link: '/' },
      {
        text: "🔖Tags",
        link: "/Tags",
      },
      {
        text: "📃Archives",
        link: "/Archives",
      }
    ],
    socialLinks: [
      { 
        icon: 'github',
        link: 'https://github.com/vuejs/vitepress'
      },
      {
        icon: {
          svg: `<svg role="img" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <title>RSS</title>
                  <use xlink:href="/rss.svg#rss"/>
                </svg>`
        },
        link: '/rss.xml'
      }
    ]
  }
})
