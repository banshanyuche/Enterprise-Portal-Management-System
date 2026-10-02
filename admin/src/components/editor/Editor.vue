<template>
    <div id="myeditor"></div>
</template>

<script setup>
import E from "wangeditor"
import { onMounted,defineEmits,defineProps } from "vue";

const emit = defineEmits(["event"])
const props = defineProps({content:String})

onMounted(() => {
    const editor = new E("#myeditor")
    editor.create()

    // 设置初始值
    props.content && editor.txt.html(props.content)

    // 监听编辑器内容变化，把最新的 HTML 内容传出来
    editor.config.onchange = function(newHtml){
        console.log("change之后最新的html",newHtml)
        emit("event",newHtml)
    }
})

</script>

<style scoped></style>