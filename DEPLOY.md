# GitHub Pages 部署指南

TCQ1007 的技术博客已配置为自动部署到 GitHub Pages。

## 🚀 自动部署步骤

### 1. 准备仓库

1. **Fork 或上传代码**到您的 GitHub 仓库
2. 确保代码在 `main` 分支

### 2. 启用 GitHub Pages

1. 进入仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分选择 **GitHub Actions**

### 3. 触发部署

推送代码到 `main` 分支即可自动触发部署：

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 4. 查看部署状态

1. 在仓库页面点击 **Actions** 标签
2. 查看 "Deploy to GitHub Pages" 工作流状态
3. 部署成功后，网站将在 `https://username.github.io/repository-name` 可用

## 📁 部署文件说明

- `.github/workflows/deploy.yml` - GitHub Actions 工作流配置
- `nuxt.config.ts` - 包含静态生成配置
- `public/.nojekyll` - 防止 Jekyll 处理静态文件

## 🛠️ 本地测试

在推送到 GitHub 之前，可以本地测试构建：

```bash
# 安装依赖
npm install

# 构建静态文件
npm run build

# 预览构建结果
npx serve .output/public
```

## 🔧 自定义域名（可选）

如果您有自定义域名：

1. 在 `public/` 目录下创建 `CNAME` 文件
2. 文件内容为您的域名，如：`blog.example.com`
3. 在域名 DNS 设置中添加 CNAME 记录指向 `username.github.io`

## 📝 注意事项

- 首次部署可能需要几分钟时间
- 确保仓库是公开的（GitHub Pages 免费版要求）
- 每次推送到 `main` 分支都会触发重新部署
- 构建失败时可以在 Actions 页面查看详细日志

## 🎯 部署成功后

部署成功后，您的博客将包含：

- ✅ 响应式设计
- ✅ 暗色主题
- ✅ 代码语法高亮
- ✅ MDC 组件支持
- ✅ 文章分类和标签
- ✅ SEO 优化

享受您的新博客吧！🎉
