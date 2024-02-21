<template>
  <div class="lost-wrap">
    <el-empty description="404">
      <el-button type="primary" @click="onClick">回首页</el-button>
    </el-empty>
  </div>
</template>
<script lang="ts" setup>
const onClick = () => {
  router.replace("/home");
};
</script>
