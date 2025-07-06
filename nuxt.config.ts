// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-06',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],

  // GitHub Pages 部署配置
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },

  // 静态生成配置
  ssr: true,

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