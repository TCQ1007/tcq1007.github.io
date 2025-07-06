<template>
  <div style="background: #0a0e27; min-height: 100vh; color: #ffffff;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <!-- 返回按钮 -->
      <div style="margin-bottom: 2rem;">
        <NuxtLink
          to="/"
          style="display: inline-flex; align-items: center; color: #63b3ed; text-decoration: none; font-weight: 500; transition: color 0.2s ease; padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #63b3ed;"
          @mouseover="$event.target.style.background = 'rgba(99, 179, 237, 0.1)'"
          @mouseout="$event.target.style.background = 'transparent'"
        >
          ← 返回首页
        </NuxtLink>
      </div>

      <!-- 文章内容 -->
      <article v-if="article" style="max-width: 56rem; margin: 0 auto;">
        <!-- 文章头部 -->
        <header style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #4a5568;">
          <!-- 分类标签 -->
          <div v-if="article.category" style="margin-bottom: 1rem;">
            <span style="padding: 0.5rem 1rem; background: linear-gradient(45deg, #63b3ed, #68d391); color: #1a202c; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
              {{ getCategoryInfo(article.category).icon }} {{ article.category }}
            </span>
          </div>

          <h1 style="font-size: 2.5rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem; line-height: 1.2;">
            {{ article.title }}
          </h1>

          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; font-size: 0.875rem; color: #e2e8f0; margin-bottom: 1rem;">
            <span style="display: flex; align-items: center; gap: 0.25rem;">
              📅 {{ formatDate(article.date) }}
            </span>
            <span v-if="article.author" style="display: flex; align-items: center; gap: 0.25rem;">
              👤 {{ article.author }}
            </span>
            <span v-if="article.readingTime" style="display: flex; align-items: center; gap: 0.25rem;">
              ⏱️ {{ article.readingTime }} 分钟阅读
            </span>
          </div>

          <p v-if="article.description" style="font-size: 1.125rem; color: #ffffff; line-height: 1.6; opacity: 0.9; margin-bottom: 1.5rem;">
            {{ article.description }}
          </p>

          <div v-if="article.tags && article.tags.length > 0" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span
              v-for="tag in article.tags"
              :key="tag"
              style="padding: 0.25rem 0.75rem; background: rgba(99, 179, 237, 0.2); color: #63b3ed; font-size: 0.75rem; border-radius: 12px; border: 1px solid rgba(99, 179, 237, 0.3);"
            >
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- 文章正文 -->
        <div style="max-width: none; color: #ffffff; line-height: 1.75;">
          <!-- 使用 Nuxt Content 3 的 ContentRenderer 组件 -->
          <ContentRenderer v-if="article" :value="article" class="content-renderer" />
          <div v-else style="text-align: center; padding: 2rem 0;">
            <p style="color: #a0aec0;">文章内容加载中...</p>
          </div>
        </div>

        <!-- 文章底部 -->
        <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #4a5568;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div style="font-size: 0.875rem; color: #a0aec0;">
              <p>最后更新: {{ formatDate(article.date) }}</p>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <NuxtLink
                to="/"
                style="color: #63b3ed; text-decoration: none; font-weight: 500; transition: all 0.2s ease; padding: 0.5rem 1rem; border: 1px solid #63b3ed; border-radius: 6px;"
                @mouseover="$event.target.style.background = 'rgba(99, 179, 237, 0.1)'"
                @mouseout="$event.target.style.background = 'transparent'"
              >
                查看更多文章
              </NuxtLink>
            </div>
          </div>
        </footer>
      </article>

      <!-- 加载状态 -->
      <div v-else-if="pending" style="text-align: center; padding: 3rem 0;">
        <div style="width: 3rem; height: 3rem; border: 2px solid #4a5568; border-top: 2px solid #63b3ed; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        <p style="margin-top: 1rem; color: #f7fafc; font-weight: 500;">加载中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else style="text-align: center; padding: 3rem 0;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">📄</div>
        <h1 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">文章未找到</h1>
        <p style="color: #a0aec0; margin-bottom: 2rem;">抱歉，您访问的文章不存在或已被删除。</p>
        <NuxtLink
          to="/"
          style="display: inline-block; background: linear-gradient(45deg, #63b3ed, #68d391); color: #1a202c; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: transform 0.2s ease;"
          @mouseover="$event.target.style.transform = 'scale(1.05)'"
          @mouseout="$event.target.style.transform = 'scale(1)'"
        >
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const slug = route.params.slug

