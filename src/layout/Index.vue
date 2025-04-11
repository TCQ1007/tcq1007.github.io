<template>
    <el-container id="root-layout">
        <el-aside class="layout-left-side" width="var(--left-side-width)">
            <LeftSide />
        </el-aside>
        <el-container class="layout-right-side">
            <el-header class="layout-right-header">
                <Header class="layout-right-header-wrapper" />
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import LeftSide from './side/LeftSide.vue';
import Header from '@/layout/header/index.vue';
</script>

<style scoped></style>