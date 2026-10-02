<template>
    <!-- 页头 -->
    <el-page-header>
        <template #icon>
            <span> </span>
        </template>
        <template #title>
            <span>企业门户网站管理系统</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> 首页 </span>
        </template>
    </el-page-header>

    <!-- 欢迎信息页面 -->
    <el-card style=" margin-top:50px">
        <el-row>
            <el-col :span="4">
                <el-col :lg="12" :md="12">
                    <div class="demo-basic--circle">
                        <div class="block">
                            <el-avatar :size="100" :src="avatarUrl" />
                        </div>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="20" style="line-height: 100px;">
                <h3>欢迎{{ store.userInfo.username }}回来,{{ welcomeText }}</h3>
            </el-col>
        </el-row>
    </el-card>

    <!-- 产品展示 -->
    <el-card style=" margin-top:50px">
        <template #header>公司产品</template>

        <!-- 走马灯展示图片 -->
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>

    </el-card>
</template>

<script lang='ts' setup>
import userInformationStore from '../../store/userInformation';
import { computed } from 'vue';

const store = userInformationStore()
console.log(store.userInfo)

// 计算属性动态缓存头像地址
const avatarUrl = computed(()=>store.userInfo.avatar?'http://localhost:3000'+store.userInfo.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
// 欢迎语
const welcomeText = computed(()=>new Date().getHours()<12?"要开心啊每一天":"喝杯咖啡提提神")
</script>

<style scoped>
/* 走马灯配置 */
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>