// 自定义 composable 来处理内容查询
export const useContentQuery = () => {
  // 尝试获取 queryContent 函数
  const getQueryContent = () => {
    // 在客户端和服务端都尝试获取 queryContent
    if (process.server) {
      // 服务端
      try {
        const { queryContent } = require('@nuxt/content/dist/runtime/server')
        return queryContent
      } catch (err) {
        console.error('服务端 queryContent 导入失败:', err)
        return null
      }
    } else {
      // 客户端
      try {
        // 尝试从全局获取
        const nuxtApp = useNuxtApp()
        if (nuxtApp.$content) {
          return (path: string) => nuxtApp.$content(path)
        }
        
        // 尝试从 window 获取
        if (typeof window !== 'undefined' && (window as any).queryContent) {
          return (window as any).queryContent
        }
        
        return null
      } catch (err) {
        console.error('客户端 queryContent 获取失败:', err)
        return null
      }
    }
  }

  const queryBlogPosts = async () => {
    try {
      const queryContent = getQueryContent()
      if (!queryContent) {
        throw new Error('queryContent 不可用')
      }

      // 查询博客文章
      const posts = await queryContent('/blog').sort({ date: -1 }).find()
      return posts
    } catch (err) {
      console.error('查询博客文章失败:', err)
      return []
    }
  }

  const queryAllContent = async () => {
    try {
      const queryContent = getQueryContent()
      if (!queryContent) {
        throw new Error('queryContent 不可用')
      }

      // 查询所有内容
      const content = await queryContent().find()
      return content
    } catch (err) {
      console.error('查询所有内容失败:', err)
      return []
    }
  }

  const queryContentByPath = async (path: string) => {
    try {
      const queryContent = getQueryContent()
      if (!queryContent) {
        throw new Error('queryContent 不可用')
      }

      // 查询特定路径的内容
      const content = await queryContent(path).findOne()
      return content
    } catch (err) {
      console.error('查询内容失败:', err)
      return null
    }
  }

  return {
    queryBlogPosts,
    queryAllContent,
    queryContentByPath
  }
}
