// API 路由来获取博客文章 - 使用最新的 Nuxt Content 3 语法
export default defineEventHandler(async (event) => {
  try {
    // 使用最新的 queryCollection API
    const articles = await queryCollection(event, 'blog')
      .order('date', 'DESC')
      .all()

    return {
      success: true,
      data: articles,
      count: articles.length,
      method: 'queryCollection'
    }
  } catch (error) {
    console.error('查询博客文章错误:', error)

    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      data: [],
      count: 0
    }
  }
})
