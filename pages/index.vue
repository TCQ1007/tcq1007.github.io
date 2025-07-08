<template>
    <div style="background: #0a0e27; min-height: 100vh; color: #e2e8f0;">
        <!-- Hero Section -->
        <section
            style="background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%); color: #f7fafc; padding: 4rem 0; text-align: center; position: relative; overflow: hidden;">
            <!-- 技术背景装饰 -->
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;">
                <div
                    style="position: absolute; top: 20%; left: 10%; width: 100px; height: 100px; border: 2px solid #63b3ed; border-radius: 50%; animation: float 6s ease-in-out infinite;">
                </div>
                <div
                    style="position: absolute; top: 60%; right: 15%; width: 80px; height: 80px; border: 2px solid #68d391; transform: rotate(45deg); animation: float 8s ease-in-out infinite reverse;">
                </div>
                <div
                    style="position: absolute; bottom: 30%; left: 20%; width: 60px; height: 60px; border: 2px solid #f6ad55; border-radius: 10px; animation: float 7s ease-in-out infinite;">
                </div>
            </div>

            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 1;">
                <h1
                    style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #63b3ed, #68d391, #f6ad55); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    TCQ1007 的技术博客
                </h1>
                <p
                    style="font-size: 1.25rem; margin-bottom: 2rem; color: #ffffff; font-weight: 400; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
                    基于 Nuxt 3 和 GitHub Pages 的现代化博客平台
                </p>
                <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                    <span
                        style="padding: 0.5rem 1rem; background: rgba(99, 179, 237, 0.2); border: 1px solid #63b3ed; border-radius: 20px; font-size: 0.875rem; color: #63b3ed;">
                        🚀 现代化
                    </span>
                    <span
                        style="padding: 0.5rem 1rem; background: rgba(104, 211, 145, 0.2); border: 1px solid #68d391; border-radius: 20px; font-size: 0.875rem; color: #68d391;">
                        ⚡ 高性能
                    </span>
                    <span
                        style="padding: 0.5rem 1rem; background: rgba(246, 173, 85, 0.2); border: 1px solid #f6ad55; border-radius: 20px; font-size: 0.875rem; color: #f6ad55;">
                        🌍 GitHub Pages
                    </span>
                </div>
            </div>
        </section>

        <!-- 外链工具区域 -->
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem 2rem;">
            <div style="margin-bottom: 4rem;">
                <h2
                    style="font-size: 1.75rem; font-weight: 700; color: #ffffff; margin-bottom: 2rem; text-align: center; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
                    🔗 实用工具
                </h2>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    <a v-for="link in externalLinks" :key="link.url" :href="link.url" target="_blank"
                        rel="noopener noreferrer"
                        style="background: linear-gradient(145deg, #2d3748, #4a5568); border: 1px solid #4a5568; border-radius: 12px; padding: 1.5rem; text-decoration: none; transition: all 0.3s ease; display: block; position: relative; overflow: hidden;"
                        @mouseover="$event.currentTarget.style.transform = 'translateY(-4px)'; $event.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'"
                        @mouseout="$event.currentTarget.style.transform = 'translateY(0)'; $event.currentTarget.style.boxShadow = 'none'">
                        <!-- 图标 -->
                        <div style="font-size: 2rem; margin-bottom: 1rem;">{{ link.icon }}</div>

                        <!-- 标题 -->
                        <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">
                            {{ link.title }}
                        </h3>

                        <!-- 描述 -->
                        <p
                            style="color: #e2e8f0; font-size: 0.875rem; line-height: 1.5; margin-bottom: 1rem; opacity: 0.9;">
                            {{ link.description }}
                        </p>

                        <!-- 标签 -->
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            <span v-for="tag in link.tags" :key="tag"
                                style="padding: 0.25rem 0.5rem; background: rgba(99, 179, 237, 0.2); color: #63b3ed; font-size: 0.75rem; border-radius: 8px; border: 1px solid rgba(99, 179, 237, 0.3);">
                                {{ tag }}
                            </span>
                        </div>

                        <!-- 外链图标 -->
                        <div style="position: absolute; top: 1rem; right: 1rem; color: #a0aec0; font-size: 1rem;">
                            ↗
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem 3rem;">
            <!-- 主栏目导航 -->
            <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 3rem;">
                <button @click="activeSection = 'blog'" :style="{
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: activeSection === 'blog' ? 'linear-gradient(45deg, #63b3ed, #68d391)' : 'rgba(45, 55, 72, 0.8)',
                    color: activeSection === 'blog' ? '#1a202c' : '#e2e8f0',
                    boxShadow: activeSection === 'blog' ? '0 8px 25px rgba(99, 179, 237, 0.3)' : 'none',
                    transform: activeSection === 'blog' ? 'translateY(-2px)' : 'translateY(0)'
                }">
                    📝 博客文章
                </button>
                <button @click="activeSection = 'docs'" :style="{
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: activeSection === 'docs' ? 'linear-gradient(45deg, #63b3ed, #68d391)' : 'rgba(45, 55, 72, 0.8)',
                    color: activeSection === 'docs' ? '#1a202c' : '#e2e8f0',
                    boxShadow: activeSection === 'docs' ? '0 8px 25px rgba(99, 179, 237, 0.3)' : 'none',
                    transform: activeSection === 'docs' ? 'translateY(-2px)' : 'translateY(0)'
                }">
                    📚 项目文档
                </button>
            </div>

            <!-- 博客文章区域 -->
            <div v-show="activeSection === 'blog'">
                <!-- 分类导航 -->
                <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 3rem; flex-wrap: wrap;">
                    <button v-for="category in categories" :key="category.name" @click="activeCategory = category.name"
                        :style="{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            transition: 'all 0.3s ease',
                            background: activeCategory === category.name ? category.color : 'rgba(45, 55, 72, 0.8)',
                            color: activeCategory === category.name ? '#1a202c' : '#e2e8f0',
                            boxShadow: activeCategory === category.name ? `0 4px 12px ${category.color}40` : 'none'
                        }">
                        {{ category.icon }} {{ category.name }}
                        <span
                            style="margin-left: 0.5rem; padding: 0.25rem 0.5rem; background: rgba(0,0,0,0.2); border-radius: 12px; font-size: 0.75rem;">
                            {{ category.count }}
                        </span>
                    </button>
                </div>

                <!-- 加载状态 -->
                <div v-if="pending" style="text-align: center; padding: 3rem 0;">
                    <div
                        style="width: 3rem; height: 3rem; border: 2px solid #4a5568; border-top: 2px solid #63b3ed; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;">
                    </div>
                    <p style="margin-top: 1rem; color: #f7fafc; font-weight: 500;">加载中...</p>
                </div>

                <!-- 错误状态 -->
                <div v-else-if="error" style="text-align: center; padding: 3rem 0;">
                    <div
                        style="padding: 2rem; background: rgba(245, 101, 101, 0.2); border: 1px solid #f56565; border-radius: 8px; max-width: 500px; margin: 0 auto;">
                        <p style="color: #fed7d7; font-weight: 600; font-size: 1.1rem;">⚠️ 加载文章时出错</p>
                        <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #f7fafc;">{{ error }}</p>
                    </div>
                </div>

                <!-- 文章列表 -->
                <div v-else-if="filteredArticles && filteredArticles.length > 0">
                    <h2
                        style="font-size: 1.75rem; font-weight: 700; color: #ffffff; margin-bottom: 2rem; text-align: center; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
                        {{ getCategoryInfo(activeCategory).icon }} {{ activeCategory }}
                        <span
                            style="font-size: 1rem; color: #ffffff; font-weight: 500; margin-left: 0.5rem; opacity: 0.8;">
                            ({{ filteredArticles.length }} 篇文章)
                        </span>
                    </h2>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                        <ContentCard v-for="article in filteredArticles" :key="article.path" :content="article"
                            type="blog" />
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-else style="text-align: center; padding: 4rem 0;">
                    <div style="max-width: 400px; margin: 0 auto;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📝</div>
                        <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
                            {{ activeCategory }} 分类暂无文章
                        </h3>
                        <p style="color: #ffffff; margin-bottom: 2rem; opacity: 0.8;">
                            敬请期待更多精彩内容
                        </p>
                        <button @click="activeCategory = '全部'"
                            style="padding: 0.75rem 1.5rem; background: linear-gradient(45deg, #63b3ed, #68d391); color: #1a202c; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s ease;"
                            @mouseover="$event.target.style.transform = 'scale(1.05)'"
                            @mouseout="$event.target.style.transform = 'scale(1)'">
                            查看全部文章
                        </button>
                    </div>
                </div>
            </div>

            <!-- 项目文档区域 -->
            <div v-show="activeSection === 'docs'">
                <h2
                    style="font-size: 1.75rem; font-weight: 700; color: #ffffff; margin-bottom: 2rem; text-align: center; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
                    📚 项目文档
                </h2>

                <!-- 文档列表 -->
                <div v-if="docs && docs.length"
                    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
                    <ContentCard v-for="doc in docs" :key="doc.path" :content="doc" type="docs" />
                </div>

                <!-- 文档空状态 -->
                <div v-else style="text-align: center; padding: 4rem 0;">
                    <div style="max-width: 400px; margin: 0 auto;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📚</div>
                        <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
                            文档正在整理中
                        </h3>
                        <p style="color: #ffffff; margin-bottom: 2rem; opacity: 0.8;">
                            项目文档即将上线，敬请期待
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 移除手动导入，依赖自动导入

