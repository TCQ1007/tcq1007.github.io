<template>
    <div class="scanLogin">
        <div class="scanQRCode">
            <vue-qrcode :value="qrcodeUrl" type="image/png" color="green"></vue-qrcode>
            <p>请使用手机扫描二维码登录</p>
        </div>
    </div>
</template>

<script setup>
import VueQrcode from 'vue-qrcode'
import { keycloakInstance } from '@/utils/keycloakInstance';
import { onMounted, ref } from 'vue';
const qrcodeUrl = ref('')
onMounted(() => {
    qrcodeUrl.value = keycloakInstance.createLoginUrl()
});
</script>

<style scoped>

.scanLogin {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.scanQRCode {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.scanQRCode img {
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
}

.scanQRCode p {
    font-size: 14px;
    color: #666;
}

</style>