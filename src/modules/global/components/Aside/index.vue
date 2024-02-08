<template>
  <div class="aside-wrap ignore">
    <el-menu router :default-active="active">
      <Menu :data="_gs.menu" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue";
const _gs = useGlobalStore();
const route = useRoute();
const active = computed(() => {
  const _r: any = route.matched.at(0);
  return _r?.path || "";
});
</script>

<style lang="scss" scoped>
.aside-wrap.ignore {
  width: 260px;
  height: 100%;
  display: flex;
  box-shadow: var(--border-box-shadow) 6px 0px 10px;
  box-sizing: border-box;
  .el-menu {
    width: 100%;
    border-right: none;
  }
}
</style>
