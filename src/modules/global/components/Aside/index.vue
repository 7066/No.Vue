<template>
  <el-aside :width="collapse ? '64px' : '200px'" class="no-component no-aside">
    <el-menu :collapse="collapse" style="height: 100%">
      <M :list="store.menu" />
    </el-menu>
    <el-icon
      size="18"
      :class="['collapse', collapse ? 'active' : '']"
      @click="collapse = !collapse"
    >
      <icon-CaretRight v-if="collapse" />
      <icon-CaretLeft v-else />
    </el-icon>
  </el-aside>
</template>
<script lang="ts" setup>
import M from "./M.vue";
const collapse = ref(false);
const store = useGlobalStore();
</script>
<style lang="scss" scoped>
.no-component.no-aside {
  transition: width 0.8s;
  position: relative;
  color: var(--el-text-color-primary);
  z-index: 2;
  overflow: inherit;
  .collapse {
    position: absolute;
    top: 50%;
    left: 100%;
    cursor: pointer;
    z-index: 1;
    transform: translate(10%, -50%);
    &.active {
      transform: translate(30%, -50%);
    }
  }
}
</style>
