<template>
    <div class="editor-wrapper">
        <!-- defaultConfig : 菜单栏和编辑器的配置 -->
        <!-- mode : 分为默认default和简洁simpol -->
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"></Toolbar>
        <!-- 自定义onCreated事件，创建后提供参数 -->
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" @onCreated="handleCreated"
            class="editor-container"></Editor>
    </div>
</template>

<script setup>
// 导入美化
import '@wangeditor/editor/dist/css/style.css'

import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { watch } from 'vue'

// 自定义event事件
const emit = defineEmits(["event"])
// props接收父组件传递参数
const props = defineProps({ content: String })

// 编辑器实例，必须用 shallowRef，否则十分卡顿
const editorRef = shallowRef()
const mode = "default"

// 内容 HTML
const valueHtml = ref(props.content)

// 配置
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 当内容发生变化将新内容传回给父组件
watch(valueHtml, (newVal) => {
    emit('event', newVal)
})

// 审查从父->子的数据
// 此处需为箭头函数，因为要监视的是props.content的动态过程
watch(() => props.content, (newVal) => {
    // 防空值，防死循环
    if (newVal !== undefined && newVal !== valueHtml.value) {
        valueHtml.value = newVal
    }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    // 以编辑器实例进行判断
    if (editorRef.value == null) return
    editorRef.value.destroy()
})

// 编辑器创建完成时保存实例
const handleCreated = (editor) => {
    editorRef.value = editor
    if (props.content) {
        // 给编辑器填写内容
        editor.setHtml(props.content)
    }
}
</script>

<style scoped>

.editor-container {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    min-height: 200px;
    height:fit-content;
    width: 100%;
}

.editor-wrapper {
    width: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
    transition: border-color 0.2s;
}
</style>