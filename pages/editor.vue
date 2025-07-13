<template>
  <div style="min-height: 100vh; background: #0a0e27; color: #ffffff;">
    <!-- 编辑器导航 -->
    <nav style="background: rgba(26, 32, 44, 0.95); border-bottom: 1px solid #4a5568; padding: 1rem 0; position: sticky; top: 0; z-index: 50; backdrop-filter: blur(20px);">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <h1 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin: 0;">
            📝 Markdown 编辑器
          </h1>
        </div>
        
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button
            @click="downloadMarkdown"
            style="padding: 0.5rem 1rem; background: linear-gradient(45deg, #63b3ed, #68d391); color: #1a202c; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: transform 0.2s ease;"
            @mouseover="$event.target.style.transform = 'scale(1.05)'"
            @mouseout="$event.target.style.transform = 'scale(1)'"
          >
            💾 下载 Markdown
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
      <!-- 文章元信息表单 -->
      <div style="background: rgba(45, 55, 72, 0.8); border: 1px solid #4a5568; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #ffffff;">
          📋 文章信息
        </h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">标题</label>
            <input
              v-model="articleMeta.title"
              type="text"
              placeholder="文章标题"
              style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem;"
            />
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">作者</label>
            <input
              v-model="articleMeta.author"
              type="text"
              placeholder="作者名称"
              style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem;"
            />
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">分类</label>
            <select
              v-model="articleMeta.category"
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
            v-model="articleMeta.description"
            placeholder="文章描述"
            rows="3"
            style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem; resize: vertical;"
          ></textarea>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-weight: 500;">标签 (用逗号分隔)</label>
          <input
            v-model="articleMeta.tagsString"
            type="text"
            placeholder="标签1, 标签2, 标签3"
            style="width: 100%; padding: 0.75rem; background: rgba(26, 32, 44, 0.8); border: 1px solid #4a5568; border-radius: 6px; color: #ffffff; font-size: 1rem;"
          />
        </div>
      </div>

      <!-- 编辑器区域 -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; height: 600px;">
        <!-- Markdown 输入区域 -->
        <div style="background: rgba(45, 55, 72, 0.8); border: 1px solid #4a5568; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
          <div style="padding: 1rem; border-bottom: 1px solid #4a5568; background: rgba(26, 32, 44, 0.8);">
            <h3 style="font-size: 1rem; font-weight: 600; margin: 0; color: #ffffff;">
              ✏️ Markdown 编辑
            </h3>
          </div>
          
          <textarea
            v-model="markdownContent"
            placeholder="在这里输入 Markdown 内容..."
            style="
              flex: 1;
              padding: 1.5rem;
              background: transparent;
              border: none;
              color: #e2e8f0;
              font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
              font-size: 0.875rem;
              line-height: 1.6;
              resize: none;
              outline: none;
            "
          ></textarea>
        </div>

        <!-- 预览区域 -->
        <div style="background: rgba(45, 55, 72, 0.8); border: 1px solid #4a5568; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
          <div style="padding: 1rem; border-bottom: 1px solid #4a5568; background: rgba(26, 32, 44, 0.8);">
            <h3 style="font-size: 1rem; font-weight: 600; margin: 0; color: #ffffff;">
              👁️ 实时预览
            </h3>
          </div>
          
          <div 
            style="
              flex: 1;
              padding: 1.5rem;
              overflow-y: auto;
              color: #e2e8f0;
              line-height: 1.6;
            "
            v-html="renderedMarkdown"
          ></div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div style="background: rgba(45, 55, 72, 0.8); border: 1px solid #4a5568; border-radius: 8px; padding: 1.5rem; margin-top: 1.5rem;">
        <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem; color: #ffffff;">
          📖 使用说明
        </h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; font-size: 0.875rem; color: #e2e8f0;">
          <div>
            <h4 style="color: #63b3ed; margin-bottom: 0.5rem;">基本语法</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li># 标题1</li>
              <li>## 标题2</li>
              <li>**粗体** 或 __粗体__</li>
              <li>*斜体* 或 _斜体_</li>
              <li>`代码`</li>
            </ul>
          </div>
          
          <div>
            <h4 style="color: #68d391; margin-bottom: 0.5rem;">列表和链接</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>- 无序列表</li>
              <li>1. 有序列表</li>
              <li>[链接文本](URL)</li>
              <li>![图片](图片URL)</li>
            </ul>
          </div>
          
          <div>
            <h4 style="color: #f6ad55; margin-bottom: 0.5rem;">代码块</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>```语言名称</li>
              <li>代码内容</li>
              <li>```</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: 'Markdown 编辑器 - TCQ007 的技术博客',
  meta: [
    { name: 'description', content: '在线 Markdown 编辑器，支持实时预览和文档下载' }
  ]
})

