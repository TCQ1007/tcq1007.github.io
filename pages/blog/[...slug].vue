<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 返回按钮 -->
    <div class="mb-8">
      <NuxtLink 
        to="/" 
        class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        ← 返回首页
      </NuxtLink>
    </div>

    <!-- 文章内容 -->
    <article v-if="article" class="max-w-4xl mx-auto">
      <!-- 文章头部 -->
      <header class="mb-8 pb-8 border-b border-gray-200">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ article.title }}
        </h1>
        
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          <span>发布时间: {{ formatDate(article.date) }}</span>
          <span v-if="article.author">作者: {{ article.author }}</span>
        </div>
        
        <p v-if="article.description" class="text-xl text-gray-600 leading-relaxed">
          {{ article.description }}
        </p>
        
        <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2 mt-4">
          <span 
            v-for="tag in article.tags" 
            :key="tag"
            class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- 文章正文 -->
      <div class="prose prose-lg max-w-none">
        <!-- 使用 v-html 渲染 Markdown 内容 -->
        <div v-if="article.body" v-html="renderedContent"></div>
        <div v-else>
          <p>文章内容加载中...</p>
        </div>
      </div>

      <!-- 文章底部 -->
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            <p>最后更新: {{ formatDate(article.date) }}</p>
          </div>
          
          <div class="flex items-center space-x-4">
            <NuxtLink 
              to="/" 
              class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              查看更多文章
            </NuxtLink>
          </div>
        </div>
      </footer>
    </article>

    <!-- 加载状态 -->
    <div v-else-if="pending" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else class="text-center py-12">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
      <p class="text-gray-600 mb-8">抱歉，您访问的文章不存在或已被删除。</p>
      <NuxtLink 
        to="/" 
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const slug = route.params.slug

// 构建文章路径
const articlePath = Array.isArray(slug) ? `/blog/${slug.join('/')}` : `/blog/${slug}`

// 获取文章内容
const { data: apiResponse, pending } = await useAsyncData(`article-${articlePath}`, async () => {
  try {
    // 使用 API 路由获取文章
    const response = await $fetch(`/api/blog/${slug}`)
    console.log('文章 API 响应:', response)
    return response
  } catch (err) {
    console.error('API 查询文章错误:', err)
    return { success: false, data: null, error: err.message }
  }
})

// 从 API 响应中提取文章数据
const article = computed(() => {
  return apiResponse.value?.success ? apiResponse.value.data : null
})

// 简单的 Markdown 渲染（基础版本）
const renderedContent = computed(() => {
  if (!article.value?.body) return ''

  let html = article.value.body

  // 基础 Markdown 转换
  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // 粗体和斜体
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
  html = html.replace(/\*(.*)\*/gim, '<em>$1</em>')

  // 代码块
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>')

  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // 列表
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')

  // 段落
  html = html.replace(/\n\n/gim, '</p><p>')
  html = '<p>' + html + '</p>'

  // 清理多余的 p 标签
  html = html.replace(/<p><\/p>/gim, '')
  html = html.replace(/<p>(<h[1-6]>)/gim, '$1')
  html = html.replace(/(<\/h[1-6]>)<\/p>/gim, '$1')
  html = html.replace(/<p>(<ul>)/gim, '$1')
  html = html.replace(/(<\/ul>)<\/p>/gim, '$1')
  html = html.replace(/<p>(<pre>)/gim, '$1')
  html = html.replace(/(<\/pre>)<\/p>/gim, '$1')

  return html
})

// 如果文章不存在，抛出 404 错误
if (!article.value && !pending.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到'
  })
}

// 设置页面元数据
useHead(() => {
  if (!article.value) return {}
  
  return {
    title: `${article.value.title} - 技术博客`,
    meta: [
      {
        name: 'description',
        content: article.value.description || '技术博客文章'
      },
      {
        property: 'og:title',
        content: article.value.title
      },
      {
        property: 'og:description',
        content: article.value.description || '技术博客文章'
      },
      {
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'article:published_time',
        content: article.value.date
      },
      {
        property: 'article:author',
        content: article.value.author || '未知作者'
      },
      ...(article.value.tags || []).map(tag => ({
        property: 'article:tag',
        content: tag
      }))
    ]
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
/* 全局基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

body {
  background-color: #f8fafc;
  min-height: 100vh;
}

/* 工具类 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-4xl { font-size: 2.25rem; }

.text-gray-600 { color: #6b7280; }
.text-gray-900 { color: #111827; }
.text-blue-600 { color: #2563eb; }
.text-blue-800 { color: #1e40af; }

.bg-white { background-color: #ffffff; }
.bg-blue-100 { background-color: #dbeafe; }
.bg-blue-600 { background-color: #2563eb; }
.bg-blue-700 { background-color: #1d4ed8; }

.rounded-lg { border-radius: 0.5rem; }
.rounded-full { border-radius: 9999px; }

.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }

.mx-auto { margin-left: auto; margin-right: auto; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-4 { margin-top: 1rem; }
.mt-12 { margin-top: 3rem; }

.max-w-4xl { max-width: 56rem; }
.max-w-none { max-width: none; }

.flex { display: flex; }
.inline-flex { display: inline-flex; }
.inline-block { display: inline-block; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.flex-wrap { flex-wrap: wrap; }
.space-x-4 > * + * { margin-left: 1rem; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }

.h-12 { height: 3rem; }
.w-12 { width: 3rem; }

.border-t { border-top: 1px solid #e5e7eb; }
.border-b { border-bottom: 1px solid #e5e7eb; }
.border-gray-200 { border-color: #e5e7eb; }
.pb-8 { padding-bottom: 2rem; }
.pt-8 { padding-top: 2rem; }

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
}

.hover\:text-blue-800:hover { color: #1e40af; }
.hover\:bg-blue-700:hover { background-color: #1d4ed8; }

/* 动画 */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
  border-radius: 50%;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #2563eb;
}

/* 链接样式 */
a {
  text-decoration: none;
  transition: color 0.2s ease;
}

/* 自定义 prose 样式 */
.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h1 {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.prose h2 {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.prose h3 {
  font-size: 1.5rem;
  line-height: 2rem;
}

.prose p {
  margin-bottom: 1.25rem;
}

.prose ul,
.prose ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #dc2626;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

.prose blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #6b7280;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
}

.prose a:hover {
  color: #1d4ed8;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.prose th,
.prose td {
  border: 1px solid #d1d5db;
  padding: 0.75rem;
  text-align: left;
}

.prose th {
  background-color: #f9fafb;
  font-weight: 600;
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}
</style>
