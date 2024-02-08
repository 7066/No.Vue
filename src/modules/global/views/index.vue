<template>
  <!-- 作布局拦截 -->
  <div :class="['global', single ? 'single' : 'container']">
    <!-- 单布局 -->
    <template v-if="single">
      <router-view></router-view>
    </template>

    <!-- 内容布局 -->
    <template v-else>
      <!-- 头部 -->
      <Header />
      <div class="content-wrap">
        <!-- 侧边栏 -->
        <Aside />
        <div class="main">
          <!-- 页签 -->
          <Tags />
          <div class="module-wrap">
            <!-- 面包屑导航 -->
            <Breadcrumb />
            <router-view class="module"></router-view>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import Header from "../components/Header/index.vue";
import Aside from "../components/Aside/index.vue";
import Tags from "../components/Tags/index.vue";
import Breadcrumb from "../components/Breadcrumb/index.vue";
const route = useRoute();
const single = computed(() =>
  ["login"].some((path) => route.path.includes(path)),
);
</script>

<style lang="scss" scoped>
.global {
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.container {
    display: flex;
    flex-direction: column;
    .content-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      flex-direction: row;
      .main {
        width: 100%;
        height: 100%;
        padding: 24px;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .module-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
          padding: 12px;
          box-sizing: border-box;
          border-radius: 6px;
          box-shadow: var(--border-box-shadow) 0px 0px 24px;
          .module {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
