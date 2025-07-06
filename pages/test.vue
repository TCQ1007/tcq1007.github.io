<template>
  <div style="padding: 2rem; font-family: Arial, sans-serif;">
    <h1>测试页面</h1>
    <p>这是一个测试页面，用于验证基本功能。</p>
    
    <div style="margin-top: 2rem;">
      <h2>Content 测试</h2>
      <div v-if="pending">加载中...</div>
      <div v-else-if="error">错误: {{ error }}</div>
      <div v-else-if="articles && articles.length > 0">
        <p>找到 {{ articles.length }} 篇文章:</p>
        <ul>
          <li v-for="article in articles" :key="article._path">
            <strong>{{ article.title }}</strong> - {{ article.date }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>没有找到文章</p>
      </div>
    </div>
    
    <div style="margin-top: 2rem;">
      <a href="/" style="color: blue; text-decoration: underline;">返回首页</a>
    </div>
  </div>
</template>

<script setup>
// 简单的测试逻辑
const articles = ref([])
const pending = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    // 尝试直接使用 queryContent
    const result = await queryContent('/blog').find()
    articles.value = result
    pending.value = false
  } catch (err) {
    console.error('Error in test page:', err)
    error.value = err.message
    pending.value = false
  }
})
</script>
