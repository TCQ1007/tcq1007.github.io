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
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),

    // 项目文档集合
    docs: defineCollection({
      type: 'page',
      source: 'docs/*.md',
      // 定义文档的 schema
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
