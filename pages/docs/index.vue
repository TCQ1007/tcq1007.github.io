<template>
  <div style="background: #0a0e27; min-height: 100vh; color: #ffffff;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <!-- 返回按钮 -->
      <div style="margin-bottom: 2rem;">
        <NuxtLink to="/" style="color: #63b3ed; text-decoration: none;">
          ← 返回首页
        </NuxtLink>
      </div>

      <!-- 页面标题 -->
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">
          📚 项目文档
        </h1>
        <p style="color: #a0aec0; font-size: 1.125rem;">
          技术文档、设置指南和项目说明
        </p>
      </div>

      <!-- 文档分类 -->
      <div style="margin-bottom: 3rem;">
        <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
          <button
            v-for="category in categories"
            :key="category.name"
            @click="activeCategory = category.name"
            :style="{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              background: activeCategory === category.name ? category.color : 'rgba(45, 55, 72, 0.8)',
              color: activeCategory === category.name ? '#1a202c' : '#e2e8f0',
              boxShadow: activeCategory === category.name ? `0 4px 12px ${category.color}40` : 'none'
            }"
          >
            {{ category.icon }} {{ category.name }}
            <span style="margin-left: 0.5rem; padding: 0.25rem 0.5rem; background: rgba(0,0,0,0.2); border-radius: 12px; font-size: 0.75rem;">
              {{ category.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- 文档列表 -->
      <div v-if="filteredDocs && filteredDocs.length" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
        <article
          v-for="doc in filteredDocs"
          :key="doc.path || doc._path"
          style="background: linear-gradient(145deg, #2d3748, #4a5568); border-radius: 12px; padding: 1.5rem; border: 1px solid #4a5568; transition: all 0.3s ease; position: relative; overflow: hidden;"
          class="hover-lift"
        >
          <NuxtLink :to="doc.path || doc._path" style="text-decoration: none; color: inherit; display: block;">
            <!-- 文档分类 -->
            <div style="margin-bottom: 1rem;">
              <span style="display: inline-block; padding: 0.25rem 0.75rem; background: rgba(104, 211, 145, 0.2); color: #68d391; border-radius: 12px; font-size: 0.75rem; font-weight: 500;">
                {{ doc.category || '文档' }}
              </span>
            </div>

            <!-- 文档标题 -->
            <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.4;">
              {{ doc.title }}
            </h3>

            <!-- 文档描述 -->
            <p style="color: #e2e8f0; margin-bottom: 1.5rem; line-height: 1.6; opacity: 0.9;">
              {{ doc.description }}
            </p>

            <!-- 文档元信息 -->
            <div style="display: flex; justify-content: space-between; align-items: center; color: #a0aec0; font-size: 0.875rem;">
              <span>{{ formatDate(doc.date) }}</span>
              <span v-if="doc.author">{{ doc.author }}</span>
            </div>

            <!-- 标签 -->
            <div v-if="doc.tags && doc.tags.length" style="margin-top: 1rem;">
              <span
                v-for="tag in doc.tags.slice(0, 3)"
                :key="tag"
                style="display: inline-block; margin-right: 0.5rem; margin-bottom: 0.5rem; padding: 0.25rem 0.5rem; background: rgba(99, 179, 237, 0.2); color: #63b3ed; border-radius: 8px; font-size: 0.75rem;"
              >
                #{{ tag }}
              </span>
              <span
                v-if="doc.tags.length > 3"
                style="display: inline-block; padding: 0.25rem 0.5rem; background: rgba(160, 174, 192, 0.2); color: #a0aec0; border-radius: 8px; font-size: 0.75rem;"
              >
                +{{ doc.tags.length - 3 }}
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- 空状态 -->
      <div v-else style="text-align: center; padding: 4rem 0;">
        <div style="max-width: 400px; margin: 0 auto;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">📚</div>
          <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
            {{ activeCategory === '全部' ? '文档正在整理中' : `${activeCategory} 分类暂无文档` }}
          </h3>
          <p style="color: #ffffff; margin-bottom: 2rem; opacity: 0.8;">
            {{ activeCategory === '全部' ? '项目文档即将上线，敬请期待' : '敬请期待更多内容' }}
          </p>
          <button
            v-if="activeCategory !== '全部'"
            @click="activeCategory = '全部'"
            style="padding: 0.75rem 1.5rem; background: linear-gradient(45deg, #63b3ed, #68d391); color: #1a202c; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s ease;"
            @mouseover="$event.target.style.transform = 'scale(1.05)'"
            @mouseout="$event.target.style.transform = 'scale(1)'"
          >
            查看全部文档
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: '项目文档 - TCQ1007 的技术博客',
  meta: [
    {
      name: 'description',
      content: 'TCQ1007 技术博客的项目文档，包含技术说明、设置指南和架构设计'
    }
  ]
})

// 获取所有文档
const { data: docs, pending } = await useAsyncData('all-docs', async () => {
  try {
    const result = await queryCollection('docs')
      .order('date', 'DESC')
      .all()
    return result || []
  } catch (err) {
    console.error('查询文档时发生错误:', err)
    return []
  }
})

// 分类管理
const activeCategory = ref('全部')

// 分类配置
const categoryConfig = {
  '全部': { icon: '📚', color: '#63b3ed' },
  '技术文档': { icon: '⚙️', color: '#68d391' },
  '快速参考': { icon: '📋', color: '#f6ad55' },
  '设置指南': { icon: '🔧', color: '#ed64a6' },
  '架构设计': { icon: '🏗️', color: '#9f7aea' }
}

// 计算分类统计
const categories = computed(() => {
  if (!docs.value) return []
  
  const categoryStats = {}
  
  // 统计每个分类的文档数量
  docs.value.forEach(doc => {
    const category = doc.category || '其他'
    categoryStats[category] = (categoryStats[category] || 0) + 1
  })
  
  // 构建分类列表
  const result = [
    {
      name: '全部',
      icon: categoryConfig['全部'].icon,
      color: categoryConfig['全部'].color,
      count: docs.value.length
    }
  ]
  
  // 添加其他分类
  Object.entries(categoryStats).forEach(([category, count]) => {
    if (category !== '全部') {
      const config = categoryConfig[category] || { icon: '📄', color: '#a0aec0' }
      result.push({
        name: category,
        icon: config.icon,
        color: config.color,
        count
      })
    }
  })
  
  return result
})

// 过滤文档
const filteredDocs = computed(() => {
  if (!docs.value) return []
  
  if (activeCategory.value === '全部') {
    return docs.value
  }
  
  return docs.value.filter(doc => doc.category === activeCategory.value)
})

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}
</style>
