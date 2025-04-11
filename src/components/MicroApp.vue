<template>    
    <div>
        <micro-app 
            :name='app.name' 
            :url='app.url' 
            :baseroute="app.baseroute" 
            :router-mode="app.routerMode? app.routerMode: 'native'" 
            iframe 
            keep-alive
            :disable-memory-router="false"
            :disable-patch-request="false"
        >
        </micro-app>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { useAppStore } from '@/store/appStore';

const route = useRoute();
const appStore = useAppStore();

const subAppBaseName = computed(() => route.params.subAppBaseName);
const currentPath = computed(() => route.path);
// Use computed to make it reactive to store changes
const appList = computed(() => {
    return appStore.getApps || [];
});
const app = ref({});

// Initialize the app when component is mounted or when appList changes
watch([subAppBaseName, appList], ([newAppName, newAppList]) => {
    if (newAppName && newAppList && newAppList.length > 0) {
        app.value = newAppList.find(item => item.name === newAppName) || {};
        console.log("App updated:", JSON.stringify(app.value));
    }
}, { immediate: true });

// Also watch for route changes to update the micro-app
watch(currentPath, (newPath) => {
    console.log("Route changed to:", newPath);
    // Force micro-app to update by triggering a custom event
    const microAppElement = document.querySelector(`micro-app[name="${app.value.name}"]`);
    if (microAppElement) {
        // Dispatch a custom event to notify the micro-app of the route change
        microAppElement.dispatchEvent(new CustomEvent('route-change', { 
            detail: { path: newPath }
        }));
    }
});
</script>

<style lang="scss" scoped></style>
