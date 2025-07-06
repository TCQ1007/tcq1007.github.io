<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo/标题 -->
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
              技术博客
            </NuxtLink>
          </div>
          
          <!-- 导航菜单 -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              :class="{ 'text-blue-600 font-medium': $route.path === '/' }"
            >
              首页
            </NuxtLink>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <div class="md:hidden">
            <button 
              @click="toggleMobileMenu"
              class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors duration-200"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 移动端菜单 -->
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-4">
          <div class="flex flex-col space-y-4">
            <NuxtLink 
              to="/" 
              @click="closeMobileMenu"
              class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              :class="{ 'text-blue-600 font-medium': $route.path === '/' }"
            >
              首页
            </NuxtLink>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              @click="closeMobileMenu"
              class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main>
      <slot />
    </main>
    
    <!-- 页脚 -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center">
          <p class="text-gray-600 mb-4">
            © 2025 技术博客. 基于 
            <a 
              href="https://nuxt.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              Nuxt 3
            </a>
            和 
            <a 
              href="https://workers.cloudflare.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              Cloudflare Workers
            </a>
            构建
          </p>
          
          <div class="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <span>现代化 • 高性能 • 全球部署</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 移动端菜单状态
const mobileMenuOpen = ref(false)

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// 监听路由变化，自动关闭移动端菜单
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// 设置全局页面元数据
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
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
.font-medium { font-weight: 500; }

.text-sm { font-size: 0.875rem; }
.text-xl { font-size: 1.25rem; }

.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #6b7280; }
.text-gray-900 { color: #111827; }
.text-blue-600 { color: #2563eb; }
.text-blue-800 { color: #1e40af; }

.bg-white { background-color: #ffffff; }
.bg-gray-50 { background-color: #f9fafb; }

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }

.mb-4 { margin-bottom: 1rem; }
.mt-auto { margin-top: auto; }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.space-x-4 > * + * { margin-left: 1rem; }
.space-x-6 > * + * { margin-left: 1.5rem; }
.space-x-8 > * + * { margin-left: 2rem; }
.space-y-4 > * + * { margin-top: 1rem; }

.h-6 { height: 1.5rem; }
.h-16 { height: 4rem; }
.w-6 { width: 1.5rem; }

.border-b { border-bottom: 1px solid #e5e7eb; }
.border-t { border-top: 1px solid #e5e7eb; }
.border-gray-200 { border-color: #e5e7eb; }

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
}

.hover\:text-blue-600:hover { color: #2563eb; }
.hover\:text-gray-900:hover { color: #111827; }
.hover\:text-blue-800:hover { color: #1e40af; }
.hover\:underline:hover { text-decoration: underline; }

.focus\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
.focus\:text-gray-900:focus { color: #111827; }

/* 隐藏/显示类 */
.hidden { display: none; }

/* 响应式设计 */
@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
}

/* 链接样式 */
a {
  text-decoration: none;
  transition: color 0.2s ease;
}

/* 确保页面最小高度 */
.min-h-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* 导航栏样式 */
nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
}

/* 活跃链接样式 */
.router-link-active {
  color: #2563eb;
  font-weight: 500;
}

/* 移动端菜单动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hidden { display: block; }
  .md\:hidden { display: none; }
  .md\:flex { display: none; }
}
</style>
