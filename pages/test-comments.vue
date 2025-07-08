<template>
  <div style="background: #0a0e27; min-height: 100vh; color: #ffffff;">
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <!-- 页面标题 -->
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">
          🧪 评论系统测试页面
        </h1>
        <p style="color: #a0aec0; font-size: 1.125rem;">
          这是一个专门用于测试 Giscus 评论系统的页面
        </p>
      </div>

      <!-- 返回按钮 -->
      <div style="margin-bottom: 2rem;">
        <NuxtLink to="/" style="color: #63b3ed; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
          ← 返回首页
        </NuxtLink>
      </div>

      <!-- 测试说明 -->
      <div style="background: linear-gradient(145deg, #2d3748, #4a5568); border-radius: 12px; padding: 2rem; margin-bottom: 3rem; border: 1px solid #4a5568;">
        <h2 style="color: #ffffff; font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem;">
          📋 测试清单
        </h2>
        
        <div style="space-y: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <span style="color: #68d391; font-size: 1.25rem;">✅</span>
            <span style="color: #e2e8f0;">评论组件已加载</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <span style="color: #f6ad55; font-size: 1.25rem;">⏳</span>
            <span style="color: #e2e8f0;">等待 Giscus 加载完成</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <span style="color: #a0aec0; font-size: 1.25rem;">⚪</span>
            <span style="color: #e2e8f0;">尝试发表测试评论</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <span style="color: #a0aec0; font-size: 1.25rem;">⚪</span>
            <span style="color: #e2e8f0;">检查评论是否出现在 GitHub Discussions</span>
          </div>
        </div>
      </div>

      <!-- 配置状态 -->
      <div style="background: rgba(99, 179, 237, 0.1); border: 1px solid #63b3ed; border-radius: 8px; padding: 1.5rem; margin-bottom: 3rem;">
        <h3 style="color: #63b3ed; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
          🔧 配置信息
        </h3>
        <div style="font-family: monospace; font-size: 0.875rem; color: #e2e8f0;">
          <div style="margin-bottom: 0.5rem;">
            <span style="color: #68d391;">仓库:</span> {{ giscusConfig.repo }}
          </div>
          <div style="margin-bottom: 0.5rem;">
            <span style="color: #68d391;">映射方式:</span> {{ giscusConfig.mapping }}
          </div>
          <div style="margin-bottom: 0.5rem;">
            <span style="color: #68d391;">主题:</span> {{ giscusConfig.theme }}
          </div>
          <div style="margin-bottom: 0.5rem;">
            <span style="color: #68d391;">语言:</span> {{ giscusConfig.lang }}
          </div>
        </div>
      </div>

      <!-- 测试内容 -->
      <article style="margin-bottom: 3rem;">
        <h2 style="color: #ffffff; font-size: 1.75rem; font-weight: 600; margin-bottom: 1.5rem;">
          📝 测试文章内容
        </h2>
        
        <div style="color: #e2e8f0; line-height: 1.7; space-y: 1.5rem;">
          <p style="margin-bottom: 1.5rem;">
            这是一篇用于测试评论功能的文章。如果你能看到下方的评论区，说明 Giscus 集成成功了！
          </p>
          
          <p style="margin-bottom: 1.5rem;">
            你可以尝试：
          </p>
          
          <ul style="margin-left: 2rem; margin-bottom: 1.5rem;">
            <li style="margin-bottom: 0.5rem;">使用 GitHub 账号登录</li>
            <li style="margin-bottom: 0.5rem;">发表一条测试评论</li>
            <li style="margin-bottom: 0.5rem;">添加 emoji 反应</li>
            <li style="margin-bottom: 0.5rem;">回复其他评论</li>
          </ul>
          
          <p style="margin-bottom: 1.5rem;">
            所有评论都会保存在你的 GitHub 仓库的 Discussions 中，你可以在 GitHub 上管理这些评论。
          </p>
        </div>
      </article>

      <!-- 评论区 -->
      <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #2d3748;">
        <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem;">
          💬 测试评论区
        </h3>
        <GiscusComments />
      </div>

      <!-- 帮助信息 -->
      <div style="margin-top: 3rem; padding: 1.5rem; background: rgba(246, 173, 85, 0.1); border: 1px solid #f6ad55; border-radius: 8px;">
        <h4 style="color: #f6ad55; font-size: 1rem; font-weight: 600; margin-bottom: 1rem;">
          💡 需要帮助？
        </h4>
        <p style="color: #e2e8f0; font-size: 0.875rem; margin-bottom: 1rem;">
          如果评论区没有显示，请检查：
        </p>
        <ul style="color: #e2e8f0; font-size: 0.875rem; margin-left: 1.5rem;">
          <li>GitHub 仓库是否为公共仓库</li>
          <li>是否已启用 Discussions 功能</li>
          <li>config/giscus.js 中的配置是否正确</li>
          <li>浏览器控制台是否有错误信息</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { giscusConfig } from '~/config/giscus.js'

// 设置页面元数据
useHead({
  title: '评论系统测试 - TCQ1007 的技术博客',
  meta: [
    {
      name: 'description',
      content: 'Giscus 评论系统测试页面'
    }
  ]
})
</script>
