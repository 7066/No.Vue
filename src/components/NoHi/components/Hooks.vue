<template>
  <div class="component-basis">
    <div class="title-wrap">
      <h2 class="title">项目配置</h2>
      <h5 class="introduction">
        项目采用模块化的方式开发, 利于团队合作, 划分责任, 追踪修改等
      </h5>
    </div>
    <div class="row-wrap">
      <el-row v-for="(group, index) in list" :key="index" :gutter="20">
        <el-col v-for="(item, _index) in group" :key="_index + 100" :span="6">
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
      label: "Vite",
      introduction: "接口代理, 路径别名, 自适应, 打包优化",
      icon: "icon-vite",
    },
    {
      label: "Vue",
      introduction: "自动引入 Vue 相关接口",
      icon: "icon-vue",
      isSvg: true,
    },
    {
      label: "Vue-Router",
      introduction:
        "自动引入 VueRouter 相关接口。\n 自动收集各模块下的 route 文件配置 \n 可全局使用 router",
      icon: "icon-vue-router",
      isSvg: true,
    },
    {
      label: "Pinia",
      introduction:
        "自动引入各模块下的 store 文件配置\n 建议命名规则: use'ModuleName'Store",
      icon: "icon-pinia",
      isSvg: true,
    },
  ],
  [
    {
      label: "Axios",
      introduction:
        "自动引入二次封装的 request \n 建议仅在各模块内的 service 文件中使用\n import { } from @/'ModuleName'/service",
      icon: "icon-axios",
      isSvg: true,
    },
    {
      label: "Element-Plus",
      introduction:
        "自动引入 ElementPlus 组件\n 自动引入 icon- 前缀的 ElementPlus-Icon\n 自动引入 components 文件内的组件",
      icon: "icon-element-plus",
      isSvg: true,
    },

    {
      label: "Theme",
      introduction:
        "自动引入 useTheme 获取或更改当前主题\n 主题文件放置在 public/themes 文件夹内\n 支持动态获取或添加主题",
      icon: "icon-theme",
      isSvg: false,
    },
    {
      label: "Vue-i18n",
      introduction:
        "自动引入 useLocale 来获取或更改当前语言\n 自动收集各模块下 locales 中的国际化文件",
      icon: "icon-vue-i18n",
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
