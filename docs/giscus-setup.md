# Giscus 评论系统设置指南

## 1. 启用 GitHub Discussions

首先，你需要为你的 GitHub 仓库启用 Discussions 功能：

1. 访问你的 GitHub 仓库：https://github.com/tcq1007/tcq1007.github.io
2. 点击 **Settings** 标签页
3. 向下滚动到 **Features** 部分
4. 勾选 **Discussions** 复选框

## 2. 获取 Giscus 配置

1. 访问 Giscus 配置页面：https://giscus.app/zh-CN
2. 在 **仓库** 部分输入：`tcq1007/tcq1007.github.io`
3. 确保显示 ✅ 公共仓库、✅ giscus 已安装、✅ Discussions 功能已启用
4. 在 **页面 ↔️ discussion 映射关系** 部分选择 **pathname**
5. 在 **Discussion 分类** 部分选择 **General**（或创建一个新的分类）
6. 在 **特性** 部分：
   - ✅ 启用反应
   - ✅ 懒加载评论
7. 在 **主题** 部分选择 **dark**

## 3. 复制配置信息

在页面底部，你会看到生成的配置代码，类似这样：

```html
<script src="https://giscus.app/client.js"
        data-repo="tcq1007/tcq1007.github.io"
        data-repo-id="R_kgDONhKJJA"
        data-category="General"
        data-category-id="DIC_kwDONhKJJM4ClOQs"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="dark"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
```

## 4. 更新配置文件

将获取到的 `data-repo-id` 和 `data-category-id` 值更新到 `config/giscus.js` 文件中：

```javascript
export const giscusConfig = {
  repo: 'tcq1007/tcq1007.github.io',
  repoId: 'YOUR_ACTUAL_REPO_ID', // 替换为实际的仓库ID
  category: 'General',
  categoryId: 'YOUR_ACTUAL_CATEGORY_ID', // 替换为实际的分类ID
  // ... 其他配置保持不变
}
```

## 5. 测试评论功能

1. 启动开发服务器：`npm run dev`
2. 访问任意博客文章页面
3. 滚动到页面底部，应该能看到评论区
4. 尝试发表一条测试评论

## 6. 部署到生产环境

确保在部署到 GitHub Pages 之前，配置文件中的 ID 是正确的。

## 常见问题

### Q: 评论区不显示怎么办？
A: 检查以下几点：
- GitHub 仓库是否为公共仓库
- Discussions 功能是否已启用
- 配置文件中的 repo-id 和 category-id 是否正确

### Q: 如何自定义评论区样式？
A: 可以在 `components/GiscusComments.vue` 中添加自定义 CSS 样式。

### Q: 如何更改评论区语言？
A: 在 `config/giscus.js` 中修改 `lang` 属性。

## 安全说明

- Giscus 使用 GitHub 的身份验证系统，用户需要 GitHub 账号才能评论
- 所有评论都存储在 GitHub Discussions 中，你可以在 GitHub 上管理这些评论
- 支持 Markdown 语法和代码高亮
