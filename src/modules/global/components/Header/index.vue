<template>
  <div class="header-wrap ignore">
    <div class="logo"></div>
    <div class="tools">
      <Theme />
      <Locale />
      <i class="iconfont icon-github" tabindex="0" @click="onGithub"></i>
      <i class="iconfont icon-guanji" tabindex="0" @click="onLogout"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import Theme from "./Theme/index.vue";
import Locale from "./Locale/index.vue";
const onLogout = () => {
  router.replace("/login");
};
const onGithub = () => {
  window.open("https://github.com/7066/No.Vue", "_blank");
};
</script>

<style lang="scss" scoped>
.header-wrap.ignore {
  height: 60px;
  width: 100%;
  display: flex;
  box-shadow: var(--border-box-shadow) 0 10px 10px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-right: 24px;
  z-index: 1;
  .locales-wrap {
    margin: 0 12px;
  }

  .logo {
    width: 200px;
    height: 100%;
    background: url("~/images/logo.png");
    background-size: cover;
  }
  .tools {
    display: flex;
    align-items: center;
    .iconfont {
      font-weight: bolder;
      font-size: 16px;
      cursor: pointer;
      &.icon-github {
        margin-right: 12px;
      }
    }
  }
}
</style>
