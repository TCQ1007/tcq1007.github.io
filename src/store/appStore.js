import { defineStore } from "pinia";
import { getAppList } from "../api/application";
import { getMenu } from "../api/menu";

export const useAppStore = defineStore("applicationStore", {
  state: () => {
    return {
      menu: [],
      apps: [],
      initialized: false
    };
  },
  actions: {
    // Initialize store data if not already done
    initialize() {
      if (!this.initialized) {
        if (this.menu.length === 0) {
          this.menu = getMenu();
        }
        if (this.apps.length === 0) {
          this.apps = getAppList();
        }
        this.initialized = true;
      }
    },
    
    // Set menu data
    setMenu(menu) {
      this.menu = menu;
    },
    
    // Set apps data
    setApps(apps) {
      this.apps = apps;
    },
    
    // Save both menu and apps data
    saveAll(menu, apps) {
      if (menu) this.menu = menu;
      if (apps) this.apps = apps;
    },
    
    // Reset to default values from JS files
    resetToDefault() {
      this.menu = getMenu();
      this.apps = getAppList();
      this.initialized = true;
    }
  },
  getters: {
    // Get menu data, initializing if needed
    getMenu() {
      this.initialize();
      return this.menu;
    },
    
    // Get apps data, initializing if needed
    getApps() {
      this.initialize();
      return this.apps;
    }
  },
  // Enable persistence using the plugin
  persist: {
    key: 'micro-app-jd-store',
    storage: localStorage,
  },
});
