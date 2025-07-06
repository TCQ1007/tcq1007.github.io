<template>
  <span 
    :class="badgeClasses"
    style="display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.025em;"
  >
    <span v-if="icon">{{ icon }}</span>
    <slot />
  </span>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'success', 'warning', 'error', 'info'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  }
})

// 样式类映射
const badgeClasses = computed(() => {
  const typeClasses = {
    default: 'badge-default',
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info'
  }
  
  return `badge ${typeClasses[props.type]}`
})
</script>

<style scoped>
.badge {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.badge-default {
  background: rgba(160, 174, 192, 0.2);
  color: #e2e8f0;
  border: 1px solid rgba(160, 174, 192, 0.3);
}

.badge-primary {
  background: rgba(99, 179, 237, 0.2);
  color: #63b3ed;
  border: 1px solid rgba(99, 179, 237, 0.3);
}

.badge-success {
  background: rgba(104, 211, 145, 0.2);
  color: #68d391;
  border: 1px solid rgba(104, 211, 145, 0.3);
}

.badge-warning {
  background: rgba(246, 173, 85, 0.2);
  color: #f6ad55;
  border: 1px solid rgba(246, 173, 85, 0.3);
}

.badge-error {
  background: rgba(245, 101, 101, 0.2);
  color: #f56565;
  border: 1px solid rgba(245, 101, 101, 0.3);
}

.badge-info {
  background: rgba(99, 179, 237, 0.2);
  color: #63b3ed;
  border: 1px solid rgba(99, 179, 237, 0.3);
}
</style>
