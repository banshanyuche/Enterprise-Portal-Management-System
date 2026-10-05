<template>
    <div class="container">
        <div class="search">
            <el-popover title="检索结果" placement="bottom" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" style="width: 480px" placeholder="请输入新闻关键字" :prefix-icon="Search" type="search" size="large" 
                    @input="visible=true" @blur="visible=false"/>
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
</template>

<script lang='ts' setup>
import { Search } from '@element-plus/icons-vue'
import {ref,onMounted, computed} from "vue"
import axios from 'axios';

const searchText = ref("")
const visible = ref(false)
const newsList = ref([] as any[])

onMounted(async ()=>{
     var res = await axios.get("/webapi/news/list")
    //  console.log(res.data)
    newsList.value = res.data.data
})

const searchNewsList = computed(()=>newsList.value.filter(item=>item.title.includes(searchText.value)))
</script>

<style scoped lang="scss">
.container{
    position: relative;
}
.search{
    position: absolute;
    top: 100px;
    width: 100%;
    text-align: center;
    .el-input{
        width: 50%;
    }
}
.search-item{
    height: 50px;
    line-height: 50px;
    &:hover{
        color: rgb(164, 116, 116);
    }
}
</style>