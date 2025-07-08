<template>
  <div
    :style="{
      display: 'grid',
      gridTemplateColumns: getGridColumns(),
      gap: gap,
      ...customStyle
    }"
    :class="['ui-grid', `ui-grid--${cols}`]"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  cols: {
    type: [Number, String],
    default: 'auto'
  },
  gap: {
    type: String,
    default: '1.5rem'
  },
  minWidth: {
    type: String,
    default: '350px'
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const getGridColumns = () => {
  if (props.cols === 'auto') {
    return `repeat(auto-fit, minmax(${props.minWidth}, 1fr))`
  }
  if (typeof props.cols === 'number') {
    return `repeat(${props.cols}, 1fr)`
  }
  return props.cols
}
</script>

<style scoped>
.ui-grid {
  width: 100%;
}

@media (max-width: 768px) {
  .ui-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem;
  }
}
</style>
