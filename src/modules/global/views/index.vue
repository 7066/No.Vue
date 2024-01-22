<script setup lang="ts">
const themes = getThemes();
</script>
<template>
  <div v-for="item in themes" :key="item">{{ item }}</div>

  <router-link to="/">Go to home</router-link>
  <router-link to="/login">Go to login</router-link>

  <router-view></router-view>
</template>

<style scoped></style>
