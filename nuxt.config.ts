// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-06',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],

  // Nuxt Content 3 配置 - 启用 MDC 语法
  content:{
    build: {
      markdown: {
        highlight: false
    }
  }},
  // 确保自动导入正常工作
  imports: {
    autoImport: true
  },
})