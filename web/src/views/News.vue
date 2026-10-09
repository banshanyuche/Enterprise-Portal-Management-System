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
                        <div v-for="data in searchNewsList" :key="data._id" class="search-item" @click="handleChangePage(data._id)">
                            {{ data.title }}
                        </div>
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
                <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(item._id)">
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
    <el-tabs v-model="whichTab" class="demo-tabs" @tab-click="handleClick" style="margin: 20px;">
        <el-tab-pane v-for="item in tablist" :label="item.label" :name="item.name" :key="item.name">
            <el-row :gutter="20">
                <el-col :span="18">
                    <div v-for="data in tabnews[item.name]" :key="data._id" style="padding: 10px;">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(data._id)">
                            <div class="tab-image"
                                :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }">
                            </div>
                            <div style="padding:14px;float: left;">
                                <span>{{ data.title }}</span>
                                <div class="bottom">
                                    <time class="tab-time">{{ formatTime.getTime(data.editTime) }}</time>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-timeline>
                        <el-timeline-item v-for="(data, index) in tabnews[item.name]" :key="index"
                            :timestamp="formatTime.getTime(data.editTime)">
                            {{ data.title }}
                        </el-timeline-item>
                    </el-timeline>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
    <el-backtop :visibility-height="100"></el-backtop>
</template>

<script lang='ts' setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from "vue"
import axios from 'axios';
import dayjs from 'dayjs';
import _ from "lodash"
import { useRouter } from 'vue-router';

const searchText = ref("")
const visible = ref(false)
const newsList = ref([] as any[])
const whichTab = ref(1)

const handleClick = () => { }

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
    getTime: (date: any) => {
        return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
    }
}

const tablist = [
    {
        label: "最新动态",
        name: 1
    },
    {
        label: "典型案例",
        name: 2
    },
    {
        label: "通知公告",
        name: 3
    }
]

const tabnews = computed<any>(() => {
    return _.groupBy(newsList.value, item => item.category)
})

const router = useRouter()
const handleChangePage = (id:any)=>{
    router.push(`/news/${id}`)
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

    .el-card {
        height: 100%;
    }

    .time {
        font-size: 13px;
        color: gray;
    }
}

.tab-image {
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;
}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>