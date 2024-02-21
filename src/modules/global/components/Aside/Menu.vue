<template>
  <template v-for="item in props.data" :key="item.id">
    <el-sub-menu v-if="item.type === 'menu'" index="1">
      <template #title>
        <template v-if="item.icon in ELEMENTIcons">
          <el-icon>
            <component :is="(ELEMENTIcons as any)[item.icon]"></component>
          </el-icon>
        </template>
        <span>{{ item.label }}</span>
      </template>
      <Menu :data="item.children || []" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.id" @click="onClick(item)">
      <template v-if="item?.meta?.icon in ELEMENTIcons">
        <el-icon>
          <component :is="(ELEMENTIcons as any)[item?.meta?.icon]"></component>
        </el-icon>
      </template>
      <span>{{ $t(item.code + ".code") }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import * as ELEMENTIcons from "@element-plus/icons-vue";
const props = defineProps({
  data: {
    type: Array<any>,
    default: () => [],
  },
});

const onClick = (item: any) => {
  const config = JSON.parse(sessionStorage.getItem("MENU") || "{}");
  router.push(item.path);
  sessionStorage.setItem(
    "MENU",
    JSON.stringify(
      Object.assign(config, {
        [item.path]: item.id,
      }),
    ),
  );
};
</script>
