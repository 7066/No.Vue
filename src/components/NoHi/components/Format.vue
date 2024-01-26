<template>
  <div class="component-basis">
    <div class="title-wrap">
      <h2 class="title">代码规范</h2>
      <h5 class="introduction">合理的代码规范, 有利于代码的阅读与监管</h5>
    </div>
    <div class="row-wrap">
      <el-row v-for="(group, index) in list" :key="index" :gutter="20">
        <el-col v-for="(item, _index) in group" :key="_index + 100" :span="8">
          <div :class="['item', `t-${_index + 1}`]">
            <svg v-if="item.isSvg" class="icon" aria-hidden="true">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
            <i
              v-else
              :class="['icon iconfont', item.icon]"
              style="color: #de9f00"
            ></i>
            <div class="label">
              {{ item.label }}
            </div>
            <div class="introduction">
              {{ item.introduction }}
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
      label: "Husky",
      introduction:
        "监听 commit 事件, 搭配 Lint-Staged 对提交的文件进行检查等处理 \n 除 Plop 命令式提交 Commit 外 \n 还实现处理手动 Commit 提交的信息",
      icon: "icon-husky",
    },
    {
      label: "Commitlint",
      introduction: "检查 Git 提交的信息, 规范格式, 便于追溯更改",
      icon: "icon-commitlint",
      isSvg: true,
    },
    {
      label: "ESLint",
      introduction: "检查JS, 规范代码书写",
      icon: "icon-eslint",
      isSvg: true,
    },
  ],
  [
    {
      label: "Prettier",
      introduction: "格式化代码, 搭配 VSCode 插件, 实现保存自动格式化",
      icon: "icon-prettier",
      isSvg: true,
    },
    {
      label: "Stylelint",
      introduction: "检查CSS, 规范样式书写",
      icon: "icon-stylelint",
      isSvg: true,
    },
    {
      label: "Plop",
      introduction:
        "可通过 yarn p 触发交互 \n 可以生成模块目录, 生成组件, 以及代码提交",
      icon: "icon-plop",
      isSvg: true,
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
      cursor: pointer;
      overflow: hidden;
      transition: all 0.25s;
      position: relative;
      box-sizing: border-box;
      padding: 12px;
      &:hover {
        border-color: var(--el-color-primary);
        border-top-color: transparent;
        border-bottom-color: transparent;
        .label {
          color: var(--el-text-color-primary);
        }
      }
      .icon {
        font-size: 36px;
        position: absolute;
        bottom: 12px;
        right: 12px;
      }
      .label {
        font-size: 18px;
        margin-bottom: 12px;
      }
      .introduction {
        font-size: 12px;
        white-space: pre-line;
      }
    }
  }
}
</style>
