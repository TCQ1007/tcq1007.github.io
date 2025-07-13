<template>
    <ContentPage :content="article" :navigation="navigation" :pending="pending" type="blog" />
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const slug = route.params.slug

// 构建文章路径，确保正确处理中文
let articlePath
if (Array.isArray(slug)) {
    articlePath = `/blog/${slug.join('/')}`
} else {
    articlePath = `/blog/${slug}`
}

// 解码中文路径
try {
    articlePath = decodeURIComponent(articlePath)
} catch (e) {
    console.warn('路径解码失败:', articlePath)
}

// 获取文章内容
const { data: article, pending } = await useAsyncData(`article-${articlePath}`, async () => {
    // 首先尝试按路径查询
    let result = await queryCollection('blog').path(articlePath).first()

    // 如果按路径查询失败，尝试按文件名查询（处理中文文件名问题）
    if (!result && slug) {
        const filename = Array.isArray(slug) ? slug[slug.length - 1] : slug
        const decodedFilename = decodeURIComponent(filename)

        const allArticles = await queryCollection('blog').all()
        result = allArticles.find(article => {
            const articleFilename = article.stem?.split('/').pop()
            return articleFilename === decodedFilename || article.title === decodedFilename
        })
    }

    return result || null
})

// 获取相邻文章（用于导航）
const { data: navigation } = await useAsyncData('blog-navigation', async () => {
    const allArticles = await queryCollection('blog')
        .order('date', 'DESC')
        .all()

    if (!article.value || !allArticles) return { prevContent: null, nextContent: null }

    const currentIndex = allArticles.findIndex(a => (a.path || a._path) === (article.value.path || article.value._path))

    return {
        prevContent: currentIndex > 0 ? allArticles[currentIndex - 1] : null,
        nextContent: currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
    }
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
