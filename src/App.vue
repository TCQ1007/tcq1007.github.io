<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const size = 'small'
const zIndex = 1000
</script>
<style ></style>
