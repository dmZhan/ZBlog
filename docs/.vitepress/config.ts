import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Dog Man's blog",
  description: "Dog Man's blog",
  lastUpdated: true,
  cleanUrls: true,
  // appearance: false,
  markdown: {
    lineNumbers: true
  },
  buildEnd: ()=>console.log(123),
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/horse.svg' },
    outline: [2, 3],
    search: {
      provider: 'local'
    },
    nav: [
      { text: '🏡Home', link: '/' },
      {
        text: "🔖Tags",
        link: "/Tags",
      },
      {
        text: "📃Archives",
        link: "/Archives",
      },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
