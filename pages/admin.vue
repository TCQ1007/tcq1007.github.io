<template>
  <div style="min-height: 100vh; background: #0a0e27; color: #ffffff;">
    <!-- 管理后台导航 -->
    <nav style="background: rgba(26, 32, 44, 0.95); border-bottom: 1px solid #4a5568; padding: 1rem 0; position: sticky; top: 0; z-index: 50; backdrop-filter: blur(20px);">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <h1 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin: 0;">
            📝 博客管理后台
          </h1>
        </div>
        
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button
            @click="createNewArticle"
            style="padding: 0.5rem 1rem; background: linear-gradient(45deg, #63b3ed, #68d391); color: #1a202c; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: transform 0.2s ease;"
            @mouseover="$event.target.style.transform = 'scale(1.05)'"
            @mouseout="$event.target.style.transform = 'scale(1)'"
          >
            ✨ 新建文章
          </button>
          
          <NuxtLink
            to="/"
            style="color: #ffffff; text-decoration: none; font-weight: 500; transition: all 0.2s ease; padding: 0.5rem 1rem; border-radius: 6px;"
            @mouseover="$event.target.style.color = '#63b3ed'; $event.target.style.background = 'rgba(99, 179, 237, 0.2)'"
            @mouseout="$event.target.style.color = '#ffffff'; $event.target.style.background = 'transparent'"
          >
            🏠 返回首页
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <!-- 文章列表 -->
      <div v-if="!showEditor" style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; color: #ffffff;">
          📚 文章管理
        </h2>
        
        <div v-if="pending" style="text-align: center; padding: 2rem;">
          <div style="color: #63b3ed; font-size: 1.125rem;">加载中...</div>
        </div>
        
        <div v-else-if="error" style="text-align: center; padding: 2rem;">
          <div style="color: #f56565; font-size: 1.125rem;">加载失败: {{ error }}</div>
        </div>
        
        <div v-else style="display: grid; gap: 1rem;">
          <div
            v-for="article in articles"
            :key="article.path"
            style="background: rgba(45, 55, 72, 0.8); border: 1px solid #4a5568; border-radius: 8px; padding: 1.5rem; transition: all 0.2s ease;"
            @mouseover="$event.currentTarget.style.background = 'rgba(45, 55, 72, 0.9)'"
            @mouseout="$event.currentTarget.style.background = 'rgba(45, 55, 72, 0.8)'"
          >
            <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
              <div style="flex: 1;">
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #ffffff;">
                  {{ article.title }}
                </h3>
                <p style="color: #e2e8f0; margin-bottom: 0.5rem; opacity: 0.8;">
                  {{ article.description }}
                </p>
                <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: #a0aec0;">
                  <span>📅 {{ formatDate(article.date) }}</span>
                  <span>📂 {{ article.category }}</span>
                  <span>👤 {{ article.author }}</span>
                </div>
              </div>
              
              <div style="display: flex; gap: 0.5rem;">
                <button
                  @click="editArticle(article)"
                  style="padding: 0.5rem 1rem; background: #63b3ed; color: #1a202c; border: none; border-radius: 4px; font-size: 0.875rem; cursor: pointer; transition: background 0.2s ease;"
                  @mouseover="$event.target.style.background = '#4299e1'"
                  @mouseout="$event.target.style.background = '#63b3ed'"
                >
                  ✏️ 编辑
                </button>
                <button
                  @click="deleteArticle(article)"
                  style="padding: 0.5rem 1rem; background: #f56565; color: #ffffff; border: none; border-radius: 4px; font-size: 0.875rem; cursor: pointer; transition: background 0.2s ease;"
                  @mouseover="$event.target.style.background = '#e53e3e'"
                  @mouseout="$event.target.style.background = '#f56565'"
                >
                  🗑️ 删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 编辑器 -->
      <div v-if="showEditor">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #ffffff; margin: 0;">
            {{ editingArticle ? '✏️ 编辑文章' : '✨ 新建文章' }}
          </h2>
          
          <div style="display: flex; gap: 0.5rem;">
            <button
              @click="saveArticle"
              style="padding: 0.5rem 1rem; background: linear-gradient(45deg, #63b3ed, #68d391); color: #1a202c; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: transform 0.2s ease;"
              @mouseover="$event.target.style.transform = 'scale(1.05)'"
              @mouseout="$event.target.style.transform = 'scale(1)'"
            >
              💾 保存
            </button>
            <button
              @click="showEditor = false; editingArticle = null"
              style="padding: 0.5rem 1rem; background: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid #4a5568; border-radius: 6px; cursor: pointer; transition: background 0.2s ease;"
              @mouseover="$event.target.style.background = 'rgba(255, 255, 255, 0.2)'"
              @mouseout="$event.target.style.background = 'rgba(255, 255, 255, 0.1)'"
            >
              ❌ 取消
            </button>
          </div>
        </div>

        <!-- 文章元信息表单 -->
        <div style="background: rgba(45, 55, 72, 0.8); border: 1px solid #4a5568; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">标题</label>
              <input
                v-model="articleForm.title"
                type="text"
                placeholder="文章标题"
                style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem;"
              />
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">作者</label>
              <input
                v-model="articleForm.author"
                type="text"
                placeholder="作者名称"
                style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem;"
              />
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">分类</label>
              <select
                v-model="articleForm.category"
                style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem;"
              >
                <option value="技术说明">技术说明</option>
                <option value="方案设计">方案设计</option>
                <option value="AI相关">AI相关</option>
              </select>
            </div>
          </div>
          
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">描述</label>
            <textarea
              v-model="articleForm.description"
              placeholder="文章描述"
              rows="3"
              style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem; resize: vertical;"
            ></textarea>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">标签 (用逗号分隔)</label>
            <input
              v-model="articleForm.tagsString"
              type="text"
              placeholder="标签1, 标签2, 标签3"
              style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem;"
            />
          </div>
        </div>

        <!-- Markdown 编辑器 -->
        <div style="background: rgba(45, 55, 72, 0.8); border: 1px solid #4a5568; border-radius: 8px; overflow: hidden;">
          <!-- 工具栏 -->
          <div style="border-bottom: 1px solid #4a5568; padding: 1rem; background: rgba(26, 32, 44, 0.8);">
            <h3 style="font-size: 1rem; font-weight: 600; margin: 0; color: #ffffff;">
              ✏️ Markdown 编辑器
            </h3>
          </div>

          <!-- 编辑器内容区域 -->
          <textarea
            v-model="editorContent"
            placeholder="在这里输入 Markdown 内容..."
            style="
              width: 100%;
              min-height: 400px;
              padding: 1.5rem;
              background: transparent;
              border: none;
              color: #e2e8f0;
              font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
              font-size: 0.875rem;
              line-height: 1.6;
              resize: vertical;
              outline: none;
            "
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

