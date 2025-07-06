<template>
  <div style="padding: 2rem; font-family: Arial, sans-serif;">
    <h1>内容测试页面</h1>
    
    <div style="margin: 2rem 0; padding: 1rem; background: #f0f0f0; border-radius: 8px;">
      <h2>测试结果</h2>
      
      <div v-if="pending">
        ⏳ 加载中...
      </div>
      
      <div v-else-if="error">
        ❌ 错误: {{ error }}
      </div>
      
      <div v-else>
        ✅ 成功！找到 {{ articles?.length || 0 }} 篇文章
        
        <div v-if="articles && articles.length > 0" style="margin-top: 1rem;">
          <h3>文章列表:</h3>
          <ul>
            <li v-for="article in articles" :key="article._path" style="margin: 0.5rem 0;">
              <strong>{{ article.title }}</strong><br>
              <small>路径: {{ article._path }}</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div style="margin-top: 2rem;">
      <a href="/" style="color: blue; text-decoration: underline;">← 返回首页</a>
    </div>
  </div>
</template>

<script setup>
// 移除手动导入，依赖自动导入

// 设置页面标题
useHead({
  title: '内容测试页面'
})

// 使用自定义 composable
const { queryAllContent } = useContentQuery()

// 尝试最简单的查询
const { data: articles, pending, error } = await useAsyncData('test-content', async () => {
  try {
    // 直接查询所有内容
    return await queryAllContent()
  } catch (err) {
    console.error('查询错误:', err)
    throw err
  }
})
</script>
