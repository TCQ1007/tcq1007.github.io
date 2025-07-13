<template>
    <div class="app-container">
        <!-- 导航栏 -->
        <nav class="navbar">
            <div class="navbar-container">
                <!-- Logo -->
                <NuxtLink to="/" style="text-decoration: none;">
                    <div class="logo">
                        <div class="logo-icon">
                            T
                        </div>
                        <h1 class="logo-text">
                            Tech Blog
                        </h1>
                    </div>
                </NuxtLink>

                <!-- 导航链接 -->
                <div class="nav-links">
                    <!-- 搜索区域 -->
                    <div class="search-container">
                        <!-- 搜索按钮 (移动端显示) -->
                        <button v-if="!searchExpanded" @click="expandSearch" class="search-btn mobile-only">
                            🔍
                        </button>

                        <!-- 搜索框 -->
                        <div v-show="searchExpanded || !isMobile" class="search-input-container"
                            :class="{ 'expanded': searchExpanded, 'desktop-expanded': searchFocused && !isMobile }">
                            <input ref="searchInput" v-model="searchQuery" @input="handleSearch"
                                @focus="handleSearchFocus" @blur="handleSearchBlur" @keydown.esc="collapseSearch"
                                placeholder="搜索文章..." class="search-input" />
                            <div class="search-icon">🔍</div>
                            <button v-if="searchExpanded && isMobile" @click="collapseSearch" class="search-close">
                                ✕
                            </button>
                        </div>

                        <!-- 搜索结果下拉框 -->
                        <div v-if="showSearchResults && searchResults.length > 0" class="search-results" :class="{
                            'search-results-expanded': searchExpanded && isMobile,
                            'search-results-desktop-expanded': searchFocused && !isMobile
                        }">
                            <NuxtLink v-for="result in searchResults.slice(0, 5)" :key="result.path" :to="result.path"
                                @click="clearSearch" class="search-result-item">
                                <div class="search-result-title">{{ result.title }}</div>
                                <div class="search-result-desc">{{
                                    searchFocused && !isMobile
                                        ? result.description?.slice(0, 120) + '...'
                                        : result.description?.slice(0, 80) + '...'
                                }}</div>
                            </NuxtLink>
                        </div>
                    </div>

                    <NuxtLink to="/"
                        style="color: #ffffff; text-decoration: none; font-weight: 500; transition: all 0.2s ease; padding: 0.5rem 1rem; border-radius: 6px;"
                        @mouseover="$event.target.style.color = '#63b3ed'; $event.target.style.background = 'rgba(99, 179, 237, 0.2)'"
                        @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.background = 'transparent'">
                        🏠 首页
                    </NuxtLink>

                    <a href="https://github.com/TCQ1007/tcq1007.github.io" target="_blank" rel="noopener noreferrer"
                        style="color: #ffffff; text-decoration: none; font-weight: 500; transition: all 0.2s ease; padding: 0.5rem 1rem; border-radius: 6px;"
                        @mouseover="$event.target.style.color = '#68d391'; $event.target.style.background = 'rgba(104, 211, 145, 0.2)'"
                        @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.background = 'transparent'">
                        💻 GitHub
                    </a>

                    <!-- 主题切换按钮 -->
                    <ThemeToggle />
                </div>
            </div>
        </nav>

        <!-- 主要内容区域 -->
        <main style="flex: 1;">
            <NuxtPage />
        </main>

        <!-- 页脚 -->
        <footer
            style="background: rgba(26, 32, 44, 0.95); border-top: 1px solid #4a5568; padding: 2rem 0; margin-top: auto;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; text-align: center;">
                <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; flex-wrap: wrap;">
                    <a href="https://nuxt.com" target="_blank"
                        style="color: #ffffff; text-decoration: none; transition: color 0.2s ease; opacity: 0.8;"
                        @mouseover="$event.target.style.color = '#63b3ed'; $event.target.style.opacity = '1'"
                        @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.opacity = '0.8'">
                        Nuxt 3
                    </a>
                    <a href="https://content.nuxt.com" target="_blank"
                        style="color: #ffffff; text-decoration: none; transition: color 0.2s ease; opacity: 0.8;"
                        @mouseover="$event.target.style.color = '#68d391'; $event.target.style.opacity = '1'"
                        @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.opacity = '0.8'">
                        Nuxt Content
                    </a>
                    <a href="https://pages.github.com" target="_blank"
                        style="color: #ffffff; text-decoration: none; transition: color 0.2s ease; opacity: 0.8;"
                        @mouseover="$event.target.style.color = '#f6ad55'; $event.target.style.opacity = '1'"
                        @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.opacity = '0.8'">
                        GitHub Pages
                    </a>
                </div>
                <p style="color: #ffffff; font-size: 0.875rem; margin: 0; opacity: 0.7;">
                    © 2025 TCQ1007 的技术博客. 基于现代化技术栈构建.
                </p>
                <p style="color: #a0aec0; font-size: 0.75rem; margin: 0.5rem 0 0 0; opacity: 0.6;">
                    📅 最新内容更新: {{ lastUpdated }}
                </p>
                <p style="color: #a0aec0; font-size: 0.75rem; margin: 0.5rem 0 0 0; opacity: 0.6;">
                    最后更新: {{ lastUpdated }}
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>
// 搜索功能
const searchQuery = ref('')
const searchResults = ref([])
const showSearchResults = ref(false)
const searchExpanded = ref(false)
const searchFocused = ref(false)

