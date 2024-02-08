<template>
  <div class="theme-wrap ignore">
    <el-switch
      v-model="v"
      inline-prompt
      :active-action-icon="Dark"
      :inactive-action-icon="Light"
      @change="onChange"
    />
  </div>
</template>
<script lang="ts" setup>
import Light from "./light.vue";
import Dark from "./dark.vue";
const v: Ref<boolean> = ref(true);
const theme = useTheme();
onMounted(() => {
  v.value = theme.value === "dark" ? true : false;
});
const onChange = (check: any) => {
  theme.value = check ? "dark" : "light";
};
</script>
<style lang="scss" scoped>
:deep(.dark-icon) {
  border-radius: 50%;
  color: #cfd3dc;
  background-color: #141414;
}

:deep(.light-icon) {
  color: #606266;
}

:deep(.el-switch__core) {
  --el-switch-on-color: var(--bg-color-mute);
  --el-switch-off-color: var(--bg-color-mute);
  --el-switch-border-color: var(--border-color);
}

.theme-wrap.ignore {
  // :deep(.el-switch.is-checked .el-switch__core .el-switch__action) {
  //   left: calc(100% - 17px);
  //   color: var(--el-switch-on-color);
  // }

  :deep(.el-switch) {
    height: 32px;
    &.is-checked .el-switch__core .el-switch__action {
      left: calc(100% - 17px);
      color: var(--el-switch-on-color);
    }
  }
  :deep(.el-switch__core) {
    min-width: 40px;
    height: 20px;
    border-radius: 10px;
    box-sizing: border-box;

    .el-switch__action {
      width: 14px;
      height: 14px;
      .el-icon,
      .light-icon,
      .dark-icon {
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
