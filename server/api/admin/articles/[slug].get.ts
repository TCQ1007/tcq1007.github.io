import { promises as fs } from 'fs'
import { join } from 'path'

interface ApiResponse {
  success: boolean
  frontmatter: Record<string, any>
  content: string
  rawContent?: string
}

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  try {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing slug parameter'
      })
    }

    const contentDir = join(process.cwd(), 'content', 'blog')
    const filePath = join(contentDir, `${slug}.md`)

    // 检查文件是否存在
    try {
      await fs.access(filePath)
    } catch (accessError) {
      throw createError({
        statusCode: 404,
        statusMessage: `Article not found: ${filePath}`
      })
    }

    // 读取原始 Markdown 文件内容
    const rawContent = await fs.readFile(filePath, 'utf-8')

    // 简单分离 frontmatter 和内容
    const frontmatterMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)

    if (!frontmatterMatch) {
      return {
        success: true,
        frontmatter: {},
        content: rawContent,
        rawContent
      }
    }

    const [, frontmatterStr, content] = frontmatterMatch

    // 简单解析 frontmatter - 更宽松的解析
    const frontmatter: Record<string, any> = {}
    frontmatterStr.split(/\r?\n/).forEach(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        const value = line.substring(colonIndex + 1).trim()

        // 处理不同类型的值
        if (value.startsWith('[') && value.endsWith(']')) {
          // 数组类型 (tags)
          frontmatter[key] = value.slice(1, -1).split(',').map((item: string) =>
            item.trim().replace(/^['"]|['"]$/g, '')
          ).filter((item: string) => item.length > 0)
        } else {
          // 字符串类型，移除引号
          frontmatter[key] = value.replace(/^['"]|['"]$/g, '')
        }
      }
    })

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
