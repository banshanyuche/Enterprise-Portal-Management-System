<template>
    <!-- action：上传的目标接口 -->
    <!-- show-file-list：是否显示已上传的文件列表 -->
    <!-- on-change：文件状态改变（选中文件、上传成功、上传失败）时的回调 -->
    <!-- auto-uoload：是否自动上传 -->
    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :on-change="handleChange" :auto-upload="false">

        <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />

        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { defineEmits, defineProps, computed } from 'vue'

// 接收父组件传递的avatar参数
const props = defineProps({
    avatar: String
})

// 定义可触发的事件change
const emit = defineEmits(["change"])

// 计算更改信息栏的图片
// avatar属性可能为未定义，用？表示可选链，避免报错
// 可能出现本地回显地址，也有可能包含后端传来的地址，需加上后端的端口号
const uploadAvatar = computed(() =>
        props.avatar.includes("blob")
            ? props.avatar
            : 'http://localhost:3000' + props.avatar
)

// file参数由:on-change属性自动导入
const handleChange = file => {
    // 触发事件传递数据
    emit("change", file.raw)
}
</script>

<style scoped>
.avatar {
    width: 178px;
    height: 178px;
}

:deep .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep .el-upload:hover {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>