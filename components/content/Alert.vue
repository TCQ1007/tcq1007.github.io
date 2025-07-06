<template>
  <div 
    :class="alertClasses"
    style="padding: 1rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid; position: relative;"
  >
    <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
      <!-- 图标 -->
      <div style="font-size: 1.25rem; margin-top: 0.125rem;">
        {{ iconMap[type] }}
      </div>
      
      <!-- 内容 -->
      <div style="flex: 1;">
        <div v-if="title" style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem;">
          {{ title }}
        </div>
        <div style="line-height: 1.6;">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'warning', 'error', 'success', 'tip'].includes(value)
  },
  title: {
    type: String,
    default: ''
  }
})

// 图标映射
const iconMap = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
  tip: '💡'
}

// 样式类映射
const alertClasses = computed(() => {
  const baseClasses = 'alert'
  const typeClasses = {
    info: 'alert-info',
    warning: 'alert-warning', 
    error: 'alert-error',
    success: 'alert-success',
    tip: 'alert-tip'
  }
  
  return `${baseClasses} ${typeClasses[props.type]}`
})
</script>

<style scoped>
.alert {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.alert-info {
  background: rgba(59, 130, 246, 0.1);
  border-left-color: #3b82f6;
  color: #1e40af;
}

.alert-warning {
  background: rgba(245, 158, 11, 0.1);
  border-left-color: #f59e0b;
  color: #92400e;
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border-left-color: #ef4444;
  color: #dc2626;
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  border-left-color: #22c55e;
  color: #166534;
}

.alert-tip {
  background: rgba(168, 85, 247, 0.1);
  border-left-color: #a855f7;
  color: #7c3aed;
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .alert-info {
    background: rgba(59, 130, 246, 0.2);
    color: #93c5fd;
  }
  
  .alert-warning {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
  }
  
  .alert-error {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }
  
  .alert-success {
    background: rgba(34, 197, 94, 0.2);
    color: #86efac;
  }
  
  .alert-tip {
    background: rgba(168, 85, 247, 0.2);
    color: #c4b5fd;
  }
}
</style>
