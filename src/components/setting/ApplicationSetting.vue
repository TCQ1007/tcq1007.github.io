<template>
    <el-collapse v-model="activeSetting" accordion>
        <el-collapse-item title="Applications" name="1">
            <JsonE v-model="appData" />
            <div class="action-buttons">
                <el-button type="primary" @click="saveApps">Save Applications</el-button>
            </div>
        </el-collapse-item>
        <el-collapse-item title="Menus" name="2">
            <JsonE v-model="menuData" />
            <div class="action-buttons">
                <el-button type="primary" @click="saveMenus">Save Menus</el-button>
            </div>
        </el-collapse-item>
    </el-collapse>
    
    <div class="reset-section">
        <el-button type="danger" @click="resetToDefault">Reset to Default Values</el-button>
        <p class="reset-hint">This will reset both menus and applications to their default values from the source files.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import JsonE from './JsonE.vue';
import { useAppStore } from '@/store/appStore'
import { ElMessage, ElMessageBox } from 'element-plus'

const appStore = useAppStore()
const activeSetting = ref('1')

// Create local copies of the data for editing
const appData = ref([])
const menuData = ref([])

onMounted(() => {
    // Initialize with data from the store
    appData.value = JSON.parse(JSON.stringify(appStore.getApps))
    menuData.value = JSON.parse(JSON.stringify(appStore.getMenu))
})

// Save functions
const saveApps = () => {
    appStore.setApps(appData.value)
    ElMessage.success('Applications saved successfully')
}

const saveMenus = () => {
    appStore.setMenu(menuData.value)
    ElMessage.success('Menus saved successfully')
}

// Reset function
const resetToDefault = () => {
    ElMessageBox.confirm(
        'This will reset all menus and applications to their default values. Continue?',
        'Warning',
        {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        }
    )
    .then(() => {
        appStore.resetToDefault()
        // Reload the data from the store
        appData.value = JSON.parse(JSON.stringify(appStore.getApps))
        menuData.value = JSON.parse(JSON.stringify(appStore.getMenu))
        ElMessage.success('Reset to default values successfully')
    })
    .catch(() => {
        ElMessage.info('Reset cancelled')
    })
}
</script>

<style scoped>
.action-buttons {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
}

.reset-section {
    margin-top: 20px;
    padding: 15px;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.reset-hint {
    margin-top: 10px;
    color: #999;
    font-size: 12px;
}
</style>
