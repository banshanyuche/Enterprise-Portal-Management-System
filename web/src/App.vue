<script setup lang="ts">
import Navbar from './componenets/Navbar.vue';
</script>

<template>
  <navbar />
  <router-view />
</template>

<style scoped>
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
