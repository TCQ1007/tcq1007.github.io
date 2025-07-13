import { promises as fs } from 'fs'
import { join } from 'path'

interface ApiResponse {
  success: boolean
  frontmatter: Record<string, any>
  content: string
  rawContent?: string
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
    const filename = getRouterParam(event, 'filename')

    if (!filename) {
      throw createError({
        statusCode: 400,
        statusMessage: '文件名不能为空'
      })
    }

    const contentDir = join(process.cwd(), 'content', 'blog')
    const filePath = join(contentDir, filename)

    // 检查文件是否存在
    try {
      await fs.access(filePath)
    } catch {
      throw createError({
        statusCode: 404,
        statusMessage: `文件不存在: ${filename}`
      })
    }

    // 读取原始文件内容
    const rawContent = await fs.readFile(filePath, 'utf-8')
    
    // 解析 frontmatter 和内容
    const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    
    if (!frontmatterMatch) {
      return {
        success: true,
        frontmatter: {},
        content: rawContent
      }
    }

    const [, frontmatterStr, content] = frontmatterMatch
    
    // 简单解析 frontmatter (YAML)
    const frontmatter: Record<string, any> = {}
    const lines = frontmatterStr.split('\n')

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const colonIndex = trimmed.indexOf(':')
      if (colonIndex === -1) continue

      const key = trimmed.substring(0, colonIndex).trim()
      let value = trimmed.substring(colonIndex + 1).trim()

      // 移除引号
      if ((value.startsWith("'") && value.endsWith("'")) ||
          (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1)
      }

      // 处理数组 (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1)
        if (arrayContent.trim()) {
          frontmatter[key] = arrayContent
            .split(',')
            .map((item: string) => item.trim().replace(/^['"]|['"]$/g, ''))
            .filter((item: string) => item)
        } else {
          frontmatter[key] = []
        }
      } else {
        frontmatter[key] = value
      }
    }

    return {
      success: true,
      frontmatter,
      content: content.trim(),
      rawContent
    }
  } catch (error) {
    console.error('获取文章原始内容失败:', error)

    // 类型守卫处理错误
    const isHttpError = error && typeof error === 'object' && 'statusCode' in error

    throw createError({
      statusCode: isHttpError ? (error as any).statusCode : 500,
      statusMessage: isHttpError ? (error as any).statusMessage : '获取文章失败'
    })
  }
})
