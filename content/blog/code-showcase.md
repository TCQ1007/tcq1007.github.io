---
title: '代码高亮展示'
description: '展示优化后的代码高亮效果，包括多种编程语言的语法高亮。'
date: '2025-01-06'
author: '技术团队'
tags: ['代码高亮', '语法高亮', 'Shiki', '编程']
category: '技术说明'
---

# 代码高亮展示

这篇文章展示了博客中优化后的代码高亮效果。

## JavaScript/TypeScript

```typescript
// TypeScript 接口定义
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// 异步函数示例
async function fetchUserData(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData: User = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

// 使用示例
const user = await fetchUserData(123);
if (user) {
  console.log(`Welcome, ${user.name}!`);
}
```

## Vue.js 组件

```vue
<template>
  <div class="user-card">
    <div class="avatar">
      <img :src="user.avatar" :alt="user.name" />
    </div>
    <div class="info">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <badge :type="user.isActive ? 'success' : 'warning'">
        {{ user.isActive ? '在线' : '离线' }}
      </badge>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
}

const props = defineProps<{
  user: User;
}>();

const emit = defineEmits<{
  click: [user: User];
}>();
</script>

<style scoped>
.user-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--bg-secondary);
  transition: transform 0.2s ease;
}

.user-card:hover {
  transform: translateY(-2px);
}
</style>
```

## Python

```python
from typing import List, Optional
import asyncio
import aiohttp

class DataProcessor:
    """数据处理器类"""
    
    def __init__(self, api_url: str):
        self.api_url = api_url
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def fetch_data(self, endpoint: str) -> dict:
        """获取数据"""
        if not self.session:
            raise RuntimeError("Session not initialized")
        
        url = f"{self.api_url}/{endpoint}"
        async with self.session.get(url) as response:
            response.raise_for_status()
            return await response.json()
    
    def process_items(self, items: List[dict]) -> List[dict]:
        """处理数据项"""
        processed = []
        
        for item in items:
            # 数据清洗和转换
            if item.get('status') == 'active':
                processed_item = {
                    'id': item['id'],
                    'name': item['name'].strip().title(),
                    'score': float(item.get('score', 0)),
                    'tags': [tag.lower() for tag in item.get('tags', [])]
                }
                processed.append(processed_item)
        
        return sorted(processed, key=lambda x: x['score'], reverse=True)

# 使用示例
async def main():
    async with DataProcessor("https://api.example.com") as processor:
        data = await processor.fetch_data("items")
        results = processor.process_items(data['items'])
        
        for item in results[:5]:  # 取前5个
            print(f"{item['name']}: {item['score']}")

if __name__ == "__main__":
    asyncio.run(main())
```

## CSS

```css
/* 现代化的 CSS 样式 */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  
  --border-radius: 8px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 深色主题 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
  }
}

/* 组件样式 */
.card {
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* 响应式网格 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

## SQL

```sql
-- 用户数据查询和分析
WITH user_stats AS (
  SELECT 
    u.id,
    u.name,
    u.email,
    u.created_at,
    COUNT(p.id) as post_count,
    AVG(p.rating) as avg_rating,
    MAX(p.created_at) as last_post_date
  FROM users u
  LEFT JOIN posts p ON u.id = p.user_id
  WHERE u.is_active = true
    AND u.created_at >= '2024-01-01'
  GROUP BY u.id, u.name, u.email, u.created_at
),
active_users AS (
  SELECT *
  FROM user_stats
  WHERE post_count > 0
    AND last_post_date >= CURRENT_DATE - INTERVAL '30 days'
)
SELECT 
  name,
  email,
  post_count,
  ROUND(avg_rating, 2) as average_rating,
  CASE 
    WHEN avg_rating >= 4.5 THEN 'Excellent'
    WHEN avg_rating >= 4.0 THEN 'Good'
    WHEN avg_rating >= 3.0 THEN 'Average'
    ELSE 'Needs Improvement'
  END as performance_level,
  DATE_PART('day', CURRENT_DATE - last_post_date) as days_since_last_post
FROM active_users
ORDER BY avg_rating DESC, post_count DESC
LIMIT 20;

-- 创建索引优化查询性能
CREATE INDEX CONCURRENTLY idx_posts_user_created 
ON posts (user_id, created_at DESC) 
WHERE deleted_at IS NULL;

-- 更新用户统计信息
UPDATE users 
SET 
  total_posts = (
    SELECT COUNT(*) 
    FROM posts 
    WHERE posts.user_id = users.id 
      AND posts.deleted_at IS NULL
  ),
  last_activity = (
    SELECT MAX(created_at) 
    FROM posts 
    WHERE posts.user_id = users.id
  )
WHERE users.is_active = true;
```

这些代码示例展示了优化后的语法高亮效果，包括：

- 🎨 **美观的配色方案**: 基于 One Dark Pro 主题
- 🔤 **清晰的字体**: 使用 JetBrains Mono 等编程字体
- 🌈 **丰富的语法高亮**: 支持多种编程语言
- 📱 **响应式设计**: 在不同设备上都有良好的显示效果
- ✨ **交互式功能**: 代码复制、滚动条美化等
