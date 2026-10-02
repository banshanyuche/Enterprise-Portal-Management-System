<template>
    <!-- 页头 -->
    <el-page-header @back="handleBack()">
        <template #title>
            <span>产品管理</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> 编辑产品 </span>
        </template>
    </el-page-header>

    <el-card>
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
                <Upload :avatar="productForm.cover" @change="handleUploadChange" />
            </el-form-item>
            <!-- 添加按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm()">更新产品</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</template>

<script lang='ts' setup>
import { ref, reactive,onMounted } from 'vue'
import Upload from '../../components/upload/upload.vue';
import upload from '../../util/upload.ts';
import { useRouter,useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter()
const route = useRoute()
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
const handleUploadChange = (file: any) => {
    // file.raw得到的是一个对象，URL.createObjectURL方法生成本地预览地址
    // cover用于本地回显,file用于提交后端
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
}

// 提交表单
const submitForm = () => {
    productFormRef.value.validate(async (valid: any) => {
        if (valid) {
            // console.log(productForm)
            await upload("/adminapi/product/list",productForm)
            router.back()
        }
    })
}

const handleBack = ()=>{
    router.back()
}

// 取当前页面数据
onMounted(async ()=>{
    // console.log(route.params.id)

    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    // console.log(res.data.data)
    Object.assign(productForm,res.data.data[0])
})
</script>

<style scoped>
.el-card {
    margin-top: 20px;
}

.editor {
    width: 100%;
}
</style>