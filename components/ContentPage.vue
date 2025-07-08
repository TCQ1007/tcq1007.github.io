<template>
    <div style="background: #0a0e27; min-height: 100vh; color: #ffffff;">
        <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
            <!-- 返回按钮 -->
            <div style="margin-bottom: 2rem;">
                <NuxtLink to="/" style="color: #63b3ed; text-decoration: none;">
                    ← 返回首页
                </NuxtLink>
            </div>

            <!-- 内容区域 -->
            <article v-if="content">
                <!-- 内容头部 -->
                <header style="margin-bottom: 3rem;">
                    <!-- 分类标签 -->
                    <div style="margin-bottom: 1rem;">
                        <span :style="{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            background: type === 'blog' ? 'rgba(99, 179, 237, 0.2)' : 'rgba(104, 211, 145, 0.2)',
                            color: type === 'blog' ? '#63b3ed' : '#68d391',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                        }">
                            {{ getCategoryIcon(content.category) }} {{ content.category || (type === 'blog' ? '博客' :
                                '文档') }}
                        </span>
                    </div>

                    <h1
                        style="font-size: 2rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem; line-height: 1.3;">
                        {{ content.title }}
                    </h1>

                    <div style="color: #a0aec0; font-size: 0.875rem; margin-bottom: 1rem;">
                        {{ formatDate(content.date) }}
                        <span v-if="content.author"> · {{ content.author }}</span>
                    </div>

                    <p v-if="content.description" style="color: #e2e8f0; line-height: 1.6; margin-bottom: 1.5rem;">
                        {{ content.description }}
                    </p>

                    <!-- 标签 -->
                    <div v-if="content.tags && content.tags.length" style="margin-bottom: 1.5rem;">
                        <span v-for="tag in content.tags" :key="tag" :style="{
                            display: 'inline-block',
                            marginRight: '0.5rem',
                            marginBottom: '0.5rem',
                            padding: '0.25rem 0.5rem',
                            background: type === 'blog' ? 'rgba(99, 179, 237, 0.2)' : 'rgba(99, 179, 237, 0.2)',
                            color: '#63b3ed',
                            borderRadius: '8px',
                            fontSize: '0.75rem'
                        }">
                            #{{ tag }}
                        </span>
                    </div>
                </header>

                <!-- 内容正文 -->
                <div style="color: #ffffff; line-height: 1.7;" class="content-body">
                    <ContentRenderer :value="content" />
                </div>

                <!-- 内容导航 -->
                <nav v-if="navigation && (navigation.prevContent || navigation.nextContent)"
                    style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #2d3748;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div v-if="navigation.prevContent">
                            <NuxtLink :to="navigation.prevContent.path"
                                style="display: block; padding: 1rem; background: linear-gradient(145deg, #2d3748, #4a5568); border-radius: 8px; text-decoration: none; color: #e2e8f0; transition: transform 0.2s ease;"
                                @mouseover="$event.currentTarget.style.transform = 'translateY(-2px)'"
                                @mouseout="$event.currentTarget.style.transform = 'translateY(0)'">
                                <div style="font-size: 0.75rem; color: #a0aec0; margin-bottom: 0.25rem;">← 上一篇</div>
                                <div style="font-weight: 500;">{{ navigation.prevContent.title }}</div>
                            </NuxtLink>
                        </div>
                        <div></div>
                        <div v-if="navigation.nextContent" style="grid-column: 2;">
                            <NuxtLink :to="navigation.nextContent.path"
                                style="display: block; padding: 1rem; background: linear-gradient(145deg, #2d3748, #4a5568); border-radius: 8px; text-decoration: none; color: #e2e8f0; text-align: right; transition: transform 0.2s ease;"
                                @mouseover="$event.currentTarget.style.transform = 'translateY(-2px)'"
                                @mouseout="$event.currentTarget.style.transform = 'translateY(0)'">
                                <div style="font-size: 0.75rem; color: #a0aec0; margin-bottom: 0.25rem;">下一篇 →</div>
                                <div style="font-weight: 500;">{{ navigation.nextContent.title }}</div>
                            </NuxtLink>
                        </div>
                    </div>
                </nav>

                <!-- 评论区 -->
                <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #2d3748;">
                    <GiscusComments />
                </div>
            </article>

            <!-- 加载状态 -->
            <div v-else-if="pending" style="text-align: center; padding: 2rem 0;">
                <p style="color: #a0aec0;">加载中...</p>
            </div>

            <!-- 错误状态 -->
            <div v-else style="text-align: center; padding: 2rem 0;">
                <h1 style="color: #ffffff; margin-bottom: 1rem;">{{ type === 'blog' ? '文章' : '文档' }}未找到</h1>
                <p style="color: #a0aec0; margin-bottom: 2rem;">抱歉，您访问的{{ type === 'blog' ? '文章' : '文档' }}不存在。</p>
                <NuxtLink to="/" style="color: #63b3ed; text-decoration: none;">
                    返回首页
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    content: {
        type: Object,
        default: null
    },
    navigation: {
        type: Object,
        default: null
    },
    pending: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'blog', // 'blog' 或 'docs'
        validator: (value) => ['blog', 'docs'].includes(value)
    }
})

