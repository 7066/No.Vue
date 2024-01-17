<template>
  <div class="menu-wrap">
    <el-radio-group v-model="active">
      <el-radio-button label="caidan">菜单模块</el-radio-button>
      <el-radio-button label="gongneng">功能模块</el-radio-button>
    </el-radio-group>
    <MModule />
  </div>
</template>
<script lang="ts" setup>
import { fetchMenu } from "@/menu/service";
import MModule from "../components/MModule/index.vue";
const store = useMenuStore();
const active = ref("gongneng");
</script>
<style lang="scss" scoped>
.menu-wrap {
}
</style>
