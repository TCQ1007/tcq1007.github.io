<template>
  <div style="padding: 2rem; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
    <h1>调试页面</h1>
    
    <div style="margin: 2rem 0; padding: 1rem; background: #f0f0f0; border-radius: 8px;">
      <h2>Content 模块测试</h2>
      
      <div v-if="pending" style="color: #666;">
        ⏳ 加载中...
      </div>
      
      <div v-else-if="error" style="color: #d32f2f; background: #ffebee; padding: 1rem; border-radius: 4px;">
        ❌ 错误: {{ error }}
      </div>
      
      <div v-else-if="articles && articles.length > 0" style="color: #2e7d32;">
        ✅ 成功找到 {{ articles.length }} 篇文章:
        <ul style="margin-top: 1rem;">
          <li v-for="article in articles" :key="article._path" style="margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 4px;">
            <strong>{{ article.title || '无标题' }}</strong><br>
            <small style="color: #666;">
              路径: {{ article._path }}<br>
              日期: {{ article.date || '无日期' }}<br>
              描述: {{ article.description || '无描述' }}
            </small>
          </li>
        </ul>
      </div>
      
      <div v-else style="color: #ff9800;">
        ⚠️ 没有找到文章
      </div>
    </div>
    
    <div style="margin: 2rem 0; padding: 1rem; background: #e3f2fd; border-radius: 8px;">
      <h3>调试信息</h3>
      <pre style="background: white; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 12px;">{{ debugInfo }}</pre>
    </div>
    
    <div style="margin-top: 2rem;">
      <a href="/" style="color: #1976d2; text-decoration: underline;">← 返回首页</a>
    </div>
  </div>
</template>

<script setup>
// 设置页面标题
useHead({
  title: '调试页面 - 技术博客'
})

// 初始化响应式变量
const articles = ref([])
const pending = ref(true)
const error = ref(null)
const debugInfo = ref({})

// 在组件挂载后执行
onMounted(async () => {
  try {
    console.log('开始查询内容...')
    
    // 尝试查询内容
    const result = await queryContent('/blog').find()
    
    console.log('查询结果:', result)
    
    articles.value = result
    pending.value = false
    
    debugInfo.value = {
      timestamp: new Date().toISOString(),
      articlesCount: result.length,
      queryPath: '/blog',
      firstArticle: result[0] || null,
      allPaths: result.map(a => a._path)
    }
    
  } catch (err) {
    console.error('查询内容时出错:', err)
    error.value = err.message
    pending.value = false
    
    debugInfo.value = {
      timestamp: new Date().toISOString(),
      error: err.message,
      stack: err.stack
    }
  }
})

// 也尝试使用 useAsyncData
const { data: asyncArticles, pending: asyncPending, error: asyncError } = await useAsyncData('debug-articles', async () => {
  try {
    return await queryContent('/blog').find()
  } catch (err) {
    console.error('useAsyncData 错误:', err)
    throw err
  }
})

// 监听异步数据变化
watch([asyncArticles, asyncPending, asyncError], ([data, loading, err]) => {
  console.log('useAsyncData 状态变化:', { data, loading, err })
  
  if (!loading && !err && data) {
    debugInfo.value = {
      ...debugInfo.value,
      useAsyncDataResult: {
        success: true,
        articlesCount: data.length,
        articles: data
      }
    }
  }
}, { immediate: true })
</script>
