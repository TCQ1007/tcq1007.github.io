<template>
  <div style="background: #0a0e27; min-height: 100vh; color: #ffffff;">
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <!-- 返回按钮 -->
      <div style="margin-bottom: 2rem;">
        <NuxtLink to="/" style="color: #63b3ed; text-decoration: none;">
          ← 返回首页
        </NuxtLink>
      </div>

      <!-- 文章内容 -->
      <article v-if="article">
        <!-- 文章头部 -->
        <header style="margin-bottom: 3rem;">
          <h1 style="font-size: 2rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem; line-height: 1.3;">
            {{ article.title }}
          </h1>

          <div style="color: #a0aec0; font-size: 0.875rem; margin-bottom: 1rem;">
            {{ formatDate(article.date) }}
            <span v-if="article.author"> · {{ article.author }}</span>
            <span v-if="article.category"> · {{ article.category }}</span>
          </div>

          <p v-if="article.description" style="color: #e2e8f0; line-height: 1.6; margin-bottom: 1.5rem;">
            {{ article.description }}
          </p>
        </header>

        <!-- 文章正文 -->
        <div style="color: #ffffff; line-height: 1.7;" class="article-content">
          <ContentRenderer :value="article" />
        </div>

      </article>

      <!-- 加载状态 -->
      <div v-else-if="pending" style="text-align: center; padding: 2rem 0;">
        <p style="color: #a0aec0;">加载中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else style="text-align: center; padding: 2rem 0;">
        <h1 style="color: #ffffff; margin-bottom: 1rem;">文章未找到</h1>
        <p style="color: #a0aec0; margin-bottom: 2rem;">抱歉，您访问的文章不存在。</p>
        <NuxtLink to="/" style="color: #63b3ed; text-decoration: none;">
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

// 获取文章内容
const { data: article, pending } = await useAsyncData(`article-${articlePath}`, async () => {
  const result = await queryCollection('blog').path(articlePath).first()
  return result || null
})

// 如果文章不存在，抛出 404 错误
if (!article.value && !pending.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到'
  })
}

// 设置页面元数据
useHead(() => ({
  title: article.value ? `${article.value.title} - TCQ1007 的技术博客` : 'TCQ1007 的技术博客',
  meta: article.value ? [
    { name: 'description', content: article.value.description || 'TCQ1007 的技术博客文章' }
  ] : []
}))

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
/* 确保文章内容中的所有标题都是白色 */
.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  color: #ffffff !important;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(h1) {
  font-size: 1.875rem;
}

.article-content :deep(h2) {
  font-size: 1.5rem;
}

.article-content :deep(h3) {
  font-size: 1.25rem;
}

/* 确保段落和其他文本也是白色 */
.article-content :deep(p) {
  color: #ffffff !important;
  margin-bottom: 1.25rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  color: #ffffff !important;
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.article-content :deep(li) {
  color: #ffffff !important;
  margin-bottom: 0.5rem;
}

/* 链接样式 */
.article-content :deep(a) {
  color: #63b3ed !important;
  text-decoration: underline;
}

.article-content :deep(a:hover) {
  color: #93c5fd !important;
}

/* 引用样式 */
.article-content :deep(blockquote) {
  border-left: 4px solid #63b3ed;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #e2e8f0 !important;
  background: rgba(99, 179, 237, 0.1);
  padding: 1rem;
  border-radius: 4px;
}
</style>


