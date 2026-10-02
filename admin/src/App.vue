<template>
    <router-view/>
</template>

<script lang='ts' setup>
</script>

<style lang ="scss">
//由于不同的浏览器默认样式不同，此刻统一
*{
  margin:0;
  padding:0;
}

::-webkit-scrollbar{
  width: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb{
  background: #3e4b57;
}

::-webkit-scrollbar-track{
  background: #ddd;
}
</style>