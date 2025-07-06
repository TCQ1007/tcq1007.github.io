// API 路由来获取单篇博客文章 - 使用最新的 Nuxt Content 3 语法
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

    // 使用最新的 queryCollection API 查询单篇文章
    const article = await queryCollection(event, 'blog')
      .path(`/blog/${slug}`)
      .first()

    if (!article) {
      return {
        success: false,
        error: `文章不存在: ${slug}`,
        data: null
      }
    }

    return {
      success: true,
      data: article,
      method: 'queryCollection'
    }
  } catch (error) {
    console.error('查询单篇文章错误:', error)

    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      data: null
    }
  }
})
