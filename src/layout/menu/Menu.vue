<template>
    <el-menu :default-active="route.path" @select="select">
        <!-- 调用递归渲染函数 -->
        <template v-for="menu in menuList" :key="menu.path">
            <SubMenu :menu="menu" />
        </template>
    </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { buildPathToAppMap } from "@/api/menu";
import SubMenu from "./SubMenu.vue";
import microApp, { getActiveApps } from "@micro-zoe/micro-app";
import { useRouter, useRoute } from 'vue-router';
import { useAppStore } from '@/store/appStore';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

// Use computed to make it reactive to store changes
const menuList = computed(() => {
    return appStore.getMenu || [];
});

// Rebuild the path map whenever the menu changes
const pathMap = computed(() => {
    const map = buildPathToAppMap(menuList.value);
    console.log("Path map computed:", map);
    return map;
});

const select = (path) => {
    console.log("Path map value:", pathMap.value);
    let currentMenuApp = pathMap.value[path];
    console.log("Menu selected:", path, "App:", currentMenuApp);
    
    // Always use the main router to navigate
    router.push(path);
    
    // If the app is already active, also use microApp.router to ensure the sub-app updates
    if (getActiveApps().includes(currentMenuApp)) {
        console.log("App already active, also pushing to microApp router");
        // Add a small delay to ensure the main router has processed the change
        setTimeout(() => {
            microApp.router.push({ name: currentMenuApp, path });
        }, 50);
    }
}

</script>

<style scoped>
</style>
