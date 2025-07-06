<template>
  <div style="padding: 2rem; font-family: Arial, sans-serif;">
    <h1>简单测试页面</h1>

    <div style="margin: 2rem 0;">
      <h2>文章列表</h2>

      <div v-if="pending">
        加载中...
      </div>

      <div v-else-if="error">
        错误: {{ error }}
      </div>

      <div v-else-if="data && data.length > 0">
        <p>找到 {{ data.length }} 篇文章:</p>
        <ul>
          <li v-for="article in data" :key="article._path" style="margin: 1rem 0; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;">
            <h3 style="margin: 0 0 0.5rem 0;">{{ article.title }}</h3>
            <p style="margin: 0 0 0.5rem 0; color: #666;">{{ article.description }}</p>
            <small style="color: #999;">{{ article.date }} | 路径: {{ article._path }}</small>
          </li>
        </ul>
      </div>

      <div v-else>
        没有找到文章
        <br>
        <small>数据: {{ JSON.stringify(data) }}</small>
      </div>
    </div>

    <div style="margin-top: 2rem;">
      <a href="/" style="color: blue; text-decoration: underline;">返回首页</a> |
      <a href="/debug" style="color: blue; text-decoration: underline;">调试页面</a>
    </div>
  </div>
</template>

<script setup>
// 移除手动导入，依赖自动导入

// 使用正确的 Nuxt Content 3 语法
const { data, pending, error } = await useAsyncData('simple-articles', async () => {
  try {
    // 查询博客内容
    return await queryContent('blog').find()
  } catch (err) {
    console.error('查询错误:', err)
    console.error('错误详情:', err.message)
    return []
  }
})
</script>