// 检查是否为生产环境
const config = useRuntimeConfig()
const isProduction = config.public.NODE_ENV === 'production'

// 如果是生产环境，抛出 404 错误
if (isProduction) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

// 页面元数据
useHead({
  title: '博客管理后台 - TCQ007 的技术博客',
  meta: [
    { name: 'description', content: '博客文章管理后台，支持创建、编辑和删除文章' }
  ]
})

// 响应式数据
const showEditor = ref(false)
const editingArticle = ref(null)

// 文章表单数据
const articleForm = ref({
  title: '',
  description: '',
  author: 'TCQ007',
  category: '技术说明',
  tagsString: '',
  content: ''
})

// 获取文章列表
const { data: articles, pending, error, refresh } = await useAsyncData('admin-articles', async () => {
  try {
    const result = await queryCollection('blog')
      .order('date', 'DESC')
      .all()
    return result || []
  } catch (error) {
    console.error('获取文章失败:', error)
    return []
  }
})

// 编辑器内容
const editorContent = ref('')

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 新建文章
const createNewArticle = () => {
  editingArticle.value = null
  showEditor.value = true

  // 重置表单数据
  articleForm.value = {
    title: '',
    description: '',
    author: 'TCQ007',
    category: '技术说明',
    tagsString: '',
  }

  // 设置默认编辑器内容
  editorContent.value = `# 新文章标题

在这里编写文章的简介或摘要...

## 主要内容

### 小节标题

这里是正文内容，支持 **粗体** 和 *斜体* 文字。

### 代码示例

\`\`\`javascript
function example() {
  console.log('Hello, World!')
}
\`\`\`

### 列表示例

- 项目 1
- 项目 2
- 项目 3

### 链接和引用

[链接文本](https://example.com)

> 这是一个引用块，用于突出重要信息。

## 总结

文章的总结内容...
`
}

