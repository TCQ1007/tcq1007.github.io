<template>
    <ContentPage :content="doc" :navigation="navigation" :pending="pending" type="docs" />
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const slug = route.params.slug

// 构建文档路径
const docPath = Array.isArray(slug) ? `/docs/${slug.join('/')}` : `/docs/${slug}`

console.log('访问文档路径:', docPath)
console.log('路由参数:', slug)

// 获取文档内容 - 使用 Nuxt Content 3 Collections API
const { data: doc, pending } = await useAsyncData(`doc-${docPath}`, async () => {
    try {
        console.log('使用 queryCollection API 查询文档:', docPath)

        // 使用 Nuxt Content 3 的 Collections API
        const result = await queryCollection('docs').path(docPath).first()

        console.log('查询结果:', result ? `找到文档: ${result.title}` : '未找到文档')
        return result || null
    } catch (error) {
        console.error('查询文档时发生错误:', error)
        return null
    }
})

// 获取相邻文档（用于导航）
const { data: navigation } = await useAsyncData('docs-navigation', async () => {
    try {
        // 使用 Collections API 获取所有文档
        const allDocs = await queryCollection('docs').all()

        if (!doc.value || !allDocs) return { prevContent: null, nextContent: null }

        const currentIndex = allDocs.findIndex(d => d.path === doc.value.path)

        return {
            prevContent: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
            nextContent: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null
        }
    } catch (error) {
        console.error('获取导航数据失败:', error)
        return { prevContent: null, nextContent: null }
    }
})

// 如果文档不存在，抛出 404 错误
if (!doc.value && !pending.value) {
    throw createError({
        statusCode: 404,
        statusMessage: `文档未找到: ${docPath}`
    })
}
</script>