// 移动端检测
const isMobile = ref(false)
const searchInput = ref(null)

// 检测屏幕尺寸
const checkMobile = () => {
    if (typeof window !== 'undefined') {
        isMobile.value = window.innerWidth <= 768
        // 如果切换到桌面端，自动展开搜索
        if (!isMobile.value) {
            searchExpanded.value = false
        }
    }
}

// 展开搜索
const expandSearch = () => {
    searchExpanded.value = true
    // 防止页面滚动
    if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden'
    }
    nextTick(() => {
        if (searchInput.value) {
            searchInput.value.focus()
        }
    })
}

// 收缩搜索
const collapseSearch = () => {
    if (isMobile.value) {
        searchExpanded.value = false
        searchQuery.value = ''
        searchResults.value = []
        showSearchResults.value = false
        // 恢复页面滚动
        if (typeof document !== 'undefined') {
            document.body.style.overflow = ''
        }
    }
}

// 在客户端挂载时检测
onMounted(() => {
    checkMobile()
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', checkMobile)
    }
})

// 清理事件监听器
onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile)
    }
})

// 获取所有文章用于搜索
const { data: allArticles } = await useAsyncData('search-articles', async () => {
    try {
        const result = await queryCollection('blog').all()
        return result || []
    } catch (error) {
        console.error('获取文章失败:', error)
        return []
    }
})

// 获取所有文档
const { data: allDocs } = await useAsyncData('all-docs', async () => {
    try {
        const result = await queryCollection('docs').all()
        return result || []
    } catch (error) {
        console.error('获取文档失败:', error)
        return []
    }
})

// 计算最新更新时间
const lastUpdated = computed(() => {
    const allContent = [...(allArticles.value || []), ...(allDocs.value || [])]
    if (allContent.length === 0) return '暂无内容'

    const latestDate = allContent.reduce((latest, item) => {
        const itemDate = new Date(item.date)
        return itemDate > latest ? itemDate : latest
    }, new Date(0))

    return latestDate.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
})

// 搜索处理函数
const handleSearch = () => {
    const query = searchQuery.value.toLowerCase().trim()

    if (!query || !allArticles.value) {
        searchResults.value = []
        return
    }

    searchResults.value = allArticles.value.filter(article => {
        return (
            article.title?.toLowerCase().includes(query) ||
            article.description?.toLowerCase().includes(query) ||
            article.tags?.some(tag => tag.toLowerCase().includes(query)) ||
            article.category?.toLowerCase().includes(query)
        )
    })
}

// 桌面端搜索聚焦处理
const handleSearchFocus = () => {
    searchFocused.value = true
    showSearchResults.value = true
}

