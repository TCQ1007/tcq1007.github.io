<template>
  <div style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; font-family: Arial, sans-serif;">
    <!-- 博客头部 -->
    <header style="text-align: center; margin-bottom: 3rem;">
      <h1 style="font-size: 2.5rem; font-weight: bold; color: #111827; margin-bottom: 1rem;">
        技术博客
      </h1>
      <p style="font-size: 1.25rem; color: #6b7280; max-width: 42rem; margin: 0 auto;">
        基于 Nuxt 3 和 Cloudflare Workers 的现代化博客平台
      </p>
    </header>

    <!-- 博客文章列表 -->
    <main>
      <div style="max-width: 56rem; margin: 0 auto;">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: #111827; margin-bottom: 2rem;">最新文章</h2>

        <div v-if="pending" style="text-align: center; padding: 2rem 0;">
          <div style="width: 3rem; height: 3rem; border: 2px solid #f3f4f6; border-top: 2px solid #2563eb; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
          <p style="margin-top: 1rem; color: #6b7280;">加载中...</p>
        </div>

        <div v-else-if="error" style="text-align: center; padding: 2rem 0;">
          <p style="color: #dc2626;">加载文章时出错: {{ error }}</p>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">
            <a href="/debug" style="color: blue; text-decoration: underline;">查看调试信息</a>
          </p>
        </div>

        <div v-else-if="articles && articles.length > 0" style="display: flex; flex-direction: column; gap: 2rem;">
          <article
            v-for="article in articles"
            :key="article._path"
            style="background: white; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; transition: box-shadow 0.3s ease;"
          >
            <div style="padding: 1.5rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <span style="font-size: 0.875rem; color: #6b7280;">
                    {{ formatDate(article.date) }}
                  </span>
                  <span style="font-size: 0.875rem; color: #6b7280;">
                    作者: {{ article.author || '未知' }}
                  </span>
                </div>
              </div>

              <h3 style="font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem;">
                <NuxtLink
                  :to="article.path"
                  style="color: inherit; text-decoration: none; transition: color 0.2s ease;"
                  @mouseover="$event.target.style.color = '#2563eb'"
                  @mouseout="$event.target.style.color = '#111827'"
                >
                  {{ article.title }}
                </NuxtLink>
              </h3>

              <p style="color: #6b7280; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                {{ article.description }}
              </p>

              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                  <span
                    v-for="tag in article.tags"
                    :key="tag"
                    style="padding: 0.25rem 0.75rem; background: #dbeafe; color: #1e40af; font-size: 0.875rem; border-radius: 9999px;"
                  >
                    {{ tag }}
                  </span>
                </div>

                <NuxtLink
                  :to="article.path"
                  style="color: #2563eb; font-weight: 500; text-decoration: none; transition: color 0.2s ease;"
                  @mouseover="$event.target.style.color = '#1e40af'"
                  @mouseout="$event.target.style.color = '#2563eb'"
                >
                  阅读更多 →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <div v-else style="text-align: center; padding: 3rem 0;">
          <p style="color: #6b7280; font-size: 1.125rem;">暂无文章</p>
          <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
            调试信息: articles = {{ articles }}, pending = {{ pending }}, error = {{ error }}
          </p>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">
            <a href="/debug" style="color: blue; text-decoration: underline;">查看详细调试信息</a> |
            <a href="/simple" style="color: blue; text-decoration: underline;">简单测试页面</a>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 移除手动导入，依赖自动导入

// 设置页面元数据
useHead({
  title: '技术博客 - 基于 Nuxt 3 和 Cloudflare Workers',
  meta: [
    {
      name: 'description',
      content: '基于 Nuxt 3 和 Cloudflare Workers 的现代化技术博客平台，分享前端开发、全栈技术和云计算相关内容。'
    },
    {
      property: 'og:title',
      content: '技术博客 - 基于 Nuxt 3 和 Cloudflare Workers'
    },
    {
      property: 'og:description',
      content: '基于 Nuxt 3 和 Cloudflare Workers 的现代化技术博客平台'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})

// 获取博客文章列表 - 使用最新的 Nuxt Content 3 语法
const { data: articles, pending, error } = await useAsyncData('blog-articles', async () => {
  try {
    console.log('开始使用 queryCollection 查询博客文章...')

    // 直接使用 queryCollection 查询博客文章
    const result = await queryCollection('blog')
      .order('date', 'DESC')
      .all()

    console.log('queryCollection 查询结果:', result)

    return result || []
  } catch (err) {
    console.error('queryCollection 查询博客文章错误:', err)
    console.error('错误详情:', err.message)

    // 如果 queryCollection 失败，回退到 API 方式
    try {
      console.log('回退到 API 查询方式...')
      const response = await $fetch('/api/blog')
      return response?.success ? response.data : []
    } catch (apiErr) {
      console.error('API 查询也失败:', apiErr)
      return []
    }
  }
})

// 格式化日期的辅助函数
const formatDate = (dateString) => {
  if (!dateString) return '未知日期'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return '日期格式错误'
  }
}
</script>

<style>
@keyframes spin {
  to { transform: rotate(360deg); }
}

body {
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