// 设置页面元数据
useHead({
    title: 'TCQ1007 的技术博客 - 基于 Nuxt 3 和 GitHub Pages',
    meta: [
        {
            name: 'description',
            content: 'TCQ1007 的技术博客，基于 Nuxt 3 和 GitHub Pages 的现代化技术博客平台，分享前端开发、全栈技术和云计算相关内容。'
        },
        {
            property: 'og:title',
            content: 'TCQ1007 的技术博客 - 基于 Nuxt 3 和 GitHub Pages'
        },
        {
            property: 'og:description',
            content: 'TCQ1007 的技术博客，基于 Nuxt 3 和 GitHub Pages 的现代化技术博客平台'
        },
        {
            property: 'og:type',
            content: 'website'
        }
    ]
})

// 外链工具配置
const externalLinks = ref([
    {
        title: 'Mermaid 图表工具',
        description: '在线创建和编辑 Mermaid 图表，支持流程图、时序图、甘特图等多种图表类型。',
        url: 'https://mermaid.will-tecth.workers.dev/',
        icon: '📊',
        tags: ['图表', 'Mermaid', '可视化', '在线工具']
    }
])

// 获取博客文章列表 - 使用 Nuxt Content 3 标准 API
const { data: articles, pending, error } = await useAsyncData('blog-articles', async () => {
    try {
        console.log('使用 Nuxt Content 3 queryCollection API 查询博客文章...')

        // 使用 Nuxt Content 3 的标准查询方式
        const result = await queryCollection('blog')
            .order('date', 'DESC')
            .all()

        console.log('查询到的文章数量:', result?.length || 0)
        console.log('文章列表:', result)

        // 调试分类信息
        if (result && result.length > 0) {
            console.log('文章分类信息:')
            result.forEach((article, index) => {
                console.log(`${index + 1}. ${article.title} - 分类: "${article.category}"`)
            })
        }

        return result || []
    } catch (err) {
        console.error('查询博客文章时发生错误:', err)
        console.error('错误详情:', {
            message: err.message,
            stack: err.stack,
            cause: err.cause
        })

        // 返回空数组而不是回退到 API，因为我们使用的是 Nuxt Content 3
        return []
    }
})

