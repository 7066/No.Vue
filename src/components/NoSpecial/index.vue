<template>
  <div class="no-component no-special">
    <el-dropdown @command="onCommand">
      <span class="el-dropdown-link">
        <span
          class="iconfont icon-language"
          style="font-size: 16px; margin-right: 6px"
        ></span>
        <icon-arrow-down style="font-size: 10px" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh_CN">简体中文</el-dropdown-item>
          <el-dropdown-item command="en_US">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="switch-block">
      <el-switch
        v-model="isSunny"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="MoonNight"
        @change="onChange"
      />
    </div>
    <span class="iconfont icon-github" style="cursor: pointer"></span>
  </div>
</template>
<script lang="ts" setup>
import { Sunny, MoonNight } from "@element-plus/icons-vue";
const isSunny: Ref<boolean> = ref(true);
const topic = useTopic();
const locale = useLocale();
const onChange = (check: any) => {
  topic.value = check ? "sunny" : "night";
};
const onCommand = (key: "zh_CN" | "en_US") => {
  if (key !== locale.value) {
    locale.value = key;
  }
};
</script>
<style lang="scss" scoped>
.no-component.no-special {
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 24px;
  }
  .switch-block {
    height: 16px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border: 4px solid var(--el-color-primary);
    margin: 0 12px;
    border-top: none;
    border-bottom: none;
    box-sizing: border-box;
  }
  :deep(.el-switch__core) {
    .el-switch__action {
      display: none;
    }
  }

  .iconfont.icon-github {
    color: var(--el-text-color-primary);
  }
}
</style>