// 响应式数据
const markdownContent = ref(`# 示例文章标题

这是一个示例文章，展示了 Markdown 的基本语法。

## 二级标题

这里是正文内容，支持 **粗体** 和 *斜体* 文字。

### 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

### 列表示例

- 项目 1
- 项目 2
- 项目 3

### 链接示例

[访问 GitHub](https://github.com)

> 这是一个引用块，用于突出重要信息。
`)

const articleMeta = ref({
  title: '示例文章标题',
  description: '这是一个示例文章，展示了 Markdown 编辑器的功能',
  author: 'TCQ007',
  category: '技术说明',
  tagsString: 'Markdown, 编辑器, 示例'
})

// 计算属性：渲染 Markdown
const renderedMarkdown = computed(() => {
  return renderMarkdown(markdownContent.value)
})

// 简单的 Markdown 渲染器
const renderMarkdown = (markdown) => {
  return markdown
    // 标题
    .replace(/^### (.*$)/gim, '<h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 1rem 0;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="color: #ffffff; font-size: 1.5rem; font-weight: 600; margin: 2rem 0 1rem 0;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="color: #ffffff; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">$1</h1>')
    
    // 代码块
    .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre style="background: #2d3748; border: 1px solid #4a5568; border-radius: 6px; padding: 1rem; margin: 1rem 0; overflow-x: auto;"><code style="color: #e2e8f0; font-family: \'JetBrains Mono\', \'Fira Code\', \'Consolas\', \'Monaco\', monospace;">$2</code></pre>')
    
    // 行内代码
    .replace(/`([^`]*)`/gim, '<code style="background: rgba(45, 55, 72, 0.8); color: #e2e8f0; padding: 0.25rem 0.5rem; border-radius: 4px; font-family: \'JetBrains Mono\', \'Fira Code\', \'Consolas\', \'Monaco\', monospace;">$1</code>')
    
    // 粗体和斜体
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #ffffff; font-weight: 600;">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em style="color: #e2e8f0; font-style: italic;">$1</em>')
    
    // 链接
    .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" style="color: #63b3ed; text-decoration: underline;" target="_blank">$1</a>')
    
    // 引用
    .replace(/^> (.*$)/gim, '<blockquote style="border-left: 4px solid #63b3ed; padding-left: 1rem; margin: 1rem 0; color: #a0aec0; font-style: italic;">$1</blockquote>')
    
    // 列表
    .replace(/^- (.*$)/gim, '<li style="margin: 0.25rem 0; color: #e2e8f0;">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li style="margin: 0.25rem 0; color: #e2e8f0;">$2</li>')
    
    // 段落
    .replace(/\n\n/gim, '</p><p style="margin: 1rem 0; color: #e2e8f0; line-height: 1.6;">')
    .replace(/^(?!<[h|l|p|b])/gim, '<p style="margin: 1rem 0; color: #e2e8f0; line-height: 1.6;">')
    
    // 换行
    .replace(/\n/gim, '<br>')
    
    // 包装列表项
    .replace(/(<li.*<\/li>)/gims, '<ul style="padding-left: 1.5rem; margin: 1rem 0;">$1</ul>')
}

// 下载 Markdown 文件
const downloadMarkdown = () => {
  const tags = articleMeta.value.tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
  
  const frontmatter = `---
title: '${articleMeta.value.title}'
description: '${articleMeta.value.description}'
date: '${new Date().toISOString().split('T')[0]}'
tags: [${tags.map(tag => `'${tag}'`).join(', ')}]
author: '${articleMeta.value.author}'
category: '${articleMeta.value.category}'
---

`

  const fullContent = frontmatter + markdownContent.value
  
  const blob = new Blob([fullContent], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  
  const filename = `${articleMeta.value.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`
  
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style>
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #63b3ed;
}
</style>
