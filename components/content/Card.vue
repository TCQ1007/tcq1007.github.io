<template>
  <div 
    style="background: rgba(45, 55, 72, 0.8); border: 1px solid #4a5568; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; backdrop-filter: blur(10px); transition: all 0.3s ease;"
    @mouseover="$event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'"
    @mouseout="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
  >
    <!-- 卡片头部 -->
    <div v-if="title || icon" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
      <div v-if="icon" style="font-size: 1.5rem;">{{ icon }}</div>
      <h3 v-if="title" style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin: 0;">
        {{ title }}
      </h3>
    </div>
    
    <!-- 卡片内容 -->
    <div style="color: #e2e8f0; line-height: 1.6;">
      <slot />
    </div>
    
    <!-- 卡片底部链接 -->
    <div v-if="link" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #4a5568;">
      <a 
        :href="link"
        :target="linkTarget"
        style="color: #63b3ed; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.5rem; transition: color 0.2s ease;"
        @mouseover="$event.target.style.color = '#93c5fd'"
        @mouseout="$event.target.style.color = '#63b3ed'"
      >
        {{ linkText || '了解更多' }}
        <span style="font-size: 0.875rem;">→</span>
      </a>
    </div>
  </div>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  linkText: {
    type: String,
    default: ''
  },
  linkTarget: {
    type: String,
    default: '_self'
  }
})
</script>
