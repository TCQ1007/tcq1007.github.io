// API 路由来获取博客文章
export default defineEventHandler(async (event) => {
  try {
    // 直接使用文件系统读取博客文章
    const fs = await import('fs')
    const path = await import('path')

    const contentDir = path.resolve(process.cwd(), 'content/blog')

    // 检查目录是否存在
    if (!fs.existsSync(contentDir)) {
      return {
        success: false,
        error: `内容目录不存在: ${contentDir}`,
        data: [],
        count: 0
      }
    }

    const files = fs.readdirSync(contentDir)
    const articles = []

    for (const file of files) {
      if (file.endsWith('.md')) {
        try {
          const filePath = path.join(contentDir, file)
          const content = fs.readFileSync(filePath, 'utf-8')

          // 解析 frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1]
            const lines = frontmatter.split('\n').filter(line => line.trim())
            const meta: any = {}

            for (const line of lines) {
              const colonIndex = line.indexOf(':')
              if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim()
                const value = line.substring(colonIndex + 1).trim().replace(/^['"]|['"]$/g, '')

                // 处理数组格式的标签
                if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
                  try {
                    meta[key] = JSON.parse(value.replace(/'/g, '"'))
                  } catch {
                    meta[key] = [value.replace(/[\[\]']/g, '')]
                  }
                } else {
                  meta[key] = value
                }
              }
            }

            // 获取文章正文（去掉 frontmatter）
            const bodyContent = content.replace(/^---\n[\s\S]*?\n---\n/, '')

            articles.push({
              _path: `/blog/${file.replace('.md', '')}`,
              title: meta.title || file.replace('.md', ''),
              description: meta.description || '',
              date: meta.date || '',
              tags: meta.tags || [],
              author: meta.author || '',
              body: bodyContent.substring(0, 200) + '...', // 预览内容
              _file: file
            })
          }
        } catch (fileError) {
          console.error(`处理文件 ${file} 时出错:`, fileError)
        }
      }
    }

    // 按日期排序
    articles.sort((a, b) => {
      const dateA = new Date(a.date || '1970-01-01')
      const dateB = new Date(b.date || '1970-01-01')
      return dateB.getTime() - dateA.getTime()
    })

    return {
      success: true,
      data: articles,
      count: articles.length,
      method: 'filesystem',
      contentDir
    }
  } catch (error) {
    console.error('API 查询博客文章错误:', error)

    return {
      success: false,
      error: error.message,
      data: [],
      count: 0
    }
  }
})
