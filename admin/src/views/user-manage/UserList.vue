<template>
    <!-- 页头 -->
    <el-page-header>
        <template #icon>
            <span> </span>
        </template>
        <template #title>
            <span>用户管理</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> 用户列表 </span>
        </template>
    </el-page-header>

    <el-card>
        <!-- table表格 -->
        <!-- 内部实现遍历显示 -->
        <el-table :data="tableData" >
            <el-table-column prop="username" label="用户名"  />

            <el-table-column label="头像" >
                <template #default="scope">
                    <!-- scope.raw，表示tableData中的每一行对象 -->
                    <div v-if="scope.row.avatar">
                        <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                    </div>
                    <div v-else>
                        <el-avatar :size="50"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="角色" >
                <template #default="scope">
                    <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
                    <el-tag v-else class="ml-2" type="success">编辑</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <!-- 弹出确定框 -->
                    <el-popconfirm title="你确定要删除吗？" confirmButtonText="确定" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" type="danger">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <!-- 编辑界面 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" >
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules"  class="demo-ruleForm">
            <!-- prop声明字段名用于校验 -->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <!-- 下拉框 -->
                <el-select v-model="userForm.role" placeholder="Select" >
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="userForm.introduction" :rows="2" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEditConfirm()">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { ref, onMounted,reactive } from 'vue'
import axios from 'axios';

const tableData = ref([])
const dialogVisible = ref(false)
const userFormRef = ref()

// 利用挂载生命周期进行获取
onMounted(() => {
    getTableData()
})

// 向后端请求数据
const getTableData = async () => {
    const res = await axios.get('/adminapi/user/list')
    // console.log(res)

    tableData.value = res.data.data
}

// 编辑回调
const handleEdit =async (data:any) => {
    // console.log(data)
    const res = await axios.get(`/adminapi/user/list/${data._id}`)
    // console.log(res.data.data)
    // Object.assign 会逐个属性"写"到目标对象上，每次写都会触发 reactive 的 Proxy 拦截，从而被 Vue 记录并触发更新。
    Object.assign(userForm,res.data.data[0])
    dialogVisible.value = true
}

// 编辑确认回调
const handleEditConfirm =()=>{
    userFormRef.value.validate(async (valid:any)=>{
        if(valid){
            // console.log(userForm)
            // 更新后端
            await axios.put(`/adminapi/user/list/${(userForm as any)._id}`,userForm)
            // dialog隐藏
            dialogVisible.value = false
            // 获取table数据
            getTableData()
        }
    })
}

const handleDelete = async (data: any) => {
    console.log(data)
    await axios.delete(`/adminapi/user/list/${data._id}`)
    // tableData本地删除，还可用reload page，reload data
    getTableData()
}

const userForm = reactive({
    username: '',
    password: '',
    role: 2,
    introduction: '',
})

const userFormRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' },
    ],
})

const options = [
    {
        label: '管理员', value: 1
    },
    {
        label: '编辑', value: 2
    }
]


</script>

<style scoped>
.el-card {
    margin-top: 20px;
}
</style>