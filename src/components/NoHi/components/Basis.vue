<template>
  <div class="component-basis">
    <div class="title-wrap">
      <h2 class="title">项目依赖</h2>
      <h5 class="introduction">项目中主要用到的依赖</h5>
    </div>
    <div class="row-wrap">
      <el-row v-for="(group, index) in list" :key="index" :gutter="20">
        <el-col v-for="(item, _index) in group" :key="_index + 100" :span="6">
          <div :class="['item', `t-${_index + 1}`]">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
            <div class="label">
              {{ item.label }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
const list = [
  [
    {
      label: "Vite",
      icon: "icon-vite",
    },
    {
      label: "Vue",
      icon: "icon-vue",
    },
    {
      label: "Vue-Router",
      icon: "icon-vue-router",
    },
    {
      label: "Pinia",
      icon: "icon-pinia",
    },
  ],
  [
    {
      label: "Axios",
      icon: "icon-axios",
    },
    {
      label: "Element-Plus",
      icon: "icon-element-plus",
    },
    {
      label: "TypeScript",
      icon: "icon-typescript",
    },
    {
      label: "Vue-i18n",
      icon: "icon-vue-i18n",
    },
  ],
];
</script>
<style lang="scss" scoped>
.component-basis {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 36px;
  overflow: hidden;

  :deep(.el-carousel.el-carousel--vertical) {
    height: 100%;
  }
  .title-wrap {
    margin-top: 24px;
    .title {
      margin-bottom: 12px;
    }
  }
  .row-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
    padding-bottom: 24px;
    margin: auto 0;

    .el-row {
      height: 36%;
      margin-top: 24px;
    }
    .item {
      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      border-top-color: var(--el-color-primary);
      border-bottom-color: var(--el-color-primary);
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.25s;
      &:hover {
        border-color: var(--el-color-primary);
        border-top-color: transparent;
        border-bottom-color: transparent;
        .label {
          color: var(--el-text-color-primary);
        }
      }
      .icon {
        font-size: 120px;
        margin: 24px;
      }
      .label {
        font-size: 18px;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
