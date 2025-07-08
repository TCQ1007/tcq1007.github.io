<template>
  <div style="background: #0a0e27; min-height: 100vh; color: #e2e8f0;">
    <!-- 测试页面 -->
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <h1 style="color: #ffffff; text-align: center; margin-bottom: 2rem;">
        TCQ1007 的技术博客
      </h1>
      
      <!-- 主栏目导航 -->
      <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 3rem;">
        <button
          @click="activeSection = 'blog'"
          :style="{
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: activeSection === 'blog' ? 'linear-gradient(45deg, #63b3ed, #68d391)' : 'rgba(45, 55, 72, 0.8)',
            color: activeSection === 'blog' ? '#1a202c' : '#e2e8f0'
          }"
        >
          📝 博客文章
        </button>
        <button
          @click="activeSection = 'docs'"
          :style="{
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: activeSection === 'docs' ? 'linear-gradient(45deg, #63b3ed, #68d391)' : 'rgba(45, 55, 72, 0.8)',
            color: activeSection === 'docs' ? '#1a202c' : '#e2e8f0'
          }"
        >
          📚 项目文档
        </button>
      </div>

      <!-- 博客文章区域 -->
      <div v-show="activeSection === 'blog'">
        <h2 style="color: #ffffff; text-align: center; margin-bottom: 2rem;">
          博客文章
        </h2>
        <div v-if="articles && articles.length" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
          <article
            v-for="article in articles"
            :key="article.path"
            style="background: linear-gradient(145deg, #2d3748, #4a5568); border-radius: 12px; padding: 1.5rem; border: 1px solid #4a5568;"
          >
            <h3 style="color: #ffffff; margin-bottom: 1rem;">{{ article.title }}</h3>
            <p style="color: #e2e8f0; margin-bottom: 1rem;">{{ article.description }}</p>
            <NuxtLink :to="article.path" style="color: #63b3ed; text-decoration: none;">
              阅读更多 →
            </NuxtLink>
          </article>
        </div>
        <div v-else style="text-align: center; padding: 2rem;">
          <p style="color: #a0aec0;">暂无博客文章</p>
        </div>
      </div>

      <!-- 项目文档区域 -->
      <div v-show="activeSection === 'docs'">
        <h2 style="color: #ffffff; text-align: center; margin-bottom: 2rem;">
          项目文档
        </h2>
        <div v-if="docs && docs.length" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
          <article
            v-for="doc in docs"
            :key="doc.path || doc._path"
            style="background: linear-gradient(145deg, #2d3748, #4a5568); border-radius: 12px; padding: 1.5rem; border: 1px solid #4a5568;"
          >
            <h3 style="color: #ffffff; margin-bottom: 1rem;">{{ doc.title }}</h3>
            <p style="color: #e2e8f0; margin-bottom: 1rem;">{{ doc.description }}</p>
            <NuxtLink :to="doc.path || doc._path" style="color: #68d391; text-decoration: none;">
              查看文档 →
            </NuxtLink>
          </article>
        </div>
        <div v-else style="text-align: center; padding: 2rem;">
          <p style="color: #a0aec0;">暂无项目文档</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: 'TCQ1007 的技术博客',
  meta: [
    {
      name: 'description',
      content: 'TCQ1007 的技术博客'
    }
  ]
})

// 主栏目切换状态
const activeSection = ref('blog')

// 获取博客文章
const { data: articles } = await useAsyncData('articles', async () => {
  try {
    const result = await queryCollection('blog').order('date', 'DESC').all()
    return result || []
  } catch (err) {
    console.error('查询博客文章时发生错误:', err)
    return []
  }
})

// 获取项目文档
const { data: docs } = await useAsyncData('docs', async () => {
  try {
    const result = await queryCollection('docs').order('date', 'DESC').all()
    return result || []
  } catch (err) {
    console.error('查询文档时发生错误:', err)
    return []
  }
})
</script>
