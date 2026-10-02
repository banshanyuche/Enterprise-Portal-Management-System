<template>
    <el-container>
        <SideMenu></SideMenu>
        <!-- topheader为导入组件，原本的上下排列布局失效，利用direction重新进行布局 -->
        <el-container direction="vertical">
            <TopHeader></TopHeader>
            <el-main>
                <RouterView></RouterView>
            </el-main>
        </el-container>
    </el-container>

</template>

<script lang='ts' setup>
import TopHeader from '../components/mainbox/TopHeader.vue';
import SideMenu from '../components/mainbox/SideMenu.vue';
</script>

<style scoped>
.el-main{
    overflow: auto;
    height:calc(100vh-60px);
}
</style>