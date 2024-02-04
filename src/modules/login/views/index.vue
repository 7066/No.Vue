<template>
  <div class="login-wrap">
    <div class="logo">
      <div class="title">70626</div>
      <div>No.Vue</div>
      <div>element-plus</div>
    </div>
    <!-- No.Vue _ element-plus你好!
    <div>谁谁谁</div>
    -- 7066
    <div @click="onClick">enter</div> -->
  </div>
</template>
<script lang="ts" setup>
const onClick = () => {
  router.replace("/home");
};
</script>
<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #0f7aa5;
  .logo {
    .title {
      font-size: 128px;
      text-align: center;
    }
  }
}
</style>
