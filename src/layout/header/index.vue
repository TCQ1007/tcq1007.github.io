<template>
    <div>
        <div class="header-content">
            welcome {{ userStore.getUserInfo?.email }}
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';
const userStore = useUserStore();
</script>

<style scoped>
.header-content {
    text-align: right;
    height: 100%;
    align-content: center;
    
}
</style>