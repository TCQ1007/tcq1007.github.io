// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-06',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],

  // 确保自动导入正常工作
  imports: {
    autoImport: true
  },

  // Content 模块配置
  content: {
    // 启用语法高亮
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  }
})