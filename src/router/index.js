import { createWebHistory, createRouter } from "vue-router";
import MicroApp from "@/components/MicroApp.vue";
import BaseAppIndex from "@/views/Index.vue";
import IFrame from "../components/IFrame.vue";
import Layout from "@/layout/Index.vue";
import Login from "@/components/login/Login.vue";
import { keycloakInstance } from "@/utils/keycloakInstance";
import NProgress from "nprogress";
const routes = [
  {
    path: "",
    component: Layout,
    children: [
      { path: "", name: "base", component: BaseAppIndex },
      {
        path: "/:subAppBaseName/:pathMatch*",
        name: "subapps",
        component: MicroApp,
      },
    ],
  },
  {
    path: "/baidu",
    name: "baidu",
    component: IFrame,
  },
  {
    path: "/login",
    component: Login,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach((to, from, next) => {
  NProgress.start();
  // if (to.path === "/login") {
  //   if (keycloakInstance.authenticated) {
  //     next("/");
  //   } else {
  //     next();
  //   }
  // } else if (!keycloakInstance.authenticated && to.path !== "/login") {
  //   next("/login");
  // } else {
    next();
  // }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
