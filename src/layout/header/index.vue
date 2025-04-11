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
    /* margin-top: 15px; */
    height: 60px;
    border-radius: 15px;
    text-align: center;
    line-height: 60px;

}
</style>