<template>
  <div class="select-icon-wrap">
    <el-form-item label="展示图标">
      <el-select v-model="icon" placeholder="Select">
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
  </div>
</template>
<script lang="ts" setup>
const icon = ref();
</script>
<style lang="scss">
.select-icon-wrap {
}
</style>
