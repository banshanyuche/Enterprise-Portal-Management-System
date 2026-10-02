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
            <span class="text-large font-600 mr-3"> 添加产品 </span>
        </template>
    </el-page-header>

    <el-card>
        <!-- 表单 -->
        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" class="demo-ruleForm">
            <!-- prop声明字段名用于校验 -->
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="产品简要描述" prop="introduction">
                <el-input v-model="productForm.introduction" :rows="2" type="textarea" />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="detail">
                <el-input v-model="productForm.detail" :rows="2" type="textarea" />
            </el-form-item>
            <el-form-item label="产品图片" prop="cover">
                <!-- props向子组件传递数据userForm.avatar -->
                <!-- @change：监听子组件change -->
                <!-- handleChange:触发时的回调 -->
                <Upload :avatar="productForm.cover" @change="handleChange" />
            </el-form-item>


            <!-- 添加按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加产品</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue';
import Upload from '../../components/upload/upload.vue';
import upload from '../../util/upload'
import { useRouter } from 'vue-router'

const router = useRouter()

const productFormRef = ref()
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '',
    file: null,
})

const productFormRules = reactive({
    title: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入简要描述', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入详细描述', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传产品图片', trigger: 'blur' },
    ],
})

// 每次选择完图片后的回调函数
// file返回的是一个关于图片的信息对象
const handleChange = (file: any) => {
    // file.raw得到的是一个对象，URL.createObjectURL方法生成本地预览地址
    // avatar用于本地回显,file用于提交后端
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
}

// 更新提交
const submitForm = () => {
    productFormRef.value.validate(async (valid: any) => {
        if (valid) {
            // console.log("submit",productForm)
            // 调用封装upload功能
            await upload("/adminapi/product/add", productForm)
            router.push('/product-manage/productlist')
            // if (res.ActionType === "OK") {
            //     // 更新userInformationStore库中的内容
            //     store.changeUserInfo(res.data)
            //     ElMessage.success("更新成功")
            // }
        }
    })
}
</script>

<style scoped>
.el-card {
    margin-top: 20px;
}
</style>