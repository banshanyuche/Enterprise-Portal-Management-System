<template>
    <div class="container">
        <el-carousel height="calc(100vh - 59px)">
            <el-carousel-item :key="1">
                <div :style="{ backgroundImage: `url(${home1})` }"></div>
            </el-carousel-item>
            <el-carousel-item :key="2">
                <div :style="{ backgroundImage: `url(${home2})` }"></div>
            </el-carousel-item>
            <el-carousel-item :key="3">
                <div :style="{ backgroundImage: `url(${home3})` }"></div>
            </el-carousel-item>
            <el-carousel-item :key="4">
                <div :style="{ backgroundImage: `url(${home4})` }"></div>
            </el-carousel-item>
            <el-carousel-item :key="5">
                <div :style="{ backgroundImage: `url(${home5})` }"></div>
            </el-carousel-item>
        </el-carousel>
        <div class="center">互联网+时代</div>
    </div>
</template>

<script lang='ts' setup>
import home1 from '@/assets/home1.jpg'
import home2 from '@/assets/home2.jpg'
import home3 from '@/assets/home3.jpg'
import home4 from '@/assets/home4.jpg'
import home5 from '@/assets/home5.jpg'
</script>

<style scoped>
.el-carousel div {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.container {
    position: relative;
    width: 100%;
    height: 100%;
}

.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color: white;
    text-align: center;
    
}
</style>
