<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0e27;">
    <!-- 导航栏 -->
    <nav style="background: rgba(26, 32, 44, 0.95); border-bottom: 1px solid #4a5568; padding: 1rem 0; position: sticky; top: 0; z-index: 50; backdrop-filter: blur(20px);">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center;">
        <!-- Logo -->
        <NuxtLink to="/" style="text-decoration: none;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 32px; height: 32px; background: linear-gradient(45deg, #63b3ed, #68d391); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1a202c; font-size: 1rem;">
              T
            </div>
            <h1 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin: 0;">
              Tech Blog
            </h1>
          </div>
        </NuxtLink>
        
        <!-- 导航链接 -->
        <div style="display: flex; gap: 2rem; align-items: center;">
          <NuxtLink
            to="/"
            style="color: #ffffff; text-decoration: none; font-weight: 500; transition: all 0.2s ease; padding: 0.5rem 1rem; border-radius: 6px;"
            @mouseover="$event.target.style.color = '#63b3ed'; $event.target.style.background = 'rgba(99, 179, 237, 0.2)'"
            @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.background = 'transparent'"
          >
            🏠 首页
          </NuxtLink>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style="color: #ffffff; text-decoration: none; font-weight: 500; transition: all 0.2s ease; padding: 0.5rem 1rem; border-radius: 6px;"
            @mouseover="$event.target.style.color = '#68d391'; $event.target.style.background = 'rgba(104, 211, 145, 0.2)'"
            @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.background = 'transparent'"
          >
            💻 GitHub
          </a>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main style="flex: 1;">
      <NuxtPage />
    </main>

    <!-- 页脚 -->
    <footer style="background: rgba(26, 32, 44, 0.95); border-top: 1px solid #4a5568; padding: 2rem 0; margin-top: auto;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; text-align: center;">
        <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; flex-wrap: wrap;">
          <a href="https://nuxt.com" target="_blank" style="color: #ffffff; text-decoration: none; transition: color 0.2s ease; opacity: 0.8;" @mouseover="$event.target.style.color = '#63b3ed'; $event.target.style.opacity = '1'" @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.opacity = '0.8'">
            Nuxt 3
          </a>
          <a href="https://content.nuxt.com" target="_blank" style="color: #ffffff; text-decoration: none; transition: color 0.2s ease; opacity: 0.8;" @mouseover="$event.target.style.color = '#68d391'; $event.target.style.opacity = '1'" @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.opacity = '0.8'">
            Nuxt Content
          </a>
          <a href="https://pages.github.com" target="_blank" style="color: #ffffff; text-decoration: none; transition: color 0.2s ease; opacity: 0.8;" @mouseover="$event.target.style.color = '#f6ad55'; $event.target.style.opacity = '1'" @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.opacity = '0.8'">
            GitHub Pages
          </a>
        </div>
        <p style="color: #ffffff; font-size: 0.875rem; margin: 0; opacity: 0.7;">
          © 2025 TCQ1007 的技术博客. 基于现代化技术栈构建.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
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
