<template>
    <div class="container">
        <div class="search">
            <el-popover title="检索结果" placement="bottom" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" style="width: 480px" placeholder="请输入新闻关键字" :prefix-icon="Search"
                        type="search" size="large" @input="visible = true" @blur="visible = false" />
                </template>
                <div v-if="searchText.length">
                    <div v-if="searchNewsList.length">
                        <div v-for="data in searchNewsList" :key="data._id" class="search-item">{{ data.title }}</div>
                    </div>
                    <div v-else>
                        <el-empty description="暂无新闻"></el-empty>
                    </div>
                </div>
            </el-popover>
        </div>
    </div>
    <div class="topnews">
        <!-- 24栅格 -->
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in topNewsList" :key="item._id">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"></div>
                    <div style="padding:14px">
                        <span>{{ item.title }}</span>
                        <div class="bottom">
                            <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts' setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from "vue"
import axios from 'axios';
import dayjs from 'dayjs';

const searchText = ref("")
const visible = ref(false)
const newsList = ref([] as any[])

// 中文时间设置
dayjs.locale('zh-cn')

onMounted(async () => {
    var res = await axios.get("/webapi/news/list")
    //  console.log(res.data)
    newsList.value = res.data.data
})

const searchNewsList = computed(() => newsList.value.filter(item => item.title.includes(searchText.value)))

const topNewsList = computed<any>(() => { return newsList.value.slice(0, 4) })

const formatTime = {
    getTime:(date:any)=>{
         return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
    }
}
</script>

<style scoped lang="scss">
.container {
    position: relative;
}

.search {
    position: absolute;
    top: 100px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.search-item {
    height: 50px;
    line-height: 50px;

    &:hover {
        color: rgb(164, 116, 116);
    }
}

.topnews {
    margin: 20px;
    margin-top: 200px;

    .image {
        width: 100%;
        height: 200px;
        background-size: cover;
    }

    .el-card{
        height: 100%;
    }

    .time{
        font-size: 13px;
        color: gray;
    }
}
</style>