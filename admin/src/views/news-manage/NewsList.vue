<template>
    <!-- 页头 -->
    <el-page-header>
        <template #icon>
            <span> </span>
        </template>
        <template #title>
            <span>新闻管理</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> 新闻列表 </span>
        </template>
    </el-page-header>

    <el-card>
        <el-table :data="tableData">
            <el-table-column prop="title" label="标题" />
            <el-table-column label="分类">
                <template #default="scope">{{ categoryFormat(scope.row.category) }}</template>
            </el-table-column>/>
            <el-table-column label="更新时间">
                <template #default="scope">{{ formatTime.getTime(scope.row.editTime) }}</template>
            </el-table-column>/>
            <el-table-column label="是否发布">
                <template #default="scope">
                    <!-- active-value：switch打开时的值，通过这个和isPublish建立关系 -->
                    <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                        @change="handleSwitchChange(scope.row)" />
                </template>
            </el-table-column>/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
                    <el-button circle :icon="Edit" type="default" @click="handleEdit(scope.row)"></el-button>
                    <!-- 弹出确定框 -->
                    <el-popconfirm title="你确定要删除吗？" confirmButtonText="确定" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button circle :icon="Delete" type="danger"></el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>

        </el-table>
    </el-card>
    <!-- 新闻预览界面 -->
    <el-dialog v-model="dialogVisible" title="预览新闻">
        <div>
            <h2>{{ (previewData as any).title }}</h2>
        </div>
        <div style="font-size: 12px;color:gray;">
            {{ formatTime.getTime((previewData as any).editTime) }}
        </div>
        <el-divider><el-icon><star-filled /></el-icon></el-divider>
        <div v-html="(previewData as any).content" class="HTMLcontent"></div>
    </el-dialog>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import formatTime from '../../util/formatTime'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
const router = useRouter()

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get('/adminapi/news/list')
    console.log(res.data.data)
    tableData.value = res.data.data
}

// 格式化分类信息
const categoryFormat = (category: number) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[category - 1]
}

// 开关回调
const handleSwitchChange = async (item: any) => {
    await axios.put(`/adminapi/news/publish`, {
        _id: item._id,
        isPublish: item.isPublish
    })

    await getTableData()
}

// 预览回调
const handlePreview = (data: any) => {
    // console.log(data)
    previewData.value = data
    dialogVisible.value = true
}

// 删除回调
const handleDelete = async (data: any) => {
    // console.log(data)
    await axios.delete(`/adminapi/news/list/${data._id}`)
    // tableData本地删除，还可用reload page，reload data
    await getTableData()
}

// 编辑回调
const handleEdit = (item:any)=>{
    // 跳转到/news-manage/editnews/:id
    router.push(`/news-manage/editnews/${item._id}`)
}
</script>

<style scoped>
.el-card {
    margin-top: 20px;
}

:deep(.HTMLcontent) {
    img {
        max-width: 100%;
    }
}
</style>