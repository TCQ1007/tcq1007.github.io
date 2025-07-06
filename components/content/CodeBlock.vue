<template>
  <div style="margin: 1.5rem 0;">
    <!-- 代码块头部 -->
    <div
      v-if="filename || language"
      style="background: linear-gradient(135deg, #282c34, #21252b); color: #abb2bf; padding: 0.75rem 1rem; border-radius: 12px 12px 0 0; border-bottom: 1px solid #3e4451; display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; position: relative;"
    >
      <!-- 文件信息 -->
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div v-if="filename" style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="color: #e06c75; font-size: 0.875rem;">📄</span>
          <span style="font-weight: 600; color: #61afef;">{{ filename }}</span>
        </div>
        <div v-if="language" style="display: flex; align-items: center; gap: 0.25rem;">
          <span style="width: 8px; height: 8px; background: #98c379; border-radius: 50%; display: inline-block;"></span>
          <span style="color: #98c379; font-size: 0.75rem; text-transform: uppercase; font-weight: 500;">{{ language }}</span>
        </div>
      </div>

      <!-- 复制按钮 -->
      <button
        @click="copyCode"
        style="background: linear-gradient(135deg, rgba(86, 182, 194, 0.2), rgba(97, 175, 239, 0.2)); border: 1px solid #56b6c2; color: #56b6c2; padding: 0.375rem 0.75rem; border-radius: 6px; font-size: 0.75rem; cursor: pointer; transition: all 0.3s ease; font-weight: 500;"
        @mouseover="$event.target.style.background = 'linear-gradient(135deg, rgba(86, 182, 194, 0.3), rgba(97, 175, 239, 0.3))'; $event.target.style.transform = 'translateY(-1px)'"
        @mouseout="$event.target.style.background = 'linear-gradient(135deg, rgba(86, 182, 194, 0.2), rgba(97, 175, 239, 0.2))'; $event.target.style.transform = 'translateY(0)'"
      >
        {{ copied ? '✅ 已复制!' : '📋 复制' }}
      </button>
    </div>
    
    <!-- 代码内容 -->
    <div
      style="background: linear-gradient(135deg, #282c34, #21252b); color: #abb2bf; padding: 1.5rem; overflow-x: auto; font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'Monaco', monospace; line-height: 1.6; position: relative;"
      :style="{ borderRadius: (filename || language) ? '0 0 12px 12px' : '12px' }"
    >
      <!-- 装饰性渐变线 -->
      <div
        v-if="!filename && !language"
        style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #56b6c2, transparent);"
      ></div>

      <pre style="margin: 0; white-space: pre-wrap; font-size: 0.9rem;"><code ref="codeRef"><slot /></code></pre>
    </div>
  </div>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  filename: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  }
})

// 响应式数据
const copied = ref(false)
const codeRef = ref(null)

// 复制代码功能
const copyCode = async () => {
  if (!codeRef.value) return
  
  try {
    const text = codeRef.value.textContent || ''
    await navigator.clipboard.writeText(text)
    copied.value = true
    
    // 2秒后重置状态
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
/* 滚动条样式 - 美化版本 */
div::-webkit-scrollbar {
  height: 8px;
}

div::-webkit-scrollbar-track {
  background: rgba(33, 37, 43, 0.5);
  border-radius: 4px;
}

div::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #56b6c2, #61afef);
  border-radius: 4px;
  transition: all 0.3s ease;
}

div::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #61afef, #c678dd);
  transform: scaleY(1.2);
}

/* 代码块整体样式 */
.code-container {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid #3e4451;
}
</style>
