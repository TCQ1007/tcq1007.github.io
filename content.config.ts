import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // 博客文章集合
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      // 定义博客文章的 schema
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string(),
        tags: z.array(z.string())
      })
    })
  }

  // 使用默认的语法高亮主题，通常有更好的对比度
})
