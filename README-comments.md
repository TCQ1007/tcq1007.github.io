# GitHub 评论系统集成指南

## 🎉 功能特性

✅ **已完成的功能：**

- 为博客文章页面添加了评论区
- 基于 GitHub Discussions 的 Giscus 评论系统
- 深色主题适配
- 加载状态显示
- 响应式设计
- 中文界面

## 📁 文件结构

```
├── components/
│   └── GiscusComments.vue          # 评论组件
├── config/
│   └── giscus.js                   # Giscus 配置文件
├── pages/
│   ├── index.vue                   # 首页
│   └── blog/[...slug].vue          # 博客文章页面（已添加评论区）
├── docs/
│   └── giscus-setup.md             # 详细设置指南
└── README-comments.md              # 本文件
```

## 🚀 快速开始

### 1. 启用 GitHub Discussions

1. 访问你的 GitHub 仓库：https://github.com/tcq1007/tcq1007.github.io
2. 点击 **Settings** 标签页
3. 向下滚动到 **Features** 部分
4. 勾选 **Discussions** 复选框

### 2. 获取 Giscus 配置

1. 访问：https://giscus.app/zh-CN
2. 输入仓库：`tcq1007/tcq1007.github.io`
3. 选择映射关系：**pathname**
4. 选择分类：**General**
5. 选择主题：**dark**
6. 复制生成的 `data-repo-id` 和 `data-category-id`

### 3. 更新配置

编辑 `config/giscus.js` 文件，替换以下值：

```javascript
export const giscusConfig = {
  repo: 'tcq1007/tcq1007.github.io',
  repoId: 'YOUR_ACTUAL_REPO_ID', // 替换这里
  category: 'General',
  categoryId: 'YOUR_ACTUAL_CATEGORY_ID', // 替换这里
  // ... 其他配置
}
```

### 4. 测试功能

```bash
npm run dev
```

访问任意博客文章，应该能看到评论区。

## 🎨 自定义样式

评论组件支持自定义样式，你可以在 `components/GiscusComments.vue` 中修改：

```vue
<style scoped>
/* 自定义评论区样式 */
.comments-wrapper {
  /* 你的样式 */
}
</style>
```

## 📱 响应式支持

评论系统已经适配移动端，在不同屏幕尺寸下都能正常显示。

## 🔧 高级配置

### 更改主题

在 `config/giscus.js` 中修改 `theme` 属性：

```javascript
theme: 'dark' // 深色主题
theme: 'light' // 浅色主题
theme: 'preferred_color_scheme' // 跟随系统
```

### 更改语言

```javascript
lang: 'zh-CN' // 中文
lang: 'en' // 英文
```

### 更改映射方式

```javascript
mapping: 'pathname' // 使用路径（推荐）
mapping: 'url' // 使用完整URL
mapping: 'title' // 使用页面标题
```

## 🛠️ 故障排除

### 评论区不显示

1. 检查 GitHub 仓库是否为公共仓库
2. 确认 Discussions 功能已启用
3. 验证 `repoId` 和 `categoryId` 是否正确
4. 检查浏览器控制台是否有错误信息

### 样式问题

1. 确认深色主题设置正确
2. 检查 CSS 样式是否被覆盖
3. 尝试清除浏览器缓存

### 加载缓慢

1. 检查网络连接
2. 确认 Giscus 服务状态
3. 考虑使用 CDN 加速

## 📚 相关资源

- [Giscus 官方文档](https://giscus.app/zh-CN)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)
- [Nuxt 3 文档](https://nuxt.com/)

## 🤝 贡献

如果你发现问题或有改进建议，欢迎：

1. 在 GitHub Issues 中报告问题
2. 提交 Pull Request
3. 在评论区留言讨论

## 📄 许可证

本项目遵循 MIT 许可证。
