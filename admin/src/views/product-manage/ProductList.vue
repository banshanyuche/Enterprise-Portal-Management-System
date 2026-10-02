<template>
    <!-- 页头 -->
    <el-page-header>
        <template #icon>
            <span> </span>
        </template>
        <template #title>
            <span>产品管理</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> 产品列表 </span>
        </template>
    </el-page-header>

    <el-card>
        <el-table :data="tableData">
            <el-table-column prop="title" label="产品名称" />
            <el-table-column prop="introduction" label="简要描述" />
            <el-table-column label="更新时间">
                <template #default="scope">{{ formatTime.getTime(scope.row.editTime) }}</template>
            </el-table-column>/>
            <el-table-column label="操作">
                <template #default="scope">
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
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import formatTime from '../../util/formatTime'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const tableData = ref([])
const router = useRouter()

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get('/adminapi/product/list')
    console.log(res.data.data)
    tableData.value = res.data.data
}

// 删除回调
const handleDelete = async (data: any) => {
    // console.log(data)
    await axios.delete(`/adminapi/product/list/${data._id}`)
    // tableData本地删除，还可用reload page，reload data
    await getTableData()
}

// 编辑回调
const handleEdit = (item: any) => {
    // 跳转到/news-manage/editnews/:id
    router.push(`/product-manage/editproduct/${item._id}`)
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