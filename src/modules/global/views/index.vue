<script setup lang="ts">
// import { initTheme } from "@/global/service";

// initTheme();

// 主题初始化
setTimeout(() => {
  initTheme();
}, 1000);
const themes = getThemes();
</script>
<template>
  <div v-for="item in themes" :key="item">{{ item }}</div>

  <router-link to="/">Go to home</router-link>
  <router-link to="/login">Go to login</router-link>

  <router-view></router-view>
</template>

<style scoped></style>
