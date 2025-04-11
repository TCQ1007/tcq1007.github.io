<template>
    <div class="header-content">
        <div>welcome {{ userStore.getUserInfo?.email }}</div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();


</script>

<style scoped>
.header-content {
    height: 100%;
    border-bottom: 1px solid #ccc;
}
</style>