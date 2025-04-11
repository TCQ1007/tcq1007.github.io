<template>
    <el-container id="base-web-layout">
        <el-aside class="micro-left-side" width="200px" style="background-color: #f0544c">
            <Menu />
            <div class="bottom-box">
                <div>
                    <el-button class="logout-btn" @click="keycloakInstance.logout()">SignOut</el-button>
                </div>
                <div>
                    <el-button class="logout-btn" @click="dialogVisible = true">Setting</el-button>
                </div>
            </div>
        </el-aside>
        <el-container style="background-color: #f9e8b4;">
            <el-header style="margin-top: 15px;">
                <Header style="background-color: #f88b8d; "/>
            </el-header>
            <el-main ><router-view /></el-main>
        </el-container>

        <el-dialog v-model="dialogVisible" :modal="false">
            <ApplicationSetting />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
const keycloakInstance = inject('keycloak');
import Menu from '@/layout/menu/Menu.vue';
import Header from '@/layout/header/index.vue';
import ApplicationSetting from '@/components/setting/ApplicationSetting.vue';
const dialogVisible = ref(false);
const userInfo = ref({})
onMounted(() => {
    keycloakInstance.loadUserInfo().then((res) => {
        userInfo.value = res
    })
})

</script>

<style scoped>
#base-web-layout {
    height: 100%;
    width: 100%;
}

.micro-left-side {
    position: relative;
    --el-menu-bg-color: #f0544c00;
    --el-menu-hover-bg-color: none;
    --el-menu-text-color: #ffffff;
    --el-menu-active-color: black;
}

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