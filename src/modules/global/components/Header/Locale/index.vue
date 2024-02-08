<template>
  <div class="locales-wrap ignore">
    <el-dropdown @command="onCommand">
      <span class="el-dropdown-link">
        <i class="iconfont icon-translate" tabindex="0"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh">简体中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
const locale = useLocale();
const onCommand = (key: "zh" | "en") => {
  if (key !== locale.value) {
    locale.value = key;
  }
};
</script>
<style lang="scss" scoped>
.locales-wrap.ignore {
  display: flex;
  justify-content: center;
  align-items: center;
  .iconfont {
    font-weight: bolder;
    font-size: 16px;
    margin-right: 6px;
  }
}
</style>
