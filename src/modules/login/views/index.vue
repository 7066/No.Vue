<template>
  <div class="login-wrap">
    No.Vue _ element-plus你好!
    <div>谁谁谁</div>
    -- 7066
    <div @click="onClick">enter</div>
  </div>
</template>
<script lang="ts" setup>
const onClick = () => {
  router.replace("/home");
};
</script>
<style lang="scss" scoped>
.login-wrap {
  background-color: #fff;
}
</style>
