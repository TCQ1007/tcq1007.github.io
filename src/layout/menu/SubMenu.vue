<template>
    <template v-if="menu.subMenu && menu.subMenu.length > 0">
        <!-- 子菜单 -->
        <el-sub-menu :index="menu.path">
            <template #title>
                <!-- <el-icon v-if="menu.icon">
                    <i :class="`el-icon-${menu.icon}`"></i>
                </el-icon> -->
                <span>{{ menu.name }}</span>
            </template>
            <!-- 递归渲染子菜单 -->
            <MenuItem v-for="subMenu in menu.subMenu" :key="subMenu.path" :menu="subMenu" />
        </el-sub-menu>
    </template>
    <template v-else>
        <!-- 单个菜单项 -->
        <el-menu-item :index="menu.path">
          <!-- <el-icon><setting /></el-icon> -->
          <span>{{ menu.name }}</span>
        </el-menu-item>
    </template>
</template>

<script setup>
const props = defineProps({
    menu: {
        type: Object,
        required: true,
    },
});

defineOptions({
    name: "MenuItem",
});
</script>