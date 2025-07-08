<template>
    <article :style="{
        background: 'linear-gradient(145deg, #2d3748, #4a5568)',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid #4a5568',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: type === 'blog' ? '400px' : 'auto'
    }" class="content-card" @mouseover="onHover" @mouseout="onLeave">
        <NuxtLink :to="content.path" style="text-decoration: none; color: inherit; display: block; height: 100%;">
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
                    {{ getCategoryIcon(content.category) }} {{ content.category || (type === 'blog' ? '博客' : '文档') }}
                </span>
            </div>

            <!-- 标题 -->
            <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.4;">
                {{ content.title }}
            </h3>

            <!-- 博客文章的元信息 -->
            <div v-if="type === 'blog'"
                style="margin-bottom: 1rem; font-size: 0.875rem; color: #ffffff; opacity: 0.7; line-height: 1.4;">
                <div style="margin-bottom: 0.25rem;">
                    📅 {{ formatDate(content.date) }}
                </div>
                <div>
                    👤 {{ content.author || '未知' }}
                </div>
            </div>

            <!-- 描述 -->
            <p :style="{
                color: type === 'blog' ? '#ffffff' : '#e2e8f0',
                marginBottom: '1.5rem',
                lineHeight: '1.6',
                opacity: type === 'blog' ? '0.85' : '0.9',
                flex: type === 'blog' ? '1' : 'none',
                display: type === 'blog' ? '-webkit-box' : 'block',
                WebkitLineClamp: type === 'blog' ? '3' : 'none',
                WebkitBoxOrient: type === 'blog' ? 'vertical' : 'none',
                overflow: type === 'blog' ? 'hidden' : 'visible'
            }">
                {{ content.description }}
            </p>

            <!-- 底部区域 -->
            <div :style="{ marginTop: type === 'blog' ? 'auto' : '0' }">
                <!-- 博客文章的阅读按钮 -->
                <div v-if="type === 'blog'" style="text-align: right; margin-bottom: 1rem;">
                    <span
                        style="color: #63b3ed; font-weight: 600; padding: 0.5rem 1rem; border: 1px solid #63b3ed; border-radius: 6px; font-size: 0.875rem; display: inline-block; transition: all 0.2s ease;"
                        class="read-more-btn">
                        阅读全文 →
                    </span>
                </div>

                <!-- 文档的元信息 -->
                <div v-if="type === 'docs'"
                    style="display: flex; justify-content: space-between; align-items: center; color: #a0aec0; font-size: 0.875rem; margin-bottom: 1rem;">
                    <span>{{ formatDate(content.date) }}</span>
                    <span v-if="content.author">{{ content.author }}</span>
                </div>

                <!-- 标签 -->
                <div v-if="content.tags && content.tags.length" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span v-for="tag in content.tags.slice(0, 3)" :key="tag" :style="{
                        display: 'inline-block',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        background: type === 'blog' ? 'rgba(99, 179, 237, 0.2)' : 'rgba(99, 179, 237, 0.2)',
                        color: '#63b3ed',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        border: type === 'blog' ? '1px solid rgba(99, 179, 237, 0.3)' : 'none'
                    }">
                        {{ type === 'blog' ? tag : `#${tag}` }}
                    </span>
                    <span v-if="content.tags.length > 3" :style="{
                        display: 'inline-block',
                        padding: '0.25rem 0.5rem',
                        background: type === 'blog' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(160, 174, 192, 0.2)',
                        color: type === 'blog' ? '#ffffff' : '#a0aec0',
                        borderRadius: type === 'blog' ? '12px' : '8px',
                        fontSize: '0.75rem'
                    }">
                        +{{ content.tags.length - 3 }}
                    </span>
                </div>
            </div>
        </NuxtLink>

        <!-- 博客文章的分类标签（右上角） -->
        <div v-if="type === 'blog'"
            style="position: absolute; top: 1rem; right: 1rem; padding: 0.5rem 1rem; background: linear-gradient(45deg, #63b3ed, #68d391); border-radius: 20px; font-size: 0.75rem; font-weight: 600; color: #1a202c;">
            {{ getCategoryIcon(content.category) }} {{ content.category }}
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    content: {
        type: Object,
        required: true
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

// 悬停效果
const onHover = (event) => {
    event.currentTarget.style.transform = 'translateY(-4px)'
    event.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'

    // 博客文章的阅读按钮悬停效果
    if (props.type === 'blog') {
        const readMoreBtn = event.currentTarget.querySelector('.read-more-btn')
        if (readMoreBtn) {
            readMoreBtn.style.background = '#63b3ed'
            readMoreBtn.style.color = '#1a202c'
        }
    }
}

const onLeave = (event) => {
    event.currentTarget.style.transform = 'translateY(0)'
    event.currentTarget.style.boxShadow = 'none'

    // 博客文章的阅读按钮离开效果
    if (props.type === 'blog') {
        const readMoreBtn = event.currentTarget.querySelector('.read-more-btn')
        if (readMoreBtn) {
            readMoreBtn.style.background = 'transparent'
            readMoreBtn.style.color = '#63b3ed'
        }
    }
}
</script>

<style scoped>
.content-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.read-more-btn {
    transition: all 0.2s ease;
}
</style>
