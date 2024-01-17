<template>
  <div class="increase-wrap"></div>
  <el-dialog v-model="visible" title="新增" width="60%">
    <el-form :model="form" label-width="100px">
      <el-form-item label="类型">
        <el-radio-group v-model="form.type" size="large">
          <el-radio-button :label="0">菜单</el-radio-button>
          <el-radio-button :label="1">模块</el-radio-button>
          <el-radio-button :label="2">外链</el-radio-button>
          <el-radio-button :label="3">内嵌</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <Type0 v-if="form.type === 0" />
      <Type1 v-if="form.type === 1" />
      <Type2 v-if="form.type === 2" />
      <Type3 v-if="form.type === 3" />
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import Type0 from "./components/Type0.vue";
import Type1 from "./components/Type1.vue";
import Type2 from "./components/Type2.vue";
import Type3 from "./components/Type3.vue";
const visible = ref(false);
const form = reactive({
  type: 0,
  name: "",
  icon: "",
  path: "",
  url: "",
  show: "",
  permission: [],
});
defineExpose({
  open: () => {
    visible.value = true;
  },
});
</script>
<style lang="scss">
.increase-wrap {
}
</style>