// 获取项目文档列表 - 使用 Nuxt Content 3 Collections API
const { data: docs } = await useAsyncData('docs', async () => {
    try {
        console.log('使用 queryCollection API 查询文档...')

        // 使用 Nuxt Content 3 的 Collections API
        const docsData = await queryCollection('docs').all()

        console.log('查询到的文档数量:', docsData?.length || 0)
        console.log('文档列表:', docsData?.map(doc => ({ title: doc.title, path: doc.path })))

        return docsData || []
    } catch (error) {
        console.error('查询文档时发生错误:', error)
        return []
    }
})

// 主栏目切换状态
const activeSection = ref('blog')

// 分类管理
const activeCategory = ref('全部')

// 分类配置
const categoryConfig = {
    '全部': { icon: '📚', color: '#63b3ed' },
    '方案设计': { icon: '🏗️', color: '#68d391' },
    '技术说明': { icon: '⚙️', color: '#f6ad55' },
    'AI相关': { icon: '🤖', color: '#ed64a6' }
}

// 计算分类统计
const categories = computed(() => {
    const allArticles = articles.value || []

    return [
        {
            name: '全部',
            icon: categoryConfig['全部'].icon,
            color: categoryConfig['全部'].color,
            count: allArticles.length
        },
        {
            name: '方案设计',
            icon: categoryConfig['方案设计'].icon,
            color: categoryConfig['方案设计'].color,
            count: allArticles.filter(article => article.category === '方案设计').length
        },
        {
            name: '技术说明',
            icon: categoryConfig['技术说明'].icon,
            color: categoryConfig['技术说明'].color,
            count: allArticles.filter(article => article.category === '技术说明').length
        },
        {
            name: 'AI相关',
            icon: categoryConfig['AI相关'].icon,
            color: categoryConfig['AI相关'].color,
            count: allArticles.filter(article => article.category === 'AI相关').length
        }
    ]
})

// 过滤文章
const filteredArticles = computed(() => {
    if (!articles.value) return []

    if (activeCategory.value === '全部') {
        return articles.value
    }

    return articles.value.filter(article => article.category === activeCategory.value)
})

// 获取分类信息
const getCategoryInfo = (category) => {
    return categoryConfig[category] || categoryConfig['全部']
}


</script>

<style scoped>
/* 技术化动画效果 */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 网格背景效果 */
.tech-grid {
    background-image:
        linear-gradient(rgba(99, 179, 237, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 179, 237, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
}

/* 悬浮效果 */
.hover-lift {
    transition: all 0.3s ease;
}

.hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* 渐变边框效果 */
.gradient-border {
    position: relative;
    background: linear-gradient(145deg, #2d3748, #4a5568);
    border-radius: 12px;
}

.gradient-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(45deg, #63b3ed, #68d391, #f6ad55, #ed64a6);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
}

/* 代码风格字体 */
.code-font {
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
}

/* 技术标签样式 */
.tech-tag {
    position: relative;
    overflow: hidden;
}

.tech-tag::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.tech-tag:hover::before {
    left: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem !important;
    }

    .category-grid {
        grid-template-columns: 1fr !important;
    }

    .article-grid {
        grid-template-columns: 1fr !important;
    }
}

/* 滚动条样式 */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #2d3748;
}

::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #63b3ed;
}
</style>

<style>
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

body {
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
