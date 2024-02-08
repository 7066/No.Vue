<template>
  <template v-for="(item, key) in props.data" :key="key">
    <el-sub-menu v-if="item.children" index="1">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>{{ item.label }}</span>
      </template>
      <Menu :data="item.children" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.path">
      <!-- <el-icon><setting /></el-icon> -->
      <span>{{ $t(item.code + ".code") }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array<any>,
    default: () => [],
  },
});
</script>
