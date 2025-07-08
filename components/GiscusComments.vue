<template>
    <div class="comments-wrapper">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="loading-state">
            <div class="loading-spinner"></div>
            <p style="color: #a0aec0; margin-top: 1rem; text-align: center;">
                正在加载评论系统...
            </p>
        </div>

        <!-- 评论容器 -->
        <div ref="giscusContainer" class="giscus-container" :class="{ 'loading': isLoading }"></div>

        <!-- 评论说明 -->
        <div class="comments-info">
            <p style="color: #718096; font-size: 0.75rem; text-align: center; margin-top: 1rem;">
                💡 评论功能由 <a href="https://giscus.app" target="_blank" style="color: #63b3ed;">Giscus</a> 提供，基于 GitHub
                Discussions
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { giscusConfig } from '~/config/giscus.js'

const giscusContainer = ref(null)
const isLoading = ref(true)

onMounted(async () => {
    await nextTick()
    loadGiscus()
})

const loadGiscus = () => {
    // 检查是否已经加载过 Giscus
    if (document.querySelector('script[src*="giscus.app"]')) {
        isLoading.value = false
        return
    }

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', giscusConfig.repo)
    script.setAttribute('data-repo-id', giscusConfig.repoId)
    script.setAttribute('data-category', giscusConfig.category)
    script.setAttribute('data-category-id', giscusConfig.categoryId)
    script.setAttribute('data-mapping', giscusConfig.mapping)
    script.setAttribute('data-strict', giscusConfig.strict)
    script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled)
    script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata)
    script.setAttribute('data-input-position', giscusConfig.inputPosition)
    script.setAttribute('data-theme', giscusConfig.theme)
    script.setAttribute('data-lang', giscusConfig.lang)
    script.setAttribute('data-loading', giscusConfig.loading)
    script.crossOrigin = 'anonymous'
    script.async = true

    // 监听脚本加载完成
    script.onload = () => {
        setTimeout(() => {
            isLoading.value = false
        }, 1000) // 给 Giscus 一些时间来渲染
    }

    script.onerror = () => {
        isLoading.value = false
        console.error('Failed to load Giscus comments')
    }

    if (giscusContainer.value) {
        giscusContainer.value.appendChild(script)
    }
}
</script>

<style scoped>
.comments-wrapper {
    position: relative;
    min-height: 200px;
}

.giscus-container {
    margin-top: 1rem;
    transition: opacity 0.3s ease;
}

.giscus-container.loading {
    opacity: 0.3;
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #2d3748;
    border-top: 3px solid #63b3ed;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.comments-info {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #2d3748;
}

.comments-info a {
    text-decoration: none;
    transition: color 0.2s ease;
}

.comments-info a:hover {
    color: #93c5fd !important;
}

/* 确保 Giscus 评论区适配深色主题 */
:deep(.giscus) {
    color-scheme: dark;
}

/* 自定义 Giscus 样式以更好地适配网站主题 */
:deep(.giscus-frame) {
    border-radius: 8px;
    border: 1px solid #2d3748;
}
</style>
