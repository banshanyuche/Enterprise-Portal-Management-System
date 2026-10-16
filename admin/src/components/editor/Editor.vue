<template>
    <div class="editor-wrapper">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"></Toolbar>
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" @onCreated="handleCreated"
            class="editor-container"></Editor>
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'

import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { watch } from 'vue'

const emit = defineEmits(["event"])
const props = defineProps({ content: String })

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.content)
const mode = "default"

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

watch(valueHtml, (newVal) => {
    emit('event', newVal)
})

watch(() => props.content, (newVal) => {
    if (newVal !== undefined && newVal !== valueHtml.value) {
        valueHtml.value = newVal
    }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    if (editorRef.value == null) return
    editorRef.value.destroy()
})

// 编辑器创建完成时保存实例
const handleCreated = (editor) => {
    editorRef.value = editor
    if (props.content) {
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