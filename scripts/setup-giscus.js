#!/usr/bin/env node

/**
 * Giscus 配置助手脚本
 * 帮助快速设置 Giscus 评论系统
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('🚀 Giscus 评论系统配置助手')
console.log('================================')

// 检查是否已启用 GitHub Discussions
console.log('\n📋 配置检查清单：')
console.log('□ 1. GitHub 仓库是公共仓库')
console.log('□ 2. 已启用 GitHub Discussions 功能')
console.log('□ 3. 已访问 https://giscus.app/zh-CN 获取配置')
console.log('□ 4. 已复制 repo-id 和 category-id')

console.log('\n🔧 配置步骤：')
console.log('1. 访问你的 GitHub 仓库设置页面')
console.log('   https://github.com/tcq1007/tcq1007.github.io/settings')

console.log('\n2. 启用 Discussions 功能：')
console.log('   - 滚动到 Features 部分')
console.log('   - 勾选 "Discussions" 复选框')

console.log('\n3. 获取 Giscus 配置：')
console.log('   - 访问 https://giscus.app/zh-CN')
console.log('   - 输入仓库：tcq1007/tcq1007.github.io')
console.log('   - 选择映射：pathname')
console.log('   - 选择分类：General')
console.log('   - 选择主题：dark')
console.log('   - 复制生成的 data-repo-id 和 data-category-id')

console.log('\n4. 更新配置文件：')
console.log('   编辑 config/giscus.js 文件，替换以下值：')

// 读取当前配置
try {
  const configPath = join(process.cwd(), 'config', 'giscus.js')
  const configContent = readFileSync(configPath, 'utf-8')
  
  console.log('\n📄 当前配置：')
  console.log('```javascript')
  console.log(configContent)
  console.log('```')
  
  console.log('\n⚠️  请手动替换以下值：')
  console.log('   - repoId: "YOUR_ACTUAL_REPO_ID"')
  console.log('   - categoryId: "YOUR_ACTUAL_CATEGORY_ID"')
  
} catch (error) {
  console.log('\n❌ 无法读取配置文件，请确保 config/giscus.js 存在')
}

console.log('\n5. 测试功能：')
console.log('   npm run dev')
console.log('   访问博客文章页面或首页查看评论区')

console.log('\n📚 更多帮助：')
console.log('   - 详细设置指南：docs/giscus-setup.md')
console.log('   - 功能说明：README-comments.md')
console.log('   - Giscus 官方文档：https://giscus.app/zh-CN')

console.log('\n✨ 配置完成后，你的博客将拥有：')
console.log('   ✅ 文章评论功能')
console.log('   ✅ 首页留言功能')
console.log('   ✅ GitHub 身份验证')
console.log('   ✅ Markdown 支持')
console.log('   ✅ 深色主题适配')

console.log('\n🎉 祝你使用愉快！')

// 生成示例配置
const exampleConfig = `
// 示例配置（请替换为实际值）
export const giscusConfig = {
  repo: 'tcq1007/tcq1007.github.io',
  repoId: 'R_kgDONhKJJA', // 从 giscus.app 获取
  category: 'General',
  categoryId: 'DIC_kwDONhKJJM4ClOQs', // 从 giscus.app 获取
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'dark',
  lang: 'zh-CN',
  loading: 'lazy'
}
`

console.log('\n📝 示例配置：')
console.log(exampleConfig)