// 桌面端搜索失焦处理
const handleSearchBlur = () => {
    // 延迟处理，避免点击搜索结果时立即失焦
    setTimeout(() => {
        searchFocused.value = false
        showSearchResults.value = false
    }, 200)
}

// 清空搜索
const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
    showSearchResults.value = false
    searchFocused.value = false
    // 如果是移动端展开模式，也要收起搜索
    if (isMobile.value && searchExpanded.value) {
        collapseSearch()
    }
}



// 页面标题设置
useHead({
    title: 'TCQ1007 的技术博客',
    meta: [
        { name: 'description', content: '基于 Nuxt 3 和 GitHub Pages 的现代化博客平台' },
        { name: 'keywords', content: 'Nuxt 3, GitHub Pages, 技术博客, 现代化, 高性能' },
        { name: 'author', content: 'TCQ1007' },
        { property: 'og:title', content: 'TCQ1007 的技术博客' },
        { property: 'og:description', content: '基于 Nuxt 3 和 GitHub Pages 的现代化博客平台' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'TCQ1007 的技术博客' },
        { name: 'twitter:description', content: '基于 Nuxt 3 和 GitHub Pages 的现代化博客平台' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
    ]
})
</script>

<style>
/* 全局样式 */
* {
    box-sizing: border-box;
}

html, body {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
}

/* CSS 变量定义 */
:root {
    /* 暗色主题变量 */
    --bg-primary: #0a0e27;
    --bg-secondary: #1a202c;
    --bg-card: linear-gradient(145deg, #2d3748, #4a5568);
    --border-color: #4a5568;
    --text-primary: #ffffff;
    --text-secondary: #e2e8f0;
    --text-muted: #a0aec0;
    --accent-blue: #63b3ed;
    --accent-green: #68d391;
}

/* 亮色主题变量 */
.light-mode {
    --bg-primary: #f7fafc;
    --bg-secondary: #ffffff;
    --bg-card: linear-gradient(145deg, #ffffff, #f7fafc);
    --border-color: #e2e8f0;
    --text-primary: #1a202c;
    --text-secondary: #2d3748;
    --text-muted: #718096;
    --accent-blue: #3182ce;
    --accent-green: #38a169;
}

/* 改善代码块的显示效果 - 适配暗色主题 */
pre {
    background-color: #2d3748 !important;
    border: 1px solid #4a5568 !important;
    border-radius: 8px !important;
    padding: 1.5rem !important;
    overflow-x: auto !important;
}

code {
    background-color: rgba(45, 55, 72, 0.8) !important;
    color: #e2e8f0 !important;
    padding: 0.25rem 0.5rem !important;
    border-radius: 4px !important;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace !important;
}

pre code {
    background-color: transparent !important;
    padding: 0 !important;
    color: #e2e8f0 !important;
}

/* 确保代码块中的文字有足够的对比度 */
.shiki {
    background-color: #2d3748 !important;
}

.shiki code {
    color: #e2e8f0 !important;
}

/* 针对不同语法元素的颜色 - 暗色主题 */
.shiki .token.keyword {
    color: #63b3ed !important;
}

.shiki .token.string {
    color: #68d391 !important;
}

.shiki .token.comment {
    color: #a0aec0 !important;
}

.shiki .token.function {
    color: #f6ad55 !important;
}

.shiki .token.number {
    color: #ed64a6 !important;
}

/* 应用容器 */
.app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg-primary);
    transition: background 0.3s ease;
}

/* 导航栏样式 */
.navbar {
    background: rgba(26, 32, 44, 0.95);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
}

.light-mode .navbar {
    background: rgba(255, 255, 255, 0.95);
}

.navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: visible;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(45deg, #63b3ed, #68d391);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    color: #1a202c;
    font-size: 1rem;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
}

.nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
    position: relative;
}

/* 搜索样式 */
.search-container {
    position: relative;
    display: flex;
    align-items: center;
    overflow: visible;
}

.search-btn {
    background: rgba(45, 55, 72, 0.8);
    border: 1px solid #4a5568;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #a0aec0;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-btn:hover {
    border-color: #63b3ed;
    color: #63b3ed;
}

