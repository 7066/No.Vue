<script setup lang="ts">
const theme = useTheme();
const onClick = () => {
  theme.value = "night";
  console.log("????");
};
</script>

<template>
  <div>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary" @click="onClick">useTheme</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<style scoped></style>
