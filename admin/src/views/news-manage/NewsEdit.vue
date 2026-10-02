<template>
    <!-- 页头 -->
    <el-page-header @back="handleBack()">
        <template #title>
            <span>新闻管理</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> 编辑新闻 </span>
        </template>
    </el-page-header>

    <el-card>
        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" class="demo-ruleForm">
            <!-- prop声明字段名用于校验 -->
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <!-- prop声明字段名用于校验 -->
            <el-form-item label="内容" prop="content">
                <!-- v-if用来延迟组件的挂载，在onMounted得到数据后在进行组件的挂载，得到内容数据 -->
                <editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content"/>
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <!-- 下拉框 -->
                <el-select v-model="newsForm.category" placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <!-- props向子组件传递数据userForm.avatar -->
                <!-- @change：监听子组件change -->
                <!-- handleChange:触发时的回调 -->
                <Upload :avatar="newsForm.cover" @change="handleUploadChange" />
            </el-form-item>
            <!-- 添加按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm()">更新新闻</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</template>

<script lang='ts' setup>
import { ref, reactive,onMounted } from 'vue'
import Editor from '../../components/editor/Editor.vue'
import Upload from '../../components/upload/upload.vue';
import upload from '../../util/upload.ts';
import { useRouter,useRoute } from 'vue-router';
import axios from 'axios';

const newsFormRef = ref()
const router = useRouter()
const route = useRoute()
const newsForm = reactive({
    title: "",
    content: "",
    // 1：最新动态，2：典型案例，3：通知公告
    category: 1,
    cover: "",
    file: null,
    // 0：未发布，1：已发布
    isPublish: 0
})

const newsFormRules = reactive({
    title: [
        { required: true, message: "请输入标题", trigger: "blur" }
    ],
    content: [
        { required: true, message: "请输入内容", trigger: "blur" }
    ],
    category: [
        { required: true, message: "请选择分类", trigger: "blur" }
    ],
    cover: [
        { required: true, message: "请上传封面", trigger: "blur" }
    ],
})

// 每次editor内容改变的回调
const handleChange = (data: any) => {
    console.log(data)
    newsForm.content = data
}

const options = [
    {
        label: '最新动态', value: 1
    },
    {
        label: '典型案例', value: 2
    },
    {
        label: '通知公告', value: 3
    }
]

// 每次选择完图片后的回调函数
// file返回的是一个关于图片的信息对象
const handleUploadChange = (file: any) => {
    // file.raw得到的是一个对象，URL.createObjectURL方法生成本地预览地址
    // cover用于本地回显,file用于提交后端
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}

// 提交表单
const submitForm = () => {
    newsFormRef.value.validate(async (valid: any) => {
        if (valid) {
            // console.log(newsForm)
            await upload("/adminapi/news/list",newsForm)
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

    const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
    // console.log(res.data.data)
    Object.assign(newsForm,res.data.data[0])
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