<template>
    <Menu />
    <div class="bottom-box">
        <div>
            <el-button class="logout-btn" @click="keycloakInstance.logout()">SignOut</el-button>
        </div>
        <div>
            <el-button class="logout-btn" @click="settingActive = true">Setting</el-button>
        </div>
    </div>
    <el-dialog v-model="settingActive" :modal="false">
            <ApplicationSetting />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="settingActive = false">Cancel</el-button>
                    <el-button type="primary" @click="settingActive = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
</template>

<script setup>
import { inject, ref } from 'vue';
import Menu from '@/layout/menu/Menu.vue';
const keycloakInstance = inject('keycloak');
const settingActive = ref(false);
import ApplicationSetting from '@/components/setting/ApplicationSetting.vue';
</script>

<style  scoped>

.bottom-box {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.logout-btn {
    width: 120px;
    height: 40px;
}
</style>