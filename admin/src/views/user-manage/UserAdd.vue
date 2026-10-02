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
            <span class="text-large font-600 mr-3"> 添加用户 </span>
        </template>
    </el-page-header>

    <el-card>
        <!-- 表单 -->
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" class="demo-ruleForm">
            <!-- prop声明字段名用于校验 -->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <!-- 下拉框 -->
                <el-select v-model="userForm.role" placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="userForm.introduction" :rows="2" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <!-- props向子组件传递数据userForm.avatar -->
                <!-- @change：监听子组件change -->
                <!-- handleChange:触发时的回调 -->
                <Upload :avatar="userForm.avatar" @change="handleChange" />
            </el-form-item>


            <!-- 添加按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加用户</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue';
import Upload from '../../components/upload/upload.vue';
import { ElMessage } from 'element-plus';
import upload from '../../util/upload'
import userInformationStore from '../../store/userInformation';
import { useRouter } from 'vue-router'

const store = userInformationStore()
const router = useRouter()

const userFormRef = ref()
const userForm = reactive({
    username: '',
    password: '',
    role: 2,
    introduction: '',
    avatar: '',
    file: null,
    gender: 0
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
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
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

// 每次选择完图片后的回调函数
// file返回的是一个关于图片的信息对象
const handleChange = (file: any) => {
    // file.raw得到的是一个对象，URL.createObjectURL方法生成本地预览地址
    // avatar用于本地回显,file用于提交后端
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

// 更新提交
const submitForm = () => {
    userFormRef.value.validate(async (valid: any) => {
        if (valid) {
            // console.log("submit",userForm)
            // 调用封装upload功能
            const res = await upload("/adminapi/user/add", userForm)
            router.push('/user-manage/userlist')
            if (res.ActionType === "OK") {
                // 更新userInformationStore库中的内容
                store.changeUserInfo(res.data)
                ElMessage.success("更新成功")
            }
        }
    })
}
</script>

<style scoped>
.el-card {
    margin-top: 20px;
}
</style>