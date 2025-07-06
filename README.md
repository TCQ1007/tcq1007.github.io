# 技术博客

基于 **Nuxt 3** 和 **Cloudflare Workers** 的现代化博客平台。

## 特性

- 🚀 **现代化技术栈**: Nuxt 3 + Vue 3 + TypeScript
- 📝 **内容管理**: 基于 @nuxt/content 的 Markdown 支持
- 🎨 **响应式设计**: 移动端友好的界面
- ⚡ **高性能**: Vite 构建 + 边缘计算部署
- 🔍 **SEO 优化**: 自动生成 meta 标签
- 🌐 **全球部署**: Cloudflare Workers 边缘网络

## 快速开始

### 环境要求

- Node.js >= 20.9.0
- npm, pnpm, yarn 或 bun

### 安装依赖

```bash
# 推荐使用 pnpm
pnpm install

# 或使用其他包管理器
npm install
yarn install
bun install
```

### 开发服务器

启动开发服务器 (http://localhost:3000):

```bash
pnpm dev
# 或
npm run dev
```

### 添加博客文章

在 `content/blog/` 目录下创建 `.md` 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
date: '2025-01-06'
tags: ['标签1', '标签2']
author: '作者名'
---

# 文章内容

这里是文章的正文内容...
```

### 构建部署

#### GitHub Pages 部署

本项目已配置 GitHub Actions 自动部署到 GitHub Pages：

1. **Fork 此仓库** 到您的 GitHub 账户
2. **启用 Pages**: 在仓库设置中启用 GitHub Pages
3. **选择部署源**: 选择 "GitHub Actions" 作为部署源
4. **推送代码**: 推送到 `main` 分支即可自动部署

#### 本地构建

```bash
# 生成静态文件
pnpm build

# 预览构建结果
pnpm preview
```

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 部署到 Cloudflare Workers
npx wrangler deploy
```

## 项目结构

```
├── content/blog/          # 博客文章 (Markdown)
├── pages/                 # 页面组件
├── layouts/               # 布局组件
├── assets/css/            # 样式文件
├── public/                # 静态资源
├── server/                # 服务端代码
├── nuxt.config.ts         # Nuxt 配置
└── wrangler.jsonc         # Cloudflare Workers 配置
```

## 技术栈详情

- **框架**: Nuxt 3.17.6
- **UI**: Vue 3.5.17 + 自定义 CSS
- **内容**: @nuxt/content 3.6.3
- **数据库**: better-sqlite3 12.2.0
- **部署**: Cloudflare Workers
- **构建**: Vite + esbuild

## 配置说明

### Nuxt 配置

主要配置在 `nuxt.config.ts` 中：

- 启用 @nuxt/content 模块
- 配置语法高亮主题
- 设置 CSS 文件路径

### Cloudflare Workers 配置

在 `wrangler.jsonc` 中配置：

- 项目名称和兼容性日期
- 静态资源绑定
- 可观测性设置

## 开发指南

### 添加新页面

在 `pages/` 目录下创建 `.vue` 文件，Nuxt 会自动生成路由。

### 自定义样式

修改 `assets/css/main.css` 或在组件中添加 `<style>` 标签。

### 修改布局

编辑 `layouts/default.vue` 来修改全站布局。

## 部署

1. 完善 `wrangler.jsonc` 配置
2. 运行 `pnpm build` 构建项目
3. 运行 `npx wrangler deploy` 部署到 Cloudflare Workers

## 许可证

MIT License
