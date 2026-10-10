<template>
    <el-row>
        <!-- offset左偏移 -->
        <el-col :span="17" :offset="1">
            <div>
                <h2>{{ currentNews.title }}</h2>
                <div class="time">{{ formatTime.getTime(currentNews.editTime) }}</div>
                <el-divider><el-icon><star-filled></star-filled></el-icon></el-divider>
                <div v-html="currentNews.content"></div>
            </div>
        </el-col>
        <el-col :span="4" :offset="1">
            <el-card style="max-width: 480px">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 16px;font-weight: bold;">最近新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" :key="item._id" class="text item" style="padding: 14px;"
                    @click="handleChangePage(item._id)">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                        <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang='ts' setup>
import axios from 'axios';
import { ref, watchEffect,onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from "vue-router"
import dayjs from 'dayjs';
import { StarFilled } from "@element-plus/icons-vue"

const route = useRoute()
const router = useRouter()
const currentNews = ref({} as any)
const topNews = ref([] as any)

// 中文时间设置
dayjs.locale('zh-cn')

const stop = watchEffect(async () => {
    if(!route.params.id ) return
    const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
    currentNews.value = res1.data.data[0]
    topNews.value = res2.data.data
})

const formatTime = {
    getTime: (date: any) => {
        return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
    }
}

const handleChangePage = (id: any) => {
    router.push(`/news/${id}`)
}
</script>

<style scoped>
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: gray;
}
</style>