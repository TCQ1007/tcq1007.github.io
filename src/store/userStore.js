import { defineStore } from "pinia";
import { keycloakInstance } from "@/utils/keycloakInstance";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: null,
      token: "",
      loginType: "",
    };
  },
  actions: {
    loadUserInfo() {
        keycloakInstance.loadUserInfo().then((userInfo) => {
            this.userInfo = userInfo;
        });
      
    },
    setToken(token) {
      this.token = token;
    },
    setLoginType(loginType) {}
  },
  getters: {
    getUserInfo() {
        if(!this.userInfo){
            this.loadUserInfo();
        }
      return this.userInfo;
    },
  },
})