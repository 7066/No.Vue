<template>
  <!-- 作布局拦截 -->
  <div :class="['global-wrap', single && 'single']">
    <!-- 单布局 -->
    <template v-if="single">
      <router-view></router-view>
    </template>

    <!-- 内容布局 可参考 element-plus Layout 或 Container-->
    <template v-else>
      <!-- 判断全局指引字段 -->
      <NoHi />
      <!-- 布局组件 -->
      包括头部, 侧边导航, 菜单
    </template>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();
const single = computed(() =>
  ["login"].some((path) => route.path.includes(path)),
);
</script>

<style lang="scss" scoped>
.global-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
