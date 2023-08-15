import { type ContentData, type SiteConfig, createContentLoader } from "vitepress"
import { Feed } from 'feed'
import { writeFileSync } from 'fs'
import path from 'path'

const id: string = 'dmZhan'
const baseURL: string = 'https://bmei.love'
type RssGenerator = (config: SiteConfig) => Promise<void>
export const rss: RssGenerator = async(config) =>{
  const feed: Feed = new Feed({
    title: `${id}'s blog`,
    description: 'My Personal Blog',
    id: baseURL,
    link: baseURL,
    language: 'zh-CN',
    image: `${baseURL}/avatar.jpg`,
    favicon: `${baseURL}/favicon.svg`,
    copyright: `Copyright (c) 2023 ${id}`
  })

  const posts: ContentData[] = await createContentLoader('posts/*.md', {
    excerpt: true,
    render: true,
    transform: (rawData) => {
      return rawData.sort((a,b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
    }
  }).load()

  for(const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title as string,
      id: `${baseURL}${url}`,
      link: `${baseURL}${url}`,
      description: excerpt as string,
      content: html as string,
      author: [{ name: `${id}` }],
      date: frontmatter.date
    })
  }

  writeFileSync(path.join(config.outDir, 'rss.xml'), feed.rss2())
}
