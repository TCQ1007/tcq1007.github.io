// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-06',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/color-mode'],

  // GitHub Pages 部署配置
  nitro: {
    prerender: {
      crawlLinks: true,
      // 忽略受保护的管理页面
      ignore: ['/admin', '/editor']
    },
    // 支持中文文件名
    experimental: {
      wasm: true
    }
  },

  // 静态生成配置
  ssr: true,

  // Nuxt Content 3 配置
  content: {

  },
  // 主题配置
  colorMode: {
    preference: 'dark', // 默认主题
    fallback: 'dark', // 回退主题
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },

  // 确保自动导入正常工作
  imports: {
    autoImport: true,
  },

  // Vite 配置 - 支持中文文件名
  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    },
    build: {
      rollupOptions: {
        external: [],
        output: {
          // 确保中文文件名正确处理
          sanitizeFileName: (name) => {
            // 保留中文字符，只移除文件系统不允许的字符
            return name.replace(/[<>:"/\\|?*]/g, '_')
          }
        }
      }
    }
  },

  // 运行时配置
  runtimeConfig: {
    public: {
      NODE_ENV: process.env.NODE_ENV
    }
  },

  // 构建钩子
  hooks: {
    'build:before': () => {
      if (process.env.NODE_ENV === 'production') {
        console.log('🔒 生产环境构建：管理和编辑页面将被保护')
      }
    }
  }
})
