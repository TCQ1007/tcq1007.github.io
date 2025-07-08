<template>
  <span
    :style="{
      display: 'inline-block',
      padding: size === 'sm' ? '0.25rem 0.5rem' : '0.25rem 0.75rem',
      background: getBackgroundColor(),
      color: getTextColor(),
      borderRadius: variant === 'pill' ? '12px' : '8px',
      fontSize: size === 'sm' ? '0.75rem' : '0.875rem',
      fontWeight: '500',
      border: variant === 'outline' ? `1px solid ${color}` : 'none',
      ...customStyle
    }"
    :class="['ui-badge', `ui-badge--${variant}`, `ui-badge--${size}`]"
  >
    <span v-if="icon" :style="{ marginRight: '0.25rem' }">{{ icon }}</span>
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'outline', 'pill'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value)
  },
  color: {
    type: String,
    default: '#63b3ed'
  },
  icon: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const getBackgroundColor = () => {
  switch (props.variant) {
    case 'solid':
      return `${props.color}20`
    case 'outline':
      return 'transparent'
    case 'pill':
      return `${props.color}20`
    default:
      return `${props.color}20`
  }
}

const getTextColor = () => {
  return props.color
}
</script>

<style scoped>
.ui-badge {
  white-space: nowrap;
}
</style>
