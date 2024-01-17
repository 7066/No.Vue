<template>
  <div class="type0-wrap">
    <el-row>
      <el-col :span="12">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="展示图标">
          <el-select v-model="form.icon" placeholder="Select">
            <el-option
              v-for="item in [
                {
                  value: 'Option1',
                  label: 'Option1',
                },
                {
                  value: 'Option2',
                  label: 'Option2',
                },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
const form = reactive({
  type: 0,
  name: "",
  icon: "",
  path: "",
  url: "",
  show: "",
  permission: [],
});
</script>
<style lang="scss">
.type0-wrap {
}
</style>
