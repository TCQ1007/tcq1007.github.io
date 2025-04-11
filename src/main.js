import { createApp } from 'vue'
import './style.css'
import '@/assets/layout.css'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import  router  from './router'
import NProgress from 'nprogress'
import microApp from '@micro-zoe/micro-app'
import {keycloakInstance} from "./utils/keycloakInstance";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

NProgress.configure({ showSpinner: true })
microApp.start({
  lifeCycles: {
    created (e, appName) {
      console.log(`子应用${appName}被创建`)
    },
    beforemount (e, appName) {
      console.log(`子应用${appName}即将渲染`)
    },
    mounted (e, appName) {
      console.log(`子应用${appName}已经渲染完成`)
    },
    unmount (e, appName) {
      console.log(`子应用${appName}已经卸载`)
    },
    error (e, appName) {
      console.log(`子应用${appName}加载出错`)
    }
  }
})

microApp.router.beforeEach(() => {
  NProgress.start();
});
microApp.router.afterEach(() => {
  NProgress.done();
});

keycloakInstance.init({onLoad:"check-sso"}).then((authenticated) => {
  console.log(`Keycloak authentication: ${authenticated}`);
  const app = createApp(App);
  app.use(router);
  
  // Create Pinia with persistence plugin
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
  
  app.provide("keycloak", keycloakInstance); // 提供 keycloakInstance 给组件使用
  app.mount("#app");
}).catch((error) => {
  console.error("Keycloak initialization failed", error);
});
