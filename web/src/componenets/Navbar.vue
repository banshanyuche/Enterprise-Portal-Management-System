<template>
    <div class="navbar">
        <!-- default-active：页面加载时默认激活菜单的 index -->
        <!-- mode：菜单展示模式，此时为水平 -->
        <el-menu :default-active="route.fullPath" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/news">新闻中心</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="" @click="handleClick">登录</el-menu-item>
        </el-menu>
        <div class="right">企业门户官网</div>
    </div>
</template>

<script lang='ts' setup>
import {useRoute} from 'vue-router'

const route = useRoute() 

const handleClick = ()=>{
    window.location.href = 'http://localhost:5174'
}
</script>

<style scoped>
.navbar{
    position: sticky;
    top:0px;
    z-index: 1000;
}
.right{
    position: fixed;
    top: 0;
    right: 20px;
    widows: 100px;
    height: 59px;
    line-height: 59px;
    text-align: center;
}
</style>