<template>
  <div class="no-component no-hi">
    <div class="top">
      <h1 class="title">No.Vue</h1>
      <h3 class="introduction">基于 Vite 构建的模块化 TypeScript-Vue 项目</h3>
      <h3 class="branch">Element-Plus</h3>
    </div>

    <el-carousel height="100%" direction="vertical" :autoplay="false">
      <!-- <el-carousel-item><Basis /></el-carousel-item> -->
      <el-carousel-item><Hooks /></el-carousel-item>
      <el-carousel-item><Format /> </el-carousel-item>
      <!-- <el-carousel-item>
        展示功能 - 接口代理 与 axios 拦截, 路由文件 两种方式, 路由鉴权-登出,
        国际化 ,换肤, 自适应</el-carousel-item
      > -->
      <el-carousel-item>
        <h3 text="2xl" justify="center">目录简介</h3>
        <h3 text="2xl" justify="center">Start</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts" setup>
// import Basis from "./components/Basis.vue";
import Hooks from "./components/Hooks.vue";
import Format from "./components/Format.vue";
</script>
<style lang="scss" scoped>
.no-component.no-hi {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .top {
    background: linear-gradient(
      45deg,
      var(--el-color-primary),
      var(--el-bg-color)
    );
    .title {
      text-align: center;
      margin-top: 36px;
      margin-bottom: 12px;
    }
    .introduction {
      text-align: center;
    }
    .branch {
      text-align: right;
      padding-right: 96px;
      padding-bottom: 36px;
      border-bottom: 3px solid var(--el-color-primary);
    }
  }
  :deep(.el-carousel.el-carousel--vertical) {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      var(--el-bg-color),
      var(--el-color-primary)
    );
  }
}
</style>
