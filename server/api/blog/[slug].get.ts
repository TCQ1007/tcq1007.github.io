// API 路由来获取单篇博客文章
export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    
    if (!slug) {
      return {
        success: false,
        error: '缺少文章 slug 参数',
        data: null
      }
    }
    
    // 直接使用文件系统读取文章
    const fs = await import('fs')
    const path = await import('path')
    
    const contentDir = path.resolve(process.cwd(), 'content/blog')
    const filePath = path.join(contentDir, `${slug}.md`)
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return {
        success: false,
        error: `文章文件不存在: ${slug}.md`,
        data: null
      }
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      
      // 解析 frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
      if (!frontmatterMatch) {
        return {
          success: false,
          error: '文章格式错误：缺少 frontmatter',
          data: null
        }
      }
      
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
      
      const article = {
        _path: `/blog/${slug}`,
        title: meta.title || slug,
        description: meta.description || '',
        date: meta.date || '',
        tags: meta.tags || [],
        author: meta.author || '',
        body: bodyContent,
        _file: `${slug}.md`
      }
      
      return {
        success: true,
        data: article
      }
    } catch (fileError) {
      return {
        success: false,
        error: `读取文件时出错: ${fileError.message}`,
        data: null
      }
    }
  } catch (error) {
    console.error('API 查询单篇文章错误:', error)
    
    return {
      success: false,
      error: error.message,
      data: null
    }
  }
})
