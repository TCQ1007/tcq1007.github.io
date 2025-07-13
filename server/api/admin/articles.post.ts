import { promises as fs } from 'fs'
import { join } from 'path'

interface RequestBody {
  frontmatter: {
    title: string
    description: string
    date: string
    tags: string[]
    author: string
    category: string
  }
  content: string
  filename: string
  action: 'save' | 'delete'
}

interface ApiResponse {
  success: boolean
  message: string
  path?: string
}

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  // 检查是否为生产环境
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found'
    })
  }

  try {
    const body = await readBody(event) as RequestBody
    const { frontmatter, content, filename, action } = body

    const contentDir = join(process.cwd(), 'content', 'blog')
    const filePath = join(contentDir, filename)

    if (action === 'save') {
      // 构建 Markdown 文件内容
      const markdownContent = `---
title: '${frontmatter.title}'
description: '${frontmatter.description}'
date: '${frontmatter.date}'
tags: [${frontmatter.tags.map(tag => `'${tag}'`).join(', ')}]
author: '${frontmatter.author}'
category: '${frontmatter.category}'
---

${content}
`

      // 确保目录存在
      await fs.mkdir(contentDir, { recursive: true })

      // 写入文件
      await fs.writeFile(filePath, markdownContent, 'utf-8')

      return {
        success: true,
        message: '文章保存成功',
        path: filePath
      }
    } else if (action === 'delete') {
      // 删除文件
      await fs.unlink(filePath)
      
      return {
        success: true,
        message: '文章删除成功'
      }
    }

    return {
      success: false,
      message: '未知操作'
    }
  } catch (error) {
    console.error('文章操作失败:', error)

    // 类型守卫处理错误
    const errorMessage = error instanceof Error ? error.message : '操作失败'

    return {
      success: false,
      message: errorMessage
    }
  }
})