// 构建文章路径
const articlePath = Array.isArray(slug) ? `/blog/${slug.join('/')}` : `/blog/${slug}`

// 获取文章内容 - 使用 Nuxt Content 3 标准 API
const { data: article, pending, error } = await useAsyncData(`article-${articlePath}`, async () => {
  try {
    console.log(`使用 Nuxt Content 3 查询文章: ${articlePath}`)

    // 使用 Nuxt Content 3 的标准查询方式
    const result = await queryCollection('blog')
      .path(articlePath)
      .first()

    if (!result) {
      console.warn(`文章未找到: ${articlePath}`)
      return null
    }

    console.log('查询到的文章:', {
      title: result.title,
      path: result.path,
      date: result.date,
      category: result.category
    })

    return result
  } catch (err) {
    console.error('查询文章时发生错误:', err)
    console.error('错误详情:', {
      message: err.message,
      stack: err.stack,
      articlePath
    })

    return null
  }
})

// 分类配置 - 与首页保持一致
const categoryConfig = {
  '全部': { icon: '📚', color: '#63b3ed' },
  '方案设计': { icon: '🏗️', color: '#68d391' },
  '技术说明': { icon: '⚙️', color: '#f6ad55' },
  'AI相关': { icon: '🤖', color: '#ed64a6' }
}

// 获取分类信息
const getCategoryInfo = (category) => {
  return categoryConfig[category] || categoryConfig['全部']
}

// 如果文章不存在，抛出 404 错误
if (!article.value && !pending.value && !error.value) {
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
/* 动画 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ContentRenderer 暗色主题样式 */
.content-renderer {
  color: #ffffff;
  line-height: 1.75;
}

/* 标题样式 */
.content-renderer h1,
.content-renderer h2,
.content-renderer h3,
.content-renderer h4,
.content-renderer h5,
.content-renderer h6 {
  color: #ffffff;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.content-renderer h1 {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.content-renderer h2 {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.content-renderer h3 {
  font-size: 1.5rem;
  line-height: 2rem;
}

/* 段落样式 */
.content-renderer p {
  margin-bottom: 1.25rem;
  color: #ffffff;
  opacity: 0.9;
}

/* 列表样式 */
.content-renderer ul,
.content-renderer ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
  color: #ffffff;
}

.content-renderer li {
  margin-bottom: 0.5rem;
}

/* 代码样式 */
.content-renderer code {
  background-color: rgba(45, 55, 72, 0.8);
  color: #e2e8f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
}

.content-renderer pre {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid #4a5568;
}

.content-renderer pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

/* 引用样式 */
.content-renderer blockquote {
  border-left: 4px solid #63b3ed;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #e2e8f0;
  background: rgba(99, 179, 237, 0.1);
  padding: 1rem;
  border-radius: 4px;
}

/* 链接样式 */
.content-renderer a {
  color: #63b3ed;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.content-renderer a:hover {
  color: #93c5fd;
}

/* 表格样式 */
.content-renderer table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: rgba(45, 55, 72, 0.5);
  border-radius: 8px;
  overflow: hidden;
}

.content-renderer th,
.content-renderer td {
  border: 1px solid #4a5568;
  padding: 0.75rem;
  text-align: left;
  color: #ffffff;
}

.content-renderer th {
  background-color: rgba(99, 179, 237, 0.2);
  font-weight: 600;
}

/* 图片样式 */
.content-renderer img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  border: 1px solid #4a5568;
}

/* 分隔线样式 */
.content-renderer hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, #4a5568, transparent);
  margin: 2rem 0;
}


</style>
