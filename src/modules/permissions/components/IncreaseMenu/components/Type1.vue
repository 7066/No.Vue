<template>
  <div class="type1-wrap">
    <el-row>
      <el-col :span="12">
        <el-form-item label="模块名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="模块代码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="路由地址">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="文件路径">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="按钮权限">
          <el-checkbox-group v-model="form.permission">
            <el-checkbox label="use">使用</el-checkbox>
            <el-checkbox label="view">查看</el-checkbox>
            <el-checkbox label="edit">编辑</el-checkbox>
            <el-checkbox label="export">导出</el-checkbox>
          </el-checkbox-group>
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
.type1-wrap {
}
</style>
