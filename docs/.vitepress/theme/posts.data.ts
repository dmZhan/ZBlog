import { createContentLoader } from 'vitepress'

interface ContentData {
  // mapped absolute URL for the page. e.g. /posts/hello.html
  url: string
  // frontmatter data of the page
  frontmatter: Record<string, any>

  // the following are only present if relevant options are enabled
  // we will discuss them below
  src: string | undefined
  html: string | undefined
  excerpt: string | undefined
}
declare const data: ContentData[]
export { data }

export default createContentLoader('posts/*.md', {
  transform(rowData: ContentData[]) {
    return rowData
    // return rowData.filter(m => !m.frontmatter.private)
  }
})