// 分类图标映射
const categoryIcons = {
    // 博客分类
    '全部': '📚',
    '方案设计': '🏗️',
    '技术说明': '⚙️',
    'AI相关': '🤖',

    // 文档分类
    '技术文档': '⚙️',
    '快速参考': '📋',
    '设置指南': '🔧',
    '架构设计': '🏗️'
}

const getCategoryIcon = (category) => {
    return categoryIcons[category] || (props.type === 'blog' ? '📝' : '📄')
}

// 格式化日期
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
}

// 设置页面元数据
useHead(() => ({
    title: props.content ? `${props.content.title} - TCQ1007 的技术博客` : 'TCQ1007 的技术博客',
    meta: props.content ? [
        { name: 'description', content: props.content.description || 'TCQ1007 的技术博客' }
    ] : []
}))
</script>

<style scoped>
/* 确保内容中的所有标题都是白色 */
.content-body :deep(h1),
.content-body :deep(h2),
.content-body :deep(h3),
.content-body :deep(h4),
.content-body :deep(h5),
.content-body :deep(h6) {
    color: #ffffff !important;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.content-body :deep(h1) {
    font-size: 1.875rem;
}

.content-body :deep(h2) {
    font-size: 1.5rem;
}

.content-body :deep(h3) {
    font-size: 1.25rem;
}

/* 确保段落和其他文本也是白色 */
.content-body :deep(p) {
    color: #ffffff !important;
    margin-bottom: 1.25rem;
}

.content-body :deep(ul),
.content-body :deep(ol) {
    color: #ffffff !important;
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
}

.content-body :deep(li) {
    color: #ffffff !important;
    margin-bottom: 0.5rem;
}

/* 链接样式 */
.content-body :deep(a) {
    color: #63b3ed !important;
    text-decoration: underline;
}

.content-body :deep(a:hover) {
    color: #93c5fd !important;
}

/* 引用样式 */
.content-body :deep(blockquote) {
    border-left: 4px solid #63b3ed;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #e2e8f0 !important;
    background: rgba(99, 179, 237, 0.1);
    padding: 1rem;
    border-radius: 4px;
}

/* 代码样式 */
.content-body :deep(code) {
    background: rgba(99, 179, 237, 0.2);
    color: #63b3ed;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    font-size: 0.875rem;
}

.content-body :deep(pre) {
    background: #1a202c;
    border: 1px solid #2d3748;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1.5rem 0;
}

.content-body :deep(pre code) {
    background: none;
    color: #e2e8f0;
    padding: 0;
}

/* 表格样式 */
.content-body :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    background: rgba(45, 55, 72, 0.5);
    border-radius: 8px;
    overflow: hidden;
}

.content-body :deep(th),
.content-body :deep(td) {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #2d3748;
    color: #ffffff !important;
}

.content-body :deep(th) {
    background: rgba(99, 179, 237, 0.2);
    font-weight: 600;
    color: #63b3ed !important;
}
</style>
