<template>
    <!-- 页头 -->
    <el-page-header>
        <!-- #：“v-slot：”的简写，插槽语法 -->
        <template #icon>
            <span> </span>
        </template>
        <template #title>
            <span>企业门户网站管理系统</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> 个人中心 </span>
        </template>
    </el-page-header>


    <el-row class="el-row">
        <!-- 头像姓名身份区 -->
        <el-col :span="8">
            <el-card class="box-card">
                <!-- 在值是一个变量或表达式的时候使用v-bind语法，不然只会被渲染成字符串 -->
                <el-avatar :size="100" :src="avatarUrl" />
                <h3>{{ store.userInfo.username }}</h3>
                <h3>{{ store.userInfo.role === 1 ? '管理员' : '编辑' }}</h3>
            </el-card>
        </el-col>

        <!-- 修改区 -->
        <el-col :span="16" style="margin-top: 20px;width: 75%;">
            <el-card>
                <template #header>个人信息</template>
                <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" style="width: 240px">
                    <!-- prop声明字段名用于校验 -->
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <!-- 下拉框 -->
                        <el-select v-model="userForm.gender" placeholder="Select" style="width: 240px;margin-left:14px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个人简介" prop="introduction">
                        <el-input v-model="userForm.introduction" :rows="2" type="textarea" />
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        <!-- props向子组件传递数据userForm.avatar -->
                        <!-- @change：监听子组件change -->
                        <!-- handleChange:触发时的回调 -->
                        <Upload :avatar="userForm.avatar" @change="handleChange"/>
                    </el-form-item>

                    <!-- 更新按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang='ts' setup>
import userInformationStore from '../../store/userInformation';
import { computed, ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import upload from '../../util/upload'
import Upload from '../../components/upload/upload.vue';

const store = userInformationStore()

// 计算属性动态缓存头像地址
const avatarUrl = computed(() => store.userInfo.avatar ? 'http://localhost:3000' + store.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const { username, gender, introduction, avatar } = store.userInfo
const userFormRef = ref()

// 双向数据绑定
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    // 存放avatar的原生对象，用于提交后端
    file: null
})

// 校验规则
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})

// 性别下拉框选择项信息
const options = [
    {
        label: '保密', value: 0
    },
    {
        label: '男', value: 1
    },
    {
        label: '女', value: 2
    }
]

// 每次选择完图片后的回调函数
// file返回的是一个关于图片的信息对象
const handleChange = (file:any) => {
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
            const res = await upload("/adminapi/user/upload", userForm)
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
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
        margin: 20px;
    }
}
</style>