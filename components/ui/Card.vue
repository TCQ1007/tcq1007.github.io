<template>
  <div
    :style="{
      background: 'linear-gradient(145deg, #2d3748, #4a5568)',
      borderRadius: '12px',
      padding: padding,
      border: '1px solid #4a5568',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      ...customStyle
    }"
    :class="['ui-card', { 'ui-card--hoverable': hoverable }]"
    @mouseover="hoverable && onHover"
    @mouseout="hoverable && onLeave"
  >
    <!-- 卡片头部 -->
    <header v-if="$slots.header || title" :style="{ marginBottom: '1rem' }">
      <slot name="header">
        <h3 v-if="title" :style="{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '600', margin: '0' }">
          {{ title }}
        </h3>
      </slot>
    </header>

    <!-- 卡片内容 -->
    <div :style="{ flex: '1' }">
      <slot />
    </div>

    <!-- 卡片底部 -->
    <footer v-if="$slots.footer" :style="{ marginTop: '1rem' }">
      <slot name="footer" />
    </footer>

    <!-- 右上角标签 -->
    <div 
      v-if="badge"
      :style="{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.25rem 0.75rem',
        background: badgeColor || 'linear-gradient(45deg, #63b3ed, #68d391)',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#1a202c'
      }"
    >
      {{ badge }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: '1.5rem'
  },
  badge: {
    type: String,
    default: ''
  },
  badgeColor: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const onHover = (event) => {
  event.currentTarget.style.transform = 'translateY(-4px)'
  event.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
}

const onLeave = (event) => {
  event.currentTarget.style.transform = 'translateY(0)'
  event.currentTarget.style.boxShadow = 'none'
}
</script>

<style scoped>
.ui-card {
  display: flex;
  flex-direction: column;
}

.ui-card--hoverable {
  cursor: pointer;
}
</style>
