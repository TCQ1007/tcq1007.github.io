<template>
  <div style="background: #0a0e27; min-height: 100vh; color: #ffffff; padding: 2rem;">
    <h1>Nuxt Content 调试页面</h1>
    
    <div style="margin: 2rem 0;">
      <h2>查询所有内容</h2>
      <button @click="queryAllContent" style="padding: 0.5rem 1rem; background: #63b3ed; color: white; border: none; border-radius: 4px; cursor: pointer;">
        查询所有内容
      </button>
      <pre v-if="allContentResult" style="background: #1a202c; padding: 1rem; border-radius: 8px; overflow-x: auto; margin-top: 1rem;">{{ JSON.stringify(allContentResult, null, 2) }}</pre>
    </div>
    
    <div style="margin: 2rem 0;">
      <h2>查询 docs 目录</h2>
      <button @click="queryDocsContent" style="padding: 0.5rem 1rem; background: #68d391; color: white; border: none; border-radius: 4px; cursor: pointer;">
        查询 docs 内容
      </button>
      <pre v-if="docsContentResult" style="background: #1a202c; padding: 1rem; border-radius: 8px; overflow-x: auto; margin-top: 1rem;">{{ JSON.stringify(docsContentResult, null, 2) }}</pre>
    </div>
    
    <div style="margin: 2rem 0;">
      <h2>查询特定文档</h2>
      <input 
        v-model="docPath" 
        placeholder="输入文档路径，如: comment-system-guide"
        style="padding: 0.5rem; margin-right: 1rem; background: #2d3748; color: white; border: 1px solid #4a5568; border-radius: 4px;"
      />
      <button @click="querySpecificDoc" style="padding: 0.5rem 1rem; background: #f6ad55; color: white; border: none; border-radius: 4px; cursor: pointer;">
        查询特定文档
      </button>
      <pre v-if="specificDocResult" style="background: #1a202c; padding: 1rem; border-radius: 8px; overflow-x: auto; margin-top: 1rem;">{{ JSON.stringify(specificDocResult, null, 2) }}</pre>
    </div>
    
    <div style="margin: 2rem 0;">
      <h2>错误信息</h2>
      <pre v-if="errorMessage" style="background: #742a2a; padding: 1rem; border-radius: 8px; overflow-x: auto; color: #fed7d7;">{{ errorMessage }}</pre>
    </div>
  </div>
</template>

<script setup>
const allContentResult = ref(null)
const docsContentResult = ref(null)
const specificDocResult = ref(null)
const errorMessage = ref('')
const docPath = ref('comment-system-guide')

const queryAllContent = async () => {
  try {
    errorMessage.value = ''
    console.log('查询所有内容...')
    const result = await queryContent().find()
    console.log('所有内容结果:', result)
    allContentResult.value = result.map(item => ({
      _path: item._path,
      title: item.title,
      description: item.description,
      category: item.category
    }))
  } catch (error) {
    console.error('查询所有内容失败:', error)
    errorMessage.value = `查询所有内容失败: ${error.message}`
  }
}

const queryDocsContent = async () => {
  try {
    errorMessage.value = ''
    console.log('查询 docs 内容...')
    
    // 尝试多种查询方式
    let result = null
    
    // 方式1: queryContent('docs')
    try {
      result = await queryContent('docs').find()
      console.log('方式1结果:', result)
    } catch (e) {
      console.log('方式1失败:', e.message)
    }
    
    // 方式2: queryContent('/docs')
    if (!result || result.length === 0) {
      try {
        result = await queryContent('/docs').find()
        console.log('方式2结果:', result)
      } catch (e) {
        console.log('方式2失败:', e.message)
      }
    }
    
    // 方式3: 从所有内容中过滤
    if (!result || result.length === 0) {
      try {
        const all = await queryContent().find()
        result = all.filter(item => item._path && item._path.startsWith('/docs'))
        console.log('方式3结果:', result)
      } catch (e) {
        console.log('方式3失败:', e.message)
      }
    }
    
    docsContentResult.value = result ? result.map(item => ({
      _path: item._path,
      title: item.title,
      description: item.description,
      category: item.category
    })) : []
  } catch (error) {
    console.error('查询 docs 内容失败:', error)
    errorMessage.value = `查询 docs 内容失败: ${error.message}`
  }
}

const querySpecificDoc = async () => {
  try {
    errorMessage.value = ''
    console.log('查询特定文档:', docPath.value)
    
    let result = null
    
    // 尝试多种路径格式
    const paths = [
      `/docs/${docPath.value}`,
      `docs/${docPath.value}`,
      docPath.value
    ]
    
    for (const path of paths) {
      try {
        console.log('尝试路径:', path)
        result = await queryContent(path).findOne()
        if (result) {
          console.log('成功找到文档:', path)
          break
        }
      } catch (e) {
        console.log(`路径 ${path} 失败:`, e.message)
      }
    }
    
    if (!result) {
      // 从所有内容中查找
      const all = await queryContent().find()
      result = all.find(item => 
        item._path && (
          item._path.includes(docPath.value) ||
          item._path.endsWith(`/${docPath.value}`)
        )
      )
    }
    
    specificDocResult.value = result ? {
      _path: result._path,
      title: result.title,
      description: result.description,
      category: result.category,
      content: result.body ? '有内容' : '无内容'
    } : null
    
    if (!result) {
      errorMessage.value = `未找到文档: ${docPath.value}`
    }
  } catch (error) {
    console.error('查询特定文档失败:', error)
    errorMessage.value = `查询特定文档失败: ${error.message}`
  }
}

// 页面加载时自动查询
onMounted(() => {
  queryAllContent()
})
</script>
