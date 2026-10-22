<template>
    <!-- 设置折叠前后宽度 -->
    <el-aside :width="colStore.isCollapsed?'64px':'240px'">
        <!-- 在点击header顶部栏后，sidemenu侧边栏进行折叠，通过collapsed库中的isCollapsed状态判定 -->
        <!-- collapsed-transition:是否开启折叠动画 -->
        <!-- router开启后，在激活导航后以index作为path进行路由跳转 -->
        <!-- default-active:默认激活菜单的index(高亮显示),每次进入页面默认展开路由索引 -->
        <el-menu :collapse="colStore.isCollapsed" :collapse-transition="false" :router="true" :default-active="route.fullPath">
            
            <!-- index唯一 -->
            <el-menu-item index="/index">
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon>
                    <avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>

            <!-- 用自定义指令v-admin控制存在与否 -->
            <el-sub-menu index="/user-manage" v-admin>
                <template #title>
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon>
                        <message-box />
                    </el-icon>
                    <span>新闻管理</span>
                </template>
                <el-menu-item index="/news-manage/addnews">添加新闻</el-menu-item>
                <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <reading />
                    </el-icon>
                    <span>产品管理</span>
                </template>
                <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
                <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import {HomeFilled,Avatar,UserFilled,MessageBox,Reading,Pointer} from '@element-plus/icons-vue'
import {collapsedStore} from '../../store/collapsed.ts'
import { useRoute } from 'vue-router';
import userInformationStore from '../../store/userInformation.ts';

const route = useRoute()

let colStore = collapsedStore()
let userStore = userInformationStore()

// 自定义指令，判断用户身份决定是否展示用户管理模块（侧边栏）
const vAdmin = {
    // 挂载时获取dom节点
    mounted(el){
        console.log(el)
        // 以防闪烁白屏，加？可选链，userInfo未加载则undefined
        if(userStore.userInfo?.role!==1){
            el.parentNode.removeChild(el)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-aside{
    height:100vh;

    .el-menu{
        height:100vh;
    }
}
</style>