<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :title="$colorMode.value === 'dark' ? '切换到亮色主题' : '切换到暗色主题'"
  >
    <span class="theme-icon">
      {{ $colorMode.value === 'dark' ? '☀️' : '🌙' }}
    </span>
  </button>
</template>

<script setup>
// 切换主题
const toggleTheme = () => {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
.theme-toggle {
  background: rgba(45, 55, 72, 0.8);
  border: 1px solid #4a5568;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.theme-toggle:hover {
  background: rgba(99, 179, 237, 0.2);
  border-color: #63b3ed;
  transform: scale(1.1);
}

.theme-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(180deg);
}

/* 亮色主题样式 */
.light-mode .theme-toggle {
  background: rgba(255, 255, 255, 0.9);
  border-color: #e2e8f0;
  color: #2d3748;
}

.light-mode .theme-toggle:hover {
  background: rgba(99, 179, 237, 0.1);
  border-color: #63b3ed;
}
</style>