// 编辑文章
const editArticle = async (article) => {
  try {
    editingArticle.value = article
    showEditor.value = true

    // 获取文件名
    let filename = article.path?.split('/').pop()
    if (!filename) {
      alert('无法获取文件名')
      return
    }

    // 确保文件名包含 .md 扩展名
    if (!filename.endsWith('.md')) {
      filename += '.md'
    }

    // 获取原始文件内容
    const response = await $fetch(`/api/admin/articles/${filename}`)

    if (response.success) {
      // 填充表单数据
      articleForm.value = {
        title: response.frontmatter.title || '',
        description: response.frontmatter.description || '',
        author: response.frontmatter.author || 'TCQ007',
        category: response.frontmatter.category || '技术说明',
        tagsString: Array.isArray(response.frontmatter.tags)
          ? response.frontmatter.tags.join(', ')
          : (response.frontmatter.tags || ''),
      }

      // 设置编辑器内容 - 使用原始 Markdown 内容
      editorContent.value = response.content || ''
    } else {
      alert('获取文章内容失败')
    }
  } catch (error) {
    console.error('编辑文章失败:', error)
    alert('编辑文章失败: ' + error.message)

    // 如果获取失败，使用默认模板
    articleForm.value = {
      title: article.title || '',
      description: article.description || '',
      author: article.author || 'TCQ007',
      category: article.category || '技术说明',
      tagsString: article.tags ? article.tags.join(', ') : '',
    }

    const markdownTemplate = `# ${article.title || '文章标题'}

${article.description || '文章描述...'}

## 主要内容

在这里编写文章的主要内容...
`
    editorContent.value = markdownTemplate
  }
}



// 保存文章
const saveArticle = async () => {
  try {
    if (!articleForm.value.title.trim()) {
      alert('请输入文章标题')
      return
    }

    const content = editorContent.value // 直接使用 Markdown 内容
    const tags = articleForm.value.tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)

    const frontmatter = {
      title: articleForm.value.title,
      description: articleForm.value.description,
      date: editingArticle.value?.date || new Date().toISOString().split('T')[0],
      tags: tags,
      author: articleForm.value.author,
      category: articleForm.value.category
    }

    let filename = editingArticle.value?.path?.split('/').pop()

    if (!filename) {
      // 生成新文件名 - 智能处理中文
      let baseFilename = articleForm.value.title.trim()

      // 如果标题包含中文，使用拼音或保持中文
      if (/[\u4e00-\u9fff]/.test(baseFilename)) {
        // 包含中文字符，保持原样但做安全处理
        baseFilename = baseFilename
          .replace(/\s+/g, '-')                    // 空格转连字符
          .replace(/[<>:"/\\|?*]/g, '')           // 移除文件系统不允许的字符
          .replace(/\.+$/g, '')                   // 移除结尾的点
          .replace(/^-+|-+$/g, '')                // 移除开头和结尾的连字符
          .substring(0, 50)                       // 中文文件名限制更短
      } else {
        // 纯英文，转小写并处理
        baseFilename = baseFilename
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .replace(/^-+|-+$/g, '')
          .substring(0, 100)
      }

      // 如果处理后的文件名为空，使用默认名称
      if (!baseFilename) {
        baseFilename = `article-${Date.now()}`
      }

      filename = `${baseFilename}.md`
    }

    // 确保文件名包含 .md 扩展名
    if (!filename.endsWith('.md')) {
      filename += '.md'
    }

    // 调用 API 保存文章
    const response = await $fetch('/api/admin/articles', {
      method: 'POST',
      body: {
        frontmatter,
        content,
        filename,
        action: 'save'
      }
    })

    if (response.success) {
      alert('文章保存成功！')
      showEditor.value = false
      editingArticle.value = null
      await refresh()
    } else {
      alert('保存失败: ' + response.message)
    }
  } catch (error) {
    console.error('保存文章失败:', error)
    alert('保存失败: ' + (error.data?.message || error.message || '未知错误'))
  }
}

// 删除文章
const deleteArticle = async (article) => {
  if (confirm(`确定要删除文章 "${article.title}" 吗？`)) {
    try {
      let filename = article.path?.split('/').pop()
      if (!filename) {
        alert('无法获取文件名')
        return
      }

      // 确保文件名包含 .md 扩展名
      if (!filename.endsWith('.md')) {
        filename += '.md'
      }

      // 调用 API 删除文章
      const response = await $fetch('/api/admin/articles', {
        method: 'POST',
        body: {
          filename,
          action: 'delete'
        }
      })

      if (response.success) {
        alert('文章删除成功！')
        await refresh()
      } else {
        alert('删除失败: ' + response.message)
      }
    } catch (error) {
      console.error('删除文章失败:', error)
      alert('删除失败: ' + error.message)
    }
  }
}


</script>


