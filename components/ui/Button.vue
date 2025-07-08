<template>
  <button
    :style="{
      padding: size === 'sm' ? '0.5rem 1rem' : size === 'lg' ? '1rem 2rem' : '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '600',
      fontSize: size === 'sm' ? '0.875rem' : '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: getBackgroundStyle(),
      color: getTextColor(),
      boxShadow: variant === 'primary' && active ? `0 4px 12px ${primaryColor}40` : 'none',
      transform: 'scale(1)',
      ...customStyle
    }"
    :class="['ui-button', `ui-button--${variant}`, `ui-button--${size}`, { 'ui-button--active': active }]"
    @mouseover="onHover"
    @mouseout="onLeave"
    @click="$emit('click', $event)"
  >
    <span v-if="icon && iconPosition === 'left'" :style="{ marginRight: '0.5rem' }">{{ icon }}</span>
    <slot />
    <span v-if="icon && iconPosition === 'right'" :style="{ marginLeft: '0.5rem' }">{{ icon }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  active: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  primaryColor: {
    type: String,
    default: '#63b3ed'
  },
  secondaryColor: {
    type: String,
    default: '#68d391'
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['click'])

const getBackgroundStyle = () => {
  switch (props.variant) {
    case 'primary':
      return props.active 
        ? `linear-gradient(45deg, ${props.primaryColor}, ${props.secondaryColor})`
        : 'rgba(45, 55, 72, 0.8)'
    case 'secondary':
      return props.active
        ? `linear-gradient(45deg, ${props.secondaryColor}, ${props.primaryColor})`
        : 'rgba(45, 55, 72, 0.8)'
    case 'outline':
      return 'transparent'
    case 'ghost':
      return 'transparent'
    default:
      return 'rgba(45, 55, 72, 0.8)'
  }
}

const getTextColor = () => {
  switch (props.variant) {
    case 'primary':
    case 'secondary':
      return props.active ? '#1a202c' : '#e2e8f0'
    case 'outline':
      return props.primaryColor
    case 'ghost':
      return '#e2e8f0'
    default:
      return '#e2e8f0'
  }
}

const onHover = (event) => {
  event.target.style.transform = 'scale(1.05)'
  if (props.variant === 'outline') {
    event.target.style.background = props.primaryColor
    event.target.style.color = '#1a202c'
  } else if (props.variant === 'ghost') {
    event.target.style.background = 'rgba(45, 55, 72, 0.8)'
  }
}

const onLeave = (event) => {
  event.target.style.transform = 'scale(1)'
  if (props.variant === 'outline') {
    event.target.style.background = 'transparent'
    event.target.style.color = props.primaryColor
  } else if (props.variant === 'ghost') {
    event.target.style.background = 'transparent'
  }
}
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  outline: none;
}

.ui-button--outline {
  border: 1px solid currentColor;
}

.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-button:disabled:hover {
  transform: scale(1) !important;
}
</style>
