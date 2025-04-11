<template>
    <el-container class="root-container">
        <el-header>
            <div style="margin-top: 20px;">
                <img src="/vite.svg" alt=""> TWill Cloud
            </div>
        </el-header>
        <el-main>
            <div class="loginContainer">
                <h1>TWill Cloud</h1>
                <div class="loginPanel">
                    <h2 class="loginTitle">欢迎登录</h2>
                    <div class="toggleCorner" @click="toggleLoginMode">
                        <div class="corner" :class="{ active: loginMode === 'account' }"></div>
                    </div>
                    <div  class="loginContent">
                        <LoginMethod v-if="loginMode === 'account'" />
                        <ScanLogin v-else-if="loginMode === 'scan'"/>
                    </div>
                </div>
                <div class="registerLink">
                    <span>还没有账号？</span>
                    <span class="registerText" @click="keycloakInstance.login({ action: 'register' })">注册</span>
                </div>
            </div>
        </el-main>
    </el-container>

</template>

<script setup>
import { keycloakInstance } from '@/utils/keycloakInstance';
import { ref } from 'vue';
import LoginMethod  from '@/components/login/LoginMethod.vue';
import ScanLogin from '@/components/login/ScanLogin.vue';  
const loginMode = ref('account');
const toggleLoginMode = () => {
    loginMode.value = loginMode.value === 'account' ? 'scan' : 'account';
};

</script>

<style scoped>

.root-container {
    height: 100%;
    width: 100%;
    background-color: #f0f2f5;
}
.loginContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    /* 浅灰色背景 */
    flex-direction: column;
}

.loginPanel {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    /* 白色背景 */
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    width: 100%;
    max-width: 400px;
    min-height: 400px;
}

.loginTitle {
    font-size: 24px;
    color: #333;
    /* 深色字体 */
    margin-bottom: 20px;
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    z-index: 1;
}

.toggleCorner {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 1;
    border-top-right-radius: 8px;
    /* 与登录框的右上角弧度一致 */
}

.corner {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background-color: rgb(131, 155, 162);
    background-image: url('/login.svg');
    background-position: center;
    /* Centers the image horizontally and vertically */
    background-size: cover;
    /* Scales image to cover container while maintaining aspect ratio */
    background-repeat: no-repeat;
    overflow: hidden;
    /* 以元素的左上角为坐标系原点，只显示圈出来的部分 */
    clip-path: polygon(0 0%, 100% 0%, 100% 100%);
    border-top-right-radius: 8px;
}

.corner.active {
    border-right-color: #007bff;
    background-image: url('/qrcode.svg');

}

.loginContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 60px;
    /* 确保内容不被标题遮挡 */
}



.registerLink {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    width: fit-content;
}

.registerText {
    color: #007bff;
    /* 蓝色字体 */
    margin-left: 5px;
    cursor: pointer;
    transition: color 0.3s;
}

.registerText:hover {
    color: #0056b3;
    /* 悬停效果 */
}
</style>