.search-input-container {
    position: relative;
    transition: all 0.3s ease;
}

.search-input-container.desktop-expanded {
    z-index: 50;
}



.search-input {
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    background: rgba(45, 55, 72, 0.8);
    border: 1px solid #4a5568;
    border-radius: 20px;
    color: #ffffff;
    font-size: 0.875rem;
    width: 200px;
    transition: all 0.3s ease;
    outline: none;
}

.search-input-container.desktop-expanded .search-input {
    width: 400px;
    background: rgba(45, 55, 72, 0.95);
    border-color: #63b3ed;
    box-shadow: 0 4px 20px rgba(99, 179, 237, 0.3);
    transform-origin: right center;
}

.search-input:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 2px rgba(99, 179, 237, 0.2);
}

.search-input::placeholder {
    color: #a0aec0;
}

.search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
    font-size: 0.875rem;
    pointer-events: none;
}

.search-close {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.search-close:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
}

/* 搜索结果样式 */
.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(26, 32, 44, 0.95);
    border: 1px solid #4a5568;
    border-radius: 8px;
    margin-top: 0.5rem;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    backdrop-filter: blur(20px);
}

.search-results-expanded {
    position: fixed;
    top: 5rem;
    left: 1rem;
    right: 1rem;
    margin-top: 0;
    z-index: 101;
    max-height: calc(100vh - 8rem);
}

.search-results-desktop-expanded {
    width: 400px;
    left: auto;
    right: 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border-color: #63b3ed;
    background: rgba(26, 32, 44, 0.98);
    max-height: 400px;
}

.search-result-item {
    display: block;
    padding: 0.75rem 1rem;
    color: #ffffff;
    text-decoration: none;
    border-bottom: 1px solid #4a5568;
    transition: background 0.2s ease;
}

.search-result-item:hover {
    background: rgba(99, 179, 237, 0.2);
}

.search-result-item:last-child {
    border-bottom: none;
}

.search-result-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #ffffff;
}

.search-result-desc {
    font-size: 0.75rem;
    opacity: 0.7;
    color: #e2e8f0;
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

/* 移动端响应式设计 */
@media (max-width: 768px) {
    .navbar-container {
        padding: 0 1rem;
    }

    .logo-text {
        font-size: 1.25rem;
    }

    .nav-links {
        gap: 1rem;
    }

    .mobile-only {
        display: block;
    }

    .search-input-container.expanded {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(26, 32, 44, 0.98);
        padding: 1rem;
        border-bottom: 1px solid #4a5568;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        margin: 0;
        backdrop-filter: blur(20px);
    }

    .search-input-container.expanded .search-input {
        width: calc(100% - 3rem);
        padding-right: 1rem;
        box-sizing: border-box;
        max-width: none;
        margin-right: 0.5rem;
    }

    /* 移动端搜索结果优化 */
    .search-results-expanded {
        left: 0.5rem;
        right: 0.5rem;
        top: 4.5rem;
    }

    .search-result-item {
        padding: 1rem;
        font-size: 0.9rem;
    }

    .search-result-title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    .search-result-desc {
        font-size: 0.8rem;
        line-height: 1.4;
    }

    /* 隐藏桌面端导航项 */
    .nav-links>a {
        display: none;
    }

    .nav-links>a:first-of-type {
        display: block;
        font-size: 0.875rem;
        padding: 0.4rem 0.8rem;
    }
}

@media (max-width: 480px) {
    .navbar-container {
        padding: 0 0.75rem;
    }

    .logo {
        gap: 0.375rem;
    }

    .logo-icon {
        width: 28px;
        height: 28px;
        font-size: 0.875rem;
    }

    .logo-text {
        font-size: 1.125rem;
    }

    .nav-links {
        gap: 0.75rem;
    }

    .search-btn {
        width: 36px;
        height: 36px;
        font-size: 0.875rem;
    }
}

@media (min-width: 769px) {
    .mobile-only {
        display: none;
    }
}
</style>
