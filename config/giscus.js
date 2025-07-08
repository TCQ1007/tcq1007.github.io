// Giscus 评论系统配置
// 请按照以下步骤配置：
// 1. 访问 https://giscus.app/zh-CN
// 2. 输入你的仓库名：tcq1007/tcq1007.github.io
// 3. 确保仓库是公开的，并且启用了 Discussions 功能
// 4. 选择页面 ↔️ discussion 映射关系（推荐使用 pathname）
// 5. 选择 Discussion 分类（推荐使用 General 或 Announcements）
// 6. 复制生成的配置信息到下面

export const giscusConfig = {
  // 你的 GitHub 仓库（格式：用户名/仓库名）
  repo: 'tcq1007/tcq1007.github.io',

  // 仓库 ID（需要从 giscus.app 获取）
  repoId: 'R_kgDOPH2icA', // 这是示例，请替换为实际的 ID

  // Discussion 分类
  category: 'General',

  // 分类 ID（需要从 giscus.app 获取）
  categoryId: 'DIC_kwDOPH2icM4CspZ0', // 这是示例，请替换为实际的 ID

  // 页面 ↔️ discussion 映射关系
  mapping: 'pathname', // 推荐使用 pathname

  // 其他配置
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'dark', // 深色主题
  lang: 'zh-CN', // 中文界面
  loading: 'lazy',
}
