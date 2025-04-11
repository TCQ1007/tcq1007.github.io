<template>
    <img src="/vite.svg" style="height: 200px; width: 200px; margin-bottom: 10px;" alt="QR Code" />
    <el-button class="loginButton" @click="login()">
        Go to Login (SSO By keycloak)
    </el-button>
    <div class="thirdloginButtons">
        <el-button class="thirdLoginButton" @click="thirdLogin(loginType)" v-for="loginType in allLoginTypeList"
            :key="loginType">
            {{ loginType }}
        </el-button>
    </div>
</template>

<script setup>
import { queryLoginType } from '@/api/user';
import { keycloakInstance, startTokenRefreshLoop } from '@/utils/keycloakInstance';
import { ref, onMounted } from 'vue';

const allLoginTypeList = ref([]);


onMounted(() => {
    allLoginTypeList.value = queryLoginType()
});

const login = () => {
    keycloakInstance.login().then(() => {
        console.log('login success');
        startTokenRefreshLoop();
    });
};

import { ElMessageBox } from 'element-plus'
import { el } from 'element-plus/es/locales.mjs';

const open = (loginType) => {
    ElMessageBox.alert(`Don not support ${loginType} login.`, 'Notification !!!', {
        confirmButtonText: 'OK, I know',
    })
}

const thirdLogin = (loginType) => {
    if (loginType === 'SSO-Login') {
        const currentUrl = encodeURIComponent(window.location.href);
        let url = `http://localhost:5174/login?redirect=${currentUrl}`
        window.location.href = url;

        const lognWin = window.open(url, 'NewWindow', 'width=300,height=200,top=50,left=10');

        // 定时检测新窗口是否关闭
        const interval = setInterval(() => {
            if (newWindow.closed) {
                clearInterval(interval); // 停止检测
                console.log("检测到窗口已关闭，刷新原窗口");
                window.location.reload(); // 刷新原窗口
            }
        }, 500); // 每隔 500ms 检查一次

    } else {
        open(loginType)
    }
}


</script>

<style scoped>
.thirdloginButtons {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.loginButton {
    background-color: #ffffff;
    /* 白色背景 */
    color: #000000;
    /* 蓝色字体 */
    /* 蓝色边框 */
    border-radius: 4px;
    box-shadow: #bcbaba 0 0 3px;
    margin-bottom: 10px;
    height: 40px;
    width: 100%;
    transition: background-color 0.3s, color 0.3s;
}

.thirdLoginButton {
    background-color: #ffffff;
    /* 白色背景 */
    color: #000000;
    /* 蓝色字体 */
    /* 蓝色边框 */
    border-radius: 4px;
    box-shadow: #bcbaba 0 0 3px;
    margin-bottom: 10px;
    height: 40px;
    width: 80px;
    transition: background-color 0.3s, color 0.3s;
}

.loginButton:hover,
.thirdLoginButton:hover {
    background-color: #007bff;
    /* 悬停效果 */
    color: white;
    /* 白色字体 */
}
</style>
