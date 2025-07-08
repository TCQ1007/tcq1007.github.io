<template>
    <UiCard :hoverable="true" :custom-style="{
        display: 'flex',
        flexDirection: 'column',
        minHeight: type === 'blog' ? '240px' : 'auto'
    }" :badge="type === 'blog' ? `${getCategoryIcon(content.category)} ${content.category}` : ''"
        :badge-color="type === 'blog' ? 'linear-gradient(45deg, #63b3ed, #68d391)' : ''">
        <NuxtLink :to="content.path" style="text-decoration: none; color: inherit; display: block; height: 100%;">
            <!-- 分类标签 (仅文档显示) -->
            <div v-if="type === 'docs'" style="margin-bottom: 1rem;">
                <UiBadge :color="'#68d391'" :icon="getCategoryIcon(content.category)" variant="pill">
                    {{ content.category || '文档' }}
                </UiBadge>
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
                    <UiBadge color="#63b3ed" variant="outline" :custom-style="{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }">
                        阅读全文 →
                    </UiBadge>
                </div>

                <!-- 文档的元信息 -->
                <div v-if="type === 'docs'"
                    style="display: flex; justify-content: space-between; align-items: center; color: #a0aec0; font-size: 0.875rem; margin-bottom: 1rem;">
                    <span>{{ formatDate(content.date) }}</span>
                    <span v-if="content.author">{{ content.author }}</span>
                </div>

                <!-- 标签 -->
                <div v-if="content.tags && content.tags.length" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <UiBadge v-for="tag in content.tags.slice(0, 3)" :key="tag" color="#63b3ed" size="sm"
                        :variant="type === 'blog' ? 'outline' : 'solid'">
                        {{ type === 'blog' ? tag : `#${tag}` }}
                    </UiBadge>
                    <UiBadge v-if="content.tags.length > 3" :color="type === 'blog' ? '#ffffff' : '#a0aec0'" size="sm"
                        variant="solid">
                        +{{ content.tags.length - 3 }}
                    </UiBadge>
                </div>
            </div>
        </NuxtLink>
    </UiCard>
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
</script>
